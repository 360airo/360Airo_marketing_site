import { getBaseUrl, urlset, xmlResponse } from '../../lib/sitemap';

const resourcePages = [
  '/resources',
];

export function GET(request: Request) {
  return xmlResponse(urlset(resourcePages, getBaseUrl(request)));
}
