export function GET(request: Request) {
  return Response.redirect(new URL('/pages-sitemap.xml', request.url), 308);
}
