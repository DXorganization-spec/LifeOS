
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import PageTransition from "@/components/animations/PageTransition";
import FadeIn from "@/components/animations/FadeIn";
import AnimatedCard from "@/components/animations/AnimatedCard";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";
import api from "@/services/api";
import toast from "react-hot-toast";
import ListSkeleton from "@/components/skeletons/ListSkeleton";

interface Area {
    id: string;
    name: string;
}

export default function AreasPage() {
    const [areas, setAreas] = useState<Area[]>([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] =
        useState("");
    const [editName, setEditName] =
        useState("");

    const fetchAreas = async () => {
        try {
            setLoading(true);
            const response = await api.get("/areas");
            setAreas(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load areas.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAreas();
    }, []);


    const createArea = async () => {
        if (!name.trim()) {
            toast.error("Please enter an area name.");
            return;
        }

        try {
            await api.post("/areas", {
                name: name.trim(),
            });

            setName("");

            await fetchAreas();

            toast.success("Area created successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create area.");
        }
    };

    const updateArea = async (areaId: string) => {
        if (!editName.trim()) {
            toast.error("Area name cannot be empty.");
            return;
        }

        try {
            await api.put(`/areas/${areaId}`, {
                name: editName.trim(),
            });

            setEditingId("");
            setEditName("");

            await fetchAreas();

            toast.success("Area updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update area.");
        }
    };

    const deleteArea = async (areaId: string) => {
        const confirmed = window.confirm(
            "Delete this area?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/areas/${areaId}`);

            await fetchAreas();
            toast.success("Area deleted successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete area.");
        }
    };

    return (
        <PageTransition>
            <div
                style={{
                    padding: "20px",
                    color: "white",
                    width: "100%",
                    maxWidth: "1100px",
                    margin: "0 auto",
                    boxSizing: "border-box",
                }}
            >
                {loading ? (
                    <ListSkeleton count={5} />
                ) : (
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: 0.1,
                            }}
                        >
                            <h1
                                style={{
                                    fontSize:
                                        "clamp(28px, 6vw, 40px)",
                                    marginBottom: "30px",
                                }}
                            >
                                📂 Areas
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: 0.15,
                            }}
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px",
                                marginBottom: "30px",
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Area Name"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                style={{
                                    flex: 1,
                                    minWidth: "220px",
                                    padding: "12px",
                                    borderRadius:
                                        "10px",
                                    border:
                                        "1px solid #374151",
                                    background:
                                        "#111827",
                                    color: "white",
                                }}
                            />

                            <motion.button
                                onClick={createArea}
                                disabled={!name.trim()}
                                whileHover={
                                    name.trim()
                                        ? {
                                            scale: 1.05,
                                            boxShadow:
                                                "0 8px 20px rgba(34,197,94,0.25)",
                                        }
                                        : {}
                                }
                                whileTap={
                                    name.trim()
                                        ? { scale: 0.98 }
                                        : {}
                                }
                                transition={{
                                    duration: 0.2,
                                }}
                                style={{
                                    padding: "12px 20px",
                                    borderRadius: "10px",
                                    border: "none",
                                    background: name.trim() ? "#22c55e" : "#4b5563",
                                    color: "white",
                                    cursor: name.trim() ? "pointer" : "not-allowed",
                                }}
                            >
                                Add Area
                            </motion.button>
                        </motion.div>

                        <AnimatePresence mode="popLayout">
                            {areas.map((area) => (
                                <motion.div
                                    key={area.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeOut",
                                    }}
                                    whileHover={
                                        editingId !== area.id
                                            ? {
                                                y: -4,
                                                scale: 1.01,
                                                boxShadow:
                                                    "0 10px 30px rgba(34,197,94,0.15)",
                                            }
                                            : {}
                                    }
                                    style={{
                                        marginBottom:
                                            "15px",
                                        background:
                                            "#111827",
                                        border:
                                            "1px solid #374151",
                                        borderRadius:
                                            "14px",
                                        padding: "20px",
                                    }}
                                >
                                    {editingId ===
                                        area.id ? (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                            }}
                                        >
                                            <input
                                                value={
                                                    editName
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    setEditName(
                                                        e.target
                                                            .value
                                                    )
                                                }
                                                style={{
                                                    width:
                                                        "100%",
                                                    padding:
                                                        "12px",
                                                    borderRadius:
                                                        "10px",
                                                    border:
                                                        "1px solid #374151",
                                                    background:
                                                        "#030712",
                                                    color:
                                                        "white",
                                                    boxSizing:
                                                        "border-box",
                                                }}
                                            />

                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    flexWrap:
                                                        "wrap",
                                                    gap:
                                                        "10px",
                                                    marginTop:
                                                        "15px",
                                                }}
                                            >
                                                <motion.button
                                                    onClick={() =>
                                                        updateArea(
                                                            area.id
                                                        )
                                                    }
                                                    whileHover={{
                                                        scale: 1.05,
                                                        boxShadow:
                                                            "0 6px 15px rgba(34,197,94,0.3)",
                                                    }}
                                                    whileTap={{
                                                        scale: 0.95,
                                                    }}
                                                    style={{
                                                        padding:
                                                            "10px 20px",
                                                        border:
                                                            "none",
                                                        borderRadius:
                                                            "10px",
                                                        background:
                                                            "#22c55e",
                                                        color:
                                                            "white",
                                                        cursor:
                                                            "pointer",
                                                    }}
                                                >
                                                    Save
                                                </motion.button>

                                                <motion.button
                                                    onClick={() => {
                                                        setEditingId(
                                                            ""
                                                        );
                                                        setEditName(
                                                            ""
                                                        );
                                                    }}
                                                    whileHover={{
                                                        scale: 1.05,
                                                        boxShadow:
                                                            "0 6px 15px rgba(107,114,128,0.3)",
                                                    }}
                                                    whileTap={{
                                                        scale: 0.95,
                                                    }}
                                                    style={{
                                                        padding:
                                                            "10px 20px",
                                                        border:
                                                            "none",
                                                        borderRadius:
                                                            "10px",
                                                        background:
                                                            "#6b7280",
                                                        color:
                                                            "white",
                                                        cursor:
                                                            "pointer",
                                                    }}
                                                >
                                                    Cancel
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                            }}
                                        >
                                            <strong
                                                style={{
                                                    fontSize:
                                                        "18px",
                                                }}
                                            >
                                                {area.name}
                                            </strong>

                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    flexWrap:
                                                        "wrap",
                                                    gap:
                                                        "10px",
                                                    marginTop:
                                                        "15px",
                                                }}
                                            >
                                                <motion.button
                                                    onClick={() => {
                                                        setEditingId(
                                                            area.id
                                                        );
                                                        setEditName(
                                                            area.name
                                                        );
                                                    }}
                                                    whileHover={{
                                                        scale: 1.05,
                                                        boxShadow:
                                                            "0 6px 15px rgba(37,99,235,0.3)",
                                                    }}
                                                    whileTap={{
                                                        scale: 0.95,
                                                    }}
                                                    style={{
                                                        padding:
                                                            "10px 20px",
                                                        border:
                                                            "none",
                                                        borderRadius:
                                                            "10px",
                                                        background:
                                                            "#2563eb",
                                                        color:
                                                            "white",
                                                        cursor:
                                                            "pointer",
                                                    }}
                                                >
                                                    Edit
                                                </motion.button>

                                                <motion.button
                                                    onClick={() =>
                                                        deleteArea(
                                                            area.id
                                                        )
                                                    }
                                                    whileHover={{
                                                        scale: 1.05,
                                                        boxShadow:
                                                            "0 6px 15px rgba(220,38,38,0.3)",
                                                    }}
                                                    whileTap={{
                                                        scale: 0.95,
                                                    }}
                                                    style={{
                                                        padding:
                                                            "10px 20px",
                                                        border:
                                                            "none",
                                                        borderRadius:
                                                            "10px",
                                                        background:
                                                            "#dc2626",
                                                        color:
                                                            "white",
                                                        cursor:
                                                            "pointer",
                                                    }}
                                                >
                                                    Delete
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </>
                )}
            </div>
        </PageTransition>
    );
}

