"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({
    children,
}: MainLayoutProps) {
    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "#030712",
            }}
        >
            <Sidebar />

            <main
                style={{
                    flex: 1,
                    padding: "30px",
                    overflowY: "auto",
                }}
            >
                {children}
            </main>
        </div>
    );
}