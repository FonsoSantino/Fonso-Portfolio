"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const translations: any = {
        es: {
            nav: {
                home: "Inicio",
                projects: "Proyectos",
                experience: "Experiencia",
                contact: "Contacto"
            },
            hero: {
                status: "Disponible para proyectos estratégicos",
                title: "Santino Fonso",
                subtitle: "Software Architect",
                description: "Arquitecto de sistemas digitales escalables y de alta disponibilidad. Especializado en transformar visiones complejas en ecosistemas de productos reales mediante ingeniería de alto impacto.",
                cta_projects: "VER ECOSISTEMA",
                cta_contact: "CONTACTO"
            },
            about: {
                badge: "Sobre mí",
                title_start: "Convirtiendo Visiones Audaces en",
                title_highlight: "Productos",
                title_end: "Escalables.",
                description: "Soy Santino Fonso, Principal Software Architect especializado en la creación de ecosistemas digitales de alto rendimiento. Mi enfoque trasciende el simple desarrollo; diseño visiones técnicas que se convierten en productos reales, escalables y con un impacto de mercado tangible.",
                feature1_title: "Escalabilidad",
                feature1_desc: "Diseño sistemas pensando en el crecimiento infinito y la carga crítica.",
                feature2_title: "Global",
                feature2_desc: "Experiencia en despliegues distribuidos y disponibilidad global.",
                feature3_title: "Mobile First",
                feature3_desc: "Interfaces fluidas y optimizadas para cualquier dispositivo.",
                performance: "Alto Rendimiento",
                architecture: "Clean Architecture"
            },
            projects: {
                badge: "Trayectoria Profesional",
                title: "Trayectoria Profesional.",
                subtitle: "Un ecosistema de productos digitales diseñados bajo estándares de ingeniería de élite.",
                search_placeholder: "Buscar sistemas o tecnologías...",
                filter_all: "Todos los Sistemas",
                filter_featured: "Destacados",
                no_results_title: "SIN SISTEMAS ENCONTRADOS",
                no_results_desc: "NO SE PUDO LOCALIZAR EL PRODUCTO DIGITAL SOLICITADO.",
                modal_description_label: "Descripción",
                modal_logs_label: "Registros Recientes",
                modal_artifacts_label: "Artefactos",
                modal_open_btn: "ABRIR INTERFAZ DEL SISTEMA",
                modal_restricted: "Interfaz del sistema restringida o en mantenimiento.",
                product_live: "Producto en Vivo",
                open_interface: "ABRIR INTERFAZ",
                items: {
                    ironforge: {
                        description: "Experiencia de fitness de alto rendimiento con diseño agresivo y minimalista. Sistema de membresías, horarios interactivos y perfiles de entrenadores de élite."
                    },
                    luxora: {
                        description: "Experiencia de e-commerce de ultra-lujo con diseño editorial minimalista. Enfoque en alta relojería, joyería y accesorios exclusivos."
                    },
                    freshmarket: {
                        description: "Supermercado online premium con enfoque en productos orgánicos. Sistema de carrito en tiempo real, búsqueda avanzada y diseño minimalista."
                    },
                    "soluciones-forestales": {
                        description: "Sistema de producción industrial para maquinaria forestal, repuestos y servicios. Incluye catálogo de productos en tiempo real, modales de detalle y un sistema de solicitud de presupuesto personalizado."
                    },
                    clientos: {
                        description: "Plataforma SaaS CRM full-stack para Nexora Systems. Gestiona clientes, proyectos, contratos y pagos en un entorno empresarial moderno con datos en tiempo real."
                    }
                }
            },
            demos: {
                common: {
                    back: "Volver",
                    add_to_cart: "Añadir al Carrito",
                    view_more: "Ver más",
                    contact: "Contactar"
                }
            },
            contact: {
                badge: "Contacto Profesional",
                title: "Hablemos de Proyectos.",
                subtitle: "Disponible para colaboraciones estratégicas y roles de ingeniería de alto nivel.",
                form_name: "Nombre",
                form_email: "Email",
                form_message: "Mensaje",
                form_submit: "ENVIAR MENSAJE",
                success: "¡Mensaje Enviado!",
                success_desc: "Te responderemos a la brevedad.",
                send_another: "Enviar otro",
                channels_title: "Canales Directos",
                socials_title: "Redes Profesionales",
                quote: "Enfoque en la resolución de problemas empresariales mediante tecnología de vanguardia y arquitectura sólida.",
                error: "Ocurrió un error. Inténtalo de nuevo."
            },
            experience: {
                badge: "Trayectoria Profesional",
                title: "Experiencia",
                accent: "Estratégica",
                subtitle: "Un historial de crecimiento desde el desarrollo de servidores de juegos hasta soluciones empresariales escalables.",
                sync: "Sincronizando experiencia...",
                error_title: "Error de Sistema",
                error_desc: "No se pudo cargar la trayectoria profesional.",
                present: "Actualidad",
                empty: "No hay registros disponibles.",
                milestones: {
                    age14: {
                        date: "14",
                        title: "El Comienzo",
                        desc: "A los 14 años empecé a aprender programación para crear mis propios plugins para servidores de Minecraft y Unturned."
                    },
                    security: {
                        date: "15",
                        title: "Ciberseguridad",
                        desc: "Me interesé por la ciberseguridad y empecé a estudiarla seriamente para entender la arquitectura profunda de los sistemas."
                    },
                    software: {
                        date: "16",
                        title: "Enfoque en Software",
                        desc: "Me enfocó más profundamente en la programación y el desarrollo de software complejo, explorando nuevas tecnologías."
                    },
                    professional: {
                        date: "17",
                        title: "Desarrollo Profesional",
                        desc: "Empecé a trabajar formalmente en desarrollo tanto web como de software, construyendo soluciones funcionales."
                    },
                    specialization: {
                        date: "18",
                        title: "Especialización",
                        desc: "Me especialicé para crear soluciones profesionales centradas en resolver problemas reales de empresas mediante tecnología escalable."
                    }
                },
                quote: "\"No solo desarrollo software. Construyo soluciones robustas.\""
            },
            services: {
                badge: "Servicios Profesionales",
                title: "Qué Ofrezco.",
                description: "Diseño y construyo soluciones de software modernas para empresas, startups y productos digitales. Mi enfoque es crear sistemas confiables, aplicaciones escalables y plataformas interactivas que resuelvan problemas reales.",
                items: {
                    web_apps: {
                        title: "Aplicaciones Web a Medida",
                        desc: "Diseño y desarrollo de aplicaciones web personalizadas, dashboards y plataformas adaptadas a las necesidades del negocio.",
                        examples: "sistemas de gestión • plataformas SaaS • dashboards internos • sistemas de reservas"
                    },
                    ecommerce: {
                        title: "Plataformas de E-commerce",
                        desc: "Desarrollo de tiendas online modernas con catálogos de productos, carritos de compra y arquitectura escalable.",
                        examples: "tiendas minoristas • catálogos de productos • plataformas de marketplace"
                    },
                    business_software: {
                        title: "Soluciones de Software Empresarial",
                        desc: "Sistemas de software diseñados para ayudar a las empresas a automatizar procesos y gestionar operaciones.",
                        examples: "sistemas de inventario • herramientas internas • dashboards operativos"
                    },
                    ui_ux: {
                        title: "Diseño de Interfaz UI / UX",
                        desc: "Diseño de interfaces de usuario modernas e intuitivas con una sólida usabilidad y arquitectura limpia.",
                        examples: "dashboards • interfaces de aplicaciones • plataformas SaaS"
                    },
                    hosting: {
                        title: "Hosting y Despliegue",
                        desc: "Despliegue y alojamiento de sitios web y aplicaciones con rendimiento y confiabilidad optimizados.",
                        examples: "despliegue en servidores • configuración de hosting • optimización de rendimiento • soporte de mantenimiento"
                    }
                }
            },
            tech_stack: {
                badge: "Stack Tecnológico",
                title: "MI STACK TECNOLÓGICO.",
                description: "Mi experiencia abarca una amplia gama de tecnologías, lo que me permite ofrecer soluciones integrales y de vanguardia en diversas plataformas."
            },
            reviews: {
                badge: "Reseñas",
                title_start: "Lo que dicen",
                title_highlight: "mis clientes",
                subtitle: "Proyectos reales, resultados reales. La satisfacción de cada cliente es mi mayor logro.",
                stat_rating: "Rating promedio",
                stat_clients: "Clientes satisfechos",
                stat_projects: "Proyectos entregados",
                items: [
                    {
                        name: "Leandro M.",
                        role: "Fundador de Startup",
                        text: "Excelente trabajo, muy profesional. El resultado superó mis expectativas en diseño y funcionalidad.",
                        initials: "LM",
                        color: "from-violet-500 to-purple-600",
                        stars: 5
                    },
                    {
                        name: "Sofía R.",
                        role: "Directora de Marketing",
                        text: "Diseño impecable y funcionalidad perfecta. Entregó todo a tiempo con una comunicación excelente.",
                        initials: "SR",
                        color: "from-rose-500 to-pink-600",
                        stars: 5
                    },
                    {
                        name: "Carlos G.",
                        role: "CEO de E-commerce",
                        text: "Superó mis expectativas totalmente. Cada detalle estuvo cuidado y el sitio quedó de nivel premium.",
                        initials: "CG",
                        color: "from-emerald-500 to-teal-600",
                        stars: 5
                    },
                    {
                        name: "Martina L.",
                        role: "Diseñadora UX",
                        text: "Increíble atención al detalle. El código es limpio, mantenible y la experiencia de usuario es fluida.",
                        initials: "ML",
                        color: "from-orange-500 to-amber-600",
                        stars: 5
                    },
                    {
                        name: "Diego P.",
                        role: "Emprendedor Digital",
                        text: "Muy recomendable. Tomó mi idea y la transformó en un producto real y profesional en tiempo récord.",
                        initials: "DP",
                        color: "from-blue-500 to-indigo-600",
                        stars: 4.5
                    },
                    {
                        name: "Valentina C.",
                        role: "Product Manager",
                        text: "Trabajo de altísima calidad. Desde el primer contacto hasta la entrega final, todo fue perfecto.",
                        initials: "VC",
                        color: "from-cyan-500 to-sky-600",
                        stars: 5
                    },
                    {
                        name: "Nicolás F.",
                        role: "CTO de SaaS",
                        text: "Claramente conoce las últimas tendencias del desarrollo frontend. El resultado es moderno y sólido.",
                        initials: "NF",
                        color: "from-fuchsia-500 to-violet-600",
                        stars: 4.5
                    },
                    {
                        name: "Camila B.",
                        role: "Consultora de Negocios",
                        text: "Transformó nuestra presencia digital por completo. Una inversión que valió más que cualquier otra.",
                        initials: "CB",
                        color: "from-lime-500 to-green-600",
                        stars: 5
                    }
                ]
            }
        },
        en: {
            nav: {
                home: "Home",
                projects: "Projects",
                experience: "Experience",
                contact: "Contact"
            },
            hero: {
                status: "Available for strategic projects",
                title: "Santino Fonso",
                subtitle: "Software Architect",
                description: "Engineering scalable software systems and high-impact digital products. Focused on clean architecture, distributed systems, and solving complex business challenges through elegant code.",
                cta_projects: "EXPLORE ECOSYSTEM",
                cta_contact: "GET IN TOUCH"
            },
            about: {
                badge: "About Me",
                title_start: "Turning Bold Visions into",
                title_highlight: "Products",
                title_end: "of Scale.",
                description: "I am Santino Fonso, a Principal Software Architect specialized in building mission-critical digital ecosystems. My approach combines deep engineering, scalable architecture, and product strategy to deliver high-performance systems that thrive in complex environments.",
                feature1_title: "Scalability",
                feature1_desc: "Architecting systems designed for infinite growth and mission-critical reliability.",
                feature2_title: "Global Reach",
                feature2_desc: "Expertise in distributed deployments and high-availability global infrastructures.",
                feature3_title: "Product Design",
                feature3_desc: "Creating fluid, user-centric interfaces optimized for any platform or device.",
                performance: "Peak Performance",
                architecture: "Clean Architecture"
            },
            projects: {
                badge: "Professional Journey",
                title: "Professional Journey.",
                subtitle: "An ecosystem of digital products engineered with elite technical standards.",
                search_placeholder: "Search systems or technologies...",
                filter_all: "All Systems",
                filter_featured: "Featured",
                no_results_title: "NO SYSTEMS FOUND",
                no_results_desc: "COULD NOT LOCATE THE REQUESTED DIGITAL PRODUCT.",
                modal_description_label: "Description",
                modal_logs_label: "Recent Logs",
                modal_artifacts_label: "Artifacts",
                modal_open_btn: "OPEN SYSTEM INTERFACE",
                modal_restricted: "System interface restricted or under maintenance.",
                product_live: "Product Live",
                open_interface: "OPEN INTERFACE",
                items: {
                    ironforge: {
                        description: "A high-performance fitness experience with an aggressive, minimalist design. Features membership systems, interactive schedules, and elite trainer profiles."
                    },
                    luxora: {
                        description: "An ultra-luxury e-commerce experience with a minimalist editorial design. Focused on fine watchmaking, jewelry, and exclusive accessories."
                    },
                    freshmarket: {
                        description: "Premium online supermarket focused on organic products. Features a real-time cart system, advanced search, and a minimalist design."
                    },
                    "soluciones-forestales": {
                        description: "Industrial production system for forestry machinery, parts, and services. Features a real-time product catalog, detail modals, and a custom budget request system."
                    }
                }
            },
            demos: {
                common: {
                    back: "Back",
                    add_to_cart: "Add to Cart",
                    view_more: "View more",
                    contact: "Contact"
                }
            },
            contact: {
                badge: "Professional Contact",
                title: "Let's Talk Projects.",
                subtitle: "Available for strategic collaborations and high-level engineering roles.",
                form_name: "Name",
                form_email: "Email",
                form_message: "Message",
                form_submit: "SEND MESSAGE",
                success: "Message Sent!",
                success_desc: "We will get back to you shortly.",
                send_another: "Send another",
                channels_title: "Direct Channels",
                socials_title: "Professional Socials",
                quote: "Focused on solving business problems through cutting-edge technology and solid architecture.",
                error: "An error occurred. Please try again."
            },
            experience: {
                badge: "Professional Journey",
                title: "Experience",
                accent: "Strategic",
                subtitle: "A track record of growth from developing game plugins to building scalable business solutions.",
                sync: "Syncing experience...",
                error_title: "System Error",
                error_desc: "Could not load professional journey.",
                present: "Present",
                empty: "No records available.",
                milestones: {
                    age14: {
                        date: "14",
                        title: "Inception",
                        desc: "Started my engineering journey by developing custom plugins for high-traffic gaming servers, mastering the fundamentals of logic and systems."
                    },
                    security: {
                        date: "15",
                        title: "Deep Systems",
                        desc: "Immersed in cybersecurity and systems research to understand the foundational architecture of secure software environments."
                    },
                    software: {
                        date: "16",
                        title: "Core Development",
                        desc: "Pivoted towards complex software engineering, exploring distributed systems and high-performance computation."
                    },
                    professional: {
                        date: "17",
                        title: "Professional Grade",
                        desc: "Started delivering enterprise-level web and software solutions, bridging technical complexity with business value."
                    },
                    specialization: {
                        date: "18",
                        title: "Strategic Engineering",
                        desc: "Specializing in architecting mission-critical systems and scalable digital products for global tech challenges."
                    }
                },
                quote: "\"I don't just develop software. I architect solutions.\""
            },
            services: {
                badge: "Professional Services",
                title: "What I Offer.",
                description: "I design and build modern software solutions for businesses, startups, and digital products. My focus is creating reliable systems, scalable applications, and interactive platforms that solve real problems.",
                items: {
                    web_apps: {
                        title: "Custom Web Applications",
                        desc: "Design and development of custom web applications, dashboards, and platforms tailored to business needs.",
                        examples: "management systems • SaaS platforms • internal company dashboards • booking systems"
                    },
                    ecommerce: {
                        title: "E-commerce Platforms",
                        desc: "Development of modern online stores with product catalogs, shopping carts, and scalable architecture.",
                        examples: "online retail stores • product catalogs • marketplace platforms"
                    },
                    business_software: {
                        title: "Business Software Solutions",
                        desc: "Software systems designed to help companies automate processes and manage operations.",
                        examples: "inventory management systems • internal tools • operational dashboards"
                    },
                    ui_ux: {
                        title: "UI / UX Interface Design",
                        desc: "Design of modern, intuitive user interfaces with strong usability and clean architecture.",
                        examples: "dashboards • application interfaces • SaaS platforms"
                    },
                    hosting: {
                        title: "Hosting & Deployment",
                        desc: "Deployment and hosting of websites and applications with optimized performance and reliability.",
                        examples: "server deployment • hosting configuration • performance optimization • maintenance support"
                    }
                }
            },
            tech_stack: {
                badge: "MY TECH STACK",
                title: "MY TECH STACK.",
                description: "My expertise spans a diverse range of technologies, enabling me to deliver comprehensive and cutting-edge solutions across various platforms."
            },
            reviews: {
                badge: "Reviews",
                title_start: "What my",
                title_highlight: "clients say",
                subtitle: "Real projects, real results. Every client's satisfaction is my greatest achievement.",
                stat_rating: "Average rating",
                stat_clients: "Satisfied clients",
                stat_projects: "Projects delivered",
                items: [
                    {
                        name: "Leandro M.",
                        role: "Startup Founder",
                        text: "Excellent work, very professional. The result exceeded my expectations in both design and functionality.",
                        initials: "LM",
                        color: "from-violet-500 to-purple-600",
                        stars: 5
                    },
                    {
                        name: "Sofía R.",
                        role: "Marketing Director",
                        text: "Impeccable design and perfect functionality. Delivered everything on time with excellent communication.",
                        initials: "SR",
                        color: "from-rose-500 to-pink-600",
                        stars: 5
                    },
                    {
                        name: "Carlos G.",
                        role: "E-commerce CEO",
                        text: "Totally exceeded my expectations. Every detail was taken care of and the site turned out premium quality.",
                        initials: "CG",
                        color: "from-emerald-500 to-teal-600",
                        stars: 5
                    },
                    {
                        name: "Martina L.",
                        role: "UX Designer",
                        text: "Incredible attention to detail. The code is clean, maintainable and the user experience is seamless.",
                        initials: "ML",
                        color: "from-orange-500 to-amber-600",
                        stars: 5
                    },
                    {
                        name: "Diego P.",
                        role: "Digital Entrepreneur",
                        text: "Highly recommended. He took my idea and turned it into a real, professional product in record time.",
                        initials: "DP",
                        color: "from-blue-500 to-indigo-600",
                        stars: 4.5
                    },
                    {
                        name: "Valentina C.",
                        role: "Product Manager",
                        text: "Highest quality work. From the first contact to the final delivery, everything was perfect.",
                        initials: "VC",
                        color: "from-cyan-500 to-sky-600",
                        stars: 5
                    },
                    {
                        name: "Nicolás F.",
                        role: "SaaS CTO",
                        text: "Clearly knows the latest frontend development trends. The result is modern and solid.",
                        initials: "NF",
                        color: "from-fuchsia-500 to-violet-600",
                        stars: 4.5
                    },
                    {
                        name: "Camila B.",
                        role: "Business Consultant",
                        text: "Completely transformed our digital presence. An investment that was worth more than any other.",
                        initials: "CB",
                        color: "from-lime-500 to-green-600",
                        stars: 5
                    }
                ]
            }
        }
    };

    const t = (key: string) => {
        const demoPrefixes: string[] = []; // Projects are removed
        let finalKey = key;
        
        const firstPart = key.split('.')[0];
        if (demoPrefixes.includes(firstPart)) {
            finalKey = `demos.${key}`;
        }

        const keys = finalKey.split('.');
        let value = translations[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value !== undefined ? value : key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
