'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import '../../styles/blogs.css';
import '../../styles/customer-stories.css';
import FeatureMarquee from '../../components/FeatureMarquee';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const blogPosts = [
  {
    id: 1,
    title: 'A Complete Guide for Modern Sales Teams',
    excerpt:
      'Sales prospecting has always been one of the most challenging parts of the sales process.',
    slug: 'Transforming-Sales-Prospecting',
    author: '360Airo Team',
    date: 'December 3, 2025',
    readTime: '6 min read',
    category: 'Email Tools',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    isNew: true,
    views: '2.8K',
    tags: ['Email Calculator', 'Deliverability', 'Cold Email'],
  },
  {
    id: 2,
    title: '10 Cheapest Cold Email Software Tools for Startups & Agencies (2026 Guide)',
    excerpt:
      'Cold email remains one of the most cost-effective growth channels for startups and agencies. Discover the 10 most affordable tools.',
    slug: 'Sales-Outreach-Platform',
    author: '360Airo Team',
    date: 'November 15, 2025',
    readTime: '10 min read',
    category: 'Cold Email',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    isNew: false,
    views: '4.1K',
    tags: ['Cold Email', 'Software Tools'],
  },
  {
    id: 3,
    title: 'Free Email Verification: How to Verify Email Addresses for Free with 360Airo',
    excerpt:
      'Clean your email lists, protect sender reputation, and improve outreach results before sending a single email.',
    slug: 'Inbound-Sales-Automation',
    author: '360Airo Team',
    date: 'October 25, 2025',
    readTime: '8 min read',
    category: 'Email Marketing',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    isNew: false,
    views: '3.2K',
    tags: ['Email Verification', 'Deliverability'],
  },
  {
    id: 4,
    title: 'LinkedIn Outreach Strategy That Converts: Step-by-Step Playbook for 2025',
    excerpt:
      'LinkedIn is now one of the strongest B2B sales channels. Learn the exact playbook generating more meetings.',
    slug: '10-Best-Outreachio-Alternatives',
    author: 'Mike Rodriguez',
    date: 'October 20, 2025',
    readTime: '7 min read',
    category: 'LinkedIn',
    image:
      'https://images.unsplash.com/photo-1611944212129-29977ae1398c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    isNew: false,
    views: '1.8K',
    tags: ['LinkedIn', 'Outreach'],
  },
  {
    id: 5,
    title: 'Top Cold Email Tools in 2025: Which One Actually Delivers Replies?',
    excerpt:
      'Cold outreach today is about precision, personalization, and performance. Discover the tools that actually get responses.',
    slug: 'SDR-Workflow-Automation-Guide',
    author: 'Sarah Chen',
    date: 'October 23, 2025',
    readTime: '8 min read',
    category: 'Cold Email',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    isNew: false,
    views: '2.4K',
    tags: ['Cold Email', 'Sales Tools'],
  },
  {
    id: 6,
    title: 'Top Cold Email Tools in 2025: Which One Actually Delivers Replies?',
    excerpt:
      'Cold outreach today is about precision, personalization, and performance. Discover the tools that actually get responses.',
    slug: 'Free-Email-Verification',
    author: 'Sarah Chen',
    date: 'October 23, 2025',
    readTime: '8 min read',
    category: 'Cold Email',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    isNew: false,
    views: '2.4K',
    tags: ['Cold Email', 'Sales Tools'],
  },

    {
    id: 7,
    title: 'Top Cold Email Tools in 2025: Which One Actually Delivers Replies?',
    excerpt:
      'Cold outreach today is about precision, personalization, and performance. Discover the tools that actually get responses.',
    slug: 'Free-SPF-Record-Generator',
    author: 'Sarah Chen',
    date: 'October 23, 2025',
    readTime: '8 min read',
    category: 'Cold Email',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    isNew: false,
    views: '2.4K',
    tags: ['Cold Email', 'Sales Tools'],
  },

    {
    id: 8,
    title: 'Top Cold Email Tools in 2025: Which One Actually Delivers Replies?',
    excerpt:
      'Cold outreach today is about precision, personalization, and performance. Discover the tools that actually get responses.',
    slug: 'Free-Email-Mailbox-Calculator',
    author: 'Sarah Chen',
    date: 'October 23, 2025',
    readTime: '8 min read',
    category: 'Cold Email',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    isNew: false,
    views: '2.4K',
    tags: ['Cold Email', 'Sales Tools'],
  },

    {
    id: 9,
    title: 'Top Cold Email Tools in 2025: Which One Actually Delivers Replies?',
    excerpt:
      'Cold outreach today is about precision, personalization, and performance. Discover the tools that actually get responses.',
    slug: 'Free-Email-Deliverability-Test',
    author: 'Sarah Chen',
    date: 'October 23, 2025',
    readTime: '8 min read',
    category: 'Cold Email',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    isNew: false,
    views: '2.4K',
    tags: ['Cold Email', 'Sales Tools'],
  },

 {
    id: 10,
    title: 'Top Cold Email Tools in 2025: Which One Actually Delivers Replies?',
    excerpt:
      'Cold outreach today is about precision, personalization, and performance. Discover the tools that actually get responses.',
    slug: '10-Cheapest-Cold-Email-Software',
    author: 'Sarah Chen',
    date: 'October 23, 2025',
    readTime: '8 min read',
    category: 'Cold Email',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    isNew: false,
    views: '2.4K',
    tags: ['Cold Email', 'Sales Tools'],
  },

  
];

export default function BlogsPage() {
  const categories = [
    'All',
    'Cold Email',
    'Email Marketing',
    'LinkedIn',
    'Email Tools'
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categoriesRef = useRef<HTMLDivElement>(null);

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    // Filter by category
    if (selectedCategory !== 'All') {
      posts = blogPosts.filter(post => 
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query if any
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      posts = posts.filter(post => {
        const haystack = [
          post.title,
          post.excerpt,
          post.category,
          post.author,
          ...(post.tags || []),
        ].join(' ').toLowerCase();
        return haystack.includes(query);
      });
    }

    return posts;
  }, [selectedCategory, searchQuery]);

  const featuredPost = filteredPosts[0] || blogPosts[0];
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : filteredPosts;

  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return blogPosts.filter((post) => {
      const haystack = [
        post.title,
        post.excerpt,
        post.category,
        post.author,
        ...(post.tags || []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [searchQuery]);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (!categoriesRef.current) return;
    const scrollAmount = 260;

    categoriesRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="blog-shell">
      <Navbar activeTab="resources" />

      <main className="blog-light-main pt-28 pb-16">
        {/* Header Title */}
        <div className="mx-auto max-w-7xl px-6 mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900" style={{ fontFamily: "'Barlow Condensed', sans-serif", textTransform: 'uppercase', fontWeight: 900 }}>
            Insights & Resources
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-500 max-w-2xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Expert guides, product updates, and growth strategies for modern outreach teams.
          </p>
        </div>

        {/* Featured Post (recent post) */}
        <section className="px-4 pb-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid gap-8 rounded-[24px] premium-featured-card p-6 md:grid-cols-2 md:p-8"
            >
              <motion.div variants={itemVariants} className="overflow-hidden rounded-xl h-[320px] relative shadow-md">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-full w-full rounded-xl object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col justify-center">
                <div>
                  <span className="premium-badge mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {featuredPost.category}
                  </span>
                </div>

                <h1 className="max-w-xl text-2xl font-bold leading-tight text-white md:text-3xl tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {featuredPost.title}
                </h1>

                <p className="mt-4 max-w-lg text-[13px] leading-relaxed text-gray-300 line-clamp-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {featuredPost.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-blue-400" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-blue-400" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-blue-400" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href={`/blogs/${featuredPost.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="premium-button"
                    >
                      Read article
                      <ArrowRight className="h-3.5 w-3.5" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Categories / Search Bar - Displayed after the recent/featured post */}
        <div className="blog-sticky-nav-light">
          <div className="blog-sticky-container">
            <div className="flex min-w-0 flex-1 items-center">
              <div className="min-w-0 flex-1 overflow-hidden">
                <div
                  ref={categoriesRef}
                  className="scrollbar-hide flex items-center gap-6 overflow-x-auto whitespace-nowrap"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`minimal-tab-btn-light ${selectedCategory === cat ? 'active' : ''}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative hidden min-w-[260px] md:block">
              <div className="minimal-search-box-light">
                <Search className="h-4 w-4 text-blue-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Blog"
                  className="w-full bg-transparent outline-none placeholder:text-gray-500 text-xs text-gray-800"
                />
              </div>

              {searchQuery.trim() && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
                  {filteredResults.length > 0 ? (
                    <div className="max-h-[320px] overflow-y-auto py-2">
                      {filteredResults.map((post) => (
                        <Link
                          key={post.id}
                          href={`/blogs/${post.slug}`}
                          onClick={() => setSearchQuery('')}
                          className="block px-4 py-3 transition-colors hover:bg-gray-50"
                        >
                          <p className="text-[13px] font-semibold text-gray-900">
                            {post.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-[11px] text-gray-500">
                            {post.excerpt}
                          </p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-4 text-[12px] text-gray-500">
                      No matching blog posts found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="px-4 pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="blog-grid">
              {gridPosts.map((post) => (
                <div
                  key={post.id}
                  className="w-full flex"
                >
                  <Link className="blog-light-card" href={`/blogs/${post.slug}`} style={{ width: '100%' }}>
                    <div className="blog-light-card-image-wrapper">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="blog-light-card-img"
                        width="800"
                        height="533"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="blog-light-card-content">
                      <h2 className="blog-light-card-title">{post.title}</h2>
                      <p className="blog-light-card-excerpt">
                        {post.excerpt}
                      </p>
                      <div className="blog-light-card-footer">
                        <div className="blog-light-card-tags">
                          <span className="blog-light-card-tag">{post.category}</span>
                          <span className="blog-light-card-tag">{post.readTime}</span>
                        </div>
                        <span className="blog-light-card-read-more">Read More →</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Final CTA */}
      <section className="cs-cta-modern">
        <div className="cs-cta-bg">
          <div className="cs-cta-pattern"></div>
        </div>
        <div className="cs-cta-content" style={{width: '100%'}}>
          <h2>Put multichannel outbound on autopilot<br/>with 360Airo</h2>
          <div className="cs-cta-buttons">
            <button className="btn-primary-purple">Start free &rarr;</button>
            <button className="btn-secondary-white">Book a demo &rarr;</button>
          </div>
          
          <FeatureMarquee />
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
