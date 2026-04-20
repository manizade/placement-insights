import { Link, useLocation } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import logoTest4Level from "@/assets/logo-test4level.png";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

export function TopBar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { t } = useLanguage();

  const navItems = [
    { to: "/" as const, label: t("nav.classes") },
    { to: "/karneler" as const, label: t("nav.reports") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-surface/80 backdrop-blur-md">
      <div className="flex h-16 items-center gap-6 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Test4Level">
          <img
            src={logoTest4Level}
            alt="Test4Level — Bridge to Your Next Level"
            className="h-10 w-auto object-contain"
          />
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
              placeholder={t("topbar.search")}
              className="h-9 w-64 rounded-md border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={t("topbar.notifications")}
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
          </button>
          <div className="ml-1 flex items-center gap-2.5 border-l pl-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
              MK
            </div>
            <div className="hidden leading-tight lg:block">
              <p className="text-xs font-semibold text-foreground">Murat Kaya</p>
              <p className="text-[11px] text-muted-foreground">{t("topbar.role")}</p>
            </div>
          </div>
          <div className="ml-2 border-l pl-3">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
