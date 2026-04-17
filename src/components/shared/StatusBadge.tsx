import { cn } from "@/lib/utils";

type Variant = "neutral" | "success" | "warning" | "danger" | "info" | "primary";
type Size = "sm" | "md";

const variantClasses: Record<Variant, string> = {
  neutral: "bg-muted text-muted-foreground border-border",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/15 text-warning-foreground border-warning/30",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-info/10 text-info border-info/20",
  primary: "bg-primary-soft text-primary border-primary/15",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-[11px] px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
};

export function StatusBadge({
  variant = "neutral",
  size = "sm",
  dot = false,
  children,
  className,
}: {
  variant?: Variant;
  size?: Size;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium tracking-tight",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", {
            "bg-success": variant === "success",
            "bg-warning": variant === "warning",
            "bg-destructive": variant === "danger",
            "bg-info": variant === "info",
            "bg-primary": variant === "primary",
            "bg-muted-foreground": variant === "neutral",
          })}
        />
      )}
      {children}
    </span>
  );
}
