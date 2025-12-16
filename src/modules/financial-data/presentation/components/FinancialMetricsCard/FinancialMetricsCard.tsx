export interface FinancialMetricsCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  color?: 'blue' | 'indigo' | 'emerald' | 'purple';
}

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    value: 'text-blue-900',
    border: 'border-blue-200',
  },
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    value: 'text-indigo-900',
    border: 'border-indigo-200',
  },
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    value: 'text-emerald-900',
    border: 'border-emerald-200',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    value: 'text-purple-900',
    border: 'border-purple-200',
  },
};

export const FinancialMetricsCard = ({
  title,
  value,
  icon,
  color = 'blue',
}: FinancialMetricsCardProps) => {
  const colors = colorClasses[color];

  return (
    <div
      className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-5 transition-all duration-200 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className={`mb-2 text-xs font-medium uppercase tracking-wide ${colors.text}`}>
            {title}
          </div>
          <div className={`text-xl font-bold ${colors.value} sm:text-2xl md:text-2xl break-words`}>
            {formatCurrency(value)}
          </div>
        </div>
        {icon ? (
          <div className={`ml-3 flex-shrink-0 ${colors.text} opacity-70 flex items-center`}>
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  );
};
