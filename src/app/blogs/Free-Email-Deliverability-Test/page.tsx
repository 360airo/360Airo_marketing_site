'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '../../../styles/blogs.css';

type TocItem = {
  id: string;
  label: string;
  arrow: boolean;
  indent?: boolean;
};

const blogCategories = [
  'Blog',
  'Email Deliverability',
  'Cold Email',
  'Email Marketing',
  'Lead Conversion',
  'Lead Generation',
  'CRM Integration',
  'Sales Automation',
];

const tocItems: TocItem[] = [
  { id: 'toc-main', label: 'Introduction', arrow: false },
  { id: 'what-is-an-email-deliverability-test', label: 'What Is an Email Deliverability Test?', arrow: true },
  { id: 'why-use-a-free-email-deliverability-test', label: 'Why Use a Free Email Deliverability Test?', arrow: true },
  { id: 'email-deliverability-test-tools', label: 'Email Deliverability Test Tools', arrow: true },
  { id: 'email-deliverability-tool-free-gmail', label: 'Email Deliverability Tool Free Gmail', arrow: true },
  { id: 'how-do-i-improve-my-email-deliverability', label: 'How Do I Improve My Email Deliverability?', arrow: true },
  { id: 'which-email-service-has-the-best-deliverability', label: 'Which Email Service Has the Best Deliverability?', arrow: true },
  { id: 'conclusion', label: 'Conclusion', arrow: true },
];

const faqs = [
  'What is an email deliverability test?',
  'Why should I use a free email deliverability test?',
  'Do Gmail accounts need deliverability testing?',
  'How can I improve my email deliverability?',
  'Which email service has the best deliverability?',
];

const sectionImages: Record<
  string,
  {
    src: string;
    alt: string;
    label: string;
  }
> = {
  'what-is-an-email-deliverability-test': {
    src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80',
    alt: 'Email deliverability testing overview',
    label: 'Overview',
  },
  'email-deliverability-test-tools': {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
    alt: 'Email deliverability analytics tools',
    label: 'Tools',
  },
  'email-deliverability-tool-free-gmail': {
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
    alt: 'Gmail deliverability testing',
    label: 'Gmail',
  },
};

function SectionImage({ id }: { id: string }) {
  const image = sectionImages[id];
  if (!image) return null;

  return (
    <div className="mt-8 rounded-[24px] overflow-hidden border border-[#dbe3f4] bg-white shadow-[0_12px_32px_rgba(79,99,255,0.08)]">
      <div className="relative h-[230px] md:h-[340px] w-full">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091b36]/50 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#4f63ff] backdrop-blur">
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
      <h3 className="text-[22px] md:text-[26px] font-bold text-[#111827] leading-tight mb-5">
        {title}
      </h3>

      <div className="space-y-4 text-[#4f5668] text-[16px] leading-8">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>

      {bullets && bullets.length > 0 ? (
        <ul className="mt-5 space-y-3 text-[#4f5668] text-[16px] leading-8 list-disc pl-5">
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
      <h3 className="text-[20px] md:text-[22px] font-bold text-[#111827] mb-3">
        {subtitle}
      </h3>
      <div className="space-y-4 text-[#4f5668] text-[16px] leading-8">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
}

function RightPromoCards() {
  return (
    <aside className="sticky top-[20vh] self-start hidden xl:block space-y-4 w-[250px]">
      <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="relative w-[200px] h-[130px] shrink-0">
            <Image
              src="/360aironewlog.png"
              alt="360Airo logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <h3 className="text-[18px] leading-[1.3] font-bold text-white text-center mt-[-30px] mb-4">
          Deliverability
          <br />
          Made Simple
        </h3>

        <p className="text-[13px] leading-6 text-white text-center mb-5">
          Test inbox placement, check spam risks, and protect sender reputation from one platform.
        </p>

        <button className="w-full rounded-[12px] border border-white bg-transparent px-4 py-3 text-white text-[15px] font-bold hover:opacity-95 transition">
          Try For FREE!
        </button>
      </div>

      <div className="rounded-[18px] border border-[#dbe3f4] bg-white p-4 shadow-[0_8px_24px_rgba(17,24,39,0.05)]">
        <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-2">
          Quick Tip
        </p>
        <h4 className="text-[15px] leading-6 font-bold text-[#111827] mb-2">
          Test before every send
        </h4>
        <p className="text-[12px] leading-5 text-[#5f6472]">
          Running a quick deliverability test before campaigns can prevent spam placement and lost replies.
        </p>
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
        <h2 className="text-[28px] md:text-[34px] font-bold text-[#111827] mb-5">
          {title}
        </h2>

        <div className="space-y-4 text-[#4f5668] text-[16px] leading-8">
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

function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const answers: string[] = [
    'An email deliverability test measures the likelihood of your emails reaching the inbox instead of spam or promotions folders.',
    'A free email deliverability test helps identify authentication issues, spam triggers, and reputation problems before campaigns go live.',
    'Yes. Gmail has strict filtering, so testing Gmail deliverability is important for cold outreach and bulk email performance.',
    'You can improve deliverability by setting up SPF, DKIM, and DMARC, cleaning your list, avoiding spam triggers, and testing every campaign.',
    'The best deliverability depends on setup and behavior, but Gmail often performs well for properly authenticated and engaged senders.',
  ];

  return (
    <div className="divide-y divide-[#dbe3f4] bg-[#f8f9ff] rounded-[16px]">
      {faqs.map((question, index) => {
        const isOpen = openIndex === index;
        return (
          <button
            key={question}
            type="button"
            onClick={() => setOpenIndex(isOpen ? null : index)}
            className="w-full text-left px-3 md:px-4 py-3 md:py-3.5 focus:outline-none"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#cbd5f5] text-[#4f63ff] text-sm font-semibold">
                {isOpen ? '-' : '+'}
              </div>
              <div className="flex-1">
                <p className="text-[15px] md:text-[16px] font-semibold text-[#111827]">
                  {question}
                </p>
                {isOpen && (
                  <p className="mt-2 text-[14px] md:text-[15px] leading-7 text-[#4f5668]">
                    {answers[index]}
                  </p>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
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
        'Email marketing success depends on inbox placement, sender reputation, and regular deliverability testing before campaigns.',
    },
    {
      id: 'what-is-an-email-deliverability-test',
      title: 'What Is an Email Deliverability Test?',
      content:
        'An email deliverability test measures whether your emails are likely to land in inbox, spam, or promotions folders.',
    },
    {
      id: 'why-use-a-free-email-deliverability-test',
      title: 'Why Use a Free Email Deliverability Test?',
      content:
        'Free deliverability testing helps identify spam triggers, authentication failures, and sender reputation issues before campaigns launch.',
    },
    {
      id: 'email-deliverability-test-tools',
      title: 'Email Deliverability Test Tools',
      content:
        'Good deliverability tools analyze authentication, reputation, spam risk, and provider interpretation of your email.',
    },
    {
      id: 'email-deliverability-tool-free-gmail',
      title: 'Email Deliverability Tool Free Gmail',
      content:
        'Gmail testing helps determine whether messages land in inbox, promotions, or spam and reveals Gmail-specific filtering risks.',
    },
    {
      id: 'how-do-i-improve-my-email-deliverability',
      title: 'How Do I Improve My Email Deliverability?',
      content:
        'Improve deliverability with authentication, list hygiene, spam checks, gradual volume growth, and regular testing.',
    },
    {
      id: 'which-email-service-has-the-best-deliverability',
      title: 'Which Email Service Has the Best Deliverability?',
      content:
        'Deliverability depends on sending behavior, but Gmail often performs best for properly authenticated and engaged senders.',
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content:
        'Using a free email deliverability test is now a core requirement for successful cold email and marketing campaigns.',
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
    <div className="blog-shell">
      <Navbar activeTab="resources" />

      <main className="min-h-screen bg-[#f4f2fb] text-[#111827] pt-20">
        <style jsx global>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>



        <section className="pt-8 md:pt-10 pb-14 px-4 border-b border-[#ddd9ef]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-[#6b7280] mb-8">
              <span className="font-medium text-[#111827]">Blog</span>
              <span>›</span>
              <span className="font-medium text-[#111827]">Email Deliverability</span>
              <span>›</span>
              <span>Free Email Deliverability Test for Cold Email & Marketing</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative min-h-[300px] md:min-h-[410px] rounded-[28px] overflow-hidden bg-gradient-to-br from-[#0a3f7a] via-[#0b5ca8] to-[#36a7e8] shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
                    alt="Email deliverability hero"
                    fill
                    priority
                    className="object-cover mix-blend-overlay opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#072f63]/95 via-[#0b4f96]/70 to-transparent" />
                  <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
                    <p className="text-white text-[30px] md:text-[44px] font-bold leading-tight max-w-[420px]">
                      Free Email
                      <br />
                      Deliverability Test
                      <br />
                      for Cold Email
                    </p>

                    <div className="absolute bottom-0 right-0 w-[48%] h-[92%] hidden md:block">
                      <Image
                        src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80"
                        alt="Email marketing professional"
                        fill
                        className="object-contain object-bottom"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="max-w-2xl"
              >
                <p className="text-[#0ea5b7] font-semibold uppercase tracking-wide text-[11px] md:text-[12px] mb-3">
                  Email Deliverability Guide
                </p>
                <h1 className="text-[#111827] text-[24px] md:text-[36px] lg:text-[40px] font-bold leading-[1.08] tracking-[-0.02em] mb-5">
                  Free Email Deliverability Test for Cold Email & Marketing
                </h1>

                <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-8 leading-relaxed">
                  Learn why inbox placement testing matters, how to improve sender reputation, and how to use free deliverability checks before cold email or marketing campaigns.
                </p>

                <div className="mb-8 inline-flex flex-wrap items-center gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-4 py-3 text-white text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logonew.png"
                      alt="360Airo Team"
                      width={140}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <span>•360AIRO Team </span>
                  <span>Updated: Jun 2026</span>
                  <span>•</span>
                  <span>10 min read</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-7 py-3.5 rounded-xl bg-[#4f63ff] text-white font-semibold text-base shadow-md hover:bg-[#4154f5] transition-all">
                    Start Reading
                  </button>
                  <button className="px-7 py-3.5 rounded-xl border border-[#6b8cff] text-[#4f63ff] bg-transparent font-semibold text-base hover:bg-white/60 transition-all">
                    Test Deliverability
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="max-w-[1440px] mx-auto grid xl:grid-cols-[250px_minmax(0,1fr)_250px] lg:grid-cols-[250px_minmax(0,1fr)] gap-8">
            <aside className="sticky top-[20vh] self-start hidden lg:block mb-10">
              <h2 className="text-[16px] font-bold text-[#20242c] mb-4">
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
                          ? 'bg-[#edf2ff] text-[#2f66db] font-semibold'
                          : 'text-[#4b5563] hover:text-[#2f66db] hover:bg-white/70'
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
            </aside>

            <div className="min-w-0 space-y-14">
              <ArticleSection
                id="toc-main"
                title="Introduction"
                showImage={false}
                intro={[
                  'Email marketing success depends on one critical factor that many marketers ignore: inbox placement.',
                  'Sending an email does not guarantee it will reach the inbox.',
                  'This is why using a free email deliverability test is essential for businesses running cold email outreach or bulk marketing campaigns.',
                  'With stricter spam filters and constantly changing email provider algorithms, testing deliverability has become a necessity rather than an option.',
                  'A reliable email deliverability test free online helps marketers understand where their emails land: inbox, promotions, or spam.',
                  'This insight allows businesses to correct issues before launching campaigns.',
                  'A cold email deliverability test is especially important because cold outreach faces higher scrutiny from email service providers.',
                  'Using the best free email deliverability test also protects sender reputation.',
                  'Poor deliverability affects open rates, response rates, and domain trust.',
                  'Over time, repeated spam placement can permanently damage your sending domain.',
                  'Tools like 360airo offer a free email deliverability test that evaluates technical settings, content quality, and spam risks.',
                  'In 2026, successful email marketing is data driven.',
                  'Marketers who test email deliverability before sending campaigns consistently achieve better engagement and higher ROI.',
                  'Ignoring deliverability testing often results in wasted effort and lost revenue.',
                ]}
                infographic={{
                  title: 'Why deliverability testing matters',
                  paragraphs: [
                    'Inbox placement has a direct impact on engagement, sender reputation, and long-term campaign performance.',
                  ],
                  bullets: [
                    'Check inbox, promotions, and spam placement',
                    'Protect sender and domain reputation',
                    'Catch authentication issues early',
                    'Identify content-based spam risks',
                    'Improve campaign ROI before launch',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                id="what-is-an-email-deliverability-test"
                title="What Is an Email Deliverability Test?"
                showImage={true}
                intro={[
                  'To understand email performance, it is important to know what is an email deliverability test.',
                  'An email deliverability test measures the likelihood of your emails reaching the recipient inbox instead of spam or promotions folders.',
                  'It evaluates technical, reputational, and content based factors that influence email filtering.',
                ]}
                infographic={{
                  title: 'What a deliverability test checks',
                  paragraphs: [
                    'A complete deliverability test reviews authentication, content quality, spam risks, and sender trust signals.',
                  ],
                  bullets: [
                    'SPF, DKIM, and DMARC records',
                    'Spam trigger words and formatting',
                    'Link and content quality',
                    'Bounce and complaint history',
                    'Sender reputation and trust',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Authentication and trust signals',
                    paragraphs: [
                      'A test email deliverability free tool checks domain authentication such as SPF, DKIM, and DMARC.',
                      'These are critical trust signals for email providers like Gmail and Outlook.',
                      'Missing or misconfigured authentication often leads to spam placement even if the content is clean.',
                    ],
                  },
                  {
                    subtitle: 'Spam content analysis',
                    paragraphs: [
                      'A free email spam checker scans subject lines and email content for spam triggers.',
                      'Using a spam email checker free helps identify excessive links, aggressive language, or formatting issues that reduce deliverability.',
                      'Many marketers overlook content signals, focusing only on copy quality rather than spam compliance.',
                    ],
                  },
                  {
                    subtitle: 'Sender reputation review',
                    paragraphs: [
                      'An email deliverability tester also evaluates sender reputation.',
                      'This includes bounce rates, complaint history, and sending behavior.',
                      'New domains or Gmail accounts should regularly run an email deliverability test Gmail to ensure messages are trusted.',
                    ],
                  },
                  {
                    subtitle: 'Simple takeaway',
                    paragraphs: [
                      'In simple terms, an email deliverability test is a preventive tool.',
                      'It helps marketers fix problems before sending campaigns and protects long term email performance.',
                    ],
                  },
                ]}
              />

              <ArticleSection
                id="why-use-a-free-email-deliverability-test"
                title="Why Use a Free Email Deliverability Test?"
                showImage={false}
                intro={[
                  'Using a free email deliverability test gives businesses a clear advantage.',
                  'Many marketers assume their emails are reaching inboxes simply because they are sent successfully.',
                  'In reality, inbox placement depends on multiple behind the scenes factors.',
                ]}
                infographic={{
                  title: 'Main benefits',
                  paragraphs: [
                    'Testing reveals hidden issues that can quietly reduce inbox placement and hurt campaign results.',
                  ],
                  bullets: [
                    'Spot domain reputation problems',
                    'Catch authentication failures',
                    'Find spammy copy or formatting',
                    'Protect cold outreach performance',
                    'Reduce tool complexity with one workflow',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Find invisible problems',
                    paragraphs: [
                      'A best email deliverability tool free helps identify problems such as poor domain reputation, spammy content, or authentication failures.',
                      'These issues often remain invisible without testing.',
                      'A spam checker free email deliverability test ensures your email copy complies with modern spam filters.',
                    ],
                  },
                  {
                    subtitle: 'Why cold outreach needs testing',
                    paragraphs: [
                      'Cold outreach teams benefit the most from a cold email deliverability test.',
                      'Cold emails are monitored closely by email providers.',
                      'Testing ensures your messages are not flagged as unsolicited or promotional.',
                      'Running an email deliverability test free Gmail is especially important for Gmail based outreach accounts.',
                    ],
                  },
                  {
                    subtitle: 'Using 360airo',
                    paragraphs: [
                      'With 360airo, marketers can run a free email tester, a quick precise deliverability test, and a spam checker in one place.',
                      'This simplifies testing and reduces dependency on multiple tools.',
                    ],
                  },
                  {
                    subtitle: 'Result',
                    paragraphs: [
                      'Ultimately, testing improves inbox placement, protects sender reputation, and increases engagement.',
                      'It is one of the most cost effective ways to improve email marketing results.',
                    ],
                  },
                ]}
              />

              <ArticleSection
                id="email-deliverability-test-tools"
                title="Email Deliverability Test Tools"
                showImage={true}
                intro={[
                  'There are many email deliverability test tools available today.',
                  'However, not all tools provide actionable insights.',
                  'A good email deliverability test free online tool should analyze both technical setup and email content.',
                ]}
                infographic={{
                  title: 'What good tools should include',
                  paragraphs: [
                    'The best tools combine technical validation, sender analysis, and inbox placement insight in one workflow.',
                  ],
                  bullets: [
                    'Authentication checks',
                    'IP and domain reputation review',
                    'Spam and content analysis',
                    'Inbox placement feedback',
                    'Provider interpretation insights',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Technical and content analysis',
                    paragraphs: [
                      'An effective email deliverability tester checks authentication records, sending IP reputation, and spam filters.',
                      'It also provides feedback on how email providers interpret your messages.',
                      'Some tools also offer inbox placement simulations.',
                    ],
                  },
                  {
                    subtitle: 'Why free tools matter',
                    paragraphs: [
                      'Using the best free email deliverability test allows marketers to test without financial commitment.',
                      'This is ideal for startups and small businesses testing new campaigns.',
                      'A test email address deliverability free feature helps verify sender trustworthiness.',
                    ],
                  },
                  {
                    subtitle: '360airo testing coverage',
                    paragraphs: [
                      '360airo offers an email deliverability test free Gmail and domain based testing.',
                      'This helps businesses understand how Gmail and other providers classify their emails.',
                      'By combining spam analysis and authentication checks, marketers get a complete deliverability overview.',
                    ],
                  },
                  {
                    subtitle: 'Choosing the right tool',
                    paragraphs: [
                      'Choosing the right email deliverability test tools ensures accurate insights and long term campaign success.',
                    ],
                  },
                ]}
              />

              <ArticleSection
                id="email-deliverability-tool-free-gmail"
                title="Email Deliverability Tool Free Gmail"
                showImage={true}
                intro={[
                  'Gmail is one of the strictest email providers.',
                  'Running an email deliverability tool free Gmail test is essential for marketers sending bulk or cold emails.',
                  'Gmail evaluates sender reputation, authentication, and engagement signals aggressively.',
                ]}
                infographic={{
                  title: 'Why Gmail testing is critical',
                  paragraphs: [
                    'Gmail has tight filtering logic, so even small setup or content issues can affect inbox placement.',
                  ],
                  bullets: [
                    'Checks inbox vs promotions vs spam',
                    'Reviews SPF, DKIM, and DMARC alignment',
                    'Scans promotional and spam patterns',
                    'Supports safer cold outreach decisions',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Inbox placement visibility',
                    paragraphs: [
                      'An email deliverability test Gmail helps identify whether emails land in inbox, promotions, or spam.',
                      'Many marketers unknowingly trigger promotions tab placement due to formatting and link usage.',
                    ],
                  },
                  {
                    subtitle: 'What Gmail-focused tests check',
                    paragraphs: [
                      'A free email deliverability test for Gmail checks SPF, DKIM, and DMARC alignment.',
                      'It also scans for content patterns that Gmail flags as promotional or spam.',
                      'This allows marketers to optimize email copy and structure.',
                    ],
                  },
                  {
                    subtitle: '360airo for Gmail',
                    paragraphs: [
                      'Using 360airo, businesses can test Gmail deliverability without paid subscriptions.',
                      'This makes it easier to adjust campaigns before scaling.',
                    ],
                  },
                  {
                    subtitle: 'Long-term advantage',
                    paragraphs: [
                      'Consistent Gmail testing improves open rates, reply rates, and sender trust over time.',
                    ],
                  },
                ]}
              />

              <ArticleSection
                id="how-do-i-improve-my-email-deliverability"
                title="How Do I Improve My Email Deliverability?"
                showImage={false}
                intro={[
                  'Improving email performance starts with understanding how do I improve my email deliverability.',
                  'The first step is running a free email deliverability test to identify existing issues.',
                ]}
                infographic={{
                  title: 'Deliverability improvement checklist',
                  paragraphs: [
                    'Better deliverability comes from a mix of strong technical setup, cleaner lists, safer copy, and consistent sending behavior.',
                  ],
                  bullets: [
                    'Set up SPF, DKIM, and DMARC',
                    'Clean email lists regularly',
                    'Reduce spam trigger words',
                    'Limit excessive links',
                    'Increase volume gradually',
                    'Test every campaign',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Technical setup and list hygiene',
                    paragraphs: [
                      'Authenticate your domain properly using SPF, DKIM, and DMARC.',
                      'Clean your email marketing lists regularly to reduce bounces.',
                    ],
                  },
                  {
                    subtitle: 'Content and sending behavior',
                    paragraphs: [
                      'Avoid spam trigger words and excessive links.',
                      'Use a free email spam checker before every campaign.',
                      'Sending consistency also matters.',
                      'Gradually increase sending volume and avoid sudden spikes.',
                      'Always test campaigns using an email deliverability test free online tool.',
                    ],
                  },
                  {
                    subtitle: 'Using one platform',
                    paragraphs: [
                      'Platforms like 360airo simplify deliverability improvement by combining testing, list hygiene, and spam checks in one system.',
                    ],
                  },
                ]}
              />

              <ArticleSection
                id="which-email-service-has-the-best-deliverability"
                title="Which Email Service Has the Best Deliverability?"
                showImage={false}
                intro={[
                  'Many marketers ask which email service has the best deliverability.',
                  'The answer depends on use case and sending behavior.',
                  'Gmail, Outlook, and Yahoo all have strong infrastructure but strict filtering.',
                ]}
                infographic={{
                  title: 'Short answer',
                  paragraphs: [
                    'The service matters, but setup quality, authentication, list health, and engagement matter more over time.',
                  ],
                  bullets: [
                    'Gmail often performs well for trusted senders',
                    'Authentication is non-negotiable',
                    'Spam signals reduce placement fast',
                    'Ongoing monitoring protects reputation',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Why Gmail is often preferred',
                    paragraphs: [
                      'Gmail often provides the best inbox placement for well authenticated and engaged senders.',
                      'However, Gmail also has the least tolerance for spam signals.',
                      'This is why running an email deliverability test Gmail is critical.',
                    ],
                  },
                  {
                    subtitle: 'Practical recommendation',
                    paragraphs: [
                      'Professional email services combined with tools like 360airo help maintain high deliverability by monitoring reputation and compliance.',
                    ],
                  },
                ]}
              />

              <section id="conclusion" className="scroll-mt-28">
                <h2 className="text-[28px] md:text-[34px] font-bold text-[#111827] mb-5">
                  Conclusion
                </h2>

                <div className="space-y-4 text-[#4f5668] text-[16px] leading-8">
                  <p>
                    Using a free email deliverability test is no longer optional.
                  </p>
                  <p>
                    It is a core requirement for successful cold email and marketing campaigns.
                  </p>
                  <p>
                    With 360airo, businesses can test, optimize, and protect email performance without added cost.
                  </p>
                </div>
              </section>
            </div>

            <RightPromoCards />
          </div>
        </section>

        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px] md:text-[28px] font-bold text-[#111827]">
                Recent blog posts
              </h2>
              <a
                href="/blogs"
                className="text-[14px] font-medium text-[#4f63ff] hover:underline"
              >
                View all
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'How to Choose a Free Lead Conversion Platform That Actually Works',
                  tag: 'Lead Conversion',
                  href: '/blogs/how-to-choose-a-free-lead-conversion-platform-that-actually-works',
                  description: 'Learn how to evaluate free lead conversion tools and pick a platform that actually helps convert leads.',
                  image:
                    'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
                },
                {
                  title: 'Why Gmail Deliverability Matters for Cold Outreach',
                  tag: 'Cold Email',
                  href: '/blogs/why-gmail-deliverability-matters-for-cold-outreach',
                  description: 'Understand how Gmail classifies outreach emails and what affects inbox placement.',
                  image:
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
                },
                {
                  title: 'Email Spam Checker Best Practices for Marketers',
                  tag: 'Email Marketing',
                  href: '/blogs/email-spam-checker-best-practices-for-marketers',
                  description: 'See what spam checkers catch before your campaign goes live and how to fix common issues.',
                  image:
                    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
                },
              ].map((post) => (
                <a
                  key={post.href}
                  href={post.href}
                  className="group overflow-hidden rounded-[20px] border border-[#dbe3f4] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-shadow"
                >
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-2">
                      {post.tag}
                    </p>
                    <h3 className="text-[18px] font-bold text-[#111827] leading-snug mb-3 group-hover:text-[#4f63ff] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[13px] text-[#6b7280]">
                      {post.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
