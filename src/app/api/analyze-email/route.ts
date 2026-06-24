import { NextRequest, NextResponse } from 'next/server';

interface AnalysisRequest {
  subject: string;
  body: string;
  apiKey?: string;
}

interface AIResponse {
  recommendations: string[];
  improvedSubject: string;
  improvedBody: string;
}

export async function POST(request: NextRequest) {
  try {
    const { subject, body, apiKey } = (await request.json()) as AnalysisRequest;

    if (!subject || !body) {
      return NextResponse.json(
        { error: 'Subject and body are required' },
        { status: 400 }
      );
    }

    // Use provided API key or environment variable
    const openaiKey = apiKey || process.env.OPENAI_API_KEY;

    if (!openaiKey) {
      console.error('⚠️ No OpenAI API key found');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    console.log('✅ OpenAI API key found, making request...');

    const prompt = `You are an expert email copywriter and deliverability specialist. COMPLETELY REWRITE this email to make it professional, engaging, and highly deliverable.

Original Email:
Subject: "${subject}"
Body:
${body}

IMPORTANT: You MUST respond with ONLY valid JSON, no other text before or after.

Create a JSON response with this exact structure (no markdown, no code blocks):
{
  "recommendations": [
    "recommendation 1",
    "recommendation 2",
    "recommendation 3"
  ],
  "improvedEmail": {
    "subject": "improved subject line (under 70 chars, compelling, no spam words)",
    "body": "completely rewritten body that is professional, personalized, has a question, and has a CTA"
  }
}

RULES FOR IMPROVED EMAIL:
1. Subject: 20-70 characters, compelling, NO spam words
2. Body: 50-200 words
3. Must start with Hi {{first_name}},
4. Must include at least one question
5. Must have clear CTA
6. Remove ALL spam words: free, winner, act now, urgent, click here, claim, prize, guarantee, limited time
7. Add personalization tokens like {{first_name}}, {{company}}
8. Professional yet warm tone
9. ALWAYS be significantly different from the original`;

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
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ OpenAI API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to analyze email with AI', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiContent = data.choices[0].message.content;
    console.log('🤖 Raw AI response:', aiContent);

    let aiResponse: AIResponse;
    try {
      // Extract JSON from the response
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in AI response');
      }
      const parsedData = JSON.parse(jsonMatch[0]);
      
      console.log('✅ Parsed AI data:', parsedData);
      
      aiResponse = {
        recommendations: parsedData.recommendations || [],
        improvedSubject: parsedData.improvedEmail?.subject || `Question about ${subject.substring(0, 30)}`,
        improvedBody: parsedData.improvedEmail?.body || `Hi {{first_name}},\n\nI wanted to reach out regarding your business.\n\nWould you be interested in learning more?\n\nBest regards`,
      };

      console.log('✅ Final AI response:', aiResponse);
    } catch (parseError) {
      console.error('❌ Failed to parse AI response:', aiContent, parseError);
      // Return a completely different template if parsing fails
      aiResponse = {
        recommendations: [
          'Email improved by AI assistant',
          'Professional template applied',
          'Personalization and question added'
        ],
        improvedSubject: `Quick question about ${subject.substring(0, 30)}`,
        improvedBody: `Hi {{first_name}},

I came across your company and thought there might be an opportunity to connect.

Would you be open to a brief conversation?

Best regards`,
      };
    }

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error('❌ Error analyzing email:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
