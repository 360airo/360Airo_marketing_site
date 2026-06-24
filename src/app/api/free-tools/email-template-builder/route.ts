import { NextRequest, NextResponse } from 'next/server';

interface TemplateRequest {
  templateType: string;
  purpose: string;
  companyName?: string;
  productName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { templateType, purpose, companyName, productName } = (await request.json()) as TemplateRequest;

    if (!templateType || !purpose) {
      return NextResponse.json(
        { error: 'Template type and purpose are required' },
        { status: 400 }
      );
    }

    const openaiKey = process.env.OPENAI_API_KEY;

    if (!openaiKey) {
      console.error('⚠️ No OpenAI API key found');
      return NextResponse.json(
        { error: 'AI service is not configured' },
        { status: 500 }
      );
    }

    console.log(`📧 [EMAIL-TEMPLATE] Generating ${templateType} template`);

    const contextInfo = companyName ? ` for ${companyName}` : '';
    const productInfo = productName ? ` about ${productName}` : '';

    const prompt = `You are an expert email designer. Generate a professional HTML email template.

Template Type: ${templateType}
Purpose: ${purpose}${contextInfo}${productInfo}

Create a complete, responsive HTML email template that:
1. Has a professional header with branding space
2. Clear, readable content section
3. Includes a professional CTA button
4. Has a footer with standard contact info
5. Uses modern email-safe styling
6. Is mobile responsive
7. Uses inline CSS (no <style> tags)
8. Includes placeholder text with {{variables}} for personalization
9. Professional color scheme
10. Proper spacing and typography

Respond with ONLY valid HTML, no markdown, no code blocks, no explanations.
Start with <!DOCTYPE html> and end with </html>`;

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
      console.error('❌ OpenAI API Error');
      return NextResponse.json(
        { error: 'Failed to generate template' },
        { status: 500 }
      );
    }

    const data = await response.json();
    let html = data.choices?.[0]?.message?.content;

    if (!html) {
      return NextResponse.json(
        { error: 'Failed to generate template' },
        { status: 500 }
      );
    }

    // Clean up markdown code blocks if present
    html = html.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();

    console.log('✅ [EMAIL-TEMPLATE] Template generated successfully');

    return NextResponse.json({
      success: true,
      html,
    });
  } catch (error: any) {
    console.error('❌ [EMAIL-TEMPLATE] Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate template' },
      { status: 500 }
    );
  }
}
