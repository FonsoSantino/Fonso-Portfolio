export interface Project {
    id: string;
    title: string;
    description: string;
    image_url: string;
    demo_url?: string;
    github_url?: string;
    tags: string[];
    tech: string[];
    features: string[];
    category: string;
    priority: number;
    metrics: Record<string, string>;
    themeColor: string;
    status: 'Stable' | 'Experimental' | 'Deprecated' | 'Archived';
    logs?: string[];
    artifacts?: string[];
}

export const FEATURED_PROJECTS: Project[] = [
    {
        id: "ironforge",
        title: "IronForge Gym",
        description: "Experiencia de fitness de alto rendimiento con diseño agresivo y minimalista. Sistema de membresías, horarios interactivos y perfiles de entrenadores de élite.",
        image_url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000",
        demo_url: "/ironforge",
        github_url: "https://github.com/fonsosantino/ironforge",
        tags: ["HEALTH", "FITNESS", "E-COMMERCE"],
        tech: ["Next.js", "React", "Framer Motion", "Tailwind"],
        features: ["Intense Brand System", "Dynamic Schedule", "Membership Logic", "Cinematic Motion"],
        category: "FITNESS",
        priority: 1,
        metrics: {
            "Energy": "High-Intensity",
            "Design": "Bold & Aggressive"
        },
        themeColor: "#E11D48",
        status: "Stable",
        logs: [
            "High-intensity design system deployed",
            "Membership tier logic synchronized",
            "Trainer profiles integrated"
        ]
    },
    {
        id: "luxora",
        title: "Luxora",
        description: "Experiencia de e-commerce de ultra-lujo con diseño editorial minimalista. Enfoque en alta relojería, joyería y accesorios exclusivos.",
        image_url: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2000",
        demo_url: "/luxora",
        github_url: "https://github.com/fonsosantino/luxora",
        tags: ["LUXURY", "EDITORIAL", "E-COMMERCE"],
        tech: ["Next.js", "React", "Framer Motion", "Tailwind"],
        features: ["Cinematic Animations", "Minimalist Lux Drawer", "Editorial Layout", "High-End Detail View"],
        category: "LUXURY",
        priority: 1,
        metrics: {
            "Aesthetic": "Ultra-Premium",
            "UX": "Cinematic"
        },
        themeColor: "#D4AF37",
        status: "Stable",
        logs: [
            "Luxury architecture initialized",
            "Editorial catalog synchronized",
            "Premium cart system deployed"
        ]
    },
    {
        id: "freshmarket",
        title: "FreshMarket",
        description: "Supermercado online premium con enfoque en productos orgánicos. Sistema de carrito en tiempo real, búsqueda avanzada y diseño minimalista.",
        image_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000",
        demo_url: "/supermarket",
        github_url: "https://github.com/fonsosantino/freshmarket",
        tags: ["E-COMMERCE", "ORGANIC", "RETAIL"],
        tech: ["Next.js", "React", "Framer Motion", "Tailwind"],
        features: ["Global Cart System", "Category Filtering", "Side Cart Drawer", "Responsive Design"],
        category: "E-COMMERCE",
        priority: 1,
        metrics: {
            "UX": "Premium",
            "Performance": "A+"
        },
        themeColor: "#10B981",
        status: "Stable",
        logs: [
            "Market architecture initialized",
            "Product catalog synchronized",
            "Cart system deployed"
        ]
    },
    {
        id: "soluciones-forestales",
        title: "Soluciones Forestales",
        description: "Industrial production system for forestry machinery, parts, and services. Features a real-time product catalog, detail modals, and a custom budget request system.",
        image_url: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=2000",
        demo_url: "/soluciones-forestales",
        tags: ["INDUSTRIAL", "LOGISTICS", "COMMERCE"],
        tech: ["Next.js 14", "Tailwind CSS", "Framer Motion", "Next API"],
        features: ["Premium Industrial UI", "Advanced Filtering", "Budget Request Drawer", "Full-Stack Architecture"],
        category: "INDUSTRIAL",
        priority: 1,
        metrics: {
            "Efficiency": "98%",
            "Integrity": "High"
        },
        themeColor: "#367C2B",
        status: "Stable",
        logs: [
            "Industrial environment initialized",
            "API endpoints synchronized",
            "Product catalog successfully deployed"
        ],
        artifacts: [
            "industrial_blueprint",
            "technical_architecture",
            "deployment_log"
        ]
    },
    {
        id: "clientos",
        title: "ClientOS",
        description: "Full-stack SaaS CRM platform built for Nexora Systems. Manages clients, projects, contracts and payments in a modern SaaS environment with real-time data and role-based access.",
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
        demo_url: "/crm",
        tags: ["SAAS", "CRM", "BUSINESS"],
        tech: ["Next.js 14", "React", "Node.js", "REST API"],
        features: ["Client Management", "Project Tracking", "Contract System", "Payment Dashboard"],
        category: "SOFTWARE",
        priority: 1,
        metrics: {
            "Scale": "Enterprise",
            "UX": "SaaS-Grade"
        },
        themeColor: "#7c3aed",
        status: "Stable",
        logs: [
            "ClientOS SaaS platform initialized",
            "Client database synchronized",
            "Payment system deployed"
        ],
        artifacts: [
            "system_architecture",
            "api_documentation",
            "deployment_guide"
        ]
    }
];
