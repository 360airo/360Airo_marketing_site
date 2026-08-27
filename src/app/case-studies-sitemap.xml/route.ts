import { getBaseUrl, urlset, xmlResponse } from '../../lib/sitemap';

const caseStudies = [
  '/customer-stories',
  '/customer-stories/chain-of-events',
  '/customer-stories/cookunity',
  '/customer-stories/shiro',
  '/customer-stories/sumup',
  '/customer-stories/zirtual',
];

export function GET(request: Request) {
  return xmlResponse(urlset(caseStudies, getBaseUrl(request)));
}
