import { useEffect, useMemo, useState } from "react";
import { Github, Linkedin } from "lucide-react";
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
  // Gerenciar estado da aplicação (modo de visualização, tema, simulador)
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

  // Aplicar classe dark ao elemento raiz quando tema escuro for ativado
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Calcular resultado da simulação baseado no estado atual
  const simulationResult = useMemo(
    () =>
      calculateSimulation(
        simulatorState.amount,
        simulatorState.installments,
        simulatorState.interestRate,
      ),
    [simulatorState],
  );

  // Calcular métricas agregadas dos leads para o painel do gestor
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

  // Processar envio de formulário de lead e redirecionar para WhatsApp
  const handleLeadSubmit = () => {
    if (!leadForm.name.trim() || !leadForm.whatsapp.trim()) {
      return;
    }

    // Criar novo lead com informações da simulação
    // 1. Salvar lead no painel (guardar número do cliente na tabela)
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: leadForm.name.trim(),
      whatsapp: leadForm.whatsapp.trim(), // <--- Contato do cliente
      simulatedAmount: simulatorState.amount,
      installments: simulatorState.installments,
      createdAt: new Date().toISOString(),
    };

    setLeads((prev) => [newLead, ...prev]);

    // 2. Preparar envio da mensagem
    // Colocar aqui o seu número (com 55, DDD e o número). Ex: 5598912345678
    const numeroDaEmpresa = "5598999999999";

    // Formatar valor da simulação para o padrão brasileiro
    const valorFormatado = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(simulatorState.amount);

    // Montar mensagem de WhatsApp com dados da simulação
    // Dica de Sênior: Colocar número que ele digitou no texto, caso o WhatsApp que ele esteja usando seja de outra pessoa.
    const textoWhatsApp = `Olá! Meu nome é ${leadForm.name.trim()}.\nContato deixado no site: ${leadForm.whatsapp.trim()}\n\nAcabei de fazer uma simulação no Smart Crédito:\n- Valor: *${valorFormatado}*\n- Parcelas: *${simulatorState.installments}x*\n\nGostaria de garantir minha taxa!`;

    // Criar URL de API do WhatsApp para o número da empresa
    const url = `https://wa.me/${numeroDaEmpresa}?text=${encodeURIComponent(textoWhatsApp)}`;

    // Limpar formulário e abrir WhatsApp em nova aba
    setLeadForm(initialLeadForm);
    setSuccessMessage("Redirecionando para o nosso WhatsApp...");

    window.open(url, "_blank");
  };

  return (
    // Renderizar container principal com suporte a tema claro/escuro
    <div className="min-h-screen bg-stone-100 dark:bg-slate-900 text-stone-900 dark:text-slate-50 transition-colors duration-300">
      {/* Renderizar cabeçalho com logo e controles */}
      <header className="border-b border-stone-200 bg-orange-50/90 p-4 backdrop-blur dark:border-slate-700 dark:bg-slate-800/80 md:p-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">
              Smart Crédito
            </p>
            <h1 className="text-xl font-bold md:text-2xl">
              Captação Inteligente de Empréstimos
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
        // Renderizar visualização do cliente com simulador e benefícios
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
              <article className="rounded-2xl border border-stone-200 bg-orange-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <h2 className="text-2xl font-bold leading-tight">
                  Simule sua proposta com clareza
                  <br />
                  e converta mais rapido
                </h2>
                <p className="mt-3 text-sm text-stone-600 dark:text-slate-300">
                  Plataforma B2B2C para parceiros financeiros captarem leads
                  qualificados
                  <br />
                  com jornada simples, mobile-first e orientada a
                  conversao.
                </p>
              </article>
              <BenefitsSection />
            </div>
          </section>
        </main>
      ) // Renderizar visualização do gestor com painel de métricas
        : (
          <Dashboard
            metrics={metrics}
            leads={leads}
            rangeData={simulationsByRange}
            trendData={leadsLast7Days}
          />
        )}
      <footer className="border-t border-slate-200 dark:border-slate-700 bg-stone-100 dark:bg-slate-900">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 p-4 sm:flex-row md:p-6">
          <p className="text-sm text-stone-600 dark:text-slate-300">
            Desenvolvedor: Lucas Rocha
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/DevLucasRocha/smart-credito"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 hover:text-brand-500 transition-colors dark:text-slate-300"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/lucas-hssrs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 hover:text-brand-500 transition-colors dark:text-slate-300"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </footer>    </div>
  );
};

export default App;