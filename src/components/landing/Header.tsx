import { Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/brand/BrandMark";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { useI18n } from "@/i18n/I18nProvider";

export function Header() {
  const { t } = useI18n();
  return (
    <nav className="h-16 border-b border-edge bg-panel/80 backdrop-blur-md flex items-center justify-between px-6 md:px-8 sticky top-0 z-50">
      <BrandMark size="md" />
      <div className="hidden lg:flex items-center gap-6 text-sm font-mono text-steel uppercase">
        <Link to="/" className="hover:text-amber transition-colors">{t("nav.workforce")}</Link>
        <a href="#integrations" className="hover:text-amber transition-colors">{t("nav.integrations")}</a>
        <a href="#pricing" className="hover:text-amber transition-colors">{t("nav.pricing")}</a>
      </div>
      <div className="flex items-center gap-3">
        <LocaleSwitcher variant="landing" />
        <Link to="/signup" className="px-4 py-2 border border-amber text-amber text-xs font-mono uppercase hover:bg-amber hover:text-panel transition-all rounded-sm">
          {t("nav.getStarted")}
        </Link>
      </div>
    </nav>
  );
}
