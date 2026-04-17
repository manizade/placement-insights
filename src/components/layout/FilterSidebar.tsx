import { useState } from "react";
import { ChevronDown, Filter, RotateCcw, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { campuses, gradeLevels, branches, examTypes } from "@/data/mockData";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b py-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

function CheckboxItem({ label, count }: { label: string; count?: number }) {
  return (
    <label className="group flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-muted">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-border-strong text-primary accent-[var(--color-primary)] focus:ring-2 focus:ring-ring/30"
      />
      <span className="flex-1 text-sm text-foreground">{label}</span>
      {typeof count === "number" && (
        <span className="text-xs tabular-nums text-muted-foreground">{count}</span>
      )}
    </label>
  );
}

export function FilterSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r bg-sidebar lg:block">
      <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="border-b px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold tracking-tight text-foreground">Filtreler</h2>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              Sıfırla
            </button>
          </div>

          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filtrelerde ara..."
              className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>
        </div>

        <div className="px-5 pb-6">
          <FilterSection title="Kampüs">
            {campuses.map((c) => (
              <CheckboxItem key={c} label={c} count={Math.floor(Math.random() * 8) + 2} />
            ))}
          </FilterSection>

          <FilterSection title="Sınıf Seviyesi">
            {gradeLevels.map((g) => (
              <CheckboxItem key={g} label={g} />
            ))}
          </FilterSection>

          <FilterSection title="Şube" defaultOpen={false}>
            <div className="flex flex-wrap gap-1.5">
              {branches.map((b) => (
                <button
                  key={b}
                  type="button"
                  className="h-8 min-w-[36px] rounded-md border bg-background px-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary-soft hover:text-primary"
                >
                  {b}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Sınav Tipi" defaultOpen={false}>
            <select className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20">
              <option value="">Tümü</option>
              {examTypes.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </FilterSection>

          <FilterSection title="Tarih Aralığı" defaultOpen={false}>
            <div className="space-y-2">
              <input
                type="date"
                className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
              <input
                type="date"
                className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </div>
          </FilterSection>

          <FilterSection title="Sonuç Durumu" defaultOpen={false}>
            <CheckboxItem label="Başarılı" />
            <CheckboxItem label="Başarısız" />
            <CheckboxItem label="Bekleyen" />
          </FilterSection>

          <button
            type="button"
            className="mt-5 h-10 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
          >
            Filtreleri Uygula
          </button>
        </div>
      </div>
    </aside>
  );
}
