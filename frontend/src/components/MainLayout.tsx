
"use client";

import { ReactNode, useState, useEffect } from "react";
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
            setIsMobile(
                window.innerWidth <= 768
            );
        };

        checkScreen();

        window.addEventListener(
            "resize",
            checkScreen
        );

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
                minHeight: "100vh",
                background: "#030712",
            }}
        >
            {/* Mobile Menu Button */}
            {isMobile && (
                <button
                    onClick={() =>
                        setSidebarOpen(
                            !sidebarOpen
                        )
                    }
                    style={{
                        position: "fixed",
                        top: "20px",
                        left: "20px",
                        zIndex: 1001,
                        background:
                            "#111827",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding:
                            "10px 14px",
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
                        isMobile &&
                        !sidebarOpen
                            ? "-280px"
                            : "0",
                    transition:
                        "left 0.3s ease",
                    zIndex: 1000,
                    height: "100vh",
                }}
            >
                <Sidebar />
            </div>

            {/* Overlay */}
            {isMobile &&
                sidebarOpen && (
                    <div
                        onClick={() =>
                            setSidebarOpen(
                                false
                            )
                        }
                        style={{
                            position:
                                "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
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
                    padding: isMobile
                        ? "80px 20px 20px"
                        : "30px",
                    overflowY: "auto",
                }}
            >
                {children}
            </main>
        </div>
    );
}

