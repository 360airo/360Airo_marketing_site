const PRODUCTION_URL = 'https://www.360airo.com';

export function getBaseUrl(request: Request) {
  const requestUrl = new URL(request.url);

  return requestUrl.hostname === 'localhost' || requestUrl.hostname === '127.0.0.1'
    ? requestUrl.origin
    : PRODUCTION_URL;
}

export function xmlResponse(xml: string) {
  const stylesheet = xml.trimStart().startsWith('<urlset')
    ? '<?xml-stylesheet type="text/xsl" href="/sitemap-url.xsl"?>\n'
    : '';

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${stylesheet}${xml}`, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}

export function urlset(paths: string[], baseUrl: string) {
  const lastmod = new Date().toISOString();
  const body = paths
    .map(
      (path) =>
        `  <url><loc>${baseUrl}${path}</loc><changefreq>weekly</changefreq><priority>0.5</priority><lastmod>${lastmod}</lastmod></url>`,
    )
    .join('\n');

  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
}
