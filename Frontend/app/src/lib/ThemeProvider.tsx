'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    // Initial mount: load theme from localStorage or system
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme-pref') as Theme | null;
        // Default to 'light' regardless of system theme if no saved preference exists
        const initialTheme = savedTheme || 'light';

        console.log('[ThemeProvider] Mounting. Initial:', initialTheme);
        setTheme(initialTheme);
        setMounted(true);
    }, []);

    // Sync theme to DOM and localStorage whenever it changes
    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        console.log('[ThemeProvider] Syncing DOM to:', theme);

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('theme-pref', theme);
    }, [theme, mounted]);

    const [lastToggle, setLastToggle] = useState(0);

    const toggleTheme = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const now = Date.now();
        if (now - lastToggle < 500) {
            console.log('[ThemeProvider] Ignoring double toggle (rate limit)');
            return;
        }
        setLastToggle(now);

        setTheme(prev => {
            const next = prev === 'light' ? 'dark' : 'light';
            console.log('[ThemeProvider] Toggling:', prev, '->', next);
            return next;
        });
    };

    // To prevent hydration mismatch, we can optionally return null or a loader
    // but usually, letting React render with 'light' and then syncing is better
    // if we use suppressHydrationWarning.
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
