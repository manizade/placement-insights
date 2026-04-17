import { ChevronRight } from "lucide-react";
import type { Student } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ProgressBar } from "@/components/shared/ProgressBar";

function statusBadge(s: Student["status"]) {
  switch (s) {
    case "completed":
      return <StatusBadge variant="success" dot>Tamamlandı</StatusBadge>;
    case "in_progress":
      return <StatusBadge variant="info" dot>Devam Ediyor</StatusBadge>;
    case "absent":
      return <StatusBadge variant="neutral" dot>Katılmadı</StatusBadge>;
    case "not_started":
      return <StatusBadge variant="warning" dot>Başlamadı</StatusBadge>;
  }
}

function resultBadge(r: Student["result"]) {
  switch (r) {
    case "passed":
      return <StatusBadge variant="success">Başarılı</StatusBadge>;
    case "failed":
      return <StatusBadge variant="danger">Başarısız</StatusBadge>;
    case "pending":
      return <StatusBadge variant="neutral">—</StatusBadge>;
  }
}

function levelBadge(level: Student["level"]) {
  return <StatusBadge variant="primary">{level}</StatusBadge>;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function StudentTable({ students }: { students: Student[] }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-muted/60 backdrop-blur">
            <tr className="border-b text-left">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Öğrenci
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                No
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Skor
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Seviye
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Durum
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Tamamlanma
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Sonuç
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Tarih
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {students.map((s) => (
              <tr
                key={s.id}
                className="group cursor-pointer transition-colors hover:bg-muted/40"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                      {initials(s.fullName)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{s.fullName}</p>
                      <p className="truncate text-xs text-muted-foreground">{s.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 font-mono text-xs text-muted-foreground tabular-nums">
                  {s.studentNumber}
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-sm font-semibold tabular-nums text-foreground">
                    {s.status === "absent" ? "—" : s.score}
                  </span>
                </td>
                <td className="px-4 py-3.5">{levelBadge(s.level)}</td>
                <td className="px-4 py-3.5">{statusBadge(s.status)}</td>
                <td className="px-4 py-3.5 min-w-[140px]">
                  <ProgressBar value={s.completion} showLabel tone="primary" />
                </td>
                <td className="px-4 py-3.5">{resultBadge(s.result)}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-xs text-muted-foreground tabular-nums">
                  {new Date(s.examDate).toLocaleDateString("tr-TR")}
                </td>
                <td className="px-4 py-3.5 text-right">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
                  >
                    Detay
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
