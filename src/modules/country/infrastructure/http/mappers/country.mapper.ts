import type { Country, CreateCountryInput } from '../../../domain/types';
import type { CountryResponseDTO, CreateCountryDTO } from '../dtos/country-response.dto';

export const mapCountryFromDTO = (dto: CountryResponseDTO): Country => {
  return {
    id: dto.id,
    code: dto.code,
    name: dto.name,
    currencyCode: dto.currencyCode,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
};

export const mapCountryToCreateDTO = (input: CreateCountryInput): CreateCountryDTO => {
  return {
    code: input.code,
    name: input.name,
    currencyCode: input.currencyCode,
  };
};
