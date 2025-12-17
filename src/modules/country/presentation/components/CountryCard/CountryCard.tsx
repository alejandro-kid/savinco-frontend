import { Button } from '../../../../../shared/ui/components/Button';
import { Card } from '../../../../../shared/ui/components/Card';
import type { Country, CountryCode } from '../../../domain/types';

export interface CountryCardProps {
  item: Country;
  isProcessing?: boolean;
}

const getCountryFlag = (countryCode: CountryCode): string => {
  const flags: Record<string, string> = {
    ECU: '🇪🇨',
    ESP: '🇪🇸',
    PER: '🇵🇪',
    NPL: '🇳🇵',
  };
  return flags[countryCode] || '🌍';
};

export const CountryCard = ({ item, isProcessing = false }: CountryCardProps) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className="relative">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-2xl shadow-lg">
              {getCountryFlag(item.code)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
              <p className="text-xs font-medium text-gray-500">Código: {item.code}</p>
            </div>
          </div>
        </div>

        {/* Currency Info */}
        <div className="mb-4 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white shadow-md">
          <p className="mb-1 text-xs font-medium text-white/90">Moneda Asociada</p>
          <p className="text-2xl font-bold">{item.currencyCode}</p>
        </div>

        {/* Timestamps */}
        <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>
            <p className="font-medium">Creado:</p>
            <p>{new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-medium">Actualizado:</p>
            <p>{new Date(item.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
