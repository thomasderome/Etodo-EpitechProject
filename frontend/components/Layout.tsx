"use client";

import { ReactNode } from "react";
import ThemeTogglerButtonDemo from "./ThemeTogglerButtonDemo";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen relative">
            {/* ajout du bouton light/dark mode pour toutes les pages */}
            <header className="fixed top-4 right-4 z-[99999]">
                <ThemeTogglerButtonDemo
                    variant="ghost"
                    size="default"
                    direction="ltr"
                    system={true}
                />
            </header>
            <main className="p-6">{children}</main>
        </div>
    );
}
