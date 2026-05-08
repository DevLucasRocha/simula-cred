import { useEffect, useMemo, useState } from "react";
import HeaderControls from "./components/HeaderControls";
import BenefitsSection from "./components/client/BenefitsSection";
import SimulatorCard from "./components/client/SimulatorCard";
import Dashboard from "./components/manager/Dashboard";
import { initialLeads, leadsLast7Days, simulationsByRange } from "./data/mockData";
import { Lead, LeadFormState, ManagerMetrics, SimulatorState } from "./types/domain";
import { calculateSimulation } from "./utils/simulator";

type ViewMode = "client" | "manager";
type ThemeMode = "light" | "dark";

const initialLeadForm: LeadFormState = {
  name: "",
  whatsapp: "",
};

const App = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("client");
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [simulatorState, setSimulatorState] = useState<SimulatorState>({
    amount: 15000,
    installments: 24,
    interestRate: 0.018,
  });
  const [leadForm, setLeadForm] = useState<LeadFormState>(initialLeadForm);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const isDarkMode = themeMode === "dark";
  const isManagerView = viewMode === "manager";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const simulationResult = useMemo(
    () =>
      calculateSimulation(
        simulatorState.amount,
        simulatorState.installments,
        simulatorState.interestRate,
      ),
    [simulatorState],
  );

  const metrics: ManagerMetrics = useMemo(() => {
    const totalSimulated = leads.reduce(
      (accumulator, lead) => accumulator + lead.simulatedAmount,
      0,
    );
    const leadsToday = leads.length;
    const averageTicket = leadsToday > 0 ? totalSimulated / leadsToday : 0;

    return {
      leadsToday,
      totalSimulated,
      averageTicket,
      potentialRevenue: leadsToday * 20,
    };
  }, [leads]);

  const handleLeadSubmit = () => {
    if (!leadForm.name.trim() || !leadForm.whatsapp.trim()) {
      return;
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: leadForm.name.trim(),
      whatsapp: leadForm.whatsapp.trim(),
      simulatedAmount: simulatorState.amount,
      installments: simulatorState.installments,
      createdAt: new Date().toISOString(),
    };

    setLeads((prev) => [newLead, ...prev]);
    setLeadForm(initialLeadForm);
    setSuccessMessage("Proposta enviada!");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <header className="border-b border-slate-200 bg-white/90 p-4 backdrop-blur dark:border-slate-700 dark:bg-slate-800/80 md:p-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">
              SimulaCred
            </p>
            <h1 className="text-xl font-bold md:text-2xl">
              MVP de Captação Inteligente de Empréstimos
            </h1>
          </div>
          <HeaderControls
            isDarkMode={isDarkMode}
            isManagerView={isManagerView}
            onToggleTheme={() =>
              setThemeMode((prev) => (prev === "light" ? "dark" : "light"))
            }
            onToggleView={() =>
              setViewMode((prev) => (prev === "client" ? "manager" : "client"))
            }
          />
        </div>
      </header>

      {viewMode === "client" ? (
        <main className="mx-auto w-full max-w-7xl p-4 md:p-8">
          <section className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
            <SimulatorCard
              simulatorState={simulatorState}
              simulationResult={simulationResult}
              leadForm={leadForm}
              successMessage={successMessage}
              onAmountChange={(amount) => {
                setSuccessMessage("");
                setSimulatorState((prev) => ({ ...prev, amount }));
              }}
              onInstallmentsChange={(installments) => {
                setSuccessMessage("");
                setSimulatorState((prev) => ({ ...prev, installments }));
              }}
              onLeadFormChange={(next) => {
                setSuccessMessage("");
                setLeadForm(next);
              }}
              onLeadSubmit={handleLeadSubmit}
            />

            <div className="space-y-5">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <h2 className="text-2xl font-bold leading-tight">
                  Simule sua proposta com clareza e converta mais rapido
                </h2>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  Plataforma B2B2C para parceiros financeiros captarem leads
                  qualificados com jornada simples, mobile-first e orientada a
                  conversao.
                </p>
              </article>
              <BenefitsSection />
            </div>
          </section>
        </main>
      ) : (
        <Dashboard
          metrics={metrics}
          leads={leads}
          rangeData={simulationsByRange}
          trendData={leadsLast7Days}
        />
      )}
    </div>
  );
};

export default App;
