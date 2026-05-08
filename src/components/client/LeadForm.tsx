import { FormEvent } from "react";
import { LeadFormState } from "../../types/domain";

interface LeadFormProps {
  values: LeadFormState;
  successMessage: string;
  onChange: (next: LeadFormState) => void;
  onSubmit: () => void;
}

// Renderizar formulário de leads com validação
const LeadForm = ({ values, successMessage, onChange, onSubmit }: LeadFormProps) => {
  // Prevenir o comportamento padrão do formulário
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      {/* Capturar nome do cliente */}
      <input
        type="text"
        placeholder="Nome"
        value={values.name}
        onChange={(event) => onChange({ ...values, name: event.target.value })}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
      />
      {/* Capturar número de WhatsApp do cliente */}
      <input
        type="tel"
        placeholder="WhatsApp"
        value={values.whatsapp}
        onChange={(event) => onChange({ ...values, whatsapp: event.target.value })}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
      />
      {/* Renderizar botão de envio para WhatsApp */}
      <button
        type="submit"
        className="w-full rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
      >
        Garantir essa Taxa via WhatsApp
      </button>
      {/* Exibir aviso de isenção de responsabilidade */}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        *As taxas sao estimadas e podem variar de acordo com a analise de credito
        e CPF.
      </p>
      {/* Exibir mensagem de sucesso quando disponível */}
      {successMessage ? (
        <p className="text-sm font-medium text-green-500">{successMessage}</p>
      ) : null}
    </form>
  );
};

export default LeadForm;
