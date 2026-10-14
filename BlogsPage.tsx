import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Share2,
  Bookmark,
  Sparkles,
  Search,
  CheckCircle2,
  Send,
  X,
  User,
  RefreshCw,
  AlertCircle,
  Globe,
} from 'lucide-react';
import { brandName } from '../data/content';
import { ImageWithFallback } from './ImageWithFallback';
import { Reveal } from './Reveal';
import { Parallax } from './Parallax';
import { Scroll3D, ScrollCard3D, ScrollImageDepth, ScrollParallax3D } from './motion';
import { SEO } from './SEO';
import { CountUpNumber } from './CountUpNumber';
import { WordPressService, NormalizedArticle } from '../services/wordpress';

interface BlogsPageProps {
  onBookTourClick: () => void;
  onDayPassClick?: () => void;
  onExploreSpacesClick: () => void;
  onNavigateHome: () => void;
}

export type ArticleItem = NormalizedArticle;

// Static fallback articles used as seamless initial state or offline fallback
const FALLBACK_ARTICLES: ArticleItem[] = [
  {
    id: 'art-meeting-room-guide',
    slug: 'meeting-room-rental-guide',
    category: 'Meeting Rooms',
    date: '07 Sept 2026',
    readTime: '4 min read',
    author: 'SpaceDesk Editorial Team',
    authorRole: 'Workspace Strategy',
    title: 'Meeting Room Rental Guide: How to Choose the Right Space for Client Pitches & Team Sprints',
    excerpt:
      'Choosing the right meeting room can make client discussions, interviews, presentations, workshops, and team sessions significantly more productive. Discover the key acoustic, AV, and layout checks before booking.',
    imageUrl:
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    tags: ['Meeting Rooms', 'Productivity', 'Client Presentations', 'Bhopal Office'],
    takeaways: [
      'Prioritize acoustic double glazing and boundary mics for hybrid video calls',
      'Test wireless 4K screen mirroring (AirPlay/Miracast) before important client pitches',
      'Verify on-demand beverage and tea/coffee service to keep attendees energized',
    ],
    htmlContent: `<p>When pitching prospective clients, closing enterprise contracts, or conducting cross-functional sprint planning, the physical environment sets the tone for professionalism and cognitive clarity. A noisy coffee shop or cramped temporary desk rarely provides the privacy or confidence required for high-stakes business discussions.</p>
<p><strong>1. Acoustic Insulation &amp; Sound Isolation:</strong> Ambient room noise exceeding 45 dB can cause strain in client calls. Professional meeting suites incorporate acoustic wall paneling, double-glazed acoustic glass, and sound-absorbing ceiling baffles to ensure internal discussions stay strictly confidential.</p>
<p><strong>2. Display Technology &amp; Seamless AV:</strong> Passing around a small laptop screen diminishes engagement. A dedicated conference suite should feature a 4K UHD display with plug-and-play wireless screencasting, eliminating awkward adapter scrambles right before presentations.</p>
<p><strong>3. Hospitality &amp; Support:</strong> Having access to fresh coffee, chilled drinking water, and on-demand stationery ensures your meetings flow smoothly without mid-session interruptions.</p>
<p>At SpaceDesk Jaswant Tower, our conference and boardroom facilities are bookable by the hour with full AV equipment, high-speed fiber, and complimentary Space Deli beverage delivery.</p>`,
  },
  {
    id: 'art-coworking-vs-wfh',
    slug: 'coworking-vs-working-from-home',
    category: 'Workplace Trends',
    date: '18 Sept 2026',
    readTime: '5 min read',
    author: 'SpaceDesk Insights',
    authorRole: 'Community Research',
    title: 'Co-working vs Working From Home: Why Hybrid Professionals Are Choosing Dedicated Desks',
    excerpt:
      'Working from home looks great on paper: no commute, flexible hours, complete comfort. In reality, constant household distractions, ergonomic strain, and isolation can erode your momentum.',
    imageUrl:
      'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1000&q=80',
    tags: ['Coworking', 'Remote Work', 'Focus', 'Mental Health'],
    takeaways: [
      'A dedicated workplace creates psychological boundaries between work and rest',
      'Ergonomic seating and dual monitors prevent posture fatigue over 8-hour workdays',
      'Serendipitous networking with fellow professionals sparks unexpected partnerships',
    ],
    htmlContent: `<p>The shift to remote work gave millions of professionals unprecedented geographic freedom. Yet after years of kitchen-table laptops and Zoom calls interrupted by doorbell deliveries, many remote engineers, founders, and designers are rediscovering the undeniable value of physical separation between work and home.</p>
<p><strong>Cognitive Boundary Conditioning:</strong> When your bedroom or living room is also your office, your brain struggles to transition into deep focus during the day and equally struggles to unwind at night. Stepping into a purposefully designed coworking space triggers an instant psychological cue: it is time to build.</p>
<p><strong>Infrastructure You Cannot Replicate at Home:</strong> 300 Mbps symmetric fiber with dual failover lines, continuous diesel generator power backup, ergonomic mesh task chairs, and dedicated quiet phone booths allow you to deliver client work without worrying about local power cuts or spotty residential Wi-Fi.</p>
<p><strong>Combatting Remote Isolation:</strong> Freelancers and solo founders thrive on human energy. SpaceDesk provides the perfect balance—quiet focus zones when you need deep output, and vibrant lounge areas when you want to bounce ideas off fellow creators over fresh coffee.</p>`,
  },
];

export const BlogsPage: React.FC<BlogsPageProps> = ({
  onBookTourClick,
  onDayPassClick,
  onExploreSpacesClick,
  onNavigateHome,
}) => {
  const [articles, setArticles] = useState<ArticleItem[]>(FALLBACK_ARTICLES);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Fetch WordPress posts on component mount
  const fetchWPPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const wpPosts = await WordPressService.getPosts(10);
      if (wpPosts && wpPosts.length > 0) {
        setArticles(wpPosts);
      }
    } catch (err) {
      console.warn('WordPress API fetch fallback to cached articles:', err);
      setError('Unable to load live posts from WordPress. Showing cached articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWPPosts();
  }, []);

  // Handle URL hash slug navigation e.g. #blogs/welcome-to-spacedesk
  useEffect(() => {
    const handleHashArticle = () => {
      const hash = window.location.hash;
      let targetSlug = '';

      if (hash.startsWith('#blogs/')) {
        targetSlug = hash.replace('#blogs/', '');
      } else if (hash.startsWith('#blog/')) {
        targetSlug = hash.replace('#blog/', '');
      } else if (hash.startsWith('#article/')) {
        targetSlug = hash.replace('#article/', '');
      } else if (hash.includes('article=')) {
        const match = hash.match(/article=([^&]+)/);
        if (match) targetSlug = match[1];
      }

      if (targetSlug) {
        // Find in currently loaded articles first
        const found = articles.find((a) => a.slug === targetSlug || a.id === targetSlug);
        if (found) {
          setActiveArticle(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // Attempt fetching directly from WordPress API by slug
          WordPressService.getPostBySlug(targetSlug)
            .then((wpPost) => {
              if (wpPost) {
                setActiveArticle(wpPost);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            })
            .catch(() => {});
        }
      }
    };

    handleHashArticle();
    window.addEventListener('hashchange', handleHashArticle);
    return () => window.removeEventListener('hashchange', handleHashArticle);
  }, [articles]);

  const openArticle = (article: ArticleItem) => {
    setActiveArticle(article);
    window.location.hash = `#blogs/${article.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeArticle = () => {
    setActiveArticle(null);
    window.location.hash = '#blogs';
  };

  // Derive available categories dynamically from fetched posts
  const categories = useMemo(() => {
    const catSet = new Set<string>();
    catSet.add('All');
    articles.forEach((art) => {
      if (art.category) catSet.add(art.category);
    });
    return Array.from(catSet);
  }, [articles]);

  const featuredArticle = articles.find((a) => a.isFeatured) || articles[0];

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 3000);
  };

  // ---------------------------------------------------------------------------
  // SINGLE ARTICLE DETAIL VIEW
  // ---------------------------------------------------------------------------
  if (activeArticle) {
    return (
      <div className="w-full bg-[var(--color-bg-warm)] min-h-screen text-[var(--color-charcoal)] font-[var(--font-sans)] pb-24 pt-32 lg:pt-36 fade-in-up">
        <SEO
          title={`${activeArticle.title} – SpaceDesk Journal`}
          description={activeArticle.excerpt}
          ogTitle={activeArticle.title}
          ogDescription={activeArticle.excerpt}
          ogImage={activeArticle.imageUrl}
          ogType="article"
          canonicalUrl={`/#blogs/${activeArticle.slug}`}
          jsonLd={{
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: activeArticle.title,
            description: activeArticle.excerpt,
            image: activeArticle.imageUrl,
            author: {
              '@type': 'Person',
              name: activeArticle.author,
              jobTitle: activeArticle.authorRole,
            },
            publisher: {
              '@type': 'Organization',
              name: brandName,
            },
            datePublished: activeArticle.date,
          }}
        />
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          {/* Back button */}
          <button
            onClick={closeArticle}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-colors py-2 px-4 rounded-full bg-white border border-[var(--color-border)] shadow-sm mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </button>

          {/* Article Header */}
          <Reveal>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[var(--color-gold)]">
                <span className="px-3 py-1 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-charcoal)] font-bold uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <span>·</span>
                <span className="text-[var(--color-muted)]">{activeArticle.date}</span>
                <span>·</span>
                <span className="text-[var(--color-muted)] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[var(--color-gold)]" />
                  {activeArticle.readTime}
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-5xl font-normal text-[var(--color-charcoal)] leading-tight">
                {activeArticle.title}
              </h1>

              <div className="flex items-center gap-3 pt-2 pb-6 border-b border-[var(--color-border)] text-xs text-[var(--color-muted)]">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-bold flex items-center justify-center text-xs">
                  SD
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-charcoal)]">
                    {activeArticle.author}
                  </div>
                  <div className="text-[11px]">{activeArticle.authorRole}</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Featured Image */}
          <Reveal delay={0.1}>
            <div className="my-8 rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-md aspect-[16/9]">
              <ImageWithFallback
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          {/* Key Takeaways Box */}
          {activeArticle.takeaways && activeArticle.takeaways.length > 0 && (
            <Reveal delay={0.15}>
              <div className="p-6 sm:p-8 rounded-2xl bg-white border-l-4 border-[var(--color-primary)] border border-[var(--color-border)] my-8 shadow-sm">
                <h3 className="font-heading text-lg font-medium text-[var(--color-charcoal)] mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
                  <span>Key Takeaways</span>
                </h3>
                <div className="space-y-2.5">
                  {activeArticle.takeaways.map((t, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--color-text)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-gold)] shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Article Body: Sanitized WordPress HTML Content */}
          <div
            className="wp-content text-[var(--color-text)] font-light leading-relaxed text-sm sm:text-base my-8"
            dangerouslySetInnerHTML={{ __html: activeArticle.htmlContent }}
          />

          {/* Tags */}
          {activeArticle.tags && activeArticle.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-wrap gap-2">
              {activeArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white border border-[var(--color-border)] text-xs text-[var(--color-muted)] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 p-8 rounded-3xl bg-[var(--color-charcoal)] text-white text-center space-y-4 shadow-xl">
            <h3 className="font-heading text-2xl font-normal text-white">
              Ready to Experience SpaceDesk Firsthand?
            </h3>
            <p className="text-xs text-[var(--color-text-on-dark)] max-w-md mx-auto font-light">
              Book a free private tour at Jaswant Tower to test the workspace.
            </p>
            <div className="flex items-center justify-center pt-2">
              <button
                onClick={onBookTourClick}
                className="px-6 py-3 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow cursor-pointer"
              >
                Book a Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // MAIN ARTICLES LIST VIEW
  // ---------------------------------------------------------------------------
  return (
    <div className="w-full bg-[var(--color-bg-warm)] min-h-screen text-[var(--color-charcoal)] font-[var(--font-sans)] pb-24 fade-in-up">
      <SEO
        title="SpaceDesk Journal – Headless WordPress Articles & Insights"
        description="Read published insights, workspace guides, and stories on remote work culture powered by our Headless WordPress CMS."
        ogTitle="SpaceDesk Journal – Headless WordPress Articles"
        ogDescription="Read published insights, workspace guides, and stories on remote work culture powered by our Headless WordPress CMS."
        ogImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
        canonicalUrl="/#blogs"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'SpaceDesk Journal',
          description: 'Insights on modern workspaces, hybrid productivity, and Bhopal startup culture.',
          publisher: {
            '@type': 'Organization',
            name: brandName,
          },
        }}
      />
      {/* 0. BREADCRUMB NAVIGATION */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-4 flex items-center justify-between text-xs text-[var(--color-muted)]">
        <div className="flex items-center gap-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="hover:text-[var(--color-charcoal)] transition-colors"
          >
            Home
          </a>
          <span>/</span>
          <span className="text-[var(--color-charcoal)] font-semibold">Journal &amp; WordPress CMS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-[11px] font-semibold border border-emerald-500/20">
            <Globe className="w-3 h-3 text-emerald-600 animate-pulse" />
            <span>Headless WP REST API Active</span>
          </span>
        </div>
      </div>

      {/* 1. HERO BANNER */}
      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-6 sm:px-8">
        <Scroll3D preset="hero" perspective={1400}>
          <Reveal variant="up">
            <div
              className="relative rounded-[32px] bg-[var(--color-charcoal)] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-[var(--color-border)]/20 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-charcoal)] via-[var(--color-charcoal)]/85 to-[var(--color-charcoal)]/40 z-10 pointer-events-none" />

              <div className="relative z-20 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-6 border border-[var(--color-primary)]/30">
                  <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  <span>SpaceDesk Knowledge Base</span>
                </div>

                <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight">
                  Insights &amp; Strategy for High-Performance Teams.
                </h1>

                <p className="text-xs sm:text-sm text-[var(--color-text-on-dark)] mt-4 font-light leading-relaxed">
                  Published articles directly synchronized from our Headless WordPress CMS. Explore workspace guidebooks, productivity tactics, and community stories.
                </p>

                {/* Search Bar in Hero */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                    <input
                      type="text"
                      placeholder="Search WordPress posts by keyword or tag..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={fetchWPPosts}
                    disabled={loading}
                    title="Refresh WordPress posts"
                    className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="relative z-10 mt-12 pt-8 border-t border-[var(--color-border)]/20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[var(--color-text-on-dark)]">
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    {loading ? '...' : `${articles.length} Posts`}
                  </span>
                  <span className="mt-1 block">Published Articles</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    REST API
                  </span>
                  <span className="mt-1 block">WP v2 Connected</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    {categories.length - 1} Cats
                  </span>
                  <span className="mt-1 block">Active Categories</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    100% Sanitized
                  </span>
                  <span className="mt-1 block">DOMPurify Clean</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Scroll3D>
      </section>

      {/* ERROR NOTICE IF FETCH FAILED */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-6">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={fetchWPPosts}
              className="px-3 py-1 rounded-full bg-amber-600 text-white font-semibold text-[11px] hover:bg-amber-700 transition-colors cursor-pointer shrink-0"
            >
              Retry WP API
            </button>
          </div>
        </div>
      )}

      {/* 2. FEATURED ARTICLE SPOTLIGHT */}
      {featuredArticle && !loading && (
        <section className="py-12 max-w-7xl mx-auto px-6 sm:px-8">
          <Scroll3D preset="section" intensity="subtle">
            <Reveal variant="up">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-semibold text-[var(--color-gold)] uppercase tracking-widest">
                    Featured Editorial
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-medium text-[var(--color-charcoal)] mt-1">
                    Must-Read Guide
                  </h2>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} variant="scale">
              <ScrollCard3D index={0} total={1} depth={18}>
                <div
                  onClick={() => openArticle(featuredArticle)}
                  className="group cursor-pointer rounded-3xl bg-white border border-[var(--color-border)] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[440px] overflow-hidden bg-gray-100">
                      <ScrollImageDepth depth={15}>
                        <ImageWithFallback
                          src={featuredArticle.imageUrl}
                          alt={featuredArticle.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                      </ScrollImageDepth>
                      <div className="absolute top-5 left-5">
                        <span className="px-3 py-1 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] text-xs font-bold uppercase tracking-wider shadow group-hover:scale-105 transition-transform">
                          {featuredArticle.category}
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-white">
                      <div>
                        <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
                          <span className="flex items-center gap-1 font-semibold text-[var(--color-gold)]">
                            <Calendar className="w-3.5 h-3.5" />
                            {featuredArticle.date}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {featuredArticle.readTime}
                          </span>
                        </div>

                        <h3 className="font-heading text-2xl sm:text-3xl font-medium text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)] transition-colors mt-3 leading-tight">
                          {featuredArticle.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[var(--color-text)] mt-4 font-light leading-relaxed line-clamp-4">
                          {featuredArticle.excerpt}
                        </p>
                      </div>

                      <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex items-center justify-between">
                        <span className="text-xs font-semibold text-[var(--color-charcoal)] flex items-center gap-1.5 group-hover:text-[var(--color-gold)] transition-colors">
                          <span>Read Full Article</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </span>
                        <span className="text-[11px] text-[var(--color-muted)]">
                          By {featuredArticle.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollCard3D>
            </Reveal>
          </Scroll3D>
        </section>
      )}

      {/* 3. ALL ARTICLES & SEARCH / FILTER */}
      <section className="py-12 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal variant="up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[var(--color-border)]">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[var(--color-charcoal)] text-white shadow'
                      : 'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-charcoal)] hover:bg-[var(--color-bg-warm)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-[var(--color-border)] rounded-full text-xs text-[var(--color-charcoal)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
              />
            </div>
          </div>
        </Reveal>

        {/* LOADING SKELETON STATE */}
        {loading && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="rounded-2xl bg-white border border-[var(--color-border)] overflow-hidden p-6 space-y-4 animate-pulse"
              >
                <div className="w-full h-44 bg-gray-200 rounded-xl" />
                <div className="w-1/3 h-4 bg-gray-200 rounded-full" />
                <div className="w-3/4 h-6 bg-gray-200 rounded-lg" />
                <div className="w-full h-12 bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredArticles.length === 0 && (
          <div className="my-16 text-center p-12 bg-white rounded-3xl border border-[var(--color-border)] max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-gold)] flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-normal text-[var(--color-charcoal)]">
              No Articles Found
            </h3>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
              No published posts matched "{searchQuery}" in category "{selectedCategory}". Try clearing your search query or refreshing from WordPress.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
            >
              Clear Search &amp; Filters
            </button>
          </div>
        )}

        {/* ARTICLE CARDS GRID */}
        {!loading && filteredArticles.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art, idx) => (
              <ScrollCard3D key={art.id} index={idx} total={filteredArticles.length} depth={12}>
                <Reveal delay={idx * 80} variant="up">
                  <div
                    onClick={() => openArticle(art)}
                    className="group cursor-pointer rounded-2xl bg-white border border-[var(--color-border)] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <ScrollImageDepth depth={10}>
                        <ImageWithFallback
                          src={art.imageUrl}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                      </ScrollImageDepth>
                      <div className="absolute top-3 left-3 bg-[var(--color-charcoal)]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider shadow-xs group-hover:scale-105 transition-transform">
                        {art.category}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-[11px] text-[var(--color-muted)] mb-2">
                          <span>{art.date}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[var(--color-gold)]" />
                            {art.readTime}
                          </span>
                        </div>

                        <h4 className="font-heading text-lg font-medium text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)] transition-colors line-clamp-2 leading-snug">
                          {art.title}
                        </h4>

                        <p className="text-xs text-[var(--color-text)] mt-2 line-clamp-3 font-light leading-relaxed">
                          {art.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
                        <span className="font-semibold text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)] flex items-center gap-1 transition-colors">
                          <span>Read Article</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="text-[11px] text-[var(--color-muted)]">
                          {art.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </ScrollCard3D>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
