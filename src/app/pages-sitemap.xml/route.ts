import { getBaseUrl, urlset, xmlResponse } from '../../lib/sitemap';

const pages = [
  '/',
  '/features',
  '/pricing',
  '/contact-us',
  '/book-a-demo',
  '/customer-support',
  '/terms',
  '/privacy-policy',
  '/anti-spam',
  '/solutions',
  '/solutions/ai-sdr',
  '/solutions/email-warmup',
  '/solutions/multichannel-outreach',
  '/solutions/agencies',
  '/solutions/smbs',
  '/solutions/startups',
];

export function GET(request: Request) {
  return xmlResponse(urlset(pages, getBaseUrl(request)));
}
