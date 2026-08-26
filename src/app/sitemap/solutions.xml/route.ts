const BASE_URL = 'https://360airo.com';

const solutions = [
  '/solutions',
  '/solutions/ai-sdr',
  '/solutions/email-warmup',
  '/solutions/multichannel-outreach',
  '/solutions/agencies',
  '/solutions/startups',
];

export function GET() {
  const body = solutions
    .map((path) => `  <url><loc>${BASE_URL}${path}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
