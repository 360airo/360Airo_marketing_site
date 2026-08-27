import { getBaseUrl, urlset, xmlResponse } from '../../lib/sitemap';

const comparisonPages = [
  '/comparison',
  '/alternative',
  '/alternative/Humanlinker-Alternative',
  '/alternative/Lead411',
  '/alternative/Meet-Alfred',
  '/alternative/Reply.io',
  '/alternative/Salesforge',
  '/alternative/SmartReach.io',
];

export function GET(request: Request) {
  return xmlResponse(urlset(comparisonPages, getBaseUrl(request)));
}
