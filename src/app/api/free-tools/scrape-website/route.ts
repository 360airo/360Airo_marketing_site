import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {
  try {
    const { website } = await request.json();

    if (!website) {
      return NextResponse.json(
        { error: 'Website URL is required' },
        { status: 400 }
      );
    }

    let url = website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    console.log(`🌐 Scraping website: ${url}`);

    const response = await axios.get(url, {
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive'
      },
      validateStatus: (status) => status < 500,
      maxRedirects: 5
    });

    if (response.status >= 400) {
      return NextResponse.json(
        { 
          success: false,
          error: `HTTP ${response.status}: Could not access website` 
        },
        { status: response.status }
      );
    }

    const $ = cheerio.load(response.data);

    // Extract key information
    const title = $('title').text() || $('h1').first().text() || '';
    const description = 
      $('meta[name="description"]').attr('content') || 
      $('meta[property="og:description"]').attr('content') || 
      '';

    const headings: string[] = [];
    $('h1, h2, h3').slice(0, 8).each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 5 && text.length < 150) {
        headings.push(text);
      }
    });

    // Extract main text content
    const paragraphs: string[] = [];
    $('p').slice(0, 5).each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 20 && text.length < 300) {
        paragraphs.push(text);
      }
    });

    const mainContent = paragraphs.join(' ').substring(0, 500);

    // Check if we got meaningful content
    if (!title && !description && headings.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Could not extract meaningful content from website' 
        },
        { status: 400 }
      );
    }

    const data = {
      website: url,
      title: title.substring(0, 200),
      description: description.substring(0, 300),
      headings: headings.slice(0, 5),
      content: mainContent,
      scrapedAt: new Date().toISOString()
    };

    console.log(`✅ Successfully scraped ${url}`);

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Web scraping error:', error);

    let errorMessage = 'Failed to scrape website';
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Could not connect to website';
      } else if (error.code === 'ENOTFOUND') {
        errorMessage = 'Website not found';
      } else if (error.code === 'ETIMEDOUT') {
        errorMessage = 'Website took too long to respond';
      }
    }

    return NextResponse.json(
      { 
        success: false,
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}
