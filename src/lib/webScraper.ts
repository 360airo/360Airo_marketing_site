// Web scraper utility for company information extraction
export interface ScrapedWebsiteData {
  title: string;
  description: string;
  headings: string[];
  content: string;
  website: string;
}

export const scrapeWebsite = async (website: string): Promise<ScrapedWebsiteData | null> => {
  try {
    let url = website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    const response = await fetch('/api/free-tools/scrape-website', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ website: url })
    });

    if (!response.ok) {
      console.warn(`Failed to scrape ${website}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.warn(`Error scraping website ${website}:`, error);
    return null;
  }
};

export const extractKeyInfo = (scrapedData: ScrapedWebsiteData): string => {
  if (!scrapedData) return '';

  const parts = [];

  if (scrapedData.title) {
    parts.push(`Company: ${scrapedData.title}`);
  }

  if (scrapedData.description) {
    parts.push(`Description: ${scrapedData.description.substring(0, 150)}`);
  }

  if (scrapedData.headings && scrapedData.headings.length > 0) {
    parts.push(`Services/Products: ${scrapedData.headings.slice(0, 3).join(', ')}`);
  }

  return parts.join('\n');
};
