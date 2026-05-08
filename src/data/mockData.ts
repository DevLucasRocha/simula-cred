import {
  Lead,
  LeadsTrendDataPoint,
  ValueRangeSimulation,
} from "../types/domain";

// Exportar leads iniciais para simulação do painel do gestor
export const initialLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Mariana Costa",
    whatsapp: "11988887777",
    simulatedAmount: 12000,
    installments: 24,
    createdAt: "2026-05-08T09:10:00Z",
  },
  {
    id: "lead-2",
    name: "Roberto Lima",
    whatsapp: "21999995555",
    simulatedAmount: 25000,
    installments: 36,
    createdAt: "2026-05-08T10:35:00Z",
  },
  {
    id: "lead-3",
    name: "Patricia Souza",
    whatsapp: "31977774444",
    simulatedAmount: 8000,
    installments: 18,
    createdAt: "2026-05-08T12:00:00Z",
  },
];

// Exportar simulações agrupadas por faixa de valor para o gráfico
export const simulationsByRange: ValueRangeSimulation[] = [
  { range: "1k-10k", simulations: 38 },
  { range: "10k-20k", simulations: 29 },
  { range: "20k-30k", simulations: 24 },
  { range: "30k-40k", simulations: 17 },
  { range: "40k-50k", simulations: 9 },
];
// Exportar tendência de leads dos últimos 7 dias para análise

export const leadsLast7Days: LeadsTrendDataPoint[] = [
  { day: "Sab", leads: 14 },
  { day: "Dom", leads: 11 },
  { day: "Seg", leads: 20 },
  { day: "Ter", leads: 23 },
  { day: "Qua", leads: 27 },
  { day: "Qui", leads: 31 },
  { day: "Sex", leads: 35 },
];
