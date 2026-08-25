import { getBaseUrl, urlset, xmlResponse } from '../../lib/sitemap';

const blogPages = [
  '/blogs',
  '/blogs/10-Best-Outreachio-Alternatives',
  '/blogs/10-Cheapest-Cold-Email-Software',
  '/blogs/Free-Email-Deliverability-Test',
];

export function GET(request: Request) {
  return xmlResponse(urlset(blogPages, getBaseUrl(request)));
}
