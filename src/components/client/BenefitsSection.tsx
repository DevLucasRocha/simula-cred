import { BadgeCheck, HandCoins, Wallet } from "lucide-react";

// Dados dos benefícios principais da plataforma
const benefits = [
  {
    title: "Dinheiro rápido",
    description: "Processo digital para ganhar velocidade na aprovação.",
    icon: Wallet,
  },
  {
    title: "Sem burocracia",
    description: "Menos etapas operacionais para avançar sua proposta.",
    icon: HandCoins,
  },
  {
    title: "Taxas claras",
    description: "Condições transparentes para decisão com confiança.",
    icon: BadgeCheck,
  },
];

// Renderizar seção de benefícios com cards informativos
const BenefitsSection = () => (
  <section className="grid gap-4">
    {/* Iterar e exibir cada benefício em card */}
    {benefits.map((benefit) => (
      <article
        key={benefit.title}
        className="rounded-2xl border border-stone-200 bg-orange-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <benefit.icon className="h-6 w-6 text-brand-500" />
        <h3 className="mt-3 text-lg font-semibold">{benefit.title}</h3>
        <p className="mt-1 text-sm text-stone-600 dark:text-slate-300">
          {benefit.description}
        </p>
      </article>
    ))}
  </section>
);

export default BenefitsSection;
