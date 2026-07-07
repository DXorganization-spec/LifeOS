"use client";

interface StatCardProps {
    emoji: string;
    title: string;
    value: string | number;
}

export default function StatCard({
    emoji,
    title,
    value,
}: StatCardProps) {
    return (
        <div
            style={{
                background: "#111827",
                padding: "20px",
                borderRadius: "16px",
                border: "1px solid #374151",
                boxSizing: "border-box",
                cursor: "pointer",
                transition:
                    "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                boxShadow:
                    "0 4px 10px rgba(0,0,0,0.25)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                    "translateY(-6px)";
                e.currentTarget.style.borderColor =
                    "#22c55e";
                e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(34,197,94,0.18)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                    "translateY(0)";
                e.currentTarget.style.borderColor =
                    "#374151";
                e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0,0,0,0.25)";
            }}
        >
            <h3
                style={{
                    margin: 0,
                    color: "#9ca3af",
                    fontWeight: 500,
                    fontSize: "16px",
                }}
            >
                {emoji} {title}
            </h3>

            <h2
                style={{
                    marginTop: "18px",
                    fontSize: "clamp(24px, 5vw, 34px)",
                    fontWeight: "bold",
                    color: "white",
                }}
            >
                {value}
            </h2>
        </div>
    );
}