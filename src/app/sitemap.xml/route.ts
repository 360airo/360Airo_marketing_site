import { getBaseUrl, xmlResponse } from '../../lib/sitemap';

export function GET(request: Request) {
  const baseUrl = getBaseUrl(request);
  const lastmod = new Date().toISOString();
  const sitemaps = [
    { loc: `${baseUrl}/pages-sitemap.xml`, count: 16 },
    { loc: `${baseUrl}/blog-sitemap.xml`, count: 4 },
    { loc: `${baseUrl}/tools-sitemap.xml`, count: 14 },
    { loc: `${baseUrl}/case-studies-sitemap.xml`, count: 6 },
    { loc: `${baseUrl}/comparisons-sitemap.xml`, count: 8 },
    { loc: `${baseUrl}/integrations-sitemap.xml`, count: 0 },
    { loc: `${baseUrl}/resources-sitemap.xml`, count: 8 },
    { loc: `${baseUrl}/images-sitemap.xml`, count: 35 },
  ];

  const body = sitemaps
    .map(
      ({ loc, count }) =>
        `  <sitemap airo:url-count="${count}"><loc>${loc}</loc><lastmod>${lastmod}</lastmod></sitemap>`,
    )
    .join('\n');

  return xmlResponse(
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:airo="https://www.360airo.com/sitemap">\n${body}\n</sitemapindex>`,
  );
}
