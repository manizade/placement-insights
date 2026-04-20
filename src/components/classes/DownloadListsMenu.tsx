import { useMemo, useState } from "react";
import { Download, Check, ChevronDown, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ClassRoom } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

interface DownloadListsMenuProps {
  classes: ClassRoom[];
}

/**
 * Frontend mock — multi-select dropdown.
 * Kullanıcı bir veya birden fazla sınıf (ya da tümü) seçer ve
 * "Seçilen Listeleri İndir" butonuna basarak mock indirme tetikler.
 *
 * Backend bağlandığında handleDownload içindeki toast yerine
 * gerçek fetch / blob download akışı eklenecek.
 */
export function DownloadListsMenu({ classes }: DownloadListsMenuProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");

  const allSelected = selected.size === classes.length && classes.length > 0;

  const filteredClasses = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return classes;
    return classes.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.campus.toLowerCase().includes(q),
    );
  }, [classes, query]);

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(classes.map((c) => c.id)));
    }
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDownload = () => {
    if (selected.size === 0) {
      toast.error("Lütfen en az bir sınıf seçin");
      return;
    }
    const count = selected.size;
    toast.success(
      allSelected
        ? "Tüm sınıfların listeleri hazırlanıyor"
        : `${count} sınıfın listesi hazırlanıyor`,
      { description: "İndirme başlatıldı (mock)." },
    );
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-md border bg-card px-3.5 text-sm font-medium text-foreground shadow-soft transition-colors hover:bg-muted"
        >
          <Download className="h-4 w-4 text-muted-foreground" />
          Listeleri İndir
          {selected.size > 0 && (
            <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground tabular-nums">
              {selected.size}
            </span>
          )}
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="border-b p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Sınıf seçin
            </p>
            {selected.size > 0 && (
              <button
                type="button"
                onClick={() => setSelected(new Set())}
                className="text-[11px] font-medium text-muted-foreground hover:text-foreground"
              >
                Temizle
              </button>
            )}
          </div>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Sınıf ara..."
              className="h-8 w-full rounded-md border bg-background pl-8 pr-2 text-xs outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>
        </div>

        <div className="max-h-72 overflow-y-auto py-1">
          {/* Tüm Sınıflar */}
          <button
            type="button"
            onClick={toggleAll}
            className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-muted/60"
          >
            <Checkbox checked={allSelected} />
            <span className="flex-1 text-sm font-semibold text-foreground">
              Tüm Sınıflar
            </span>
            <span className="text-[11px] text-muted-foreground tabular-nums">
              {classes.length}
            </span>
          </button>
          <div className="my-1 border-t" />
          {filteredClasses.length === 0 && (
            <p className="px-3 py-4 text-center text-xs text-muted-foreground">
              Sonuç bulunamadı
            </p>
          )}
          {filteredClasses.map((c) => {
            const checked = selected.has(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleOne(c.id)}
                className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-muted/60"
              >
                <Checkbox checked={checked} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-foreground">{c.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {c.campus} · {c.studentCount} öğrenci
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="border-t p-2">
          <button
            type="button"
            onClick={handleDownload}
            disabled={selected.size === 0}
            className="flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5" />
            Seçilen Listeleri İndir
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
        checked
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background",
      )}
    >
      {checked && <Check className="h-3 w-3" strokeWidth={3} />}
    </span>
  );
}
