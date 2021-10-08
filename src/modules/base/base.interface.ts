export enum StatusCodes {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  ES_FAILURE = 'ES_FAILURE',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_TOKEN = 'INVALID_TOKEN',
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  BRAND_NOT_FOUND = 'BRAND_NOT_FOUND',
  SIZE_NOT_FOUND = 'SIZE_NOT_FOUND',
  COUNTRY_NOT_FOUND = 'COUNTRY_NOT_FOUND',
}

export enum BaseStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum SortStatus {
  ASC = 'asc',
  DESC = 'desc',
}

export enum BaseGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNISEX = 'UNISEX',
}

export enum BaseCondition {
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  IN_STOCK = 'IN_STOCK',
}
