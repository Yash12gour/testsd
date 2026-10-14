import React, { useEffect } from 'react';
import { brandName } from '../data/content';

export interface SEOProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'business.business';
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

const DEFAULT_IMAGE = '/images/hero-modern-coworking-office.jpg';
const PRODUCTION_DOMAIN = 'https://spacedesk.in';

/**
 * Updates or creates a <meta> tag in the document head.
 */
function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Updates or creates a <link rel="..."> tag in the document head.
 */
function setLinkTag(rel: string, href: string) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Updates or creates a Schema.org JSON-LD structured data script.
 */
function setStructuredData(jsonLd?: Record<string, unknown>) {
  if (typeof document === 'undefined') return;
  const scriptId = 'spacedesk-page-schema';
  let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!jsonLd) {
    if (scriptEl) scriptEl.remove();
    return;
  }

  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = scriptId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(jsonLd);
}

/**
 * Resolves relative or canonical URLs into absolute URLs for SEO tags & social cards.
 */
function resolveAbsoluteUrl(url?: string): string {
  if (typeof window === 'undefined') {
    if (!url) return PRODUCTION_DOMAIN;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${PRODUCTION_DOMAIN}${url.startsWith('/') ? '' : '/'}${url}`;
  }

  const baseOrigin =
    window.location.hostname !== 'localhost' && !window.location.hostname.includes('run.app')
      ? PRODUCTION_DOMAIN
      : window.location.origin;

  if (!url) {
    return `${baseOrigin}${window.location.pathname}${window.location.hash}`;
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `${baseOrigin}${url.startsWith('/') ? '' : '/'}${url}`;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  noindex = false,
  jsonLd,
}) => {
  useEffect(() => {
    // 1. Title
    const formattedTitle = title.includes(brandName) ? title : `${title} | ${brandName}`;
    document.title = formattedTitle;

    // 2. Standard Meta Description & Robots
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    // 3. Absolute URLs
    const fullCanonical = resolveAbsoluteUrl(canonicalUrl);
    const resolvedImage = resolveAbsoluteUrl(ogImage);

    // 4. Open Graph tags
    setMetaTag('property', 'og:site_name', brandName);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:title', ogTitle || formattedTitle);
    setMetaTag('property', 'og:description', ogDescription || description);
    setMetaTag('property', 'og:image', resolvedImage);
    setMetaTag('property', 'og:url', fullCanonical);
    setLinkTag('canonical', fullCanonical);

    // 5. Twitter / X Card tags
    setMetaTag('name', 'twitter:card', twitterCard);
    setMetaTag('name', 'twitter:title', ogTitle || formattedTitle);
    setMetaTag('name', 'twitter:description', ogDescription || description);
    setMetaTag('name', 'twitter:image', resolvedImage);

    // 6. JSON-LD structured data
    setStructuredData(jsonLd);
  }, [
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    twitterCard,
    canonicalUrl,
    noindex,
    jsonLd,
  ]);

  return null;
};

export default SEO;
