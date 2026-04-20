import { Filter, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockClasses, mockStudents, examTypes, grades } from "@/data/mockData";
import { useFilters, type FilterState } from "./FiltersContext";
import { cn } from "@/lib/utils";
import type { Grade } from "@/types";

interface FilterSidebarProps {
  onApply?: (state: FilterState) => void;
}

export function FilterSidebar({ onApply }: FilterSidebarProps) {
  const { filters, patchFilters, resetFilters } = useFilters();

  // Class options narrow by selected grade; Student options narrow by selected class
  const classOptions = filters.grade
    ? mockClasses.filter((c) => c.grade === filters.grade)
    : mockClasses;

  const studentOptions = filters.classId
    ? mockStudents.filter((s) => s.classId === filters.classId)
    : mockStudents;

  const handleGradeChange = (g: Grade) => {
    // If grade changes, clear class & student selection so we don't keep stale selections
    patchFilters({
      grade: filters.grade === g ? "" : g,
      classId: "",
      studentId: "",
    });
  };

  return (
    <aside className="hidden w-72 shrink-0 border-r bg-sidebar lg:block">
      <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="border-b px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold tracking-tight text-foreground">
                Filtreler
              </h2>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              Temizle
            </button>
          </div>
        </div>

        <div className="space-y-5 px-5 py-6">
          {/* Exam */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Exam
            </label>
            <Select
              value={filters.exam || undefined}
              onValueChange={(v) => patchFilters({ exam: v })}
            >
              <SelectTrigger className="h-11 w-full bg-background text-sm">
                <SelectValue placeholder="Select exam" />
              </SelectTrigger>
              <SelectContent>
                {examTypes.map((e) => (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grade */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Grade
            </label>
            <Select
              value={filters.grade || undefined}
              onValueChange={(v) =>
                patchFilters({ grade: v as Grade, classId: "", studentId: "" })
              }
            >
              <SelectTrigger className="h-11 w-full bg-background text-sm">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Class */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Class
            </label>
            <Select
              value={filters.classId || undefined}
              onValueChange={(v) => patchFilters({ classId: v, studentId: "" })}
            >
              <SelectTrigger className="h-11 w-full bg-background text-sm">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classOptions.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name} · {c.campus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Student */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Student
            </label>
            <Select
              value={filters.studentId || undefined}
              onValueChange={(v) => patchFilters({ studentId: v })}
            >
              <SelectTrigger className="h-11 w-full bg-background text-sm">
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {studentOptions.slice(0, 50).map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.fullName}
                    <span className="ml-2 text-xs text-muted-foreground">
                      @{s.username}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            type="button"
            onClick={() => onApply?.(filters)}
            className="mt-2 h-10 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
          >
            Filtreleri Uygula
          </button>
        </div>
      </div>
    </aside>
  );
}
