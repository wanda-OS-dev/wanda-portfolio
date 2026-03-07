export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  tags: string[];
  accentColor: string;
  outcome?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: 'autonomous-ops',
    title: 'Autonomous Ops Platform',
    category: 'AI Automation',
    year: '2025',
    description:
      'End-to-end AI orchestration platform for routine support, lead qualification, content generation, and reporting workflows.',
    longDescription: `Built a multi-agent AI system that autonomously handles customer support, lead qualification, content generation, and internal reporting — entirely without human involvement on routine tasks.

The system uses a director-worker architecture with 19 specialized sub-agents, each owning a domain. The director routes incoming signals (webhooks, messages, schedules) to the correct agent, monitors execution, and escalates only on failure.

Key technical decisions: session-based state management over shared databases, push-based completion over polling, and a strict tool-permission matrix ensuring agents only touch their domain.`,
    tags: ['Multi-agent AI', 'Node.js', 'OpenAI', 'Anthropic', 'Redis', 'Vercel'],
    accentColor: '#c9a84c',
    outcome: 'Routine operations automated with human escalation only on critical exceptions',
  },
  {
    id: 'revenue-flywheel',
    title: 'Revenue Flywheel System',
    category: 'Business Automation',
    year: '2025',
    description:
      'Automated lead scanning, outreach, proposal generation, and invoice tracking — zero manual steps.',
    longDescription: `Designed and implemented a complete revenue operations system for a bootstrapped studio. From nightly lead scans on freelance platforms, to AI-written proposals, to automated follow-ups and invoice reminders.

The system integrates directly with WhatsApp for human-in-the-loop decisions on high-value opportunities while fully automating low-stakes workflows.

Revenue tracking flows into a live dashboard updated every 6 hours, with weekly summaries delivered to the founder.`,
    tags: ['Automation', 'WhatsApp API', 'Supabase', 'n8n', 'OpenAI'],
    accentColor: '#a8893e',
    outcome: 'Lead qualification and outreach moved from manual handling to automated workflows',
  },
  {
    id: 'realtime-dashboard',
    title: 'Real-time Analytics Dashboard',
    category: 'Web Application',
    year: '2024',
    description:
      'Live business intelligence dashboard for a high-traffic e-commerce brand with near real-time operational visibility.',
    longDescription: `Built from scratch for a high-volume DTC brand. The client needed real-time visibility into order volume, CAC, ROAS, and inventory — all in a single view.

Used Next.js App Router with server components for the static shell, React Query with optimistic updates for live data, and WebSockets for push notifications on anomalies.

The dashboard replaced 4 separate tools (Shopify Analytics, Meta Ads Manager, Klaviyo reports, a manual Google Sheet) with one clean interface.`,
    tags: ['Next.js', 'TypeScript', 'WebSockets', 'PostgreSQL', 'Vercel', 'Tailwind'],
    accentColor: '#c9a84c',
    outcome: 'Decision latency reduced from delayed reports to near real-time monitoring',
  },
  {
    id: 'ai-content-engine',
    title: 'AI Content Engine',
    category: 'AI Product',
    year: '2024',
    description:
      'Automated LinkedIn + Blog content pipeline that turns one weekly brief into multi-format content drafts.',
    longDescription: `A founder submits one weekly brief: goals, news, tone. The engine generates 5 LinkedIn posts, 2 long-form articles, and 10 short-form repurposes — all SEO-optimized and brand-consistent.

Human approval is a single click per batch. The system learns from past approvals to improve tone-matching over time using a feedback loop stored in a vector database.

Integrated directly with Buffer and Ghost CMS for publish scheduling.`,
    tags: ['OpenAI GPT-4o', 'Pinecone', 'Ghost CMS', 'Buffer API', 'Next.js'],
    accentColor: '#a8893e',
    outcome: 'One weekly brief transformed into a repeatable multi-channel content workflow',
  },
  {
    id: 'edge-inference-api',
    title: 'Edge Inference API',
    category: 'Infrastructure',
    year: '2024',
    description:
      'Low-latency ML inference API deployed at the edge for a European fintech use case.',
    longDescription: `A fintech needed to run fraud detection models in real-time at checkout without the 200–400ms round-trip to a central server.

Deployed quantized ONNX models to Cloudflare Workers AI + Vercel Edge Functions. Built a routing layer that selects the nearest edge node and falls back gracefully to central inference under load.

The system was built for high request volume with global edge routing and graceful fallback under load.`,
    tags: ['Cloudflare Workers', 'ONNX', 'Edge Functions', 'TypeScript', 'Rust'],
    accentColor: '#c9a84c',
    outcome: 'Latency reduced through edge deployment and resilient fallback routing',
  },
];
