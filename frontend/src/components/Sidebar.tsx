"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

    return (
        <aside
            style={{
                width: "260px",
                background: "#111827",
                color: "white",
                padding: "30px 20px",
                minHeight: "100vh",
                borderRight: "1px solid #374151",
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
                    }}
                >
                    {item.icon} {item.name}
                </Link>
            ))}
        </aside>
    );
}