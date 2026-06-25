// @ts-nocheck
"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initAnimations } from '../../animations';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FeaturesDashboardMockup from '../../components/FeaturesDashboardMockup';
import '../../styles/blogs.css';
import { featuresIndex, FeatureItem } from '../data/featuresIndex';
import { 
  BarChart3, 
  Cpu, 
  Mail, 
  Users, 
  GitFork, 
  Inbox, 
  Layers, 
  Flame, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Sliders,
  ChevronRight,
  Search,
  HelpCircle
} from 'lucide-react';

const featuresList = [
  {
    id: 'ai-workflow-builder',
    badge: 'AI AUTOMATION',
    title: 'AI SDR Agents & Workflow Automation',
    description: 'Orchestrate multi-step outreach flows with conditional routing, customizable delays, and automated LinkedIn actions. Let autonomous AI SDRs personalize cold messages, verify signals, and optimize send paths on the fly.',
    icon: Cpu,
    color: '#8B5CF6',
    mockup: (
      <div className="rounded-2xl border border-white/10 bg-[#0B1528]/80 p-5 shadow-lg overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
        <div className="space-y-3 font-mono text-[10px]">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold uppercase text-[8px]">TRIGGER</span>
            <span className="text-white/70">Lead Joined: "VP Sales"</span>
          </div>
          <div className="w-0.5 h-3 bg-white/15 mx-auto" />
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-semibold uppercase text-[8px]">ACTION</span>
            <span className="text-white/70">AI Personalization (Icebreaker)</span>
          </div>
          <div className="w-0.5 h-3 bg-white/15 mx-auto" />
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5 justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 font-semibold uppercase text-[8px]">BRANCH</span>
              <span className="text-white/70">LinkedIn accepted?</span>
            </div>
            <div className="flex gap-2">
              <span className="text-green-400 text-[8px] bg-green-500/10 border border-green-500/25 px-1.5 py-0.5 rounded">YES</span>
              <span className="text-red-400 text-[8px] bg-red-500/10 border border-red-500/25 px-1.5 py-0.5 rounded">NO</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'overview-dashboard',
    badge: 'ANALYTICS & KPI',
    title: 'Overview Dashboard & Real-Time Analytics',
    description: 'Monitor your outbound revenue operations from a single unified workspace. Get instant insights into open rates, reply rates, meeting conversions, and email deliverability stats across all linked sending profiles.',
    icon: BarChart3,
    color: '#3B82F6',
    mockup: (
      <div className="rounded-2xl border border-white/10 bg-[#0B1528]/80 p-5 shadow-lg overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-[10px] text-white/50 font-mono">REVENUE ANALYTICS</span>
          </div>
          <span className="text-[9px] text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">LIVE DATA</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-white/40 text-[9px] uppercase tracking-wider block">Sent</span>
            <strong className="text-lg text-white font-bold">14,240</strong>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-white/40 text-[9px] uppercase tracking-wider block">Replies</span>
            <strong className="text-lg text-indigo-400 font-bold">1,180 (8.2%)</strong>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[11px]">
            <span className="text-white/60">Campaign Goal Progress</span>
            <span className="text-white font-semibold">82%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full" style={{ width: '82%' }} />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'ai-template-library',
    badge: 'PERSONALIZATION',
    title: 'AI-Personalized Template Library',
    description: 'Write high-converting templates with dynamic tags and custom variables. Our system uses localized signals to craft personalized openers, value propositions, and calls to action for every prospect, using verified contact and post-built data powered by 360marco.com with 90% accuracy.',
    icon: GitFork,
    color: '#0EB5BB',
    mockup: (
      <div className="rounded-2xl border border-white/10 bg-[#0B1528]/80 p-4 shadow-lg overflow-hidden relative font-mono text-[10px]">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
        <div className="text-white/40 mb-2 border-b border-white/5 pb-2">
          Subject: <span className="text-white font-medium">Quick question about {"{company_name}"}'s outbound</span>
        </div>
        <div className="text-white/60 space-y-1.5">
          <p>Hi <span className="text-cyan-400 font-semibold">{"{first_name}"}</span>,</p>
          <p>Noticed that <span className="text-indigo-400 font-semibold">{"{company_name}"}</span> is scaling up hiring for <span className="text-purple-400 font-semibold">{"{hiring_role}"}</span>.</p>
          <p>I thought you might want to automate outbound sequences to find high-intent candidates...</p>
        </div>
      </div>
    )
  },
  {
    id: 'email-sender-infrastructure',
    badge: 'INFRASTRUCTURE',
    title: 'Multi-Domain Inbox Rotation & Infrastructure',
    description: 'Connect Google Workspace, Microsoft 365, and SMTP accounts. Safely distribute daily outreach volumes across multiple domains and rotating inboxes to keep bounce rates minimal and bypass restrictive platform limits.',
    icon: Globe,
    color: '#0EB5BB',
    mockup: (
      <div className="rounded-2xl border border-white/10 bg-[#0B1528]/80 p-5 shadow-lg overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
        <div className="space-y-2.5">
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-white font-medium">hello@get360airo.com</span>
            </div>
            <span className="text-[10px] text-white/40">G-Workspace</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-white font-medium">ayush@get360airo.com</span>
            </div>
            <span className="text-[10px] text-white/40">Office 365</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-white font-medium">deals@get360airo.com</span>
            </div>
            <span className="text-[10px] text-white/40">SMTP Relay</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'deliverability-warmup',
    badge: 'DELIVERABILITY SAFEGUARDS',
    title: 'Automated Inbox Warm-up & Deliverability Controls',
    description: 'Protect your domain reputation with automated sender warm-up. Simulate natural conversations, rescue messages from spam folders, and slowly ramp up daily capacities to build and sustain bulletproof deliverability.',
    icon: Flame,
    color: '#10A36F',
    mockup: (
      <div className="rounded-2xl border border-white/10 bg-[#0B1528]/80 p-5 shadow-lg overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/70 font-semibold">Health Score</span>
            <span className="text-xs text-green-400 font-bold">99.4% Healthy</span>
          </div>
          <div className="h-2 w-full bg-white/5 border border-white/5 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full rounded-full" style={{ width: '99.4%' }} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
            <div className="p-2 rounded bg-white/5">
              <span className="text-white/40 block">Warmed Up</span>
              <strong className="text-white text-xs block">42 Days</strong>
            </div>
            <div className="p-2 rounded bg-white/5">
              <span className="text-white/40 block">Spam Rescues</span>
              <strong className="text-green-400 text-xs block">142</strong>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'prospect-database-lists',
    badge: 'DATABASE & LEAD VERIFICATION',
    title: 'Enriched Prospect Lists & Contact Verification',
    description: 'Import lead lists via CSV/Excel and let our schema mapper organize your headers. Every email address is automatically verified with real-time SMTP handshakes to filter out invalid records. We provide verified contact and post-built data powered by 360marco.com with 90% accuracy.',
    icon: Users,
    color: '#10A36F',
    mockup: (
      <div className="rounded-2xl border border-white/10 bg-[#0B1528]/80 p-5 shadow-lg overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl" />
        <div className="space-y-2 text-[11px]">
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
            <div>
              <span className="text-white font-medium block">Sarah Jenkins</span>
              <span className="text-[10px] text-white/40">VP Growth @ Vanta</span>
            </div>
            <span className="text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full font-medium">VERIFIED</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
            <div>
              <span className="text-white font-medium block">David Chen</span>
              <span className="text-[10px] text-white/40">CTO @ Retool</span>
            </div>
            <span className="text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full font-medium">VERIFIED</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
            <div>
              <span className="text-white font-medium block">Michael K.</span>
              <span className="text-[10px] text-white/40">Founder @ Resend</span>
            </div>
            <span className="text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full font-medium">VERIFIED</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'multichannel-sequences',
    badge: 'CAMPAIGN SEQUENCING',
    title: 'Multichannel Sequences (Email, LinkedIn, SMS)',
    description: 'Scale outreach across high-deliverability emails, automated LinkedIn actions (like connection requests, profile views, and messages), and direct SMS triggers. Deliver touchpoints where your prospects are active, utilizing verified contact and post-built data powered by 360marco.com with 90% accuracy.',
    icon: Layers,
    color: '#3B82F6',
    mockup: (
      <div className="rounded-2xl border border-white/10 bg-[#0B1528]/80 p-5 shadow-lg overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="space-y-3 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
          <div className="flex items-start gap-3 relative pl-6">
            <span className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-4 border-[#0B1528]" />
            <div>
              <span className="text-xs font-semibold text-white block">Day 1: Cold Email</span>
              <span className="text-[10px] text-white/40">Intro pitch with localized icebreaker</span>
            </div>
          </div>
          <div className="flex items-start gap-3 relative pl-6">
            <span className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-indigo-500 border-4 border-[#0B1528]" />
            <div>
              <span className="text-xs font-semibold text-white block">Day 3: LinkedIn Action</span>
              <span className="text-[10px] text-white/40">Profile View & auto-follow trigger</span>
            </div>
          </div>
          <div className="flex items-start gap-3 relative pl-6">
            <span className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-cyan-500 border-4 border-[#0B1528]" />
            <div>
              <span className="text-xs font-semibold text-white block">Day 5: LinkedIn Connect</span>
              <span className="text-[10px] text-white/40">Personalized invite notes</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'master-unified-inbox',
    badge: 'LEAD TRIAGE',
    title: 'Master Unified Inbox & Sentiment Triage',
    description: 'Consolidate all incoming replies into a single master inbox. Our AI sentiment classifier categorizes replies ("Interested", "OOTO", "Follow-up") and automatically triages them to the right sales reps.',
    icon: Inbox,
    color: '#8B5CF6',
    mockup: (
      <div className="rounded-2xl border border-white/10 bg-[#0B1528]/80 p-5 shadow-lg overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
        <div className="space-y-3">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="flex justify-between items-start mb-1.5">
              <strong className="text-xs text-white">Sarah Jenkins</strong>
              <span className="text-[9px] bg-green-500/20 text-green-400 border border-green-500/25 px-2 py-0.5 rounded">Interested</span>
            </div>
            <p className="text-[10px] text-white/60 line-clamp-2">"Let's schedule a call this Thursday at 2 PM. Can you send an invite?"</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="flex justify-between items-start mb-1.5">
              <strong className="text-xs text-white">David Chen</strong>
              <span className="text-[9px] bg-red-500/20 text-red-400 border border-red-500/25 px-2 py-0.5 rounded">Not Interested</span>
            </div>
            <p className="text-[10px] text-white/60 line-clamp-1">"Not interested, please remove from database."</p>
          </div>
        </div>
      </div>
    )
  }
];

export default function FeaturesPage() {
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [activeSection, setActiveSection] = useState('ai-workflow-builder');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [visibleCount, setVisibleCount] = useState(30);

  const isNavigatingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigateToSection = (id: string) => {
    isNavigatingRef.current = true;
    setActiveSection(id);
    
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    
    scrollTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  };

  const activeSectionRef = useRef(activeSection);
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);


  const categories = [
    { value: 'all', label: 'All Capabilities' },
    { value: 'data', label: 'Database & Leads' },
    { value: 'deliverability', label: 'Deliverability & Inboxes' },
    { value: 'outreach', label: 'Sequences & Outreach' },
    { value: 'ai', label: 'AI & SDR Agents' },
    { value: 'integrations', label: 'CRM & Integrations' },
    { value: 'ops', label: 'Workspace & Team Ops' }
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'available', label: 'Available Now' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'planned', label: 'Planned / Roadmap' }
  ];

  const filteredFeatures = featuresIndex.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          String(item.id).includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  const heroStageRef = useRef(null);
  const heroContentRef = useRef(null);
  const tabletMotionRef = useRef(null);
  const heroTabletRef = useRef(null);
  const tabletScreenRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx;

    const initTimeline = () => {
      if (!interactiveMode) return;

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const shell = tabletMotionRef.current;
          if (!shell) return;

          gsap.set(shell, { clearProps: "all" });
          if (heroTabletRef.current) gsap.set(heroTabletRef.current, { clearProps: "all" });
          if (tabletScreenRef.current) gsap.set(tabletScreenRef.current, { clearProps: "all" });
          gsap.set(".tablet-camera, .tablet-side-dot", { clearProps: "all" });

          const initialWidth = shell.offsetWidth;
          const initialHeight = shell.offsetHeight;
          const startScale = (tabletScreenRef.current?.offsetWidth || 632) / 1600;

          gsap.set(shell, {
            xPercent: 0,
            yPercent: -50,
            x: 0,
            y: 0,
            scale: 1,
            transformOrigin: "center center",
            width: initialWidth,
            height: initialHeight,
            aspectRatio: "auto",
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: heroStageRef.current,
              start: "top top",
              end: "+=1800",
              scrub: 1.15,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .addLabel("heroExit")
            .to(heroContentRef.current, {
              opacity: 0,
              y: -50,
              duration: 1.2,
              ease: "none",
            }, "heroExit")
            .addLabel("tabletMorph", "heroExit+=0.2")
            .to(shell, {
              top: "86px",
              right: "0%",
              yPercent: 0,
              width: "100vw",
              height: "calc(100vh - 86px)",
              duration: 2.8,
              ease: "none",
            }, "tabletMorph")
            .to(heroTabletRef.current, {
              borderRadius: 0,
              borderWidth: 0,
              boxShadow: "none",
              duration: 2.8,
              ease: "none",
            }, "tabletMorph")
            .to(tabletScreenRef.current, {
              inset: 0,
              borderRadius: 0,
              duration: 2.8,
              ease: "none",
            }, "tabletMorph")
            .to(".tablet-camera, .tablet-side-dot", {
              opacity: 0,
              duration: 1.5,
              ease: "none",
            }, "tabletMorph");

          timeline.eventCallback("onUpdate", () => {
            const progress = timeline.progress();
            const iframe = document.querySelector('.tablet-screen-mask iframe') as HTMLIFrameElement;
            if (!iframe) return;

            iframe.style.pointerEvents = progress >= 0.98 ? 'auto' : 'none';
            iframe.style.setProperty('--iframe-scale', String(startScale + progress * (1 - startScale)));
          });
        });
      });
    };

    if (document.readyState === 'complete') {
      initTimeline();
    } else {
      const handleLoad = () => initTimeline();
      window.addEventListener('load', handleLoad);
      ctx = { revert: () => window.removeEventListener('load', handleLoad) };
    }

    return () => {
      if (ctx && typeof ctx.revert === 'function') ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === heroStageRef.current) trigger.kill();
      });
      if (tabletMotionRef.current) gsap.set(tabletMotionRef.current, { clearProps: "all" });
      if (heroTabletRef.current) gsap.set(heroTabletRef.current, { clearProps: "all" });
      if (tabletScreenRef.current) gsap.set(tabletScreenRef.current, { clearProps: "all" });
    };
  }, [interactiveMode]);

  useEffect(() => {
    initAnimations();
  }, []);

  // Scroll spy to highlight active section in table of contents
  useEffect(() => {
    if (interactiveMode) return;

    const sectionGroups = [
      ['ai-workflow-builder'],
      ['overview-dashboard', 'ai-template-library'],
      ['email-sender-infrastructure'],
      ['deliverability-warmup', 'prospect-database-lists'],
      ['multichannel-sequences', 'master-unified-inbox']
    ];

    const handleScroll = () => {
      if (isNavigatingRef.current) return;

      // If we are at the top of the page, always highlight the first item
      if (window.scrollY < 100) {
        setActiveSection('ai-workflow-builder');
        return;
      }

      // If we are at the bottom of the page, always highlight the last item
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
      if (isAtBottom) {
        setActiveSection('master-unified-inbox');
        return;
      }

      const scrollPos = window.scrollY + 250;
      
      for (const group of sectionGroups) {
        const firstId = group[0];
        const el = document.getElementById(firstId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          const height = rect.height;
          
          if (scrollPos >= absoluteTop && scrollPos < absoluteTop + height) {
            // If the current active section is already one of the items in this group, do not change it
            if (group.includes(activeSectionRef.current)) {
              return;
            }
            // Otherwise, highlight the first item in the group
            setActiveSection(firstId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run handleScroll once immediately on load to sync initial scroll state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [interactiveMode]);

  // Handle direct URL hash loading after hydration
  useEffect(() => {
    if (interactiveMode) return;
    
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          // Temporarily cancel browser scroll locking
          window.scrollTo({ top: window.scrollY });
          navigateToSection(id);
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 80);
        }
      }
    };

    const timer = setTimeout(handleHashScroll, 500);
    return () => clearTimeout(timer);
  }, [interactiveMode]);

  // Handle URL hash changes (back/forward history navigation)
  useEffect(() => {
    if (interactiveMode) return;

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          navigateToSection(id);
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [interactiveMode]);

  return (
    <div className="app-container">
      <canvas id="aurora-canvas" />
      <canvas id="aurora-light-canvas" />
      <Navbar activeTab="features" />

      <div id="section-home">
        <section className={`hero-stitch-stage ${interactiveMode ? 'is-interactive' : 'is-static'}`} ref={heroStageRef}>
          <div className="hero-scene">
            <div className="hero-diagonal-bg" aria-hidden="true">
              <span className="hero-panel panel-1"></span>
              <span className="hero-panel panel-2"></span>
              <span className="hero-panel panel-3"></span>
              <span className="hero-panel panel-4"></span>
              <span className="hero-panel panel-5"></span>
              <span className="hero-glow glow-1"></span>
              <span className="hero-glow glow-2"></span>
            </div>

            <section className="hero">
              <div className="hero-copy" ref={heroContentRef}>
                <h1 className="hero-title">
                  <span className="title-line">Everything You</span>
                  <span className="title-line">Need to <em className="title-accent">Power</em></span>
                  <span className="title-line">Outreach</span>
                </h1>
                <p className="hero-desc">Our platform brings together every tool modern B2B growth and marketing teams need to scale prospecting (delivering verified contact and post-built data powered by <a href="https://360marco.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-400">360marco.com</a> with 90% accuracy), automate workflows, and bypass spam limits.</p>
                <div className="hero-actions">
                  <button
                    className="transition-all duration-300 transform active:scale-95"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '54px',
                      minWidth: '190px',
                      padding: '0 28px',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '14px',
                      background: interactiveMode 
                        ? 'linear-gradient(90deg, #10A36F 0%, #0EB5BB 100%)' 
                        : 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                      color: '#ffffff',
                      boxShadow: interactiveMode
                        ? '0 8px 24px rgba(16, 163, 111, 0.3)'
                        : '0 8px 24px rgba(59, 130, 246, 0.3)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    type="button"
                    onClick={() => setInteractiveMode(!interactiveMode)}
                  >
                    Interactive Mode
                  </button>
                </div>
              </div>

              <div className="hero-visual"></div>
            </section>

            {/* Always render the tablet mockup layer so it displays on page load in both modes */}
            <div className="future-transition-layer">
              <div ref={tabletMotionRef} className="tablet-motion-shell">
                <div ref={heroTabletRef} className="hero-dashboard-tablet">
                  <div className="tablet-camera" />
                  <div className="tablet-side-dot tablet-left" />
                  <div className="tablet-side-dot tablet-right" />
                  <div ref={tabletScreenRef} className="tablet-screen-mask">
                    <div className="hero-dashboard-ui">
                      <FeaturesDashboardMockup />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Static Mode Detailed Features List */}
      {!interactiveMode && (
        <section className="px-6 py-20 relative z-10">
          <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[280px_1fr] gap-12">
            
            {/* Sticky Table of Contents (TOC) */}
            <aside className="sticky top-[100px] self-start hidden lg:block">
              <h2 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-6">
                Features Guide
              </h2>
              
              <nav className="space-y-6">
                {/* Section 1 */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-semibold block px-1">
                    01 / Autonomous Workflows
                  </span>
                  <div className="space-y-1 border-l border-white/10 pl-3">
                    {featuresList.slice(0, 3).map((item) => {
                      const isActive = activeSection === item.id;
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateToSection(item.id);
                            const el = document.getElementById(item.id);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                            window.history.pushState(null, '', `#${item.id}`);
                          }}
                          className={`relative flex items-center gap-2 rounded-r-lg py-2 px-2 text-[12px] leading-5 transition-all duration-200 ${
                            isActive
                              ? 'bg-indigo-500/10 text-white font-semibold'
                              : 'text-white/50 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span
                            className={`absolute left-[-13px] top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full transition-all ${
                              isActive ? 'bg-indigo-500' : 'bg-transparent'
                            }`}
                          />
                          <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: isActive ? '#8B5CF6' : 'currentColor' }} />
                          <span className="truncate">{item.title.split(' & ')[0]}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2 */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase font-semibold block px-1">
                    02 / Outbound Infrastructure
                  </span>
                  <div className="space-y-1 border-l border-white/10 pl-3">
                    {featuresList.slice(3, 6).map((item) => {
                      const isActive = activeSection === item.id;
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateToSection(item.id);
                            const el = document.getElementById(item.id);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                            window.history.pushState(null, '', `#${item.id}`);
                          }}
                          className={`relative flex items-center gap-2 rounded-r-lg py-2 px-2 text-[12px] leading-5 transition-all duration-200 ${
                            isActive
                              ? 'bg-teal-500/10 text-white font-semibold'
                              : 'text-white/50 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span
                            className={`absolute left-[-13px] top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full transition-all ${
                              isActive ? 'bg-teal-500' : 'bg-transparent'
                            }`}
                          />
                          <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: isActive ? '#10A36F' : 'currentColor' }} />
                          <span className="truncate">{item.title.split(' & ')[0]}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Section 3 */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-semibold block px-1">
                    03 / Multichannel Engagement
                  </span>
                  <div className="space-y-1 border-l border-white/10 pl-3">
                    {featuresList.slice(6, 8).map((item) => {
                      const isActive = activeSection === item.id;
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateToSection(item.id);
                            const el = document.getElementById(item.id);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                            window.history.pushState(null, '', `#${item.id}`);
                          }}
                          className={`relative flex items-center gap-2 rounded-r-lg py-2 px-2 text-[12px] leading-5 transition-all duration-200 ${
                            isActive
                              ? 'bg-purple-500/10 text-white font-semibold'
                              : 'text-white/50 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span
                            className={`absolute left-[-13px] top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full transition-all ${
                              isActive ? 'bg-purple-500' : 'bg-transparent'
                            }`}
                          />
                          <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: isActive ? '#8B5CF6' : 'currentColor' }} />
                          <span className="truncate">{item.title.split(' & ')[0]}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </nav>
            </aside>

            {/* Premium Linear-style Grid Layout */}
            <div className="space-y-24 max-w-5xl">
              
              {/* SECTION 1: AUTONOMOUS OPERATIONS */}
              <div className="space-y-12">
                <div className="space-y-3">
                  <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold">01 / AUTONOMOUS WORKFLOWS</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-outfit">Self-driving outbound operations</h3>
                  <p className="text-sm md:text-base text-white/50 max-w-2xl font-light">
                    Deploy AI SDRs that learn your product, research prospects (backed by verified contact and post-built data powered by <a href="https://360marco.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-400">360marco.com</a> with 90% accuracy), personalize sequences, and triage replies automatically.
                  </p>
                </div>

                <div className="grid gap-8">
                  {/* AI SDR Agents (Main Banner - Wide Flex Card) */}
                  <article id="ai-workflow-builder" className="group scroll-mt-28">
                    <div className="flex flex-col lg:flex-row justify-between items-stretch gap-10 p-8 md:p-12 rounded-3xl border border-white/5 bg-[#080E1C]/40 hover:bg-[#0B1528]/70 hover:border-white/10 transition-all duration-300 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-transparent opacity-30" />
                      
                      {/* Left Side: Content */}
                      <div className="flex flex-col justify-between space-y-6 lg:w-[55%]">
                        <div className="space-y-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-wider text-white/60">
                            <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />
                            AI AUTOMATION
                          </span>
                          <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                            AI SDR Agents & Workflow Automation
                          </h4>
                          <p className="text-sm text-white/60 leading-relaxed font-light">
                            Orchestrate multi-step outreach flows with conditional routing, customizable delays, and automated LinkedIn actions. Let autonomous AI SDRs personalize cold messages, verify signals, and optimize send paths on the fly.
                          </p>
                        </div>

                        <div className="flex flex-col gap-2.5 text-xs text-white/40">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Real-time automation & scaling
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> AI personalization icebreakers
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Detailed log metrics
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Mockup Visual */}
                      <div className="flex items-center justify-center lg:w-[40%] shrink-0">
                        <div className="w-full">
                          {featuresList.find(f => f.id === 'ai-workflow-builder')?.mockup}
                        </div>
                      </div>
                    </div>
                  </article>

                  {/* Two Columns Below */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Overview Dashboard Card */}
                    <article id="overview-dashboard" className="group scroll-mt-28">
                      <div className="flex flex-col justify-between p-8 rounded-3xl border border-white/5 bg-[#080E1C]/40 hover:bg-[#0B1528]/70 hover:border-white/10 transition-all duration-300 shadow-xl relative overflow-hidden min-h-[460px]">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-transparent opacity-30" />
                        
                        <div className="space-y-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-wider text-white/60">
                            <BarChart3 className="w-3 h-3 text-blue-400" />
                            ANALYTICS & KPI
                          </span>
                          <h4 className="text-lg font-bold text-white tracking-tight">
                            Overview Dashboard & Real-Time Analytics
                          </h4>
                          <p className="text-xs text-white/60 leading-relaxed font-light">
                            Monitor your outbound revenue operations from a single unified workspace. Get instant insights into open rates, reply rates, meeting conversions, and email deliverability stats across all linked sending profiles.
                          </p>
                        </div>

                        <div className="mt-8 flex justify-center">
                          <div className="w-full">
                            {featuresList.find(f => f.id === 'overview-dashboard')?.mockup}
                          </div>
                        </div>
                      </div>
                    </article>

                    {/* AI Personalized Template Library Card */}
                    <article id="ai-template-library" className="group scroll-mt-28">
                      <div className="flex flex-col justify-between p-8 rounded-3xl border border-white/5 bg-[#080E1C]/40 hover:bg-[#0B1528]/70 hover:border-white/10 transition-all duration-300 shadow-xl relative overflow-hidden min-h-[460px]">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-500 to-transparent opacity-30" />
                        
                        <div className="space-y-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-wider text-white/60">
                            <GitFork className="w-3 h-3 text-cyan-400" />
                            PERSONALIZATION
                          </span>
                          <h4 className="text-lg font-bold text-white tracking-tight">
                            AI-Personalized Template Library
                          </h4>
                          <p className="text-xs text-white/60 leading-relaxed font-light">
                            Write high-converting templates with dynamic tags and custom variables. Our system uses localized signals to craft personalized openers, value propositions, and calls to action for every prospect (using verified contact and post-built data powered by <a href="https://360marco.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">360marco.com</a> with 90% accuracy).
                          </p>
                        </div>

                        <div className="mt-8 flex justify-center">
                          <div className="w-full">
                            {featuresList.find(f => f.id === 'ai-template-library')?.mockup}
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>

              {/* Horizontal Divider */}
              <div className="h-[1px] w-full bg-white/5" />

              {/* SECTION 2: HIGH-DELIVERABILITY INFRASTRUCTURE */}
              <div className="space-y-12">
                <div className="space-y-3">
                  <span className="text-xs font-mono tracking-widest text-teal-400 uppercase font-semibold">02 / OUTBOUND INFRASTRUCTURE</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-outfit">Smart sender rotation & scale</h3>
                  <p className="text-sm md:text-base text-white/50 max-w-2xl font-light">
                    Deploy rotating mailboxes and custom domain parameters to maintain a 99%+ deliverability profile.
                  </p>
                </div>

                <div className="grid gap-8">
                  {/* Multi-Domain Inbox Rotation (Main Banner - Wide Flex Card) */}
                  <article id="email-sender-infrastructure" className="group scroll-mt-28">
                    <div className="flex flex-col lg:flex-row justify-between items-stretch gap-10 p-8 md:p-12 rounded-3xl border border-white/5 bg-[#080E1C]/40 hover:bg-[#0B1528]/70 hover:border-white/10 transition-all duration-300 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-500 to-transparent opacity-30" />
                      
                      {/* Left Side: Content */}
                      <div className="flex flex-col justify-between space-y-6 lg:w-[55%]">
                        <div className="space-y-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-wider text-white/60">
                            <Globe className="w-3 h-3 text-teal-400" />
                            INFRASTRUCTURE
                          </span>
                          <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                            Multi-Domain Inbox Rotation & Infrastructure
                          </h4>
                          <p className="text-sm text-white/60 leading-relaxed font-light">
                            Connect Google Workspace, Microsoft 365, and SMTP accounts. Safely distribute daily outreach volumes across multiple domains and rotating inboxes to keep bounce rates minimal and bypass restrictive platform limits.
                          </p>
                        </div>

                        <div className="flex flex-col gap-2.5 text-xs text-white/40">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Google Workspace & Office 365 native integrations
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Smart scheduling & sending limits rotation
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Detailed log metrics
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Mockup Visual */}
                      <div className="flex items-center justify-center lg:w-[40%] shrink-0">
                        <div className="w-full">
                          {featuresList.find(f => f.id === 'email-sender-infrastructure')?.mockup}
                        </div>
                      </div>
                    </div>
                  </article>

                  {/* Two Columns Below */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Automated Inbox Warm-up Card */}
                    <article id="deliverability-warmup" className="group scroll-mt-28">
                      <div className="flex flex-col justify-between p-8 rounded-3xl border border-white/5 bg-[#080E1C]/40 hover:bg-[#0B1528]/70 hover:border-white/10 transition-all duration-300 shadow-xl relative overflow-hidden min-h-[460px]">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-green-500 to-transparent opacity-30" />
                        
                        <div className="space-y-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-wider text-white/60">
                            <Flame className="w-3 h-3 text-green-400 animate-pulse" />
                            DELIVERABILITY SAFEGUARDS
                          </span>
                          <h4 className="text-lg font-bold text-white tracking-tight">
                            Automated Inbox Warm-up & Deliverability Controls
                          </h4>
                          <p className="text-xs text-white/60 leading-relaxed font-light">
                            Protect your domain reputation with automated sender warm-up. Simulate natural conversations, rescue messages from spam folders, and slowly ramp up daily capacities to build and sustain bulletproof deliverability.
                          </p>
                        </div>

                        <div className="mt-8 flex justify-center">
                          <div className="w-full">
                            {featuresList.find(f => f.id === 'deliverability-warmup')?.mockup}
                          </div>
                        </div>
                      </div>
                    </article>

                    {/* Enriched Prospect Lists & Contact Verification Card */}
                    <article id="prospect-database-lists" className="group scroll-mt-28">
                      <div className="flex flex-col justify-between p-8 rounded-3xl border border-white/5 bg-[#080E1C]/40 hover:bg-[#0B1528]/70 hover:border-white/10 transition-all duration-300 shadow-xl relative overflow-hidden min-h-[460px]">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-500 to-transparent opacity-30" />
                        
                        <div className="space-y-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-wider text-white/60">
                            <Users className="w-3 h-3 text-teal-400" />
                            DATABASE & LEAD VERIFICATION
                          </span>
                          <h4 className="text-lg font-bold text-white tracking-tight">
                            Enriched Prospect Lists & Contact Verification
                          </h4>
                          <p className="text-xs text-white/60 leading-relaxed font-light">
                            Import lead lists via CSV/Excel and let our schema mapper organize your headers. Every email address is automatically verified with real-time SMTP handshakes to filter out invalid records before you launch. We provide verified contact and post-built data powered by <a href="https://360marco.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal-400">360marco.com</a> with 90% accuracy.
                          </p>
                        </div>

                        <div className="mt-8 flex justify-center">
                          <div className="w-full">
                            {featuresList.find(f => f.id === 'prospect-database-lists')?.mockup}
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>

              {/* Horizontal Divider */}
              <div className="h-[1px] w-full bg-white/5" />

              {/* SECTION 3: ENGAGEMENT & MULTICHANNEL CAMPAIGNS */}
              <div className="space-y-12">
                <div className="space-y-3">
                  <span className="text-xs font-mono tracking-widest text-purple-400 uppercase font-semibold">03 / MULTICHANNEL ENGAGEMENT</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-outfit">Omnichannel outreach & triage</h3>
                  <p className="text-sm md:text-base text-white/50 max-w-2xl font-light">
                    Run campaigns across Email, LinkedIn, and SMS. Classify response sentiment and direct leads to active reps.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Multichannel Sequences Card */}
                  <article id="multichannel-sequences" className="group scroll-mt-28">
                    <div className="flex flex-col justify-between p-8 rounded-3xl border border-white/5 bg-[#080E1C]/40 hover:bg-[#0B1528]/70 hover:border-white/10 transition-all duration-300 shadow-xl relative overflow-hidden min-h-[460px]">
                      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-transparent opacity-30" />
                      
                      <div className="space-y-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-wider text-white/60">
                          <Layers className="w-3 h-3 text-blue-400" />
                          CAMPAIGN SEQUENCING
                        </span>
                        <h4 className="text-lg font-bold text-white tracking-tight">
                          Multichannel Sequences (Email, LinkedIn, SMS)
                        </h4>
                        <p className="text-xs text-white/60 leading-relaxed font-light">
                          Scale outreach across high-deliverability emails, automated LinkedIn actions (like connection requests, profile views, and messages), and direct SMS triggers. Deliver touchpoints where your prospects are active, utilizing verified contact and post-built data powered by <a href="https://360marco.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400">360marco.com</a> with 90% accuracy.
                        </p>
                      </div>

                      <div className="mt-8 flex justify-center">
                        <div className="w-full">
                          {featuresList.find(f => f.id === 'multichannel-sequences')?.mockup}
                        </div>
                      </div>
                    </div>
                  </article>

                  {/* Master Unified Inbox Card */}
                  <article id="master-unified-inbox" className="group scroll-mt-28">
                    <div className="flex flex-col justify-between p-8 rounded-3xl border border-white/5 bg-[#080E1C]/40 hover:bg-[#0B1528]/70 hover:border-white/10 transition-all duration-300 shadow-xl relative overflow-hidden min-h-[460px]">
                      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-transparent opacity-30" />
                      
                      <div className="space-y-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-wider text-white/60">
                          <Inbox className="w-3 h-3 text-purple-400" />
                          LEAD TRIAGE
                        </span>
                        <h4 className="text-lg font-bold text-white tracking-tight">
                          Master Unified Inbox & Sentiment Triage
                        </h4>
                        <p className="text-xs text-white/60 leading-relaxed font-light">
                          Consolidate all incoming replies into a single master inbox. Our AI sentiment classifier categorizes replies ("Interested", "OOTO", "Follow-up") and automatically triages them to the right sales reps.
                        </p>
                      </div>

                      <div className="mt-8 flex justify-center">
                        <div className="w-full">
                          {featuresList.find(f => f.id === 'master-unified-inbox')?.mockup}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* 365 Capabilities Directory Section */}
      {!interactiveMode && (
        <section className="px-6 py-24 border-t border-white/5 bg-[#050B14]/40 relative z-10">
          <div className="max-w-[1440px] mx-auto">
            
            {/* Header Content */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono tracking-wider text-indigo-300">
                <Zap className="w-3.5 h-3.5" />
                365 ENGINE CAPABILITIES
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Platform Capability Directory
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed">
                Explore the complete index of 365 specialized features, algorithms, infrastructure protocols, and AI integrations built into the 360Airo outbound engine.
              </p>
            </div>

            {/* Filter Controls & Search */}
            <div className="bg-[#080E1C]/80 border border-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-12 space-y-6">
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search from 365 capabilities (e.g. email finder, warmup, rotation, liquid, crm...)"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-indigo-500/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-indigo-500/30 transition-all outline-none text-sm md:text-base"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(30); // reset page count on search
                  }}
                />
              </div>

              {/* Filters Container */}
              <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
                
                {/* Category Tags */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.value;
                    return (
                      <button
                        key={cat.value}
                        onClick={() => {
                          setSelectedCategory(cat.value);
                          setVisibleCount(30); // reset count
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                            : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-xl shrink-0">
                  {statuses.map((stat) => {
                    const isSelected = selectedStatus === stat.value;
                    return (
                      <button
                        key={stat.value}
                        onClick={() => {
                          setSelectedStatus(stat.value);
                          setVisibleCount(30); // reset count
                        }}
                        className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all ${
                          isSelected
                            ? 'bg-white/10 text-white border border-white/10 shadow-sm'
                            : 'text-white/40 hover:text-white border border-transparent'
                        }`}
                      >
                        {stat.label.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>

              </div>

            </div>

            {/* Results Counter */}
            <div className="flex justify-between items-center mb-6 text-xs text-white/40 px-2">
              <div>
                Showing <span className="text-white font-medium">{Math.min(filteredFeatures.length, visibleCount)}</span> of <span className="text-white font-medium">{filteredFeatures.length}</span> capabilities matching filters
              </div>
              {filteredFeatures.length === 365 && (
                <div className="text-indigo-400 font-mono tracking-wider">365 / 365 TOTAL</div>
              )}
            </div>

            {/* Capabilities Grid */}
            {filteredFeatures.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredFeatures.slice(0, visibleCount).map((item) => {
                  return (
                    <div 
                      key={item.id}
                      className="group p-5 rounded-2xl border border-white/5 bg-[#080E1C]/40 hover:bg-[#0B1528]/85 hover:border-white/10 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-xl flex flex-col justify-between min-h-[120px] relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all duration-300" />
                      
                      <div className="space-y-2">
                        {/* Top Metadata */}
                        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-white/30">
                          <span>FEATURE #{String(item.id).padStart(3, '0')}</span>
                          <span className="uppercase text-[9px] text-indigo-400/80">{item.category}</span>
                        </div>
                        {/* Name */}
                        <h4 className="text-sm font-bold text-white/90 leading-tight group-hover:text-white transition-colors duration-200">
                          {item.name}
                        </h4>
                      </div>

                      {/* Status Badging */}
                      <div className="pt-4 flex items-center justify-between">
                        <span className="text-[10px] text-white/40 capitalize font-medium">
                          {item.category === 'data' ? 'Database & Enrichment' : 
                           item.category === 'deliverability' ? 'Deliverability & Domain' :
                           item.category === 'outreach' ? 'Sequence & Channel' :
                           item.category === 'ai' ? 'AI Agent Swarm' :
                           item.category === 'integrations' ? 'API & Workflow' : 'System Operations'}
                        </span>
                        
                        {item.status === 'available' && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider border border-green-500/20 bg-green-500/10 text-green-400 uppercase">
                            Available
                          </span>
                        )}
                        {item.status === 'upcoming' && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 uppercase">
                            Upcoming
                          </span>
                        )}
                        {item.status === 'planned' && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider border border-purple-500/20 bg-purple-500/10 text-purple-400 uppercase">
                            Roadmap
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#080E1C]/40 border border-white/5 rounded-2xl space-y-3">
                <HelpCircle className="w-12 h-12 text-white/20 mx-auto" />
                <h4 className="text-base font-bold text-white/80">No capabilities found</h4>
                <p className="text-xs text-white/40 max-w-sm mx-auto">
                  Try adjusting your search keywords or filter badges to find matching features.
                </p>
              </div>
            )}

            {/* Load More Button */}
            {filteredFeatures.length > visibleCount && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 30)}
                  className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold tracking-wider uppercase text-white transition-all transform active:scale-95 cursor-pointer inline-flex items-center gap-2"
                >
                  Load More Capabilities ({filteredFeatures.length - visibleCount} remaining)
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>
        </section>
      )}

      {/* Unified Reusable Footer */}
      {!interactiveMode && <Footer />}
    </div>
  );
}
