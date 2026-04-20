import { useState } from "react";
import { Download, Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ClassRoom } from "@/types";
import { toast } from "sonner";

interface DownloadListsMenuProps {
  classes: ClassRoom[];
}

const ALL_KEY = "__all__";

/**
 * Frontend mock — açıldığında tüm sınıfları listeleyen ve seçilen sınıfın
 * listesini "indirmiş gibi" davranan dropdown.
 *
 * Backend bağlandığında onSelect içindeki toast yerine gerçek
 * fetch / blob download akışı eklenebilir.
 */
export function DownloadListsMenu({ classes }: DownloadListsMenuProps) {
  const [selected, setSelected] = useState<string>(ALL_KEY);

  const handleSelect = (value: string) => {
    setSelected(value);
    if (value === ALL_KEY) {
      toast.success("Tüm sınıfların listeleri hazırlanıyor", {
        description: `${classes.length} sınıf için indirme başlatıldı (mock).`,
      });
    } else {
      const cls = classes.find((c) => c.id === value);
      toast.success(`${cls?.name ?? "Sınıf"} listesi hazırlanıyor`, {
        description: "İndirme başlatıldı (mock).",
      });
    }
  };

  const selectedLabel =
    selected === ALL_KEY
      ? "Tüm Sınıflar"
      : classes.find((c) => c.id === selected)?.name ?? "Tüm Sınıflar";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-md border bg-card px-3.5 text-sm font-medium text-foreground shadow-soft transition-colors hover:bg-muted"
        >
          <Download className="h-4 w-4 text-muted-foreground" />
          Listeleri İndir
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Liste seçin
        </DropdownMenuLabel>
        <DropdownMenuItem
          onSelect={() => handleSelect(ALL_KEY)}
          className="flex items-center justify-between"
        >
          <span className="font-medium">Tüm Sınıflar</span>
          {selected === ALL_KEY && <Check className="h-4 w-4 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="max-h-72 overflow-y-auto">
          {classes.map((c) => (
            <DropdownMenuItem
              key={c.id}
              onSelect={() => handleSelect(c.id)}
              className="flex items-center justify-between"
            >
              <div className="min-w-0">
                <p className="truncate text-sm">{c.name}</p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {c.campus} · {c.studentCount} öğrenci
                </p>
              </div>
              {selected === c.id && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <button
            type="button"
            onClick={() => handleSelect(selected)}
            className="flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Download className="h-3.5 w-3.5" />
            {selectedLabel} indir
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
