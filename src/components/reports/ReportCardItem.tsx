import { Download } from "lucide-react";
import type { ReportCard } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ProgressBar } from "@/components/shared/ProgressBar";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ReportCardItem({ card }: { card: ReportCard }) {
  const tone =
    card.overallScore >= 80
      ? "success"
      : card.overallScore >= 60
        ? "primary"
        : card.overallScore >= 45
          ? "warning"
          : "danger";

  return (
    <div className="rounded-xl border bg-card p-5 shadow-soft transition-shadow hover:shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
            {initials(card.studentName)}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{card.studentName}</h3>
            <p className="text-xs text-muted-foreground">
              {card.studentNumber} · {card.className}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {card.result === "passed" ? (
            <StatusBadge variant="success" dot>
              Başarılı
            </StatusBadge>
          ) : (
            <StatusBadge variant="danger" dot>
              Başarısız
            </StatusBadge>
          )}
          <StatusBadge variant="primary">{card.level}</StatusBadge>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Genel Skor
          </p>
          <p className="mt-0.5 text-3xl font-semibold tabular-nums text-foreground">
            {card.overallScore}
            <span className="text-sm font-normal text-muted-foreground">/100</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Sınav
          </p>
          <p className="text-xs font-medium text-foreground">{card.examType}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(card.examDate).toLocaleDateString("tr-TR")}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-2.5 border-t pt-4">
        {card.sections.map((sec) => (
          <div key={sec.name}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{sec.name}</span>
              <span className="tabular-nums text-muted-foreground">
                {sec.score}/{sec.max}
              </span>
            </div>
            <ProgressBar
              value={(sec.score / sec.max) * 100}
              tone={tone as "success" | "primary" | "warning" | "danger"}
              className="mt-1"
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-end border-t pt-4">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Download className="h-3.5 w-3.5" />
          İndir
        </button>
      </div>
    </div>
  );
}
