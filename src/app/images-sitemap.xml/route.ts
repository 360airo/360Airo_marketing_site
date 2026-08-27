import { getBaseUrl, xmlResponse } from '../../lib/sitemap';

const images = [
  '/ava_avatar.png',
  '/conversion-prospects-meetings3.png',
  '/contact_ai_hub.png',
  '/crm-integrations.png',
  '/email-pitch-generator-card.png',
  '/email-sequencing.png',
  '/email-templates.png',
  '/enrichment_preview.png',
  '/enhanced_video.gif',
  '/FinalLogo_icon_transparent.png',
  '/hyper-personalization.png',
  '/linkedin-outreach.png',
  '/llm-logos/3d-claude-ai-logo.jpg',
  '/llm-logos/Google_Gemini_icon_2025.svg.png',
  '/llm-logos/images%20(1).png',
  '/llm-logos/images.png',
  '/logo-icon.png',
  '/meeting-booking.png',
  '/outreach-automation-workflow2.png',
  '/pricing-mockup.png',
  '/process-flow-dashboard.png',
  '/reply-classifications.png',
  '/signals_preview.png',
  '/smart-followups.png',
  '/smart-follow-ups.png',
  '/smart-schedulers.png',
  '/step_1_leads.png',
  '/step_2_channels.png',
  '/step_3_templates.png',
  '/step_4_inbox.png',
  '/step_5_analytics.png',
  '/unified-inbox.png',
  '/verify-emails.png',
  '/workflow-pipeline.png',
  '/world-map.png',
];

export function GET(request: Request) {
  const baseUrl = getBaseUrl(request);
  const lastmod = new Date().toISOString();
  const body = images
    .map(
      (image) =>
        `  <url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>0.5</priority><lastmod>${lastmod}</lastmod><image:image><image:loc>${baseUrl}${image}</image:loc></image:image></url>`,
    )
    .join('\n');

  return xmlResponse(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>`,
  );
}
