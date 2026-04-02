// ──────────────────────────────────────────────
//  CRM SEED DATA — realistic mock data
// ──────────────────────────────────────────────

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  status: 'active' | 'inactive' | 'lead';
  revenue: number;
  avatarColor: string;
  joinedAt: string;
  industry: string;
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  status: 'pending' | 'active' | 'completed' | 'paused';
  budget: number;
  startDate: string;
  endDate: string;
  progress: number;
  description: string;
  tags: string[];
}

export interface Contract {
  id: string;
  clientId: string;
  title: string;
  value: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'draft' | 'terminated';
  type: string;
}

export interface Payment {
  id: string;
  clientId: string;
  projectId: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'overdue' | 'refunded';
  dueDate: string;
  paidDate: string | null;
  description: string;
  invoiceNumber: string;
}

export interface Message {
  id: string;
  fromId: string;
  fromName: string;
  fromAvatar: string;
  toId: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
}

// ── CLIENTS ────────────────────────────────────
export const CLIENTS: Client[] = [
  { id: 'c1', name: 'Alex Reeves', company: 'Nexus Digital', email: 'alex@nexusdigital.io', phone: '+1 (415) 555-0123', country: 'United States', status: 'active', revenue: 84500, avatarColor: '#6366f1', joinedAt: '2023-03-12', industry: 'Technology' },
  { id: 'c2', name: 'María García', company: 'Grupo Innova', email: 'maria@grupoinnova.es', phone: '+34 91 555 0198', country: 'Spain', status: 'active', revenue: 62300, avatarColor: '#f43f5e', joinedAt: '2023-05-20', industry: 'Consulting' },
  { id: 'c3', name: 'James Liu', company: 'Horizon Labs', email: 'james@horizonlabs.co', phone: '+44 20 7946 0958', country: 'United Kingdom', status: 'active', revenue: 118200, avatarColor: '#10b981', joinedAt: '2022-11-08', industry: 'Research' },
  { id: 'c4', name: 'Priya Patel', company: 'Stellar Systems', email: 'priya@stellarsys.com', phone: '+91 98765 43210', country: 'India', status: 'lead', revenue: 0, avatarColor: '#f97316', joinedAt: '2024-01-15', industry: 'SaaS' },
  { id: 'c5', name: 'Lucas Fontaine', company: 'Atelier Créatif', email: 'lucas@ateliercrea.fr', phone: '+33 1 40 55 67 89', country: 'France', status: 'active', revenue: 45100, avatarColor: '#8b5cf6', joinedAt: '2023-07-01', industry: 'Design' },
  { id: 'c6', name: 'Yuki Tanaka', company: 'Sakura Tech', email: 'yuki@sakuratech.jp', phone: '+81 3-5555-1234', country: 'Japan', status: 'active', revenue: 97600, avatarColor: '#06b6d4', joinedAt: '2022-09-14', industry: 'E-commerce' },
  { id: 'c7', name: 'Diego Morales', company: 'Impulso Digital', email: 'diego@impulso.mx', phone: '+52 55 5555 1234', country: 'Mexico', status: 'inactive', revenue: 28900, avatarColor: '#d946ef', joinedAt: '2023-02-03', industry: 'Marketing' },
  { id: 'c8', name: 'Sophie Weber', company: 'DataStream GmbH', email: 's.weber@datastream.de', phone: '+49 30 555 0123', country: 'Germany', status: 'active', revenue: 134700, avatarColor: '#84cc16', joinedAt: '2022-06-22', industry: 'Analytics' },
  { id: 'c9', name: 'Omar Hassan', company: 'Gulf Ventures', email: 'o.hassan@gulfv.ae', phone: '+971 4 555 0199', country: 'UAE', status: 'lead', revenue: 0, avatarColor: '#fb923c', joinedAt: '2024-02-08', industry: 'Finance' },
  { id: 'c10', name: 'Ana Rodrigues', company: 'Vanguard Tech BR', email: 'ana@vanguardtech.br', phone: '+55 11 98765-4321', country: 'Brazil', status: 'active', revenue: 53400, avatarColor: '#a78bfa', joinedAt: '2023-08-17', industry: 'Fintech' },
  { id: 'c11', name: 'Ethan Cross', company: 'CrossMedia Agency', email: 'ethan@crossmedia.com', phone: '+1 (212) 555-0187', country: 'United States', status: 'active', revenue: 76200, avatarColor: '#34d399', joinedAt: '2023-01-25', industry: 'Advertising' },
  { id: 'c12', name: 'Chiara Bianchi', company: 'Studio Forma', email: 'c.bianchi@studioforma.it', phone: '+39 02 555 0134', country: 'Italy', status: 'inactive', revenue: 31800, avatarColor: '#f472b6', joinedAt: '2022-12-05', industry: 'Architecture' },
];

// ── PROJECTS ───────────────────────────────────
export const PROJECTS: Project[] = [
  { id: 'p1', name: 'Platform Redesign', clientId: 'c1', status: 'active', budget: 28000, startDate: '2024-01-10', endDate: '2024-06-30', progress: 65, description: 'Complete UI/UX overhaul of the main SaaS dashboard.', tags: ['Design', 'Frontend'] },
  { id: 'p2', name: 'API Integration Suite', clientId: 'c1', status: 'completed', budget: 12500, startDate: '2023-09-01', endDate: '2023-12-15', progress: 100, description: 'Third-party payment and CRM API integrations.', tags: ['Backend', 'API'] },
  { id: 'p3', name: 'Brand Identity 2024', clientId: 'c2', status: 'active', budget: 9800, startDate: '2024-02-01', endDate: '2024-04-30', progress: 80, description: 'Full brand refresh including logo, colors, and guidelines.', tags: ['Branding', 'Design'] },
  { id: 'p4', name: 'Machine Learning Pipeline', clientId: 'c3', status: 'active', budget: 45000, startDate: '2024-01-15', endDate: '2024-09-01', progress: 35, description: 'Data ingestion, model training, and deployment pipeline.', tags: ['ML', 'Python', 'Cloud'] },
  { id: 'p5', name: 'E-commerce Migration', clientId: 'c6', status: 'completed', budget: 18700, startDate: '2023-07-01', endDate: '2023-11-30', progress: 100, description: 'Migration from legacy platform to Next.js + Shopify hybrid.', tags: ['Next.js', 'E-commerce'] },
  { id: 'p6', name: 'Analytics Dashboard', clientId: 'c8', status: 'active', budget: 22400, startDate: '2024-02-20', endDate: '2024-07-15', progress: 50, description: 'Real-time business intelligence dashboard with D3 charts.', tags: ['React', 'Data Viz'] },
  { id: 'p7', name: 'Mobile App MVP', clientId: 'c10', status: 'pending', budget: 31000, startDate: '2024-04-01', endDate: '2024-10-01', progress: 0, description: 'Fintech mobile application for iOS and Android.', tags: ['React Native', 'Fintech'] },
  { id: 'p8', name: 'Marketing Automation', clientId: 'c11', status: 'active', budget: 8900, startDate: '2024-01-20', endDate: '2024-05-31', progress: 70, description: 'Automated email campaigns and lead nurturing workflows.', tags: ['HubSpot', 'Marketing'] },
  { id: 'p9', name: 'Website Redesign', clientId: 'c5', status: 'completed', budget: 7200, startDate: '2023-10-01', endDate: '2024-01-15', progress: 100, description: 'Creative agency website with portfolio and contact system.', tags: ['Design', 'CMS'] },
  { id: 'p10', name: 'SEO & Content Strategy', clientId: 'c7', status: 'paused', budget: 5400, startDate: '2023-11-01', endDate: '2024-03-01', progress: 45, description: 'Organic growth strategy and content marketing plan.', tags: ['SEO', 'Content'] },
  { id: 'p11', name: 'Security Audit', clientId: 'c3', status: 'completed', budget: 14000, startDate: '2023-08-15', endDate: '2023-10-30', progress: 100, description: 'Penetration testing and security hardening for cloud infrastructure.', tags: ['Security', 'DevOps'] },
  { id: 'p12', name: 'CRM Implementation', clientId: 'c2', status: 'pending', budget: 19500, startDate: '2024-05-01', endDate: '2024-09-30', progress: 0, description: 'Salesforce implementation and custom automation workflows.', tags: ['CRM', 'Salesforce'] },
];

// ── CONTRACTS ──────────────────────────────────
export const CONTRACTS: Contract[] = [
  { id: 'ct1', clientId: 'c1', title: 'Platform Redesign Agreement', value: 28000, startDate: '2024-01-10', endDate: '2024-06-30', status: 'active', type: 'Fixed Price' },
  { id: 'ct2', clientId: 'c1', title: 'Annual Support Retainer', value: 18000, startDate: '2024-01-01', endDate: '2024-12-31', status: 'active', type: 'Retainer' },
  { id: 'ct3', clientId: 'c2', title: 'Brand Identity Project', value: 9800, startDate: '2024-02-01', endDate: '2024-04-30', status: 'active', type: 'Fixed Price' },
  { id: 'ct4', clientId: 'c3', title: 'ML Pipeline Development', value: 45000, startDate: '2024-01-15', endDate: '2024-09-01', status: 'active', type: 'Time & Materials' },
  { id: 'ct5', clientId: 'c5', title: 'Website Redesign Contract', value: 7200, startDate: '2023-10-01', endDate: '2024-01-15', status: 'expired', type: 'Fixed Price' },
  { id: 'ct6', clientId: 'c6', title: 'E-commerce Migration', value: 18700, startDate: '2023-07-01', endDate: '2023-11-30', status: 'expired', type: 'Fixed Price' },
  { id: 'ct7', clientId: 'c8', title: 'Analytics Platform — Phase 1', value: 22400, startDate: '2024-02-20', endDate: '2024-07-15', status: 'active', type: 'Milestone' },
  { id: 'ct8', clientId: 'c10', title: 'Mobile App Development', value: 31000, startDate: '2024-04-01', endDate: '2024-10-01', status: 'draft', type: 'Fixed Price' },
];

// ── PAYMENTS ───────────────────────────────────
export const PAYMENTS: Payment[] = [
  { id: 'pay1', clientId: 'c1', projectId: 'p1', amount: 9333, currency: 'USD', status: 'paid', dueDate: '2024-02-01', paidDate: '2024-01-31', description: 'Platform Redesign — Milestone 1', invoiceNumber: 'INV-2024-001' },
  { id: 'pay2', clientId: 'c1', projectId: 'p1', amount: 9333, currency: 'USD', status: 'paid', dueDate: '2024-04-01', paidDate: '2024-04-03', description: 'Platform Redesign — Milestone 2', invoiceNumber: 'INV-2024-005' },
  { id: 'pay3', clientId: 'c1', projectId: 'p1', amount: 9334, currency: 'USD', status: 'pending', dueDate: '2024-06-30', paidDate: null, description: 'Platform Redesign — Final Milestone', invoiceNumber: 'INV-2024-012' },
  { id: 'pay4', clientId: 'c2', projectId: 'p3', amount: 4900, currency: 'EUR', status: 'paid', dueDate: '2024-02-15', paidDate: '2024-02-14', description: 'Brand Identity — 50% deposit', invoiceNumber: 'INV-2024-002' },
  { id: 'pay5', clientId: 'c2', projectId: 'p3', amount: 4900, currency: 'EUR', status: 'pending', dueDate: '2024-04-30', paidDate: null, description: 'Brand Identity — Final payment', invoiceNumber: 'INV-2024-009' },
  { id: 'pay6', clientId: 'c3', projectId: 'p4', amount: 15000, currency: 'USD', status: 'paid', dueDate: '2024-02-01', paidDate: '2024-01-29', description: 'ML Pipeline — Phase 1', invoiceNumber: 'INV-2024-003' },
  { id: 'pay7', clientId: 'c3', projectId: 'p4', amount: 15000, currency: 'USD', status: 'paid', dueDate: '2024-04-01', paidDate: '2024-04-01', description: 'ML Pipeline — Phase 2', invoiceNumber: 'INV-2024-007' },
  { id: 'pay8', clientId: 'c3', projectId: 'p4', amount: 15000, currency: 'USD', status: 'pending', dueDate: '2024-07-01', paidDate: null, description: 'ML Pipeline — Phase 3', invoiceNumber: 'INV-2024-014' },
  { id: 'pay9', clientId: 'c6', projectId: 'p5', amount: 18700, currency: 'USD', status: 'paid', dueDate: '2023-12-01', paidDate: '2023-11-28', description: 'E-commerce Migration — Final', invoiceNumber: 'INV-2023-041' },
  { id: 'pay10', clientId: 'c8', projectId: 'p6', amount: 11200, currency: 'EUR', status: 'paid', dueDate: '2024-03-15', paidDate: '2024-03-14', description: 'Analytics Dashboard — Phase 1', invoiceNumber: 'INV-2024-006' },
  { id: 'pay11', clientId: 'c8', projectId: 'p6', amount: 11200, currency: 'EUR', status: 'overdue', dueDate: '2024-05-15', paidDate: null, description: 'Analytics Dashboard — Phase 2', invoiceNumber: 'INV-2024-011' },
  { id: 'pay12', clientId: 'c11', projectId: 'p8', amount: 4450, currency: 'USD', status: 'paid', dueDate: '2024-02-28', paidDate: '2024-02-27', description: 'Marketing Automation — Setup', invoiceNumber: 'INV-2024-004' },
  { id: 'pay13', clientId: 'c11', projectId: 'p8', amount: 4450, currency: 'USD', status: 'overdue', dueDate: '2024-04-30', paidDate: null, description: 'Marketing Automation — Phase 2', invoiceNumber: 'INV-2024-010' },
];

// ── MESSAGES ───────────────────────────────────
export const MESSAGES: Message[] = [
  { id: 'm1', fromId: 'c1', fromName: 'Alex Reeves', fromAvatar: '#6366f1', toId: 'admin', subject: 'Platform redesign feedback', body: "Hi! I reviewed the latest mockups and I'm really happy with the direction. The new navigation feels much more intuitive. One small thing — can we explore a darker accent color for the primary buttons? Looking forward to the next milestone.", timestamp: '2024-03-28T10:23:00Z', read: true, starred: true },
  { id: 'm2', fromId: 'c3', fromName: 'James Liu', fromAvatar: '#10b981', toId: 'admin', subject: 'ML Pipeline — Phase 2 kicked off', body: "The training environment is set up on our AWS account. I've shared access via the usual credentials document. The dataset is ready for ingestion. Let me know if you need anything from our data team.", timestamp: '2024-03-27T15:41:00Z', read: true, starred: false },
  { id: 'm3', fromId: 'c8', fromName: 'Sophie Weber', fromAvatar: '#84cc16', toId: 'admin', subject: 'Invoice overdue — please advise', body: "Our finance team flagged INV-2024-011 as overdue. We had an internal approval delay but payment has now been authorized. Expect transfer within 2 business days. Apologies for the inconvenience.", timestamp: '2024-03-26T09:15:00Z', read: false, starred: false },
  { id: 'm4', fromId: 'c2', fromName: 'María García', fromAvatar: '#f43f5e', toId: 'admin', subject: 'Brand guidelines approval', body: "Team loved the brand refresh! We're ready to sign off on all deliverables. Can you send the final files in both SVG and PDF format? Also, we'd like to discuss the CRM implementation project that starts in May.", timestamp: '2024-03-25T14:00:00Z', read: false, starred: true },
  { id: 'm5', fromId: 'c6', fromName: 'Yuki Tanaka', fromAvatar: '#06b6d4', toId: 'admin', subject: 'New project inquiry', body: "We completed the migration last year and we're thrilled with the results. We'd like to explore a performance optimization project — our checkout conversion dropped slightly after the migration. Would love a call this week.", timestamp: '2024-03-24T08:30:00Z', read: true, starred: false },
  { id: 'm6', fromId: 'c10', fromName: 'Ana Rodrigues', fromAvatar: '#a78bfa', toId: 'admin', subject: 'Mobile app contract clarification', body: "I saw the draft contract for the mobile app. A few questions: Is the 10-month timeline including QA cycles? Also, does the budget cover App Store submission fees? Looking forward to kicking this off.", timestamp: '2024-03-23T16:45:00Z', read: true, starred: false },
];
