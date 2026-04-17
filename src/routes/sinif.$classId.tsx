import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ChevronRight,
  Users,
  CheckCircle2,
  Target,
  XCircle,
  ArrowLeft,
  Search,
  Download,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/shared/StatCard";
import { StudentTable } from "@/components/classes/StudentTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { getClassById, getStudentsByClassId, getClassStats } from "@/data/mockData";

export const Route = createFileRoute("/sinif/$classId")({
  loader: ({ params }) => {
    const cls = getClassById(params.classId);
    if (!cls) throw notFound();
    return { cls };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.cls.name ?? "Sınıf"} — Placement Exam Console` },
      {
        name: "description",
        content: `${loaderData?.cls.name ?? ""} sınıfının placement sınavı sonuçları ve öğrenci listesi.`,
      },
      {
        property: "og:title",
        content: `${loaderData?.cls.name ?? "Sınıf"} — Placement Exam Console`,
      },
    ],
  }),
  notFoundComponent: () => (
    <AppShell>
      <EmptyState
        title="Sınıf bulunamadı"
        description="Aradığınız sınıf mevcut değil veya silinmiş olabilir."
        action={
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Sınıflara Dön
          </Link>
        }
      />
    </AppShell>
  ),
  component: ClassDetailPage,
});

type FilterKey = "all" | "passed" | "failed" | "absent";

function ClassDetailPage() {
  const { cls } = Route.useLoaderData();
  const allStudents = useMemo(() => getStudentsByClassId(cls.id), [cls.id]);
  const stats = useMemo(() => getClassStats(cls.id), [cls.id]);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");

  const students = useMemo(() => {
    let list = allStudents;
    if (filter === "passed") list = list.filter((s) => s.result === "passed");
    if (filter === "failed") list = list.filter((s) => s.result === "failed");
    if (filter === "absent") list = list.filter((s) => s.status === "absent");
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (s) =>
          s.fullName.toLowerCase().includes(q) ||
          s.studentNumber.toLowerCase().includes(q),
      );
    }
    return list;
  }, [allStudents, filter, query]);

  const tabs: { key: FilterKey; label: string; count: number }[] = [
    { key: "all", label: "Tümü", count: stats.totalStudents },
    { key: "passed", label: "Başarılı", count: stats.passed },
    { key: "failed", label: "Başarısız", count: stats.failed },
    { key: "absent", label: "Katılmayan", count: stats.totalStudents - stats.attended },
  ];

  return (
    <AppShell>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Sınıflar
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-foreground">{cls.name}</span>
      </nav>

      {/* Header */}
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{cls.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {cls.campus} · Şube {cls.branch} · {cls.examType} ·{" "}
            {new Date(cls.lastExamDate).toLocaleDateString("tr-TR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-soft transition-colors hover:bg-muted"
        >
          <Download className="h-4 w-4" />
          Sonuçları Dışa Aktar
        </button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Toplam Öğrenci" value={stats.totalStudents} icon={Users} tone="primary" />
        <StatCard
          label="Sınava Giren"
          value={stats.attended}
          hint={`%${Math.round((stats.attended / stats.totalStudents) * 100)} katılım`}
          icon={Target}
          tone="neutral"
        />
        <StatCard
          label="Ortalama Skor"
          value={`${stats.averageScore}`}
          hint="100 üzerinden"
          icon={CheckCircle2}
          tone="success"
        />
        <StatCard
          label="Başarılı / Başarısız"
          value={`${stats.passed} / ${stats.failed}`}
          icon={XCircle}
          tone="warning"
        />
      </div>

      {/* Tabs + search */}
      <div className="mt-8 flex flex-wrap items-center gap-3 border-b">
        <div className="flex items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={
                filter === t.key
                  ? "relative px-4 py-2.5 text-sm font-semibold text-foreground"
                  : "px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {t.label}
              <span className="ml-1.5 rounded-md bg-muted px-1.5 py-0.5 text-[11px] tabular-nums text-muted-foreground">
                {t.count}
              </span>
              {filter === t.key && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
        <div className="relative ml-auto mb-2 w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Öğrenci ara..."
            className="h-9 w-full rounded-md border bg-card pl-9 pr-3 text-sm shadow-soft outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div>

      {/* Student table */}
      <div className="mt-5">
        {students.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Bu kriterlere uygun öğrenci yok"
            description="Filtreleri değiştirerek tekrar deneyin."
          />
        ) : (
          <StudentTable students={students} />
        )}
      </div>
    </AppShell>
  );
}
