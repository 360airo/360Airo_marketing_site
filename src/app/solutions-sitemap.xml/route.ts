import { getBaseUrl, urlset, xmlResponse } from '../../lib/sitemap';

const solutions = [
  '/solutions',
  '/solutions/ai-sdr',
  '/solutions/email-warmup',
  '/solutions/multichannel-outreach',
  '/solutions/agencies',
  '/solutions/startups',
];

export function GET(request: Request) {
  return xmlResponse(urlset(solutions, getBaseUrl(request)));
}
