import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { cn } from '@/lib/utils';
import { ClientLayout } from '@/components/ClientLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
    title: "Santino Fonso - Desarrollador Full Stack",
    description: "Portfolio profesional de Santino Fonso, Ingeniero Full Stack especializado en Next.js, Python y soluciones de IA empresarial.",
    openGraph: {
        type: "website",
        locale: "es_AR",
        url: "https://fonso.dev",
        title: "Santino Fonso - Desarrollador Full Stack",
        description: "Desarrollo de sistemas digitales de alto impacto con tecnologías modernas.",
        siteName: "Fonso Dev",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={cn(outfit.variable, inter.variable, "min-h-screen bg-background font-outfit antialiased selection:bg-primary/20")}>
                <Providers>
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </Providers>
            </body>
        </html>
    );
}
