import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText, Search } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ReportCardItem } from "@/components/reports/ReportCardItem";
import { DownloadReportsMenu } from "@/components/reports/DownloadReportsMenu";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatCard } from "@/components/shared/StatCard";
import { mockReportCards } from "@/data/mockData";
import { useLanguage } from "@/i18n/LanguageContext";

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
  return (
    <AppShell>
      <ReportsContent />
    </AppShell>
  );
}

function ReportsContent() {
  const { t } = useLanguage();
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
    { key: "all", label: t("reports.tabs.all") },
    { key: "passed", label: t("reports.tabs.completed") },
    { key: "failed", label: t("reports.tabs.notCompleted") },
  ];

  return (
    <>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {t("reports.title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("reports.subtitle")}</p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label={t("reports.stat.total")}
          value={mockReportCards.length}
          tone="primary"
          icon={FileText}
        />
        <StatCard label={t("reports.stat.completed")} value={totalCompleted} tone="success" />
        <StatCard label={t("reports.stat.average")} value={`${avg}/100`} tone="neutral" />
      </div>

      {/* Toolbar */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border bg-card p-1 shadow-soft">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={
                filter === tab.key
                  ? "rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                  : "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative ml-auto w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("reports.searchPlaceholder")}
            className="h-10 w-full rounded-md border bg-card pl-10 pr-3 text-sm shadow-soft outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </div>
        <DownloadReportsMenu reports={mockReportCards} />
      </div>

      {/* Cards */}
      <div className="mt-5">
        {filtered.length === 0 ? (
          <EmptyState
            icon={FileText}
            title={t("reports.empty.title")}
            description={t("reports.empty.desc")}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((c) => (
              <ReportCardItem key={c.id} card={c} />
            ))}
          </div>
        )}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t("reports.mockNote")}
        </p>
      </div>
    </>
  );
}
