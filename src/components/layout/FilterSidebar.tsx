import { useState } from "react";
import { Filter, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockClasses, mockStudents, examTypes } from "@/data/mockData";

export interface FilterState {
  exam: string;
  classId: string;
  studentId: string;
}

const defaultState: FilterState = {
  exam: "",
  classId: "",
  studentId: "",
};

interface FilterSidebarProps {
  value?: FilterState;
  onChange?: (state: FilterState) => void;
  onApply?: (state: FilterState) => void;
}

export function FilterSidebar({ value, onChange, onApply }: FilterSidebarProps) {
  const [internal, setInternal] = useState<FilterState>(defaultState);
  const state = value ?? internal;

  const update = (patch: Partial<FilterState>) => {
    const next = { ...state, ...patch };
    if (onChange) onChange(next);
    else setInternal(next);
  };

  const reset = () => {
    if (onChange) onChange(defaultState);
    else setInternal(defaultState);
  };

  // Filter students by selected class for a smarter UX
  const studentOptions = state.classId
    ? mockStudents.filter((s) => s.classId === state.classId)
    : mockStudents;

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
              onClick={reset}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              Temizle
            </button>
          </div>
        </div>

        <div className="space-y-5 px-5 py-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Exam
            </label>
            <Select
              value={state.exam || undefined}
              onValueChange={(v) => update({ exam: v })}
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

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Class
            </label>
            <Select
              value={state.classId || undefined}
              onValueChange={(v) => update({ classId: v, studentId: "" })}
            >
              <SelectTrigger className="h-11 w-full bg-background text-sm">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {mockClasses.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name} · {c.campus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Student
            </label>
            <Select
              value={state.studentId || undefined}
              onValueChange={(v) => update({ studentId: v })}
            >
              <SelectTrigger className="h-11 w-full bg-background text-sm">
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {studentOptions.slice(0, 50).map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.fullName}
                    <span className="ml-2 text-xs text-muted-foreground">
                      {s.studentNumber}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            type="button"
            onClick={() => onApply?.(state)}
            className="mt-2 h-10 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
          >
            Filtreleri Uygula
          </button>
        </div>
      </div>
    </aside>
  );
}
