"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

type ChatTab = "home" | "messages" | "help" | "news";

type ChatThreadSummary = {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
};

const starterMessages: ChatMessage[] = [];

const promptChips = [
  "How does 360Airo work?",
  "Book a demo",
  "What channels do you support?",
];

const helpTopics = [
  "Set up a custom tracking domain",
  "How to install the 360Airo Chrome extension",
  "Understand sending limits in 360Airo",
  "How to set up SPF, DKIM, and DMARC - general setup guide",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ChatTab>("home");
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [hasStartedConversation, setHasStartedConversation] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [chatThreads, setChatThreads] = useState<ChatThreadSummary[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const lenis = (window as any).lenis;
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        const mainNav = document.getElementById("main-nav");
        if (mainNav) {
          mainNav.style.paddingRight = `${scrollbarWidth}px`;
        }
      }

      if (lenis && typeof lenis.stop === "function") {
        lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = "";
      const mainNav = document.getElementById("main-nav");
      if (mainNav) {
        mainNav.style.paddingRight = "";
      }

      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = "";
      const mainNav = document.getElementById("main-nav");
      if (mainNav) {
        mainNav.style.paddingRight = "";
      }
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    };
  }, [isOpen]);

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  const recentThreads = useMemo(() => chatThreads.slice(0, 3), [chatThreads]);

  const formatThreadTime = (dateText: string) => {
    const date = new Date(dateText);
    const diff = Date.now() - date.getTime();
    const minutes = Math.max(1, Math.floor(diff / 60000));

    if (minutes < 60) return `${minutes}m`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;

    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  const getChatUser = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user) {
        return sessionData.session.user;
      }
      const { data: signInData, error: signInError } = await supabase.auth.signInAnonymously();
      if (!signInError && signInData.user) {
        return signInData.user;
      }
    } catch (e) {
      console.warn("Supabase auth failed, using localStorage fallback:", e);
    }

    let localUserId = typeof window !== 'undefined' ? localStorage.getItem("chat_local_user_id") : null;
    if (!localUserId && typeof window !== 'undefined') {
      localUserId = `local-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`;
      localStorage.setItem("chat_local_user_id", localUserId);
    }
    return { id: localUserId || "local-user" } as any;
  };

  const getOrCreateThread = async (title: string) => {
    if (threadId) {
      return threadId;
    }

    let user;
    try {
      user = await getChatUser();
    } catch (e) {
      user = { id: 'local-user' };
    }

    const isLocalUser = !user?.id || user.id.startsWith("local-");

    if (!isLocalUser) {
      try {
        const { data, error } = await supabase
          .from("chat_threads")
          .insert({
            user_id: user.id,
            title: title.slice(0, 80),
          })
          .select("id")
          .single();

        if (!error && data?.id) {
          setThreadId(data.id);
          setChatThreads((current) => [
            {
              id: data.id,
              title: title.slice(0, 80),
              preview: contentPreview(title),
              updatedAt: new Date().toISOString(),
            },
            ...current,
          ]);
          return data.id as string;
        }
      } catch (err) {
        console.warn("Failed to create thread in Supabase, falling back to local storage:", err);
      }
    }

    const localThreadId = `thread-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`;
    const newThread = {
      id: localThreadId,
      title: title.slice(0, 80),
      preview: contentPreview(title),
      updatedAt: new Date().toISOString(),
      messages: [] as ChatMessage[]
    };
    
    if (typeof window !== 'undefined') {
      const localThreads = JSON.parse(localStorage.getItem("chat_local_threads") || "[]");
      localThreads.unshift(newThread);
      localStorage.setItem("chat_local_threads", JSON.stringify(localThreads));
      
      setThreadId(localThreadId);
      setChatThreads(localThreads.map((t: any) => ({
        id: t.id,
        title: t.title,
        preview: t.preview,
        updatedAt: t.updatedAt
      })));
    }

    return localThreadId;
  };

  const contentPreview = (content: string) => {
    const trimmed = content.trim();
    return trimmed.length > 52 ? `${trimmed.slice(0, 52)}...` : trimmed;
  };

  const saveChatMessage = async (
    currentThreadId: string,
    role: ChatMessage["role"],
    content: string,
  ) => {
    const isLocalThread = currentThreadId.startsWith("thread-");

    if (!isLocalThread) {
      try {
        const { error } = await supabase.from("chat_messages").insert([
          {
            thread_id: currentThreadId,
            role,
            content,
          },
        ]);

        if (!error) {
          const updatedAt = new Date().toISOString();
          await supabase.from("chat_threads").update({ updated_at: updatedAt }).eq("id", currentThreadId);
          setChatThreads((current) =>
            current
              .map((thread) =>
                thread.id === currentThreadId
                  ? {
                      ...thread,
                      preview: contentPreview(content),
                      updatedAt,
                    }
                  : thread,
              )
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
          );
          return;
        }
      } catch (err) {
        console.warn("Failed to save message in Supabase, falling back to local storage:", err);
      }
    }

    if (typeof window !== 'undefined') {
      const localThreads = JSON.parse(localStorage.getItem("chat_local_threads") || "[]");
      const threadIndex = localThreads.findIndex((t: any) => t.id === currentThreadId);
      const updatedAt = new Date().toISOString();
      
      if (threadIndex !== -1) {
        if (!localThreads[threadIndex].messages) {
          localThreads[threadIndex].messages = [];
        }
        localThreads[threadIndex].messages.push({ role, content });
        localThreads[threadIndex].preview = contentPreview(content);
        localThreads[threadIndex].updatedAt = updatedAt;
        
        const updatedThread = localThreads.splice(threadIndex, 1)[0];
        localThreads.unshift(updatedThread);
        localStorage.setItem("chat_local_threads", JSON.stringify(localThreads));
      }

      setChatThreads(localThreads.map((t: any) => ({
        id: t.id,
        title: t.title,
        preview: t.preview,
        updatedAt: t.updatedAt
      })));
    }
  };

  const loadChatThreads = async () => {
    let localThreads = [];
    if (typeof window !== 'undefined') {
      localThreads = JSON.parse(localStorage.getItem("chat_local_threads") || "[]");
      const initialThreads = localThreads.map((t: any) => ({
        id: t.id,
        title: t.title,
        preview: t.preview,
        updatedAt: t.updatedAt
      }));
      setChatThreads(initialThreads);
    }

    try {
      let user;
      try {
        user = await getChatUser();
      } catch (e) {
        return;
      }

      if (user && !user.id.startsWith("local-")) {
        const { data: threads, error: threadsError } = await supabase
          .from("chat_threads")
          .select("id,title,updated_at")
          .order("updated_at", { ascending: false })
          .limit(10);

        if (threadsError || !threads?.length) {
          if (threadsError) console.error("Supabase chat threads error:", threadsError);
          return;
        }

        const threadIds = threads.map((thread) => thread.id);
        const { data: threadMessages, error: messagesError } = await supabase
          .from("chat_messages")
          .select("thread_id,content,created_at")
          .in("thread_id", threadIds)
          .order("created_at", { ascending: false });

        if (messagesError) {
          console.error("Supabase chat messages error:", messagesError);
        }

        const supabaseThreads = threads.map((thread) => {
          const latestMessage = threadMessages?.find((message) => message.thread_id === thread.id);

          return {
            id: thread.id,
            title: thread.title || "Campaign Setup",
            preview: latestMessage?.content ? contentPreview(latestMessage.content) : "No messages yet",
            updatedAt: latestMessage?.created_at || thread.updated_at,
          };
        });

        const combined = [...supabaseThreads];
        localThreads.forEach((lt: any) => {
          if (!combined.some(st => st.id === lt.id)) {
            combined.push({
              id: lt.id,
              title: lt.title,
              preview: lt.preview,
              updatedAt: lt.updatedAt
            });
          }
        });

        setChatThreads(combined.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
      }
    } catch (error) {
      console.error("Supabase chat history load error:", error);
    }
  };

  const openThread = async (selectedThreadId: string) => {
    const isLocalThread = selectedThreadId.startsWith("thread-");

    if (!isLocalThread) {
      try {
        const { data, error } = await supabase
          .from("chat_messages")
          .select("role,content")
          .eq("thread_id", selectedThreadId)
          .order("created_at", { ascending: true });

        if (!error && data) {
          setThreadId(selectedThreadId);
          setMessages(
            data
              .filter((message) => message.role === "assistant" || message.role === "user")
              .map((message) => ({
                role: message.role as ChatMessage["role"],
                content: message.content,
              })),
          );
          setHasStartedConversation(true);
          setActiveTab("messages");
          window.setTimeout(() => inputRef.current?.focus(), 0);
          return;
        }
      } catch (err) {
        console.warn("Failed to load thread from Supabase, looking in local storage:", err);
      }
    }

    if (typeof window !== 'undefined') {
      const localThreads = JSON.parse(localStorage.getItem("chat_local_threads") || "[]");
      const thread = localThreads.find((t: any) => t.id === selectedThreadId);
      
      if (thread) {
        setThreadId(selectedThreadId);
        setMessages(thread.messages || []);
        setHasStartedConversation(true);
        setActiveTab("messages");
        window.setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  };

  const renderThreadList = (threads: ChatThreadSummary[], compact = false) => (
    <div className={compact ? "airo-chatbot-thread-list is-compact" : "airo-chatbot-thread-list"}>
      {threads.map((thread) => (
        <button key={thread.id} type="button" onClick={() => void openThread(thread.id)}>
          <span className="airo-chatbot-thread-avatar" aria-hidden="true">
            <img src="https://dnbgjzscuxrlbceqsrhz.supabase.co/storage/v1/object/public/comany_logo_for_resue/FinalLogo_icon_transparent%20(1).png" alt="" />
          </span>
          <span className="airo-chatbot-thread-copy">
            <strong>{thread.title || "Campaign Setup"}</strong>
            <small>{thread.preview}</small>
          </span>
          <time>{formatThreadTime(thread.updatedAt)}</time>
        </button>
      ))}
    </div>
  );

  useEffect(() => {
    if (isOpen) {
      void loadChatThreads();
    }
  }, [isOpen]);

  const sendMessage = async (messageText?: string) => {
    const content = (messageText ?? input).trim();
    if (!content || isSending) return;

    setHasStartedConversation(true);

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const currentThreadId = await getOrCreateThread(content);

      await saveChatMessage(currentThreadId, "user", content);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, threadId: currentThreadId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "The assistant is not available right now.");
      }

      const assistantMessage =
        data.message || "I can help with that. Tell me a little more about your use case.";

      await saveChatMessage(currentThreadId, "assistant", assistantMessage);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: assistantMessage,
        },
      ]);

      if (
        assistantMessage.toLowerCase().includes("kindly fill the form") ||
        assistantMessage.includes("/book-a-demo")
      ) {
        window.setTimeout(() => {
          setIsOpen(false);
          window.setTimeout(() => {
            window.location.href = "/book-a-demo";
          }, 450);
        }, 2200);
      }
    } catch (error) {
      const fallback =
        error instanceof Error ? error.message : "The assistant is not available right now.";
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: fallback,
        },
      ]);
    } finally {
      setIsSending(false);
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const openMessages = () => {
    setHasStartedConversation(true);
    setActiveTab("messages");
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const askFromTopic = (topic: string) => {
    setHasStartedConversation(true);
    setActiveTab("messages");
    void sendMessage(topic);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };

  const renderIcon = (name: ChatTab | "send" | "search" | "close") => {
    const iconProps = {
      width: 23,
      height: 23,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2.2,
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
      "aria-hidden": true,
    };

    switch (name) {
      case "home":
        return (
          <svg {...iconProps}>
            <path d="M4 10.5 12 5l8 5.5v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-8Z" />
            <path d="M9 20v-5h6v5" />
          </svg>
        );
      case "messages":
        return (
          <svg {...iconProps}>
            <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H10l-4 3v-3.2A2.5 2.5 0 0 1 5 13.8V6.5Z" />
            <path d="M8.5 8h7" />
            <path d="M8.5 11.5h4.5" />
          </svg>
        );
      case "help":
        return (
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9a2.7 2.7 0 0 1 5.1 1.2c0 1.9-2.6 2.2-2.6 4" />
            <path d="M12 17.5h.01" />
          </svg>
        );
      case "news":
        return (
          <svg {...iconProps}>
            <path d="M4 13.5v-3l11-4v11l-11-4Z" />
            <path d="M15 9.5a3.2 3.2 0 0 1 0 5" />
            <path d="M7.5 14.8 9 20h2.5l-1.3-4.2" />
          </svg>
        );
      case "send":
        return (
          <svg {...iconProps}>
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        );
      case "search":
        return (
          <svg {...iconProps}>
            <circle cx="10.5" cy="10.5" r="5.8" />
            <path d="m15 15 4 4" />
          </svg>
        );
      case "close":
        return (
          <svg {...iconProps}>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={`airo-chatbot-backdrop ${isOpen ? "is-active" : ""}`}
        onClick={() => setIsOpen(false)}
        data-lenis-prevent
      />
      <div className={`airo-chatbot ${isOpen ? "airo-chatbot-open" : ""}`} data-lenis-prevent>
        {isOpen && (
          <section className="airo-chatbot-panel" aria-label="360Airo chat assistant">
          <div className="airo-chatbot-main">
            <header className="airo-chatbot-header">
              {activeTab === "home" ? (
                <div className="airo-chatbot-brand">
                  <span className="airo-chatbot-brand-mark">
                    <img src="https://dnbgjzscuxrlbceqsrhz.supabase.co/storage/v1/object/public/comany_logo_for_resue/FinalLogo_icon_transparent%20(1).png" alt="360Airo" />
                  </span>
                </div>
              ) : (
                <h2 className="airo-chatbot-tab-title">
                  {activeTab[0].toUpperCase() + activeTab.slice(1)}
                </h2>
              )}
              <button
                className="airo-chatbot-icon-button"
                type="button"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
              >
                {renderIcon("close")}
              </button>
            </header>

            {activeTab === "home" && (
              <div className="airo-chatbot-home">
                <div className="airo-chatbot-greeting">
                  <p>Hi there</p>
                  <h2>How can we help?</h2>
                </div>

                <button className="airo-chatbot-start-card" type="button" onClick={openMessages}>
                  <span>
                    <strong>Start a conversation</strong>
                    <small>We typically reply within 6 hours</small>
                  </span>
                  {renderIcon("send")}
                </button>

                {recentThreads.length > 0 && (
                  <div className="airo-chatbot-home-threads">
                    <h3>Recent messages</h3>
                    {renderThreadList(recentThreads, true)}
                  </div>
                )}

                <div className="airo-chatbot-help-card">
                  <label className="airo-chatbot-search">
                    <span>Search for help</span>
                    {renderIcon("search")}
                  </label>
                  <div className="airo-chatbot-help-list">
                    {helpTopics.map((topic) => (
                      <button key={topic} type="button" onClick={() => askFromTopic(topic)}>
                        <span>{topic}</span>
                        <span aria-hidden="true">›</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="airo-chatbot-conversation">
                {!hasStartedConversation && chatThreads.length > 0 ? (
                  <div className="airo-chatbot-thread-view">
                    {renderThreadList(chatThreads)}
                    <button
                      className="airo-chatbot-message-start"
                      type="button"
                      onClick={openMessages}
                    >
                      <span>Send us a message</span>
                      {renderIcon("send")}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="airo-chatbot-messages" role="log" aria-live="polite">
                      {messages.length === 0 && !isSending ? (
                        <div className="airo-chatbot-empty-state">
                          {renderIcon("messages")}
                          <h3>No messages</h3>
                          <p>Messages from the team will be shown here</p>
                        </div>
                      ) : (
                        messages.map((message, index) => (
                          <div
                            className={`airo-chatbot-message-row airo-chatbot-message-${message.role}`}
                            key={`${message.role}-${index}`}
                          >
                            {message.role === "assistant" && (
                              <div className="airo-chatbot-avatar">
                                <img src="https://dnbgjzscuxrlbceqsrhz.supabase.co/storage/v1/object/public/comany_logo_for_resue/FinalLogo_icon_transparent%20(1).png" alt="AI SDR" />
                              </div>
                            )}
                            <div className="airo-chatbot-bubble">
                              {message.content}
                            </div>
                          </div>
                        ))
                      )}
                      {isSending && (
                        <div className="airo-chatbot-message-row airo-chatbot-message-assistant">
                          <div className="airo-chatbot-avatar">
                            <img src="https://dnbgjzscuxrlbceqsrhz.supabase.co/storage/v1/object/public/comany_logo_for_resue/FinalLogo_icon_transparent%20(1).png" alt="AI SDR" />
                          </div>
                          <div className="airo-chatbot-thinking-indicator">
                            <div className="airo-chatbot-spinner" />
                            <span>Analyzing data, please wait...</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="airo-chatbot-input-area">
                      {messages.length > 0 && (
                        <div className="airo-chatbot-prompts-row" aria-label="Suggested questions">
                          {promptChips.map((chip) => (
                            <button
                              key={chip}
                              type="button"
                              onClick={() => void sendMessage(chip)}
                              disabled={isSending}
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      )}

                      {!hasStartedConversation ? (
                        <button
                          className="airo-chatbot-message-start"
                          type="button"
                          onClick={openMessages}
                        >
                          <span>Start a conversation</span>
                          {renderIcon("send")}
                        </button>
                      ) : (
                        <form className="airo-chatbot-form-sleek" onSubmit={handleSubmit}>
                          <span className="airo-chatbot-form-globe">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="2" y1="12" x2="22" y2="12" />
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                          </span>
                          <input
                            ref={inputRef}
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder="Ask, write or search for anything..."
                            aria-label="Chat message"
                          />
                          <button className="airo-chatbot-send-btn" type="submit" disabled={!canSend} aria-label="Send message">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </button>
                        </form>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "help" && (
              <div className="airo-chatbot-simple-tab">
                <h2>Help center</h2>
                <div className="airo-chatbot-help-card is-flat">
                  <label className="airo-chatbot-search">
                    <span>Search for help</span>
                    {renderIcon("search")}
                  </label>
                  <div className="airo-chatbot-help-list">
                    {helpTopics.map((topic) => (
                      <button key={topic} type="button" onClick={() => askFromTopic(topic)}>
                        <span>{topic}</span>
                        <span aria-hidden="true">›</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "news" && (
              <div className="airo-chatbot-simple-tab">
                <h2>News</h2>
                <button className="airo-chatbot-news-card" type="button" onClick={openMessages}>
                  <strong>New: multichannel AI SDR workflows</strong>
                  <span>Ask us how 360Airo coordinates email, LinkedIn, and SMS outreach.</span>
                </button>
              </div>
            )}
          </div>

          <nav className="airo-chatbot-tabs" aria-label="Chat sections">
            {(["home", "messages", "help", "news"] as ChatTab[]).map((tab) => (
              <button
                className={activeTab === tab ? "is-active" : ""}
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === "messages" && hasStartedConversation) {
                    window.setTimeout(() => inputRef.current?.focus(), 0);
                  }
                }}
              >
                <span className="airo-chatbot-tab-icon-wrapper">
                  {renderIcon(tab)}
                  {activeTab === tab && <span className="airo-chatbot-tab-dot" />}
                </span>
                <span>{tab[0].toUpperCase() + tab.slice(1)}</span>
              </button>
            ))}
          </nav>
        </section>
      )}

      <button
        className="airo-chatbot-launcher"
        type="button"
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        onClick={() => setIsOpen((current) => !current)}
      >
        {renderIcon("messages")}
      </button>
    </div>
   </>
  );
}
