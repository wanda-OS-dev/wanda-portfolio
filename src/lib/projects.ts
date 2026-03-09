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
    id: 'lead-qualification-automation',
    title: 'Lead Qualification Automation',
    category: 'AI Automation',
    year: '2025',
    description:
      'Inbound lead qualification, enrichment, and CRM handoff automation for a B2B sales workflow.',
    longDescription: `This project automated inbound lead triage, data enrichment, and CRM handoff for a B2B pipeline.

The focus was reliability and response speed: incoming leads are normalized, validated, deduplicated, and routed into follow-up workflows with clear escalation points.

We also implemented fallback paths for missing lead data and explicit ownership rules for edge cases, so no lead silently disappears.

Scope centered on practical workflow automation, not prototype demos.`,
    tags: ['n8n', 'Python', 'CRM API', 'Automation Workflows'],
    accentColor: '#c9a84c',
    outcome: 'Lead handling moved from manual triage to consistent workflow automation',
  },
  {
    id: 'saas-product-build',
    title: 'SaaS Product Build',
    category: 'SaaS Delivery',
    year: '2025',
    description:
      'Production-ready SaaS foundation with auth, billing, tenant model, and operations dashboard.',
    longDescription: `This delivery covered the core SaaS foundation: account system, billing flows, tenant-safe data model, and an admin surface.

The implementation prioritized deployability and maintainability so new features can be added without replatforming.

Release readiness included environment separation, error monitoring hooks, and a handover-ready baseline for feature iteration.

Built as a production baseline with a clear path for ongoing product work.`,
    tags: ['Next.js', 'Supabase', 'Stripe', 'TypeScript'],
    accentColor: '#a8893e',
    outcome: 'Core SaaS infrastructure delivered as a stable launch baseline',
  },
  {
    id: 'realtime-data-sync',
    title: 'Real-Time Data Sync Pipeline',
    category: 'API Integration',
    year: '2025',
    description:
      'Order, CRM, and ERP synchronization pipeline with retries, observability, and reconciliation safety.',
    longDescription: `This integration project connected operational systems that previously drifted out of sync.

The pipeline includes retry logic, monitoring signals, and reconciliation-safe updates so teams can operate on consistent data.

We added idempotent update handling and alerting thresholds for failed sync bursts to keep operations stable during peak load.

Goal was operational reliability and reduced data mismatch incidents across departments.`,
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Webhooks'],
    accentColor: '#c9a84c',
    outcome: 'Data synchronization became consistent and observable across systems',
  },
];
