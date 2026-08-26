export function GET(request: Request) {
  return Response.redirect(new URL('/sitemap-pages.xml', request.url), 308);
}
