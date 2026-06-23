import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Navbar } from '@/components/Navbar';
// import { Footer } from '../components/footer';

type TocItem = {
  id: string;
  label: string;
  arrow: boolean;
  indent?: boolean;
};

const blogCategories = [
  'Blog',
  'Sales Prospecting',
  'AI Sales',
  'Lead Generation',
  'CRM Integration',
  'Sales Automation',
  'Revenue Operations',
  'Outbound Sales',
];

const tocItems: TocItem[] = [
  { id: 'toc-main', label: 'Introduction', arrow: false },
  { id: 'why-consider-an-outreach-io-alternative', label: 'Why Consider an Outreach.io Alternative?', arrow: true },
  { id: 'quick-comparison-best-outreach-io-alternatives', label: 'Quick Comparison: Best Outreach.io Alternatives', arrow: true },
  { id: 'what-is-outreach-io', label: 'What Is Outreach.io?', arrow: true },
  { id: 'how-we-selected-the-best-outreach-io-alternatives', label: 'How We Selected the Best Outreach.io Alternatives', arrow: true },
  { id: 'platform-1-360airo', label: '1. 360Airo', arrow: true },
];

const sectionImages: Record<
  string,
  {
    src: string;
    alt: string;
    label: string;
  }
> = {
  'why-consider-an-outreach-io-alternative': {
    src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80',
    alt: 'Outreach.io alternatives overview',
    label: 'Overview',
  },
  'platform-1-360airo': {
    src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80',
    alt: 'AI powered sales engagement',
    label: '360Airo',
  },
};

function SectionImage({ id }: { id: string }) {
  const image = sectionImages[id];
  if (!image) return null;

  return (
    <div className="mt-8 overflow-hidden rounded-[24px] border border-[#dbe3f4] bg-white shadow-[0_12px_32px_rgba(79,99,255,0.08)]">
      <div className="relative h-[230px] w-full md:h-[340px]">
        <img
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091b36]/50 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#4f63ff] backdrop-blur">
          {image.label}
        </div>
      </div>
    </div>
  );
}

function MiniInfographic({
  title,
  paragraphs,
  bullets,
}: {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}) {
  return (
    <div className="mt-8 rounded-[20px] border border-[#dbe3f4] bg-[#f8f9ff] p-5 md:p-6">
      <h3 className="mb-5 text-[22px] font-bold leading-tight text-[#111827] md:text-[26px]">
        {title}
      </h3>

      <div className="space-y-4 text-[16px] leading-8 text-[#4f5668]">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>

      {bullets && bullets.length > 0 ? (
        <ul className="mt-5 list-disc space-y-3 pl-5 text-[16px] leading-8 text-[#4f5668]">
          {bullets.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ContentBlock({
  subtitle,
  paragraphs,
}: {
  subtitle: string;
  paragraphs: string[];
}) {
  return (
    <div className="mt-7">
      <h3 className="mb-3 text-[20px] font-bold text-[#111827] md:text-[22px]">
        {subtitle}
      </h3>
      <div className="space-y-4 text-[16px] leading-8 text-[#4f5668]">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
}

function RightPromoCards() {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 w-[250px] space-y-4">
        <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="relative h-[130px] w-[200px] shrink-0">
              <img
                src="/360aironewlog.png"
                alt="360Airo logo"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <h3 className="mt-[-30px] mb-4 text-center text-[18px] font-bold leading-[1.3] text-white">
            Outreach Alternatives
            <br />
            Made Simple
          </h3>

          <p className="mb-5 text-center text-[13px] leading-6 text-white">
            Compare AI sales engagement tools, pricing, and outbound automation in one place.
          </p>

          <button className="w-full rounded-[12px] border border-white bg-transparent px-4 py-3 text-[15px] font-bold text-white transition hover:opacity-95">
            Try For FREE!
          </button>
        </div>

        <div className="rounded-[18px] border border-[#dbe3f4] bg-white p-4 shadow-[0_8px_24px_rgba(17,24,39,0.05)]">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4f63ff]">
            Quick Tip
          </p>
          <h4 className="mb-2 text-[15px] font-bold leading-6 text-[#111827]">
            Compare AI + pricing
          </h4>
          <p className="text-[12px] leading-5 text-[#5f6472]">
            The best Outreach alternative depends on workflow fit, AI depth, deliverability, and budget.
          </p>
        </div>
      </div>
    </aside>
  );
}

function ArticleSection({
  id,
  title,
  intro,
  blocks,
  infographic,
  showImage = true,
}: {
  id: string;
  title: string;
  intro: string[];
  blocks: { subtitle: string; paragraphs: string[] }[];
  infographic: {
    title: string;
    paragraphs: string[];
    bullets?: string[];
  };
  showImage?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div>
        <h2 className="mb-5 text-[28px] font-bold text-[#111827] md:text-[34px]">
          {title}
        </h2>

        <div className="space-y-4 text-[16px] leading-8 text-[#4f5668]">
          {intro.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>

        <MiniInfographic
          title={infographic.title}
          paragraphs={infographic.paragraphs}
          bullets={infographic.bullets}
        />

        {blocks.map((block) => (
          <ContentBlock
            key={block.subtitle}
            subtitle={block.subtitle}
            paragraphs={block.paragraphs}
          />
        ))}

        {showImage ? <SectionImage id={id} /> : null}
      </div>
    </section>
  );
}

export default function BlogColdEmailPage() {
  const [activeId, setActiveId] = useState('toc-main');
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('right');
  const [searchQuery, setSearchQuery] = useState('');
  const categoryScrollRef = useRef<HTMLDivElement | null>(null);

  const searchableSections = [
    {
      id: 'toc-main',
      title: 'Introduction',
      content:
        'Outreach.io is one of the most recognized sales engagement platforms in the market. It helps sales teams automate outreach, manage prospect interactions, and improve pipeline generation through multi-channel engagement.',
    },
    {
      id: 'why-consider-an-outreach-io-alternative',
      title: 'Why Consider an Outreach.io Alternative?',
      content:
        'Outreach.io is widely used by enterprise sales teams, but it is not always the perfect fit for every business.',
    },
    {
      id: 'quick-comparison-best-outreach-io-alternatives',
      title: 'Quick Comparison: Best Outreach.io Alternatives',
      content:
        '360Airo, Apollo.io, Salesloft, Reply.io, Smartlead, Instantly, Klenty, Groove, Mixmax, and Yesware.',
    },
    {
      id: 'what-is-outreach-io',
      title: 'What Is Outreach.io?',
      content:
        'Outreach.io is a sales engagement platform that helps sales teams manage prospect interactions across multiple channels.',
    },
    {
      id: 'how-we-selected-the-best-outreach-io-alternatives',
      title: 'How We Selected the Best Outreach.io Alternatives',
      content:
        'The platforms were evaluated based on sales engagement capabilities, AI functionality, deliverability, ease of use, integrations, scalability, reviews, and pricing transparency.',
    },
    {
      id: 'platform-1-360airo',
      title: '1. 360Airo',
      content:
        '360Airo is an AI-first sales engagement platform that combines prospecting, personalization, automation, and outbound execution in a single solution.',
    },
  ];

  const filteredSearchResults = searchableSections.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return false;

    return (
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    );
  });

  const handleSearchSelect = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      setSearchQuery('');
    }
  };

  const scrollCategories = () => {
    if (!categoryScrollRef.current) return;

    const amount = 260;
    const container = categoryScrollRef.current;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const currentScrollLeft = container.scrollLeft;

    if (scrollDirection === 'right') {
      container.scrollBy({
        left: amount,
        behavior: 'smooth',
      });

      if (currentScrollLeft + amount >= maxScrollLeft - 10) {
        setScrollDirection('left');
      }
    } else {
      container.scrollBy({
        left: -amount,
        behavior: 'smooth',
      });

      if (currentScrollLeft - amount <= 10) {
        setScrollDirection('right');
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = tocItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      const scrollPosition = window.scrollY + 180;
      let currentSectionId = sections[0]?.id || 'toc-main';

      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          currentSectionId = section.id;
        }
      }

      setActiveId(currentSectionId);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f4f2fb] pt-20 text-[#111827]">
        <style>
          {`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }

            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        <section className="border-b border-[#111827] bg-[#050010]">
          <div className="mx-auto max-w-[1400px] px-4">
            <div className="flex items-center justify-between gap-6 py-4">
              <div className="min-w-0 flex-1 overflow-hidden">
                <div
                  ref={categoryScrollRef}
                  className="scrollbar-hide flex min-w-0 items-center gap-8 overflow-x-auto whitespace-nowrap scroll-smooth"
                >
                  {blogCategories.map((item, index) => (
                    <a
                      key={item}
                      href="#"
                      className={`shrink-0 whitespace-nowrap text-[14px] font-medium transition-colors ${
                        index === 0
                          ? 'text-[#f9fafb]'
                          : 'text-[#9ca3af] hover:text-[#c7d2fe]'
                      }`}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div className="hidden shrink-0 items-center gap-4 lg:flex">
                <button
                  type="button"
                  onClick={scrollCategories}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#6b7cff] text-[#e5e7ff] transition-colors hover:bg-[#1f2937]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d={scrollDirection === 'right' ? 'M9 6L15 12L9 18' : 'M15 6L9 12L15 18'}
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className="relative min-w-[260px]">
                  <div className="flex h-11 items-center gap-3 rounded-xl border border-[#374151] bg-[#111827] px-4">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="shrink-0 text-[#9ca3af]"
                    >
                      <path
                        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Blog"
                      className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-[#9ca3af]"
                    />
                  </div>

                  {searchQuery.trim() && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-[#dbe3f4] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
                      {filteredSearchResults.length > 0 ? (
                        <div className="max-h-[320px] overflow-y-auto py-2">
                          {filteredSearchResults.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSearchSelect(item.id)}
                              className="w-full px-4 py-3 text-left transition-colors hover:bg-[#f8f9ff]"
                            >
                              <p className="text-[14px] font-semibold text-[#111827]">
                                {item.title}
                              </p>
                              <p className="mt-1 line-clamp-2 text-[12px] text-[#6b7280]">
                                {item.content}
                              </p>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="px-4 py-4 text-[13px] text-[#6b7280]">
                          No matching blog sections found.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)_250px]">
            <aside className="hidden lg:block">
              <div className="sticky top-24 mb-10">
                <h2 className="mb-4 text-[16px] font-bold text-[#20242c]">
                  Table of Contents
                </h2>
                <nav className="space-y-1.5 border-l border-[#d9dfef] pl-3">
                  {tocItems.map((item) => {
                    const isActive = activeId === item.id;

                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`relative block rounded-r-lg px-3 py-1.5 text-[13px] leading-5 transition-all duration-200 ${
                          isActive
                            ? 'bg-[#edf2ff] font-semibold text-[#2f66db]'
                            : 'text-[#4b5563] hover:bg-white/70 hover:text-[#2f66db]'
                        } ${item.indent ? 'ml-3' : ''}`}
                      >
                        <span
                          className={`absolute left-[-13px] top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full transition-all ${
                            isActive ? 'bg-[#4f63ff]' : 'bg-transparent'
                          }`}
                        />
                        <span className="flex items-start gap-1.5">
                          {item.arrow ? (
                            <span
                              className={`mt-[1px] text-sm ${
                                isActive ? 'text-[#2f66db]' : 'text-[#94a3b8]'
                              }`}
                            >
                              ›
                            </span>
                          ) : (
                            <span className="w-2" />
                          )}
                          <span>{item.label}</span>
                        </span>
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>

            <div className="min-w-0 space-y-14">
              <ArticleSection
                id="toc-main"
                title="Introduction"
                showImage={false}
                intro={[
                  'Outreach.io is one of the most recognized sales engagement platforms in the market. It helps sales teams automate outreach, manage prospect interactions, and improve pipeline generation through multi-channel engagement.',
                  'However, as sales technology continues to evolve, many businesses are exploring Outreach.io alternatives that offer better AI capabilities, simpler workflows, improved deliverability, or more affordable pricing.',
                  'While Outreach.io remains a powerful platform, it may not be the ideal solution for every organization. Some teams find it expensive, while others need more flexibility, stronger AI personalization, or a platform that better aligns with their sales processes.',
                  'The good news is that there are several excellent Outreach.io competitors available today. From AI-powered sales engagement platforms to specialized outbound sales solutions, businesses now have more options than ever before.',
                  'In this guide, we’ll compare the best Outreach.io alternatives, evaluate their features, pricing, strengths, and limitations, and help you determine which platform best fits your sales team’s needs.',
                ]}
                infographic={{
                  title: 'What this guide covers',
                  paragraphs: [
                    'This article explores why companies look for Outreach alternatives, what Outreach.io does, how alternatives were selected, and why 360Airo stands out as a strong option.',
                  ],
                }}
                blocks={[]}
              />
            </div>

            <RightPromoCards />
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </>
  );
}
