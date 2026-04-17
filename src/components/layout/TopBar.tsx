import { Link, useLocation } from "@tanstack/react-router";
import { Bell, GraduationCap, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/" as const, label: "Sınıflar" },
  { to: "/karneler" as const, label: "Karneler" },
];

export function TopBar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <header className="sticky top-0 z-40 border-b bg-surface/80 backdrop-blur-md">
      <div className="flex h-16 items-center gap-6 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft">
            <GraduationCap className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight text-foreground">Placement</p>
            <p className="text-[11px] font-medium text-muted-foreground">Exam Console</p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="ml-4 flex items-center gap-1">
          {navItems.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Hızlı arama..."
              className="h-9 w-64 rounded-md border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Bildirimler"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
          </button>
          <div className="ml-2 flex items-center gap-2.5 border-l pl-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
              MK
            </div>
            <div className="hidden leading-tight lg:block">
              <p className="text-xs font-semibold text-foreground">Murat Kaya</p>
              <p className="text-[11px] text-muted-foreground">Koordinatör</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
