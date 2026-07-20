"use client";

import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({
    children,
}: MainLayoutProps) {
    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const [isMobile, setIsMobile] =
        useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreen();

        window.addEventListener("resize", checkScreen);

        return () =>
            window.removeEventListener(
                "resize",
                checkScreen
            );
    }, []);

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                overflow: "hidden",
                background: "#030712",
            }}
        >
            {/* Mobile Menu Button */}
            {isMobile && (
                <button
                    onClick={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                    style={{
                        position: "fixed",
                        top: "20px",
                        left: "20px",
                        zIndex: 1001,
                        background: "#111827",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 14px",
                        cursor: "pointer",
                    }}
                >
                    ☰
                </button>
            )}

            {/* Sidebar */}
            <div
                style={{
                    position: isMobile
                        ? "fixed"
                        : "relative",
                    left:
                        isMobile && !sidebarOpen
                            ? "-280px"
                            : "0",
                    transition: "left 0.3s ease",
                    zIndex: 1000,
                    height: "100vh",
                    overflow: "hidden",
                    flexShrink: 0,
                }}
            >
                <Sidebar />
            </div>

            {/* Overlay */}
            {isMobile && sidebarOpen && (
                <div
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                    style={{
                        position: "fixed",
                        inset: 0,
                        background:
                            "rgba(0,0,0,0.5)",
                        zIndex: 999,
                    }}
                />
            )}

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    height: "100vh",
                    overflowY: "auto",
                    padding: isMobile
                        ? "80px 20px 20px"
                        : "30px",
                    boxSizing: "border-box",
                }}
            >
                {children}
            </main>
        </div>
    );
}