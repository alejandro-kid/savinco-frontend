import { useAppSelector } from '../../../../shared/redux/store';
import { selectBaseCurrency } from '../../infrastructure/redux/currency.selectors';
import { useGetAllCurrencies } from './use-get-all-currencies';

/**
 * Hook to get the base currency dynamically.
 * Automatically loads currencies if not already loaded.
 */
export const useBaseCurrency = () => {
  useGetAllCurrencies();
  const baseCurrency = useAppSelector(selectBaseCurrency);

  return baseCurrency;
};
