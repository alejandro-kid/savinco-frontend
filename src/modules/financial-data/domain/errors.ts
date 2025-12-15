export class InvalidCountryCodeError extends Error {
  constructor(countryCode: string) {
    super(`Invalid country code: ${countryCode}`);
    this.name = 'InvalidCountryCodeError';
  }
}

export class InvalidCurrencyCodeError extends Error {
  constructor(currencyCode: string) {
    super(`Invalid currency code: ${currencyCode}`);
    this.name = 'InvalidCurrencyCodeError';
  }
}

export class CurrencyDoesNotMatchCountryError extends Error {
  constructor(currencyCode: string, countryCode: string, expectedCurrencyCode: string) {
    super(
      `Currency ${currencyCode} does not match country ${countryCode}. Expected currency: ${expectedCurrencyCode}`
    );
    this.name = 'CurrencyDoesNotMatchCountryError';
  }
}

export class NegativeAmountError extends Error {
  constructor(fieldName: 'capitalSaved' | 'capitalLoaned' | 'profitsGenerated') {
    super(`${fieldName} must be non-negative`);
    this.name = 'NegativeAmountError';
  }
}

export class FinancialDataAlreadyExistsError extends Error {
  constructor(countryCode: string) {
    super(`Financial data already exists for country: ${countryCode}`);
    this.name = 'FinancialDataAlreadyExistsError';
  }
}

export class FinancialDataNotFoundError extends Error {
  constructor(countryCode: string) {
    super(`Financial data not found for country: ${countryCode}`);
    this.name = 'FinancialDataNotFoundError';
  }
}
