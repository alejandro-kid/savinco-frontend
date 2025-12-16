import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { FinancialDataByCountrySummary } from '../../domain/types';

type CountryBreakdownChartProps = {
  data: Array<FinancialDataByCountrySummary>;
};

const THOUSAND_DIVISOR = 1000;

const formatCurrencyInThousands = (value: number): string => {
  const valueInThousands = value / THOUSAND_DIVISOR;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(valueInThousands);
};

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);

export const CountryBreakdownChart = ({ data }: CountryBreakdownChartProps) => {
  const chartData = data.map((item) => ({
    name: item.countryName,
    'Capital Ahorrado': item.capitalSaved / THOUSAND_DIVISOR,
    'Capital Prestado': item.capitalLoaned / THOUSAND_DIVISOR,
    Utilidades: item.profitsGenerated / THOUSAND_DIVISOR,
    Total: (item.capitalSaved + item.capitalLoaned + item.profitsGenerated) / THOUSAND_DIVISOR,
  }));

  return (
    <div className="w-full">
      <div className="mb-2 text-center">
        <p className="text-xs text-gray-500">Valores mostrados en miles (×1,000 USD)</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
            className="text-xs"
            tick={{ fill: '#6b7280' }}
          />
          <YAxis
            tickFormatter={(value) => formatCurrencyInThousands(value * THOUSAND_DIVISOR)}
            className="text-xs"
            tick={{ fill: '#6b7280' }}
            label={{
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: '#6b7280' },
            }}
          />
          <Tooltip
            formatter={(value: number | undefined) => {
              if (value === undefined) return '';
              // El valor ya viene dividido por 1000, así que lo multiplicamos de vuelta para mostrar el valor real
              const realValue = value * THOUSAND_DIVISOR;
              return formatCurrency(realValue);
            }}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '0.5rem',
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '1rem' }}
            iconType="square"
            formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
          />
          <Bar
            dataKey="Capital Ahorrado"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            name="Capital Ahorrado"
          />
          <Bar
            dataKey="Capital Prestado"
            fill="#6366f1"
            radius={[4, 4, 0, 0]}
            name="Capital Prestado"
          />
          <Bar dataKey="Utilidades" fill="#10b981" radius={[4, 4, 0, 0]} name="Utilidades" />
          <Bar dataKey="Total" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
