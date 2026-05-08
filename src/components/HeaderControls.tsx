import { LayoutDashboard, Moon, Sun } from "lucide-react";

interface HeaderControlsProps {
  isDarkMode: boolean;
  isManagerView: boolean;
  onToggleTheme: () => void;
  onToggleView: () => void;
}

const HeaderControls = ({
  isDarkMode,
  isManagerView,
  onToggleTheme,
  onToggleView,
}: HeaderControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onToggleTheme}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      >
        {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        {isDarkMode ? "Modo Claro" : "Modo Escuro"}
      </button>
      <button
        type="button"
        onClick={onToggleView}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-600"
      >
        <LayoutDashboard size={16} />
        {isManagerView ? "Visão Cliente" : "Visão Gestor"}
      </button>
    </div>
  );
};

export default HeaderControls;
