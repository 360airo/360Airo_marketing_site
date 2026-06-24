import { NextRequest, NextResponse } from 'next/server';

interface SequenceRequest {
  mood: string;
  creativeLevel: string;
  keywords: string;
  recipientEmail: string;
}

interface EmailStep {
  id: string;
  name: string;
  subject: string;
  body: string;
  delayDays: number;
}

export async function POST(request: NextRequest) {
  try {
    const { mood, creativeLevel, keywords, recipientEmail } = (await request.json()) as SequenceRequest;

    if (!mood || !creativeLevel || !keywords || !recipientEmail) {
      return NextResponse.json(
        { error: 'All fields are required: mood, creativeLevel, keywords, recipientEmail' },
        { status: 400 }
      );
    }

    const openaiKey = process.env.OPENAI_API_KEY;

    if (!openaiKey) {
      console.error('⚠️ No OpenAI API key found');
      return NextResponse.json(
        { error: 'AI service is not configured. Please try again later.' },
        { status: 500 }
      );
    }

    console.log(`📧 [EMAIL-SEQUENCER] Generating sequence for: ${keywords}`);
    console.log(`   Mood: ${mood}, Creative Level: ${creativeLevel}`);

    const moodDescription = {
      friendly: 'casual, conversational, warm, and approachable',
      professional: 'formal, respectful, business-appropriate, and solution-focused',
      humorous: 'witty, funny, clever, and entertaining while remaining professional',
      bold: 'direct, assertive, confident, and action-oriented',
    }[mood] || 'casual and friendly';

    const creativityGuidance = {
      Low: 'use practical, straightforward language with conventional approaches',
      Medium: 'balance conventional approaches with some creative elements',
      High: 'be very creative, innovative, and push boundaries while staying professional',
    }[creativeLevel] || 'use medium creativity';

    const prompt = `You are an expert email marketing and sales strategist. Generate a 5-email sequence for: "${keywords}"

The prospect email is: ${recipientEmail}
Tone: ${moodDescription}
Creativity Level: ${creativityGuidance}

Generate 5 unique, personalized emails that:
1. Email 1 (Day 0): Initial contact - NO assumptions about the recipient's role. Engage based on the "${keywords}" topic
2. Email 2 (Day 2): Provide value - Share insights or results related to "${keywords}"
3. Email 3 (Day 4): Social proof - Mention relevant case studies or success stories
4. Email 4 (Day 6): Urgency - Create genuine urgency without being pushy
5. Email 5 (Day 8): Final attempt - Make a compelling last offer

IMPORTANT: You MUST respond with ONLY valid JSON, no other text before or after.

Response format (valid JSON only):
{
  "emails": [
    {
      "delayDays": 0,
      "subject": "compelling subject line",
      "body": "email body with {{first_name}} and {{company}} tokens"
    },
    {
      "delayDays": 2,
      "subject": "subject line",
      "body": "email body"
    },
    {
      "delayDays": 4,
      "subject": "subject line",
      "body": "email body"
    },
    {
      "delayDays": 6,
      "subject": "subject line",
      "body": "email body"
    },
    {
      "delayDays": 8,
      "subject": "subject line",
      "body": "email body"
    }
  ]
}

RULES:
- Each subject line must be 20-70 characters
- NO spam words (free, urgent, claim, prize, winner, act now, limited time, guarantee, click here)
- Include personalization tokens like {{first_name}}, {{company}}
- Each email should have a clear purpose and CTA
- Tone should match: ${mood}
- Creativity should match: ${creativeLevel}
- Make each email unique and progressive
- Email body should be 100-300 words`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ OpenAI API Error:', error);
      return NextResponse.json(
        { error: 'Failed to generate email sequence' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('❌ No content in OpenAI response');
      return NextResponse.json(
        { error: 'Failed to generate email sequence' },
        { status: 500 }
      );
    }

    console.log('✅ [EMAIL-SEQUENCER] Parsing AI response...');

    let parsedResponse;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        parsedResponse = JSON.parse(content);
      }
    } catch (parseError) {
      console.error('❌ Failed to parse AI response:', parseError);
      console.error('Raw response:', content);
      return NextResponse.json(
        { error: 'Failed to parse generated sequence' },
        { status: 500 }
      );
    }

    if (!parsedResponse.emails || !Array.isArray(parsedResponse.emails) || parsedResponse.emails.length !== 5) {
      console.error('❌ Invalid response structure:', parsedResponse);
      return NextResponse.json(
        { error: 'Invalid sequence generated' },
        { status: 500 }
      );
    }

    const emails: EmailStep[] = parsedResponse.emails.map((email: any, index: number) => ({
      id: `email-${index + 1}`,
      name: `Email ${index + 1}`,
      subject: email.subject || `Email ${index + 1}`,
      body: email.body || '',
      delayDays: email.delayDays || (index * 2),
    }));

    console.log(`✅ [EMAIL-SEQUENCER] Generated ${emails.length} emails successfully`);

    return NextResponse.json({
      success: true,
      emails,
    });
  } catch (error: any) {
    console.error('❌ [EMAIL-SEQUENCER] Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate sequence' },
      { status: 500 }
    );
  }
}
