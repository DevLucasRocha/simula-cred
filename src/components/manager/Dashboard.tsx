import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Lead,
  LeadsTrendDataPoint,
  ManagerMetrics,
  ValueRangeSimulation,
} from "../../types/domain";
import { formatCurrencyBRL, maskName } from "../../utils/formatters";

interface DashboardProps {
  metrics: ManagerMetrics;
  leads: Lead[];
  rangeData: ValueRangeSimulation[];
  trendData: LeadsTrendDataPoint[];
}

// Renderizar painel do gestor com métricas e gráficos de leads
const Dashboard = ({ metrics, leads, rangeData, trendData }: DashboardProps) => {
  // Organizar e formatar cartões de métricas
  const cards = [
    { title: "Leads Captados Hoje", value: String(metrics.leadsToday) },
    { title: "Valor Simulado", value: formatCurrencyBRL(metrics.totalSimulated) },
    { title: "Ticket Medio", value: formatCurrencyBRL(metrics.averageTicket) },
    {
      title: "Receita Potencial",
      value: formatCurrencyBRL(metrics.potentialRevenue),
    },
  ];

  return (
    <section className="space-y-6 p-4 md:p-8">
      <div>
        <h2 className="text-2xl font-bold">Painel do Gestor</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Acompanhe captacao, conversao e potencial comercial em tempo real.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Renderizar cartões de métricas do gestor */}
        {cards.map((card) => (
          <article
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {card.title}
            </p>
            <p className="mt-2 text-2xl font-bold">{card.value}</p>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Renderizar gráfico de simulações por faixa de valor */}
        <article className="h-[340px] rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <h3 className="mb-3 text-sm font-semibold">Simulacoes por Faixa de Valor</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={rangeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="simulations" fill="#6d28d9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>
{/* Renderizar gráfico de leads nos últimos 7 dias */}
        <article className="h-[340px] rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
          <h3 className="mb-3 text-sm font-semibold">Leads nos Ultimos 7 Dias</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </article>
      </div>
      {/* Renderizar tabela dos últimos leads captados */}
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          <h3 className="font-semibold">Ultimos Leads</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-left dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Valor Simulado</th>
                <th className="px-4 py-3">Parcelas</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-3">{maskName(lead.name)}</td>
                  <td className="px-4 py-3">{formatCurrencyBRL(lead.simulatedAmount)}</td>
                  <td className="px-4 py-3">{lead.installments}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
};

export default Dashboard;
