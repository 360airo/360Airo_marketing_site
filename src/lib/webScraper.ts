export async function scrapeWebsite(url: string) {
  // Shim: return minimal metadata
  return {
    title: url,
    description: '',
    keywords: [],
    html: ''
  };
}

export function extractKeyInfo(input: any) {
  // Accept either an HTML string or the object returned by scrapeWebsite
  const html = typeof input === 'string' ? input : (input && input.html) || '';
  const title = (input && input.title) || html || '';
  return title;
}
