import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, Users } from "lucide-react";
import type { ClassRoom } from "@/types";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { StatusBadge } from "@/components/shared/StatusBadge";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function scoreTone(score: number): "success" | "warning" | "danger" | "primary" {
  if (score >= 80) return "success";
  if (score >= 65) return "primary";
  if (score >= 50) return "warning";
  return "danger";
}

export function ClassCard({ cls }: { cls: ClassRoom }) {
  const tone = scoreTone(cls.averageScore);
  return (
    <Link
      to="/sinif/$classId"
      params={{ classId: cls.id }}
      className="group relative flex flex-col rounded-xl border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold tracking-tight text-foreground">
              {cls.name}
            </h3>
            <StatusBadge variant="neutral" size="sm">
              Şube {cls.branch}
            </StatusBadge>
          </div>
          <p className="mt-1 truncate text-sm text-muted-foreground">{cls.campus}</p>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Öğrenci
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground tabular-nums">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            {cls.studentCount}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Son Sınav
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            {formatDate(cls.lastExamDate)}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium text-muted-foreground">Ortalama Skor</span>
          <span className="text-lg font-semibold tabular-nums text-foreground">
            {cls.averageScore}
            <span className="text-xs font-normal text-muted-foreground">/100</span>
          </span>
        </div>
        <ProgressBar value={cls.averageScore} tone={tone} className="mt-2" />
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{cls.examType}</span>
          <span className="tabular-nums">Tamamlanma %{cls.completionRate}</span>
        </div>
      </div>
    </Link>
  );
}
