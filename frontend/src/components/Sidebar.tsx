"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/services/api";

const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: "🏠" },
    { name: "Areas", href: "/areas", icon: "📂" },
    { name: "Goals", href: "/goals", icon: "🎯" },
    { name: "Tasks", href: "/tasks", icon: "✅" },
    { name: "Achievements", href: "/achievements", icon: "🏆" },
    { name: "Analytics", href: "/analytics", icon: "📊" },
    { name: "Heatmap", href: "/heatmap", icon: "🔥" },
];

export default function Sidebar() {
    const pathname = usePathname();

    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get("/dashboard");

                setXp(response.data.xp);
                setLevel(response.data.level);
                setStreak(response.data.current_streak);
            } catch (error) {
                console.error(error);
            }
        };

        void fetchStats();
    }, []);

    const currentLevelXp = xp % 100;

    return (
        <aside
            style={{
                width: "260px",
                background: "#111827",
                color: "white",
                padding: "30px 20px",
                minHeight: "100vh",
                borderRight: "1px solid #374151",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h1
                style={{
                    fontSize: "28px",
                    marginBottom: "40px",
                }}
            >
                🚀 LifeOS
            </h1>

            <div>
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        style={{
                            display: "block",
                            padding: "12px 15px",
                            marginBottom: "10px",
                            borderRadius: "10px",
                            textDecoration: "none",
                            color:
                                pathname === item.href
                                    ? "#22c55e"
                                    : "white",
                            background:
                                pathname === item.href
                                    ? "#1f2937"
                                    : "transparent",
                            fontWeight:
                                pathname === item.href
                                    ? "bold"
                                    : "normal",
                            transition: "0.2s",
                        }}
                    >
                        {item.icon} {item.name}
                    </Link>
                ))}
            </div>

            <div
                style={{
                    marginTop: "auto",
                    paddingTop: "30px",
                    borderTop: "1px solid #374151",
                }}
            >
                <p
                    style={{
                        marginBottom: "10px",
                        fontWeight: "bold",
                    }}
                >
                    ⭐ Level {level}
                </p>

                <div
                    style={{
                        width: "100%",
                        height: "10px",
                        background: "#374151",
                        borderRadius: "20px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            width: `${currentLevelXp}%`,
                            height: "100%",
                            background: "#22c55e",
                            transition: "0.3s",
                        }}
                    />
                </div>

                <p
                    style={{
                        marginTop: "10px",
                        color: "#9ca3af",
                        fontSize: "14px",
                    }}
                >
                    {currentLevelXp} / 100 XP
                </p>

                <p
                    style={{
                        marginTop: "15px",
                        color: "#f59e0b",
                        fontWeight: "bold",
                    }}
                >
                    🔥 {streak} Day Streak
                </p>

                <p
                    style={{
                        marginTop: "15px",
                        color: "#9ca3af",
                    }}
                >
                    👤 Aditya Satpute
                </p>
            </div>
        </aside>
    );
}