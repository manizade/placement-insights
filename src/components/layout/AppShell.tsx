import { TopBar } from "./TopBar";
import { FilterSidebar } from "./FilterSidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <div className="flex">
        <FilterSidebar />
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1400px] px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
