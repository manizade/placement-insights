import { TopBar } from "./TopBar";
import { FilterSidebar } from "./FilterSidebar";
import { FiltersProvider } from "./FiltersContext";
import { LanguageProvider } from "@/i18n/LanguageContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <FiltersProvider>
        <div className="min-h-screen bg-background">
          <TopBar />
          <div className="flex">
            <FilterSidebar />
            <main className="min-w-0 flex-1">
              <div className="mx-auto max-w-[1400px] px-6 py-8">{children}</div>
            </main>
          </div>
        </div>
      </FiltersProvider>
    </LanguageProvider>
  );
}
