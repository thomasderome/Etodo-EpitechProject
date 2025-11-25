"use client";

import { ReactNode } from "react";
import ThemeTogglerButtonDemo from "./ThemeTogglerButtonDemo";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
}
