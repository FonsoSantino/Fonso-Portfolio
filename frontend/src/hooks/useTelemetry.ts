"use client"

import { useState, useEffect, useCallback } from 'react';

export interface TelemetryData {
    id: string;
    temperature: number;
    usage: number;
    fuel?: number;
    efficiency: number;
    status: 'Operational' | 'Warning' | 'Critical' | 'Offline';
    lastUpdate: string;
}

export function useTelemetry(initialNodes: string[]) {
    const [nodes, setNodes] = useState<Record<string, TelemetryData>>({});

    const generateData = useCallback((id: string): TelemetryData => {
        const usage = Math.floor(Math.random() * 40) + 30; // 30-70%
        const temp = Math.floor(Math.random() * 20) + 40; // 40-60C
        const efficiency = 85 + Math.random() * 10;
        
        let status: TelemetryData['status'] = 'Operational';
        if (temp > 55) status = 'Warning';
        if (temp > 65) status = 'Critical';

        return {
            id,
            temperature: temp,
            usage,
            fuel: 100 - (Math.random() * 20),
            efficiency,
            status,
            lastUpdate: new Date().toLocaleTimeString(),
        };
    }, []);

    useEffect(() => {
        const initial: Record<string, TelemetryData> = {};
        initialNodes.forEach(id => {
            initial[id] = generateData(id);
        });
        setNodes(initial);

        const interval = setInterval(() => {
            setNodes(prev => {
                const next = { ...prev };
                Object.keys(next).forEach(id => {
                    // 20% chance to update a node each tick
                    if (Math.random() > 0.8) {
                        next[id] = generateData(id);
                    }
                });
                return next;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [initialNodes, generateData]);

    return { nodes };
}
