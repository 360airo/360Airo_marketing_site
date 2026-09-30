'use client';

import Image from 'next/image';
import Link from 'next/link';
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

const tocItems: TocItem[] = [
  { id: 'introduction', label: 'Introduction', arrow: false },
  { id: 'what-is-email-delivery', label: '1. What Is Email Delivery?', arrow: true },
  { id: 'what-is-email-deliverability', label: '2. What Is Email Deliverability?', arrow: true },
  { id: 'key-differences', label: '3. Email Delivery vs Email Deliverability: Key Differences', arrow: true },
  { id: 'why-deliverability-matters', label: '4. Why Email Deliverability Matters More Than Delivery', arrow: true },
  { id: 'what-affects-deliverability', label: '5. What Affects Email Deliverability?', arrow: true },
  { id: 'best-practices', label: '6. Best Practices to Improve Email Deliverability', arrow: true },
  { id: 'faqs', label: '7. Frequently Asked Questions', arrow: true },
  { id: 'conclusion', label: '8. Conclusion', arrow: true },
];

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
    <div className="rounded-[20px] border border-[#dbe3f4] bg-[#f8f9ff] p-4 md:p-7">
      <h3 className="text-[17px] md:text-[22px] font-bold text-[#111827] leading-tight mb-3 md:mb-4">
        {title}
      </h3>
      <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      {bullets && bullets.length > 0 ? (
        <ul className="mt-3 md:mt-4 space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 list-disc pl-5 text-justify">
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
    <div>
      <h3 className="text-[16px] md:text-[19px] font-bold text-[#111827] mb-2 md:mb-4">
        {subtitle}
      </h3>
      <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
}

function SectionImage({ id }: { id: string }) {
  const image = {
    src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80&fm=webp',
    alt: 'Email delivery and deliverability comparison',
    label: 'Deliverability',
  };
  if (!image) return null;

  return (
    <div className="rounded-[24px] overflow-hidden border border-[#dbe3f4] bg-white shadow-[0_12px_32px_rgba(79,99,255,0.08)]">
      <div className="relative w-full aspect-[16/9] md:aspect-[16/7] h-auto md:h-[340px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority={false}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091b36]/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 md:top-4 md:left-4 rounded-full bg-white/90 px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-semibold text-[#4f63ff] backdrop-blur">
          {image.label}
        </div>
      </div>
    </div>
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
  infographic?: {
    title: string;
    paragraphs: string[];
    bullets?: string[];
  };
  showImage?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
        {title}
      </h2>
      <div className="space-y-4">
        {intro.length > 0 && (
          <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
            {intro.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        )}
        {infographic && <MiniInfographic {...infographic} />}
        {blocks.map((block) => (
          <ContentBlock key={block.subtitle} {...block} />
        ))}
        {showImage && <SectionImage id={id} />}
      </div>
    </section>
  );
}

// --- FAQ Accordion Component ---
function FaqAccordion({ faqs }: { faqs: { subtitle: string; paragraphs: string[] }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border border-[#dbe3f4] rounded-[16px] bg-white overflow-hidden shadow-[0_4px_12px_rgba(17,24,39,0.04)]">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-4 py-3 md:px-6 md:py-4 text-left text-[15px] md:text-[17px] font-semibold text-[#111827] hover:bg-[#f8f9ff] transition-colors duration-200"
            >
              <span>{faq.subtitle}</span>
              <span className="text-[#4f63ff] text-xl md:text-2xl leading-none ml-4 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              className={`px-4 md:px-6 transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[1000px] pb-3 md:pb-4 opacity-100' : 'max-h-0 pb-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                {faq.paragraphs.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RightPromoCards() {
  return (
    <aside className="sticky top-20 self-start hidden xl:block space-y-4 w-[250px]">
      <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
        {/* Removed the broken Image wrapper here */}
        <h3 className="text-[15px] md:text-[16px] leading-[1.3] font-bold text-white text-center mb-3 md:mb-4">
          Deliverability Made Simple
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Monitor inbox placement, authenticate domains, and improve sender reputation with AI‑powered tools.
        </p>
        <button className="w-full rounded-[12px] border border-white bg-transparent px-3 py-2.5 md:px-4 md:py-3 text-white text-[12px] md:text-[13px] font-bold hover:opacity-95 transition">
          Try For FREE!
        </button>
      </div>
      <div className="rounded-[18px] border border-[#dbe3f4] bg-white p-3 md:p-4 shadow-[0_8px_24px_rgba(17,24,39,0.05)]">
        <p className="text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-1 md:mb-2">
          Quick Tip
        </p>
        <h4 className="text-[12px] md:text-[13px] leading-5 font-bold text-[#111827] mb-1 md:mb-2">
          Don't confuse delivery with deliverability
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          A 98% delivery rate means nothing if your emails are landing in spam. Focus on inbox placement.
        </p>
      </div>
    </aside>
  );
}

export default function BlogEmailDeliveryVsDeliverabilityPage() {
  const [activeId, setActiveId] = useState('introduction');
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      rafId.current = requestAnimationFrame(() => {
        const offset = 180;
        let currentSectionId = 'introduction';

        for (const item of tocItems) {
          const el = document.getElementById(item.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            currentSectionId = item.id;
          }
        }

        setActiveId((prev) => (prev === currentSectionId ? prev : currentSectionId));
        ticking.current = false;
      });
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
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

          @font-face {
            font-family: 'Barlow Condensed';
            font-display: swap;
          }
          @font-face {
            font-family: 'DM Sans';
            font-display: swap;
          }
          @font-face {
            font-family: 'Outfit';
            font-display: swap;
          }
        `}</style>

        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp"
          type="image/webp"
        />

        {/* Hero Section */}
        <section className="pt-6 md:pt-10 pb-6 md:pb-8 px-3 md:px-4 border-b border-[#ddd9ef]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-1 md:gap-2 text-[10px] md:text-sm text-[#6b7280] mb-2 md:mb-4">
              <Link href="/blogs" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                Blog
              </Link>
              <span>›</span>
              <Link href="/blogs?category=deliverability" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                Deliverability
              </Link>
              <span>›</span>
              <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                <span className="hidden sm:inline">Email Delivery vs Email Deliverability: What's the Difference?</span>
                <span className="sm:hidden">Delivery vs Deliverability</span>
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-auto lg:min-h-[410px] rounded-[20px] md:rounded-[28px] overflow-hidden shadow-xl">
                  <Image
                    src="/email-delivery-vs-deliverability.png"
                    alt="Email delivery vs deliverability hero"
                    fill
                    priority
                    fetchPriority="high"
                    decoding="sync"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="max-w-2xl"
              >
                <p className="text-[#0ea5b7] font-semibold uppercase tracking-wide text-[10px] md:text-[12px] mb-2 md:mb-3">
                  Deliverability Guide
                </p>
                <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                  Email Delivery vs Email Deliverability: What's the Difference?
                </h1>
                <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                  You send 1,000 emails. Your dashboard says 980 were delivered. Sounds like success—until you realize only a handful of prospects replied. The answer lies in understanding delivery vs deliverability.
                </p>

                <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                  <span>• 360AIRO Team</span>
                  <span>• Updated: Aug 2026</span>
                  <span>• 9 min read</span>
                  <span>• 1.8K reads</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button className="px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl bg-[#4f63ff] text-white font-semibold text-sm md:text-base shadow-md hover:bg-[#4154f5] transition-all">
                    Start Reading
                  </button>
                  <button className="px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl border border-[#6b8cff] text-[#4f63ff] bg-transparent font-semibold text-sm md:text-base hover:bg-white/60 transition-all">
                    Schedule a Demo
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-3 md:px-4 py-4 md:py-8">
          <div className="max-w-[1440px] mx-auto grid xl:grid-cols-[250px_minmax(0,1fr)_250px] lg:grid-cols-[250px_minmax(0,1fr)] gap-6 md:gap-8">
            {/* TOC */}
            <aside className="sticky top-20 self-start hidden lg:block mb-6 md:mb-10">
              <h2 className="text-[16px] font-bold text-[#20242c] mb-4">Table of Contents</h2>
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
                      <span className={`absolute left-[-13px] top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full transition-all ${isActive ? 'bg-[#4f63ff]' : 'bg-transparent'}`} />
                      <span className="flex items-start gap-1.5">
                        {item.arrow ? (
                          <span className={`mt-[1px] text-sm ${isActive ? 'text-[#2f66db]' : 'text-[#94a3b8]'}`}>›</span>
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

            {/* Articles */}
            <div className="min-w-0 space-y-4">
              <ArticleSection
                key="introduction"
                id="introduction"
                title="Introduction"
                showImage={false}
                intro={[
                  "You send 1,000 emails.",
                  "Your dashboard says 980 were delivered.",
                  "Sounds like a successful campaign—until you realize only a handful of prospects replied.",
                  "The answer often lies in confusing email delivery with email deliverability. While these terms are frequently used interchangeably, they measure two very different aspects of email performance. An email can be successfully delivered to a recipient's mail server and still never appear in their inbox.",
                  "For businesses relying on cold email, newsletters, or outbound campaigns, understanding this distinction is essential. Focusing only on delivery rates can create a false sense of success, while ignoring deliverability can result in lost opportunities, lower engagement, and declining sender reputation.",
                  "In this guide, we'll explain the difference between email delivery vs email deliverability, why both metrics matter, and how to improve your chances of reaching the inbox instead of the spam folder.",
                ]}
                infographic={{
                  title: 'The core distinction',
                  paragraphs: ['Delivery gets your email to the building. Deliverability gets it through the front door.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="what-is-email-delivery"
                id="what-is-email-delivery"
                title="1. What Is Email Delivery?"
                showImage={false}
                intro={[
                  "Email delivery measures whether an email successfully reaches the recipient's mail server without bouncing.",
                  "If the receiving server accepts your email, it is considered delivered—even if the email eventually lands in the spam folder, promotions tab, or another filtered location.",
                  "For example, imagine sending 1,000 emails. If 980 emails are accepted by recipient mail servers while 20 bounce because of invalid addresses, your email delivery rate is 98%.",
                  "Delivery answers a simple technical question:",
                  '"Was the email accepted by the recipient\'s server?"',
                  "It doesn't answer whether the recipient actually saw the email.",
                ]}
                infographic={{
                  title: 'Email delivery explained',
                  paragraphs: ['Delivery = accepted by the mail server. No guarantee of inbox placement.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="what-is-email-deliverability"
                id="what-is-email-deliverability"
                title="2. What Is Email Deliverability?"
                showImage={false}
                intro={[
                  "Email deliverability measures your ability to place emails in the recipient's primary inbox rather than spam, junk, or promotional folders.",
                  "Deliverability considers much more than whether an email was accepted. Internet Service Providers (ISPs) evaluate multiple factors before deciding where your email belongs.",
                  "These include your sender reputation, domain authentication, email content, recipient engagement, complaint rates, and sending behavior.",
                  "An email with excellent deliverability reaches the inbox consistently, increasing the likelihood that recipients will open, read, and respond to your message.",
                  "In other words, deliverability answers a much more important question:",
                  '"Did the recipient have a realistic chance of seeing the email?"',
                ]}
                infographic={{
                  title: 'Email deliverability defined',
                  paragraphs: ['Deliverability = inbox placement. It focuses on visibility and engagement.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="key-differences"
                id="key-differences"
                title="3. Email Delivery vs Email Deliverability: Key Differences"
                showImage={true}
                intro={[
                  "Although the terms sound similar, they measure different stages of the email journey.",
                ]}
                infographic={{
                  title: 'Comparison at a glance',
                  paragraphs: [
                    'Email Delivery: Measures whether the email reached the recipient\'s server. Focuses on transmission. Influenced by valid addresses and server acceptance. High delivery doesn\'t guarantee visibility. Measured by delivery rate.',
                    'Email Deliverability: Measures whether the email reached the inbox. Focuses on placement. Influenced by sender reputation, authentication, engagement, and spam filters. High deliverability increases opens and replies. Measured by inbox placement rate.',
                  ],
                  bullets: [
                    'Delivery gets your email to the building.',
                    'Deliverability gets it through the front door.',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="why-deliverability-matters"
                id="why-deliverability-matters"
                title="4. Why Email Deliverability Matters More Than Delivery"
                showImage={false}
                intro={[
                  "Many marketers celebrate a delivery rate above 98%.",
                  "Unfortunately, delivery alone doesn't generate results.",
                  "If most of your emails are quietly filtered into spam folders, your campaigns will struggle regardless of how impressive the delivery rate appears.",
                  "Poor deliverability reduces open rates, lowers reply rates, weakens sender reputation, and makes future campaigns even more difficult. Over time, Internet Service Providers begin to associate your domain with low-quality email practices, creating a cycle that's increasingly difficult to reverse.",
                  "That's why successful outbound teams monitor inbox placement alongside traditional delivery metrics.",
                  "A campaign should be judged not only by whether emails were accepted but by whether prospects actually had an opportunity to engage with them.",
                ]}
                infographic={{
                  title: 'Why deliverability wins',
                  paragraphs: ['Delivery is technical; deliverability is strategic. High deliverability drives real business outcomes.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="what-affects-deliverability"
                id="what-affects-deliverability"
                title="5. What Affects Email Deliverability?"
                showImage={false}
                intro={[
                  "Several factors influence whether an email reaches the inbox.",
                  "Sender reputation is one of the most important. Internet Service Providers build a reputation score based on your sending history, complaint rates, bounce rates, and recipient engagement. A strong reputation improves inbox placement, while a poor reputation increases the likelihood of spam filtering.",
                  "Email authentication also plays a critical role. Configuring SPF, DKIM, and DMARC records verifies your identity and helps receiving servers trust your emails.",
                  "The quality of your email list matters just as much. Sending messages to invalid, outdated, or purchased email addresses increases bounce rates and damages sender reputation.",
                  "Content quality is another consideration. Excessive promotional language, misleading subject lines, or poorly formatted emails can trigger spam filters, particularly when combined with low engagement.",
                  "Finally, recipient behavior sends powerful signals. Emails that receive replies, opens, and positive engagement strengthen deliverability over time, while deletes, complaints, and ignored messages have the opposite effect.",
                ]}
                infographic={{
                  title: 'Key factors',
                  paragraphs: ['Sender reputation, authentication, list quality, content, and recipient engagement all play a role.'],
                  bullets: [
                    'Sender reputation',
                    'SPF, DKIM, DMARC authentication',
                    'Email list quality',
                    'Content and formatting',
                    'Recipient engagement',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="best-practices"
                id="best-practices"
                title="6. Best Practices to Improve Email Deliverability"
                showImage={false}
                intro={[
                  "Improving deliverability requires a combination of technical setup and consistent sending practices.",
                ]}
                infographic={{
                  title: 'Action plan',
                  paragraphs: ['Authenticate, warm up, clean lists, personalize, and monitor continuously.'],
                  bullets: [
                    'Authenticate your domain (SPF, DKIM, DMARC)',
                    'Warm up new domains gradually',
                    'Maintain a clean email list',
                    'Write relevant, personalized emails',
                    'Monitor inbox placement and other key metrics',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Long‑term commitment',
                    paragraphs: ['Deliverability isn\'t a one‑time fix. It requires ongoing attention to sender reputation, list hygiene, and engagement.'],
                  },
                ]}
              />

              {/* FAQ Section */}
              <section id="faqs" className="scroll-mt-28">
                <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                  7. Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <MiniInfographic
                    title="Quick answers"
                    paragraphs={['Common questions about delivery and deliverability.']}
                  />
                  <FaqAccordion
                    faqs={[
                      {
                        subtitle: '7.1 Is email delivery the same as email deliverability?',
                        paragraphs: ['No. Email delivery measures whether an email reaches the recipient\'s mail server, while email deliverability measures whether it reaches the inbox.'],
                      },
                      {
                        subtitle: '7.2 What is a good email delivery rate?',
                        paragraphs: ['Most businesses aim for a delivery rate above 95%, although a high delivery rate doesn\'t necessarily indicate strong inbox placement.'],
                      },
                      {
                        subtitle: '7.3 How can I improve email deliverability?',
                        paragraphs: ['Authenticate your domain, warm up new email accounts, maintain a clean contact list, personalize your emails, and monitor sender reputation regularly.'],
                      },
                      {
                        subtitle: '7.4 Why are my emails delivered but not opened?',
                        paragraphs: ['A high delivery rate doesn\'t guarantee inbox placement. Your emails may be landing in spam or promotional folders, or your subject lines and messaging may not be encouraging engagement.'],
                      },
                    ]}
                  />
                </div>
              </section>

              <ArticleSection
                key="conclusion"
                id="conclusion"
                title="8. Conclusion"
                showImage={false}
                intro={[
                  "Understanding email delivery vs email deliverability is essential for running successful email campaigns.",
                  "Delivery tells you whether your email reached the recipient's server. Deliverability tells you whether it reached the place that matters most—the inbox.",
                  "While maintaining a high delivery rate is important, businesses that focus on inbox placement, sender reputation, authentication, and recipient engagement consistently achieve better open rates, higher reply rates, and stronger campaign performance.",
                  "Ultimately, successful email marketing isn't measured by how many emails were sent or delivered. It's measured by how many meaningful conversations those emails create.",
                ]}
                infographic={{
                  title: '360Airo',
                  paragraphs: [
                    'Getting emails delivered isn\'t enough—you need them to reach the inbox. 360Airo helps businesses improve email deliverability through AI‑powered email warm‑up, domain reputation management, inbox monitoring, campaign optimization, and personalized outreach.',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Final thought',
                    paragraphs: ['By combining technical best practices with intelligent automation, 360Airo helps your emails avoid spam filters and reach the prospects who matter most. Book a demo today.'],
                  },
                ]}
              />
            </div>

            <RightPromoCards />
          </div>
        </section>

        {/* Recent Posts */}
        <section className="px-3 md:px-4 pb-4 md:pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-[18px] md:text-[24px] font-bold text-[#111827]">Recent blog posts</h2>
              <a href="/blogs" className="text-[12px] md:text-[14px] font-medium text-[#4f63ff] hover:underline">View all</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[
                {
                  title: '10 Cheapest Cold Email Software Tools for Startups & Agencies',
                  tag: 'Cold Email',
                  href: '/blogs/10-cheapest-cold-email-software',
                  description: 'Discover affordable cold email tools for 2026.',
                  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80&fm=webp',
                },
                {
                  title: 'What Are Email Warmup Tools and How Do They Work?',
                  tag: 'Deliverability',
                  href: '/blogs/email-warmup-tools-guide',
                  description: 'Learn how warmup tools protect sender reputation.',
                  image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                },
                {
                  title: 'Email vs SMS Outreach: Conversion Benchmarks',
                  tag: 'Multichannel',
                  href: '/blogs/email-vs-sms-outreach-conversion-benchmarks',
                  description: 'Compare email and SMS for better conversions.',
                  image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                },
              ].map((post) => (
                <a key={post.href} href={post.href} className="group overflow-hidden rounded-[16px] md:rounded-[20px] border border-[#dbe3f4] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-shadow">
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" priority={false} loading="lazy" />
                  </div>
                  <div className="p-3 md:p-5">
                    <p className="text-[10px] md:text-[11px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-1 md:mb-2">{post.tag}</p>
                    <h3 className="text-[14px] md:text-[16px] font-bold text-[#111827] leading-snug mb-1.5 md:mb-3 group-hover:text-[#4f63ff] transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-[11px] md:text-[13px] text-[#6b7280] line-clamp-2">{post.description}</p>
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