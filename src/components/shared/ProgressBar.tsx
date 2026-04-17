import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  className,
  tone = "primary",
  showLabel = false,
}: {
  value: number;
  className?: string;
  tone?: "primary" | "success" | "warning" | "danger";
  showLabel?: boolean;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const toneClasses: Record<string, string> = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive",
  };
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all", toneClasses[tone])}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="min-w-[34px] text-right text-xs font-medium tabular-nums text-muted-foreground">
          {clamped}%
        </span>
      )}
    </div>
  );
}
