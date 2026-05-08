import { SimulationResult } from "../types/domain";

// Calcular valor total da simulação usando fórmula de juros compostos
export const calculateSimulation = (
  amount: number,
  installments: number,
  monthlyRate: number,
): SimulationResult => {
  const installmentValue =
    (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -installments));
  const totalToPay = installmentValue * installments;

  return {
    installmentValue,
    totalToPay,
  };
};
