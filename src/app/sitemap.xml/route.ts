import { getBaseUrl, xmlResponse } from '../../lib/sitemap';

export function GET(request: Request) {
  const baseUrl = getBaseUrl(request);
  const lastmod = new Date().toISOString();
  const sitemapUrls = [
    `${baseUrl}/sitemap-pages.xml`,
    `${baseUrl}/sitemap-solutions.xml`,
    `${baseUrl}/sitemap-blog.xml`,
    `${baseUrl}/sitemap-tools.xml`,
    `${baseUrl}/sitemap-case-studies.xml`,
    `${baseUrl}/sitemap-comparisons.xml`,
    `${baseUrl}/sitemap-resources.xml`,
    `${baseUrl}/sitemap-images.xml`,
  ];

  const body = sitemapUrls
    .map((loc) => `  <sitemap><loc>${loc}</loc><lastmod>${lastmod}</lastmod></sitemap>`)
    .join('\n');

  return xmlResponse(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>`);
}
