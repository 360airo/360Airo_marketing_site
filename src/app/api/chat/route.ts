import OpenAI from "openai";
import { NextResponse } from "next/server";

type IncomingMessage = {
  role: "assistant" | "user";
  content: string;
};

const systemPrompt = `
You are the 360Airo website assistant.
Help visitors understand 360Airo as an AI SDR and multichannel outreach platform for B2B teams.
Keep answers concise, helpful, and sales-aware.
You can explain outreach automation, campaign setup, inbox handling, analytics, demo booking, and pricing conversations.
If visitors ask for specific pricing, ask for team size and invite them to book a demo.
Do not invent customer names, guarantees, or private company details.
`;

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

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions: systemPrompt,
      input: safeMessages,
      max_output_tokens: 350,
    });

    const assistantMessage =
        response.output_text ||
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
