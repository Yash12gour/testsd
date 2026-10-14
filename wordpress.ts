/**
 * Headless WordPress REST API Types & Service
 */

import { WORDPRESS_CONFIG } from '../constants/wordpress';
import DOMPurify from 'dompurify';

export interface WPPostRendered {
  rendered: string;
  protected?: boolean;
}

export interface WPMediaDetails {
  width?: number;
  height?: number;
  file?: string;
  source_url?: string;
}

export interface WPEmbeddedMedia {
  id: number;
  source_url?: string;
  alt_text?: string;
  title?: WPPostRendered;
  media_details?: {
    sizes?: {
      medium?: { source_url: string };
      large?: { source_url: string };
      full?: { source_url: string };
    };
  };
}

export interface WPEmbeddedAuthor {
  id: number;
  name: string;
  description?: string;
  link?: string;
  slug?: string;
  avatar_urls?: Record<string, string>;
}

export interface WPEmbeddedTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  link?: string;
}

export interface WPPost {
  id: number;
  date: string;
  date_gmt?: string;
  modified?: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WPPostRendered;
  content: WPPostRendered;
  excerpt: WPPostRendered;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: WPEmbeddedAuthor[];
    'wp:featuredmedia'?: WPEmbeddedMedia[];
    'wp:term'?: WPEmbeddedTerm[][];
  };
}

export interface NormalizedArticle {
  id: string; // post ID or slug
  slug: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  htmlContent: string;
  takeaways: string[];
  tags: string[];
  isFeatured?: boolean;
}

/**
 * Strips HTML tags and decodes common entities to plain text
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || '').trim();
}

/**
 * Calculates human-readable reading time (avg 200 words/min)
 */
export function calculateReadTime(textOrHtml: string): string {
  const plain = stripHtml(textOrHtml);
  const words = plain.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/**
 * Formats ISO date to readable Spacedesk format e.g. "14 Oct 2026"
 */
export function formatWPDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return dateStr;
  }
}

/**
 * Extracts a fallback set of key takeaway bullet points from the content
 */
function extractTakeaways(html: string, fallbackTitle: string): string[] {
  const takeaways: string[] = [];
  try {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    // Look for lists in the content first
    const listItems = tmp.querySelectorAll('li');
    if (listItems.length > 0) {
      listItems.forEach((li) => {
        const text = li.textContent?.trim();
        if (text && text.length > 10 && takeaways.length < 3) {
          takeaways.push(text);
        }
      });
    }

    // Look for strong / bold or paragraph headers
    if (takeaways.length === 0) {
      const strongs = tmp.querySelectorAll('strong, b, h3, h4');
      strongs.forEach((s) => {
        const text = s.textContent?.trim();
        if (text && text.length > 10 && text.length < 120 && takeaways.length < 3) {
          takeaways.push(text.replace(/[:.]+$/, ''));
        }
      });
    }

    // Fallback based on article title if post is short
    if (takeaways.length === 0) {
      takeaways.push(
        `High-speed infrastructure and ergonomic setups at Spacedesk Bhopal`,
        `Curated workspace insights directly from the ${fallbackTitle} guide`,
        `Flexible workspace solutions designed for high focus and productivity`
      );
    }
  } catch {
    // fallback
  }

  return takeaways;
}

/**
 * Normalizes a WordPress REST API post into our Spacedesk article format
 */
export function normalizeWPPost(post: WPPost, index = 0): NormalizedArticle {
  const rawTitle = post.title?.rendered || 'Untitled Post';
  const cleanTitle = stripHtml(rawTitle);

  const rawExcerpt = post.excerpt?.rendered || '';
  const cleanExcerpt = stripHtml(rawExcerpt) || cleanTitle;

  // Extract Category
  let category = 'Workplace';
  if (post._embedded?.['wp:term']) {
    const termArrays = post._embedded['wp:term'];
    for (const terms of termArrays) {
      for (const t of terms) {
        if (t.taxonomy === 'category' && t.name) {
          // If WordPress default "Uncategorized", label nicely as "Editorial" or "Spacedesk News"
          category = t.name.toLowerCase() === 'uncategorized' ? 'Editorial' : t.name;
          break;
        }
      }
    }
  }

  // Extract Tags
  const tags: string[] = [];
  if (post._embedded?.['wp:term']) {
    const termArrays = post._embedded['wp:term'];
    for (const terms of termArrays) {
      for (const t of terms) {
        if (t.taxonomy === 'post_tag' && t.name) {
          tags.push(t.name);
        }
      }
    }
  }
  if (tags.length === 0) {
    tags.push('Spacedesk', 'Coworking', category);
  }

  // Extract Author
  let author = 'Spacedesk Editorial';
  let authorRole = 'Workspace Strategy';
  if (post._embedded?.author && post._embedded.author.length > 0) {
    const a = post._embedded.author[0];
    if (a.name && a.name.toLowerCase() !== 'admin') {
      author = a.name;
    }
    if (a.description) {
      authorRole = a.description;
    }
  }

  // Extract Featured Image
  let imageUrl = WORDPRESS_CONFIG.defaultFeaturedFallbackImage;
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  if (featuredMedia) {
    imageUrl =
      featuredMedia.media_details?.sizes?.large?.source_url ||
      featuredMedia.media_details?.sizes?.full?.source_url ||
      featuredMedia.source_url ||
      imageUrl;
  }

  // Sanitize full HTML content using DOMPurify
  const rawContent = post.content?.rendered || '';
  const sanitizedContent = typeof window !== 'undefined'
    ? DOMPurify.sanitize(rawContent, {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target'],
      })
    : rawContent;

  const dateFormatted = formatWPDate(post.date);
  const readTime = calculateReadTime(rawContent || rawExcerpt);
  const takeaways = extractTakeaways(rawContent, cleanTitle);

  return {
    id: String(post.id),
    slug: post.slug,
    category,
    date: dateFormatted,
    readTime,
    author,
    authorRole,
    title: cleanTitle,
    excerpt: cleanExcerpt,
    imageUrl,
    htmlContent: sanitizedContent,
    takeaways,
    tags,
    isFeatured: index === 0,
  };
}

/**
 * Public, read-only API calls to WordPress
 */
export const WordPressService = {
  /**
   * Fetches published posts with embedded media, authors, and terms
   */
  async getPosts(perPage = WORDPRESS_CONFIG.defaultPerPage): Promise<NormalizedArticle[]> {
    const url = `${WORDPRESS_CONFIG.apiBaseUrl}${WORDPRESS_CONFIG.postsEndpoint}?_embed&per_page=${perPage}&status=publish`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const data: WPPost[] = await response.json();
    return data.map((post, idx) => normalizeWPPost(post, idx));
  },

  /**
   * Fetches an individual post by slug
   */
  async getPostBySlug(slug: string): Promise<NormalizedArticle | null> {
    const cleanSlug = encodeURIComponent(slug.trim());
    const url = `${WORDPRESS_CONFIG.apiBaseUrl}${WORDPRESS_CONFIG.postsEndpoint}?_embed&slug=${cleanSlug}&status=publish`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const data: WPPost[] = await response.json();
    if (!data || data.length === 0) {
      return null;
    }

    return normalizeWPPost(data[0], 0);
  },
};
