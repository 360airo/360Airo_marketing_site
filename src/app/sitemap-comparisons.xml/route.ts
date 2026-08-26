import { getBaseUrl, urlset, xmlResponse } from '../../lib/sitemap';

const comparisonPages = [
  '/comparison',
];

export function GET(request: Request) {
  return xmlResponse(urlset(comparisonPages, getBaseUrl(request)));
}
