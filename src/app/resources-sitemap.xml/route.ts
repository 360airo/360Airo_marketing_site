import { getBaseUrl, urlset, xmlResponse } from '../../lib/sitemap';

const resourcePages = [
  '/resources',
  '/guid',
  '/guid/Humanlinker-Alternative',
  '/guid/Lead411',
  '/guid/Meet-Alfred',
  '/guid/Reply.io',
  '/guid/Salesforge',
  '/guid/SmartReach.io',
];

export function GET(request: Request) {
  return xmlResponse(urlset(resourcePages, getBaseUrl(request)));
}
