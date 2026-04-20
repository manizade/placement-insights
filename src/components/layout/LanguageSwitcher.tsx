import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/translations";

interface FlagOption {
  code: Language;
  label: string;
  // SVG flag rendered inline so we don't depend on emoji rendering.
  flag: React.ReactNode;
}

function TurkishFlag() {
  return (
    <svg viewBox="0 0 60 40" className="h-full w-full" aria-hidden="true">
      <rect width="60" height="40" fill="#E30A17" />
      <circle cx="22" cy="20" r="8" fill="#fff" />
      <circle cx="24.5" cy="20" r="6.4" fill="#E30A17" />
      <polygon
        fill="#fff"
        points="32,20 28.2,21.2 30.5,18 30.5,22 28.2,18.8"
      />
    </svg>
  );
}

function UKFlag() {
  return (
    <svg viewBox="0 0 60 40" className="h-full w-full" aria-hidden="true">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 L60,40 M60,0 L0,40"
        stroke="#C8102E"
        strokeWidth="3"
        clipPath="inset(0)"
      />
      <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

const options: FlagOption[] = [
  { code: "tr", label: "Türkçe", flag: <TurkishFlag /> },
  { code: "en", label: "English", flag: <UKFlag /> },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-1 rounded-full border bg-card p-0.5 shadow-soft"
    >
      {options.map((opt) => {
        const active = language === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLanguage(opt.code)}
            aria-pressed={active}
            aria-label={opt.label}
            title={opt.label}
            className={cn(
              "relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full transition-all",
              active
                ? "ring-2 ring-primary ring-offset-1 ring-offset-card"
                : "opacity-60 hover:opacity-100",
            )}
          >
            <span className="block h-5 w-5 overflow-hidden rounded-full">
              {opt.flag}
            </span>
          </button>
        );
      })}
    </div>
  );
}
