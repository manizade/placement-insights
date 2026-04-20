import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText, Search } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ReportCardItem } from "@/components/reports/ReportCardItem";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatCard } from "@/components/shared/StatCard";
import { mockReportCards } from "@/data/mockData";

export const Route = createFileRoute("/karneler")({
  head: () => ({
    meta: [
      { title: "Karneler — Placement Exam Console" },
      {
        name: "description",
        content:
          "Tüm öğrencilerin placement sınavı karnelerini detaylı bölüm skorlarıyla inceleyin.",
      },
      { property: "og:title", content: "Karneler — Placement Exam Console" },
      {
        property: "og:description",
        content: "Bölüm bazlı detaylı placement sınavı karneleri.",
      },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "passed" | "failed">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockReportCards.filter((c) => {
      if (filter !== "all" && c.result !== filter) return false;
      if (!q) return true;
      return (
        c.studentName.toLowerCase().includes(q) ||
        c.studentNumber.toLowerCase().includes(q) ||
        c.className.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  const totalCompleted = mockReportCards.filter((c) => c.result === "passed").length;
  const avg = Math.round(
    mockReportCards.reduce((acc, c) => acc + c.overallScore, 0) / mockReportCards.length,
  );

  const tabs: { key: "all" | "passed" | "failed"; label: string }[] = [
    { key: "all", label: "Tümü" },
    { key: "passed", label: "Tamamlayan" },
    { key: "failed", label: "Tamamlamayan" },
  ];

  return (
    <AppShell>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Karneler</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Placement sınavlarından sonra üretilen öğrenci karnelerini görüntüleyin ve indirin.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Toplam Karne" value={mockReportCards.length} tone="primary" icon={FileText} />
        <StatCard label="Tamamlayan" value={totalCompleted} tone="success" />
        <StatCard label="Ortalama Skor" value={`${avg}/100`} tone="neutral" />
      </div>

      {/* Toolbar */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border bg-card p-1 shadow-soft">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={
                filter === t.key
                  ? "rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                  : "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              }
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative ml-auto w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Öğrenci, no veya sınıf ara..."
            className="h-10 w-full rounded-md border bg-card pl-10 pr-3 text-sm shadow-soft outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="mt-5">
        {filtered.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="Karne bulunamadı"
            description="Filtreleri değiştirerek veya arama terimini güncelleyerek tekrar deneyin."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((c) => (
              <ReportCardItem key={c.id} card={c} />
            ))}
          </div>
        )}
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Bu mock veridir. Backend bağlandığında gerçek karneler burada listelenecek.
            </p>
      </div>
    </AppShell>
  );
}
