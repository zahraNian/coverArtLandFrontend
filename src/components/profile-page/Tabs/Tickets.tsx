"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import RetryError from "@/components/common/RetryError";
import NoDataFound from "@/components/common/NoDataFound";
import { createApiClient } from "@/lib/api";
import { useTicketsStore } from "@/store/tickets";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

type TicketStatus = "open" | "pending" | "resolved" | "closed" | string;

type TicketDTO = {
    id: string | number;
    subject: string;
    status: TicketStatus;
    createdAt?: string;
    updatedAt?: string;
    reference?: string;
    messages?: { by: string; at: string; text: string; read?: boolean }[];
};

export default function Tickets() {
    const [tickets, setTickets] = useState<TicketDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeId, setActiveId] = useState<string | number | null>(null);
    const [newSubject, setNewSubject] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [replyText, setReplyText] = useState("");
    const incrementUnread = useTicketsStore((s) => s.incrementUnread);
    const setUnreadCount = useTicketsStore((s) => s.setUnreadCount);

    const active = useMemo(() => tickets.find((t) => t.id === activeId) || null, [tickets, activeId]);

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const api = createApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_BASE });
            const res = await api.withAuth.get<any>("/tickets", { cache: "no-store" });
            const data = Array.isArray((res as any)?.data)
                ? ((res as any).data as TicketDTO[])
                : Array.isArray(res)
                    ? (res as TicketDTO[])
                    : [];
            setTickets(data);
            const unread = data.reduce((acc, t) => acc + (t.messages || []).filter((m) => m.by === "support" && !m.read).length, 0);
            setUnreadCount(unread);
            if (data.length) setActiveId(data[0].id);
        } catch (e: any) {
              setError(e?.message || "Failed to load tickets");
        } finally {
            setTickets((prev) => {
                if (prev && prev.length > 0) return prev;
                const mock: TicketDTO[] = [
                    {
                        id: "TK-1001",
                        subject: "Issue downloading purchased cover",
                        status: "open",
                        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
                        updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                        reference: "ORD-98234",
                        messages: [
                            { by: "user", at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), text: "Download link not working.", read: true },
                            { by: "support", at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), text: "We are checking this for you.", read: false },
                        ],
                    },
                    {
                        id: "TK-1002",
                        subject: "Refund2 request for accidental purchase",
                        status: "pending",
                        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
                        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
                        reference: "ORD-98235",
                        messages: [
                            { by: "user", at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), text: "Requested refund.", read: true },
                        ],
                    },
                    {
                        id: "TK-1003",
                        subject: "Refund3 request for accidental purchase",
                        status: "pending",
                        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
                        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
                        reference: "ORD-98235",
                        messages: [
                            { by: "user", at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), text: "Requested refund.", read: true },
                        ],
                    },
                    {
                        id: "TK-1004",
                        subject: "Refund request for accidental purchase",
                        status: "pending",
                        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
                        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
                        reference: "ORD-98235",
                        messages: [
                            { by: "user", at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), text: "Requested refund.", read: true },
                        ],
                    },
                    {
                        id: "TK-1005",
                        subject: "Refund5 request for accidental purchase",
                        status: "pending",
                        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
                        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
                        reference: "ORD-98235",
                        messages: [
                            { by: "user", at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), text: "Requested refund.", read: true },
                        ],
                    },
                    {
                        id: "TK-1006",
                        subject: "Refund6 request for accidental purchase",
                        status: "pending",
                        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
                        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
                        reference: "ORD-98235",
                        messages: [
                            { by: "user", at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), text: "Requested refund.", read: true },
                        ],
                    },
                ];
                const unread = mock.reduce((acc, t) => acc + (t.messages || []).filter((m) => m.by === "support" && !m.read).length, 0);
                setUnreadCount(unread);
                return mock;
            });
            setActiveId((prevId) => prevId ?? "TK-1001");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    useEffect(() => {
        if (!active) return;
        setTickets((prev) =>
            prev.map((t) =>
                t.id === active.id
                    ? { ...t, messages: (t.messages || []).map((m) => ({ ...m, read: m.by === "support" ? true : m.read })) }
                    : t
            )
        );
    }, [active?.id]);

    const createTicket = useCallback(async () => {
        const subject = newSubject.trim();
        const text = newMessage.trim();
        if (!subject || !text) return;
        try {
            const api = createApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_BASE });
            await api.withAuth.post<any>("/tickets", { subject, text });
        } catch { }
        const now = new Date().toISOString();
        const id = `TK-${Date.now()}`;
        const ticket: TicketDTO = {
            id,
            subject,
            status: "open",
            createdAt: now,
            updatedAt: now,
            messages: [{ by: "user", at: now, text, read: true }],
        };
        setTickets((prev) => [ticket, ...prev]);
        setActiveId(id);
        setNewSubject("");
        setNewMessage("");
    }, [newSubject, newMessage]);

    const sendReply = useCallback(async () => {
        if (!active) return;
        const text = replyText.trim();
        if (!text) return;
        const now = new Date().toISOString();
        try {
            const api = createApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_BASE });
            await api.withAuth.post<any>(`/tickets/${active.id}/reply`, { text });
        } catch { }
        setTickets((prev) =>
            prev.map((t) =>
                t.id === active.id
                    ? {
                        ...t,
                        updatedAt: now,
                        messages: [...(t.messages || []), { by: "user", at: now, text, read: true }],
                    }
                    : t
            )
        );
        setReplyText("");
        setTimeout(() => {
            const at = new Date().toISOString();
            setTickets((prev) =>
                prev.map((t) =>
                    t.id === active.id
                        ? {
                            ...t,
                            updatedAt: at,
                            messages: [...(t.messages || []), { by: "support", at, text: "Thanks for the update. We will get back to you shortly.", read: false }],
                        }
                        : t
                )
            );
            incrementUnread(1);
        }, 1200);
    }, [active?.id, replyText, incrementUnread]);

    if (loading) {
        return <div className="p-4 text-sm text-gray-600 border rounded-xl bg-gray-50">Loading tickets…</div>;
    }

    if (error) {
        return (
            <div className="p-4">
                <RetryError message={error} onRetry={fetchTickets} />
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <div className="border rounded-xl p-3 bg-white">
                <div className="text-sm font-medium mb-2">Create new ticket</div>
                <input
                    className="w-full border rounded-md px-3 py-2 mb-2 text-sm"
                    placeholder="Subject"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                />
                <textarea
                    className="w-full border rounded-md px-3 py-2 mb-2 text-sm min-h-[80px]"
                    placeholder="Describe your issue"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={createTicket} className="w-full bg-black text-white rounded-md py-2 text-sm">Submit</button>
            </div>

            <div className="border rounded-xl bg-white divide-y">
                {tickets.length === 0 && (
                    <div className="p-4">
                        <NoDataFound title="No tickets" />
                    </div>
                )}
                {tickets.map((t) => {
                    const updated = t.updatedAt ? new Date(t.updatedAt).toLocaleString() : "";
                    const hasUnread = (t.messages || []).some((m) => m.by === "support" && !m.read);
                    return (
                        <div key={String(t.id)} className="">
                            <button
                                className={`w-full text-left p-3 hover:bg-gray-50 ${activeId === t.id ? "bg-gray-50" : ""}`}
                                onClick={() => setActiveId(activeId === t.id ? null : t.id)}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="font-medium text-sm truncate">{t.subject}</div>
                                        {hasUnread && <span className="ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] text-[11px] leading-none rounded-full bg-red-600 text-white px-1">New</span>}
                                    </div>
                                    {activeId === t.id ? (
                                        <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-black/60" />
                                    ) : (
                                        <ChevronDownIcon className="h-4 w-4 flex-shrink-0 text-black/60" />
                                    )}
                                </div>
                                <div className="text-[11px] text-black/60">{updated}</div>
                            </button>
                            {activeId === t.id && (
                                <div className="p-3 border-t bg-white">
                                    <div className="mb-2">
                                        <div className="font-medium">{t.subject}</div>
                                        <div className="text-xs text-black/60">ID: {t.id}</div>
                                    </div>
                                    <div className="space-y-3 max-h-[360px] overflow-y-auto">
                                        {(t.messages || []).map((m, idx) => (
                                            <div key={idx} className={`p-3 rounded-lg max-w-[85%] ${m.by === "user" ? "bg-gray-100 ml-auto" : "bg-blue-50"}`}>
                                                <div className="text-[11px] text-black/60 mb-1">{m.by} • {new Date(m.at).toLocaleString()}</div>
                                                <div className="text-sm">{m.text}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 flex items-center gap-2">
                                        <input
                                            className="flex-1 border rounded-md px-3 py-2 text-sm"
                                            placeholder="Type your reply"
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault();
                                                    sendReply();
                                                }
                                            }}
                                        />
                                        <button onClick={sendReply} className="bg-black text-white rounded-md px-4 py-2 text-sm">Send</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
