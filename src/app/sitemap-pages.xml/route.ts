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
];

export function GET(request: Request) {
  return xmlResponse(urlset(pages, getBaseUrl(request)));
}
