export interface SimulatorState {
  amount: number;
  installments: number;
  interestRate: number;
}

export interface SimulationResult {
  installmentValue: number;
  totalToPay: number;
}

export interface LeadFormState {
  name: string;
  whatsapp: string;
}

export interface Lead extends LeadFormState {
  id: string;
  simulatedAmount: number;
  installments: number;
  createdAt: string;
}

export interface ValueRangeSimulation {
  range: string;
  simulations: number;
}

export interface LeadsTrendDataPoint {
  day: string;
  leads: number;
}

export interface ManagerMetrics {
  leadsToday: number;
  totalSimulated: number;
  averageTicket: number;
  potentialRevenue: number;
}
