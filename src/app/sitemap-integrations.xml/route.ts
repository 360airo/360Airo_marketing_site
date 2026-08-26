import { xmlResponse } from '../../lib/sitemap';

export function GET() {
  return xmlResponse('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>');
}
