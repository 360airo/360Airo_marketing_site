import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getPageContent } from "./pageContents";

type IncomingMessage = {
  role: "assistant" | "user";
  content: string;
};

const systemPrompt = `
You are the 360Airo website assistant.
Help visitors understand 360Airo as an AI SDR and multichannel outreach platform for B2B teams.
Keep answers concise, helpful, and sales-aware.

CRITICAL RULE FOR PRICING & DEMOS:
- Do NOT suggest, list, recommend, or quote any pricing plans, options, costs, or packages (such as Starter, Growth, Pro, Email Volume, Multichannel, or Hire AI SDR plans) to visitors under any circumstances.
- If a visitor asks about pricing, packages, plans, costs, subscription tiers, or trials, you must output exactly: "To get pricing tailored to your requirements, kindly fill the form, our team will reach to you soon."
- If a visitor asks to book a demo, schedule a call, or see a walkthrough of the system, you must start your response with "Yes, I'll help you with that." followed by custom text guiding them to the booking page, and you must end your response with this exact phrase: "Kindly fill the form, our team will reach to you soon."

Additionally, 360Airo offers a suite of free deliverability, infrastructure, and campaign tools under the "/free-tools" path:
- Email Deliverability Test: Audits domain authentication, blacklists, and spam risk.
- Email Verifier: Verifies syntax, domain, and mailbox existence to clean lists.
- Mailbox Calculator & Email Warmup Calculator: Models daily capacity limits and generates reputation warmup plans.
- SPF & DMARC Generators: Creates valid authentication DNS records.
- Email Pitch Generator & AI Email Sequence Builder: Writes custom sales email pitches and multi-step campaigns.
- Email Signature Builder & Email Template Builder: Generates responsive signatures and custom HTML templates.
- Email Template Analyzer & Email Spam Checker: Rewrites cold copy to eliminate spam words and improve engagement.
- Email Permutator: Generates email address permutations for prospect research.

When visitors ask about email deliverability, list-cleaning, domain calculations, warmup, SPF/DMARC records, template building, or email writing, recommend these free tools and guide them to browse them at "/free-tools".

You have access to a tool "visit_page" to fetch accurate contents/details of pages on our website. Use it when visitors ask about specific features, solutions, case studies, comparison with competitors (like Reply.io, Outreach.io, Apollo.io, Lemlist, Woodpecker), support channels, or contact info to ensure you reply with 100% accurate, non-hallucinated website facts.
Do not invent customer names, guarantees, or private company details.
`;

const visitPageTool = {
  type: "function" as const,
  name: "visit_page",
  description: "Visit a page on the 360Airo website to get its text content, details, pricing, features, solutions, case studies, or contact info.",
  strict: true,
  parameters: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "The path of the page to visit (e.g. '/', '/pricing', '/features', '/solutions', '/comparison', '/customer-stories', '/customer-support', '/book-a-demo', '/contact-us')"
      }
    },
    required: ["path"],
    additionalProperties: false
  }
};

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error:
          "OpenAI is not configured yet. Add OPENAI_API_KEY to .env.local and restart the dev server.",
      },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const threadId =
      typeof body?.threadId === "string" && body.threadId.trim().length > 0
        ? body.threadId.trim()
        : crypto.randomUUID();

    const safeMessages = messages
      .filter(
        (message: IncomingMessage) =>
          (message.role === "assistant" || message.role === "user") &&
          typeof message.content === "string",
      )
      .slice(-12)
      .map((message: IncomingMessage) => ({
        role: message.role,
        content: message.content.slice(0, 1200),
      }));

    if (safeMessages.length === 0) {
      return NextResponse.json({ error: "Send at least one message." }, { status: 400 });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    let currentResponse = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions: systemPrompt,
      input: safeMessages,
      max_output_tokens: 350,
      tools: [visitPageTool]
    });

    let loopCount = 0;
    const maxLoops = 3; // Prevent infinite tool call loops

    while (loopCount < maxLoops) {
      const outputItems = currentResponse.output || [];
      const functionCalls = outputItems.filter(item => item.type === "function_call");

      if (functionCalls.length === 0) {
        break;
      }

      const toolOutputs = [];
      for (const call of functionCalls) {
        let result = "";
        try {
          const args = JSON.parse(call.arguments || "{}");
          const path = args.path || "/";
          result = getPageContent(path);
        } catch (e) {
          result = `Error executing tool: ${(e as Error).message}`;
        }

        toolOutputs.push({
          type: "function_call_output" as const,
          call_id: call.call_id,
          output: result
        });
      }

      // Re-invoke with the execution history appended
      currentResponse = await client.responses.create({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        instructions: systemPrompt,
        input: [...safeMessages, ...outputItems, ...toolOutputs],
        max_output_tokens: 350,
        tools: [visitPageTool]
      });

      loopCount++;
    }

    const assistantMessage =
      currentResponse.output_text ||
      "I can help with that. Tell me a little more about your outreach goals.";

    return NextResponse.json({
      message: assistantMessage,
      threadId,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "The assistant had trouble replying. Please try again." },
      { status: 500 },
    );
  }
}

