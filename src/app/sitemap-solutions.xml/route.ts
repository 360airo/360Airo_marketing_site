import { getBaseUrl, urlset, xmlResponse } from '../../lib/sitemap';

const solutionPages = [
  '/solutions',
  '/solutions/agencies',
  '/solutions/smbs',
  '/solutions/startups',
];

export function GET(request: Request) {
  return xmlResponse(urlset(solutionPages, getBaseUrl(request)));
}
