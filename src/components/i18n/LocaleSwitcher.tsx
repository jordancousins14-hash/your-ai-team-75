import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n/I18nProvider";
import { LOCALES, type LocaleCode } from "@/i18n/locales";

type Variant = "landing" | "compact";

export function LocaleSwitcher({ variant = "landing" }: { variant?: Variant }) {
  const { locale, setLocale } = useI18n();
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const triggerClass =
    variant === "landing"
      ? "flex items-center gap-1.5 px-2.5 py-1.5 border border-edge text-steel hover:text-amber hover:border-amber transition-colors text-xs font-mono uppercase tracking-wider rounded-sm"
      : "flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground rounded-md";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClass} aria-label="Change language">
        <Globe className="h-3.5 w-3.5" />
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => setLocale(l.code as LocaleCode)}
            className={l.code === locale ? "bg-accent text-accent-foreground" : ""}
          >
            <span className="mr-2">{l.flag}</span>
            <span className="flex-1">{l.label}</span>
            <span className="text-xs text-muted-foreground ml-2">{l.code}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
