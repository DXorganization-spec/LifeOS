
"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface WeeklyActivity {
    date: string;
    count: number;
}

export default function XPChart() {
    console.log("XPChart rendered");
    const [labels, setLabels] = useState<string[]>([]);
    const [counts, setCounts] = useState<number[]>([]);

    useEffect(() => {
        const fetchWeeklyAnalytics = async () => {
            try {
                const response = await api.get(
                    "/analytics/weekly"
                );

                console.log(
                    "Analytics response:",
                    response.data
                );

                const data = Array.isArray(response.data)
                    ? response.data
                    : [];

                setLabels(
                    data.map((item) => item.date)
                );

                setCounts(
                    data.map((item) => item.count)
                );
            } catch (error) {
                console.error(error);
            }
        };

        void fetchWeeklyAnalytics();
    }, []);

    const data = {
        labels,
        datasets: [
            {
                label: "Tasks Completed",
                data: counts,
                borderColor: "#22c55e",
                backgroundColor:
                    "rgba(34,197,94,0.3)",
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "white",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "white",
                },
            },
            y: {
                ticks: {
                    color: "white",
                },
            },
        },
    };

    return <Line data={data} options={options} />;
}

