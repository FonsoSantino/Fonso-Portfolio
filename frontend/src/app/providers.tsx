'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/LanguageContext";
import { useState } from 'react';

import { CartProvider } from "@/context/CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    // Ensure QueryClient is created once per client lifecycle
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                // Prevent immediate refetching on window focus to save bandwidth
                // and avoid "flickering" UI updates.
                staleTime: 60 * 1000,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                <LanguageProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </LanguageProvider>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
