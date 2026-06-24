import { NextRequest, NextResponse } from 'next/server';

interface SignatureRequest {
  fullName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone?: string;
  website?: string;
  style: string;
  logoUrl?: string;
  logoSize?: number;
}

function generateClassicSignature(data: SignatureRequest): string {
  const { fullName, jobTitle, company, email, phone, website, logoUrl, logoSize } = data;
  
  // Escape the logo URL for safe HTML insertion
  const safeLogoUrl = logoUrl ? logoUrl.replace(/"/g, '&quot;') : '';
  
  return `
    <table cellpadding="0" cellspacing="0" style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 550px; width: 100%;">
      <tr>
        <td style="padding: 0;">
          ${safeLogoUrl ? `
          <!-- Logo Section -->
          <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 14px;">
            <tr>
              <td style="padding: 0;">
                <img src="${safeLogoUrl}" alt="Company Logo" style="max-width: 100%; height: auto; max-height: ${logoSize}px; display: block; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
              </td>
            </tr>
          </table>
          ` : ''}
          
          <!-- Name and Title Section -->
          <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 0 0 16px 0; border-bottom: 3px solid #0891b2;">
                <h2 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 700; color: #111827; letter-spacing: -0.5px;">${fullName}</h2>
                <p style="margin: 0; font-size: 13px; color: #0891b2; font-weight: 600;">${jobTitle}</p>
              </td>
            </tr>
          </table>
          
          <!-- Company and Contact Info -->
          <table cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 14px;">
            <tr>
              <td style="padding: 0; width: 70px; vertical-align: top;">
                <p style="margin: 0; font-size: 11px; color: #6b7280; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">Company</p>
              </td>
              <td style="padding: 0 0 0 14px; vertical-align: top;">
                <p style="margin: 0; font-size: 13px; color: #374151; font-weight: 500;">${company}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0 0 0; width: 70px; vertical-align: top;">
                <p style="margin: 0; font-size: 11px; color: #6b7280; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">Email</p>
              </td>
              <td style="padding: 10px 0 0 14px; vertical-align: top;">
                <a href="mailto:${email}" style="font-size: 13px; color: #0891b2; text-decoration: none; font-weight: 500; border-bottom: 1px solid #0891b2;">${email}</a>
              </td>
            </tr>
            ${phone ? `<tr>
              <td style="padding: 10px 0 0 0; width: 70px; vertical-align: top;">
                <p style="margin: 0; font-size: 11px; color: #6b7280; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">Phone</p>
              </td>
              <td style="padding: 10px 0 0 14px; vertical-align: top;">
                <a href="tel:${phone}" style="font-size: 13px; color: #374151; text-decoration: none;">${phone}</a>
              </td>
            </tr>` : ''}
            ${website ? `<tr>
              <td style="padding: 10px 0 0 0; width: 70px; vertical-align: top;">
                <p style="margin: 0; font-size: 11px; color: #6b7280; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">Website</p>
              </td>
              <td style="padding: 10px 0 0 14px; vertical-align: top;">
                <a href="${website}" style="font-size: 13px; color: #0891b2; text-decoration: none; font-weight: 500; border-bottom: 1px solid #0891b2;">${website.replace(/^https?:\/\//i, '')}</a>
              </td>
            </tr>` : ''}
          </table>
        </td>
      </tr>
    </table>
  `.trim();
}

function generateModernSignature(data: SignatureRequest): string {
  const { fullName, jobTitle, company, email, phone, website, logoUrl, logoSize } = data;
  const safeLogoUrl = logoUrl ? logoUrl.replace(/"/g, '&quot;') : '';
  
  return `
    <table cellpadding="0" cellspacing="0" style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; width: 100%;">
      <tr>
        <td style="padding: 0;">
          ${safeLogoUrl ? `
          <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 12px;">
            <tr>
              <td style="padding: 0;">
                <img src="${safeLogoUrl}" alt="Logo" style="max-width: 100%; height: auto; max-height: ${logoSize}px; display: block; border-radius: 50%; object-fit: cover; width: ${logoSize}px; height: ${logoSize}px; box-shadow: 0 4px 8px rgba(8,145,178,0.15);" />
              </td>
            </tr>
          </table>
          ` : ''}
          
          <!-- Left Accent Bar -->
          <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="width: 5px; background: linear-gradient(180deg, #0891b2 0%, #06b6d4 100%); border-radius: 3px 0 0 0;"></td>
              <td style="padding: 16px 16px 16px 14px; background-color: #f9fafb;">
                <h2 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700; color: #111827;">${fullName}</h2>
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #0891b2; font-weight: 600;">${jobTitle}</p>
                <p style="margin: 0 0 12px 0; font-size: 12px; color: #6b7280; font-weight: 500;">${company}</p>
                
                <table cellpadding="0" cellspacing="0" style="width: 100%;">
                  <tr>
                    <td style="padding: 0; font-size: 13px;">
                      <a href="mailto:${email}" style="color: #0891b2; text-decoration: none; font-weight: 500;">${email}</a>
                    </td>
                  </tr>
                  ${phone ? `<tr>
                    <td style="padding: 6px 0 0 0; font-size: 13px;">
                      <a href="tel:${phone}" style="color: #374151; text-decoration: none;">${phone}</a>
                    </td>
                  </tr>` : ''}
                  ${website ? `<tr>
                    <td style="padding: 6px 0 0 0; font-size: 13px;">
                      <a href="${website}" style="color: #0891b2; text-decoration: none; font-weight: 500;">${website.replace(/^https?:\/\//i, '')}</a>
                    </td>
                  </tr>` : ''}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `.trim();
}

function generateMinimalistSignature(data: SignatureRequest): string {
  const { fullName, jobTitle, company, email, phone, website, logoUrl, logoSize } = data;
  const safeLogoUrl = logoUrl ? logoUrl.replace(/"/g, '&quot;') : '';
  
  return `
    <table cellpadding="0" cellspacing="0" style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; width: 100%;">
      <tr>
        <td style="padding: 0;">
          ${safeLogoUrl ? `
          <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 14px;">
            <tr>
              <td style="padding: 0; width: ${logoSize}px;">
                <img src="${safeLogoUrl}" alt="Logo" style="width: ${logoSize}px; height: auto; display: block; border-radius: 3px;" />
              </td>
            </tr>
          </table>
          ` : ''}
          
          <table cellpadding="0" cellspacing="0" style="width: 100%;">
            <tr>
              <td style="padding: 0; border-left: 3px solid #0891b2; padding-left: 12px;">
                <p style="margin: 0 0 2px 0; font-size: 15px; font-weight: 600; color: #111827; letter-spacing: -0.2px;">${fullName}</p>
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280; font-weight: 500;">${jobTitle} at ${company}</p>
                <table cellpadding="0" cellspacing="0" style="margin: 0;">
                  <tr>
                    <td style="padding: 0; font-size: 12px; color: #374151;">
                      <a href="mailto:${email}" style="color: #0891b2; text-decoration: none; font-weight: 500;">${email}</a>
                    </td>
                  </tr>
                  ${phone ? `<tr>
                    <td style="padding: 4px 0 0 0; font-size: 12px; color: #374151;">
                      <a href="tel:${phone}" style="color: #374151; text-decoration: none;">${phone}</a>
                    </td>
                  </tr>` : ''}
                  ${website ? `<tr>
                    <td style="padding: 4px 0 0 0; font-size: 12px; color: #374151;">
                      <a href="${website}" style="color: #0891b2; text-decoration: none;">${website.replace(/^https?:\/\//i, '')}</a>
                    </td>
                  </tr>` : ''}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `.trim();
}

function generateCorporateSignature(data: SignatureRequest): string {
  const { fullName, jobTitle, company, email, phone, website, logoUrl, logoSize } = data;
  const safeLogoUrl = logoUrl ? logoUrl.replace(/"/g, '&quot;') : '';
  
  return `
    <table cellpadding="0" cellspacing="0" style="font-family: 'Georgia', serif; max-width: 560px; width: 100%;">
      <tr>
        <td style="padding: 0;">
          ${safeLogoUrl ? `
          <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 14px;">
            <tr>
              <td style="padding: 8px; background-color: #f9fafb; border: 1px solid #e5e7eb;">
                <img src="${safeLogoUrl}" alt="Logo" style="max-width: 100%; height: auto; max-height: ${logoSize}px; display: block;" />
              </td>
            </tr>
          </table>
          ` : ''}
          
          <table cellpadding="0" cellspacing="0" style="width: 100%;">
            <tr>
              <td style="padding: 0; width: 3px; background-color: #111827;"></td>
              <td style="padding: 0 0 0 16px;">
                <h3 style="margin: 0 0 2px 0; font-size: 16px; font-weight: 600; color: #111827; letter-spacing: 0.2px;">${fullName}</h3>
                <p style="margin: 0 0 12px 0; font-size: 12px; color: #6b7280; font-weight: 400; letter-spacing: 0.8px; text-transform: uppercase;">${jobTitle}</p>
                
                <table cellpadding="0" cellspacing="0" style="border-top: 1px solid #d1d5db; padding-top: 12px;">
                  <tr>
                    <td colspan="3" style="font-size: 12px; color: #111827; padding: 0 0 8px 0; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase;">${company}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-size: 12px; color: #6b7280; width: 30px;">t</td>
                    <td style="padding: 4px 0 4px 8px; font-size: 12px; color: #374151;">
                      ${phone ? `<a href="tel:${phone}" style="color: #374151; text-decoration: none;">${phone}</a>` : '—'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-size: 12px; color: #6b7280;">e</td>
                    <td style="padding: 4px 0 4px 8px; font-size: 12px;">
                      <a href="mailto:${email}" style="color: #0891b2; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  ${website ? `<tr>
                    <td style="padding: 4px 0; font-size: 12px; color: #6b7280;">w</td>
                    <td style="padding: 4px 0 4px 8px; font-size: 12px;">
                      <a href="${website}" style="color: #0891b2; text-decoration: none;">${website.replace(/^https?:\/\//i, '')}</a>
                    </td>
                  </tr>` : ''}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `.trim();
}

function generateCreativeSignature(data: SignatureRequest): string {
  const { fullName, jobTitle, company, email, phone, website, logoUrl, logoSize } = data;
  const safeLogoUrl = logoUrl ? logoUrl.replace(/"/g, '&quot;') : '';
  
  return `
    <table cellpadding="0" cellspacing="0" style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; width: 100%;">
      <tr>
        <td style="padding: 0; background: #ffffff;">
          <!-- Main Card -->
          <table cellpadding="0" cellspacing="0" style="width: 100%; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <tr>
              <!-- Left Accent Bar -->
              <td style="width: 4px; background: linear-gradient(180deg, #0891b2 0%, #06b6d4 100%); padding: 0;"></td>
              <td style="padding: 16px;">
                <!-- Logo and Header -->
                ${safeLogoUrl ? `
                <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 14px;">
                  <tr>
                    <td style="text-align: center;">
                      <img src="${safeLogoUrl}" alt="Logo" style="width: ${logoSize}px; height: auto; max-height: ${logoSize}px; display: inline-block; border-radius: 6px; box-shadow: 0 2px 8px rgba(8,145,178,0.12);" />
                    </td>
                  </tr>
                </table>
                ` : ''}
                
                <!-- Name -->
                <h2 style="margin: 0 0 2px 0; font-size: 18px; font-weight: 700; color: #111827; letter-spacing: -0.3px;">${fullName}</h2>
                
                <!-- Title & Company -->
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #6b7280;">
                  <span style="color: #0891b2; font-weight: 600;">${jobTitle}</span> <span style="color: #9ca3af;">at</span> <span style="font-weight: 500;">${company}</span>
                </p>
                
                <!-- Divider -->
                <table cellpadding="0" cellspacing="0" style="width: 100%; margin: 12px 0;">
                  <tr>
                    <td style="height: 1px; background: #f3f4f6;"></td>
                  </tr>
                </table>
                
                <!-- Contact Links -->
                <table cellpadding="0" cellspacing="0" style="width: 100%;">
                  <tr>
                    <td style="padding: 0 0 6px 0; font-size: 12px;">
                      <a href="mailto:${email}" style="color: #0891b2; text-decoration: none; font-weight: 500;">${email}</a>
                    </td>
                  </tr>
                  ${phone ? `<tr>
                    <td style="padding: 0 0 6px 0; font-size: 12px;">
                      <a href="tel:${phone}" style="color: #374151; text-decoration: none;">${phone}</a>
                    </td>
                  </tr>` : ''}
                  ${website ? `<tr>
                    <td style="padding: 0 0 6px 0; font-size: 12px;">
                      <a href="${website}" style="color: #0891b2; text-decoration: none; font-weight: 500;">${website.replace(/^https?:\/\//i, '')}</a>
                    </td>
                  </tr>` : ''}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    const { fullName, jobTitle, company, email, phone, website, style, logoUrl, logoSize } = (await request.json()) as SignatureRequest;

    if (!fullName || !jobTitle || !company || !email) {
      return NextResponse.json(
        { error: 'Full name, job title, company, and email are required' },
        { status: 400 }
      );
    }

    console.log(`📧 [EMAIL-SIGNATURE] Generating ${style} signature for ${fullName}${logoUrl ? ' with logo' : ''}`);

    const signatureData: SignatureRequest = {
      fullName,
      jobTitle,
      company,
      email,
      phone,
      website,
      style,
      logoUrl,
      logoSize,
    };

    let html: string;

    switch (style) {
      case 'modern':
        html = generateModernSignature(signatureData);
        break;
      case 'minimalist':
        html = generateMinimalistSignature(signatureData);
        break;
      case 'corporate':
        html = generateCorporateSignature(signatureData);
        break;
      case 'creative':
        html = generateCreativeSignature(signatureData);
        break;
      case 'classic':
      default:
        html = generateClassicSignature(signatureData);
    }

    console.log('✅ [EMAIL-SIGNATURE] Signature generated successfully');

    return NextResponse.json({
      success: true,
      html,
    });
  } catch (error: any) {
    console.error('❌ [EMAIL-SIGNATURE] Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate signature' },
      { status: 500 }
    );
  }
}
