const html = document.documentElement;
    const resetPageScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    resetPageScroll();
    window.addEventListener("load", resetPageScroll);
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const setThemeIcon = () => {
      const isDark = html.dataset.theme === "dark";
      themeIcon.innerHTML = isDark
        ? '<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
        : '<path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z" stroke="currentColor" stroke-width="2"/>';
    };
    themeToggle.addEventListener("click", () => {
      const isDark = html.dataset.theme === "dark";
      html.dataset.theme = isDark ? "light" : "dark";
      setThemeIcon();
    });
    setThemeIcon();

    const notificationMenu = document.getElementById("notificationMenu");
    const notificationToggle = document.getElementById("notificationToggle");
    notificationToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = notificationMenu.classList.toggle("open");
      notificationToggle.setAttribute("aria-expanded", String(isOpen));
    });
    document.addEventListener("click", (event) => {
      if (!notificationMenu.contains(event.target)) {
        notificationMenu.classList.remove("open");
        notificationToggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        notificationMenu.classList.remove("open");
        notificationToggle.setAttribute("aria-expanded", "false");
      }
    });

    const sectionConfig = {
      overview: {
        title: "Overview",
        subtitle: "Dashboard, inbox activity, and performance reporting",
        views: ["dashboard", "inbox", "performance"]
      },
      campaigns: {
        title: "Campaigns",
        subtitle: "Email sequences and scheduled outreach",
        views: ["email-sequence", "scheduled-event"]
      },
      contacts: {
        title: "Data",
        subtitle: "Email sequences, reusable templates, warmup controls, and contact data workflows",
        views: ["email-lists", "template-library", "warmup-control"]
      },
      automation: {
        title: "Automation",
        subtitle: "AI workflows and pipeline handoff",
        views: ["ai-workflow", "pipeline-handoff"]
      },
      account: {
        title: "Account",
        subtitle: "Sender accounts and LinkedIn outreach",
        views: ["email-accounts", "linkedin-touches"]
      },
      profile: {
        title: "Profile",
        subtitle: "Profile, billing, referrals, settings, and help",
        views: ["profile-section", "billing", "affiliate", "buy-prospects", "settings", "help-center"]
      }
    };
    const viewLabels = {
      "warmup-control": {
        title: "Warmup Control",
        subtitle: "Build, monitor, and protect sender reputation before launching outbound campaigns"
      }
    };
    const viewToSection = Object.entries(sectionConfig).reduce((acc, [section, config]) => {
      config.views.forEach((view) => { acc[view] = section; });
      return acc;
    }, {});
    const setActiveSection = (section) => {
      const config = sectionConfig[section] || sectionConfig.overview;
      document.getElementById("pageTitle").textContent = config.title;
      document.getElementById("pageSubtitle").textContent = config.subtitle;
      document.querySelectorAll("[data-section-tabs]").forEach((tabs) => {
        tabs.hidden = tabs.dataset.sectionTabs !== section;
      });
      document.querySelectorAll("[data-section-target]").forEach((item) => {
        item.classList.toggle("active", item.dataset.sectionTarget === section);
      });
    };

    document.querySelectorAll("[data-section-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.defaultView;
        showView(target, button.dataset.sectionTarget);
        history.replaceState(null, "", `#${target}`);
        resetPageScroll();
      });
    });

    document.querySelectorAll("[data-target-view]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.targetView;
        const preferredSection = button.dataset.targetSection || button.closest("[data-section-tabs]")?.dataset.sectionTabs;
        showView(target, preferredSection);
        history.replaceState(null, "", `#${target}`);
        resetPageScroll();
      });
    });
    const showView = (target, preferredSection) => {
      if (target === "linkedin") {
        target = "linkedin-touches";
        preferredSection = "account";
      }
      document.querySelectorAll("[data-view]").forEach((view) => {
        view.hidden = view.dataset.view !== target;
      });
      const section = preferredSection || viewToSection[target] || "overview";
      setActiveSection(section);
      if (viewLabels[target]) {
        document.getElementById("pageTitle").textContent = viewLabels[target].title;
        document.getElementById("pageSubtitle").textContent = viewLabels[target].subtitle;
      }
      document.querySelectorAll(".section-tab").forEach((item) => {
        const itemSection = item.dataset.targetSection || item.closest("[data-section-tabs]")?.dataset.sectionTabs;
        item.classList.toggle("active", item.dataset.targetView === target && itemSection === section);
      });
      
      const fab = document.querySelector('.sched-fab-wrapper');
      if (fab) {
        if (fab.parentElement !== document.body) {
          document.body.appendChild(fab);
        }
        fab.style.display = target === 'scheduled-event' ? 'flex' : 'none';
      }
    };
    showView(location.hash.replace("#", "") || "dashboard");
    resetPageScroll();
    initSequenceLibrary();

    const inboxMessages = {
      isla: {
        subject: "Unlock Efficient Outreach with AI",
        sender: "Isla Clarke",
        email: "<isla.golead@outlook.com>",
        recipient: "To: inquire@zdigital.com",
        avatar: "<img class=\"sender-avatar\" style=\"object-fit:cover;\" src=\"https://i.pravatar.cc/150?u=isla\" alt=\"I\">", avatarClass: "",
        badge: "sales 70%",
        badgeClass: "badge sales",
        date: "Thu, 11 Jun 2026 &middot; 14:22",
        intent: "Meeting intent: 70%",
        next: "Suggested action: Reply within 2 hours",
        placeholder: "Reply to Isla Clarke...",
        body: [
          "Hi there,",
          "Scaling outreach while maintaining a personal touch is a challenge many B2B leaders face. With the dynamic landscape of digital engagement, the pressure to stand out is higher than ever.",
          "If your team is spending too much time crafting generic emails or juggling multiple outreach tools, you might be missing opportunities to connect effectively.",
          "Are you interested in a quick demo to see how 360Airo can streamline your process and boost your response rates?",
          "Best Regards,<br><strong>Isla Clarke</strong>"
        ]
      },
      shaylyn: {
        subject: "We should discuss this | 9XAT619",
        sender: "Shaylyn Guasta",
        email: "<shaylyng@buildseamscontact.info>",
        recipient: "To: rex8182004@gmail.com",
        avatar: "<img class=\"sender-avatar\" style=\"object-fit:cover;\" src=\"https://i.pravatar.cc/150?u=shaylyn\" alt=\"S\">", avatarClass: "",
        badge: "general 50%",
        badgeClass: "badge general",
        date: "Thu, 11 Jun 2026 &middot; 11:08",
        intent: "Meeting intent: 52%",
        next: "Suggested action: Ask for preferred time",
        placeholder: "Reply to Shaylyn Guasta...",
        body: [
          "Hi there,",
          "It was a pleasure speaking with you last week.",
          "Can we set up a time to chat and see if we can work something out?",
          "I'll see you next week!",
          "Cheers,<br>Shaylyn Guasta<br>9XAT619 3CB1W26"
        ]
      },
      molly: {
        subject: "Routing question | LinkedIn touch",
        sender: "Molly Crosby",
        email: "<molly@northstarops.com>",
        recipient: "To: team@360airo.com",
        avatar: "<img class=\"sender-avatar\" style=\"object-fit:cover;\" src=\"https://i.pravatar.cc/150?u=molly\" alt=\"M\">", avatarClass: "",
        badge: "support",
        badgeClass: "badge support",
        date: "Thu, 11 Jun 2026 &middot; 03:33",
        intent: "Support intent: 81%",
        next: "Suggested action: Assign to campaign owner",
        placeholder: "Reply to Molly Crosby...",
        body: [
          "Hi team,",
          "Can this be routed to the campaign inbox before the next LinkedIn step runs?",
          "We want the owner to respond from the same thread and avoid duplicating the touch.",
          "Thanks,<br>Molly"
        ]
      },
      kiran: {
        subject: "User - got time for a chat?",
        sender: "Kiran Dhugga",
        email: "<kiran@talentbridge.co>",
        recipient: "To: outbound@360airo.com",
        avatar: "<img class=\"sender-avatar\" style=\"object-fit:cover;\" src=\"https://i.pravatar.cc/150?u=kiran\" alt=\"K\">", avatarClass: "",
        badge: "recruitment",
        badgeClass: "badge recruitment",
        date: "Thu, 11 Jun 2026 &middot; 03:05",
        intent: "Meeting intent: 64%",
        next: "Suggested action: Offer two meeting slots",
        placeholder: "Reply to Kiran Dhugga...",
        body: [
          "Hello,",
          "I hope we can get together sometime this week.",
          "The campaign context looks relevant and I would like to understand how your team handles recruiting outreach.",
          "Regards,<br>Kiran"
        ]
      }
    };

    const initUnifiedInbox = () => {
      const inbox = document.querySelector(".unified-inbox");
      if (!inbox) return;
      const emptyState = inbox.querySelector("[data-inbox-empty]");
      const connectedState = inbox.querySelector("[data-inbox-connected]");
      const accountSelector = inbox.querySelector("[data-account-selector]");
      const accountToggle = inbox.querySelector("[data-account-toggle]");
      const selectedAccount = inbox.querySelector("[data-selected-account]");
      const syncStatus = inbox.querySelector("[data-sync-status]");
      const loading = inbox.querySelector("[data-conversation-loading]");
      const list = inbox.querySelector("[data-conversation-list]");
      const emptyList = inbox.querySelector("[data-conversation-empty]");
      const search = inbox.querySelector("[data-inbox-search]");
      const category = inbox.querySelector("[data-category-filter]");
      const replyInput = inbox.querySelector("[data-reply-input]");
      const sendReply = inbox.querySelector("[data-send-reply]");
      const aiAssist = inbox.querySelector("[data-ai-assist]");
      const activity = inbox.querySelector("[data-inbox-activity]");
      const activityText = inbox.querySelector("[data-inbox-activity-text]");
      const activityUndo = inbox.querySelector("[data-inbox-activity-undo]");
      const conversationButtons = Array.from(inbox.querySelectorAll("[data-conversation]"));
      let activityTimer = null;
      let pendingAction = null;
      let currentConversation = conversationButtons.find((item) => item.classList.contains("active")) || conversationButtons[0] || null;

      const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character]));

      const showActivity = (message, undoHandler) => {
        if (!activity || !activityText) return;
        if (activityTimer) window.clearTimeout(activityTimer);
        pendingAction = typeof undoHandler === "function" ? undoHandler : null;
        activityText.textContent = message;
        activity.hidden = false;
        activityTimer = window.setTimeout(() => {
          activity.hidden = true;
          pendingAction = null;
        }, 5000);
      };

      const selectConversation = (button) => {
        if (!button) return;
        conversationButtons.forEach((item) => item.classList.toggle("active", item === button));
        button.classList.remove("unread");
        currentConversation = button;
        renderMessage(button.dataset.conversation);
      };

      const appendReply = (text) => {
        const messageBody = inbox.querySelector("[data-message-body]");
        const reply = document.createElement("p");
        reply.className = "outgoing-message";
        reply.innerHTML = `<strong>You:</strong> ${escapeHtml(text).replace(/\n/g, "<br>")}`;
        messageBody.appendChild(reply);
      };

      const removeConversation = (action) => {
        const activeButton = inbox.querySelector(".conversation-item.active");
        if (!activeButton) return;
        const wasUnread = activeButton.classList.contains("unread");
        activeButton.classList.add("is-removed");
        activeButton.classList.remove("unread");
        showActivity(`${action === "archive" ? "Conversation archived" : "Conversation deleted"}.`, () => {
          activeButton.classList.remove("is-removed");
          if (wasUnread) activeButton.classList.add("unread");
          selectConversation(activeButton);
        });
      };

      const sendReplyMessage = () => {
        const text = replyInput.value.trim();
        if (!text) return;
        appendReply(text);
        replyInput.value = "";
        inbox.querySelector(".conversation-item.active")?.classList.remove("unread");
        showActivity(`Reply sent to ${inbox.querySelector("[data-message-sender]")?.textContent || "conversation"}.`);
      };

      const setInboxState = (state) => {
        const isConnected = state === "connected";
        inbox.dataset.inboxState = state;
        emptyState.hidden = isConnected;
        connectedState.hidden = !isConnected;
      };

      const renderMessage = (key) => {
        const message = inboxMessages[key];
        if (!message) return;
        currentConversation = inbox.querySelector(`[data-conversation="${key}"]`) || currentConversation;
        inbox.querySelector("[data-message-subject]").textContent = message.subject;
        inbox.querySelector("[data-message-sender]").textContent = message.sender;
        inbox.querySelector("[data-message-email]").textContent = message.email;
        inbox.querySelector("[data-message-recipient]").textContent = message.recipient;
        const avatar = inbox.querySelector("[data-message-avatar]");
        avatar.className = message.avatarClass;
        if(message.avatar.includes("<img")) { avatar.outerHTML = message.avatar; } else { avatar.textContent = message.avatar; }
        const badge = inbox.querySelector("[data-message-badge]");
        badge.className = message.badgeClass;
        badge.textContent = message.badge;
        inbox.querySelector("[data-message-date]").textContent = message.date;
        inbox.querySelector("[data-intent-score]").textContent = message.intent;
        inbox.querySelector("[data-next-action]").textContent = message.next;
        inbox.querySelector("[data-message-body]").innerHTML = message.body.map((line) => `<p>${line}</p>`).join("");
        replyInput.placeholder = message.placeholder;
        replyInput.value = "";
      };
      setInboxState(inbox.dataset.inboxState || "connected");

      inbox.querySelector("[data-connect-inbox]")?.addEventListener("click", () => setInboxState("connected"));
      accountToggle?.addEventListener("click", () => {
        const open = accountSelector.classList.toggle("open");
        accountToggle.setAttribute("aria-expanded", String(open));
      });
      inbox.querySelectorAll("[data-account]").forEach((button) => {
        button.addEventListener("click", () => {
          selectedAccount.textContent = button.dataset.account;
          accountSelector.classList.remove("open");
          accountToggle.setAttribute("aria-expanded", "false");
        });
      });
      document.addEventListener("click", (event) => {
        if (!accountSelector?.contains(event.target)) {
          accountSelector?.classList.remove("open");
          accountToggle?.setAttribute("aria-expanded", "false");
        }
      });

      inbox.querySelectorAll("[data-folder]").forEach((button) => {
        button.addEventListener("click", () => {
          inbox.querySelectorAll("[data-folder]").forEach((item) => item.classList.toggle("active", item === button));
          loading.hidden = false;
          list.style.opacity = ".35";
          setTimeout(() => {
            loading.hidden = true;
            list.style.opacity = "";
          }, 650);
        });
      });

      conversationButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const star = event.target.closest("[data-star]");
          if (star) {
            const starred = star.dataset.starred === "true";
            star.dataset.starred = String(!starred);
            star.innerHTML = starred ? "&#9734;" : "&#9733;";
            event.stopPropagation();
            return;
          }
          selectConversation(button);
        });
      });

      activityUndo?.addEventListener("click", () => {
        if (activityTimer) window.clearTimeout(activityTimer);
        activity.hidden = true;
        pendingAction?.();
        pendingAction = null;
      });

      sendReply?.addEventListener("click", sendReplyMessage);
      replyInput?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          sendReplyMessage();
        }
      });

      aiAssist?.addEventListener("click", () => {
        const sender = inbox.querySelector("[data-message-sender]")?.textContent || "this contact";
        replyInput.value = `Thanks ${sender.split(" ")[0]}, I reviewed the thread and I\'ll follow up with next steps shortly.`;
        replyInput.focus();
        replyInput.setSelectionRange(replyInput.value.length, replyInput.value.length);
      });

      const filterConversations = () => {
        const q = search.value.trim().toLowerCase();
        const selectedCategory = category.value.toLowerCase();
        let visible = 0;
        inbox.querySelectorAll("[data-conversation]").forEach((item) => {
          const text = item.textContent.toLowerCase();
          const categoryMatch = selectedCategory === "all categories" || text.includes(selectedCategory);
          const queryMatch = !q || text.includes(q);
          const show = categoryMatch && queryMatch;
          item.hidden = !show;
          if (show) visible += 1;
        });
        emptyList.hidden = visible > 0;
      };
      search?.addEventListener("input", filterConversations);
      category?.addEventListener("change", filterConversations);

      inbox.querySelectorAll("[data-sync-inbox]").forEach((button) => {
        button.addEventListener("click", () => {
          inbox.classList.add("is-busy");
          syncStatus.classList.add("is-syncing");
          syncStatus.lastChild.textContent = " Syncing now";
          loading.hidden = false;
          setTimeout(() => {
            inbox.classList.remove("is-busy");
            syncStatus.classList.remove("is-syncing");
            syncStatus.lastChild.textContent = " Synced just now";
            loading.hidden = true;
          }, 900);
        });
      });
      renderMessage(currentConversation?.dataset.conversation || "isla");
      inbox.querySelectorAll("[data-toolbar-action]").forEach((button) => {
        button.addEventListener("click", () => {
          if (button.dataset.toolbarAction === "archive" || button.dataset.toolbarAction === "delete") {
            removeConversation(button.dataset.toolbarAction);
          } else if (button.dataset.toolbarAction === "reply") {
            replyInput.focus();
          } else if (button.dataset.toolbarAction === "unread") {
            const activeButton = inbox.querySelector(".conversation-item.active");
            if (!activeButton) return;
            activeButton.classList.add("unread");
            showActivity("Conversation marked as unread.");
          } else if (button.dataset.toolbarAction === "forward") {
            replyInput.value = `Forwarding note: ${inbox.querySelector("[data-message-subject]")?.textContent || "message"}`;
            replyInput.focus();
            showActivity("Forward draft started.");
          } else {
            showActivity("More actions are available in the full product.");
          }
        });
      });
    };
    initUnifiedInbox();

    function initSequenceLibrary() {
      const view = document.querySelector(".esm-view");
      if (!view) return;
      if (view.dataset.elcInit === "true") return;
      view.dataset.elcInit = "true";

      const sampleContacts = [
        { email: "tyler@capitalrivers.com", first: "Tyler", last: "Jardine", title: "Director", company: "Capital Rivers Commercial", website: "capitalrivers.com" },
        { email: "jamie@legacyire.com", first: "Jamie", last: "Furlong", title: "Managing Partner", company: "Legacy Investment Real Estate", website: "legacyire.com" },
        { email: "marco@noradarealestate.com", first: "Marco", last: "Creator", title: "Founder & CEO", company: "Norada Real Estate Investments", website: "noradarealestate.com" }
      ];
      const fields = [
        ["Email Address", "Primary Email", "Required"],
        ["First Name", "First Name", "Matched"],
        ["Last Name", "Last Name", "Matched"],
        ["Title", "Job Title", "Matched"],
        ["Company Name", "Company Name", "Matched"],
        ["Website", "Website", "Matched"],
        ["Address", "Address", "Matched"],
        ["City", "City", "Matched"],
        ["State", "State", "Matched"],
        ["Country", "Country", "Matched"],
        ["Zip Code", "ZIP Code", "Matched"],
        ["Phone Number", "Phone Number", "Matched"],
        ["Industry", "Industry", "Matched"],
        ["LinkedIn URL", "LinkedIn Profile", "Matched"],
        ["Employee Size", "Company Size", "Matched"],
        ["Revenue Size", "Revenue Range", "Matched"],
        ["SIC Code", "Industry Classification", "Matched"]
      ];
      let state = {
        screen: "dashboard",
        activeTab: "lists",
        hasFile: false,
        listName: "Retailer Across Texas",
        description: "Retail executives, owners, and finance contacts prepared for Q3 outbound.",
        lists: [
          {
            id: "retail-texas",
            name: "Retailer Across Texas",
            description: "A curated prospect list for retail operators and finance leaders across Texas.",
            contacts: 5,
            valid: 5,
            invalid: 0,
            quality: "94%",
            open: "0%",
            click: "0%",
            status: "Active",
            health: "Ready",
            file: "sample - REITs and Real Estate Investors.xlsx",
            updated: "0m ago"
          }
        ]
      };

      const icon = (path) => `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${path}</svg>`;
      const toast = (message) => {
        const wrap = view.querySelector("#esmToastContainer");
        if (!wrap) return;
        const item = document.createElement("div");
        item.className = "esm-toast";
        item.innerHTML = `${icon('<path d="M20 6 9 17l-5-5"/>')}<div class="esm-toast-content">${message}</div>`;
        wrap.appendChild(item);
        setTimeout(() => {
          item.classList.add("fade-out");
          setTimeout(() => item.remove(), 260);
        }, 2600);
      };
      const stats = () => {
        const totalContacts = state.lists.reduce((sum, list) => sum + list.contacts, 0);
        const totalValid = state.lists.reduce((sum, list) => sum + list.valid, 0);
        return [
          ["Total Lists", state.lists.length, "Active workspaces", "#3B82F6", '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h8M8 17h4"/>'],
          ["Total Contacts", totalContacts, `${totalValid} valid`, "#10B981", '<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/>'],
          ["This Month", `+${totalContacts}`, "New imports", "#A855F7", '<path d="M3 17 9 11l4 4 8-8"/><path d="M14 7h7v7"/>'],
          ["Avg. Quality", state.lists.length ? "94%" : "0%", "Verification score", "#F59E0B", '<path d="m12 2 3 7h7l-5.5 4.5 2 7-6.5-4-6.5 4 2-7L2 9h7z"/>'],
          ["Open Rate", "0%", "Campaign avg", "#F43F5E", '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>']
        ];
      };
      const renderListCards = () => {
        if (!state.lists.length) {
          return `<div class="elc-empty-mini" style="grid-column:1/-1;min-height:260px;border:1px dashed var(--line);border-radius:8px;background:var(--surface);">
            <div>${icon('<path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h5"/>')}<strong>No email lists yet</strong><span>Upload a CSV or XLSX file to create your first prospect list.</span></div>
          </div>`;
        }
        return state.lists.map((list) => `
          <article class="elc-list-card" data-list-card="${list.id}">
            <div class="elc-card-top">
              <div class="elc-badges">
                <span class="elc-badge" style="--tone:#10B981">${list.status}</span>
                <span class="elc-badge" style="--tone:#F59E0B">${list.health}</span>
              </div>
              <button class="elc-icon-btn" type="button" data-delete-list="${list.id}" aria-label="Delete list">${icon('<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m10 11 .5 6M14 11l-.5 6"/><path d="M5 6l1 14h12l1-14"/>')}</button>
            </div>
            <h3>${list.name}</h3>
            <p>${list.description}</p>
            <div class="elc-card-metrics">
              <div class="elc-card-metric"><strong>${list.contacts}</strong><span>Contacts</span></div>
              <div class="elc-card-metric"><strong>${list.quality}</strong><span>Quality</span></div>
              <div class="elc-card-metric"><strong>${list.open}</strong><span>Open Rate</span></div>
              <div class="elc-card-metric"><strong>${list.click}</strong><span>Click Rate</span></div>
            </div>
            <div class="elc-card-footer">
              <span>${list.updated}</span>
              <span>${list.file}</span>
              <div class="elc-card-actions">
                <button class="elc-icon-btn" type="button" title="Preview">${icon('<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>')}</button>
                <button class="elc-icon-btn" type="button" title="Export">${icon('<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>')}</button>
              </div>
            </div>
          </article>
        `).join("");
      };
      const renderContacts = () => `
        <section class="elc-panel">
          <div class="elc-panel-title"><h3>Contact Preview</h3><p>Sample records from the selected email list.</p></div>
          <div class="elc-preview-table">
            <table><thead><tr><th>Email</th><th>Name</th><th>Title</th><th>Company</th><th>Website</th></tr></thead><tbody>
              ${sampleContacts.map((contact) => `<tr><td>${contact.email}</td><td>${contact.first} ${contact.last}</td><td>${contact.title}</td><td>${contact.company}</td><td>${contact.website}</td></tr>`).join("")}
            </tbody></table>
          </div>
        </section>`;
      const renderDashboard = () => `
        <div class="elc-shell">
          <div class="elc-head">
            <div class="elc-title"><h2>Email Lists</h2><p>Import, verify, map, and manage prospect databases before campaigns use them.</p></div>
            <div class="elc-actions">
              <button class="btn ghost" type="button" data-elc-refresh>${icon('<path d="M21 12a9 9 0 0 1-15.5 6.2M3 12A9 9 0 0 1 18.5 5.8M18 3v5h-5M6 21v-5h5"/>')} Refresh</button>
              <button class="btn primary" type="button" data-elc-upload>${icon('<path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/>')} Upload</button>
            </div>
          </div>
          <div class="elc-tabs">
            <button class="elc-tab ${state.activeTab === "lists" ? "active" : ""}" type="button" data-elc-tab="lists">Lists</button>
            <button class="elc-tab ${state.activeTab === "contacts" ? "active" : ""}" type="button" data-elc-tab="contacts">Contacts</button>
          </div>
          <div class="elc-stats">${stats().map(([label, value, sub, tone, svg]) => `<div class="elc-stat" style="--tone:${tone}"><div><span>${label}</span><strong>${value}</strong><small>${sub}</small></div><div class="elc-stat-icon">${icon(svg)}</div></div>`).join("")}</div>
          <section class="elc-callout">
            <div class="elc-callout-icon">${icon('<path d="M12 2l2.6 6.4L21 11l-6.4 2.6L12 20l-2.6-6.4L3 11l6.4-2.6z"/>')}</div>
            <div><h3>Need targeted prospects?</h3><p>Define industry, location, titles, and quality rules. 360Airo can prepare a verified list for your next campaign.</p></div>
            <button class="btn primary" type="button">Request Prospects</button>
          </section>
          <section class="elc-toolbar">
            <label class="elc-search">${icon('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>')}<input type="search" placeholder="Search lists by name, description, tag, or owner..."></label>
            <div class="elc-filterbar">
              <select class="elc-select"><option>All Status</option><option>Active</option><option>Needs Review</option><option>Verified</option></select>
              <button class="btn ghost" type="button">${icon('<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M2 14h4"/><path d="M10 8h4"/><path d="M18 16h4"/>')} Filters</button>
              <div class="elc-view-toggle"><button class="active" type="button">Grid</button><button type="button">List</button></div>
            </div>
          </section>
          ${state.activeTab === "lists" ? `<section class="elc-grid">${renderListCards()}</section>` : renderContacts()}
          <section class="elc-unsub">
            <div class="elc-unsub-head">
              <div><h3>Unsubscribed Users</h3><p>Contacts who replied with unsubscribe or not-interested messages.</p></div>
              <div class="elc-inline-actions"><label class="elc-search" style="width:220px;min-height:34px">${icon('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>')}<input type="search" placeholder="Search..."></label><button class="btn ghost" type="button">Refresh</button></div>
            </div>
            <div class="elc-empty-mini"><div>${icon('<path d="M20 6 9 17l-5-5"/>')}<strong>No unsubscribed users</strong><span>No unsubscribe replies detected yet.</span></div></div>
          </section>
          <div class="esm-toast-container" id="esmToastContainer"></div>
        </div>`;
      const renderUpload = () => `
        <div class="elc-wizard">
          <div class="elc-wizard-header">
            <div class="elc-wizard-title"><button class="esm-wizard-back" type="button" data-elc-dashboard>${icon('<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>')} Back to Email Lists</button><h2>Upload Email List</h2><p>Import contacts from CSV or XLSX, then verify and map fields before saving.</p></div>
            <div class="elc-progress"><span><b>Progress</b><em>Step 1 of 2</em></span><i><b style="--progress:50%"></b></i></div>
          </div>
          <div class="elc-wizard-grid">
            <div class="elc-side-stack">
              <section class="elc-panel">
                <div class="elc-panel-title"><h3>List Information</h3><p>Use a clear name so the audience is easy to find later.</p></div>
                <div class="elc-form" style="margin-top:14px">
                  <label>List Name <input id="elcListName" value="${state.listName}" placeholder="Example: Retailer Across Texas"></label>
                  <label>Description <textarea id="elcDescription" placeholder="Who is this list for?">${state.description}</textarea></label>
                  <label>Tags <input placeholder="retail, texas, decision-makers"></label>
                </div>
              </section>
              <section class="elc-panel">
                <div class="elc-panel-title"><h3>Upload Contact File</h3><p>CSV and XLSX files are supported. Headers in the first row work best.</p></div>
                ${state.hasFile ? `<div class="elc-upload-file elc-panel" style="margin-top:12px"><div><strong>sample - REITs and Real Estate Investors.xlsx</strong><p>5 rows - 16 columns - 11 KB</p></div><button class="elc-icon-btn" type="button" data-elc-remove-file>${icon('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>')}</button></div>` : `<button class="elc-drop" type="button" data-elc-sim-upload style="width:100%;margin-top:12px">${icon('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>')}<strong>Click to upload</strong><span>or drag and drop your CSV or XLSX file</span><span>Secure - Max 10MB - CSV or XLSX</span></button>`}
              </section>
              <button class="btn primary" type="button" data-elc-mapping ${state.hasFile ? "" : "disabled"}>Continue to Field Mapping</button>
            </div>
            <aside class="elc-side-stack">
              <section class="elc-panel">
                <div class="elc-panel-title"><h3>Preview</h3><p>${state.hasFile ? "Live sample from your uploaded file." : "Upload a file to see a preview."}</p></div>
                ${state.hasFile ? `<div class="elc-preview-table"><table><thead><tr><th>Company</th><th>Website</th></tr></thead><tbody>${sampleContacts.map((c) => `<tr><td>${c.company}</td><td>${c.website}</td></tr>`).join("")}</tbody></table></div>` : `<div class="elc-empty-mini"><div>${icon('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>')}<strong>No data yet</strong><span>Upload a file to preview rows and columns.</span></div></div>`}
              </section>
              <section class="elc-panel">
                <div class="elc-panel-title"><h3>Email Verification</h3><p>Verification improves deliverability and protects sender reputation.</p></div>
                <div class="elc-verify">
                  <label class="elc-radio"><input type="radio" name="elcVerify" checked><div><strong>Verify 5 Contacts</strong><span>Check all uploaded emails after saving.</span></div><span class="elc-badge" style="--tone:#10B981">Auto</span></label>
                  <label class="elc-radio"><input type="radio" name="elcVerify"><div><strong>Skip Verification</strong><span>Import without validating emails.</span></div></label>
                </div>
              </section>
              <section class="elc-panel"><div class="elc-status-row"><span>Contact upload limit</span><strong>${state.hasFile ? "5" : "0"}/25000</strong></div><div class="esm-progress-bar"><div class="esm-progress-fill" style="width:${state.hasFile ? "2%" : "0%"}"></div></div><p style="margin:8px 0 0;color:var(--muted);font-size:12px">${state.hasFile ? "24,995" : "25,000"} contacts remaining.</p></section>
            </aside>
          </div>
          <div class="esm-toast-container" id="esmToastContainer"></div>
        </div>`;
      const renderMapping = () => `
        <div class="elc-wizard">
          <div class="elc-wizard-header">
            <div class="elc-wizard-title"><button class="esm-wizard-back" type="button" data-elc-upload-back>${icon('<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>')} Back to Upload</button><h2>Field Mapping</h2><p>5 rows - 16 columns - 17 contact fields. Smart matching has been applied.</p></div>
            <div class="elc-progress"><span><b>Mapping Progress</b><em>Step 2 of 2</em></span><i><b style="--progress:100%"></b></i></div>
          </div>
          <div class="elc-wizard-grid">
            <section class="elc-panel">
              <div class="elc-panel-title"><h3>Map CSV Columns to Contact Fields</h3><p>Confirm that every uploaded column points to the right 360Airo contact field.</p></div>
              <div class="elc-map-list" style="margin-top:14px">${fields.map(([source, target, status]) => `<div class="elc-map-row"><div><strong>${source}</strong><span>${status}</span></div><select><option>${target}</option><option>Do not import</option></select><span class="elc-badge" style="--tone:#10B981">Mapped</span></div>`).join("")}</div>
            </section>
            <aside class="elc-side-stack">
              <section class="elc-panel"><div class="elc-panel-title"><h3>Mapping Status</h3><p>All required fields are ready.</p></div><div class="elc-status-row"><span>Fields mapped</span><strong>17 / 17</strong></div><div class="elc-status-row"><span>Total rows</span><strong>5</strong></div><div class="elc-status-row"><span>Contact limit</span><strong>5 / 25000</strong></div><div class="elc-status-row"><span>Progress</span><strong>100%</strong></div></section>
              <section class="elc-panel"><div class="elc-panel-title"><h3>Data Preview</h3><p>Sample of mapped contact data.</p></div><div class="elc-preview-table"><table><tbody>${sampleContacts.map((c) => `<tr><td>${c.first} ${c.last}</td><td>${c.company}</td><td>${c.email}</td></tr>`).join("")}</tbody></table></div></section>
              <button class="btn primary" type="button" data-elc-create>${icon('<path d="M13 2 3 14h8l-1 8 10-12h-8z"/>')} Create Email List</button>
            </aside>
          </div>
          <div class="esm-toast-container" id="esmToastContainer"></div>
        </div>`;

      const render = () => {
        view.innerHTML = state.screen === "upload" ? renderUpload() : state.screen === "mapping" ? renderMapping() : renderDashboard();
      };
      const readFormState = () => {
        const name = view.querySelector("#elcListName")?.value.trim();
        const description = view.querySelector("#elcDescription")?.value.trim();
        if (name) state.listName = name;
        if (description) state.description = description;
      };
      view.addEventListener("click", (event) => {
        const target = event.target.closest("[data-elc-upload],[data-elc-dashboard],[data-elc-sim-upload],[data-elc-remove-file],[data-elc-mapping],[data-elc-upload-back],[data-elc-create],[data-elc-refresh],[data-elc-tab],[data-delete-list]");
        if (!target) return;
        if (target.dataset.elcUpload !== undefined) state.screen = "upload";
        if (target.dataset.elcDashboard !== undefined) state.screen = "dashboard";
        if (target.dataset.elcSimUpload !== undefined) { readFormState(); state.hasFile = true; }
        if (target.dataset.elcRemoveFile !== undefined) state.hasFile = false;
        if (target.dataset.elcMapping !== undefined) { readFormState(); state.screen = "mapping"; }
        if (target.dataset.elcUploadBack !== undefined) state.screen = "upload";
        if (target.dataset.elcCreate !== undefined) {
          readFormState();
          state.lists = [{
            id: "retail-texas",
            name: state.listName,
            description: state.description,
            contacts: 5,
            valid: 5,
            invalid: 0,
            quality: "94%",
            open: "0%",
            click: "0%",
            status: "Active",
            health: "Verified",
            file: "sample - REITs and Real Estate Investors.xlsx",
            updated: "Just now"
          }];
          state.screen = "dashboard";
          state.activeTab = "lists";
          render();
          toast("Email list created successfully.");
          return;
        }
        if (target.dataset.elcRefresh !== undefined) {
          toast("Email lists refreshed.");
          return;
        }
        if (target.dataset.elcTab) state.activeTab = target.dataset.elcTab;
        if (target.dataset.deleteList) {
          state.lists = state.lists.filter((list) => list.id !== target.dataset.deleteList);
          render();
          toast("Email list deleted.");
          return;
        }
        render();
      });
      render();
    }
    initSequenceLibrary();

    const initCampaignSequence = () => {
      const view = document.querySelector(".campaign-sequence");
      if (!view) return;
      const title = view.querySelector("[data-builder-title]");
      const nameInput = view.querySelector("[data-editor-name]");
      const subjectInput = view.querySelector("[data-editor-subject]");
      const bodyInput = view.querySelector("[data-editor-body]");
      const timeline = view.querySelector("[data-step-timeline]");
      const stepCount = view.querySelector("[data-builder-step-count]");
      const toast = view.querySelector("[data-sequence-toast]");
      const importPanel = view.querySelector("[data-audience-import]");
      const uploadTitle = view.querySelector("[data-upload-title]");
      const uploadStepLabel = view.querySelector("[data-upload-step-label]");
      const uploadProgress = view.querySelector("[data-upload-progress]");
      const deleteModal = view.querySelector("[data-sequence-delete-modal]");
      const modeTabs = view.querySelectorAll("[data-mode-tab]");
      const modePanels = view.querySelectorAll("[data-mode-panel]");
      const setSequenceMode = (mode) => {
        modeTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.modeTab === mode));
        modePanels.forEach((panel) => {
          panel.hidden = panel.dataset.modePanel !== mode;
        });
      };
      const showUploadStep = (step) => {
        view.querySelectorAll("[data-upload-step]").forEach((panel) => {
          panel.hidden = panel.dataset.uploadStep !== String(step);
        });
        uploadTitle.textContent = step === 1 ? "Upload Email Sequence" : "Field Mapping";
        uploadStepLabel.textContent = step === 1 ? "Step 1 of 2" : "Step 2 of 2";
        uploadProgress.style.setProperty("--w", step === 1 ? "50%" : "100%");
      };
      const showToast = (message) => {
        toast.textContent = message;
        toast.hidden = false;
        setTimeout(() => { toast.hidden = true; }, 2200);
      };
      const showToastStack = (messages) => {
        messages.forEach((message, index) => {
          setTimeout(() => showToast(message), index * 900);
        });
      };
      const loadStep = (step) => {
        view.querySelectorAll(".step-card").forEach((item) => item.classList.toggle("active", item === step));
        nameInput.value = step.dataset.stepTitle || "New Email Step";
        subjectInput.value = step.dataset.stepSubject || "";
        bodyInput.value = (step.dataset.stepBody || "").replaceAll("\\n", "\n");
      };
      view.querySelectorAll("[data-campaign-sequence]").forEach((button) => {
        button.addEventListener("click", () => {
          view.querySelectorAll("[data-campaign-sequence]").forEach((item) => item.classList.toggle("active", item === button));
          title.textContent = button.dataset.campaignSequence;
          showToast(`${button.dataset.campaignSequence} loaded.`);
        });
      });
      modeTabs.forEach((tab) => {
        tab.addEventListener("click", () => setSequenceMode(tab.dataset.modeTab));
      });
      timeline.addEventListener("click", (event) => {
        const step = event.target.closest(".step-card");
        if (step) loadStep(step);
      });
      view.querySelectorAll("[data-add-step]").forEach((button) => {
        button.addEventListener("click", () => {
          const count = view.querySelectorAll(".step-card").length + 1;
          const step = document.createElement("button");
          step.className = "step-card";
          step.type = "button";
          step.dataset.stepTitle = `Follow-up ${count}`;
          step.dataset.stepSubject = "Following up on {{company}}";
          step.dataset.stepBody = "Hi {{first_name}},\\n\\nJust bringing this back to the top. If outbound quality or list intelligence is a priority, I can share a concise workflow example.\\n\\nWorth exploring?";
          step.innerHTML = `<small>Step ${count} &middot; Day ${count * 3}</small><strong>Follow-up ${count}</strong><span>New email touch added to the sequence.</span><i style="--w:52%"></i>`;
          timeline.insertBefore(step, timeline.querySelector(".add-step-card"));
          if (stepCount) stepCount.textContent = String(count);
          loadStep(step);
          showToast("New sequence step added.");
        });
      });
      view.querySelectorAll("[data-ai-rewrite]").forEach((button) => {
        button.addEventListener("click", () => {
          bodyInput.value = `Hi {{first_name}},\n\nI noticed {{company}} is focused on growth in {{industry}}. 360Airo helps teams turn verified prospect lists into personalized outreach sequences, then routes positive replies back into one workflow.\n\nWould a short example be useful this week?`;
          showToast("AI rewrite applied to the selected step.");
        });
      });
      view.querySelectorAll("[data-sequence-save]").forEach((button) => {
        button.addEventListener("click", () => showToast("Sequence saved successfully."));
      });
      view.querySelector("[data-sequence-launch]")?.addEventListener("click", () => {
        setSequenceMode("audiences");
        importPanel.hidden = false;
        showUploadStep(1);
        importPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      view.querySelector("[data-sequence-preview]")?.addEventListener("click", () => showToast("Preview generated for the selected audience."));
      view.querySelectorAll("[data-open-audience-import]").forEach((button) => {
        button.addEventListener("click", () => {
          setSequenceMode("audiences");
          importPanel.hidden = false;
          showUploadStep(1);
          importPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
      view.querySelector("[data-close-audience-import]")?.addEventListener("click", () => {
        importPanel.hidden = true;
      });
      view.querySelector("[data-go-mapping]")?.addEventListener("click", () => {
        showUploadStep(2);
        showToast("Successfully parsed 5 rows with 16 columns.");
      });
      view.querySelector("[data-create-email-sequence]")?.addEventListener("click", () => {
        importPanel.hidden = true;
        setSequenceMode("audiences");
        showToastStack([
          "Successfully parsed 5 rows with 16 columns.",
          "Email verification has started.",
          "Email Sequence created successfully."
        ]);
      });
      view.querySelector("[data-campaign-search]")?.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase().trim();
        view.querySelectorAll("[data-audience-card]").forEach((card) => {
          card.hidden = query && !card.textContent.toLowerCase().includes(query);
        });
      });
      view.querySelectorAll("[data-sequence-delete]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          deleteModal.hidden = false;
        });
      });
      view.querySelector("[data-close-sequence-delete]")?.addEventListener("click", () => {
        deleteModal.hidden = true;
      });
      view.querySelector("[data-confirm-sequence-delete]")?.addEventListener("click", () => {
        deleteModal.hidden = true;
        showToast("Email Sequence deleted successfully.");
      });
      setSequenceMode("audiences");
    };
    initCampaignSequence();
    
      


    const performanceData = {
      "7": { sent: [120, 180, 260, 340, 510, 680, 820], replies: [18, 24, 36, 44, 62, 76, 94], total: "55,240" },
      "30": { sent: [90, 150, 230, 280, 360, 470, 560, 690, 760, 830], replies: [12, 19, 30, 34, 47, 58, 70, 86, 95, 112], total: "182,900" },
      "90": { sent: [80, 110, 170, 240, 300, 420, 520, 650, 790, 940, 1120, 1260], replies: [8, 14, 22, 33, 42, 56, 73, 88, 104, 126, 148, 165], total: "421,600" }
    };
    const chartBounds = { x: 36, y: 28, w: 688, h: 210 };
    const makePath = (values) => {
      const max = Math.max(...values) * 1.12;
      return values.map((value, index) => {
        const x = chartBounds.x + (index * chartBounds.w) / (values.length - 1);
        const y = chartBounds.y + chartBounds.h - (value / max) * chartBounds.h;
        return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      }).join(" ");
    };
    const renderPerformanceChart = (range = "7") => {
      const data = performanceData[range];
      const sentPath = makePath(data.sent);
      const replyPath = makePath(data.replies);
      document.getElementById("sentLine").setAttribute("d", sentPath);
      document.getElementById("replyLine").setAttribute("d", replyPath);
      const lastX = chartBounds.x + chartBounds.w;
      document.getElementById("chartArea").setAttribute("d", `${sentPath} L${lastX} ${chartBounds.y + chartBounds.h} L${chartBounds.x} ${chartBounds.y + chartBounds.h} Z`);
      document.getElementById("touchpointTotal").textContent = data.total;
      document.getElementById("chartPoints").innerHTML = data.sent.map((value, index) => {
        const max = Math.max(...data.sent) * 1.12;
        const x = chartBounds.x + (index * chartBounds.w) / (data.sent.length - 1);
        const y = chartBounds.y + chartBounds.h - (value / max) * chartBounds.h;
        return `<circle class="chart-point" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"><title>${value} sent</title></circle>`;
      }).join("");
    };
    document.querySelectorAll(".range-tab").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".range-tab").forEach((tab) => tab.classList.remove("active"));
        button.classList.add("active");
        renderPerformanceChart(button.dataset.range);
      });
    });
    document.getElementById("refreshPerformance")?.addEventListener("click", () => {
      const activeRange = document.querySelector(".range-tab.active")?.dataset.range || "7";
      renderPerformanceChart(activeRange);
    });
    renderPerformanceChart("7");

    document.getElementById("helpToggle").addEventListener("click", () => {
      document.getElementById("helpWidget").classList.toggle("open");
    });