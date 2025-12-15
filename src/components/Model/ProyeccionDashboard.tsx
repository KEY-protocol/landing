import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Lightbulb } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface Scenario {
  year: number;
  ngos: number;
  funds: number;
  keyTotalCost: number;
  daoAmount: number;
  totalSystemCost: number;
  daoPercentageUsed: number;
  globalEfficiencyPct: number;
  daoShareOfBudget: string;
}

interface ChartDataItem {
  name: string;
  ngos: number;
  Fondos: number;
  CostoKEY: number;
  FondoDAO: number;
  globalPct: string;
  daoUsed: number;
  daoShareLabel: string;
}

export default function ProyeccionDashboard() {
  const baseFunds = 1440000;

  const calculateScenario = (
    year: number,
    ngos: number,
    daoPercentageOverride: number
  ): Scenario => {
    const multiplier = ngos / 5;
    const funds = baseFunds * multiplier;

    let keyTotalCost = 221800;
    if (year === 2027) keyTotalCost = 221800 * 1.25;
    if (year === 2028) keyTotalCost = 221800 * 1.25 * 1.25;

    const daoAmount = keyTotalCost * (daoPercentageOverride / 100);

    const totalSystemCost = keyTotalCost + daoAmount;
    const globalEfficiencyPct = (totalSystemCost / funds) * 100;

    const daoShareOfBudget =
      daoAmount > 0
        ? ((daoAmount / totalSystemCost) * 100).toFixed(1) + '%'
        : '';

    return {
      year,
      ngos,
      funds,
      keyTotalCost,
      daoAmount,
      totalSystemCost,
      daoPercentageUsed: daoPercentageOverride,
      globalEfficiencyPct,
      daoShareOfBudget,
    };
  };

  const scenario2026 = calculateScenario(2026, 5, 0);
  const scenario2027 = calculateScenario(2027, 12, 5.08);
  const scenario2028 = calculateScenario(2028, 25, 9.33);

  const data = [scenario2026, scenario2027, scenario2028];

  const chartData: ChartDataItem[] = data.map(s => ({
    name: s.year.toString(),
    ngos: s.ngos,
    Fondos: s.funds,
    CostoKEY: s.keyTotalCost,
    FondoDAO: s.daoAmount,
    globalPct: s.globalEfficiencyPct.toFixed(2),
    daoUsed: s.daoPercentageUsed,
    daoShareLabel: s.daoShareOfBudget,
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center bg-black/26 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-white">
            Tablero de Proyección KEY Protocol
          </h3>
          <p className="text-slate-300 mt-1">
            Modelo de Financiamiento I+D+i (DAO) y Eficiencia de Escala.
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-blue-900/50 px-4 py-2 rounded-lg border border-blue-500/30">
          <span className="text-xs font-bold text-blue-300 uppercase block mb-1">
            % Global
          </span>
          <span className="text-sm text-blue-100">
            Costo Total del Ecosistema (KEY + DAO) sobre Capital Gestionado.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/26 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm p-6">
          <h4 className="text-xl font-bold text-white mb-2">
            2026{' '}
            <span className="text-sm font-normal text-slate-300">(5 ONGs)</span>
          </h4>
          <div className="text-xs text-slate-300 mb-4">
            Fondos Gestionados:{' '}
            <span className="text-white font-mono">
              {formatCurrency(scenario2026.funds)}
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-slate-100 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <div className="text-xs text-slate-700 uppercase font-bold">
                  Costo KEY
                </div>
                <span className="text-xs bg-slate-300 text-slate-800 px-2 rounded-full font-bold">
                  Base
                </span>
              </div>
              <div className="text-xl font-bold text-slate-900">
                {formatCurrency(scenario2026.keyTotalCost)}
              </div>
            </div>

            <div className="p-3 bg-slate-200/20 rounded-lg border border-slate-500/30">
              <div className="flex justify-between items-center mb-1">
                <div className="text-xs text-slate-300 uppercase font-bold flex items-center gap-1">
                  <Lightbulb size={12} /> DAO (0%)
                </div>
              </div>
              <div className="text-xl font-bold text-slate-400">$0</div>
            </div>
          </div>
        </div>

        <div className="bg-black/26 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm p-6">
          <h4 className="text-xl font-bold text-white mb-2">
            2027{' '}
            <span className="text-sm font-normal text-slate-300">
              (12 ONGs)
            </span>
          </h4>
          <div className="text-xs text-slate-300 mb-4">
            Fondos Gestionados:{' '}
            <span className="text-white font-mono">
              {formatCurrency(scenario2027.funds)}
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <div className="flex justify-between items-center mb-1">
                <div className="text-xs text-indigo-800 uppercase font-bold">
                  Costo KEY
                </div>
                <span className="text-xs bg-indigo-200 text-indigo-900 px-2 rounded-full font-bold">
                  +25%
                </span>
              </div>
              <div className="text-xl font-bold text-indigo-900">
                {formatCurrency(scenario2027.keyTotalCost)}
              </div>
            </div>

            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex justify-between items-center mb-1">
                <div className="text-xs text-orange-800 uppercase font-bold flex items-center gap-1">
                  <Lightbulb size={12} /> DAO
                </div>
                <span className="text-xs bg-orange-200 text-orange-900 px-2 rounded-full font-bold">
                  {scenario2027.daoPercentageUsed}%
                </span>
              </div>
              <div className="text-xl font-bold text-orange-700">
                {formatCurrency(scenario2027.daoAmount)}
              </div>
              <div className="text-[10px] text-orange-600 mt-1">
                fondo I+D+i
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/26 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm p-6">
          <h4 className="text-xl font-bold text-white mb-2">
            2028{' '}
            <span className="text-sm font-normal text-slate-300">
              (25 ONGs)
            </span>
          </h4>
          <div className="text-xs text-slate-300 mb-4">
            Fondos Gestionados:{' '}
            <span className="text-white font-mono">
              {formatCurrency(scenario2028.funds)}
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="flex justify-between items-center mb-1">
                <div className="text-xs text-green-800 uppercase font-bold">
                  Costo KEY
                </div>
                <span className="text-xs bg-green-200 text-green-900 px-2 rounded-full font-bold">
                  +25%
                </span>
              </div>
              <div className="text-xl font-bold text-green-900">
                {formatCurrency(scenario2028.keyTotalCost)}
              </div>
            </div>

            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex justify-between items-center mb-1">
                <div className="text-xs text-orange-800 uppercase font-bold flex items-center gap-1">
                  <Lightbulb size={12} /> DAO
                </div>
                <span className="text-xs bg-orange-200 text-orange-900 px-2 rounded-full font-bold">
                  {scenario2028.daoPercentageUsed}%
                </span>
              </div>
              <div className="text-2xl font-bold text-orange-700">
                {formatCurrency(scenario2028.daoAmount)}
              </div>
              <div className="text-[10px] text-orange-600 mt-1">
                fondo I+D+i
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/26 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-sm">
        <h4 className="text-lg font-bold text-white mb-2">
          Distribución del Presupuesto Operativo
        </h4>
        <p className="text-sm text-slate-300 mb-6">
          Comparativa de Fondos (AUM) vs. Costos (KEY + DAO).
        </p>

        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="name"
                tick={{ fill: '#ffffff', fontWeight: 'bold' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={val => {
                  if (val >= 1000000) return `$${val / 1000000}M`;
                  return `$${val / 1000}k`;
                }}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#cccccc' }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(0, 0, 0, 0.5)' }}
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  name,
                ]}
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
                  backgroundColor: '#1e293b',
                  color: 'white',
                }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Legend wrapperStyle={{ color: '#ffffff' }} />

              <Bar
                dataKey="Fondos"
                name="Capital Gestionado (AUM)"
                fill="#4ade80"
                radius={[4, 4, 0, 0]}
                barSize={40}
              />

              <Bar
                dataKey="CostoKEY"
                name="Costo Operativo KEY"
                stackId="a"
                fill="#818cf8"
                barSize={40}
              />
              <Bar
                dataKey="FondoDAO"
                name="Fondo I+D+i (DAO)"
                stackId="a"
                fill="#fb923c"
                radius={[4, 4, 0, 0]}
                barSize={40}
                label={(props: any) => {
                  const { x, y, width, value, payload } = props;
                  if (!value || value <= 0 || !payload) return null;
                  const labelText = payload.daoShareLabel || '';
                  return (
                    <text
                      x={x + width / 2}
                      y={y - 5}
                      fill="#fb923c"
                      textAnchor="middle"
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {labelText}
                    </text>
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-black/26 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-300 text-xs uppercase border-b border-slate-600">
              <th className="py-3 px-4">Año</th>
              <th className="py-3 px-4">Fondos (AUM)</th>
              <th className="py-3 px-4 text-indigo-300">Costo KEY</th>
              <th className="py-3 px-4 text-orange-300">Fondo DAO</th>
              <th className="py-3 px-4 text-orange-300">Definición DAO</th>
              <th className="py-3 px-4 text-green-400 font-extrabold">
                % GLOBAL (Total/Fondos)
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {chartData.map(row => (
              <tr
                key={row.name}
                className="border-b border-slate-600 hover:bg-white/5"
              >
                <td className="py-4 px-4 font-bold text-white">
                  {row.name} ({row.ngos} ONGs)
                </td>
                <td className="py-4 px-4 font-mono text-green-400">
                  {formatCurrency(row.Fondos)}
                </td>
                <td className="py-4 px-4 font-mono text-indigo-300">
                  {formatCurrency(row.CostoKEY)}
                </td>
                <td className="py-4 px-4 font-mono text-orange-300">
                  {formatCurrency(row.FondoDAO)}
                </td>
                <td className="py-4 px-4 text-orange-300 text-xs">
                  {row.daoUsed}% sobre KEY
                </td>
                <td className="py-4 px-4 font-bold text-green-400 text-lg">
                  {row.globalPct}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
