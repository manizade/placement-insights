import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ClassCard } from "@/components/classes/ClassCard";
import { mockClasses } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sınıflar — Placement Exam Console" },
      {
        name: "description",
        content:
          "Tüm sınıfların placement sınavı sonuçlarını, ortalamalarını ve katılım oranlarını tek ekranda görün.",
      },
      { property: "og:title", content: "Sınıflar — Placement Exam Console" },
      {
        property: "og:description",
        content: "Sınıf bazlı placement sınavı yönetim paneli.",
      },
    ],
  }),
  component: ClassesPage,
});

type SortKey = "name" | "score" | "date";

function ClassesPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("name");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = mockClasses.filter(
      (c) =>
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.campus.toLowerCase().includes(q) ||
        c.gradeLevel.toLowerCase().includes(q),
    );
    items = [...items].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "score") return b.averageScore - a.averageScore;
      return new Date(b.lastExamDate).getTime() - new Date(a.lastExamDate).getTime();
    });
    return items;
  }, [query, sort]);

  return (
    <AppShell>
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Sınıflar</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tüm sınıfların placement sınavı sonuçlarını ve performansını görüntüleyin.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border bg-card p-1 shadow-soft">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
              )}
              aria-label="Kart görünümü"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
              )}
              aria-label="Liste görünümü"
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sınıf, kampüs veya seviye ara..."
            className="h-10 w-full rounded-md border bg-card pl-10 pr-3 text-sm shadow-soft outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </div>
        <div className="flex items-center gap-2 rounded-md border bg-card px-3 shadow-soft">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-10 bg-transparent pr-1 text-sm outline-none"
          >
            <option value="name">İsme göre</option>
            <option value="score">Skora göre</option>
            <option value="date">Tarihe göre</option>
          </select>
        </div>
        <div className="ml-auto text-xs text-muted-foreground">
          <span className="font-semibold text-foreground tabular-nums">{filtered.length}</span>{" "}
          sınıf gösteriliyor
        </div>
      </div>

      {/* Grid */}
      <div
        className={cn(
          "mt-6",
          view === "grid"
            ? "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
            : "flex flex-col gap-3",
        )}
      >
        {filtered.map((cls) => (
          <ClassCard key={cls.id} cls={cls} />
        ))}
      </div>
    </AppShell>
  );
}
