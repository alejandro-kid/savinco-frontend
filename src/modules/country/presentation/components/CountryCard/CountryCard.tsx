import { useTrackedButton } from '../../../../../shared/analytics';
import { Button } from '../../../../../shared/ui/components/Button';
import { Card } from '../../../../../shared/ui/components/Card';
import type { Country, CountryCode } from '../../../domain/types';

export interface CountryCardProps {
  item: Country;
  onDelete: (code: CountryCode) => void;
  isProcessing?: boolean;
}

const getCountryFlag = (countryCode: CountryCode): string => {
  // Mapeo de códigos de país a emojis de banderas
  // Si no hay mapeo, usar emoji genérico
  const flags: Record<string, string> = {
    ECU: '🇪🇨',
    ESP: '🇪🇸',
    PER: '🇵🇪',
    NPL: '🇳🇵',
    // Agregar más países según sea necesario
    ENG: '🇬🇧',
    GBR: '🇬🇧',
    USA: '🇺🇸',
    MEX: '🇲🇽',
    COL: '🇨🇴',
    ARG: '🇦🇷',
    CHL: '🇨🇱',
    BRA: '🇧🇷',
  };
  return flags[countryCode] || '🌍';
};

export const CountryCard = ({ item, onDelete, isProcessing = false }: CountryCardProps) => {
  const trackedDeleteButton = useTrackedButton({
    actionName: 'country_delete',
    section: 'country-card',
    baseProperties: {
      countryCode: item.code,
      countryName: item.name,
    },
  });

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

        {/* Actions */}
        <div className="flex gap-2 border-t border-gray-200 pt-3">
          <Button
            variant="secondary"
            onClick={trackedDeleteButton.onClick(() => onDelete(item.code))}
            disabled={isProcessing}
            className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1"
              aria-label="Eliminar"
            >
              <title>Eliminar</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Eliminar
          </Button>
        </div>
      </div>
    </Card>
  );
};
