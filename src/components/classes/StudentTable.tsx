import { ChevronRight } from "lucide-react";
import type { Student } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function StudentTable({ students }: { students: Student[] }) {
  const { t, language } = useLanguage();

  const statusBadge = (s: Student["status"]) => {
    const map: Record<Student["status"], { variant: "success" | "info" | "neutral" | "warning"; key: TranslationKey }> = {
      completed: { variant: "success", key: "status.completed" },
      in_progress: { variant: "info", key: "status.in_progress" },
      absent: { variant: "neutral", key: "status.absent" },
      not_started: { variant: "warning", key: "status.not_started" },
    };
    const { variant, key } = map[s];
    return (
      <StatusBadge variant={variant} dot>
        {t(key)}
      </StatusBadge>
    );
  };

  const resultBadge = (r: Student["result"]) => {
    if (r === "passed") return <StatusBadge variant="success">{t("result.passed")}</StatusBadge>;
    if (r === "failed") return <StatusBadge variant="danger">{t("result.failed")}</StatusBadge>;
    return <StatusBadge variant="neutral">—</StatusBadge>;
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-muted/60 backdrop-blur">
            <tr className="border-b text-left">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("table.student")}
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("table.no")}
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("table.score")}
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("table.level")}
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("table.status")}
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("table.completion")}
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("table.result")}
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("table.date")}
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
                      <p className="truncate font-mono text-xs text-muted-foreground">@{s.username}</p>
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
                <td className="px-4 py-3.5">
                  <StatusBadge variant="primary">{s.level}</StatusBadge>
                </td>
                <td className="px-4 py-3.5">{statusBadge(s.status)}</td>
                <td className="px-4 py-3.5 min-w-[140px]">
                  <ProgressBar value={s.completion} showLabel tone="primary" />
                </td>
                <td className="px-4 py-3.5">{resultBadge(s.result)}</td>
                <td className="px-4 py-3.5 whitespace-nowrap text-xs text-muted-foreground tabular-nums">
                  {new Date(s.examDate).toLocaleDateString(
                    language === "tr" ? "tr-TR" : "en-US",
                  )}
                </td>
                <td className="px-4 py-3.5 text-right">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
                  >
                    {t("table.detail")}
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
