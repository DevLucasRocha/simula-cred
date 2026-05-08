import { LeadFormState, SimulationResult, SimulatorState } from "../../types/domain";
import { formatCurrencyBRL } from "../../utils/formatters";
import LeadForm from "./LeadForm";

interface SimulatorCardProps {
  simulatorState: SimulatorState;
  simulationResult: SimulationResult;
  leadForm: LeadFormState;
  successMessage: string;
  onAmountChange: (amount: number) => void;
  onInstallmentsChange: (installments: number) => void;
  onLeadFormChange: (next: LeadFormState) => void;
  onLeadSubmit: () => void;
}

// Renderizar cartão de simulador com controles de entrada e formulário
const SimulatorCard = ({
  simulatorState,
  simulationResult,
  leadForm,
  successMessage,
  onAmountChange,
  onInstallmentsChange,
  onLeadFormChange,
  onLeadSubmit,
}: SimulatorCardProps) => (
  <article className="order-first rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-md dark:border-slate-700 dark:bg-slate-800 lg:order-none">
    <h2 className="text-xl font-bold">Simule seu emprestimo</h2>
    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
      Ajuste valor e parcelas para ver o custo em tempo real.
    </p>

    {/* Renderizar controles deslizantes para valor e parcelas */}
    <div className="mt-6 space-y-5">
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span>Valor</span>
          {/* Exibir valor formatado em reais */}
          <strong className="text-brand-500">
            {formatCurrencyBRL(simulatorState.amount)}
          </strong>
        </div>
        <input
          type="range"
          min={1000}
          max={50000}
          step={500}
          value={simulatorState.amount}
          onChange={(event) => onAmountChange(Number(event.target.value))}
          className="w-full accent-brand-500"
        />
      </div>

      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span>Parcelas</span>
          {/* Exibir quantidade de parcelas */}
          <strong className="text-brand-500">{simulatorState.installments}x</strong>
        </div>
        <input
          type="range"
          min={12}
          max={60}
          step={6}
          value={simulatorState.installments}
          onChange={(event) => onInstallmentsChange(Number(event.target.value))}
          className="w-full accent-brand-500"
        />
      </div>
    </div>

    {/* Exibir resumo do cálculo de simulação */}
    <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-900 sm:grid-cols-2">
      <div>
        <p className="text-xs uppercase text-slate-500 dark:text-slate-400">
          Valor da Parcela
        </p>
        <p className="text-xl font-bold">
          {formatCurrencyBRL(simulationResult.installmentValue)}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase text-slate-500 dark:text-slate-400">
          Total a Pagar
        </p>
        <p className="text-xl font-bold">
          {formatCurrencyBRL(simulationResult.totalToPay)}
        </p>
      </div>
    </div>

    {/* Renderizar formulário de captura de leads */}
    <LeadForm
      values={leadForm}
      successMessage={successMessage}
      onChange={onLeadFormChange}
      onSubmit={onLeadSubmit}
    />
  </article>
);

export default SimulatorCard;
