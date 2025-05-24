import type * as HttpClient from "@effect/platform/HttpClient"
import * as HttpClientError from "@effect/platform/HttpClientError"
import * as HttpClientRequest from "@effect/platform/HttpClientRequest"
import * as HttpClientResponse from "@effect/platform/HttpClientResponse"
import * as Data from "effect/Data"
import * as Effect from "effect/Effect"
import type { ParseError } from "effect/ParseResult"
import * as S from "effect/Schema"

export class ListProductsParamsType extends S.Literal("custom", "standard") {}

export class ListProductsParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "include": S.optionalWith(S.Array(S.Literal("prices")), { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const }),
  "status": S.optionalWith(S.Array(S.Literal("active", "archived")), { nullable: true }),
  "tax_category": S.optionalWith(S.Array(S.Literal("digital-goods", "ebooks", "implementation-services", "professional-services", "saas", "software-programming-services", "standard", "training-services", "website-hosting")), { nullable: true }),
  "type": S.optionalWith(ListProductsParamsType, { nullable: true })
}) {}

/**
* Unique Paddle ID for this price, prefixed with `pri_`.
*/
export class PriceId extends S.String.pipe(S.pattern(new RegExp("^pri_[a-z\\d]{26}$"))) {}

/**
* Unique Paddle ID for this product, prefixed with `pro_`.
*/
export class ProductId extends S.String.pipe(S.pattern(new RegExp("^pro_[a-z\\d]{26}$"))) {}

/**
* Type of item. Standard items are considered part of your catalog and are shown in the Paddle dashboard.
*/
export class CatalogType extends S.Literal("custom", "standard") {}

/**
* Name of this price, shown to customers at checkout and on invoices. Typically describes how often the related product bills.
*/
export class PriceName extends S.String.pipe(S.minLength(1), S.maxLength(150)) {}

/**
* Unit of time.
*/
export class DurationInterval extends S.Literal("day", "week", "month", "year") {}

export class Duration extends S.Struct({
  /**
* Unit of time.
*/
"interval": DurationInterval,
  /**
* Amount of time.
*/
"frequency": S.Int.pipe(S.greaterThanOrEqualTo(1))
}) {}

/**
* Unit of time.
*/
export class PriceTrialDurationInterval extends S.Literal("day", "week", "month", "year") {}

export class PriceTrialDuration extends S.Struct({
  /**
* Unit of time.
*/
"interval": PriceTrialDurationInterval,
  /**
* Amount of time.
*/
"frequency": S.Int.pipe(S.greaterThanOrEqualTo(1))
}) {}

/**
* How tax is calculated for this price.
*/
export class TaxMode extends S.Literal("account_setting", "external", "internal") {}

/**
* Supported three-letter ISO 4217 currency code.
*/
export class CurrencyCode extends S.Literal("USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "HKD", "SGD", "SEK", "ARS", "BRL", "CNY", "COP", "CZK", "DKK", "HUF", "ILS", "INR", "KRW", "MXN", "NOK", "NZD", "PLN", "RUB", "THB", "TRY", "TWD", "UAH", "VND", "ZAR") {}

/**
* A base representation of monetary value unformatted in the lowest denomination with currency code.
*/
export class Money extends S.Struct({
  /**
* Amount in the lowest denomination for the currency, e.g. 10 USD = 1000 (cents). Although represented as a string, this value must be a valid integer.
*/
"amount": S.String,
  "currency_code": CurrencyCode
}) {}

/**
* Two-letter ISO 3166-1 alpha-2 representation of a supported country.
*/
export class CountryCodeSupported extends S.Literal("AD", "AE", "AG", "AI", "AL", "AM", "AO", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BZ", "CA", "CC", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SR", "ST", "SV", "SX", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VG", "VI", "VN", "VU", "WF", "WS", "XK", "YT", "ZA", "ZM") {}

/**
* Two-letter ISO 3166-1 alpha-2 country code.
*/
export class CountryCode extends CountryCodeSupported {}

export class UnitPriceOverride extends S.Struct({
  /**
* Supported two-letter ISO 3166-1 alpha-2 country code. Customers located in the listed countries are charged the override price.
*/
"country_codes": S.NonEmptyArray(CountryCode),
  /**
* Override price. This price applies to customers located in the countries for this unit price override.
*/
"unit_price": Money
}) {}

export class PriceQuantity extends S.Struct({
  /**
* Minimum quantity of the product related to this price that can be bought. Required if `maximum` set.
*/
"minimum": S.Int.pipe(S.greaterThanOrEqualTo(1), S.lessThanOrEqualTo(999999999)).pipe(S.propertySignature, S.withConstructorDefault(() => 1 as const)),
  /**
* Maximum quantity of the product related to this price that can be bought. Required if `minimum` set. Must be greater than or equal to the `minimum` value.
*/
"maximum": S.Int.pipe(S.greaterThanOrEqualTo(1), S.lessThanOrEqualTo(999999999)).pipe(S.propertySignature, S.withConstructorDefault(() => 100 as const))
}) {}

/**
* Whether this entity can be used in Paddle.
*/
export class Status extends S.Literal("active", "archived") {}

/**
* Your own structured key-value data.
*/
export class CustomData extends S.Record({ key: S.String, value: S.Unknown }) {}

/**
* Reference or identifier for this entity from the provider where it was imported from.
*/
export class ExternalId extends S.String.pipe(S.minLength(1), S.maxLength(200)) {}

/**
* Platform or provider that a migration is from.
*/
export class MigrationProviderPublic extends S.Literal("paddle_classic") {}

/**
* Platform or provider that a migration is from.
*/
export class MigrationProvider extends MigrationProviderPublic {}

/**
* Import information for this entity. `null` if this entity is not imported.
*/
export class ImportMeta extends S.Struct({
  "external_id": S.optionalWith(ExternalId, { nullable: true }),
  /**
* Name of the platform or provider where this entity was imported from.
*/
"imported_from": MigrationProvider
}) {}

/**
* RFC 3339 datetime string of when this entity was created. Set automatically by Paddle.
*/
export class CreatedAt extends S.String {}

/**
* RFC 3339 datetime string of when this entity was updated. Set automatically by Paddle.
*/
export class UpdatedAt extends S.String {}

/**
* Represents a price entity.
*/
export class Price extends S.Struct({
  "id": S.optionalWith(PriceId, { nullable: true }),
  /**
* Paddle ID for the product that this price is for, prefixed with `pro_`.
*/
"product_id": S.optionalWith(ProductId, { nullable: true }),
  /**
* Internal description for this price, not shown to customers. Typically notes for your team.
*/
"description": S.optionalWith(S.String.pipe(S.minLength(2), S.maxLength(500)), { nullable: true }),
  "type": S.optionalWith(CatalogType, { nullable: true, default: () => "standard" as const }),
  "name": S.optionalWith(PriceName, { nullable: true }),
  /**
* How often this price should be charged. `null` if price is non-recurring (one-time).
*/
"billing_cycle": S.optionalWith(Duration, { nullable: true }),
  /**
* Trial period for the product related to this price. The billing cycle begins once the trial period is over. `null` for no trial period. Requires `billing_cycle`.
*/
"trial_period": S.optionalWith(PriceTrialDuration, { nullable: true }),
  "tax_mode": S.optionalWith(TaxMode, { nullable: true, default: () => "account_setting" as const }),
  /**
* Base price. This price applies to all customers, except for customers located in countries where you have `unit_price_overrides`.
*/
"unit_price": S.optionalWith(Money, { nullable: true }),
  /**
* List of unit price overrides. Use to override the base price with a custom price and currency for a country or group of countries.
*/
"unit_price_overrides": S.optionalWith(S.Array(UnitPriceOverride).pipe(S.maxItems(250)), { nullable: true }),
  /**
* Limits on how many times the related product can be purchased at this price. Useful for discount campaigns.
*/
"quantity": S.optionalWith(PriceQuantity, { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true })
}) {}

/**
* Name of this product.
*/
export class ProductName extends S.String.pipe(S.minLength(1), S.maxLength(200)) {}

/**
* Tax category for this product. Used for charging the correct rate of tax. Selected tax category must be enabled on your Paddle account.
*/
export class TaxCategory extends S.Literal("digital-goods", "ebooks", "implementation-services", "professional-services", "saas", "software-programming-services", "standard", "training-services", "website-hosting") {}

/**
* A URL to an image.
*/
export class ImageUrl extends S.String.pipe(S.minLength(1)) {}

export class EmptyString extends S.String.pipe(S.minLength(0), S.maxLength(0)) {}

/**
* Represents a product entity.
*/
export class ProductIncludes extends S.Struct({
  /**
* Prices for this product. Returned when the `include` parameter is used with the `prices` value.
*/
"prices": S.optionalWith(S.Array(S.Record({ key: S.String, value: S.Unknown })), { nullable: true }),
  "id": S.optionalWith(ProductId, { nullable: true }),
  "name": S.optionalWith(ProductName, { nullable: true }),
  /**
* Short description for this product.
*/
"description": S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
  "type": S.optionalWith(CatalogType, { nullable: true, default: () => "standard" as const }),
  "tax_category": S.optionalWith(TaxCategory, { nullable: true }),
  /**
* Image for this product. Included in the checkout and on some customer documents.
*/
"image_url": S.optionalWith(S.Union(ImageUrl,
EmptyString), { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true })
}) {}

/**
* Unique ID for the request relating to this response. Provide this when contacting Paddle support about a specific request.
*/
export class RequestId extends S.String {}

/**
* Keys used for working with paginated results.
*/
export class Pagination extends S.Struct({
  /**
* Number of entities per page for this response. May differ from the number requested if the requested number is greater than the maximum.
*/
"per_page": S.Int,
  /**
* URL containing the query parameters of the original request, along with the `after` parameter that marks the starting point of the next page. Always returned, even if `has_more` is `false`.
*/
"next": S.String,
  /**
* Whether this response has another page.
*/
"has_more": S.Boolean,
  /**
* Estimated number of entities for this response.
*/
"estimated_total": S.optionalWith(S.Int, { nullable: true })
}) {}

/**
* Information about this response.
*/
export class MetaPaginated extends S.Struct({
  "request_id": RequestId,
  "pagination": Pagination
}) {}

export class ListProducts200 extends S.Struct({
  "data": S.Array(ProductIncludes),
  "meta": MetaPaginated
}) {}

/**
* Represents a product entity when creating products.
*/
export class ProductCreate extends S.Class<ProductCreate>("ProductCreate")({
  "id": S.optionalWith(ProductId, { nullable: true }),
  /**
* Name of this product.
*/
"name": S.String.pipe(S.minLength(1), S.maxLength(200)),
  /**
* Short description for this product.
*/
"description": S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
  /**
* Type of item. Standard items are considered part of your catalog and are shown in the Paddle dashboard. If omitted, defaults to `standard`.
*/
"type": S.optionalWith(CatalogType, { nullable: true, default: () => "standard" as const }),
  "tax_category": TaxCategory,
  /**
* Image for this product. Included in the checkout and on some customer documents.
*/
"image_url": S.optionalWith(S.Union(S.String.pipe(S.minLength(1)),
S.String.pipe(S.minLength(0), S.maxLength(0))), { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

/**
* Represents a product entity.
*/
export class Product extends S.Struct({
  "id": S.optionalWith(ProductId, { nullable: true }),
  "name": S.optionalWith(ProductName, { nullable: true }),
  /**
* Short description for this product.
*/
"description": S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
  "type": S.optionalWith(CatalogType, { nullable: true, default: () => "standard" as const }),
  "tax_category": S.optionalWith(TaxCategory, { nullable: true }),
  /**
* Image for this product. Included in the checkout and on some customer documents.
*/
"image_url": S.optionalWith(S.Union(ImageUrl,
EmptyString), { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true })
}) {}

/**
* Information about this response.
*/
export class Meta extends S.Struct({
  "request_id": RequestId
}) {}

export class CreateProduct201 extends S.Struct({
  "data": Product,
  "meta": Meta
}) {}

export class GetProductParams extends S.Struct({
  "include": S.optionalWith(S.Array(S.Literal("prices")), { nullable: true })
}) {}

export class GetProduct200 extends S.Struct({
  "data": ProductIncludes,
  "meta": Meta
}) {}

/**
* Represents a product entity when updating products.
*/
export class ProductUpdate extends S.Class<ProductUpdate>("ProductUpdate")({
  /**
* Name of this product.
*/
"name": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(200)), { nullable: true }),
  /**
* Short description for this product.
*/
"description": S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
  "type": S.optionalWith(CatalogType, { nullable: true, default: () => "standard" as const }),
  "tax_category": S.optionalWith(TaxCategory, { nullable: true }),
  /**
* Image for this product. Included in the checkout and on some customer documents.
*/
"image_url": S.optionalWith(S.Union(S.String.pipe(S.minLength(0), S.maxLength(0)),
S.String.pipe(S.minLength(1))), { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true })
}) {}

export class UpdateProduct200 extends S.Struct({
  "data": Product,
  "meta": Meta
}) {}

export class ListPricesParamsType extends S.Literal("custom", "standard") {}

export class ListPricesParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "include": S.optionalWith(S.Array(S.Literal("product")), { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const }),
  "product_id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "status": S.optionalWith(S.Array(S.Literal("active", "archived")), { nullable: true }),
  "recurring": S.optionalWith(S.Boolean, { nullable: true }),
  "type": S.optionalWith(ListPricesParamsType, { nullable: true })
}) {}

/**
* Represents a price entity.
*/
export class PriceIncludes extends S.Struct({
  /**
* Related product for this price. Returned when the `include` parameter is used with the `product` value.
*/
"product": S.optionalWith(Product, { nullable: true }),
  "id": S.optionalWith(PriceId, { nullable: true }),
  /**
* Paddle ID for the product that this price is for, prefixed with `pro_`.
*/
"product_id": S.optionalWith(ProductId, { nullable: true }),
  /**
* Internal description for this price, not shown to customers. Typically notes for your team.
*/
"description": S.optionalWith(S.String.pipe(S.minLength(2), S.maxLength(500)), { nullable: true }),
  "type": S.optionalWith(CatalogType, { nullable: true, default: () => "standard" as const }),
  "name": S.optionalWith(PriceName, { nullable: true }),
  /**
* How often this price should be charged. `null` if price is non-recurring (one-time).
*/
"billing_cycle": S.optionalWith(Duration, { nullable: true }),
  /**
* Trial period for the product related to this price. The billing cycle begins once the trial period is over. `null` for no trial period. Requires `billing_cycle`.
*/
"trial_period": S.optionalWith(PriceTrialDuration, { nullable: true }),
  "tax_mode": S.optionalWith(TaxMode, { nullable: true, default: () => "account_setting" as const }),
  /**
* Base price. This price applies to all customers, except for customers located in countries where you have `unit_price_overrides`.
*/
"unit_price": S.optionalWith(Money, { nullable: true }),
  /**
* List of unit price overrides. Use to override the base price with a custom price and currency for a country or group of countries.
*/
"unit_price_overrides": S.optionalWith(S.Array(UnitPriceOverride).pipe(S.maxItems(250)), { nullable: true }),
  /**
* Limits on how many times the related product can be purchased at this price. Useful for discount campaigns.
*/
"quantity": S.optionalWith(PriceQuantity, { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true })
}) {}

export class ListPrices200 extends S.Struct({
  "data": S.Array(PriceIncludes),
  "meta": MetaPaginated
}) {}

/**
* Represents a price entity when creating prices.
*/
export class PriceCreate extends S.Class<PriceCreate>("PriceCreate")({
  "id": S.optionalWith(PriceId, { nullable: true }),
  /**
* Internal description for this price, not shown to customers. Typically notes for your team.
*/
"description": S.String.pipe(S.minLength(2), S.maxLength(500)),
  /**
* Type of item. Standard items are considered part of your catalog and are shown in the Paddle dashboard. If omitted, defaults to `standard`.
*/
"type": S.optionalWith(CatalogType, { nullable: true, default: () => "standard" as const }),
  "name": S.optionalWith(PriceName, { nullable: true }),
  /**
* Paddle ID for the product that this price is for, prefixed with `pro_`.
*/
"product_id": ProductId,
  /**
* How often this price should be charged. `null` if price is non-recurring (one-time). If omitted, defaults to `null`.
*/
"billing_cycle": S.optionalWith(Duration, { nullable: true }),
  /**
* Trial period for the product related to this price. The billing cycle begins once the trial period is over.
* `null` for no trial period. Requires `billing_cycle`. If omitted, defaults to `null`.
*/
"trial_period": S.optionalWith(PriceTrialDuration, { nullable: true }),
  /**
* How tax is calculated for this price. If omitted, defaults to `account_setting`.
*/
"tax_mode": S.optionalWith(TaxMode, { nullable: true, default: () => "account_setting" as const }),
  /**
* Base price. This price applies to all customers, except for customers located in countries where you have `unit_price_overrides`.
*/
"unit_price": Money,
  /**
* List of unit price overrides. Use to override the base price with a custom price and currency for a country or group of countries.
*/
"unit_price_overrides": S.optionalWith(S.Array(UnitPriceOverride).pipe(S.maxItems(250)), { nullable: true }),
  /**
* Limits on how many times the related product can be purchased at this price. Useful for discount campaigns. If omitted, defaults to 1-100.
*/
"quantity": S.optionalWith(PriceQuantity, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

export class CreatePrice201 extends S.Struct({
  "data": Price,
  "meta": Meta
}) {}

export class GetPriceParams extends S.Struct({
  "include": S.optionalWith(S.Array(S.Literal("product")), { nullable: true })
}) {}

export class GetPrice200 extends S.Struct({
  "data": PriceIncludes,
  "meta": Meta
}) {}

/**
* Represents a price entity when updating prices.
*/
export class PriceUpdate extends S.Class<PriceUpdate>("PriceUpdate")({
  /**
* Internal description for this price, not shown to customers. Typically notes for your team.
*/
"description": S.optionalWith(S.String.pipe(S.minLength(2), S.maxLength(500)), { nullable: true }),
  "type": S.optionalWith(CatalogType, { nullable: true, default: () => "standard" as const }),
  "name": S.optionalWith(PriceName, { nullable: true }),
  /**
* How often this price should be charged. `null` if price is non-recurring (one-time).
*/
"billing_cycle": S.optionalWith(Duration, { nullable: true }),
  /**
* Trial period for the product related to this price. The billing cycle begins once the trial period is over. `null` for no trial period. Requires `billing_cycle`.
*/
"trial_period": S.optionalWith(Duration, { nullable: true }),
  "tax_mode": S.optionalWith(TaxMode, { nullable: true, default: () => "account_setting" as const }),
  /**
* Base price. This price applies to all customers, except for customers located in countries where you have `unit_price_overrides`.
*/
"unit_price": S.optionalWith(Money, { nullable: true }),
  /**
* List of unit price overrides. Use to override the base price with a custom price and currency for a country or group of countries.
*/
"unit_price_overrides": S.optionalWith(S.Array(UnitPriceOverride).pipe(S.maxItems(250)), { nullable: true }),
  /**
* Limits on how many times the related product can be purchased at this price. Useful for discount campaigns.
*/
"quantity": S.optionalWith(PriceQuantity, { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true })
}) {}

export class UpdatePrice200 extends S.Struct({
  "data": Price,
  "meta": Meta
}) {}

export class ListTransactionsParamsCollectionMode extends S.Literal("automatic", "manual") {}

export class ListTransactionsParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "billed_at": S.optionalWith(S.String, { nullable: true }),
  "collection_mode": S.optionalWith(ListTransactionsParamsCollectionMode, { nullable: true }),
  "created_at": S.optionalWith(S.String, { nullable: true }),
  "customer_id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "include": S.optionalWith(S.Array(S.Literal("address", "adjustments", "adjustments_totals", "available_payment_methods", "business", "customer", "discount")), { nullable: true }),
  "invoice_number": S.optionalWith(S.Array(S.String), { nullable: true }),
  "origin": S.optionalWith(S.Array(S.Literal("api", "subscription_charge", "subscription_payment_method_change", "subscription_recurring", "subscription_update", "web")), { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "status": S.optionalWith(S.Array(S.Literal("draft", "ready", "billed", "paid", "completed", "canceled", "past_due")), { nullable: true }),
  "subscription_id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(30)), { nullable: true, default: () => 30 as const }),
  "updated_at": S.optionalWith(S.String, { nullable: true })
}) {}

/**
* Unique Paddle ID for this address entity, prefixed with `add_`.
*/
export class AddressId extends S.String.pipe(S.pattern(new RegExp("^add_[a-z\\d]{26}$"))) {}

/**
* Unique Paddle ID for this customer entity, prefixed with `ctm_`.
*/
export class CustomerId extends S.String.pipe(S.pattern(new RegExp("^ctm_[a-z\\d]{26}$"))) {}

/**
* Memorable description for this address.
*/
export class AddressDescription extends S.String.pipe(S.maxLength(1024)) {}

/**
* First line of this address.
*/
export class AddressFirstLine extends S.String.pipe(S.maxLength(1024)) {}

/**
* Second line of this address.
*/
export class AddressSecondLine extends S.String.pipe(S.maxLength(1024)) {}

/**
* City of this address.
*/
export class AddressCity extends S.String.pipe(S.maxLength(200)) {}

/**
* ZIP or postal code of this address. Required for some countries.
*/
export class AddressPostalCode extends S.String.pipe(S.maxLength(200)) {}

/**
* State, county, or region of this address.
*/
export class AddressRegion extends S.String.pipe(S.maxLength(200)) {}

/**
* Represents an address entity.
*/
export class Address extends S.Struct({
  "id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID for the customer related to this address, prefixed with `cus_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  "description": S.optionalWith(AddressDescription, { nullable: true }),
  "first_line": S.optionalWith(AddressFirstLine, { nullable: true }),
  "second_line": S.optionalWith(AddressSecondLine, { nullable: true }),
  "city": S.optionalWith(AddressCity, { nullable: true }),
  "postal_code": S.optionalWith(AddressPostalCode, { nullable: true }),
  "region": S.optionalWith(AddressRegion, { nullable: true }),
  /**
* Supported two-letter ISO 3166-1 alpha-2 country code for this address.
*/
"country_code": S.optionalWith(CountryCode, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

/**
* Unique Paddle ID for this adjustment entity, prefixed with `adj_`.
*/
export class AdjustmentId extends S.String.pipe(S.pattern(new RegExp("^adj_[a-z\\d]{26}$"))) {}

/**
* How this adjustment impacts the related transaction.
*/
export class AdjustmentAction extends S.Literal("credit", "refund", "chargeback", "chargeback_reverse", "chargeback_warning", "credit_reverse") {}

/**
* Type of adjustment. Use `full` to adjust the grand total for the related transaction. Include an `items` array when creating a `partial` adjustment. If omitted, defaults to `partial`.
*/
export class AdjustmentType extends S.Literal("full", "partial") {}

/**
* Unique Paddle ID for this transaction entity, prefixed with `txn_`.
*/
export class TransactionId extends S.String.pipe(S.pattern(new RegExp("^txn_[a-z\\d]{26}$"))) {}

/**
* Unique Paddle ID for this subscription entity, prefixed with `sub_`.
*/
export class SubscriptionId extends S.String.pipe(S.pattern(new RegExp("^sub_[a-z\\d]{26}$"))) {}

/**
* Status of this adjustment. Set automatically by Paddle.
* 
* Most refunds for live accounts are created with the status of `pending_approval` until reviewed by Paddle, but some are automatically approved. For sandbox accounts, Paddle automatically approves refunds every ten minutes.
* 
* Credit adjustments don't require approval from Paddle, so they're created as `approved`.
*/
export class StatusAdjustment extends S.Literal("pending_approval", "approved", "rejected", "reversed") {}

/**
* Unique Paddle ID for this transaction item, prefixed with `txnitm_`. Used when working with [adjustments](https://developer.paddle.com/build/transactions/create-transaction-adjustments).
*/
export class TransactionItemId extends S.String.pipe(S.pattern(new RegExp("^txnitm_[a-z\\d]{26}$"))) {}

/**
* RFC 3339 datetime string.
*/
export class Timestamp extends S.String {}

export class TimePeriod extends S.Struct({
  /**
* RFC 3339 datetime string of when this period starts.
*/
"starts_at": Timestamp,
  /**
* RFC 3339 datetime string of when this period ends.
*/
"ends_at": Timestamp
}) {}

/**
* How proration was calculated for this item. Populated when a transaction is created from a subscription change, where `proration_billing_mode` was `prorated_immediately` or `prorated_next_billing_period`. Set automatically by Paddle.
*/
export class TransactionItemProration extends S.Struct({
  /**
* Rate used to calculate proration.
*/
"rate": S.optionalWith(S.String, { nullable: true }),
  /**
* Billing period that proration is based on.
*/
"billing_period": S.optionalWith(TimePeriod, { nullable: true })
}) {}

/**
* Breakdown of the total for an adjustment item.
*/
export class AdjustmentItemTotals extends S.Struct({
  /**
* Amount multiplied by quantity.
*/
"subtotal": S.optionalWith(S.String, { nullable: true }),
  /**
* Total tax on the subtotal.
*/
"tax": S.optionalWith(S.String, { nullable: true }),
  /**
* Total after tax.
*/
"total": S.optionalWith(S.String, { nullable: true })
}) {}

/**
* Unique Paddle ID for this adjustment item, prefixed with `adjitm_`.
*/
export class AdjustmentItemId extends S.String.pipe(S.pattern(new RegExp("^adjitm_[a-z\\d]{26}$"))) {}

/**
* Breakdown of the total for an adjustment.
*/
export class AdjustmentTotals extends S.Struct({
  /**
* Total before tax. For tax adjustments, the value is 0.
*/
"subtotal": S.optionalWith(S.String, { nullable: true }),
  /**
* Total tax on the subtotal.
*/
"tax": S.optionalWith(S.String, { nullable: true }),
  /**
* Total after tax.
*/
"total": S.optionalWith(S.String, { nullable: true }),
  /**
* Total fee taken by Paddle for this adjustment.
*/
"fee": S.optionalWith(S.String, { nullable: true }),
  /**
* Total earnings. This is the subtotal minus the Paddle fee.
* For tax adjustments, this value is negative, which means a positive effect in the transaction earnings.
* This is because the fee is originally calculated from the transaction total, so if a tax adjustment is made,
* then the fee portion of it is returned.
*/
"earnings": S.optionalWith(S.String, { nullable: true }),
  /**
* Three-letter ISO 4217 currency code used for this adjustment.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true })
}) {}

/**
* Three-letter ISO 4217 currency code for chargeback fees.
*/
export class CurrencyCodeChargeback extends S.Literal("AUD", "CAD", "EUR", "GBP", "USD") {}

/**
* Supported three-letter ISO 4217 currency code for payouts from Paddle.
*/
export class CurrencyCodePayout extends S.Literal("AUD", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HUF", "PLN", "SEK", "USD", "ZAR") {}

/**
* Breakdown of how this adjustment affects your payout balance.
*/
export class AdjustmentPayoutTotals extends S.Struct({
  /**
* Adjustment total before tax and fees.
*/
"subtotal": S.optionalWith(S.String, { nullable: true }),
  /**
* Total tax on the adjustment subtotal.
*/
"tax": S.optionalWith(S.String, { nullable: true }),
  /**
* Adjustment total after tax.
*/
"total": S.optionalWith(S.String, { nullable: true }),
  /**
* Adjusted Paddle fee.
*/
"fee": S.optionalWith(S.String, { nullable: true }),
  /**
* Chargeback fees incurred for this adjustment. Only returned when the adjustment `action` is `chargeback` or `chargeback_warning`.
*/
"chargeback_fee": S.optionalWith(S.Struct({
  /**
* Chargeback fee converted into the payout currency.
*/
"amount": S.optionalWith(S.String, { nullable: true }),
  /**
* Chargeback fee before conversion to the payout currency. `null` when the chargeback fee is the same as the payout currency.
*/
"original": S.optionalWith(S.Struct({
  /**
* Fee amount for this chargeback in the original currency.
*/
"amount": S.optionalWith(S.String, { nullable: true }),
  /**
* Three-letter ISO 4217 currency code for the original chargeback fee.
*/
"currency_code": S.optionalWith(CurrencyCodeChargeback, { nullable: true })
}), { nullable: true })
}), { nullable: true }),
  /**
* Adjusted payout earnings. This is the adjustment total plus adjusted Paddle fees, excluding chargeback fees.
*/
"earnings": S.optionalWith(S.String, { nullable: true }),
  /**
* Three-letter ISO 4217 currency code used for the payout for this transaction. If your primary currency has changed, this reflects the primary currency at the time the transaction was billed.
*/
"currency_code": S.optionalWith(CurrencyCodePayout, { nullable: true })
}) {}

/**
* List of tax rates applied for this adjustment.
*/
export class AdjustmentTaxRatesUsed extends S.Array(S.Struct({
  /**
* Rate used to calculate tax for this adjustment.
*/
"tax_rate": S.optionalWith(S.String, { nullable: true }),
  /**
* Calculated totals for the tax applied to this adjustment.
*/
"totals": S.optionalWith(S.Struct({
  /**
* Total before tax. For tax adjustments, the value is 0.
*/
"subtotal": S.optionalWith(S.String, { nullable: true }),
  /**
* Total tax on the subtotal.
*/
"tax": S.optionalWith(S.String, { nullable: true }),
  /**
* Total after tax.
*/
"total": S.optionalWith(S.String, { nullable: true })
}), { nullable: true })
})) {}

/**
* Represents an adjustment entity.
*/
export class Adjustment extends S.Struct({
  "id": S.optionalWith(AdjustmentId, { nullable: true }),
  "action": S.optionalWith(AdjustmentAction, { nullable: true }),
  "type": S.optionalWith(AdjustmentType, { nullable: true, default: () => "partial" as const }),
  /**
* Paddle ID of the transaction that this adjustment is for, prefixed with `txn_`.
*/
"transaction_id": S.optionalWith(TransactionId, { nullable: true }),
  /**
* Paddle ID for the subscription related to this adjustment, prefixed with `sub_`.
* Set automatically by Paddle based on the `subscription_id` of the related transaction.
*/
"subscription_id": S.optionalWith(SubscriptionId, { nullable: true }),
  /**
* Paddle ID for the customer related to this adjustment, prefixed with `ctm_`.
* Set automatically by Paddle based on the `customer_id` of the related transaction.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Why this adjustment was created. Appears in the Paddle dashboard. Retained for record-keeping purposes.
*/
"reason": S.optionalWith(S.String, { nullable: true }),
  /**
* Whether this adjustment was applied to the related customer's credit balance. Only returned for `credit` adjustments.
*/
"credit_applied_to_balance": S.optionalWith(S.Boolean, { nullable: true }),
  /**
* Three-letter ISO 4217 currency code for this adjustment. Set automatically by Paddle based on the `currency_code` of the related transaction.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  "status": S.optionalWith(StatusAdjustment, { nullable: true }),
  /**
* List of items on this adjustment. Required if `type` is not populated or set to `partial`.
*/
"items": S.optionalWith(S.Array(S.Struct({
  /**
* Paddle ID for the transaction item that this adjustment item relates to, prefixed with `txnitm_`.
*/
"item_id": TransactionItemId,
  /**
* Type of adjustment for this transaction item. `tax` adjustments are automatically created by Paddle.
* Include `amount` when creating a `partial` adjustment.
*/
"type": S.Literal("full", "partial", "tax", "proration"),
  /**
* Amount adjusted for this transaction item. Required when item `type` is `partial`.
*/
"amount": S.optionalWith(S.String, { nullable: true }),
  /**
* How proration was calculated for this adjustment item.
*/
"proration": S.optionalWith(TransactionItemProration, { nullable: true }),
  "totals": S.optionalWith(AdjustmentItemTotals, { nullable: true }),
  /**
* Unique Paddle ID for this adjustment item, prefixed with `adjitm_`.
*/
"id": S.optionalWith(AdjustmentItemId, { nullable: true })
})).pipe(S.minItems(1), S.maxItems(100)), { nullable: true }),
  "totals": S.optionalWith(AdjustmentTotals, { nullable: true }),
  /**
* Breakdown of how this adjustment affects your payout balance.
*/
"payout_totals": S.optionalWith(AdjustmentPayoutTotals, { nullable: true }),
  "tax_rates_used": S.optionalWith(AdjustmentTaxRatesUsed, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true })
}) {}

/**
* Breakdown of all the adjustments made against a transaction in the transaction currency.
*/
export class TransactionAdjustmentsTotalsInclude extends S.Struct({
  /**
* Total before tax.
*/
"subtotal": S.optionalWith(S.String, { nullable: true }),
  /**
* Total tax on the subtotal.
*/
"tax": S.optionalWith(S.String, { nullable: true }),
  /**
* Total after tax.
*/
"total": S.optionalWith(S.String, { nullable: true }),
  /**
* Total fee taken by Paddle.
*/
"fee": S.optionalWith(S.String, { nullable: true }),
  /**
* Total earnings. This is the subtotal minus the Paddle fee.
* For tax adjustments, this value is negative, which means a positive effect in the transaction earnings.
* This is because the fee is originally calculated from the transaction total, so if a tax adjustment is made,
* then the fee portion of it is returned.
* As a result, the earnings from all the adjustments performed could be either negative, positive or zero.
*/
"earnings": S.optionalWith(S.String, { nullable: true }),
  /**
* Breakdown of the total adjustments by adjustment action.
*/
"breakdown": S.optionalWith(S.Struct({
  /**
* Total amount of credit adjustments.
*/
"credit": S.optionalWith(S.String, { nullable: true }),
  /**
* Total amount of refund adjustments.
*/
"refund": S.optionalWith(S.String, { nullable: true }),
  /**
* Total amount of chargeback adjustments.
*/
"chargeback": S.optionalWith(S.String, { nullable: true })
}), { nullable: true }),
  /**
* Three-letter ISO 4217 currency code used for adjustments for this transaction.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true })
}) {}

/**
* Unique Paddle ID for this business entity, prefixed with `biz_`.
*/
export class BusinessId extends S.String.pipe(S.pattern(new RegExp("^biz_[a-z\\d]{26}$"))) {}

/**
* Full name.
*/
export class Name extends S.String.pipe(S.maxLength(1024)) {}

/**
* Email address for this entity.
*/
export class Email extends S.String.pipe(S.minLength(1), S.maxLength(320)) {}

/**
* Represents a business entity.
*/
export class Business extends S.Struct({
  "id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Paddle ID for the customer related to this business, prefixed with `cus_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Name of this business.
*/
"name": S.optionalWith(Name, { nullable: true }),
  /**
* Company number for this business.
*/
"company_number": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true }),
  /**
* Tax or VAT Number for this business.
*/
"tax_identifier": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* List of contacts related to this business, typically used for sending invoices.
*/
"contacts": S.optionalWith(S.Array(S.Struct({
  /**
* Full name of this contact.
*/
"name": Name,
  /**
* Email address for this contact.
*/
"email": Email
})).pipe(S.maxItems(100)), { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

/**
* Represents a customer entity.
*/
export class Customer extends S.Struct({
  "id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Full name of this customer. Required when creating transactions where `collection_mode` is `manual` (invoices).
*/
"name": S.optionalWith(Name, { nullable: true }),
  /**
* Email address for this customer.
*/
"email": S.optionalWith(Email, { nullable: true }),
  /**
* Whether this customer opted into marketing from you. `false` unless customers check the marketing consent box
* when using Paddle Checkout. Set automatically by Paddle.
*/
"marketing_consent": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Valid IETF BCP 47 short form locale tag. If omitted, defaults to `en`.
*/
"locale": S.optionalWith(S.String, { nullable: true, default: () => "en" as const }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

/**
* Unique Paddle ID for this discount, prefixed with `dsc_`.
*/
export class DiscountId extends S.String.pipe(S.pattern(new RegExp("^dsc_[a-z\\d]{26}$"))) {}

/**
* Whether this entity can be used in Paddle.
*/
export class StatusDiscount extends S.Literal("active", "archived") {}

/**
* Unique code that customers can use to apply this discount at checkout. Use letters and numbers only, up to 32 characters. Not case-sensitive.
*/
export class DiscountCode extends S.String.pipe(S.minLength(1), S.maxLength(32), S.pattern(new RegExp("^[a-zA-Z0-9]{1,32}$"))) {}

/**
* Type of discount. Determines how this discount impacts the checkout or transaction total.
*/
export class DiscountType extends S.Literal("flat", "flat_per_seat", "percentage") {}

/**
* Discount mode. Standard discounts are considered part of your catalog and are shown in the Paddle dashboard.
*/
export class DiscountMode extends S.Literal("standard", "custom") {}

/**
* Represents a discount entity.
*/
export class Discount extends S.Struct({
  "id": S.optionalWith(DiscountId, { nullable: true }),
  "status": S.optionalWith(StatusDiscount, { nullable: true }),
  /**
* Short description for this discount for your reference. Not shown to customers.
*/
"description": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(500)), { nullable: true }),
  /**
* Whether this discount can be redeemed by customers at checkout (`true`) or not (`false`).
*/
"enabled_for_checkout": S.optionalWith(S.Boolean, { nullable: true, default: () => true as const }),
  /**
* Unique code that customers can use to redeem this discount at checkout. Not case-sensitive.
*/
"code": S.optionalWith(DiscountCode, { nullable: true }),
  /**
* Type of discount. Determines how this discount impacts the checkout or transaction total.
*/
"type": S.optionalWith(DiscountType, { nullable: true }),
  "mode": S.optionalWith(DiscountMode, { nullable: true, default: () => "standard" as const }),
  /**
* Amount to discount by. For `percentage` discounts, must be an amount between `0.01` and `100`. For `flat` and `flat_per_seat` discounts, amount in the lowest denomination for a currency.
*/
"amount": S.optionalWith(S.String, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code. Required where discount type is `flat` or `flat_per_seat`.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  /**
* Whether this discount applies for multiple subscription billing periods (`true`) or not (`false`).
*/
"recur": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  /**
* Number of subscription billing periods that this discount recurs for. Requires `recur`. `null` if this discount recurs forever.
* 
* Subscription renewals, midcycle changes, and one-time charges billed to a subscription aren't considered a redemption. `times_used` is not incremented in these cases.
*/
"maximum_recurring_intervals": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  /**
* Maximum number of times this discount can be redeemed. This is an overall limit for this discount, rather than a per-customer limit. `null` if this discount can be redeemed an unlimited amount of times.
* 
* Paddle counts a usage as a redemption on a checkout, transaction, or the initial application against a subscription. Transactions created for subscription renewals, midcycle changes, and one-time charges aren't considered a redemption.
*/
"usage_limit": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  /**
* Product or price IDs that this discount is for. When including a product ID, all prices for that product can be discounted. `null` if this discount applies to all products and prices.
*/
"restrict_to": S.optionalWith(S.Array(S.String.pipe(S.pattern(new RegExp("^(pri|pro)_[a-z\\d]{26}$")))), { nullable: true }),
  /**
* RFC 3339 datetime string of when this discount expires. Discount can no longer be redeemed after this date has elapsed. `null` if this discount can be redeemed forever.
* 
* Expired discounts can't be redeemed against transactions or checkouts, but can be applied when updating subscriptions.
*/
"expires_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* How many times this discount has been redeemed. Automatically incremented by Paddle.
* 
* Paddle counts a usage as a redemption on a checkout, transaction, or subscription. Transactions created for subscription renewals, midcycle changes, and one-time charges aren't considered a redemption.
*/
"times_used": S.optionalWith(S.Int, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

/**
* Type of payment method available for use in the checkout.
*/
export class PaymentMethodType extends S.Literal("alipay", "apple_pay", "bancontact", "card", "google_pay", "ideal", "paypal") {}

/**
* Status of this transaction. You may set a transaction to `billed` or `canceled`, other statuses are set automatically by Paddle. Automatically-collected transactions may return `completed` if payment is captured successfully, or `past_due` if payment failed.
*/
export class StatusTransaction extends S.Literal("draft", "ready", "billed", "paid", "completed", "canceled", "past_due") {}

export class OriginTransactionEnum extends S.Literal("api", "subscription_charge", "subscription_payment_method_change", "subscription_recurring", "subscription_update", "web") {}

/**
* Describes how this transaction was created.
*/
export class OriginTransaction extends OriginTransactionEnum {}

/**
* Document number that is automatically generated by Paddle.
*/
export class DocumentNumber extends S.String {}

/**
* How payment is collected. `automatic` for checkout, `manual` for invoices.
*/
export class CollectionMode extends S.Literal("automatic", "manual") {}

/**
* Details for invoicing. Required if `collection_mode` is `manual`.
*/
export class BillingDetails extends S.Struct({
  /**
* Whether the related transaction may be paid using Paddle Checkout. If omitted when creating a transaction, defaults to `false`.
*/
"enable_checkout": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  /**
* Customer purchase order number. Appears on invoice documents.
*/
"purchase_order_number": S.optionalWith(S.String.pipe(S.maxLength(100)), { nullable: true }),
  /**
* Notes or other information to include on this invoice. Appears on invoice documents.
*/
"additional_information": S.optionalWith(S.String.pipe(S.maxLength(1500)), { nullable: true }),
  /**
* How long a customer has to pay this invoice once issued.
*/
"payment_terms": Duration
}) {}

export class TransactionItem extends S.Struct({
  /**
* Paddle ID for the price to add to this transaction, prefixed with `pri_`.
*/
"price_id": S.optionalWith(PriceId, { nullable: true }),
  "price": S.optionalWith(Price, { nullable: true }),
  /**
* Quantity of this item on the transaction.
*/
"quantity": S.Int,
  /**
* How proration was calculated for this item. Populated when a transaction is created from a subscription change, where `proration_billing_mode` was `prorated_immediately` or `prorated_next_billing_period`. Set automatically by Paddle.
*/
"proration": S.optionalWith(TransactionItemProration, { nullable: true })
}) {}

/**
* Breakdown of a charge in the lowest denomination of a currency (e.g. cents for USD).
*/
export class Totals extends S.Struct({
  /**
* Subtotal before discount, tax, and deductions. If an item, unit price multiplied by quantity.
*/
"subtotal": S.optionalWith(S.String, { nullable: true }),
  /**
* Total discount as a result of any discounts applied.
* 
* Except for percentage discounts, Paddle applies tax to discounts based on the line item `price.tax_mode`. If `price.tax_mode` for a line item is `internal`, Paddle removes tax from the discount applied.
*/
"discount": S.optionalWith(S.String, { nullable: true }),
  /**
* Total tax on the subtotal.
*/
"tax": S.optionalWith(S.String, { nullable: true }),
  /**
* Total after discount and tax.
*/
"total": S.optionalWith(S.String, { nullable: true })
}) {}

/**
* Breakdown of a charge in the lowest denomination of a currency (e.g. cents for USD).
*/
export class TransactionTotals extends S.Struct({
  /**
* Total credit applied to this transaction. This includes credits applied using a customer's credit balance and adjustments to a `billed` transaction.
*/
"credit": S.optionalWith(S.String, { nullable: true }),
  /**
* Additional credit generated from negative `details.line_items`. This credit is added to the customer balance.
*/
"credit_to_balance": S.optionalWith(S.String, { nullable: true }),
  /**
* Total due on a transaction after credits and any payments.
*/
"balance": S.optionalWith(S.String, { nullable: true }),
  /**
* Total due on a transaction after credits but before any payments.
*/
"grand_total": S.optionalWith(S.String, { nullable: true }),
  /**
* Total fee taken by Paddle for this transaction. `null` until the transaction is `completed` and the fee is processed.
*/
"fee": S.optionalWith(S.String, { nullable: true }),
  /**
* Total earnings for this transaction. This is the total minus the Paddle fee. `null` until the transaction is `completed` and the fee is processed.
*/
"earnings": S.optionalWith(S.String, { nullable: true }),
  /**
* Three-letter ISO 4217 currency code of the currency used for this transaction.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  /**
* Subtotal before discount, tax, and deductions. If an item, unit price multiplied by quantity.
*/
"subtotal": S.optionalWith(S.String, { nullable: true }),
  /**
* Total discount as a result of any discounts applied.
* 
* Except for percentage discounts, Paddle applies tax to discounts based on the line item `price.tax_mode`. If `price.tax_mode` for a line item is `internal`, Paddle removes tax from the discount applied.
*/
"discount": S.optionalWith(S.String, { nullable: true }),
  /**
* Total tax on the subtotal.
*/
"tax": S.optionalWith(S.String, { nullable: true }),
  /**
* Total after discount and tax.
*/
"total": S.optionalWith(S.String, { nullable: true })
}) {}

/**
* Breakdown of the totals for a transaction after adjustments.
*/
export class TransactionTotalsAdjusted extends S.Struct({
  /**
* Subtotal before discount, tax, and deductions. If an item, unit price multiplied by quantity.
*/
"subtotal": S.optionalWith(S.String, { nullable: true }),
  /**
* Total tax on the subtotal.
*/
"tax": S.optionalWith(S.String, { nullable: true }),
  /**
* Total after tax.
*/
"total": S.optionalWith(S.String, { nullable: true }),
  /**
* Total due after credits but before any payments.
*/
"grand_total": S.optionalWith(S.String, { nullable: true }),
  /**
* Total fee taken by Paddle for this transaction. `null` until the transaction is `completed` and the fee is processed.
*/
"fee": S.optionalWith(S.String, { nullable: true }),
  /**
* Total earnings for this transaction. This is the total minus the Paddle fee.
* `null` until the transaction is `completed` and the fee is processed.
*/
"earnings": S.optionalWith(S.String, { nullable: true }),
  /**
* Three-letter ISO 4217 currency code of the currency used for this transaction.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true })
}) {}

/**
* Breakdown of the payout total for a transaction. `null` until the transaction is `completed`. Returned in your payout currency.
*/
export class TransactionPayoutTotals extends S.Struct({
  /**
* Total before tax and fees.
*/
"subtotal": S.optionalWith(S.String, { nullable: true }),
  /**
* Total discount as a result of any discounts applied.
* Except for percentage discounts, Paddle applies tax to discounts based on the line item `price.tax_mode`. If `price.tax_mode` for a line item is `internal`, Paddle removes tax from the discount applied.
*/
"discount": S.optionalWith(S.String, { nullable: true }),
  /**
* Total tax on the subtotal.
*/
"tax": S.optionalWith(S.String, { nullable: true }),
  /**
* Total after tax.
*/
"total": S.optionalWith(S.String, { nullable: true }),
  /**
* Total credit applied to this transaction. This includes credits applied using a customer's credit balance and adjustments to a `billed` transaction.
*/
"credit": S.optionalWith(S.String, { nullable: true }),
  /**
* Additional credit generated from negative `details.line_items`. This credit is added to the customer balance.
*/
"credit_to_balance": S.optionalWith(S.String, { nullable: true }),
  /**
* Total due on a transaction after credits and any payments.
*/
"balance": S.optionalWith(S.String, { nullable: true }),
  /**
* Total due on a transaction after credits but before any payments.
*/
"grand_total": S.optionalWith(S.String, { nullable: true }),
  /**
* Total fee taken by Paddle for this payout.
*/
"fee": S.optionalWith(S.String, { nullable: true }),
  /**
* Total earnings for this payout. This is the subtotal minus the Paddle fee.
*/
"earnings": S.optionalWith(S.String, { nullable: true }),
  /**
* Three-letter ISO 4217 currency code used for the payout for this transaction. If your primary currency has changed, this reflects the primary currency at the time the transaction was billed.
*/
"currency_code": S.optionalWith(CurrencyCodePayout, { nullable: true })
}) {}

/**
* Breakdown of the payout total for a transaction after adjustments. `null` until the transaction is `completed`.
*/
export class TransactionPayoutTotalsAdjusted extends S.Struct({
  /**
* Total before tax and fees.
*/
"subtotal": S.optionalWith(S.String, { nullable: true }),
  /**
* Total tax on the subtotal.
*/
"tax": S.optionalWith(S.String, { nullable: true }),
  /**
* Total after tax.
*/
"total": S.optionalWith(S.String, { nullable: true }),
  /**
* Total fee taken by Paddle for this payout.
*/
"fee": S.optionalWith(S.String, { nullable: true }),
  /**
* Details of any chargeback fees incurred for this transaction.
*/
"chargeback_fee": S.optionalWith(S.Struct({
  /**
* Chargeback fee converted into the payout currency.
*/
"amount": S.optionalWith(S.String, { nullable: true }),
  /**
* Chargeback fee before conversion to the payout currency. `null` when the chargeback fee is the same as the payout currency.
*/
"original": S.optionalWith(S.Struct({
  /**
* Fee amount for this chargeback in the original currency.
*/
"amount": S.optionalWith(S.String, { nullable: true }),
  /**
* Three-letter ISO 4217 currency code for the original chargeback fee.
*/
"currency_code": S.optionalWith(CurrencyCodeChargeback, { nullable: true })
}), { nullable: true })
}), { nullable: true }),
  /**
* Total earnings for this payout. This is the subtotal minus the Paddle fee, excluding chargeback fees.
*/
"earnings": S.optionalWith(S.String, { nullable: true }),
  /**
* Three-letter ISO 4217 currency code used for the payout for this transaction. If your primary currency has changed, this reflects the primary currency at the time the transaction was billed.
*/
"currency_code": S.optionalWith(CurrencyCodePayout, { nullable: true })
}) {}

/**
* Calculated totals for a transaction, including proration, discounts, tax, and currency conversion. Considered the source of truth for totals on a transaction.
*/
export class TransactionDetails extends S.Struct({
  /**
* List of tax rates applied for this transaction.
*/
"tax_rates_used": S.optionalWith(S.Array(S.Struct({
  /**
* Rate used to calculate tax for this transaction.
*/
"tax_rate": S.optionalWith(S.String, { nullable: true }),
  /**
* Calculated totals for the tax applied to this transaction.
*/
"totals": S.optionalWith(Totals, { nullable: true })
})), { nullable: true }),
  "totals": S.optionalWith(TransactionTotals, { nullable: true }),
  "adjusted_totals": S.optionalWith(TransactionTotalsAdjusted, { nullable: true }),
  /**
* Breakdown of the payout total for a transaction. `null` until the transaction is `completed`. Returned in your payout currency.
*/
"payout_totals": S.optionalWith(TransactionPayoutTotals, { nullable: true }),
  /**
* Breakdown of the payout total for a transaction after adjustments. `null` until the transaction is `completed`.
*/
"adjusted_payout_totals": S.optionalWith(TransactionPayoutTotalsAdjusted, { nullable: true }),
  /**
* Information about line items for this transaction. Different from transaction `items` as they include totals calculated by Paddle. Considered the source of truth for line item totals.
*/
"line_items": S.optionalWith(S.Array(S.Struct({
  "id": S.optionalWith(TransactionItemId, { nullable: true })
})), { nullable: true })
}) {}

/**
* Unique Paddle ID for this payment method entity, prefixed with `paymtd_`.
*/
export class PaymentMethodId extends S.String.pipe(S.pattern(new RegExp("^paymtd_[a-z\\d]{26}$"))) {}

/**
* Status of this payment attempt.
*/
export class StatusPaymentAttempt extends S.Literal("authorized", "authorized_flagged", "canceled", "captured", "error", "action_required", "pending_no_action_required", "created", "unknown", "dropped") {}

/**
* Reason why a payment attempt failed. Returns `null` if payment captured successfully.
*/
export class ErrorCode extends S.Literal("already_canceled", "already_refunded", "authentication_failed", "blocked_card", "canceled", "declined", "declined_not_retryable", "expired_card", "fraud", "invalid_amount", "invalid_payment_details", "issuer_unavailable", "not_enough_balance", "preferred_network_not_supported", "psp_error", "redacted_payment_method", "system_error", "transaction_not_permitted", "unknown") {}

/**
* Type of payment method used for this payment attempt.
*/
export class TransactionPaymentMethodType extends S.Literal("alipay", "apple_pay", "bancontact", "card", "google_pay", "ideal", "offline", "paypal", "unknown", "wire_transfer") {}

/**
* Type of credit or debit card used to pay.
*/
export class CardType extends S.Literal("american_express", "diners_club", "discover", "jcb", "mada", "maestro", "mastercard", "union_pay", "unknown", "visa") {}

/**
* Last four digits of the card used to pay.
*/
export class CardLast4 extends S.String {}

/**
* Month of the expiry date of the card used to pay.
*/
export class CardExpiryMonth extends S.Number {}

/**
* Year of the expiry date of the card used to pay.
*/
export class CardExpiryYear extends S.Number {}

/**
* The name on the card used to pay.
*/
export class CardCardholderName extends S.String {}

/**
* Card metadata
*/
export class Card extends S.Struct({
  "type": S.optionalWith(CardType, { nullable: true }),
  "last4": S.optionalWith(CardLast4, { nullable: true }),
  "expiry_month": S.optionalWith(CardExpiryMonth, { nullable: true }),
  "expiry_year": S.optionalWith(CardExpiryYear, { nullable: true }),
  "cardholder_name": S.optionalWith(CardCardholderName, { nullable: true })
}) {}

/**
* Information about the payment method used for a payment attempt.
*/
export class MethodDetails extends S.Struct({
  "type": S.optionalWith(TransactionPaymentMethodType, { nullable: true }),
  /**
* Information about the credit or debit card used to pay. `null` unless `type` is `card`.
*/
"card": S.optionalWith(Card, { nullable: true })
}) {}

export class TransactionPaymentAttempt extends S.Struct({
  /**
* UUID for this payment attempt.
*/
"payment_attempt_id": S.optionalWith(S.String, { nullable: true }),
  /**
* UUID for the stored payment method used for this payment attempt. Deprecated - use `payment_method_id` instead.
*/
"stored_payment_method_id": S.optionalWith(S.String, { nullable: true }),
  /**
* Paddle ID of the payment method used for this payment attempt, prefixed with `paymtd_`.
*/
"payment_method_id": S.optionalWith(PaymentMethodId, { nullable: true }),
  /**
* Amount for collection in the lowest denomination of a currency (e.g. cents for USD).
*/
"amount": S.optionalWith(S.String, { nullable: true }),
  "status": S.optionalWith(StatusPaymentAttempt, { nullable: true }),
  /**
* Reason why a payment attempt failed. Returns `null` if payment captured successfully.
*/
"error_code": S.optionalWith(ErrorCode, { nullable: true }),
  "method_details": S.optionalWith(MethodDetails, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this payment was captured. `null` if `status` is not `captured`.
*/
"captured_at": S.optionalWith(Timestamp, { nullable: true })
}) {}

/**
* Represents a transaction entity.
*/
export class TransactionIncludes extends S.Struct({
  /**
* Address for this transaction. Reflects the entity at the time it was added to the transaction, or its revision if `revised_at` is not `null`. Returned when the `include` parameter is used with the `address` value and the transaction has an `address_id`.
*/
"address": S.optionalWith(Address, { nullable: true }),
  /**
* List of adjustments for this transaction. Returned when the `include` parameter is used with the `adjustment` value and the transaction has adjustments.
*/
"adjustments": S.optionalWith(S.Array(Adjustment), { nullable: true }),
  /**
* Object containing totals for all adjustments on a transaction. Returned when the `include` parameter is used with the `adjustments_totals` value.
*/
"adjustments_totals": S.optionalWith(TransactionAdjustmentsTotalsInclude, { nullable: true }),
  /**
* Business for this transaction. Reflects the entity at the time it was added to the transaction, or its revision if `revised_at` is not `null`. Returned when the `include` parameter is used with the `business` value and the transaction has a `business_id`.
*/
"business": S.optionalWith(Business, { nullable: true }),
  /**
* Customer for this transaction. Reflects the entity at the time it was added to the transaction, or its revision if `revised_at` is not `null`. Returned when the `include` parameter is used with the `customer` value and the transaction has a `customer_id`.
*/
"customer": S.optionalWith(Customer, { nullable: true }),
  /**
* Discount for this transaction. Reflects the entity at the time it was added to the transaction. Returned when the `include` parameter is used with the `discount` value and the transaction has a `discount_id`.
*/
"discount": S.optionalWith(Discount, { nullable: true }),
  "available_payment_methods": S.optionalWith(S.Array(PaymentMethodType), { nullable: true }),
  "id": S.optionalWith(TransactionId, { nullable: true }),
  "status": S.optionalWith(StatusTransaction, { nullable: true }),
  /**
* Paddle ID of the customer that this transaction is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of the address that this transaction is for, prefixed with `add_`.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of the business that this transaction is for, prefixed with `biz_`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code. Must be `USD`, `EUR`, or `GBP` if `collection_mode` is `manual`.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  "origin": S.optionalWith(OriginTransaction, { nullable: true }),
  /**
* Paddle ID of the subscription that this transaction is for, prefixed with `sub_`.
*/
"subscription_id": S.optionalWith(SubscriptionId, { nullable: true }),
  /**
* Paddle ID of the invoice that this transaction is related to, prefixed with `inv_`. Used for compatibility with the Paddle Invoice API, which is now deprecated. This field is scheduled to be removed in the next version of the Paddle API.
*/
"invoice_id": S.optionalWith(S.String.pipe(S.pattern(new RegExp("^inv_[a-z\\d]{26}$"))), { nullable: true }),
  /**
* Invoice number for this transaction. Automatically generated by Paddle when you mark a transaction as `billed` where `collection_mode` is `manual`.
*/
"invoice_number": S.optionalWith(DocumentNumber, { nullable: true }),
  /**
* How payment is collected for this transaction. `automatic` for checkout, `manual` for invoices.
*/
"collection_mode": S.optionalWith(CollectionMode, { nullable: true, default: () => "automatic" as const }),
  /**
* Paddle ID of the discount applied to this transaction, prefixed with `dsc_`.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Details for invoicing. Required if `collection_mode` is `manual`.
*/
"billing_details": S.optionalWith(BillingDetails, { nullable: true }),
  /**
* Time period that this transaction is for. Set automatically by Paddle for subscription renewals to describe the period that charges are for.
*/
"billing_period": S.optionalWith(TimePeriod, { nullable: true }),
  /**
* List of items on this transaction. For calculated totals, use `details.line_items`.
*/
"items": S.optionalWith(S.Array(TransactionItem).pipe(S.minItems(1), S.maxItems(100)), { nullable: true }),
  "details": S.optionalWith(TransactionDetails, { nullable: true }),
  /**
* List of payment attempts for this transaction, including successful payments. Sorted by `created_at` in descending order, so most recent attempts are returned first.
*/
"payments": S.optionalWith(S.Array(TransactionPaymentAttempt), { nullable: true }),
  /**
* Paddle Checkout details for this transaction. Returned for automatically-collected transactions and where `billing_details.enable_checkout` is `true` for manually-collected transactions; `null` otherwise.
*/
"checkout": S.optionalWith(S.Struct({
  /**
* Paddle Checkout URL for this transaction, composed of the URL passed in the request or your default payment URL + `?_ptxn=` and the Paddle ID for this transaction.
*/
"url": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(2048)), { nullable: true })
}), { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this transaction was marked as `billed`. `null` for transactions that aren't `billed` or `completed`. Set automatically by Paddle.
*/
"billed_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when a transaction was revised. Revisions describe an update to customer information for a billed or completed transaction. `null` if not revised. Set automatically by Paddle.
*/
"revised_at": S.optionalWith(Timestamp, { nullable: true })
}) {}

export class ListTransactions200 extends S.Struct({
  "data": S.Array(TransactionIncludes),
  "meta": MetaPaginated
}) {}

export class CreateTransactionParams extends S.Struct({
  "include": S.optionalWith(S.Array(S.Literal("address", "adjustments", "adjustments_totals", "available_payment_methods", "business", "customer", "discount")), { nullable: true })
}) {}

export class TransactionItemCreateWithPriceId extends S.Struct({
  /**
* Paddle ID of an existing catalog price to add to this transaction, prefixed with `pri_`.
*/
"price_id": PriceId,
  /**
* Quantity of this item on the transaction.
*/
"quantity": S.Int.pipe(S.greaterThanOrEqualTo(1)),
  /**
* How proration was calculated for this item. Populated when a transaction is created from a subscription change, where `proration_billing_mode` was `prorated_immediately` or `prorated_next_billing_period`. Set automatically by Paddle.
*/
"proration": S.optionalWith(TransactionItemProration, { nullable: true })
}) {}

/**
* Represents a price entity.
*/
export class TransactionPriceCreateWithProductId extends S.Struct({
  /**
* Paddle ID for the product that this price is for, prefixed with `pro_`.
*/
"product_id": S.optionalWith(ProductId, { nullable: true }),
  /**
* Internal description for this price, not shown to customers. Typically notes for your team.
*/
"description": S.String.pipe(S.minLength(2), S.maxLength(500)),
  /**
* Name of this price, shown to customers at checkout and on invoices. Typically describes how often the related product bills.
*/
"name": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(150)), { nullable: true }),
  /**
* How often this price should be charged. `null` if price is non-recurring (one-time).
*/
"billing_cycle": S.optionalWith(Duration, { nullable: true }),
  /**
* Trial period for the product related to this price. The billing cycle begins once the trial period is over. `null` for no trial period. Requires `billing_cycle`.
*/
"trial_period": S.optionalWith(Duration, { nullable: true }),
  "tax_mode": S.optionalWith(TaxMode, { nullable: true, default: () => "account_setting" as const }),
  /**
* Base price. This price applies to all customers, except for customers located in countries where you have `unit_price_overrides`.
*/
"unit_price": Money,
  /**
* List of unit price overrides. Use to override the base price with a custom price and currency for a country or group of countries.
*/
"unit_price_overrides": S.optionalWith(S.Array(UnitPriceOverride).pipe(S.maxItems(250)), { nullable: true }),
  /**
* Limits on how many times the related product can be purchased at this price. Useful for discount campaigns. If omitted, defaults to 1-100.
*/
"quantity": S.optionalWith(PriceQuantity, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true })
}) {}

export class TransactionItemCreateWithPrice extends S.Struct({
  /**
* Price object for a non-catalog item to charge for. Include a `product_id` to relate this non-catalog price to an existing catalog price.
*/
"price": TransactionPriceCreateWithProductId,
  /**
* Quantity of this item on the transaction.
*/
"quantity": S.Int.pipe(S.greaterThanOrEqualTo(1)),
  /**
* How proration was calculated for this item. Populated when a transaction is created from a subscription change, where `proration_billing_mode` was `prorated_immediately` or `prorated_next_billing_period`. Set automatically by Paddle.
*/
"proration": S.optionalWith(TransactionItemProration, { nullable: true })
}) {}

export class TransactionSubscriptionProductCreate extends S.Struct({
  /**
* Name of this product.
*/
"name": S.String.pipe(S.minLength(1), S.maxLength(200)),
  /**
* Short description for this product.
*/
"description": S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
  "tax_category": TaxCategory,
  /**
* Image for this product. Included in the checkout and on some customer documents.
*/
"image_url": S.optionalWith(S.Union(S.String.pipe(S.minLength(0), S.maxLength(0)),
S.String.pipe(S.minLength(1))), { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true })
}) {}

/**
* Represents a price entity.
*/
export class TransactionPriceCreateWithProduct extends S.Struct({
  /**
* Product object for a non-catalog item to charge for.
*/
"product": S.optionalWith(TransactionSubscriptionProductCreate, { nullable: true }),
  /**
* Internal description for this price, not shown to customers. Typically notes for your team.
*/
"description": S.String.pipe(S.minLength(2), S.maxLength(500)),
  /**
* Name of this price, shown to customers at checkout and on invoices. Typically describes how often the related product bills.
*/
"name": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(150)), { nullable: true }),
  /**
* How often this price should be charged. `null` if price is non-recurring (one-time).
*/
"billing_cycle": S.optionalWith(Duration, { nullable: true }),
  /**
* Trial period for the product related to this price. The billing cycle begins once the trial period is over. `null` for no trial period. Requires `billing_cycle`.
*/
"trial_period": S.optionalWith(Duration, { nullable: true }),
  "tax_mode": S.optionalWith(TaxMode, { nullable: true, default: () => "account_setting" as const }),
  /**
* Base price. This price applies to all customers, except for customers located in countries where you have `unit_price_overrides`.
*/
"unit_price": Money,
  /**
* List of unit price overrides. Use to override the base price with a custom price and currency for a country or group of countries.
*/
"unit_price_overrides": S.optionalWith(S.Array(UnitPriceOverride).pipe(S.maxItems(250)), { nullable: true }),
  /**
* Limits on how many times the related product can be purchased at this price. Useful for discount campaigns. If omitted, defaults to 1-100.
*/
"quantity": S.optionalWith(PriceQuantity, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true })
}) {}

export class TransactionItemCreateWithPriceAndProduct extends S.Struct({
  /**
* Price object for a non-catalog item to charge for. Include a `product` object to create a non-catalog product for this non-catalog price.
*/
"price": TransactionPriceCreateWithProduct,
  /**
* Quantity of this item on the transaction.
*/
"quantity": S.Int.pipe(S.greaterThanOrEqualTo(1)),
  /**
* How proration was calculated for this item. Populated when a transaction is created from a subscription change, where `proration_billing_mode` was `prorated_immediately` or `prorated_next_billing_period`. Set automatically by Paddle.
*/
"proration": S.optionalWith(TransactionItemProration, { nullable: true })
}) {}

/**
* Represents a transaction entity when creating transactions.
*/
export class TransactionCreate extends S.Class<TransactionCreate>("TransactionCreate")({
  "id": S.optionalWith(TransactionId, { nullable: true }),
  /**
* Status of this transaction. You may set a transaction to `billed` when creating,
* or omit to let Paddle set the status. Transactions are created as `ready` if they have
* an `address_id`, `customer_id`, and `items`, otherwise they are created as `draft`.
* 
* Marking as `billed` when creating is typically used when working with manually-collected
* transactions as part of an invoicing workflow. Billed transactions cannot be updated, only canceled.
*/
"status": S.optionalWith(StatusTransaction, { nullable: true }),
  /**
* Paddle ID of the customer that this transaction is for, prefixed with `ctm_`. If omitted, transaction status is `draft`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of the address that this transaction is for, prefixed with `add_`. Requires `customer_id`. If omitted, transaction status is `draft`.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of the business that this transaction is for, prefixed with `biz_`. Requires `customer_id`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code. Must be `USD`, `EUR`, or `GBP` if `collection_mode` is `manual`.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  "origin": S.optionalWith(OriginTransaction, { nullable: true }),
  /**
* Paddle ID of the subscription that this transaction is for, prefixed with `sub_`.
*/
"subscription_id": S.optionalWith(SubscriptionId, { nullable: true }),
  /**
* Paddle ID of the invoice that this transaction is related to, prefixed with `inv_`. Used for compatibility with the Paddle Invoice API, which is now deprecated. This field is scheduled to be removed in the next version of the Paddle API.
*/
"invoice_id": S.optionalWith(S.String.pipe(S.pattern(new RegExp("^inv_[a-z\\d]{26}$"))), { nullable: true }),
  /**
* Invoice number for this transaction. Automatically generated by Paddle when you mark a transaction as `billed` where `collection_mode` is `manual`.
*/
"invoice_number": S.optionalWith(S.String, { nullable: true }),
  /**
* How payment is collected for this transaction. `automatic` for checkout, `manual` for invoices. If omitted, defaults to `automatic`.
*/
"collection_mode": S.optionalWith(CollectionMode, { nullable: true, default: () => "automatic" as const }),
  /**
* Paddle ID of the discount applied to this transaction, prefixed with `dsc_`.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Details for invoicing. Required if `collection_mode` is `manual`.
*/
"billing_details": S.optionalWith(BillingDetails, { nullable: true }),
  /**
* Time period that this transaction is for. Set automatically by Paddle for subscription renewals to describe the period that charges are for.
*/
"billing_period": S.optionalWith(TimePeriod, { nullable: true }),
  /**
* List of items to charge for. You can charge for items that you've added to your catalog by passing the Paddle ID of an existing price entity, or you can charge for non-catalog items by passing a price object.
* 
* Non-catalog items can be for existing products, or you can pass a product object as part of your price to charge for a non-catalog product.
*/
"items": S.Array(S.Union(/**
* Add a catalog item to a transaction. In this case, the product and price that you're billing for exist in your product catalog in Paddle.
*/
TransactionItemCreateWithPriceId,
/**
* Add a non-catalog price for an existing product in your catalog to a transaction. In this case, the product you're billing for is a catalog product, but you charge a specific price for it.
*/
TransactionItemCreateWithPrice,
/**
* Add a non-catalog price for a non-catalog product in your catalog to a transaction. In this case, the product and price that you're billing for are specific to this transaction.
*/
TransactionItemCreateWithPriceAndProduct)).pipe(S.minItems(1), S.maxItems(100)),
  "details": S.optionalWith(TransactionDetails, { nullable: true }),
  /**
* List of payment attempts for this transaction, including successful payments. Sorted by `created_at` in descending order, so most recent attempts are returned first.
*/
"payments": S.optionalWith(S.Array(TransactionPaymentAttempt), { nullable: true }),
  /**
* Paddle Checkout details for this transaction. You may pass a URL when creating or updating an automatically-collected transaction, or when creating or updating a manually-collected transaction where `billing_details.enable_checkout` is `true`.
*/
"checkout": S.optionalWith(S.Struct({
  /**
* Checkout URL to use for the payment link for this transaction. Pass the URL for an approved domain, or omit to use your default payment URL.
* 
* Paddle returns a unique payment link composed of the URL passed or your default payment URL + `?_ptxn=` and the Paddle ID for this transaction.
*/
"url": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(2048)), { nullable: true })
}), { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this transaction was marked as `billed`. `null` for transactions that aren't `billed` or `completed`. Set automatically by Paddle.
*/
"billed_at": S.optionalWith(Timestamp, { nullable: true })
}) {}

export class CreateTransaction201 extends S.Struct({
  "data": TransactionIncludes,
  "meta": Meta
}) {}

export class TransactionPricingPreviewItem extends S.Struct({
  /**
* Paddle ID for the price to add to this transaction, prefixed with `pri_`.
*/
"price_id": S.optionalWith(PriceId, { nullable: true }),
  /**
* Quantity of the item to preview.
*/
"quantity": S.Int.pipe(S.greaterThanOrEqualTo(1))
}) {}

/**
* Represents an address entity when previewing addresses.
*/
export class AddressPreview extends S.Struct({
  /**
* ZIP or postal code of this address. Include for more accurate tax calculations.
*/
"postal_code": S.optionalWith(S.String.pipe(S.maxLength(200)), { nullable: true }),
  /**
* Supported two-letter ISO 3166-1 alpha-2 country code for this address.
*/
"country_code": CountryCode
}) {}

export class TransactionPricingPreviewRequest extends S.Class<TransactionPricingPreviewRequest>("TransactionPricingPreviewRequest")({
  /**
* List of items to preview price calculations for.
*/
"items": S.Array(TransactionPricingPreviewItem).pipe(S.minItems(1), S.maxItems(100)),
  /**
* Paddle ID of the customer that this preview is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of the address that this preview is for, prefixed with `add_`. Send one of `address_id`, `customer_ip_address`, or the `address` object when previewing.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of the business that this preview is for, prefixed with `biz_`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  /**
* Paddle ID of the discount applied to this preview, prefixed with `dsc_`.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Address for this preview. Send one of `address_id`, `customer_ip_address`, or the `address` object when previewing.
*/
"address": S.optionalWith(AddressPreview, { nullable: true }),
  /**
* IP address for this transaction preview. Send one of `address_id`, `customer_ip_address`, or the `address` object when previewing.
*/
"customer_ip_address": S.optionalWith(S.String, { nullable: true })
}) {}

/**
* Array of discounts applied to this preview line item. Empty if no discounts applied.
*/
export class TransactionPricingPreviewLineItemDiscount extends S.Struct({
  /**
* Related discount entity for this preview line item.
*/
"discount": S.optionalWith(Discount, { nullable: true }),
  /**
* Total amount discounted as a result of this discount.
*/
"total": S.optionalWith(S.String, { nullable: true }),
  /**
* Total amount discounted as a result of this discount in the format of a given currency. '
*/
"formatted_total": S.optionalWith(S.String, { nullable: true })
}) {}

/**
* Information about line items for this preview. Includes totals calculated by Paddle. Considered the source of truth for line item totals.
*/
export class TransactionPricingPreviewLineItem extends S.Struct({
  /**
* Related price entity for this preview line item.
*/
"price": S.optionalWith(Price, { nullable: true }),
  /**
* Quantity of this preview line item.
*/
"quantity": S.optionalWith(S.Int, { nullable: true }),
  /**
* Rate used to calculate tax for this preview line item.
*/
"tax_rate": S.optionalWith(S.String, { nullable: true }),
  /**
* Breakdown of the charge for one unit in the lowest denomination of a currency (e.g. cents for USD).
*/
"unit_totals": S.optionalWith(Totals, { nullable: true }),
  /**
* Breakdown of the charge for one unit in the format of a given currency.
*/
"formatted_unit_totals": S.optionalWith(Totals, { nullable: true }),
  "totals": S.optionalWith(Totals, { nullable: true }),
  /**
* The financial breakdown of a charge in the format of a given currency.
*/
"formatted_totals": S.optionalWith(Totals, { nullable: true }),
  /**
* Related product entity for this preview line item price.
*/
"product": S.optionalWith(Product, { nullable: true }),
  "discounts": S.optionalWith(S.Array(TransactionPricingPreviewLineItemDiscount), { nullable: true })
}) {}

/**
* Calculated totals for a price preview, including discounts, tax, and currency conversion.
*/
export class TransactionPricingPreviewDetails extends S.Struct({
  "line_items": S.optionalWith(S.Array(TransactionPricingPreviewLineItem), { nullable: true })
}) {}

export class TransactionPricingPreviewResponse extends S.Struct({
  "details": S.optionalWith(TransactionPricingPreviewDetails, { nullable: true }),
  "available_payment_methods": S.optionalWith(S.Array(PaymentMethodType), { nullable: true }),
  /**
* Paddle ID of the customer that this preview is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of the address that this preview is for, prefixed with `add_`. Send one of `address_id`, `customer_ip_address`, or the `address` object when previewing.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of the business that this preview is for, prefixed with `biz_`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  /**
* Paddle ID of the discount applied to this preview, prefixed with `dsc_`.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Address for this preview. Send one of `address_id`, `customer_ip_address`, or the `address` object when previewing.
*/
"address": S.optionalWith(AddressPreview, { nullable: true }),
  /**
* IP address for this transaction preview. Send one of `address_id`, `customer_ip_address`, or the `address` object when previewing.
*/
"customer_ip_address": S.optionalWith(S.String, { nullable: true })
}) {}

export class PreviewPrices200 extends S.Struct({
  "data": TransactionPricingPreviewResponse,
  "meta": Meta
}) {}

export class TransactionPreviewItemWithPriceId extends S.Struct({
  /**
* Paddle ID of an existing catalog price to preview charging for, prefixed with `pri_`.
*/
"price_id": PriceId,
  /**
* Quantity of this item on the transaction.
*/
"quantity": S.Int,
  /**
* Whether this item should be included in totals for this transaction preview. Typically used to exclude one-time charges from calculations.
*/
"include_in_totals": S.optionalWith(S.Boolean, { nullable: true, default: () => true as const }),
  /**
* How proration was calculated for this item. `null` for transaction previews.
*/
"proration": S.optionalWith(TransactionItemProration, { nullable: true })
}) {}

export class TransactionPreviewItemWithPrice extends S.Struct({
  /**
* Price object for a non-catalog item to preview charging for. Include a `product_id` to relate this non-catalog price to an existing catalog price.
*/
"price": TransactionPriceCreateWithProductId,
  /**
* Quantity of this item on the transaction.
*/
"quantity": S.Int,
  /**
* Whether this item should be included in totals for this transaction preview. Typically used to exclude one-time charges from calculations.
*/
"include_in_totals": S.optionalWith(S.Boolean, { nullable: true, default: () => true as const }),
  /**
* How proration was calculated for this item. `null` for transaction previews.
*/
"proration": S.optionalWith(TransactionItemProration, { nullable: true })
}) {}

export class TransactionPreviewItemWithPriceAndProduct extends S.Struct({
  /**
* Price object for a non-catalog item to preview charging for. Include a `product` object to create a non-catalog product for this non-catalog price.
*/
"price": TransactionPriceCreateWithProduct,
  /**
* Quantity of this item on the transaction.
*/
"quantity": S.Int,
  /**
* Whether this item should be included in totals for this transaction preview. Typically used to exclude one-time charges from calculations.
*/
"include_in_totals": S.optionalWith(S.Boolean, { nullable: true, default: () => true as const }),
  /**
* How proration was calculated for this item. `null` for transaction previews.
*/
"proration": S.optionalWith(TransactionItemProration, { nullable: true })
}) {}

/**
* Represents a transaction entity when previewing.
*/
export class TransactionPreviewCreate extends S.Struct({
  /**
* Paddle ID of the customer that this transaction preview is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  /**
* Paddle ID of the discount applied to this transaction preview, prefixed with `dsc_`.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Whether trials should be ignored for transaction preview calculations.
* 
* By default, recurring items with trials are considered to have a zero charge when previewing. Set to `true` to disable this.
*/
"ignore_trials": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  /**
* List of items to preview charging for. You can preview charging for items that you've added to your catalog by passing the Paddle ID of an existing price entity, or you can preview charging for non-catalog items by passing a price object.
* 
* Non-catalog items can be for existing products, or you can pass a product object as part of your price to preview charging for a non-catalog product.
*/
"items": S.Array(S.Union(/**
* Add a catalog item to a transaction. In this case, the product and price that you're billing for exist in your product catalog in Paddle.
*/
TransactionPreviewItemWithPriceId,
/**
* Add a non-catalog price for an existing product in your catalog to a transaction. In this case, the product you're billing for is a catalog product, but you charge a specific price for it.
*/
TransactionPreviewItemWithPrice,
/**
* Add a non-catalog price for a non-catalog product in your catalog to a transaction. In this case, the product and price that you're billing for are specific to this transaction.
*/
TransactionPreviewItemWithPriceAndProduct))
}) {}

/**
* Represents a transaction entity when previewing.
*/
export class TransactionPreviewCreateAddress extends S.Struct({
  /**
* Paddle ID of the customer that this transaction preview is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  /**
* Paddle ID of the discount applied to this transaction preview, prefixed with `dsc_`.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Whether trials should be ignored for transaction preview calculations.
* 
* By default, recurring items with trials are considered to have a zero charge when previewing. Set to `true` to disable this.
*/
"ignore_trials": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  /**
* List of items to preview charging for. You can preview charging for items that you've added to your catalog by passing the Paddle ID of an existing price entity, or you can preview charging for non-catalog items by passing a price object.
* 
* Non-catalog items can be for existing products, or you can pass a product object as part of your price to preview charging for a non-catalog product.
*/
"items": S.Array(S.Union(/**
* Add a catalog item to a transaction. In this case, the product and price that you're billing for exist in your product catalog in Paddle.
*/
TransactionPreviewItemWithPriceId,
/**
* Add a non-catalog price for an existing product in your catalog to a transaction. In this case, the product you're billing for is a catalog product, but you charge a specific price for it.
*/
TransactionPreviewItemWithPrice,
/**
* Add a non-catalog price for a non-catalog product in your catalog to a transaction. In this case, the product and price that you're billing for are specific to this transaction.
*/
TransactionPreviewItemWithPriceAndProduct)),
  /**
* Address for this transaction preview.
*/
"address": S.Record({ key: S.String, value: S.Unknown })
}) {}

/**
* Represents a transaction entity when previewing.
*/
export class TransactionPreviewCreateIpAddress extends S.Struct({
  /**
* Paddle ID of the customer that this transaction preview is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  /**
* Paddle ID of the discount applied to this transaction preview, prefixed with `dsc_`.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Whether trials should be ignored for transaction preview calculations.
* 
* By default, recurring items with trials are considered to have a zero charge when previewing. Set to `true` to disable this.
*/
"ignore_trials": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  /**
* List of items to preview charging for. You can preview charging for items that you've added to your catalog by passing the Paddle ID of an existing price entity, or you can preview charging for non-catalog items by passing a price object.
* 
* Non-catalog items can be for existing products, or you can pass a product object as part of your price to preview charging for a non-catalog product.
*/
"items": S.Array(S.Union(/**
* Add a catalog item to a transaction. In this case, the product and price that you're billing for exist in your product catalog in Paddle.
*/
TransactionPreviewItemWithPriceId,
/**
* Add a non-catalog price for an existing product in your catalog to a transaction. In this case, the product you're billing for is a catalog product, but you charge a specific price for it.
*/
TransactionPreviewItemWithPrice,
/**
* Add a non-catalog price for a non-catalog product in your catalog to a transaction. In this case, the product and price that you're billing for are specific to this transaction.
*/
TransactionPreviewItemWithPriceAndProduct)),
  /**
* IP address for this transaction preview.
*/
"customer_ip_address": S.String
}) {}

/**
* Represents a transaction entity when previewing.
*/
export class TransactionPreviewCreatePaddleIds extends S.Struct({
  /**
* Paddle ID of the customer that this transaction preview is for, prefixed with `ctm_`.
*/
"customer_id": S.NullOr(CustomerId),
  /**
* Supported three-letter ISO 4217 currency code.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  /**
* Paddle ID of the discount applied to this transaction preview, prefixed with `dsc_`.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Whether trials should be ignored for transaction preview calculations.
* 
* By default, recurring items with trials are considered to have a zero charge when previewing. Set to `true` to disable this.
*/
"ignore_trials": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  /**
* List of items to preview charging for. You can preview charging for items that you've added to your catalog by passing the Paddle ID of an existing price entity, or you can preview charging for non-catalog items by passing a price object.
* 
* Non-catalog items can be for existing products, or you can pass a product object as part of your price to preview charging for a non-catalog product.
*/
"items": S.Array(S.Union(/**
* Add a catalog item to a transaction. In this case, the product and price that you're billing for exist in your product catalog in Paddle.
*/
TransactionPreviewItemWithPriceId,
/**
* Add a non-catalog price for an existing product in your catalog to a transaction. In this case, the product you're billing for is a catalog product, but you charge a specific price for it.
*/
TransactionPreviewItemWithPrice,
/**
* Add a non-catalog price for a non-catalog product in your catalog to a transaction. In this case, the product and price that you're billing for are specific to this transaction.
*/
TransactionPreviewItemWithPriceAndProduct)),
  /**
* Paddle ID of the address that this transaction preview is for, prefixed with `add_`. Requires `customer_id`.
*/
"address_id": AddressId,
  /**
* Paddle ID of the business that this transaction preview is for, prefixed with `biz_`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true })
}) {}

export class PreviewTransactionCreateRequest extends S.Union(/**
* Preview a transaction without using any address information.
*/
TransactionPreviewCreate,
/**
* Paddle uses the country and ZIP code (where supplied) to calculate totals.
*/
TransactionPreviewCreateAddress,
/**
* Paddle fetches location using the IP address to calculate totals.
*/
TransactionPreviewCreateIpAddress,
/**
* Paddle uses existing customer data to calculate totals. Typically used for logged-in customers.
*/
TransactionPreviewCreatePaddleIds) {}

/**
* Represents a price preview entity.
*/
export class PricePreview extends S.Struct({
  /**
* Unique Paddle ID for this price, prefixed with `pri_`.
* The value is null for custom prices being previewed.
*/
"id": S.optionalWith(PriceId, { nullable: true }),
  /**
* Paddle ID for the product that this price is for, prefixed with `pro_`.
* The value is null for custom products being previewed.
*/
"product_id": S.optionalWith(ProductId, { nullable: true }),
  /**
* Internal description for this price, not shown to customers. Typically notes for your team.
*/
"description": S.optionalWith(S.String.pipe(S.minLength(2), S.maxLength(500)), { nullable: true }),
  "type": S.optionalWith(CatalogType, { nullable: true, default: () => "standard" as const }),
  "name": S.optionalWith(PriceName, { nullable: true }),
  /**
* How often this price should be charged. `null` if price is non-recurring (one-time).
*/
"billing_cycle": S.optionalWith(Duration, { nullable: true }),
  /**
* Trial period for the product related to this price. The billing cycle begins once the trial period is over. `null` for no trial period. Requires `billing_cycle`.
*/
"trial_period": S.optionalWith(Duration, { nullable: true }),
  "tax_mode": S.optionalWith(TaxMode, { nullable: true, default: () => "account_setting" as const }),
  /**
* Base price. This price applies to all customers, except for customers located in countries where you have `unit_price_overrides`.
*/
"unit_price": S.optionalWith(Money, { nullable: true }),
  /**
* List of unit price overrides. Use to override the base price with a custom price and currency for a country or group of countries.
*/
"unit_price_overrides": S.optionalWith(S.Array(UnitPriceOverride).pipe(S.maxItems(250)), { nullable: true }),
  /**
* Limits on how many times the related product can be purchased at this price. Useful for discount campaigns.
*/
"quantity": S.optionalWith(PriceQuantity, { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true })
}) {}

export class TransactionPreviewItem extends S.Struct({
  "price": PricePreview,
  /**
* Quantity of this item on the transaction.
*/
"quantity": S.Int,
  /**
* Whether this item should be included in totals for this transaction preview. Typically used to exclude one-time charges from calculations.
*/
"include_in_totals": S.optionalWith(S.Boolean, { nullable: true, default: () => true as const }),
  /**
* How proration was calculated for this item. `null` for transaction previews.
*/
"proration": S.optionalWith(TransactionItemProration, { nullable: true })
}) {}

/**
* Represents a product (preview) entity.
*/
export class ProductPreview extends S.Struct({
  /**
* Unique Paddle ID for this product, prefixed with `pro_`.
* The value is null for custom products being previewed.
*/
"id": S.optionalWith(ProductId, { nullable: true }),
  "name": S.optionalWith(ProductName, { nullable: true }),
  /**
* Short description for this product.
*/
"description": S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
  "type": S.optionalWith(CatalogType, { nullable: true, default: () => "standard" as const }),
  "tax_category": S.optionalWith(TaxCategory, { nullable: true }),
  /**
* Image for this product. Included in the checkout and on some customer documents.
*/
"image_url": S.optionalWith(S.Union(ImageUrl,
EmptyString), { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true })
}) {}

/**
* Information about line items for this transaction preview. Different from transaction preview `items` as they include totals calculated by Paddle. Considered the source of truth for line item totals.
*/
export class TransactionPreviewLineItem extends S.Struct({
  /**
* Paddle ID for the price related to this transaction line item, prefixed with `pri_`.
* The value is null for custom prices being previewed.
*/
"price_id": S.optionalWith(PriceId, { nullable: true }),
  /**
* Quantity of this transaction line item.
*/
"quantity": S.optionalWith(S.Int, { nullable: true }),
  /**
* Rate used to calculate tax for this transaction line item.
*/
"tax_rate": S.optionalWith(S.String, { nullable: true }),
  /**
* Breakdown of the charge for one unit in the lowest denomination of a currency (e.g. cents for USD).
*/
"unit_totals": S.optionalWith(Totals, { nullable: true }),
  "totals": S.optionalWith(Totals, { nullable: true }),
  /**
* Related product entity for this transaction line item price.
*/
"product": S.optionalWith(ProductPreview, { nullable: true }),
  /**
* How proration was calculated for this item.
*/
"proration": S.optionalWith(TransactionItemProration, { nullable: true })
}) {}

/**
* Calculated totals for a transaction preview, including discounts, tax, and currency conversion. Considered the source of truth for totals on a transaction preview.
*/
export class TransactionPreviewDetails extends S.Struct({
  /**
* List of tax rates applied to this transaction preview.
*/
"tax_rates_used": S.optionalWith(S.Array(S.Struct({
  /**
* Rate used to calculate tax for this transaction preview.
*/
"tax_rate": S.optionalWith(S.String, { nullable: true }),
  /**
* Calculated totals for the tax applied to this transaction preview.
*/
"totals": S.optionalWith(Totals, { nullable: true })
})), { nullable: true }),
  /**
* Breakdown of the total for a transaction preview. `fee` and `earnings` always return `null` for transaction previews.
*/
"totals": S.optionalWith(TransactionTotals, { nullable: true }),
  /**
* Information about line items for this transaction preview. Different from transaction preview `items` as they include totals calculated by Paddle. Considered the source of truth for line item totals.
*/
"line_items": S.optionalWith(S.Array(TransactionPreviewLineItem), { nullable: true })
}) {}

/**
* Represents a transaction entity when previewing transactions.
*/
export class TransactionPreview extends S.Struct({
  /**
* Paddle ID of the customer that this transaction preview is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of the address that this transaction preview is for, prefixed with `add_`. Send one of `address_id`, `customer_ip_address`, or the `address` object when previewing.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of the business that this transaction preview is for, prefixed with `biz_`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  /**
* Paddle ID of the discount applied to this transaction preview, prefixed with `dsc_`.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* IP address for this transaction preview. Send one of `address_id`, `customer_ip_address`, or the `address` object when previewing.
*/
"customer_ip_address": S.optionalWith(S.String, { nullable: true }),
  /**
* Address for this transaction preview. Send one of `address_id`, `customer_ip_address`, or the `address` object when previewing.
*/
"address": S.optionalWith(AddressPreview, { nullable: true }),
  /**
* Whether trials should be ignored for transaction preview calculations.
* 
* By default, recurring items with trials are considered to have a zero charge when previewing. Set to `true` to disable this.
*/
"ignore_trials": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  /**
* List of items to preview transaction calculations for.
*/
"items": S.Array(TransactionPreviewItem).pipe(S.minItems(1), S.maxItems(100)),
  "details": S.optionalWith(TransactionPreviewDetails, { nullable: true }),
  "available_payment_methods": S.optionalWith(S.Array(PaymentMethodType), { nullable: true })
}) {}

export class PreviewTransactionCreate200 extends S.Struct({
  "data": TransactionPreview,
  "meta": Meta
}) {}

export class GetTransactionParams extends S.Struct({
  "include": S.optionalWith(S.Array(S.Literal("address", "adjustments", "adjustments_totals", "available_payment_methods", "business", "customer", "discount")), { nullable: true })
}) {}

export class GetTransaction200 extends S.Struct({
  "data": TransactionIncludes,
  "meta": Meta
}) {}

export class UpdateTransactionParams extends S.Struct({
  "include": S.optionalWith(S.Array(S.Literal("address", "adjustments", "adjustments_totals", "available_payment_methods", "business", "customer", "discount")), { nullable: true })
}) {}

/**
* Details for invoicing. Required if `collection_mode` is `manual`.
*/
export class BillingDetailsUpdate extends S.Struct({
  /**
* Whether the related transaction may be paid using Paddle Checkout.
*/
"enable_checkout": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  /**
* Customer purchase order number. Appears on invoice documents.
*/
"purchase_order_number": S.optionalWith(S.String.pipe(S.maxLength(100)), { nullable: true }),
  /**
* Notes or other information to include on this invoice. Appears on invoice documents.
*/
"additional_information": S.optionalWith(S.String.pipe(S.maxLength(1500)), { nullable: true }),
  /**
* How long a customer has to pay this invoice once issued.
*/
"payment_terms": S.optionalWith(Duration, { nullable: true })
}) {}

/**
* Represents a transaction entity when updating transactions.
*/
export class TransactionUpdate extends S.Struct({
  "id": S.optionalWith(TransactionId, { nullable: true }),
  /**
* Status of this transaction. You may set a transaction to `billed` or `canceled`. Billed transactions cannot be changed.
* 
* For manually-collected transactions, marking as `billed` is essentially issuing an invoice.
*/
"status": S.optionalWith(StatusTransaction, { nullable: true }),
  /**
* Paddle ID of the customer that this transaction is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of the address that this transaction is for, prefixed with `add_`.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of the business that this transaction is for, prefixed with `biz_`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code. Must be `USD`, `EUR`, or `GBP` if `collection_mode` is `manual`.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  "origin": S.optionalWith(OriginTransaction, { nullable: true }),
  /**
* Paddle ID of the subscription that this transaction is for, prefixed with `sub_`.
*/
"subscription_id": S.optionalWith(SubscriptionId, { nullable: true }),
  /**
* Paddle ID of the invoice that this transaction is related to, prefixed with `inv_`. Used for compatibility with the Paddle Invoice API, which is now deprecated. This field is scheduled to be removed in the next version of the Paddle API.
*/
"invoice_id": S.optionalWith(S.String.pipe(S.pattern(new RegExp("^inv_[a-z\\d]{26}$"))), { nullable: true }),
  /**
* Invoice number for this transaction. Automatically generated by Paddle when you mark a transaction as `billed` where `collection_mode` is `manual`.
*/
"invoice_number": S.optionalWith(S.String, { nullable: true }),
  /**
* How payment is collected for this transaction. `automatic` for checkout, `manual` for invoices.
*/
"collection_mode": S.optionalWith(CollectionMode, { nullable: true, default: () => "automatic" as const }),
  /**
* Paddle ID of the discount applied to this transaction, prefixed with `dsc_`.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Details for invoicing. Required if `collection_mode` is `manual`.
*/
"billing_details": S.optionalWith(BillingDetailsUpdate, { nullable: true }),
  /**
* Time period that this transaction is for. Set automatically by Paddle for subscription renewals to describe the period that charges are for.
*/
"billing_period": S.optionalWith(TimePeriod, { nullable: true }),
  /**
* List of items on this transaction.
* 
* When making a request, each object must contain either a `price_id` or a `price` object, and a `quantity`.
* 
* Include a `price_id` to charge for an existing catalog item, or a `price` object to charge for a non-catalog item.
*/
"items": S.optionalWith(S.Array(S.Union(/**
* Add a catalog item to a transaction. In this case, the product and price that you're billing for exist in your product catalog in Paddle.
*/
TransactionItemCreateWithPriceId,
/**
* Add a non-catalog price for an existing product in your catalog to a transaction. In this case, the product you're billing for is a catalog product, but you charge a specific price for it.
*/
TransactionItemCreateWithPrice,
/**
* Add a non-catalog price for a non-catalog product in your catalog to a transaction. In this case, the product and price that you're billing for are specific to this transaction.
*/
TransactionItemCreateWithPriceAndProduct)).pipe(S.minItems(1), S.maxItems(100)), { nullable: true }),
  "details": S.optionalWith(TransactionDetails, { nullable: true }),
  /**
* List of payment attempts for this transaction, including successful payments. Sorted by `created_at` in descending order, so most recent attempts are returned first.
*/
"payments": S.optionalWith(S.Array(TransactionPaymentAttempt), { nullable: true }),
  /**
* Paddle Checkout details for this transaction. You may pass a URL when creating or updating an automatically-collected transaction, or when creating or updating a manually-collected transaction where `billing_details.enable_checkout` is `true`.
*/
"checkout": S.optionalWith(S.Struct({
  /**
* Checkout URL to use for the payment link for this transaction. Pass the URL for an approved domain, or `null` to set to your default payment URL.
* 
* Paddle returns a unique payment link composed of the URL passed or your default payment URL + `?_ptxn=` and the Paddle ID for this transaction.
*/
"url": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(2048)), { nullable: true })
}), { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this transaction was marked as `billed`. `null` for transactions that aren't `billed` or `completed`. Set automatically by Paddle.
*/
"billed_at": S.optionalWith(Timestamp, { nullable: true })
}) {}

export class UpdateTransactionRequest extends UpdateTransactionRequest {}

export class UpdateTransaction200 extends S.Struct({
  "data": TransactionIncludes,
  "meta": Meta
}) {}

/**
* Represents a customer information revision for a transaction.
*/
export class TransactionRevise extends S.Struct({
  /**
* Revised customer information for this transaction.
*/
"customer": S.optionalWith(S.Struct({
  /**
* Revised name of the customer for this transaction.
*/
"name": S.optionalWith(Name, { nullable: true })
}), { nullable: true }),
  /**
* Revised business information for this transaction.
*/
"business": S.optionalWith(S.Struct({
  /**
* Revised name of the business for this transaction.
*/
"name": S.optionalWith(Name, { nullable: true }),
  /**
* Revised tax or VAT number for this transaction. You can't remove a valid tax or VAT number, only replace it with another valid one. Paddle automatically creates an adjustment to refund any tax where applicable.
*/
"tax_identifier": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true })
}), { nullable: true }),
  /**
* Revised address information for this transaction.
*/
"address": S.optionalWith(S.Struct({
  /**
* Revised first line of the address for this transaction.
*/
"first_line": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true }),
  /**
* Revised second line of the address for this transaction.
*/
"second_line": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true }),
  /**
* Revised city of the address for this transaction.
*/
"city": S.optionalWith(S.String.pipe(S.maxLength(200)), { nullable: true }),
  /**
* Revised state, county, or region of the address for this transaction.
*/
"region": S.optionalWith(S.String.pipe(S.maxLength(200)), { nullable: true })
}), { nullable: true })
}) {}

export class ReviseTransactionRequest extends ReviseTransactionRequest {}

/**
* Represents a transaction entity.
*/
export class Transaction extends S.Struct({
  "id": S.optionalWith(TransactionId, { nullable: true }),
  "status": S.optionalWith(StatusTransaction, { nullable: true }),
  /**
* Paddle ID of the customer that this transaction is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of the address that this transaction is for, prefixed with `add_`.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of the business that this transaction is for, prefixed with `biz_`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code. Must be `USD`, `EUR`, or `GBP` if `collection_mode` is `manual`.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  "origin": S.optionalWith(OriginTransaction, { nullable: true }),
  /**
* Paddle ID of the subscription that this transaction is for, prefixed with `sub_`.
*/
"subscription_id": S.optionalWith(SubscriptionId, { nullable: true }),
  /**
* Paddle ID of the invoice that this transaction is related to, prefixed with `inv_`. Used for compatibility with the Paddle Invoice API, which is now deprecated. This field is scheduled to be removed in the next version of the Paddle API.
*/
"invoice_id": S.optionalWith(S.String.pipe(S.pattern(new RegExp("^inv_[a-z\\d]{26}$"))), { nullable: true }),
  /**
* Invoice number for this transaction. Automatically generated by Paddle when you mark a transaction as `billed` where `collection_mode` is `manual`.
*/
"invoice_number": S.optionalWith(DocumentNumber, { nullable: true }),
  /**
* How payment is collected for this transaction. `automatic` for checkout, `manual` for invoices.
*/
"collection_mode": S.optionalWith(CollectionMode, { nullable: true, default: () => "automatic" as const }),
  /**
* Paddle ID of the discount applied to this transaction, prefixed with `dsc_`.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Details for invoicing. Required if `collection_mode` is `manual`.
*/
"billing_details": S.optionalWith(BillingDetails, { nullable: true }),
  /**
* Time period that this transaction is for. Set automatically by Paddle for subscription renewals to describe the period that charges are for.
*/
"billing_period": S.optionalWith(TimePeriod, { nullable: true }),
  /**
* List of items on this transaction. For calculated totals, use `details.line_items`.
*/
"items": S.optionalWith(S.Array(TransactionItem).pipe(S.minItems(1), S.maxItems(100)), { nullable: true }),
  "details": S.optionalWith(TransactionDetails, { nullable: true }),
  /**
* List of payment attempts for this transaction, including successful payments. Sorted by `created_at` in descending order, so most recent attempts are returned first.
*/
"payments": S.optionalWith(S.Array(TransactionPaymentAttempt), { nullable: true }),
  /**
* Paddle Checkout details for this transaction. Returned for automatically-collected transactions and where `billing_details.enable_checkout` is `true` for manually-collected transactions; `null` otherwise.
*/
"checkout": S.optionalWith(S.Struct({
  /**
* Paddle Checkout URL for this transaction, composed of the URL passed in the request or your default payment URL + `?_ptxn=` and the Paddle ID for this transaction.
*/
"url": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(2048)), { nullable: true })
}), { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this transaction was marked as `billed`. `null` for transactions that aren't `billed` or `completed`. Set automatically by Paddle.
*/
"billed_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when a transaction was revised. Revisions describe an update to customer information for a billed or completed transaction. `null` if not revised. Set automatically by Paddle.
*/
"revised_at": S.optionalWith(Timestamp, { nullable: true })
}) {}

export class ReviseTransaction200 extends S.Struct({
  "data": Transaction,
  "meta": Meta
}) {}

export class ListAdjustmentsParamsAction extends S.Literal("chargeback", "chargeback_reverse", "chargeback_warning", "credit", "credit_reverse", "refund") {}

export class ListAdjustmentsParams extends S.Struct({
  "action": S.optionalWith(ListAdjustmentsParamsAction, { nullable: true }),
  "after": S.optionalWith(S.String, { nullable: true }),
  "customer_id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(50)), { nullable: true, default: () => 10 as const }),
  "status": S.optionalWith(S.Array(S.Literal("approved", "pending_approval", "rejected", "reversed")), { nullable: true }),
  "subscription_id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "transaction_id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "id": S.optionalWith(S.Array(S.String), { nullable: true })
}) {}

export class ListAdjustments200 extends S.Struct({
  "data": S.Array(Adjustment),
  "meta": MetaPaginated
}) {}

/**
* Whether the amounts to be adjusted are inclusive or exclusive of tax. If `internal`, adjusted amounts are considered to be inclusive of tax. If `external`, Paddle calculates the tax and adds it to the amounts provided.
* 
* Only valid for adjustments where the `type` is `partial`.
* 
* If omitted, defaults to `internal`.
*/
export class AdjustmentTaxMode extends S.Literal("external", "internal") {}

/**
* Represents an adjustment entity when creating adjustments.
*/
export class AdjustmentCreate extends S.Class<AdjustmentCreate>("AdjustmentCreate")({
  "id": S.optionalWith(AdjustmentId, { nullable: true }),
  "action": AdjustmentAction,
  "type": S.optionalWith(AdjustmentType, { nullable: true, default: () => "partial" as const }),
  "tax_mode": S.optionalWith(AdjustmentTaxMode, { nullable: true, default: () => "internal" as const }),
  /**
* Paddle ID of the transaction that this adjustment is for, prefixed with `txn_`.
* 
* Automatically-collected transactions must be `completed`; manually-collected transactions must have a status of `billed` or `past_due`
* 
* You can't create an adjustment for a transaction that has a refund that's pending approval.
*/
"transaction_id": TransactionId,
  /**
* Paddle ID for the subscription related to this adjustment, prefixed with `sub_`.
* Set automatically by Paddle based on the `subscription_id` of the related transaction.
*/
"subscription_id": S.optionalWith(SubscriptionId, { nullable: true }),
  /**
* Paddle ID for the customer related to this adjustment, prefixed with `ctm_`.
* Set automatically by Paddle based on the `customer_id` of the related transaction.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Why this adjustment was created. Appears in the Paddle dashboard. Retained for recordkeeping purposes.
*/
"reason": S.String,
  /**
* Whether this adjustment was applied to the related customer's credit balance. Only returned for `credit` adjustments.
*/
"credit_applied_to_balance": S.optionalWith(S.Boolean, { nullable: true }),
  /**
* Three-letter ISO 4217 currency code for this adjustment. Set automatically by Paddle based on the `currency_code` of the related transaction.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  "status": S.optionalWith(StatusAdjustment, { nullable: true }),
  /**
* List of transaction items to adjust. Required if `type` is not populated or set to `partial`.
*/
"items": S.optionalWith(S.Array(S.Struct({
  /**
* Paddle ID for the transaction item that this adjustment item relates to, prefixed with `txnitm_`.
*/
"item_id": TransactionItemId,
  /**
* Type of adjustment for this transaction item. `tax` adjustments are automatically created by Paddle.
* Include `amount` when creating a `partial` adjustment.
*/
"type": S.Literal("full", "partial", "tax", "proration"),
  /**
* Amount adjusted for this transaction item. Required when item `type` is `partial`.
*/
"amount": S.optionalWith(S.String, { nullable: true }),
  /**
* How proration was calculated for this adjustment item.
*/
"proration": S.optionalWith(TransactionItemProration, { nullable: true }),
  "totals": S.optionalWith(AdjustmentItemTotals, { nullable: true }),
  /**
* Unique Paddle ID for this adjustment item, prefixed with `adjitm_`.
*/
"id": S.optionalWith(AdjustmentItemId, { nullable: true })
})).pipe(S.minItems(1), S.maxItems(100)), { nullable: true }),
  "totals": S.optionalWith(AdjustmentTotals, { nullable: true }),
  /**
* Breakdown of how this adjustment affects your payout balance.
*/
"payout_totals": S.optionalWith(AdjustmentPayoutTotals, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true })
}) {}

export class CreateAdjustment201 extends S.Struct({
  "data": S.Record({ key: S.String, value: S.Unknown }),
  "meta": Meta
}) {}

export class GetAdjustmentCreditNoteParamsDisposition extends S.Literal("attachment", "inline") {}

export class GetAdjustmentCreditNoteParams extends S.Struct({
  "disposition": S.optionalWith(GetAdjustmentCreditNoteParamsDisposition, { nullable: true, default: () => "attachment" as const })
}) {}

export class GetAdjustmentCreditNote200 extends S.Struct({
  "data": S.Struct({
  /**
* URL of the requested resource.
*/
"url": S.optionalWith(S.String, { nullable: true })
}),
  "meta": Meta
}) {}

export class ListCreditBalancesParams extends S.Struct({
  "currency_code": S.optionalWith(S.Array(S.String), { nullable: true })
}) {}

export class CustomerBalance extends S.Struct({
  /**
* Total amount of credit available to use.
*/
"available": S.optionalWith(S.String, { nullable: true }),
  /**
* Total amount of credit temporarily reserved for `billed` transactions.
*/
"reserved": S.optionalWith(S.String, { nullable: true }),
  /**
* Total amount of credit used.
*/
"used": S.optionalWith(S.String, { nullable: true })
}) {}

/**
* Represents a credit balance for a customer.
*/
export class CreditBalance extends S.Struct({
  /**
* Paddle ID of the customer that this credit balance is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Three-letter ISO 4217 currency code for this credit balance.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  /**
* Totals for this credit balance. Where a customer has more than one subscription in this currency with a credit balance, includes totals for all subscriptions.
*/
"balance": S.optionalWith(CustomerBalance, { nullable: true })
}) {}

export class ListCreditBalances200 extends S.Struct({
  "data": S.Array(CreditBalance),
  "meta": Meta
}) {}

export class ListCustomersParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "email": S.optionalWith(S.Array(S.String.pipe(S.maxLength(100))), { nullable: true }),
  "id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const }),
  "search": S.optionalWith(S.String.pipe(S.maxLength(100)), { nullable: true }),
  "status": S.optionalWith(S.Array(S.Literal("active", "archived")), { nullable: true })
}) {}

export class ListCustomers200 extends S.Struct({
  "data": S.Array(Customer),
  "meta": MetaPaginated
}) {}

/**
* Represents a customer entity when creating customers.
*/
export class CustomerCreate extends S.Class<CustomerCreate>("CustomerCreate")({
  "id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Full name of this customer. Required when creating transactions where `collection_mode` is `manual` (invoices).
*/
"name": S.optionalWith(Name, { nullable: true }),
  /**
* Email address for this customer.
*/
"email": Email,
  /**
* Whether this customer opted into marketing from you. `false` unless customers check the marketing consent box
* when using Paddle Checkout. Set automatically by Paddle.
*/
"marketing_consent": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Valid IETF BCP 47 short form locale tag. If omitted, defaults to `en`.
*/
"locale": S.optionalWith(S.String, { nullable: true, default: () => "en" as const }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

export class CreateCustomer201 extends S.Struct({
  "data": Customer,
  "meta": Meta
}) {}

/**
* Represents a customer entity.
*/
export class CustomerIncludes extends S.Struct({
  "id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Full name of this customer. Required when creating transactions where `collection_mode` is `manual` (invoices).
*/
"name": S.optionalWith(Name, { nullable: true }),
  /**
* Email address for this customer.
*/
"email": S.optionalWith(Email, { nullable: true }),
  /**
* Whether this customer opted into marketing from you. `false` unless customers check the marketing consent box
* when using Paddle Checkout. Set automatically by Paddle.
*/
"marketing_consent": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Valid IETF BCP 47 short form locale tag. If omitted, defaults to `en`.
*/
"locale": S.optionalWith(S.String, { nullable: true, default: () => "en" as const }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

export class GetCustomer200 extends S.Struct({
  "data": CustomerIncludes,
  "meta": Meta
}) {}

/**
* Represents a customer entity when updating customers.
*/
export class CustomerUpdate extends S.Class<CustomerUpdate>("CustomerUpdate")({
  /**
* Full name of this customer. Required when creating transactions where `collection_mode` is `manual` (invoices).
*/
"name": S.optionalWith(Name, { nullable: true }),
  /**
* Email address for this customer.
*/
"email": S.optionalWith(Email, { nullable: true }),
  /**
* Whether this customer opted into marketing from you. `false` unless customers check the marketing consent box
* when using Paddle Checkout. Set automatically by Paddle.
*/
"marketing_consent": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Valid IETF BCP 47 short form locale tag.
*/
"locale": S.optionalWith(S.String, { nullable: true, default: () => "en" as const }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

export class UpdateCustomer200 extends S.Struct({
  "data": Customer,
  "meta": Meta
}) {}

export class ListAddressesParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const }),
  "search": S.optionalWith(S.String.pipe(S.maxLength(100)), { nullable: true }),
  "status": S.optionalWith(S.Array(S.Literal("active", "archived")), { nullable: true })
}) {}

export class ListAddresses200 extends S.Struct({
  "data": S.Array(Address),
  "meta": MetaPaginated
}) {}

/**
* Represents an address entity when creating addresses.
*/
export class AddressCreate extends S.Class<AddressCreate>("AddressCreate")({
  "id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Memorable description for this address.
*/
"description": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true }),
  /**
* First line of this address.
*/
"first_line": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true }),
  /**
* Second line of this address.
*/
"second_line": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true }),
  /**
* City of this address.
*/
"city": S.optionalWith(S.String.pipe(S.maxLength(200)), { nullable: true }),
  /**
* ZIP or postal code of this address. Required for some countries.
*/
"postal_code": S.optionalWith(S.String.pipe(S.maxLength(200)), { nullable: true }),
  /**
* State, county, or region of this address.
*/
"region": S.optionalWith(S.String.pipe(S.maxLength(200)), { nullable: true }),
  /**
* Supported two-letter ISO 3166-1 alpha-2 country code for this address.
*/
"country_code": CountryCode,
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

export class CreateAddress201 extends S.Struct({
  "data": Address,
  "meta": Meta
}) {}

export class GetAddress200 extends S.Struct({
  "data": Address,
  "meta": Meta
}) {}

/**
* Represents an address entity when updating addresses.
*/
export class AddressUpdate extends S.Class<AddressUpdate>("AddressUpdate")({
  /**
* Memorable description for this address.
*/
"description": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true }),
  /**
* First line of this address.
*/
"first_line": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true }),
  /**
* Second line of this address.
*/
"second_line": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true }),
  /**
* City of this address.
*/
"city": S.optionalWith(S.String.pipe(S.maxLength(200)), { nullable: true }),
  /**
* ZIP or postal code of this address. Required for some countries.
*/
"postal_code": S.optionalWith(S.String.pipe(S.maxLength(200)), { nullable: true }),
  /**
* State, county, or region of this address.
*/
"region": S.optionalWith(S.String.pipe(S.maxLength(200)), { nullable: true }),
  /**
* Supported two-letter ISO 3166-1 alpha-2 country code for this address.
*/
"country_code": S.optionalWith(CountryCode, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true })
}) {}

export class UpdateAddress200 extends S.Struct({
  "data": Address,
  "meta": Meta
}) {}

/**
* Authentication token generated by Paddle for this customer. Pass to Paddle.js when opening a checkout to let customers work with saved payment methods.
*/
export class CustomerAuthToken extends S.String {}

/**
* Represents a customer authentication token.
*/
export class CustomerAuthenticationToken extends S.Struct({
  "customer_auth_token": CustomerAuthToken,
  /**
* RFC 3339 datetime string of when this customer authentication token expires. The token is no longer valid after this date.
*/
"expires_at": S.optionalWith(Timestamp, { nullable: true })
}) {}

export class GenerateCustomerAuthenticationToken200 extends S.Struct({
  "data": CustomerAuthenticationToken,
  "meta": Meta
}) {}

export class ListBusinessesParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const }),
  "search": S.optionalWith(S.String.pipe(S.maxLength(100)), { nullable: true }),
  "status": S.optionalWith(S.Array(S.Literal("active", "archived")), { nullable: true })
}) {}

export class ListBusinesses200 extends S.Struct({
  "data": S.Array(Business),
  "meta": MetaPaginated
}) {}

/**
* Represents a business entity when creating businesses.
*/
export class BusinessCreate extends S.Class<BusinessCreate>("BusinessCreate")({
  "id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Name of this business.
*/
"name": Name,
  /**
* Company number for this business.
*/
"company_number": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true }),
  /**
* Tax or VAT Number for this business.
*/
"tax_identifier": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true }),
  /**
* List of contacts related to this business, typically used for sending invoices.
*/
"contacts": S.optionalWith(S.Array(S.Struct({
  /**
* Full name of this contact.
*/
"name": S.optionalWith(Name, { nullable: true }),
  /**
* Email address for this contact.
*/
"email": Email
})).pipe(S.maxItems(100)), { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

export class CreateBusiness201 extends S.Struct({
  "data": Business,
  "meta": Meta
}) {}

export class GetBusiness200 extends S.Struct({
  "data": Business,
  "meta": Meta
}) {}

/**
* Represents a business entity when updating businesses.
*/
export class BusinessUpdate extends S.Class<BusinessUpdate>("BusinessUpdate")({
  /**
* Name of this business.
*/
"name": S.optionalWith(Name, { nullable: true }),
  /**
* Company number for this business.
*/
"company_number": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true }),
  /**
* Tax or VAT Number for this business.
*/
"tax_identifier": S.optionalWith(S.String.pipe(S.maxLength(1024)), { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* List of contacts related to this business, typically used for sending invoices.
*/
"contacts": S.optionalWith(S.Array(S.Struct({
  /**
* Full name of this contact.
*/
"name": S.optionalWith(Name, { nullable: true }),
  /**
* Email address for this contact.
*/
"email": Email
})).pipe(S.maxItems(100)), { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true })
}) {}

export class UpdateBusiness200 extends S.Struct({
  "data": Business,
  "meta": Meta
}) {}

export class ListCustomerPaymentMethodsParams extends S.Struct({
  "address_id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "after": S.optionalWith(S.String, { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const }),
  "supports_checkout": S.optionalWith(S.Boolean, { nullable: true })
}) {}

/**
* Type of payment method saved.
*/
export class CustomerPaymentMethodType extends S.Literal("alipay", "apple_pay", "card", "google_pay", "paypal") {}

/**
* PayPal metadata
*/
export class Paypal extends S.Struct({
  /**
* Email address associated with the PayPal account.
*/
"email": S.optionalWith(S.String, { nullable: true }),
  /**
* PayPal payment method identifier.
*/
"reference": S.optionalWith(S.String, { nullable: true })
}) {}

/**
* Describes how this payment method was saved.
*/
export class CustomerPaymentMethodOrigin extends S.Literal("saved_during_purchase", "subscription") {}

/**
* RFC 3339 datetime string of when this entity was saved. Set automatically by Paddle.
*/
export class SavedAt extends S.String {}

/**
* Represents a customer payment method entity.
*/
export class CustomerPaymentMethod extends S.Struct({
  "id": S.optionalWith(PaymentMethodId, { nullable: true }),
  /**
* Paddle ID of the customer that this payment method is saved for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of the address for this payment method, prefixed with `add_`.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Type of payment method saved.
*/
"type": S.optionalWith(CustomerPaymentMethodType, { nullable: true }),
  /**
* Information about the credit or debit card saved. `null` unless `type` is `card`.
*/
"card": S.optionalWith(Card, { nullable: true }),
  /**
* Information about the PayPal payment method saved. `null` unless `type` is `paypal`.
*/
"paypal": S.optionalWith(Paypal, { nullable: true }),
  /**
* Describes how this payment method was saved.
*/
"origin": S.optionalWith(CustomerPaymentMethodOrigin, { nullable: true }),
  "saved_at": S.optionalWith(SavedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true })
}) {}

export class ListCustomerPaymentMethods200 extends S.Struct({
  "data": S.Array(CustomerPaymentMethod),
  "meta": MetaPaginated
}) {}

export class GetCustomerPaymentMethod200 extends S.Struct({
  "data": CustomerPaymentMethod,
  "meta": Meta
}) {}

/**
* Represents a customer portal session creation request.
*/
export class CustomerPortalSessionCreate extends S.Class<CustomerPortalSessionCreate>("CustomerPortalSessionCreate")({
  /**
* List of subscriptions to create authenticated customer portal deep links for.
*/
"subscription_ids": S.optionalWith(S.Array(SubscriptionId).pipe(S.maxItems(25)), { nullable: true })
}) {}

/**
* Unique Paddle ID for this customer portal session entity, prefixed with `cpls_`.
*/
export class CustomerPortalSessionId extends S.String.pipe(S.pattern(new RegExp("^cpls_[a-z\\d]{26}$"))) {}

/**
* Represents a customer portal session.
*/
export class CustomerPortalSession extends S.Struct({
  "id": CustomerPortalSessionId,
  /**
* Paddle ID of the customer that this customer portal sessions is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Authenticated customer portal deep links. For security, the `token` appended to each link is temporary. You shouldn't store these links.
*/
"urls": S.Struct({
  /**
* Authenticated customer portal deep links that aren't associated with a specific entity.
*/
"general": S.Struct({
  /**
* Link to the overview page in the customer portal.
*/
"overview": S.String
}),
  /**
* List of generated authenticated customer portal deep links for the subscriptions passed in the `subscription_ids` array in the request.
* 
* If subscriptions are paused or canceled, links open the overview page for a subscription.
* 
* Empty if no subscriptions passed in the request.
*/
"subscriptions": S.optionalWith(S.Array(S.Struct({
  /**
* Paddle ID of the subscription that the authenticated customer portal deep links are for.
*/
"id": SubscriptionId,
  /**
* Link to the page for this subscription in the customer portal with the subscription cancellation form pre-opened. Use as part of cancel subscription workflows.
*/
"cancel_subscription": S.String,
  /**
* Link to the page for this subscription in the customer portal with the payment method update form pre-opened. Use as part of workflows to let customers update their payment details.
* 
* If a manually-collected subscription, opens the overview page for this subscription.
*/
"update_subscription_payment_method": S.String
})).pipe(S.maxItems(25)), { nullable: true })
}),
  /**
* RFC 3339 datetime string of when this customer portal session was created.
*/
"created_at": Timestamp
}) {}

export class CreateCustomerPortalSession201 extends S.Struct({
  "data": CustomerPortalSession,
  "meta": Meta
}) {}

export class ListNotificationSettingsParamsTrafficSource extends S.Literal("platform", "simulation", "all") {}

export class ListNotificationSettingsParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 200 as const }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "active": S.optionalWith(S.Boolean, { nullable: true }),
  "traffic_source": S.optionalWith(ListNotificationSettingsParamsTrafficSource, { nullable: true })
}) {}

/**
* Unique Paddle ID for this notification setting, prefixed with `ntfset_`.
*/
export class NotificationSettingId extends S.String.pipe(S.pattern(new RegExp("^ntfset_[a-z\\d]{26}$"))) {}

/**
* Where notifications should be sent for this destination.
*/
export class NotificationSettingType extends S.Literal("email", "url") {}

/**
* Type of event sent by Paddle, in the format `entity.event_type`.
*/
export class EventTypeName extends S.Literal("address.created", "address.imported", "address.updated", "adjustment.created", "adjustment.updated", "business.created", "business.imported", "business.updated", "customer.created", "customer.imported", "customer.updated", "discount.created", "discount.imported", "discount.updated", "payment_method.saved", "payment_method.deleted", "payout.created", "payout.paid", "price.created", "price.imported", "price.updated", "product.created", "product.imported", "product.updated", "report.created", "report.updated", "subscription.activated", "subscription.canceled", "subscription.created", "subscription.imported", "subscription.past_due", "subscription.paused", "subscription.resumed", "subscription.trialing", "subscription.updated", "transaction.billed", "transaction.canceled", "transaction.completed", "transaction.created", "transaction.paid", "transaction.past_due", "transaction.payment_failed", "transaction.ready", "transaction.revised", "transaction.updated") {}

/**
* Represents an event type.
*/
export class EventType extends S.Struct({
  "name": S.optionalWith(EventTypeName, { nullable: true }),
  /**
* Short description of this event type.
*/
"description": S.optionalWith(S.String, { nullable: true }),
  /**
* Group for this event type. Typically the entity that this event relates to.
*/
"group": S.optionalWith(S.String, { nullable: true }),
  /**
* List of API versions that this event type supports.
*/
"available_versions": S.optionalWith(S.Array(S.Int), { nullable: true })
}) {}

/**
* Whether Paddle should deliver real platform events, simulation events or both to this notification destination.
*/
export class NotificationSettingTrafficSource extends S.Literal("platform", "simulation", "all") {}

/**
* Represents a notification destination.
*/
export class NotificationSetting extends S.Struct({
  "id": S.optionalWith(NotificationSettingId, { nullable: true }),
  /**
* Short description for this notification destination. Shown in the Paddle dashboard.
*/
"description": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(500)), { nullable: true }),
  /**
* Where notifications should be sent for this destination.
*/
"type": S.optionalWith(NotificationSettingType, { nullable: true }),
  /**
* Webhook endpoint URL or email address.
*/
"destination": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(2048)), { nullable: true }),
  /**
* Whether Paddle should try to deliver events to this notification destination.
*/
"active": S.optionalWith(S.Boolean, { nullable: true, default: () => true as const }),
  /**
* API version that returned objects for events should conform to. Must be a valid version of the Paddle API. Can't be a version older than your account default.
*/
"api_version": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  /**
* Whether potentially sensitive fields should be sent to this notification destination.
*/
"include_sensitive_fields": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  /**
* Subscribed events for this notification destination.
*/
"subscribed_events": S.optionalWith(S.Array(EventType), { nullable: true }),
  /**
* Webhook destination secret key, prefixed with `pdl_ntfset_`. Used for signature verification.
*/
"endpoint_secret_key": S.optionalWith(S.String.pipe(S.pattern(new RegExp("^pdl_ntfset_[a-zA-Z0-9]{26}_[a-zA-Z0-9]{32}$"))), { nullable: true }),
  /**
* Whether Paddle should deliver real platform events, simulation events or both to this notification destination.
*/
"traffic_source": S.optionalWith(NotificationSettingTrafficSource, { nullable: true })
}) {}

export class ListNotificationSettings200 extends S.Struct({
  "data": S.Array(NotificationSetting),
  "meta": MetaPaginated
}) {}

/**
* Where notifications should be sent for this destination.
*/
export class NotificationSettingCreateType extends S.Literal("email", "url") {}

/**
* Whether Paddle should deliver real platform events, simulation events or both to this notification destination. If omitted, defaults to `platform`.
*/
export class NotificationSettingCreateTrafficSource extends S.Literal("platform", "simulation", "all") {}

/**
* Represents a notification destination when creating notification destinations.
*/
export class NotificationSettingCreate extends S.Class<NotificationSettingCreate>("NotificationSettingCreate")({
  "id": S.optionalWith(NotificationSettingId, { nullable: true }),
  /**
* Short description for this notification destination. Shown in the Paddle Dashboard.
*/
"description": S.String.pipe(S.minLength(1), S.maxLength(500)),
  /**
* Where notifications should be sent for this destination.
*/
"type": NotificationSettingCreateType,
  /**
* Webhook endpoint URL or email address.
*/
"destination": S.String.pipe(S.minLength(1), S.maxLength(2048)),
  /**
* Whether Paddle should try to deliver events to this notification destination.
*/
"active": S.optionalWith(S.Boolean, { nullable: true, default: () => true as const }),
  /**
* API version that returned objects for events should conform to. Must be a valid version of the Paddle API. Can't be a version older than your account default. If omitted, defaults to your account default version.
*/
"api_version": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  /**
* Whether potentially sensitive fields should be sent to this notification destination. If omitted, defaults to `false`.
*/
"include_sensitive_fields": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  /**
* Subscribed events for this notification destination. When creating or updating a notification destination, pass an array of event type names only. Paddle returns the complete event type object.
*/
"subscribed_events": S.Array(EventTypeName),
  /**
* Webhook destination secret key, prefixed with `pdl_ntfset_`. Used for signature verification.
*/
"endpoint_secret_key": S.optionalWith(S.String.pipe(S.pattern(new RegExp("^pdl_ntfset_[a-zA-Z0-9]{26}_[a-zA-Z0-9]{32}$"))), { nullable: true }),
  /**
* Whether Paddle should deliver real platform events, simulation events or both to this notification destination. If omitted, defaults to `platform`.
*/
"traffic_source": S.optionalWith(NotificationSettingCreateTrafficSource, { nullable: true, default: () => "platform" as const })
}) {}

export class CreateNotificationSetting201 extends S.Struct({
  "data": NotificationSetting,
  "meta": Meta
}) {}

export class GetNotificationSetting200 extends S.Struct({
  "data": NotificationSetting,
  "meta": Meta
}) {}

/**
* Whether Paddle should deliver real platform events, simulation events or both to this notification destination.
*/
export class NotificationSettingUpdateTrafficSource extends S.Literal("platform", "simulation", "all") {}

/**
* Represents a notification destination when updating notification destinations.
*/
export class NotificationSettingUpdate extends S.Class<NotificationSettingUpdate>("NotificationSettingUpdate")({
  /**
* Short description for this notification destination. Shown in the Paddle Dashboard.
*/
"description": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(500)), { nullable: true }),
  /**
* Webhook endpoint URL or email address.
*/
"destination": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(2048)), { nullable: true }),
  /**
* Whether Paddle should try to deliver events to this notification destination.
*/
"active": S.optionalWith(S.Boolean, { nullable: true, default: () => true as const }),
  /**
* API version that returned objects for events should conform to. Must be a valid version of the Paddle API. Can't be a version older than your account default. Defaults to your account default if omitted.
*/
"api_version": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  /**
* Whether potentially sensitive fields should be sent to this notification destination.
*/
"include_sensitive_fields": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  /**
* Subscribed events for this notification destination. When creating or updating a notification destination, pass an array of event type names only. Paddle returns the complete event type object.
*/
"subscribed_events": S.optionalWith(S.Array(EventTypeName), { nullable: true }),
  /**
* Whether Paddle should deliver real platform events, simulation events or both to this notification destination.
*/
"traffic_source": S.optionalWith(NotificationSettingUpdateTrafficSource, { nullable: true })
}) {}

export class UpdateNotificationSetting200 extends S.Struct({
  "data": NotificationSetting,
  "meta": Meta
}) {}

export class ListEventTypes200 extends S.Struct({
  "data": S.Array(EventType),
  "meta": Meta
}) {}

export class ListEventsParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const })
}) {}

/**
* Unique Paddle ID for this event, prefixed with `evt_`.
*/
export class EventId extends S.String.pipe(S.pattern(new RegExp("^evt_[a-z\\d]{26}$"))) {}

/**
* Represents an event entity.
*/
export class Event extends S.Struct({
  "event_id": S.optionalWith(EventId, { nullable: true }),
  "event_type": S.optionalWith(EventTypeName, { nullable: true }),
  /**
* RFC 3339 datetime string of when this event occurred.
*/
"occurred_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* New or changed entity.
*/
"data": S.optionalWith(S.Record({ key: S.String, value: S.Unknown }), { nullable: true })
}) {}

export class ListEvents200 extends S.Struct({
  "data": S.Array(Event),
  "meta": MetaPaginated
}) {}

export class ListNotificationsParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "notification_setting_id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const }),
  "search": S.optionalWith(S.String.pipe(S.maxLength(100)), { nullable: true }),
  "status": S.optionalWith(S.Array(S.Literal("delivered", "failed", "needs_retry", "not_attempted")), { nullable: true }),
  "filter": S.optionalWith(S.String, { nullable: true }),
  "to": S.optionalWith(S.String, { nullable: true }),
  "from": S.optionalWith(S.String, { nullable: true })
}) {}

/**
* Unique Paddle ID for this notification, prefixed with `ntf_`.
*/
export class NotificationId extends S.String.pipe(S.pattern(new RegExp("^ntf_[a-z\\d]{26}$"))) {}

/**
* Status of this notification.
*/
export class StatusNotification extends S.Literal("not_attempted", "needs_retry", "delivered", "failed") {}

/**
* Represents an event entity.
*/
export class NotificationPayload extends S.Struct({
  "notification_id": S.optionalWith(NotificationId, { nullable: true }),
  "event_id": S.optionalWith(EventId, { nullable: true }),
  "event_type": S.optionalWith(EventTypeName, { nullable: true }),
  /**
* RFC 3339 datetime string of when this event occurred.
*/
"occurred_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* New or changed entity.
*/
"data": S.optionalWith(S.Record({ key: S.String, value: S.Unknown }), { nullable: true })
}) {}

/**
* Describes how this notification was created.
*/
export class NotificationOrigin extends S.Literal("event", "replay") {}

/**
* Represents a notification entity.
*/
export class Notification extends S.Struct({
  "id": S.optionalWith(NotificationId, { nullable: true }),
  "type": S.optionalWith(EventTypeName, { nullable: true }),
  "status": S.optionalWith(StatusNotification, { nullable: true }),
  "payload": S.optionalWith(NotificationPayload, { nullable: true }),
  /**
* RFC 3339 datetime string of when this notification occurred.
*/
"occurred_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this notification was delivered. `null` if not yet delivered successfully.
*/
"delivered_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this notification was replayed. `null` if not replayed.
*/
"replayed_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* Describes how this notification was created.
*/
"origin": S.optionalWith(NotificationOrigin, { nullable: true }),
  /**
* RFC 3339 datetime string of when this notification was last attempted.
*/
"last_attempt_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this notification is scheduled to be retried.
*/
"retry_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* How many times delivery of this notification has been attempted. Automatically incremented by Paddle after an attempt.
*/
"times_attempted": S.optionalWith(S.Int, { nullable: true }),
  "notification_setting_id": S.optionalWith(NotificationSettingId, { nullable: true })
}) {}

export class ListNotifications200 extends S.Struct({
  "data": S.Array(Notification),
  "meta": MetaPaginated
}) {}

export class GetNotification200 extends S.Struct({
  "data": Notification,
  "meta": Meta
}) {}

export class ListNotificationLogsParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const })
}) {}

/**
* Unique Paddle ID for this notification log, prefixed with `ntflog_`.
*/
export class NotificationLogId extends S.String.pipe(S.pattern(new RegExp("^ntflog_[a-z\\d]{26}$"))) {}

/**
* Represents a notification log entity.
*/
export class NotificationLog extends S.Struct({
  "id": S.optionalWith(NotificationLogId, { nullable: true }),
  /**
* HTTP code sent by the responding server.
*/
"response_code": S.optionalWith(S.Int, { nullable: true }),
  /**
* Content-Type sent by the responding server.
*/
"response_content_type": S.optionalWith(S.String, { nullable: true }),
  /**
* Response body sent by the responding server. Typically empty for success responses.
*/
"response_body": S.optionalWith(S.String, { nullable: true }),
  /**
* RFC 3339 datetime string of when Paddle attempted to deliver the related notification.
*/
"attempted_at": S.optionalWith(Timestamp, { nullable: true })
}) {}

export class ListNotificationLogs200 extends S.Struct({
  "data": S.Array(NotificationLog),
  "meta": MetaPaginated
}) {}

export class ReplayNotification202 extends S.Struct({
  "data": S.optionalWith(S.Struct({
  "notification_id": S.optionalWith(NotificationId, { nullable: true })
}), { nullable: true }),
  "meta": S.optionalWith(Meta, { nullable: true })
}) {}

/**
* Type of simulation.
*/
export class SimulationTypeType extends S.Literal("single_event", "scenario") {}

/**
* Represents a simulation type.
*/
export class SimulationType extends S.Struct({
  /**
* Type of simulation sent by Paddle. Single event simulations are in the format `entity.event_type`; scenario simulations are in `snake_case`.
*/
"name": S.optionalWith(S.String, { nullable: true }),
  /**
* Descriptive label for this simulation type. Typically gives more context about a scenario. Single event simulations are in the format `entity.event_type`.
*/
"label": S.optionalWith(S.String, { nullable: true }),
  /**
* Short description of this simulation type.
*/
"description": S.optionalWith(S.String, { nullable: true }),
  /**
* Group for this simulation type. Typically the entity that this event relates to.
*/
"group": S.optionalWith(S.String, { nullable: true }),
  /**
* Type of simulation.
*/
"type": S.optionalWith(SimulationTypeType, { nullable: true }),
  /**
* List of events that will be sent for this simulation type.
*/
"events": S.optionalWith(S.Array(EventTypeName), { nullable: true })
}) {}

export class ListSimulationTypes200 extends S.Struct({
  "data": S.Array(SimulationType),
  "meta": Meta
}) {}

export class ListSimulationsParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "notification_setting_id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const }),
  "id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "status": S.optionalWith(S.Array(S.Literal("active", "archived")), { nullable: true })
}) {}

/**
* Unique Paddle ID for this simulation, prefixed with `ntfsim_`.
*/
export class SimulationId extends S.String.pipe(S.pattern(new RegExp("^ntfsim_[a-z\\d]{26}$"))) {}

/**
* Represents a simulation entity for a single event.
*/
export class SimulationStandardEvents extends S.Struct({
  "id": S.optionalWith(SimulationId, { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* Paddle ID of the notification setting where this simulation is sent, prefixed with `ntfset_`.
*/
"notification_setting_id": S.optionalWith(NotificationSettingId, { nullable: true }),
  /**
* Name of this simulation.
*/
"name": S.optionalWith(S.String, { nullable: true }),
  /**
* Single event sent for this simulation, in the format `entity.event_type`.
*/
"type": S.optionalWith(EventTypeName, { nullable: true }),
  /**
* Simulation payload.
*/
"payload": S.optionalWith(S.Record({ key: S.String, value: S.Unknown }), { nullable: true }),
  /**
* RFC 3339 datetime string of when this simulation was last run. `null` until run. Set automatically by Paddle.
*/
"last_run_at": S.optionalWith(Timestamp, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true })
}) {}

/**
* Scenario for a simulation.
*/
export class SimulationScenarioEventsType extends S.Literal("subscription_creation", "subscription_renewal", "subscription_pause", "subscription_resume", "subscription_cancellation") {}

/**
* Determines which webhooks are sent based on when the subscription is paused or canceled. If omitted, defaults to `immediately`.
*/
export class SimulationConfigSubscriptionCancellationOptionsEffectiveFrom extends S.Literal("next_billing_period", "immediately") {}

/**
* Configuration for subscription canceled simulations.
*/
export class SimulationConfigSubscriptionCancellation extends S.Struct({
  /**
* Adds details of existing Paddle entities to webhook payloads sent in the simulation.
*/
"entities": S.optionalWith(S.Struct({
  /**
* Paddle ID of a subscription to simulate as canceled. Adds details of that subscription to webhook payloads.
*/
"subscription_id": S.optionalWith(SubscriptionId, { nullable: true })
}), { nullable: true }),
  /**
* Options that determine which webhooks are sent as part of a simulation.
*/
"options": S.optionalWith(S.Struct({
  /**
* Determines which webhooks are sent based on when the subscription is paused or canceled. If omitted, defaults to `immediately`.
*/
"effective_from": S.optionalWith(SimulationConfigSubscriptionCancellationOptionsEffectiveFrom, { nullable: true, default: () => "immediately" as const }),
  /**
* Whether a simulated subscription has a past due transaction (`true`) or not (`false`), which determines whether events occur for canceling past due transactions. If omitted, defaults to `false`.
*/
"has_past_due_transaction": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const })
}), { nullable: true })
}) {}

export class SubscriptionItemCreateWithPriceId extends S.Struct({
  /**
* Quantity to bill for.
*/
"quantity": S.Int.pipe(S.greaterThanOrEqualTo(1)),
  /**
* Paddle ID of an an existing catalog price to bill for.
*/
"price_id": PriceId
}) {}

/**
* Configuration resources for subscription creation simulations
*/
export class SimulationConfigEntitiesSubscriptionCreation extends S.Struct({
  /**
* Paddle ID of a customer. Adds customer details to webhook payloads.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of an address. Adds address details to webhook payloads. Requires `customer_id`.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of a business. Adds business details to webhook payloads. Requires `customer_id`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Paddle ID of a payment method. Adds payment method details to webhook payloads. Requires `customer_id`.
*/
"payment_method_id": S.optionalWith(PaymentMethodId, { nullable: true }),
  /**
* Paddle ID of a discount. Adds discount details (including price calculations) to webhook payloads. Requires `items` or `transaction_id` for the discount to be applied.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Paddle ID of a transaction. Bases the subscription on the transaction.
*/
"transaction_id": S.optionalWith(TransactionId, { nullable: true }),
  /**
* Items to include on the simulated subscription. Only existing products and prices can be simulated. Non-catalog items aren't supported. At least one recurring price must be provided.
*/
"items": S.optionalWith(S.Array(SubscriptionItemCreateWithPriceId).pipe(S.minItems(1), S.maxItems(100)), { nullable: true })
}) {}

/**
* Determines which webhooks are sent based on whether a new or existing customer subscribes, and how their details are entered if they're an existing customer. If omitted, defaults to `new`.
*/
export class SimulationConfigSubscriptionCreationOptionsCustomerSimulatedAs extends S.Literal("new", "existing_email_matched", "existing_details_prefilled") {}

/**
* Determines which webhooks are sent based on whether a new, existing, or no business was provided. If omitted, defaults to `not_provided`.
*/
export class SimulationConfigSubscriptionCreationOptionsBusinessSimulatedAs extends S.Literal("not_provided", "new", "existing_details_prefilled") {}

/**
* Determines which webhooks are sent based on whether a discount is used and how it's entered. If omitted, defaults to `none`.
*/
export class SimulationConfigSubscriptionCreationOptionsDiscountSimulatedAs extends S.Literal("not_provided", "prefilled", "entered_by_customer") {}

/**
* Options to configure subscription creation simulations.
*/
export class SimulationConfigSubscriptionCreationOptions extends S.Struct({
  /**
* Determines which webhooks are sent based on whether a new or existing customer subscribes, and how their details are entered if they're an existing customer. If omitted, defaults to `new`.
*/
"customer_simulated_as": S.optionalWith(SimulationConfigSubscriptionCreationOptionsCustomerSimulatedAs, { nullable: true, default: () => "new" as const }),
  /**
* Determines which webhooks are sent based on whether a new, existing, or no business was provided. If omitted, defaults to `not_provided`.
*/
"business_simulated_as": S.optionalWith(SimulationConfigSubscriptionCreationOptionsBusinessSimulatedAs, { nullable: true, default: () => "not_provided" as const }),
  /**
* Determines which webhooks are sent based on whether a discount is used and how it's entered. If omitted, defaults to `none`.
*/
"discount_simulated_as": S.optionalWith(SimulationConfigSubscriptionCreationOptionsDiscountSimulatedAs, { nullable: true, default: () => "none" as const })
}) {}

/**
* Configuration for subscription creation simulations.
*/
export class SimulationConfigSubscriptionCreation extends S.Struct({
  /**
* Adds details of existing Paddle entities to webhook payloads sent in the simulation.
*/
"entities": S.optionalWith(SimulationConfigEntitiesSubscriptionCreation, { nullable: true }),
  /**
* Options that determine which webhooks are sent as part of a simulation.
*/
"options": S.optionalWith(SimulationConfigSubscriptionCreationOptions, { nullable: true })
}) {}

/**
* Determines which webhooks are sent based on when the subscription is paused or canceled. If omitted, defaults to `immediately`.
*/
export class SimulationConfigSubscriptionPauseOptionsEffectiveFrom extends S.Literal("next_billing_period", "immediately") {}

/**
* Configuration for subscription paused simulations.
*/
export class SimulationConfigSubscriptionPause extends S.Struct({
  /**
* Adds details of existing Paddle entities to webhook payloads sent in the simulation.
*/
"entities": S.optionalWith(S.Struct({
  /**
* Paddle ID of a subscription to simulate as paused. Adds details of that subscription to webhook payloads.
*/
"subscription_id": S.optionalWith(SubscriptionId, { nullable: true })
}), { nullable: true }),
  /**
* Options that determine which webhooks are sent as part of a simulation.
*/
"options": S.optionalWith(S.Struct({
  /**
* Determines which webhooks are sent based on when the subscription is paused or canceled. If omitted, defaults to `immediately`.
*/
"effective_from": S.optionalWith(SimulationConfigSubscriptionPauseOptionsEffectiveFrom, { nullable: true, default: () => "immediately" as const }),
  /**
* Whether a simulated subscription has a past due transaction (`true`) or not (`false`), which determines whether events occur for canceling past due transactions. If omitted, defaults to `false`.
*/
"has_past_due_transaction": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const })
}), { nullable: true })
}) {}

/**
* Determines which webhooks are sent based on the outcome of the payment. If omitted, defaults to `success`.
*/
export class SimulationConfigOptionsPaymentPaymentOutcome extends S.Literal("success", "recovered_existing_payment_method", "recovered_updated_payment_method", "failed") {}

export class SimulationConfigOptionsPaymentDunningExhaustedActionEnum extends S.Literal("subscription_paused", "subscription_canceled") {}

/**
* Options to configure simulations based on the payment outcome.
*/
export class SimulationConfigOptionsPayment extends S.Struct({
  /**
* Determines which webhooks are sent based on the outcome of the payment. If omitted, defaults to `success`.
*/
"payment_outcome": S.optionalWith(SimulationConfigOptionsPaymentPaymentOutcome, { nullable: true, default: () => "success" as const }),
  /**
* Determines which webhooks are sent based on what happens to the subscription when payment recovery attempts are exhausted. Only applies when `payment_outcome` is `failed`. If omitted, defaults to `null`.
*/
"dunning_exhausted_action": S.optionalWith(S.NullOr(SimulationConfigOptionsPaymentDunningExhaustedActionEnum), { default: () => null })
}) {}

/**
* Configuration for subscription renewed simulations.
*/
export class SimulationConfigSubscriptionRenewal extends S.Struct({
  /**
* Adds details of existing Paddle entities to webhook payloads sent in the simulation.
*/
"entities": S.optionalWith(S.Struct({
  /**
* Paddle ID of a subscription to simulate as renewed. Adds details of that subscription to webhook payloads.
*/
"subscription_id": S.optionalWith(SubscriptionId, { nullable: true })
}), { nullable: true }),
  /**
* Options that determine which webhooks are sent as part of a simulation.
*/
"options": S.optionalWith(SimulationConfigOptionsPayment, { nullable: true })
}) {}

/**
* Configuration for subscription resumed simulations.
*/
export class SimulationConfigSubscriptionResume extends S.Struct({
  /**
* Adds details of existing Paddle entities to webhook payloads sent in the simulation.
*/
"entities": S.optionalWith(S.Struct({
  /**
* Paddle ID of a subscription to simulate as resumed. Adds details of that subscription to webhook payloads.
*/
"subscription_id": S.optionalWith(SubscriptionId, { nullable: true })
}), { nullable: true }),
  /**
* Options that determine which webhooks are sent as part of a simulation.
*/
"options": S.optionalWith(SimulationConfigOptionsPayment, { nullable: true })
}) {}

/**
* Configuration for this scenario simulation. Determines which granular flow is simulated and what entities are used to populate webhook payloads with.
*/
export class SimulationScenarioConfig extends S.Union(S.Struct({
  "subscription_cancellation": S.optionalWith(SimulationConfigSubscriptionCancellation, { nullable: true }),
  "subscription_creation": S.optionalWith(SimulationConfigSubscriptionCreation, { nullable: true }),
  "subscription_pause": S.optionalWith(SimulationConfigSubscriptionPause, { nullable: true }),
  "subscription_renewal": S.optionalWith(SimulationConfigSubscriptionRenewal, { nullable: true }),
  "subscription_resume": S.optionalWith(SimulationConfigSubscriptionResume, { nullable: true })
}),
S.Null) {}

/**
* Represents a simulation entity for a scenario.
*/
export class SimulationScenarioEvents extends S.Struct({
  "id": S.optionalWith(SimulationId, { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* Paddle ID of the notification setting where this simulation is sent, prefixed with `ntfset_`.
*/
"notification_setting_id": S.optionalWith(NotificationSettingId, { nullable: true }),
  /**
* Name of this simulation.
*/
"name": S.optionalWith(S.String, { nullable: true }),
  /**
* Scenario for this simulation. Scenario simulations play all events sent for a subscription lifecycle event.
*/
"type": S.optionalWith(SimulationScenarioEventsType, { nullable: true }),
  /**
* Configuration for this scenario simulation. Determines which granular flow is simulated and what entities are used to populate webhook payloads with.
*/
"config": S.optionalWith(S.Struct({
  "subscription_cancellation": S.optionalWith(SimulationConfigSubscriptionCancellation, { nullable: true }),
  "subscription_creation": S.optionalWith(SimulationConfigSubscriptionCreation, { nullable: true }),
  "subscription_pause": S.optionalWith(SimulationConfigSubscriptionPause, { nullable: true }),
  "subscription_renewal": S.optionalWith(SimulationConfigSubscriptionRenewal, { nullable: true }),
  "subscription_resume": S.optionalWith(SimulationConfigSubscriptionResume, { nullable: true })
}), { nullable: true }),
  /**
* RFC 3339 datetime string of when this simulation was last run. `null` until run. Set automatically by Paddle.
*/
"last_run_at": S.optionalWith(Timestamp, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true })
}) {}

/**
* Represents a simulation entity.
*/
export class Simulation extends S.Record({ key: S.String, value: S.Unknown }) {}

export class ListSimulations200 extends S.Struct({
  "data": S.Array(Simulation),
  "meta": MetaPaginated
}) {}

/**
* Represents a simulation entity for a single event when creating.
*/
export class SimulationStandardEventsCreate extends S.Struct({
  /**
* Paddle ID of the notification setting where this simulation is sent, prefixed with `ntfset_`.
*/
"notification_setting_id": NotificationSettingId,
  /**
* Name of this simulation.
*/
"name": S.String,
  /**
* Single event sent for this simulation, in the format `entity.event_type`.
*/
"type": EventTypeName,
  /**
* Simulation payload. Pass a JSON object that matches the schema for an event type to simulate a custom payload. If omitted, Paddle populates with a demo example.
*/
"payload": S.optionalWith(S.Record({ key: S.String, value: S.Unknown }), { nullable: true })
}) {}

/**
* Configuration for subscription canceled simulations.
*/
export class SimulationConfigSubscriptionCancellationCreate extends S.Struct({
  "subscription_cancellation": S.optionalWith(S.Record({ key: S.String, value: S.Unknown }), { nullable: true }),
  "subscription_creation": S.optionalWith(S.Null, { nullable: true }),
  "subscription_pause": S.optionalWith(S.Null, { nullable: true }),
  "subscription_renewal": S.optionalWith(S.Null, { nullable: true }),
  "subscription_resume": S.optionalWith(S.Null, { nullable: true })
}) {}

/**
* Configuration resources for subscription creation simulations
*/
export class SimulationConfigEntitiesSubscriptionCreationNoPrices extends S.Struct({
  /**
* Paddle ID of a customer. Adds customer details to webhook payloads.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of an address. Adds address details to webhook payloads. Requires `customer_id`.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of a business. Adds business details to webhook payloads. Requires `customer_id`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Paddle ID of a payment method. Adds payment method details to webhook payloads. Requires `customer_id`.
*/
"payment_method_id": S.optionalWith(PaymentMethodId, { nullable: true }),
  /**
* Paddle ID of an existing discount to apply to the simulated subscription.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Items for the simulated subscription. Only existing products and prices can be simulated. Non-catalog items are not supported
*/
"items": S.optionalWith(S.Null, { nullable: true }),
  /**
* Paddle ID of an existing transaction. Simulates passing a transaction ID to Paddle.js.
*/
"transaction_id": S.optionalWith(S.Null, { nullable: true })
}) {}

/**
* Configuration resources for subscription creation simulations with items
*/
export class SimulationConfigEntitiesSubscriptionCreationItems extends S.Struct({
  /**
* Paddle ID of a customer. Adds customer details to webhook payloads.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of an address. Adds address details to webhook payloads. Requires `customer_id`.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of a business. Adds business details to webhook payloads. Requires `customer_id`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Paddle ID of a payment method. Adds payment method details to webhook payloads. Requires `customer_id`.
*/
"payment_method_id": S.optionalWith(PaymentMethodId, { nullable: true }),
  /**
* Paddle ID of a discount. Adds discount details (including price calculations) to webhook payloads. Requires `items` or `transaction_id` for the discount to be applied.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Items to include on the simulated subscription. Only existing products and prices can be simulated. Non-catalog items aren't supported. At least one recurring price must be provided.
*/
"items": S.optionalWith(S.Array(SubscriptionItemCreateWithPriceId).pipe(S.minItems(1), S.maxItems(100)), { nullable: true }),
  /**
* Paddle ID of an existing transaction. Simulates passing a transaction ID to Paddle.js.
*/
"transaction_id": S.optionalWith(S.Null, { nullable: true })
}) {}

/**
* Configuration resources for subscription creation simulations with existing transaction
*/
export class SimulationConfigEntitiesSubscriptionCreationTransaction extends S.Struct({
  /**
* Paddle ID of a customer. Adds customer details to webhook payloads.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of an address. Adds address details to webhook payloads. Requires `customer_id`.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of a business. Adds business details to webhook payloads. Requires `customer_id`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Paddle ID of a payment method. Adds payment method details to webhook payloads. Requires `customer_id`.
*/
"payment_method_id": S.optionalWith(PaymentMethodId, { nullable: true }),
  /**
* Paddle ID of a discount. Adds discount details (including price calculations) to webhook payloads. Requires `items` or `transaction_id` for the discount to be applied.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Paddle ID of a transaction. Bases the subscription from this transaction.
*/
"transaction_id": S.optionalWith(TransactionId, { nullable: true }),
  /**
* Items to include on the simulated subscription. Only existing products and prices can be simulated. Non-catalog items aren't supported. At least one recurring price must be provided.
*/
"items": S.optionalWith(S.Null, { nullable: true })
}) {}

/**
* Configuration for subscription creation simulations.
*/
export class SimulationConfigSubscriptionCreationCreate extends S.Struct({
  /**
* Configuration for subscription creation simulations.
*/
"subscription_creation": S.optionalWith(S.Struct({
  /**
* Adds details of existing Paddle entities to webhook payloads sent in the simulation.
*/
"entities": S.optionalWith(S.Union(SimulationConfigEntitiesSubscriptionCreationNoPrices,
SimulationConfigEntitiesSubscriptionCreationItems,
SimulationConfigEntitiesSubscriptionCreationTransaction), { nullable: true }),
  /**
* Options that determine which webhooks are sent as part of a simulation.
*/
"options": S.optionalWith(SimulationConfigSubscriptionCreationOptions, { nullable: true })
}), { nullable: true }),
  "subscription_cancellation": S.optionalWith(S.Null, { nullable: true }),
  "subscription_pause": S.optionalWith(S.Null, { nullable: true }),
  "subscription_renewal": S.optionalWith(S.Null, { nullable: true }),
  "subscription_resume": S.optionalWith(S.Null, { nullable: true })
}) {}

/**
* Configuration for subscription paused simulations.
*/
export class SimulationConfigSubscriptionPauseCreate extends S.Struct({
  "subscription_pause": S.optionalWith(S.Record({ key: S.String, value: S.Unknown }), { nullable: true }),
  "subscription_cancellation": S.optionalWith(S.Null, { nullable: true }),
  "subscription_creation": S.optionalWith(S.Null, { nullable: true }),
  "subscription_renewal": S.optionalWith(S.Null, { nullable: true }),
  "subscription_resume": S.optionalWith(S.Null, { nullable: true })
}) {}

/**
* Determines which webhooks are sent based on the outcome of the payment. If omitted, defaults to `success`.
*/
export class SimulationConfigOptionsPaymentSuccessPaymentOutcome extends S.Literal("success") {}

/**
* Options for when the payment outcome is successful.
*/
export class SimulationConfigOptionsPaymentSuccess extends S.Struct({
  /**
* Determines which webhooks are sent based on the outcome of the payment. If omitted, defaults to `success`.
*/
"payment_outcome": S.optionalWith(SimulationConfigOptionsPaymentSuccessPaymentOutcome, { nullable: true, default: () => "success" as const }),
  /**
* Determines which webhooks are sent based on what happens to the subscription when payment recovery attempts are exhausted. Only applies when `payment_outcome` is `failed`. If omitted, defaults to `null`.
*/
"dunning_exhausted_action": S.optionalWith(S.Null, { nullable: true })
}) {}

/**
* Determines which webhooks are sent based on the outcome of the payment. If omitted, defaults to `success`.
*/
export class SimulationConfigOptionsPaymentFailedPaymentOutcome extends S.Literal("failed") {}

/**
* Determines which webhooks are sent based on what happens to the subscription when payment recovery attempts are exhausted. If omitted, defaults to `subscription_canceled`.
*/
export class SimulationConfigOptionsPaymentFailedDunningExhaustedAction extends S.Literal("subscription_paused", "subscription_canceled") {}

/**
* Options for when the payment outcome is failed.
*/
export class SimulationConfigOptionsPaymentFailed extends S.Struct({
  /**
* Determines which webhooks are sent based on the outcome of the payment. If omitted, defaults to `success`.
*/
"payment_outcome": S.optionalWith(SimulationConfigOptionsPaymentFailedPaymentOutcome, { nullable: true }),
  /**
* Determines which webhooks are sent based on what happens to the subscription when payment recovery attempts are exhausted. If omitted, defaults to `subscription_canceled`.
*/
"dunning_exhausted_action": S.optionalWith(SimulationConfigOptionsPaymentFailedDunningExhaustedAction, { nullable: true, default: () => "subscription_canceled" as const })
}) {}

/**
* Determines which webhooks are sent based on the outcome of the payment. If omitted, defaults to `success`.
*/
export class SimulationConfigOptionsPaymentRecoveredExistingPaymentOutcome extends S.Literal("recovered_existing_payment_method") {}

/**
* Options for when the payment is recovered from an existing payment method.
*/
export class SimulationConfigOptionsPaymentRecoveredExisting extends S.Struct({
  /**
* Determines which webhooks are sent based on the outcome of the payment. If omitted, defaults to `success`.
*/
"payment_outcome": S.optionalWith(SimulationConfigOptionsPaymentRecoveredExistingPaymentOutcome, { nullable: true }),
  /**
* Determines which webhooks are sent based on what happens to the subscription when payment recovery attempts are exhausted. Only applies when `payment_outcome` is `failed`. If omitted, defaults to `null`.
*/
"dunning_exhausted_action": S.optionalWith(S.Null, { nullable: true })
}) {}

/**
* Determines which webhooks are sent based on the outcome of the payment. If omitted, defaults to `success`.
*/
export class SimulationConfigOptionsPaymentRecoveredUpdatedPaymentOutcome extends S.Literal("recovered_updated_payment_method") {}

/**
* Options for when the payment is recovered from an updated payment method.
*/
export class SimulationConfigOptionsPaymentRecoveredUpdated extends S.Struct({
  /**
* Determines which webhooks are sent based on the outcome of the payment. If omitted, defaults to `success`.
*/
"payment_outcome": S.optionalWith(SimulationConfigOptionsPaymentRecoveredUpdatedPaymentOutcome, { nullable: true }),
  /**
* Determines which webhooks are sent based on what happens to the subscription when payment recovery attempts are exhausted. Only applies when `payment_outcome` is `failed`. If omitted, defaults to `null`.
*/
"dunning_exhausted_action": S.optionalWith(S.Null, { nullable: true })
}) {}

/**
* Configuration for subscription renewed simulations.
*/
export class SimulationConfigSubscriptionRenewalCreate extends S.Struct({
  /**
* Configuration for subscription renewed simulations.
*/
"subscription_renewal": S.optionalWith(S.Struct({
  /**
* Adds details of existing Paddle entities to webhook payloads sent in the simulation.
*/
"entities": S.optionalWith(S.Struct({
  /**
* Paddle ID of a subscription to simulate as renewed. Adds details of that subscription to webhook payloads.
*/
"subscription_id": S.optionalWith(SubscriptionId, { nullable: true })
}), { nullable: true }),
  /**
* Options that determine which webhooks are sent as part of a simulation.
*/
"options": S.optionalWith(S.Union(SimulationConfigOptionsPaymentSuccess,
SimulationConfigOptionsPaymentFailed,
SimulationConfigOptionsPaymentRecoveredExisting,
SimulationConfigOptionsPaymentRecoveredUpdated), { nullable: true })
}), { nullable: true }),
  "subscription_cancellation": S.optionalWith(S.Null, { nullable: true }),
  "subscription_creation": S.optionalWith(S.Null, { nullable: true }),
  "subscription_pause": S.optionalWith(S.Null, { nullable: true }),
  "subscription_resume": S.optionalWith(S.Null, { nullable: true })
}) {}

/**
* Configuration for subscription resumed simulations.
*/
export class SimulationConfigSubscriptionResumeCreate extends S.Struct({
  /**
* Configuration for subscription resumed simulations.
*/
"subscription_resume": S.optionalWith(S.Struct({
  /**
* Adds details of existing Paddle entities to webhook payloads sent in the simulation.
*/
"entities": S.optionalWith(S.Struct({
  /**
* Paddle ID of a subscription to simulate as resumed. Adds details of that subscription to webhook payloads.
*/
"subscription_id": S.optionalWith(SubscriptionId, { nullable: true })
}), { nullable: true }),
  /**
* Options that determine which webhooks are sent as part of a simulation.
*/
"options": S.optionalWith(S.Union(SimulationConfigOptionsPaymentSuccess,
SimulationConfigOptionsPaymentFailed,
SimulationConfigOptionsPaymentRecoveredExisting,
SimulationConfigOptionsPaymentRecoveredUpdated), { nullable: true })
}), { nullable: true }),
  "subscription_cancellation": S.optionalWith(S.Null, { nullable: true }),
  "subscription_creation": S.optionalWith(S.Null, { nullable: true }),
  "subscription_pause": S.optionalWith(S.Null, { nullable: true }),
  "subscription_renewal": S.optionalWith(S.Null, { nullable: true })
}) {}

/**
* Configuration for this scenario simulation. Use to simulate more granular flows and populate payloads with your own entity data.
*/
export class SimulationScenarioCreateConfig extends S.Union(SimulationConfigSubscriptionCancellationCreate,
SimulationConfigSubscriptionCreationCreate,
SimulationConfigSubscriptionPauseCreate,
SimulationConfigSubscriptionRenewalCreate,
SimulationConfigSubscriptionResumeCreate,
S.Null) {}

/**
* Represents a simulation entity for a scenario when creating.
*/
export class SimulationScenarioEventsCreate extends S.Struct({
  /**
* Paddle ID of the notification setting where this simulation is sent, prefixed with `ntfset_`.
*/
"notification_setting_id": NotificationSettingId,
  /**
* Name of this simulation.
*/
"name": S.String,
  /**
* Scenario for this simulation. Scenario simulations play all events sent for a subscription lifecycle event.
*/
"type": SimulationScenarioEventsType,
  /**
* Configuration for this scenario simulation. Use to simulate more granular flows and populate payloads with your own entity data. If omitted, Paddle simulates the default scenario flow and populates payloads with demo examples.
*/
"config": S.optionalWith(S.Union(SimulationConfigSubscriptionCancellationCreate,
SimulationConfigSubscriptionCreationCreate,
SimulationConfigSubscriptionPauseCreate,
SimulationConfigSubscriptionRenewalCreate,
SimulationConfigSubscriptionResumeCreate), { nullable: true })
}) {}

/**
* Represents a simulation entity when creating.
*/
export class SimulationCreate extends S.Record({ key: S.String, value: S.Unknown }) {}

export class CreateSimulation201 extends S.Struct({
  "data": Simulation,
  "meta": Meta
}) {}

export class GetSimulation200 extends S.Struct({
  "data": Simulation,
  "meta": Meta
}) {}

/**
* Represents a simulation entity for a single event when updating.
*/
export class SimulationStandardEventsUpdate extends S.Struct({
  /**
* Paddle ID of the notification setting where this simulation is sent, prefixed with `ntfset_`.
*/
"notification_setting_id": S.optionalWith(NotificationSettingId, { nullable: true }),
  /**
* Name of this simulation.
*/
"name": S.optionalWith(S.String, { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* Single event sent for this simulation, in the format `entity.event_type`.
*/
"type": S.optionalWith(EventTypeName, { nullable: true }),
  /**
* Simulation payload. Pass a JSON object that matches the schema for an event type to simulate a custom payload. Set to `null` to clear and populate with a demo example.
*/
"payload": S.optionalWith(S.Record({ key: S.String, value: S.Unknown }), { nullable: true })
}) {}

/**
* Represents a simulation entity for a scenario when updating.
*/
export class SimulationScenarioEventsUpdate extends S.Struct({
  /**
* Paddle ID of the notification setting where this simulation is sent, prefixed with `ntfset_`.
*/
"notification_setting_id": S.optionalWith(NotificationSettingId, { nullable: true }),
  /**
* Name of this simulation.
*/
"name": S.optionalWith(S.String, { nullable: true }),
  "status": S.optionalWith(Status, { nullable: true }),
  /**
* Scenario for this simulation. Scenario simulations play all events sent for a subscription lifecycle event.
*/
"type": S.optionalWith(SimulationScenarioEventsType, { nullable: true }),
  /**
* Configuration for this scenario simulation. Use to simulate more granular flows and populate payloads with your own entity data. If omitted, Paddle simulates the default scenario flow and populates payloads with demo examples.
*/
"config": S.optionalWith(S.Union(SimulationConfigSubscriptionCancellationCreate,
SimulationConfigSubscriptionCreationCreate,
SimulationConfigSubscriptionPauseCreate,
SimulationConfigSubscriptionRenewalCreate,
SimulationConfigSubscriptionResumeCreate), { nullable: true })
}) {}

/**
* Represents a simulation entity when updating.
*/
export class SimulationUpdate extends S.Record({ key: S.String, value: S.Unknown }) {}

export class UpdateSimulation200 extends S.Struct({
  "data": Simulation,
  "meta": Meta
}) {}

export class ListSimulationRunsParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "include": S.optionalWith(S.Array(S.Literal("events")), { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const }),
  "id": S.optionalWith(S.Array(S.String), { nullable: true })
}) {}

/**
* Unique Paddle ID for this simulation event, prefixed with `ntfsimevt_`.
*/
export class SimulationEventId extends S.String.pipe(S.pattern(new RegExp("^ntfsimevt_[a-z\\d]{26}$"))) {}

/**
* Status of this simulation run log.
*/
export class SimulationEventStatus extends S.Literal("pending", "success", "failed", "aborted") {}

/**
* Represents a simulation event.
*/
export class SimulationEvent extends S.Struct({
  "id": S.optionalWith(SimulationEventId, { nullable: true }),
  "status": S.optionalWith(SimulationEventStatus, { nullable: true }),
  "event_type": S.optionalWith(EventTypeName, { nullable: true }),
  /**
* Information about the request. Sent by Paddle as part of the simulation.
*/
"request": S.optionalWith(S.Struct({
  /**
* Request body sent by Paddle.
*/
"body": S.optionalWith(S.String, { nullable: true })
}), { nullable: true }),
  /**
* Information about the response. Sent by the responding server for the notification setting.
*/
"response": S.optionalWith(S.Struct({
  /**
* Response body sent by the responding server. May be empty for success responses.
*/
"body": S.optionalWith(S.String, { nullable: true }),
  /**
* HTTP status code sent by the responding server.
*/
"status_code": S.optionalWith(S.Number, { nullable: true })
}), { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true })
}) {}

/**
* Unique Paddle ID for this simulation run, prefixed with `ntfsimrun_`.
*/
export class SimulationRunId extends S.String.pipe(S.pattern(new RegExp("^ntfsimrun_[a-z\\d]{26}$"))) {}

/**
* Status of this simulation run.
*/
export class SimulationRunStatus extends S.Literal("pending", "completed", "canceled") {}

/**
* Represents a simulation run entity for a single event.
*/
export class SimulationRunSingleEventIncludes extends S.Struct({
  /**
* Events associated with this simulation run. Paddle creates a list of events for each simulation runs. Returned when the
* `include` parameter is used with the `events` value.
*/
"events": S.optionalWith(S.Array(SimulationEvent), { nullable: true }),
  "id": S.optionalWith(SimulationRunId, { nullable: true }),
  "status": S.optionalWith(SimulationRunStatus, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* Single event sent for this simulation, in the format `entity.event_type`.
*/
"type": S.optionalWith(EventTypeName, { nullable: true })
}) {}

/**
* Represents a simulation run entity for a scenario.
*/
export class SimulationRunScenarioIncludes extends S.Struct({
  /**
* Events associated with this simulation run. Paddle creates a list of events for each simulation runs. Returned when the
* `include` parameter is used with the `events` value.
*/
"events": S.optionalWith(S.Array(SimulationEvent), { nullable: true }),
  "id": S.optionalWith(SimulationRunId, { nullable: true }),
  "status": S.optionalWith(SimulationRunStatus, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* Scenario for this simulation. Scenario simulations play all events sent for a subscription lifecycle event.
*/
"type": S.optionalWith(SimulationScenarioEventsType, { nullable: true })
}) {}

/**
* Represents a simulation run entity.
*/
export class SimulationRunIncludes extends S.Record({ key: S.String, value: S.Unknown }) {}

export class ListSimulationRuns200 extends S.Struct({
  "data": S.Array(SimulationRunIncludes),
  "meta": MetaPaginated
}) {}

/**
* Represents a simulation run entity for a single event.
*/
export class SimulationRunSingleEvent extends S.Struct({
  "id": S.optionalWith(SimulationRunId, { nullable: true }),
  "status": S.optionalWith(SimulationRunStatus, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* Single event sent for this simulation, in the format `entity.event_type`.
*/
"type": S.optionalWith(EventTypeName, { nullable: true })
}) {}

/**
* Represents a simulation run entity for a scenario.
*/
export class SimulationRunScenario extends S.Struct({
  "id": S.optionalWith(SimulationRunId, { nullable: true }),
  "status": S.optionalWith(SimulationRunStatus, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* Scenario for this simulation. Scenario simulations play all events sent for a subscription lifecycle event.
*/
"type": S.optionalWith(SimulationScenarioEventsType, { nullable: true })
}) {}

/**
* Represents a simulation run entity.
*/
export class SimulationRun extends S.Record({ key: S.String, value: S.Unknown }) {}

export class CreateSimulationRun201 extends S.Struct({
  "data": SimulationRun,
  "meta": Meta
}) {}

export class GetSimulationRunParams extends S.Struct({
  "include": S.optionalWith(S.Array(S.Literal("events")), { nullable: true })
}) {}

export class GetSimulationRun200 extends S.Struct({
  "data": SimulationRunIncludes,
  "meta": Meta
}) {}

export class ListSimulationsEventsParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const }),
  "id": S.optionalWith(S.Array(S.String), { nullable: true })
}) {}

export class ListSimulationsEvents200 extends S.Struct({
  "data": S.Array(SimulationEvent),
  "meta": MetaPaginated
}) {}

export class GetSimulationEvent200 extends S.Struct({
  "data": SimulationEvent,
  "meta": Meta
}) {}

export class ReplaySimulationRunEvent202 extends S.Struct({
  "data": SimulationEvent,
  "meta": Meta
}) {}

export class GetIpAddresses200 extends S.Struct({
  "data": S.Struct({
  /**
* List of Paddle IPv4 CIDRs.
*/
"ipv4_cidrs": S.optionalWith(S.Array(S.String), { nullable: true })
}),
  "meta": Meta
}) {}

export class GetTransactionInvoiceParamsDisposition extends S.Literal("attachment", "inline") {}

export class GetTransactionInvoiceParams extends S.Struct({
  "disposition": S.optionalWith(GetTransactionInvoiceParamsDisposition, { nullable: true, default: () => "attachment" as const })
}) {}

export class GetTransactionInvoice200 extends S.Struct({
  "data": S.Struct({
  /**
* URL of the requested resource.
*/
"url": S.optionalWith(S.String, { nullable: true })
}),
  "meta": Meta
}) {}

export class ListDiscountsParamsMode extends S.Literal("custom", "standard") {}

export class ListDiscountsParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "code": S.optionalWith(S.Array(S.String), { nullable: true }),
  "id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const }),
  "status": S.optionalWith(S.Array(S.Literal("active", "archived")), { nullable: true }),
  "mode": S.optionalWith(ListDiscountsParamsMode, { nullable: true })
}) {}

export class ListDiscounts200 extends S.Struct({
  "data": S.Array(Discount),
  "meta": MetaPaginated
}) {}

/**
* Type of discount. Determines how this discount impacts the checkout or transaction total.
*/
export class DiscountCreateType extends S.Literal("flat", "flat_per_seat", "percentage") {}

/**
* Represents a discount entity when creating discounts.
*/
export class DiscountCreate extends S.Class<DiscountCreate>("DiscountCreate")({
  "id": S.optionalWith(DiscountId, { nullable: true }),
  "status": S.optionalWith(StatusDiscount, { nullable: true }),
  /**
* Short description for this discount for your reference. Not shown to customers.
*/
"description": S.String.pipe(S.minLength(1), S.maxLength(500)),
  /**
* Whether this discount can be redeemed by customers at checkout (`true`) or not (`false`).
*/
"enabled_for_checkout": S.optionalWith(S.Boolean, { nullable: true, default: () => true as const }),
  /**
* Unique code that customers can use to redeem this discount at checkout. Use letters and numbers only, up to 32 characters. Not case-sensitive.
* 
* If omitted and `enabled_for_checkout` is `true`, Paddle generates a random 10-character code.
*/
"code": S.optionalWith(DiscountCode, { nullable: true }),
  /**
* Type of discount. Determines how this discount impacts the checkout or transaction total.
*/
"type": DiscountCreateType,
  /**
* Discount mode. Standard discounts are considered part of your catalog and are shown in the Paddle dashboard. If omitted, defaults to `standard`.
*/
"mode": S.optionalWith(DiscountMode, { nullable: true, default: () => "standard" as const }),
  /**
* Amount to discount by. For `percentage` discounts, must be an amount between `0.01` and `100`. For `flat` and `flat_per_seat` discounts, amount in the lowest denomination for a currency.
*/
"amount": S.String,
  /**
* Supported three-letter ISO 4217 currency code. Required where discount type is `flat` or `flat_per_seat`.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  /**
* Whether this discount applies for multiple subscription billing periods (`true`) or not (`false`). If omitted, defaults to `false`.
*/
"recur": S.optionalWith(S.Boolean, { nullable: true, default: () => false as const }),
  /**
* Number of subscription billing periods that this discount recurs for. Requires `recur`. `null` if this discount recurs forever.
* 
* Subscription renewals, midcycle changes, and one-time charges billed to a subscription aren't considered a redemption. `times_used` is not incremented in these cases.
*/
"maximum_recurring_intervals": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  /**
* Maximum number of times this discount can be redeemed. This is an overall limit for this discount, rather than a per-customer limit. `null` if this discount can be redeemed an unlimited amount of times.
* 
* Paddle counts a usage as a redemption on a checkout, transaction, or the initial application against a subscription. Transactions created for subscription renewals, midcycle changes, and one-time charges aren't considered a redemption.
*/
"usage_limit": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  /**
* Product or price IDs that this discount is for. When including a product ID, all prices for that product can be discounted. `null` if this discount applies to all products and prices.
*/
"restrict_to": S.optionalWith(S.Array(S.String.pipe(S.pattern(new RegExp("^(pri|pro)_[a-z\\d]{26}$")))), { nullable: true }),
  /**
* RFC 3339 datetime string of when this discount expires. Discount can no longer be redeemed after this date has elapsed. `null` if this discount can be redeemed forever.
* 
* Expired discounts can't be redeemed against transactions or checkouts, but can be applied when updating subscriptions.
*/
"expires_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* How many times this discount has been redeemed. Automatically incremented by Paddle.
* 
* Paddle counts a usage as a redemption on a checkout, transaction, or subscription. Transactions created for subscription renewals, midcycle changes, and one-time charges aren't considered a redemption.
*/
"times_used": S.optionalWith(S.Int, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

export class CreateDiscount201 extends S.Struct({
  "data": Discount,
  "meta": Meta
}) {}

export class GetDiscount200 extends S.Struct({
  "data": Discount,
  "meta": Meta
}) {}

export class UpdateDiscount200 extends S.Struct({
  "data": Discount,
  "meta": Meta
}) {}

export class GetSubscriptionParams extends S.Struct({
  "include": S.optionalWith(S.Array(S.Literal("next_transaction", "recurring_transaction_details")), { nullable: true })
}) {}

/**
* Calculated totals for a transaction preview, including discounts, tax, and currency conversion. Considered the source of truth for totals on a transaction preview.
*/
export class SubscriptionTransactionPreviewDetails extends S.Struct({
  /**
* List of tax rates applied to this transaction preview.
*/
"tax_rates_used": S.optionalWith(S.Array(S.Struct({
  /**
* Rate used to calculate tax for this transaction preview.
*/
"tax_rate": S.optionalWith(S.String, { nullable: true }),
  /**
* Calculated totals for the tax applied to this transaction preview.
*/
"totals": S.optionalWith(Totals, { nullable: true })
})), { nullable: true }),
  /**
* Breakdown of the total for a transaction preview. `fee` and `earnings` always return `null` for transaction previews.
*/
"totals": S.optionalWith(TransactionTotals, { nullable: true }),
  /**
* Information about line items for this transaction preview. Different from transaction preview `items` as they include totals calculated by Paddle. Considered the source of truth for line item totals.
*/
"line_items": S.optionalWith(S.Array(S.Struct({
  /**
* How proration was calculated for this item.
*/
"proration": S.optionalWith(TransactionItemProration, { nullable: true }),
  /**
* Paddle ID for the price related to this transaction line item, prefixed with `pri_`.
* The value is null for custom prices being previewed.
*/
"price_id": S.optionalWith(PriceId, { nullable: true }),
  /**
* Quantity of this transaction line item.
*/
"quantity": S.optionalWith(S.Int, { nullable: true }),
  /**
* Rate used to calculate tax for this transaction line item.
*/
"tax_rate": S.optionalWith(S.String, { nullable: true }),
  /**
* Breakdown of the charge for one unit in the lowest denomination of a currency (e.g. cents for USD).
*/
"unit_totals": S.optionalWith(Totals, { nullable: true }),
  "totals": S.optionalWith(Totals, { nullable: true }),
  /**
* Related product entity for this transaction line item price.
*/
"product": S.optionalWith(ProductPreview, { nullable: true })
})), { nullable: true })
}) {}

/**
* Type of adjustment for this transaction item. `tax` adjustments are automatically created by Paddle.
* Include `amount` when creating a `partial` adjustment.
*/
export class AdjustmentItemType extends S.Literal("full", "partial", "tax", "proration") {}

export class AdjustmentItem extends S.Struct({
  /**
* Paddle ID for the transaction item that this adjustment item relates to, prefixed with `txnitm_`.
*/
"item_id": TransactionItemId,
  /**
* Type of adjustment for this transaction item. `tax` adjustments are automatically created by Paddle.
* Include `amount` when creating a `partial` adjustment.
*/
"type": AdjustmentItemType,
  /**
* Amount adjusted for this transaction item. Required when item `type` is `partial`.
*/
"amount": S.optionalWith(S.String, { nullable: true }),
  /**
* How proration was calculated for this adjustment item.
*/
"proration": S.optionalWith(TransactionItemProration, { nullable: true }),
  "totals": S.optionalWith(AdjustmentItemTotals, { nullable: true })
}) {}

/**
* Represents an adjustment entity when previewing adjustments.
*/
export class AdjustmentPreview extends S.Struct({
  /**
* Paddle ID for this transaction entity that this adjustment relates to, prefixed with `txn_`.
*/
"transaction_id": TransactionId,
  "tax_mode": S.optionalWith(AdjustmentTaxMode, { nullable: true, default: () => "internal" as const }),
  /**
* List of transaction items that this adjustment is for.
*/
"items": S.Array(AdjustmentItem).pipe(S.maxItems(100)),
  /**
* Calculated totals for this adjustment.
*/
"totals": S.optionalWith(AdjustmentTotals, { nullable: true })
}) {}

/**
* Preview of the next transaction for this subscription. May include prorated charges that aren't yet billed and one-time charges. `null` if the subscription is scheduled to cancel or pause.
*/
export class SubscriptionNextTransaction extends S.Struct({
  /**
* Billing period for the next transaction.
*/
"billing_period": S.optionalWith(TimePeriod, { nullable: true }),
  "details": S.optionalWith(SubscriptionTransactionPreviewDetails, { nullable: true }),
  /**
* Preview of adjustments for the next transaction.
*/
"adjustments": S.optionalWith(S.Array(AdjustmentPreview), { nullable: true })
}) {}

/**
* Calculated totals for a transaction preview, including discounts, tax, and currency conversion. Considered the source of truth for totals on a transaction preview.
*/
export class SubscriptionRecurringTransactionDetails extends S.Struct({
  /**
* List of tax rates applied to this transaction preview.
*/
"tax_rates_used": S.optionalWith(S.Array(S.Struct({
  /**
* Rate used to calculate tax for this transaction preview.
*/
"tax_rate": S.optionalWith(S.String, { nullable: true }),
  /**
* Calculated totals for the tax applied to this transaction preview.
*/
"totals": S.optionalWith(Totals, { nullable: true })
})), { nullable: true }),
  /**
* Breakdown of the total for a transaction preview. `fee` and `earnings` always return `null` for transaction previews.
*/
"totals": S.optionalWith(TransactionTotals, { nullable: true }),
  /**
* Information about line items for this transaction preview. Different from transaction preview `items` as they include totals calculated by Paddle. Considered the source of truth for line item totals.
*/
"line_items": S.optionalWith(S.Array(S.Struct({
  /**
* How proration was calculated for this item.
*/
"proration": S.optionalWith(TransactionItemProration, { nullable: true }),
  /**
* Paddle ID for the price related to this transaction line item, prefixed with `pri_`.
* The value is null for custom prices being previewed.
*/
"price_id": S.optionalWith(PriceId, { nullable: true }),
  /**
* Quantity of this transaction line item.
*/
"quantity": S.optionalWith(S.Int, { nullable: true }),
  /**
* Rate used to calculate tax for this transaction line item.
*/
"tax_rate": S.optionalWith(S.String, { nullable: true }),
  /**
* Breakdown of the charge for one unit in the lowest denomination of a currency (e.g. cents for USD).
*/
"unit_totals": S.optionalWith(Totals, { nullable: true }),
  "totals": S.optionalWith(Totals, { nullable: true }),
  /**
* Related product entity for this transaction line item price.
*/
"product": S.optionalWith(ProductPreview, { nullable: true })
})), { nullable: true })
}) {}

/**
* Status of this subscription. Set automatically by Paddle. Use the pause subscription or cancel subscription operations to change.
*/
export class StatusSubscription extends S.Literal("active", "canceled", "past_due", "paused", "trialing") {}

/**
* Details of the discount applied to this subscription.
*/
export class DiscountSubscription extends S.Struct({
  "id": DiscountId,
  /**
* RFC 3339 datetime string of when this discount was first applied. `null` for canceled subscriptions where a discount was redeemed but never applied to a transaction.
*/
"starts_at": S.NullOr(Timestamp),
  /**
* RFC 3339 datetime string of when this discount no longer applies. Where a discount has `maximum_recurring_intervals`, this is the date of the last billing period where this discount applies. `null` where a discount recurs forever.
*/
"ends_at": S.NullOr(Timestamp)
}) {}

/**
* Kind of change that's scheduled to be applied to this subscription.
*/
export class SubscriptionScheduledChangeAction extends S.Literal("cancel", "pause", "resume") {}

/**
* Change that's scheduled to be applied to a subscription. Use the pause subscription, cancel subscription, and resume subscription operations to create scheduled changes. `null` if no scheduled changes.
*/
export class SubscriptionScheduledChange extends S.Struct({
  /**
* Kind of change that's scheduled to be applied to this subscription.
*/
"action": S.optionalWith(SubscriptionScheduledChangeAction, { nullable: true }),
  /**
* RFC 3339 datetime string of when this scheduled change takes effect.
*/
"effective_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when a paused subscription should resume. Only used for `pause` scheduled changes.
*/
"resume_at": S.optionalWith(Timestamp, { nullable: true })
}) {}

/**
* Authenticated customer portal deep links for this subscription. For security, the `token` appended to each link is temporary. You shouldn't store these links.
*/
export class SubscriptionManagementUrls extends S.Struct({
  /**
* Link to the page for this subscription in the customer portal with the payment method update form pre-opened. Use as part of workflows to let customers update their payment details. `null` for manually-collected subscriptions.
*/
"update_payment_method": S.optionalWith(S.String, { nullable: true }),
  /**
* Link to the page for this subscription in the customer portal with the subscription cancellation form pre-opened. Use as part of cancel subscription workflows.
*/
"cancel": S.String
}) {}

/**
* Status of this subscription item. Set automatically by Paddle.
*/
export class ItemSubscriptionStatus extends S.Literal("active", "inactive", "trialing") {}

/**
* Represents a subscription item.
*/
export class ItemSubscription extends S.Struct({
  /**
* Status of this subscription item. Set automatically by Paddle.
*/
"status": S.optionalWith(ItemSubscriptionStatus, { nullable: true }),
  /**
* Quantity of this item on the subscription.
*/
"quantity": S.optionalWith(S.Number.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  /**
* Whether this is a recurring item. `false` if one-time.
*/
"recurring": S.optionalWith(S.Boolean, { nullable: true }),
  /**
* RFC 3339 datetime string of when this item was added to this subscription.
*/
"created_at": S.optionalWith(CreatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this item was last updated on this subscription.
*/
"updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this item was last billed.
*/
"previously_billed_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this item is next scheduled to be billed.
*/
"next_billed_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* Trial dates for this item.
*/
"trial_dates": S.optionalWith(TimePeriod, { nullable: true }),
  /**
* Related price entity for this item. This reflects the price entity at the time it was added to the subscription.
*/
"price": S.optionalWith(Price, { nullable: true }),
  /**
* Related product entity for this item. This reflects the product entity at the time it was added to the subscription.
*/
"product": S.optionalWith(Product, { nullable: true })
}) {}

/**
* Represents a subscription entity.
*/
export class SubscriptionIncludes extends S.Struct({
  /**
* Preview of the next transaction for this subscription. May include prorated charges that aren't yet billed and one-time charges. Returned when the `include` parameter is used with the `next_transaction` value. `null` if the subscription is scheduled to cancel or pause.
*/
"next_transaction": S.optionalWith(SubscriptionNextTransaction, { nullable: true }),
  /**
* Preview of the recurring transaction for this subscription. This is what the customer can expect to be billed when there are no prorated or one-time charges. Returned when the `include` parameter is used with the `recurring_transaction_details` value.
*/
"recurring_transaction_details": S.optionalWith(SubscriptionRecurringTransactionDetails, { nullable: true }),
  "id": S.optionalWith(SubscriptionId, { nullable: true }),
  "status": S.optionalWith(StatusSubscription, { nullable: true }),
  /**
* Paddle ID of the customer that this subscription is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of the address that this subscription is for, prefixed with `add_`.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of the business that this subscription is for, prefixed with `biz_`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code. Transactions for this subscription are created in this currency. Must be `USD`, `EUR`, or `GBP` if `collection_mode` is `manual`.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription started. This may be different from `first_billed_at` if the subscription started in trial.
*/
"started_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription was first billed. This may be different from `started_at` if the subscription started in trial.
*/
"first_billed_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription is next scheduled to be billed.
*/
"next_billed_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription was paused. Set automatically by Paddle when the pause subscription operation is used. `null` if not paused.
*/
"paused_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription was canceled. Set automatically by Paddle when the cancel subscription operation is used. `null` if not canceled.
*/
"canceled_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* Details of the discount applied to this subscription.
*/
"discount": S.optionalWith(DiscountSubscription, { nullable: true }),
  /**
* How payment is collected for transactions created for this subscription. `automatic` for checkout, `manual` for invoices.
*/
"collection_mode": S.optionalWith(CollectionMode, { nullable: true, default: () => "automatic" as const }),
  /**
* Details for invoicing. Required if `collection_mode` is `manual`.
*/
"billing_details": S.optionalWith(BillingDetails, { nullable: true }),
  /**
* Current billing period for this subscription. Set automatically by Paddle based on the billing cycle. `null` for `paused` and `canceled` subscriptions.
*/
"current_billing_period": S.optionalWith(TimePeriod, { nullable: true }),
  /**
* How often this subscription renews. Set automatically by Paddle based on the prices on this subscription.
*/
"billing_cycle": S.optionalWith(Duration, { nullable: true }),
  /**
* Change that's scheduled to be applied to a subscription. Use the pause subscription, cancel subscription, and resume subscription operations to create scheduled changes. `null` if no scheduled changes.
*/
"scheduled_change": S.optionalWith(SubscriptionScheduledChange, { nullable: true }),
  "management_urls": S.optionalWith(SubscriptionManagementUrls, { nullable: true }),
  /**
* List of items on this subscription. Only recurring items are returned.
*/
"items": S.optionalWith(S.Array(ItemSubscription).pipe(S.minItems(1), S.maxItems(100)), { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

export class GetSubscription200 extends S.Struct({
  "data": SubscriptionIncludes,
  "meta": Meta
}) {}

/**
* When this subscription change should take effect from. Defaults to `next_billing_period`, which creates a
* `scheduled_change` to apply the subscription change at the end of the billing period.
*/
export class EffectiveFrom extends S.Literal("next_billing_period", "immediately") {}

export class SubscriptionUpdateItem extends S.Struct({
  /**
* Paddle ID for the price to add to this subscription, prefixed with `pri_`.
*/
"price_id": PriceId,
  /**
* Quantity of this item to add to the subscription. If updating an existing item and not changing the quantity, you may omit `quantity`.
*/
"quantity": S.optionalWith(S.Number.pipe(S.greaterThanOrEqualTo(1)), { nullable: true })
}) {}

export class SubscriptionItemCreateWithPrice extends S.Struct({
  /**
* Quantity to bill for.
*/
"quantity": S.Int.pipe(S.greaterThanOrEqualTo(1)),
  /**
* Price object for a non-catalog item to bill for. Include a `product_id` to relate this non-catalog price to an existing catalog price.
*/
"price": TransactionPriceCreateWithProductId
}) {}

export class SubscriptionItemCreateWithPriceAndProduct extends S.Struct({
  /**
* Quantity to bill for.
*/
"quantity": S.Int.pipe(S.greaterThanOrEqualTo(1)),
  /**
* Price object for a non-catalog item to charge for. Include a `product` object to create a non-catalog product for this non-catalog price.
*/
"price": TransactionPriceCreateWithProduct
}) {}

/**
* How Paddle should handle proration calculation for changes made to a subscription or its items. Required when making
* changes that impact billing.
* 
* For automatically-collected subscriptions, responses may take longer than usual if a proration billing mode that
* collects for payment immediately is used.
*/
export class SubscriptionUpdateProrationBillingMode extends S.Literal("prorated_immediately", "prorated_next_billing_period", "full_immediately", "full_next_billing_period", "do_not_bill") {}

/**
* How Paddle should handle changes made to a subscription or its items if the payment fails during update. If omitted, defaults to `prevent_change`.
*/
export class SubscriptionOnPaymentFailure extends S.Literal("prevent_change", "apply_change") {}

/**
* Represents a subscription entity when updating subscriptions.
*/
export class SubscriptionUpdate extends S.Class<SubscriptionUpdate>("SubscriptionUpdate")({
  /**
* Paddle ID of the customer that this subscription is for, prefixed with `ctm_`. Include to change the customer for a subscription.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of the address that this subscription is for, prefixed with `add_`. Include to change the address for a subscription.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of the business that this subscription is for, prefixed with `biz_`. Include to change the business for a subscription.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code. Include to change the currency that a subscription bills in. When changing `collection_mode` to `manual`, you may need to change currency code to `USD`, `EUR`, or `GBP`.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription is next scheduled to be billed. Include to change the next billing date.
*/
"next_billed_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* Details of the discount applied to this subscription. Include to add a discount to a subscription. `null` to remove a discount.
*/
"discount": S.optionalWith(S.Struct({
  "id": DiscountId,
  /**
* When this discount should take effect from.
*/
"effective_from": EffectiveFrom
}), { nullable: true }),
  /**
* How payment is collected for transactions created for this subscription. `automatic` for checkout, `manual` for invoices.
*/
"collection_mode": S.optionalWith(CollectionMode, { nullable: true, default: () => "automatic" as const }),
  /**
* Details for invoicing. Required if `collection_mode` is `manual`. `null` if changing `collection_mode` to `automatic`.
*/
"billing_details": S.optionalWith(BillingDetailsUpdate, { nullable: true }),
  /**
* Change that's scheduled to be applied to a subscription. When updating, you may only set to `null` to remove a scheduled change. Use the pause subscription, cancel subscription, and resume subscription operations to create scheduled changes.
*/
"scheduled_change": S.optionalWith(S.Null, { nullable: true }),
  /**
* List of items on this subscription. Only recurring items may be added. Send the complete list of items that should be on this subscription, including existing items to retain.
*/
"items": S.optionalWith(S.Array(S.Union(/**
* Add or update a catalog item to a subscription. In this case, the product and price that you're billing for exist in your product catalog in Paddle.
*/
SubscriptionUpdateItem,
/**
* Add a non-catalog price for an existing product in your catalog to a subscription. In this case, the product you're billing for is a catalog product, but you charge a specific price for it.
*/
SubscriptionItemCreateWithPrice,
/**
* Add a non-catalog price for a non-catalog product in your catalog to a subscription. In this case, the product and price that you're billing for are specific to this subscription.
*/
SubscriptionItemCreateWithPriceAndProduct)).pipe(S.minItems(1), S.maxItems(100)), { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  "proration_billing_mode": S.optionalWith(SubscriptionUpdateProrationBillingMode, { nullable: true }),
  "on_payment_failure": S.optionalWith(SubscriptionOnPaymentFailure, { nullable: true, default: () => "prevent_change" as const })
}) {}

/**
* Represents a subscription entity.
*/
export class Subscription extends S.Struct({
  "id": S.optionalWith(SubscriptionId, { nullable: true }),
  "status": S.optionalWith(StatusSubscription, { nullable: true }),
  /**
* Paddle ID of the customer that this subscription is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of the address that this subscription is for, prefixed with `add_`.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of the business that this subscription is for, prefixed with `biz_`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code. Transactions for this subscription are created in this currency. Must be `USD`, `EUR`, or `GBP` if `collection_mode` is `manual`.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription started. This may be different from `first_billed_at` if the subscription started in trial.
*/
"started_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription was first billed. This may be different from `started_at` if the subscription started in trial.
*/
"first_billed_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription is next scheduled to be billed.
*/
"next_billed_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription was paused. Set automatically by Paddle when the pause subscription operation is used. `null` if not paused.
*/
"paused_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription was canceled. Set automatically by Paddle when the cancel subscription operation is used. `null` if not canceled.
*/
"canceled_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* Details of the discount applied to this subscription.
*/
"discount": S.optionalWith(DiscountSubscription, { nullable: true }),
  /**
* How payment is collected for transactions created for this subscription. `automatic` for checkout, `manual` for invoices.
*/
"collection_mode": S.optionalWith(CollectionMode, { nullable: true, default: () => "automatic" as const }),
  /**
* Details for invoicing. Required if `collection_mode` is `manual`.
*/
"billing_details": S.optionalWith(BillingDetails, { nullable: true }),
  /**
* Current billing period for this subscription. Set automatically by Paddle based on the billing cycle. `null` for `paused` and `canceled` subscriptions.
*/
"current_billing_period": S.optionalWith(TimePeriod, { nullable: true }),
  /**
* How often this subscription renews. Set automatically by Paddle based on the prices on this subscription.
*/
"billing_cycle": S.optionalWith(Duration, { nullable: true }),
  /**
* Change that's scheduled to be applied to a subscription. Use the pause subscription, cancel subscription, and resume subscription operations to create scheduled changes. `null` if no scheduled changes.
*/
"scheduled_change": S.optionalWith(SubscriptionScheduledChange, { nullable: true }),
  "management_urls": S.optionalWith(SubscriptionManagementUrls, { nullable: true }),
  /**
* List of items on this subscription. Only recurring items are returned.
*/
"items": S.optionalWith(S.Array(ItemSubscription).pipe(S.minItems(1), S.maxItems(100)), { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

export class UpdateSubscription200 extends S.Struct({
  "data": Subscription,
  "meta": Meta
}) {}

export class ListSubscriptionsParamsCollectionMode extends S.Literal("automatic", "manual") {}

export class ListSubscriptionsParams extends S.Struct({
  "address_id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "after": S.optionalWith(S.String, { nullable: true }),
  "collection_mode": S.optionalWith(ListSubscriptionsParamsCollectionMode, { nullable: true }),
  "customer_id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const }),
  "price_id": S.optionalWith(S.Array(S.String), { nullable: true }),
  "scheduled_change_action": S.optionalWith(S.Array(S.Literal("cancel", "pause", "resume")), { nullable: true }),
  "status": S.optionalWith(S.Array(S.Literal("active", "canceled", "past_due", "paused", "trialing")), { nullable: true })
}) {}

export class ListSubscriptions200 extends S.Struct({
  "data": S.Array(Subscription),
  "meta": MetaPaginated
}) {}

/**
* When this subscription change should take effect from. Defaults to `next_billing_period` for active subscriptions,
* which creates a `scheduled_change` to apply the subscription change at the end of the billing period.
*/
export class EffectiveFromNullable extends S.Literal("next_billing_period", "immediately", null) {}

export class CancelSubscriptionRequest extends S.Class<CancelSubscriptionRequest>("CancelSubscriptionRequest")({
  "effective_from": S.optionalWith(EffectiveFromNullable, { nullable: true })
}) {}

export class CancelSubscription200 extends S.Struct({
  "data": Subscription,
  "meta": Meta
}) {}

/**
* How Paddle should set the billing period for the subscription when resuming. If omitted, defaults to `start_new_billing_period`.
*/
export class SubscriptionOnResume extends S.Literal("continue_existing_billing_period", "start_new_billing_period") {}

export class PauseSubscriptionRequest extends S.Class<PauseSubscriptionRequest>("PauseSubscriptionRequest")({
  "effective_from": S.optionalWith(EffectiveFromNullable, { nullable: true }),
  /**
* RFC 3339 datetime string of when the paused subscription should resume. Omit to pause indefinitely until resumed.
*/
"resume_at": S.optionalWith(Timestamp, { nullable: true }),
  "on_resume": S.optionalWith(SubscriptionOnResume, { nullable: true, default: () => "start_new_billing_period" as const })
}) {}

export class PauseSubscription200 extends S.Struct({
  "data": Subscription,
  "meta": Meta
}) {}

export class ResumeSubscriptionRequest extends S.Union(S.Struct({
  /**
* When this scheduled change should take effect from. RFC 3339 datetime string of when the subscription should resume.
* 
* Valid where subscriptions are `active` with a scheduled change to pause, or where they have the status of `paused`.
*/
"effective_from": Timestamp,
  "on_resume": S.optionalWith(SubscriptionOnResume, { nullable: true, default: () => "start_new_billing_period" as const })
}),
S.Struct({
  /**
* When this subscription change should take effect from. You can pass `immediately` to resume immediately.
* 
* Valid where subscriptions have the status of `paused`.
* 
* Defaults to `immediately` if omitted.
*/
"effective_from": S.NullOr(S.Literal("immediately", null)).pipe(S.propertySignature, S.withConstructorDefault(() => "immediately" as const)),
  "on_resume": S.optionalWith(SubscriptionOnResume, { nullable: true, default: () => "start_new_billing_period" as const })
}),
S.Null,
S.Struct({
  
})) {}

export class ResumeSubscription200 extends S.Struct({
  "data": Subscription,
  "meta": Meta
}) {}

export class ActivateSubscription200 extends S.Struct({
  "data": Subscription,
  "meta": Meta
}) {}

/**
* Represents a transaction entity.
*/
export class GetSubscriptionUpdatePaymentMethodTransaction200Data extends S.Struct({
  /**
* Related customer for this transaction. Only returned if the API key has a Customers (Read) permission.
*/
"customer": S.optionalWith(Customer, { nullable: true }),
  /**
* Related address for this transaction. Only returned if the API key has an Addresses (Read) permission.
*/
"address": S.optionalWith(Address, { nullable: true }),
  /**
* Related business for this transaction. Only returned if a business exists for this transaction and the API key has a Businesses (Read) permission.
*/
"business": S.optionalWith(Business, { nullable: true }),
  /**
* Related discount for this transaction. Only returned if a discount exists for this transaction and the API key has a Discounts (Read) permission.
*/
"discount": S.optionalWith(Discount, { nullable: true }),
  /**
* Related adjustments for this transaction. Only returned if adjustments exist for this transaction and the API key has an Adjustments (Read) permission.
*/
"adjustments": S.optionalWith(S.Array(Adjustment), { nullable: true }),
  /**
* Object containing totals for all adjustments on this transaction. Only returned if the API key has an Adjustments (Read) permission.
*/
"adjustments_totals": S.optionalWith(TransactionAdjustmentsTotalsInclude, { nullable: true }),
  /**
* List of payment methods available for this transaction.
*/
"available_payment_methods": S.optionalWith(S.Array(PaymentMethodType), { nullable: true }),
  "id": S.optionalWith(TransactionId, { nullable: true }),
  "status": S.optionalWith(StatusTransaction, { nullable: true }),
  /**
* Paddle ID of the customer that this transaction is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of the address that this transaction is for, prefixed with `add_`.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of the business that this transaction is for, prefixed with `biz_`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code. Must be `USD`, `EUR`, or `GBP` if `collection_mode` is `manual`.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  "origin": S.optionalWith(OriginTransaction, { nullable: true }),
  /**
* Paddle ID of the subscription that this transaction is for, prefixed with `sub_`.
*/
"subscription_id": S.optionalWith(SubscriptionId, { nullable: true }),
  /**
* Paddle ID of the invoice that this transaction is related to, prefixed with `inv_`. Used for compatibility with the Paddle Invoice API, which is now deprecated. This field is scheduled to be removed in the next version of the Paddle API.
*/
"invoice_id": S.optionalWith(S.String.pipe(S.pattern(new RegExp("^inv_[a-z\\d]{26}$"))), { nullable: true }),
  /**
* Invoice number for this transaction. Automatically generated by Paddle when you mark a transaction as `billed` where `collection_mode` is `manual`.
*/
"invoice_number": S.optionalWith(DocumentNumber, { nullable: true }),
  /**
* How payment is collected for this transaction. `automatic` for checkout, `manual` for invoices.
*/
"collection_mode": S.optionalWith(CollectionMode, { nullable: true, default: () => "automatic" as const }),
  /**
* Paddle ID of the discount applied to this transaction, prefixed with `dsc_`.
*/
"discount_id": S.optionalWith(DiscountId, { nullable: true }),
  /**
* Details for invoicing. Required if `collection_mode` is `manual`.
*/
"billing_details": S.optionalWith(BillingDetails, { nullable: true }),
  /**
* Time period that this transaction is for. Set automatically by Paddle for subscription renewals to describe the period that charges are for.
*/
"billing_period": S.optionalWith(TimePeriod, { nullable: true }),
  /**
* List of items on this transaction. For calculated totals, use `details.line_items`.
*/
"items": S.optionalWith(S.Array(TransactionItem).pipe(S.minItems(1), S.maxItems(100)), { nullable: true }),
  "details": S.optionalWith(TransactionDetails, { nullable: true }),
  /**
* List of payment attempts for this transaction, including successful payments. Sorted by `created_at` in descending order, so most recent attempts are returned first.
*/
"payments": S.optionalWith(S.Array(TransactionPaymentAttempt), { nullable: true }),
  /**
* Paddle Checkout details for this transaction. Returned for automatically-collected transactions and where `billing_details.enable_checkout` is `true` for manually-collected transactions; `null` otherwise.
*/
"checkout": S.optionalWith(S.Struct({
  /**
* Paddle Checkout URL for this transaction, composed of the URL passed in the request or your default payment URL + `?_ptxn=` and the Paddle ID for this transaction.
*/
"url": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(2048)), { nullable: true })
}), { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this transaction was marked as `billed`. `null` for transactions that aren't `billed` or `completed`. Set automatically by Paddle.
*/
"billed_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when a transaction was revised. Revisions describe an update to customer information for a billed or completed transaction. `null` if not revised. Set automatically by Paddle.
*/
"revised_at": S.optionalWith(Timestamp, { nullable: true })
}) {}

export class GetSubscriptionUpdatePaymentMethodTransaction200 extends S.Struct({
  "data": GetSubscriptionUpdatePaymentMethodTransaction200Data,
  "meta": Meta
}) {}

/**
* Whether the subscription change results in a prorated credit or a charge.
*/
export class UpdateSummaryResultAction extends S.Literal("credit", "charge") {}

/**
* Impact of this subscription change. Includes whether the change results in a charge or credit, and totals for prorated amounts.
*/
export class UpdateSummary extends S.Struct({
  /**
* Details of any credit adjustments created for this update. Paddle creates adjustments against existing transactions when prorating.
*/
"credit": S.optionalWith(Money, { nullable: true }),
  /**
* Details of the transaction to be created for this update. Paddle creates a transaction to bill for new charges.
*/
"charge": S.optionalWith(Money, { nullable: true }),
  /**
* Details of the result of credits and charges. Where the total of any credit adjustments is greater than the total charge, the result is a prorated credit; otherwise, the result is a prorated charge.
*/
"result": S.optionalWith(S.Struct({
  /**
* Whether the subscription change results in a prorated credit or a charge.
*/
"action": S.optionalWith(UpdateSummaryResultAction, { nullable: true }),
  /**
* Amount representing the result of this update, either a charge or a credit.
*/
"amount": S.optionalWith(S.String, { nullable: true }),
  /**
* Three-letter ISO 4217 currency code for the transaction or adjustment.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true })
}), { nullable: true })
}) {}

/**
* Represents a subscription preview when previewing a subscription.
*/
export class SubscriptionPreview extends S.Struct({
  "status": S.optionalWith(StatusSubscription, { nullable: true }),
  /**
* Paddle ID of the customer that this subscription is for, prefixed with `ctm_`.
*/
"customer_id": S.optionalWith(CustomerId, { nullable: true }),
  /**
* Paddle ID of the address that this subscription is for, prefixed with `add_`.
*/
"address_id": S.optionalWith(AddressId, { nullable: true }),
  /**
* Paddle ID of the business that this subscription is for, prefixed with `biz_`.
*/
"business_id": S.optionalWith(BusinessId, { nullable: true }),
  /**
* Supported three-letter ISO 4217 currency code. Transactions for this subscription are created in this currency. Must be `USD`, `EUR`, or `GBP` if `collection_mode` is `manual`.
*/
"currency_code": S.optionalWith(CurrencyCode, { nullable: true }),
  "created_at": S.optionalWith(CreatedAt, { nullable: true }),
  "updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription started. This may be different from `first_billed_at` if the subscription started in trial.
*/
"started_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription was first billed. This may be different from `started_at` if the subscription started in trial.
*/
"first_billed_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription is next scheduled to be billed.
*/
"next_billed_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription was paused. Set automatically by Paddle when the pause subscription operation is used. `null` if not paused.
*/
"paused_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this subscription was canceled. Set automatically by Paddle when the cancel subscription operation is used. `null` if not canceled.
*/
"canceled_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* Details of the discount applied to this subscription.
*/
"discount": S.optionalWith(DiscountSubscription, { nullable: true }),
  /**
* How payment is collected for transactions created for this subscription. `automatic` for checkout, `manual` for invoices.
*/
"collection_mode": S.optionalWith(CollectionMode, { nullable: true, default: () => "automatic" as const }),
  /**
* Details for invoicing. Required if `collection_mode` is `manual`.
*/
"billing_details": S.optionalWith(BillingDetails, { nullable: true }),
  /**
* Current billing period for this subscription. Set automatically by Paddle based on the billing cycle. `null` for `paused` and `canceled` subscriptions.
*/
"current_billing_period": S.optionalWith(TimePeriod, { nullable: true }),
  /**
* How often this subscription renews. Set automatically by Paddle based on the prices on this subscription.
*/
"billing_cycle": S.optionalWith(Duration, { nullable: true }),
  /**
* Change that's scheduled to be applied to a subscription. Use the pause subscription, cancel subscription, and resume subscription operations to create scheduled changes. `null` if no scheduled changes.
*/
"scheduled_change": S.optionalWith(SubscriptionScheduledChange, { nullable: true }),
  "management_urls": S.optionalWith(SubscriptionManagementUrls, { nullable: true }),
  /**
* List of items on this subscription. Only recurring items are returned.
*/
"items": S.optionalWith(S.Array(ItemSubscription).pipe(S.minItems(1), S.maxItems(100)), { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Preview of the immediate transaction created as a result of changes to the subscription. Returns a complete object where `proration_billing_mode` is `prorated_immediately` or `full_immediately`; `null` otherwise.
*/
"immediate_transaction": S.optionalWith(SubscriptionNextTransaction, { nullable: true }),
  /**
* Preview of the next transaction for this subscription. Includes charges created where `proration_billing_mode` is `prorated_next_billing_period` or `full_next_billing_period`, as well as one-time charges. `null` if the subscription is scheduled to cancel or pause.
*/
"next_transaction": S.optionalWith(SubscriptionNextTransaction, { nullable: true }),
  /**
* Preview of the recurring transaction for this subscription. This is what the customer can expect to be billed when there are no prorated or one-time charges.
*/
"recurring_transaction_details": S.optionalWith(SubscriptionRecurringTransactionDetails, { nullable: true }),
  "update_summary": S.optionalWith(UpdateSummary, { nullable: true }),
  /**
* Import information for this entity. `null` if this entity is not imported.
*/
"import_meta": S.optionalWith(ImportMeta, { nullable: true })
}) {}

export class PreviewSubscriptionUpdate200 extends S.Struct({
  "data": SubscriptionPreview,
  "meta": Meta
}) {}

export class SubscriptionChargeCreateWithPrice extends S.Struct({
  /**
* Quantity to bill for.
*/
"quantity": S.Int.pipe(S.greaterThanOrEqualTo(1)),
  /**
* Price object for a non-catalog item to bill for. Include a `product_id` to relate this non-catalog price to an existing catalog price.
*/
"price": S.Struct({
  /**
* Paddle ID for the product that this price is for, prefixed with `pro_`.
*/
"product_id": ProductId,
  /**
* Internal description for this price, not shown to customers. Typically notes for your team.
*/
"description": S.String.pipe(S.minLength(2), S.maxLength(200)),
  /**
* Name of this price, shown to customers at checkout and on invoices. Typically describes how often the related product bills.
*/
"name": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(50)), { nullable: true }),
  "tax_mode": S.optionalWith(TaxMode, { nullable: true, default: () => "account_setting" as const }),
  /**
* Base price. This price applies to all customers, except for customers located in countries where you have `unit_price_overrides`.
*/
"unit_price": Money,
  /**
* List of unit price overrides. Use to override the base price with a custom price and currency for a country or group of countries.
*/
"unit_price_overrides": S.optionalWith(S.Array(UnitPriceOverride), { nullable: true }),
  /**
* Limits on how many times the related product can be purchased at this price. Useful for discount campaigns. If omitted, defaults to 1-100.
*/
"quantity": S.optionalWith(PriceQuantity, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true })
})
}) {}

export class SubscriptionChargeCreateWithPriceAndProduct extends S.Struct({
  /**
* Quantity to bill for.
*/
"quantity": S.Int.pipe(S.greaterThanOrEqualTo(1)),
  /**
* Price object for a non-catalog item to charge for. Include a `product` object to create a non-catalog product for this non-catalog price.
*/
"price": S.Struct({
  /**
* Internal description for this price, not shown to customers. Typically notes for your team.
*/
"description": S.String.pipe(S.minLength(2), S.maxLength(200)),
  /**
* Name of this price, shown to customers at checkout and on invoices. Typically describes how often the related product bills.
*/
"name": S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(50)), { nullable: true }),
  "tax_mode": S.optionalWith(TaxMode, { nullable: true, default: () => "account_setting" as const }),
  /**
* Base price. This price applies to all customers, except for customers located in countries where you have `unit_price_overrides`.
*/
"unit_price": Money,
  /**
* List of unit price overrides. Use to override the base price with a custom price and currency for a country or group of countries.
*/
"unit_price_overrides": S.optionalWith(S.Array(UnitPriceOverride), { nullable: true }),
  /**
* Limits on how many times the related product can be purchased at this price. Useful for discount campaigns. If omitted, defaults to 1-100.
*/
"quantity": S.optionalWith(PriceQuantity, { nullable: true }),
  /**
* Your own structured key-value data.
*/
"custom_data": S.optionalWith(CustomData, { nullable: true }),
  /**
* Product object for a non-catalog item to charge for.
*/
"product": TransactionSubscriptionProductCreate
})
}) {}

/**
* Represents a one-time charge for a subscription.
*/
export class SubscriptionCharge extends S.Class<SubscriptionCharge>("SubscriptionCharge")({
  /**
* When one-time charges should be billed.
*/
"effective_from": EffectiveFrom,
  /**
* List of one-time charges to bill for. Only prices where the `billing_cycle` is `null` may be added.
* 
* You can charge for items that you've added to your catalog by passing the Paddle ID of an existing price entity, or you can charge for non-catalog items by passing a price object.
* 
* Non-catalog items can be for existing products, or you can pass a product object as part of your price to charge for a non-catalog product.
*/
"items": S.Array(S.Union(/**
* Add a catalog item to a subscription. In this case, the product and price that you're billing for exist in your product catalog in Paddle.
*/
SubscriptionItemCreateWithPriceId,
/**
* Add a non-catalog price for an existing product in your catalog to a subscription. In this case, the product you're billing for is a catalog product, but you charge a specific price for it.
*/
SubscriptionChargeCreateWithPrice,
/**
* Add a non-catalog price for a non-catalog product in your catalog to a subscription. In this case, the product and price that you're billing for are specific to this transaction.
*/
SubscriptionChargeCreateWithPriceAndProduct)).pipe(S.minItems(1), S.maxItems(100)),
  "on_payment_failure": S.optionalWith(SubscriptionOnPaymentFailure, { nullable: true, default: () => "prevent_change" as const })
}) {}

export class CreateSubscriptionCharge201 extends S.Struct({
  "data": Subscription,
  "meta": Meta
}) {}

export class PreviewSubscriptionCharge200 extends S.Struct({
  "data": SubscriptionPreview,
  "meta": Meta
}) {}

export class ListReportsParams extends S.Struct({
  "after": S.optionalWith(S.String, { nullable: true }),
  "order_by": S.optionalWith(S.String, { nullable: true, default: () => "id[DESC]" as const }),
  "per_page": S.optionalWith(S.Int.pipe(S.lessThanOrEqualTo(200)), { nullable: true, default: () => 50 as const }),
  "status": S.optionalWith(S.Array(S.Literal("pending", "ready", "failed", "expired")), { nullable: true })
}) {}

/**
* Type of report.
*/
export class ReportTypeAdjustments extends S.Literal("adjustments", "adjustment_line_items") {}

/**
* Operator to use when filtering.
*/
export class Operator extends S.Literal("lt", "gte", null) {}

/**
* List of filters applied to this report.
*/
export class ReportFilterAdjustments extends S.Array(S.Struct({
  /**
* Field name to filter by.
*/
"name": S.optionalWith(S.Literal("action", "currency_code", "status", "updated_at"), { nullable: true }),
  /**
* Operator to use when filtering. Valid when filtering by `updated_at`, `null` otherwise.
*/
"operator": S.optionalWith(Operator, { nullable: true })
})).pipe(S.maxItems(10)) {}

/**
* Unique Paddle ID for this entity.
*/
export class PaddleId extends S.String.pipe(S.pattern(new RegExp("^[a-z]{3,10}_[a-z\\d]{26}$"))) {}

/**
* Status of this report. Set automatically by Paddle.
* 
* Reports are created as `pending` initially, then move to `ready` when they're available to download.
*/
export class StatusReport extends S.Literal("pending", "ready", "failed", "expired") {}

/**
* Represents a report entity.
*/
export class ReportAdjustments extends S.Struct({
  /**
* Type of report to create.
*/
"type": ReportTypeAdjustments,
  /**
* Filter criteria for this report. If omitted, reports are filtered to include data updated in the last 30 days. This means `updated_at` is greater than or equal to (`gte`) the date 30 days ago from the time the report was generated.
*/
"filters": S.optionalWith(ReportFilterAdjustments, { nullable: true }),
  /**
* Unique Paddle ID for this report, prefixed with `rep_`
*/
"id": S.optionalWith(PaddleId, { nullable: true }),
  "status": S.optionalWith(StatusReport, { nullable: true }),
  /**
* Number of records in this report. `null` if the report is `pending`.
*/
"rows": S.optionalWith(S.Int, { nullable: true }),
  /**
* RFC 3339 datetime string of when this report expires. The report is no longer available to download after this date.
*/
"expires_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this report was last updated.
*/
"updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this report was created.
*/
"created_at": S.optionalWith(CreatedAt, { nullable: true })
}) {}

/**
* Type of report.
*/
export class ReportTypeTransactions extends S.Literal("transactions", "transaction_line_items") {}

/**
* List of filters applied to this report.
*/
export class ReportFilterTransactions extends S.Array(S.Struct({
  /**
* Field name to filter by.
*/
"name": S.optionalWith(S.Literal("collection_mode", "currency_code", "origin", "status", "updated_at"), { nullable: true }),
  /**
* Operator to use when filtering. Valid when filtering by `updated_at`, `null` otherwise.
*/
"operator": S.optionalWith(Operator, { nullable: true })
})).pipe(S.maxItems(10)) {}

/**
* Represents a report entity.
*/
export class ReportTransactions extends S.Struct({
  /**
* Type of report to create.
*/
"type": ReportTypeTransactions,
  /**
* Filter criteria for this report. If omitted, reports are filtered to include data updated in the last 30 days. This means `updated_at` is greater than or equal to (`gte`) the date 30 days ago from the time the report was generated.
*/
"filters": S.optionalWith(ReportFilterTransactions, { nullable: true }),
  /**
* Unique Paddle ID for this report, prefixed with `rep_`
*/
"id": S.optionalWith(PaddleId, { nullable: true }),
  "status": S.optionalWith(StatusReport, { nullable: true }),
  /**
* Number of records in this report. `null` if the report is `pending`.
*/
"rows": S.optionalWith(S.Int, { nullable: true }),
  /**
* RFC 3339 datetime string of when this report expires. The report is no longer available to download after this date.
*/
"expires_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this report was last updated.
*/
"updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this report was created.
*/
"created_at": S.optionalWith(CreatedAt, { nullable: true })
}) {}

/**
* Type of report to create.
*/
export class ReportProductsPricesType extends S.Literal("products_prices") {}

/**
* List of filters applied to this report.
*/
export class ReportFilterProductsPrices extends S.Array(S.Struct({
  /**
* Field name to filter by.
*/
"name": S.optionalWith(S.Literal("product_status", "price_status", "product_type", "price_type", "product_updated_at", "price_updated_at"), { nullable: true }),
  /**
* Operator to use when filtering. Valid when filtering by `updated_at`, `null` otherwise.
*/
"operator": S.optionalWith(Operator, { nullable: true })
})).pipe(S.maxItems(10)) {}

/**
* Represents a report entity.
*/
export class ReportProductsPrices extends S.Struct({
  /**
* Type of report to create.
*/
"type": ReportProductsPricesType,
  /**
* Filter criteria for this report. If omitted, reports are filtered to include data updated in the last 30 days. This means `product_updated_at` and `price_updated_at` are greater than or equal to (`gte`) the date 30 days ago from the time the report was generated.
*/
"filters": S.optionalWith(ReportFilterProductsPrices, { nullable: true }),
  /**
* Unique Paddle ID for this report, prefixed with `rep_`
*/
"id": S.optionalWith(PaddleId, { nullable: true }),
  "status": S.optionalWith(StatusReport, { nullable: true }),
  /**
* Number of records in this report. `null` if the report is `pending`.
*/
"rows": S.optionalWith(S.Int, { nullable: true }),
  /**
* RFC 3339 datetime string of when this report expires. The report is no longer available to download after this date.
*/
"expires_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this report was last updated.
*/
"updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this report was created.
*/
"created_at": S.optionalWith(CreatedAt, { nullable: true })
}) {}

/**
* Type of report to create.
*/
export class ReportDiscountsType extends S.Literal("discounts") {}

/**
* List of filters applied to this report.
*/
export class ReportFilterDiscounts extends S.Array(S.Struct({
  /**
* Field name to filter by.
*/
"name": S.optionalWith(S.Literal("type", "status", "updated_at"), { nullable: true }),
  /**
* Operator to use when filtering. Valid when filtering by `updated_at`, `null` otherwise.
*/
"operator": S.optionalWith(Operator, { nullable: true })
})).pipe(S.maxItems(10)) {}

/**
* Represents a report entity.
*/
export class ReportDiscounts extends S.Struct({
  /**
* Type of report to create.
*/
"type": ReportDiscountsType,
  /**
* Filter criteria for this report. If omitted, reports are filtered to include data updated in the last 30 days. This means `updated_at` is greater than or equal to (`gte`) the date 30 days ago from the time the report was generated.
*/
"filters": S.optionalWith(ReportFilterDiscounts, { nullable: true }),
  /**
* Unique Paddle ID for this report, prefixed with `rep_`
*/
"id": S.optionalWith(PaddleId, { nullable: true }),
  "status": S.optionalWith(StatusReport, { nullable: true }),
  /**
* Number of records in this report. `null` if the report is `pending`.
*/
"rows": S.optionalWith(S.Int, { nullable: true }),
  /**
* RFC 3339 datetime string of when this report expires. The report is no longer available to download after this date.
*/
"expires_at": S.optionalWith(Timestamp, { nullable: true }),
  /**
* RFC 3339 datetime string of when this report was last updated.
*/
"updated_at": S.optionalWith(UpdatedAt, { nullable: true }),
  /**
* RFC 3339 datetime string of when this report was created.
*/
"created_at": S.optionalWith(CreatedAt, { nullable: true })
}) {}

/**
* Represents a report entity.
*/
export class Report extends S.Union(/**
* Entity when working with reports for adjustments or adjustment line items.
*/
ReportAdjustments,
/**
* Entity when working with reports for transaction or transaction line items.
*/
ReportTransactions,
/**
* Entity when working with a products and prices report.
*/
ReportProductsPrices,
/**
* Entity when working with a discounts report.
*/
ReportDiscounts) {}

export class ListReports200 extends S.Struct({
  "data": S.optionalWith(S.Array(Report), { nullable: true }),
  "meta": S.optionalWith(MetaPaginated, { nullable: true })
}) {}

export class CreateReport201 extends S.Struct({
  "data": Report,
  "meta": Meta
}) {}

export class GetReportCsv200 extends S.Struct({
  "data": S.Struct({
  /**
* URL of the requested resource.
*/
"url": S.optionalWith(S.String, { nullable: true })
}),
  "meta": Meta
}) {}

export class GetReport200 extends S.Struct({
  "data": Report,
  "meta": Meta
}) {}

export const make = (
  httpClient: HttpClient.HttpClient, 
  options: {
    readonly transformClient?: ((client: HttpClient.HttpClient) => Effect.Effect<HttpClient.HttpClient>) | undefined
  } = {}
): Client => {
  const unexpectedStatus = (response: HttpClientResponse.HttpClientResponse) =>
    Effect.flatMap(
      Effect.orElseSucceed(response.json, () => "Unexpected status code"),
      (description) =>
        Effect.fail(
          new HttpClientError.ResponseError({
            request: response.request,
            response,
            reason: "StatusCode",
            description: typeof description === "string" ? description : JSON.stringify(description),
          }),
        ),
    )
  const withResponse: <A, E>(
    f: (response: HttpClientResponse.HttpClientResponse) => Effect.Effect<A, E>,
  ) => (
    request: HttpClientRequest.HttpClientRequest,
  ) => Effect.Effect<any, any> = options.transformClient
    ? (f) => (request) =>
        Effect.flatMap(
          Effect.flatMap(options.transformClient!(httpClient), (client) =>
            client.execute(request),
          ),
          f,
        )
    : (f) => (request) => Effect.flatMap(httpClient.execute(request), f)
  const decodeSuccess =
    <A, I, R>(schema: S.Schema<A, I, R>) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      HttpClientResponse.schemaBodyJson(schema)(response)
  const decodeError =
    <const Tag extends string, A, I, R>(tag: Tag, schema: S.Schema<A, I, R>) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      Effect.flatMap(
        HttpClientResponse.schemaBodyJson(schema)(response),
        (cause) => Effect.fail(ClientError(tag, cause, response)),
      )
  return {
    httpClient,
    "listProducts": (options) => HttpClientRequest.get(`/products`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "id": options?.["id"] as any, "include": options?.["include"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any, "status": options?.["status"] as any, "tax_category": options?.["tax_category"] as any, "type": options?.["type"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListProducts200),
      orElse: unexpectedStatus
    }))
  ),
  "createProduct": (options) => HttpClientRequest.post(`/products`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateProduct201),
      orElse: unexpectedStatus
    }))
  ),
  "getProduct": (productId, options) => HttpClientRequest.get(`/products/${productId}`).pipe(
    HttpClientRequest.setUrlParams({ "include": options?.["include"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetProduct200),
      orElse: unexpectedStatus
    }))
  ),
  "updateProduct": (productId, options) => HttpClientRequest.patch(`/products/${productId}`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdateProduct200),
      orElse: unexpectedStatus
    }))
  ),
  "listPrices": (options) => HttpClientRequest.get(`/prices`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "id": options?.["id"] as any, "include": options?.["include"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any, "product_id": options?.["product_id"] as any, "status": options?.["status"] as any, "recurring": options?.["recurring"] as any, "type": options?.["type"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListPrices200),
      orElse: unexpectedStatus
    }))
  ),
  "createPrice": (options) => HttpClientRequest.post(`/prices`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreatePrice201),
      orElse: unexpectedStatus
    }))
  ),
  "getPrice": (priceId, options) => HttpClientRequest.get(`/prices/${priceId}`).pipe(
    HttpClientRequest.setUrlParams({ "include": options?.["include"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPrice200),
      orElse: unexpectedStatus
    }))
  ),
  "updatePrice": (priceId, options) => HttpClientRequest.patch(`/prices/${priceId}`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdatePrice200),
      orElse: unexpectedStatus
    }))
  ),
  "listTransactions": (options) => HttpClientRequest.get(`/transactions`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "billed_at": options?.["billed_at"] as any, "collection_mode": options?.["collection_mode"] as any, "created_at": options?.["created_at"] as any, "customer_id": options?.["customer_id"] as any, "id": options?.["id"] as any, "include": options?.["include"] as any, "invoice_number": options?.["invoice_number"] as any, "origin": options?.["origin"] as any, "order_by": options?.["order_by"] as any, "status": options?.["status"] as any, "subscription_id": options?.["subscription_id"] as any, "per_page": options?.["per_page"] as any, "updated_at": options?.["updated_at"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListTransactions200),
      orElse: unexpectedStatus
    }))
  ),
  "createTransaction": (options) => HttpClientRequest.post(`/transactions`).pipe(
    HttpClientRequest.setUrlParams({ "include": options.params?.["include"] as any }),
    HttpClientRequest.bodyUnsafeJson(options.payload),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateTransaction201),
      orElse: unexpectedStatus
    }))
  ),
  "previewPrices": (options) => HttpClientRequest.post(`/pricing-preview`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(PreviewPrices200),
      orElse: unexpectedStatus
    }))
  ),
  "previewTransactionCreate": (options) => HttpClientRequest.post(`/transactions/preview`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(PreviewTransactionCreate200),
      orElse: unexpectedStatus
    }))
  ),
  "getTransaction": (transactionId, options) => HttpClientRequest.get(`/transactions/${transactionId}`).pipe(
    HttpClientRequest.setUrlParams({ "include": options?.["include"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetTransaction200),
      orElse: unexpectedStatus
    }))
  ),
  "updateTransaction": (transactionId, options) => HttpClientRequest.patch(`/transactions/${transactionId}`).pipe(
    HttpClientRequest.setUrlParams({ "include": options.params?.["include"] as any }),
    HttpClientRequest.bodyUnsafeJson(options.payload),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdateTransaction200),
      orElse: unexpectedStatus
    }))
  ),
  "reviseTransaction": (transactionId, options) => HttpClientRequest.post(`/transactions/${transactionId}/revise`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ReviseTransaction200),
      orElse: unexpectedStatus
    }))
  ),
  "listAdjustments": (options) => HttpClientRequest.get(`/adjustments`).pipe(
    HttpClientRequest.setUrlParams({ "action": options?.["action"] as any, "after": options?.["after"] as any, "customer_id": options?.["customer_id"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any, "status": options?.["status"] as any, "subscription_id": options?.["subscription_id"] as any, "transaction_id": options?.["transaction_id"] as any, "id": options?.["id"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListAdjustments200),
      orElse: unexpectedStatus
    }))
  ),
  "createAdjustment": (options) => HttpClientRequest.post(`/adjustments`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateAdjustment201),
      orElse: unexpectedStatus
    }))
  ),
  "getAdjustmentCreditNote": (adjustmentId, options) => HttpClientRequest.get(`/adjustments/${adjustmentId}/credit-note`).pipe(
    HttpClientRequest.setUrlParams({ "disposition": options?.["disposition"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAdjustmentCreditNote200),
      orElse: unexpectedStatus
    }))
  ),
  "listCreditBalances": (customerId, options) => HttpClientRequest.get(`/customers/${customerId}/credit-balances`).pipe(
    HttpClientRequest.setUrlParams({ "currency_code": options?.["currency_code"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListCreditBalances200),
      orElse: unexpectedStatus
    }))
  ),
  "listCustomers": (options) => HttpClientRequest.get(`/customers`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "email": options?.["email"] as any, "id": options?.["id"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any, "search": options?.["search"] as any, "status": options?.["status"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListCustomers200),
      orElse: unexpectedStatus
    }))
  ),
  "createCustomer": (options) => HttpClientRequest.post(`/customers`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateCustomer201),
      orElse: unexpectedStatus
    }))
  ),
  "getCustomer": (customerId) => HttpClientRequest.get(`/customers/${customerId}`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetCustomer200),
      orElse: unexpectedStatus
    }))
  ),
  "updateCustomer": (customerId, options) => HttpClientRequest.patch(`/customers/${customerId}`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdateCustomer200),
      orElse: unexpectedStatus
    }))
  ),
  "listAddresses": (customerId, options) => HttpClientRequest.get(`/customers/${customerId}/addresses`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "id": options?.["id"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any, "search": options?.["search"] as any, "status": options?.["status"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListAddresses200),
      orElse: unexpectedStatus
    }))
  ),
  "createAddress": (customerId, options) => HttpClientRequest.post(`/customers/${customerId}/addresses`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateAddress201),
      orElse: unexpectedStatus
    }))
  ),
  "getAddress": (customerId, addressId) => HttpClientRequest.get(`/customers/${customerId}/addresses/${addressId}`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAddress200),
      orElse: unexpectedStatus
    }))
  ),
  "updateAddress": (customerId, addressId, options) => HttpClientRequest.patch(`/customers/${customerId}/addresses/${addressId}`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdateAddress200),
      orElse: unexpectedStatus
    }))
  ),
  "generateCustomerAuthenticationToken": (customerId) => HttpClientRequest.post(`/customers/${customerId}/auth-token`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GenerateCustomerAuthenticationToken200),
      orElse: unexpectedStatus
    }))
  ),
  "listBusinesses": (customerId, options) => HttpClientRequest.get(`/customers/${customerId}/businesses`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "id": options?.["id"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any, "search": options?.["search"] as any, "status": options?.["status"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListBusinesses200),
      orElse: unexpectedStatus
    }))
  ),
  "createBusiness": (customerId, options) => HttpClientRequest.post(`/customers/${customerId}/businesses`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateBusiness201),
      orElse: unexpectedStatus
    }))
  ),
  "getBusiness": (customerId, businessId) => HttpClientRequest.get(`/customers/${customerId}/businesses/${businessId}`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetBusiness200),
      orElse: unexpectedStatus
    }))
  ),
  "updateBusiness": (customerId, businessId, options) => HttpClientRequest.patch(`/customers/${customerId}/businesses/${businessId}`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdateBusiness200),
      orElse: unexpectedStatus
    }))
  ),
  "listCustomerPaymentMethods": (customerId, options) => HttpClientRequest.get(`/customers/${customerId}/payment-methods`).pipe(
    HttpClientRequest.setUrlParams({ "address_id": options?.["address_id"] as any, "after": options?.["after"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any, "supports_checkout": options?.["supports_checkout"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListCustomerPaymentMethods200),
      orElse: unexpectedStatus
    }))
  ),
  "getCustomerPaymentMethod": (customerId, paymentMethodId) => HttpClientRequest.get(`/customers/${customerId}/payment-methods/${paymentMethodId}`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetCustomerPaymentMethod200),
      orElse: unexpectedStatus
    }))
  ),
  "deleteCustomerPaymentMethod": (customerId, paymentMethodId) => HttpClientRequest.del(`/customers/${customerId}/payment-methods/${paymentMethodId}`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      orElse: unexpectedStatus
    }))
  ),
  "createCustomerPortalSession": (customerId, options) => HttpClientRequest.post(`/customers/${customerId}/portal-sessions`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateCustomerPortalSession201),
      orElse: unexpectedStatus
    }))
  ),
  "listNotificationSettings": (options) => HttpClientRequest.get(`/notification-settings`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "per_page": options?.["per_page"] as any, "order_by": options?.["order_by"] as any, "active": options?.["active"] as any, "traffic_source": options?.["traffic_source"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListNotificationSettings200),
      orElse: unexpectedStatus
    }))
  ),
  "createNotificationSetting": (options) => HttpClientRequest.post(`/notification-settings`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateNotificationSetting201),
      orElse: unexpectedStatus
    }))
  ),
  "getNotificationSetting": (notificationSettingId) => HttpClientRequest.get(`/notification-settings/${notificationSettingId}`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetNotificationSetting200),
      orElse: unexpectedStatus
    }))
  ),
  "deleteNotificationSetting": (notificationSettingId) => HttpClientRequest.del(`/notification-settings/${notificationSettingId}`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      orElse: unexpectedStatus
    }))
  ),
  "updateNotificationSetting": (notificationSettingId, options) => HttpClientRequest.patch(`/notification-settings/${notificationSettingId}`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdateNotificationSetting200),
      orElse: unexpectedStatus
    }))
  ),
  "listEventTypes": () => HttpClientRequest.get(`/event-types`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListEventTypes200),
      orElse: unexpectedStatus
    }))
  ),
  "listEvents": (options) => HttpClientRequest.get(`/events`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListEvents200),
      orElse: unexpectedStatus
    }))
  ),
  "listNotifications": (options) => HttpClientRequest.get(`/notifications`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "notification_setting_id": options?.["notification_setting_id"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any, "search": options?.["search"] as any, "status": options?.["status"] as any, "filter": options?.["filter"] as any, "to": options?.["to"] as any, "from": options?.["from"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListNotifications200),
      orElse: unexpectedStatus
    }))
  ),
  "getNotification": (notificationId) => HttpClientRequest.get(`/notifications/${notificationId}`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetNotification200),
      orElse: unexpectedStatus
    }))
  ),
  "listNotificationLogs": (notificationId, options) => HttpClientRequest.get(`/notifications/${notificationId}/logs`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "per_page": options?.["per_page"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListNotificationLogs200),
      orElse: unexpectedStatus
    }))
  ),
  "replayNotification": (notificationId) => HttpClientRequest.post(`/notifications/${notificationId}/replay`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ReplayNotification202),
      orElse: unexpectedStatus
    }))
  ),
  "listSimulationTypes": () => HttpClientRequest.get(`/simulation-types`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListSimulationTypes200),
      orElse: unexpectedStatus
    }))
  ),
  "listSimulations": (options) => HttpClientRequest.get(`/simulations`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "notification_setting_id": options?.["notification_setting_id"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any, "id": options?.["id"] as any, "status": options?.["status"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListSimulations200),
      orElse: unexpectedStatus
    }))
  ),
  "createSimulation": (options) => HttpClientRequest.post(`/simulations`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateSimulation201),
      orElse: unexpectedStatus
    }))
  ),
  "getSimulation": (simulationId) => HttpClientRequest.get(`/simulations/${simulationId}`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSimulation200),
      orElse: unexpectedStatus
    }))
  ),
  "updateSimulation": (simulationId, options) => HttpClientRequest.patch(`/simulations/${simulationId}`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdateSimulation200),
      orElse: unexpectedStatus
    }))
  ),
  "listSimulationRuns": (simulationId, options) => HttpClientRequest.get(`/simulations/${simulationId}/runs`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "include": options?.["include"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any, "id": options?.["id"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListSimulationRuns200),
      orElse: unexpectedStatus
    }))
  ),
  "createSimulationRun": (simulationId) => HttpClientRequest.post(`/simulations/${simulationId}/runs`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateSimulationRun201),
      orElse: unexpectedStatus
    }))
  ),
  "getSimulationRun": (simulationId, simulationRunId, options) => HttpClientRequest.get(`/simulations/${simulationId}/runs/${simulationRunId}`).pipe(
    HttpClientRequest.setUrlParams({ "include": options?.["include"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSimulationRun200),
      orElse: unexpectedStatus
    }))
  ),
  "listSimulationsEvents": (simulationId, simulationRunId, options) => HttpClientRequest.get(`/simulations/${simulationId}/runs/${simulationRunId}/events`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any, "id": options?.["id"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListSimulationsEvents200),
      orElse: unexpectedStatus
    }))
  ),
  "getSimulationEvent": (simulationId, simulationRunId, simulationEventId) => HttpClientRequest.get(`/simulations/${simulationId}/runs/${simulationRunId}/events/${simulationEventId}`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSimulationEvent200),
      orElse: unexpectedStatus
    }))
  ),
  "replaySimulationRunEvent": (simulationId, simulationRunId, simulationEventId) => HttpClientRequest.post(`/simulations/${simulationId}/runs/${simulationRunId}/events/${simulationEventId}/replay`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ReplaySimulationRunEvent202),
      orElse: unexpectedStatus
    }))
  ),
  "getIpAddresses": () => HttpClientRequest.get(`/ips`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetIpAddresses200),
      orElse: unexpectedStatus
    }))
  ),
  "getTransactionInvoice": (transactionId, options) => HttpClientRequest.get(`/transactions/${transactionId}/invoice`).pipe(
    HttpClientRequest.setUrlParams({ "disposition": options?.["disposition"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetTransactionInvoice200),
      orElse: unexpectedStatus
    }))
  ),
  "listDiscounts": (options) => HttpClientRequest.get(`/discounts`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "code": options?.["code"] as any, "id": options?.["id"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any, "status": options?.["status"] as any, "mode": options?.["mode"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListDiscounts200),
      orElse: unexpectedStatus
    }))
  ),
  "createDiscount": (options) => HttpClientRequest.post(`/discounts`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateDiscount201),
      orElse: unexpectedStatus
    }))
  ),
  "getDiscount": (discountId) => HttpClientRequest.get(`/discounts/${discountId}`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDiscount200),
      orElse: unexpectedStatus
    }))
  ),
  "updateDiscount": (discountId, options) => HttpClientRequest.patch(`/discounts/${discountId}`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdateDiscount200),
      orElse: unexpectedStatus
    }))
  ),
  "getSubscription": (subscriptionId, options) => HttpClientRequest.get(`/subscriptions/${subscriptionId}`).pipe(
    HttpClientRequest.setUrlParams({ "include": options?.["include"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSubscription200),
      orElse: unexpectedStatus
    }))
  ),
  "updateSubscription": (subscriptionId, options) => HttpClientRequest.patch(`/subscriptions/${subscriptionId}`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdateSubscription200),
      orElse: unexpectedStatus
    }))
  ),
  "listSubscriptions": (options) => HttpClientRequest.get(`/subscriptions`).pipe(
    HttpClientRequest.setUrlParams({ "address_id": options?.["address_id"] as any, "after": options?.["after"] as any, "collection_mode": options?.["collection_mode"] as any, "customer_id": options?.["customer_id"] as any, "id": options?.["id"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any, "price_id": options?.["price_id"] as any, "scheduled_change_action": options?.["scheduled_change_action"] as any, "status": options?.["status"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListSubscriptions200),
      orElse: unexpectedStatus
    }))
  ),
  "cancelSubscription": (subscriptionId, options) => HttpClientRequest.post(`/subscriptions/${subscriptionId}/cancel`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CancelSubscription200),
      orElse: unexpectedStatus
    }))
  ),
  "pauseSubscription": (subscriptionId, options) => HttpClientRequest.post(`/subscriptions/${subscriptionId}/pause`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(PauseSubscription200),
      orElse: unexpectedStatus
    }))
  ),
  "resumeSubscription": (subscriptionId, options) => HttpClientRequest.post(`/subscriptions/${subscriptionId}/resume`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ResumeSubscription200),
      orElse: unexpectedStatus
    }))
  ),
  "activateSubscription": (subscriptionId) => HttpClientRequest.post(`/subscriptions/${subscriptionId}/activate`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ActivateSubscription200),
      orElse: unexpectedStatus
    }))
  ),
  "getSubscriptionUpdatePaymentMethodTransaction": (subscriptionId) => HttpClientRequest.get(`/subscriptions/${subscriptionId}/update-payment-method-transaction`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSubscriptionUpdatePaymentMethodTransaction200),
      orElse: unexpectedStatus
    }))
  ),
  "previewSubscriptionUpdate": (subscriptionId, options) => HttpClientRequest.patch(`/subscriptions/${subscriptionId}/preview`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(PreviewSubscriptionUpdate200),
      orElse: unexpectedStatus
    }))
  ),
  "createSubscriptionCharge": (subscriptionId, options) => HttpClientRequest.post(`/subscriptions/${subscriptionId}/charge`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateSubscriptionCharge201),
      orElse: unexpectedStatus
    }))
  ),
  "previewSubscriptionCharge": (subscriptionId, options) => HttpClientRequest.post(`/subscriptions/${subscriptionId}/charge/preview`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(PreviewSubscriptionCharge200),
      orElse: unexpectedStatus
    }))
  ),
  "listReports": (options) => HttpClientRequest.get(`/reports`).pipe(
    HttpClientRequest.setUrlParams({ "after": options?.["after"] as any, "order_by": options?.["order_by"] as any, "per_page": options?.["per_page"] as any, "status": options?.["status"] as any }),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListReports200),
      orElse: unexpectedStatus
    }))
  ),
  "createReport": (options) => HttpClientRequest.post(`/reports`).pipe(
    HttpClientRequest.bodyUnsafeJson(options),
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateReport201),
      orElse: unexpectedStatus
    }))
  ),
  "getReportCsv": (reportId) => HttpClientRequest.get(`/reports/${reportId}/download-url`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetReportCsv200),
      orElse: unexpectedStatus
    }))
  ),
  "getReport": (reportId) => HttpClientRequest.get(`/reports/${reportId}`).pipe(
    withResponse(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetReport200),
      orElse: unexpectedStatus
    }))
  )
  }
}

export interface Client {
  readonly httpClient: HttpClient.HttpClient
  /**
* Returns a paginated list of products. Use the query parameters to page through results.
* 
* By default, Paddle returns products that are `active`. Use the `status` query parameter to return products that are archived.
* 
* Use the `include` parameter to include related price entities in the response.
*/
readonly "listProducts": (options?: typeof ListProductsParams.Encoded | undefined) => Effect.Effect<typeof ListProducts200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Creates a new product.
* 
* Paddle does not upload product images to a CDN. For `image_url`, you should host images on an HTTPS server that's publicly accessible. We recommend using square images (`1:1` ratio).
* 
* If successful, your response includes a copy of the new product entity.
*/
readonly "createProduct": (options: typeof ProductCreate.Encoded) => Effect.Effect<typeof CreateProduct201.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a product using its ID.
* 
* Use the `include` parameter to include related price entities in the response.
*/
readonly "getProduct": (productId: string, options?: typeof GetProductParams.Encoded | undefined) => Effect.Effect<typeof GetProduct200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Updates a product using its ID.
* 
* Paddle does not upload product images to a CDN. For `image_url`, you should host images on an HTTPS server that's publicly accessible. We recommend using square images (`1:1` ratio).
* 
* If successful, your response includes a copy of the updated product entity.
*/
readonly "updateProduct": (productId: string, options: typeof ProductUpdate.Encoded) => Effect.Effect<typeof UpdateProduct200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of prices. Use the query parameters to page through results.
* 
* By default, Paddle returns prices that are `active`. Use the `status` query parameter to return prices that are archived.
* 
* Use the `include` parameter to include the related product entity in the response.
*/
readonly "listPrices": (options?: typeof ListPricesParams.Encoded | undefined) => Effect.Effect<typeof ListPrices200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Creates a new price.
* 
* Prices describe how you charge for products. You must include a `product_id` in your request to relate this price to a product.
* 
* If you omit the `quantity` object, Paddle automatically sets a minimum of `1` and a maximum of `100` for you. This means the most units that a customer can buy is 100. Set a quantity if you'd like to offer a different amount.
* 
* If successful, your response includes a copy of the new price entity.
*/
readonly "createPrice": (options: typeof PriceCreate.Encoded) => Effect.Effect<typeof CreatePrice201.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a price using its ID.
* 
* Use the `include` parameter to include the related product entity in the response.
*/
readonly "getPrice": (priceId: string, options?: typeof GetPriceParams.Encoded | undefined) => Effect.Effect<typeof GetPrice200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Updates a price using its ID.
* 
* If successful, your response includes a copy of the updated price entity.
*/
readonly "updatePrice": (priceId: string, options: typeof PriceUpdate.Encoded) => Effect.Effect<typeof UpdatePrice200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of transactions. Use the query parameters to page through results.
* 
* Use the `include` parameter to include related entities in the response.
*/
readonly "listTransactions": (options?: typeof ListTransactionsParams.Encoded | undefined) => Effect.Effect<typeof ListTransactions200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Creates a new transaction.
* 
* Transactions are typically created with the status of `draft` or `ready` initially:
* 
* * Draft transactions have `items` against them, but don't have all of the required fields for billing. Paddle creates draft transactions automatically when a checkout is opened.
* * Paddle automatically marks transactions as `ready` when all of the required fields are present for billing. This includes `customer_id` and `address_id` for automatically-collected transactions, and `billing_details` for manually-collected transactions.
* 
* The `collection_mode` against a transaction determines how Paddle tries to collect for payment:
* 
* * Manually-collected transactions are for sales-assisted billing. Paddle sends an invoice to your customer when a transaction is `billed`. Payment is often by wire transfer.
* * Automatically-collected transactions are for self-serve checkouts. You may pass the transaction to a checkout or use the returned `checkout.url` to collect for payment.
* 
* When a manually-collected transaction is marked as `billed` or an automatically-collected transaction is `completed`, Paddle automatically creates a related subscription for the items on the transaction.
* 
* If successful, your response includes a copy of the new transaction entity.
* 
* Use the `include` parameter to include related entities in the response.
*/
readonly "createTransaction": (options: { readonly params?: typeof CreateTransactionParams.Encoded | undefined; readonly payload: typeof TransactionCreate.Encoded }) => Effect.Effect<typeof CreateTransaction201.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Previews calculations for one or more prices. Typically used for building pricing pages.
* 
* You can provide location information when previewing prices. You must provide this if you want Paddle to calculate tax or [automatically localize prices](https://developer.paddle.com/build/products/offer-localized-pricing). You can provide one of:
* 
* * `customer_ip_address`: Paddle fetches location using the IP address to calculate totals.
* * `address`: Paddle uses the country and ZIP code (where supplied) to calculate totals.
* * `customer_id`, `address_id`, `business_id`: Paddle uses existing customer data to calculate totals. Typically used for logged-in customers.
* 
* If successful, your response includes the data you sent with a `details` object that includes totals for the supplied prices.
* 
* Each line item includes `formatted_unit_totals` and `formatted_totals` objects that return totals formatted for the country or region you're working with, including the currency symbol.
* 
* You can work with the preview prices operation using the [`Paddle.PricePreview()`](https://developer.paddle.com/paddlejs/methods/paddle-pricepreview) method in Paddle.js. When working with `Paddle.PricePreview()`, request and response fields are `camelCase` rather than `snake_case`.
*/
readonly "previewPrices": (options: typeof TransactionPricingPreviewRequest.Encoded) => Effect.Effect<typeof PreviewPrices200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Previews a transaction without creating a transaction entity. Typically used for creating more advanced, dynamic pricing pages where users can build their own plans.
* 
* Consider using [the preview prices operation](https://developer.paddle.com/api-reference/pricing-preview/preview-prices) for simpler pricing pages.
* 
* You can provide location information when previewing a transaction. You must provide this if you want Paddle to calculate tax or [automatically localize prices](https://developer.paddle.com/build/products/offer-localized-pricing). You can provide one of:
* 
* * `customer_ip_address`: Paddle fetches location using the IP address to calculate totals.
* * `address`: Paddle uses the country and ZIP code (where supplied) to calculate totals.
* * `customer_id`, `address_id`, `business_id`: Paddle uses existing customer data to calculate totals. Typically used for logged-in customers.
* 
* When supplying items, you can exclude items from the total calculation using the `include_in_totals` boolean.
* 
* By default, recurring items with trials are considered to have a zero charge when previewing. Set `ignore_trials` to `true` to ignore trial periods against prices for transaction preview calculations.
* 
* If successful, your response includes the data you sent with a `details` object that includes totals for the supplied prices.
* 
* Transaction previews don't create transactions, so no `id` is returned.
*/
readonly "previewTransactionCreate": (options: typeof PreviewTransactionCreateRequest.Encoded) => Effect.Effect<typeof PreviewTransactionCreate200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a transaction using its ID.
* 
* Use the `include` parameter to include related entities in the response.
*/
readonly "getTransaction": (transactionId: string, options?: typeof GetTransactionParams.Encoded | undefined) => Effect.Effect<typeof GetTransaction200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Updates a transaction using its ID.
* 
* You can update transactions that are `draft` or `ready`. `billed` and `completed` transactions are considered records for tax and legal purposes, so they can't be changed. You can either:
* 
* * Create [an adjustment](https://developer.paddle.com/api-reference/adjustments/overview) to record a refund or credit for a transaction.
* * Cancel a `billed` transaction by sending a PATCH request to set `status` to `canceled`.
* 
* The transaction `status` may only be set to `billed` or `canceled`. Other statuses are set automatically by Paddle. Set a manually-collected transaction to `billed` to mark it as finalized. This is essentially issuing an invoice. At this point, it becomes a legal record so you can't make changes to it. Paddle automatically assigns an invoice number, creates [a related subscription](https://developer.paddle.com/api-reference/subscriptions/overview), and sends it to your customer.
* 
* When making changes to items on a transaction, send the complete list of items that you'd like to be on a transaction — including existing items. For each item, send an object containing `price_id` and `quantity`. Paddle responds with the full `price` object for each item. See: [Work with lists](https://developer.paddle.com/api-reference/about/lists)
* 
* If successful, your response includes a copy of the updated transaction entity.
*/
readonly "updateTransaction": (transactionId: string, options: { readonly params?: typeof UpdateTransactionParams.Encoded | undefined; readonly payload: typeof UpdateTransactionRequest.Encoded }) => Effect.Effect<typeof UpdateTransaction200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Revises customer information for a billed or completed transaction.
* 
* Revise a transaction to rectify incorrect customer, address, or business information on invoice documents generated by Paddle.
* 
* You can revise transaction details that don't impact the tax rates on a transaction. This includes:
* 
* * Customer name
* * Business name and tax or VAT number (`tax_identifier`)
* * Address details, apart from the country
* 
* You can't remove a valid tax or VAT number, only replace it with another valid one. If a valid tax or VAT number is added, Paddle automatically creates an adjustment to refund any tax where applicable.
* 
* Transactions can only be revised once.
* 
* If successful, your response includes a copy of the transaction entity. [Get a transaction](https://developer.paddle.com/api-reference/transactions/get-transaction) using the `include` parameter with the `customer`, `address`, and `business` values to see the revised customer information.
* 
* Only the customer information for this transaction is updated. The related customer, address, and business entities aren't updated.
*/
readonly "reviseTransaction": (transactionId: string, options: typeof ReviseTransactionRequest.Encoded) => Effect.Effect<typeof ReviseTransaction200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of adjustments. Use the query parameters to page through results.
*/
readonly "listAdjustments": (options?: typeof ListAdjustmentsParams.Encoded | undefined) => Effect.Effect<typeof ListAdjustments200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Creates an adjustment for one or more transaction items.
* 
* You can create adjustments to refund or credit all or part of a transaction and its items:
* 
* * Refunds return an amount to a customer's original payment method. You can create refund adjustments for transactions that are `completed`.
* * Credits reduce the amount that a customer has to pay for a transaction. You can create credit adjustments for manually-collected transactions that are `billed` or `past_due`.
* 
* You can create adjustments to refund transactions that are `completed`, or to reduce the amount to due on manually-collected transactions that are `billed` or `past_due`.
* Most refunds for live accounts are created with the status of `pending_approval` until reviewed by Paddle, but [some are automatically approved](https://developer.paddle.com/build/transactions/create-transaction-adjustments#background-refunds). For sandbox accounts, Paddle automatically approves refunds every ten minutes.
* 
* Adjustments can apply to some or all items on a transaction. You'll need the Paddle ID of the transaction to create a refund or credit for, along with the Paddle ID of any transaction items (`details.line_items[].id`).
* 
* If successful, your response includes a copy of the new adjustment entity.
*/
readonly "createAdjustment": (options: typeof AdjustmentCreate.Encoded) => Effect.Effect<typeof CreateAdjustment201.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a link to a credit note PDF for an adjustment.
* 
* Credit note PDFs are created for refunds and credits as a record of an adjustment.
* 
* The link returned is not a permanent link. It expires after an hour.
*/
readonly "getAdjustmentCreditNote": (adjustmentId: string, options?: typeof GetAdjustmentCreditNoteParams.Encoded | undefined) => Effect.Effect<typeof GetAdjustmentCreditNote200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a list of credit balances for each currency for a customer. Each balance has three totals:
* 
* * `available`: total available to use.
* * `reserved`: total temporarily reserved for billed transactions.
* * `used`: total amount of credit used.
* 
* Credit is added to the `available` total initially. When used, it moves to the `used` total.
* 
* The `reserved` total is used when a credit balance is applied to a transaction that's marked as `billed`, like when working with an issued invoice. It's not available for other transactions at this point, but isn't considered `used` until the transaction is completed. If a `billed` transaction is `canceled`, any reserved credit moves back to `available`.
* 
* Credit balances are created automatically by Paddle when you take an action that results in Paddle creating a credit for a customer, like making prorated changes to a subscription. An empty `data` array is returned where a customer has no credit balances.
* 
* The response is not paginated.
*/
readonly "listCreditBalances": (customerId: string, options?: typeof ListCreditBalancesParams.Encoded | undefined) => Effect.Effect<typeof ListCreditBalances200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of customers. Use the query parameters to page through results.
* 
* By default, Paddle returns customers that are `active`. Use the `status` query parameter to return customers that are archived.
*/
readonly "listCustomers": (options?: typeof ListCustomersParams.Encoded | undefined) => Effect.Effect<typeof ListCustomers200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Creates a new customer.
* 
* If successful, your response includes a copy of the new customer entity.
*/
readonly "createCustomer": (options: typeof CustomerCreate.Encoded) => Effect.Effect<typeof CreateCustomer201.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a customer using its ID.
*/
readonly "getCustomer": (customerId: string) => Effect.Effect<typeof GetCustomer200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Updates a customer using its ID.
* 
* If successful, your response includes a copy of the updated customer entity.
*/
readonly "updateCustomer": (customerId: string, options: typeof CustomerUpdate.Encoded) => Effect.Effect<typeof UpdateCustomer200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of addresses for a customer. Use the query parameters to page through results.
* 
* By default, Paddle returns addresses that are `active`. Use the `status` query parameter to return addresses that are archived.
*/
readonly "listAddresses": (customerId: string, options?: typeof ListAddressesParams.Encoded | undefined) => Effect.Effect<typeof ListAddresses200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Creates a new address for a customer.
* 
* For tax calculation, fraud prevention, and compliance purposes, you must include a `postal_code` when creating addresses for some countries. For example, ZIP codes in the USA and postcodes in the UK. See: [Supported countries](https://developer.paddle.com/concepts/sell/supported-countries-locales)
* 
* If successful, your response includes a copy of the new address entity.
*/
readonly "createAddress": (customerId: string, options: typeof AddressCreate.Encoded) => Effect.Effect<typeof CreateAddress201.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns an address for a customer using its ID and related customer ID.
*/
readonly "getAddress": (customerId: string, addressId: string) => Effect.Effect<typeof GetAddress200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Updates an address for a customer using its ID and related customer ID.
* 
* If successful, your response includes a copy of the updated address entity.
*/
readonly "updateAddress": (customerId: string, addressId: string, options: typeof AddressUpdate.Encoded) => Effect.Effect<typeof UpdateAddress200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Generates an authentication token for a customer. You can pass a generated authentication token to Paddle.js when opening a checkout to let customers work with saved payment methods.
* 
* Authentication tokens are temporary and shouldn't be cached. They're valid until the `expires_at` date returned in the response.
*/
readonly "generateCustomerAuthenticationToken": (customerId: string) => Effect.Effect<typeof GenerateCustomerAuthenticationToken200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of businesses for a customer. Use the query parameters to page through results.
* 
* By default, Paddle returns businesses that are `active`. Use the `status` query parameter to return businesses that are archived.
*/
readonly "listBusinesses": (customerId: string, options?: typeof ListBusinessesParams.Encoded | undefined) => Effect.Effect<typeof ListBusinesses200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Creates a new business for a customer.
* 
* If successful, your response includes a copy of the new business entity.
*/
readonly "createBusiness": (customerId: string, options: typeof BusinessCreate.Encoded) => Effect.Effect<typeof CreateBusiness201.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a business for a customer using its ID and related customer ID.
*/
readonly "getBusiness": (customerId: string, businessId: string) => Effect.Effect<typeof GetBusiness200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Updates a business for a customer using its ID and related customer ID.
* 
* If successful, your response includes a copy of the updated business entity.
*/
readonly "updateBusiness": (customerId: string, businessId: string, options: typeof BusinessUpdate.Encoded) => Effect.Effect<typeof UpdateBusiness200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of payment methods that a customer has saved.  Use the query parameters to page through results.
* 
* When customers sign up for a subscription using Paddle Checkout, Paddle saves the payment method for renewals, upgrades and downgrades, and other charges related to that subscription.
* 
* Customers can also choose to save payment methods when purchasing one-time items by checking a box when completing checkout. You can present customers with their saved payment methods when they make a purchase in the future.
* 
* Returns an empty list where customers have not saved any payment methods, or have deleted all previously saved payment methods.
*/
readonly "listCustomerPaymentMethods": (customerId: string, options?: typeof ListCustomerPaymentMethodsParams.Encoded | undefined) => Effect.Effect<typeof ListCustomerPaymentMethods200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a payment method for a customer using its ID and related customer ID.
*/
readonly "getCustomerPaymentMethod": (customerId: string, paymentMethodId: string) => Effect.Effect<typeof GetCustomerPaymentMethod200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Deletes a customer payment method using its ID.
* 
* When you delete a customer payment method, it's permanently removed from that customer.
* 
* There's no way to recover a deleted payment method.
*/
readonly "deleteCustomerPaymentMethod": (customerId: string, paymentMethodId: string) => Effect.Effect<void, HttpClientError.HttpClientError | ParseError>
  /**
* Creates a customer portal session for a customer.
* 
* The [customer portal](https://developer.paddle.com/concepts/customer-portal) is a secure, Paddle-hosted site that allows
* customers to manage their own subscriptions, payments, and account information without you having to build custom billing screens.
* 
* Customers can:
* 
* * View transaction history
* * Download invoices
* * Update payment methods
* * Manage their subscriptions including making changes or cancellations
* * Revise details on completed transactions
* 
* You can create a customer portal session to generate authenticated links for a customer
* so that they're automatically signed in to the portal. It's typically used when linking to
* the customer portal from your app where customers are already authenticated.
* 
* You can include an array of `subscription_ids` to generate authenticated portal links that let customers make
* changes to their subscriptions. You can use these links as part of subscription management workflows rather than
* building your own billing screens.
* 
* Customer portal sessions are temporary and shouldn't be cached.
* 
* The customer portal is fully hosted by Paddle. For security and the best customer experience, don't embed the customer
* portal in an iframe.
*/
readonly "createCustomerPortalSession": (customerId: string, options: typeof CustomerPortalSessionCreate.Encoded) => Effect.Effect<typeof CreateCustomerPortalSession201.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of notification settings (notification destinations).
*/
readonly "listNotificationSettings": (options?: typeof ListNotificationSettingsParams.Encoded | undefined) => Effect.Effect<typeof ListNotificationSettings200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Creates a new notification setting (notification destination).
* 
* Pass an array of event type names to `subscribed_events` to say which events you'd like to subscribe to. Paddle responds with the full event type object for each event type.
* 
* If successful, your response includes a copy of the new notification setting entity. Use the returned `endpoint_secret_key` for webhook signature verification.
*/
readonly "createNotificationSetting": (options: typeof NotificationSettingCreate.Encoded) => Effect.Effect<typeof CreateNotificationSetting201.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a notification setting (notification destination) using its ID.
*/
readonly "getNotificationSetting": (notificationSettingId: string) => Effect.Effect<typeof GetNotificationSetting200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Deletes a notification setting (notification destination) using its ID.
* 
* When you delete a notification setting, it's permanently removed from your account. Paddle stops sending events to your destination, and you'll lose access to all the logs for this notification setting.
* 
* There's no way to recover a deleted notification setting. Deactivate a notification setting using the update notification setting operation if you'll need access to the logs or want to reactivate later on.
*/
readonly "deleteNotificationSetting": (notificationSettingId: string) => Effect.Effect<void, HttpClientError.HttpClientError | ParseError>
  /**
* Updates a notification setting (notification destination) using its ID.
* 
* When updating subscribed events, send the complete list of event types that you'd like to subscribe to — including existing event types. If you omit event types, they're removed from the notification setting.
* 
* You only need to pass an event type name. Paddle responds with the full event type object for each event type.
* 
* If successful, your response includes a copy of the updated notification setting entity.
*/
readonly "updateNotificationSetting": (notificationSettingId: string, options: typeof NotificationSettingUpdate.Encoded) => Effect.Effect<typeof UpdateNotificationSetting200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a list of event types.
* 
* The response is not paginated.
*/
readonly "listEventTypes": () => Effect.Effect<typeof ListEventTypes200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of events that have occurred in the last 90 days. Use the query parameters to page through results.
* 
* Events older than 90 days aren't retained.
* 
* This is sometimes referred to as "the event stream."
*/
readonly "listEvents": (options?: typeof ListEventsParams.Encoded | undefined) => Effect.Effect<typeof ListEvents200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of notifications created in the last 90 days. Use the query parameters to page through results.
* 
* Notifications older than 90 days aren't retained.
*/
readonly "listNotifications": (options?: typeof ListNotificationsParams.Encoded | undefined) => Effect.Effect<typeof ListNotifications200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a notification using its ID.
* 
* Notifications older than 90 days aren't retained. If you try to get a notification that's no longer retained, Paddle returns an error.
*/
readonly "getNotification": (notificationId: string) => Effect.Effect<typeof GetNotification200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of notification logs for a notification. A log includes information about delivery attempts, including failures.
* 
* Notifications older than 90 days aren't retained. If you try to list logs for a notification that's no longer retained, Paddle returns an error.
*/
readonly "listNotificationLogs": (notificationId: string, options?: typeof ListNotificationLogsParams.Encoded | undefined) => Effect.Effect<typeof ListNotificationLogs200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Attempts to resend a `delivered` or `failed` notification using its ID.
* 
* Paddle creates a new notification entity for the replay, related to the same `event_id`. Your response includes the new `notification_id` of the created notification.
* 
* Notifications older than 90 days aren't retained. If you try to replay a notification that's no longer retained, Paddle returns an error.
* 
* Only notifications with the `origin` of `event` can be replayed. You can't replay a notification created for a replay.
*/
readonly "replayNotification": (notificationId: string) => Effect.Effect<typeof ReplayNotification202.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a list of simulation types (events and scenarios) that you can choose from when creating simulations.
*/
readonly "listSimulationTypes": () => Effect.Effect<typeof ListSimulationTypes200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of simulations. Use the query parameters to [page through results](https://developer.paddle.com/api-reference/about/pagination).
*/
readonly "listSimulations": (options?: typeof ListSimulationsParams.Encoded | undefined) => Effect.Effect<typeof ListSimulations200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Creates a new simulation for a notification setting (notification destination).
* 
* For scenario simulations, you can optionally include a `config.entities` object in the request body with entity IDs to populate
* simulated webhook payloads with real data. The API key making the request needs read permissions:
* 
* * For the entities you provided, or the request fails.
* * For related entities which aren't nested in the entities you provided, or static examples will be used instead.
* 
* For example, when creating a subscription renewal scenario simulation with an API key that has a `subscription.read` permission but not a `transaction.read` permission,
* the request succeeds and the subscription data will be used in simulated payloads, but the related transaction data won't be used in payloads and falls back to a static example.
* 
* If you don't provide a `config.entities` object, simulated webhook payloads are populated with static examples.
* 
* If successful, your response includes a copy of the new simulation entity.
*/
readonly "createSimulation": (options: typeof SimulationCreate.Encoded) => Effect.Effect<typeof CreateSimulation201.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a simulation using its ID.
*/
readonly "getSimulation": (simulationId: string) => Effect.Effect<typeof GetSimulation200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Updates a simulation using its ID.
* 
* For scenario simulations, you can optionally include a `config.entities` object in the request body with entity IDs to populate
* simulated webhook payloads with real data. The API key making the request needs read permissions:
* 
* * For the entities you provided, or the request fails.
* * For related entities which aren't nested in the entities you provided, or static examples will be used instead.
* 
* For example, when updating a subscription renewal scenario simulation with an API key that has a `subscription.read` permission but not a `transaction.read` permission,
* the request succeeds and the subscription data will be used in simulated payloads, but the related transaction data won't be used in payloads and falls back to a static example.
* 
* If you don't provide a `config.entities` object, simulated webhook payloads are populated with static examples.
* 
* If successful, your response includes a copy of the updated simulation entity.
*/
readonly "updateSimulation": (simulationId: string, options: typeof SimulationUpdate.Encoded) => Effect.Effect<typeof UpdateSimulation200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of simulation runs. Use the query parameters to [page through results](https://developer.paddle.com/api-reference/about/pagination).
* 
* Use the `include` parameter to [include related entities](https://developer.paddle.com/api-reference/about/include-entities) in the response.
*/
readonly "listSimulationRuns": (simulationId: string, options?: typeof ListSimulationRunsParams.Encoded | undefined) => Effect.Effect<typeof ListSimulationRuns200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Creates a new simulation run for a simulation.
* 
* If successful, your response includes a copy of the new simulation run entity.
*/
readonly "createSimulationRun": (simulationId: string) => Effect.Effect<typeof CreateSimulationRun201.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a simulation run using its ID.
* 
* Use the `include` parameter to include related entities in the response.
*/
readonly "getSimulationRun": (simulationId: string, simulationRunId: string, options?: typeof GetSimulationRunParams.Encoded | undefined) => Effect.Effect<typeof GetSimulationRun200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of simulations. Use the query parameters to [page through results](https://developer.paddle.com/api-reference/about/pagination).
*/
readonly "listSimulationsEvents": (simulationId: string, simulationRunId: string, options?: typeof ListSimulationsEventsParams.Encoded | undefined) => Effect.Effect<typeof ListSimulationsEvents200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a simulation event using its ID.
* 
* Use the `include` parameter to include related entities in the response.
*/
readonly "getSimulationEvent": (simulationId: string, simulationRunId: string, simulationEventId: string) => Effect.Effect<typeof GetSimulationEvent200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Attempts to resend a simulation run log using its ID.
* 
* Paddle creates a new simulation run log entity for the replay, related to the same simulation run.
* 
* If successful, your response includes the new simulation run log entity.
*/
readonly "replaySimulationRunEvent": (simulationId: string, simulationRunId: string, simulationEventId: string) => Effect.Effect<typeof ReplaySimulationRunEvent202.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns Paddle IP addresses. You can add these IP addresses to your allowlist.
* 
* IP addresses returned are for the environment that you're making the request in. For example, making the request to the production base URL returns all production IP addresses.
*/
readonly "getIpAddresses": () => Effect.Effect<typeof GetIpAddresses200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a link to an invoice PDF for a transaction.
* 
* Invoice PDFs are available for both automatically and manually-collected transactions:
* 
* * The PDF for manually-collected transactions includes payment terms, purchase order number, and notes for your customer. It's a demand for payment from your customer. It's available for transactions that are `billed` or `completed`.
* * The PDF for automatically-collected transactions lets your customer know that payment was taken successfully. Customers may require this for for tax-reporting purposes. It's available for transactions that are `completed`.
* 
* Invoice PDFs aren't available for zero-value transactions.
* 
* The link returned is not a permanent link. It expires after an hour.
*/
readonly "getTransactionInvoice": (transactionId: string, options?: typeof GetTransactionInvoiceParams.Encoded | undefined) => Effect.Effect<typeof GetTransactionInvoice200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of discounts. Use the query parameters to page through results.
* 
* By default, Paddle returns discounts that are `active`. Use the `status` query parameter to return discounts that are archived or expired.
*/
readonly "listDiscounts": (options?: typeof ListDiscountsParams.Encoded | undefined) => Effect.Effect<typeof ListDiscounts200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Creates a new discount.
* 
* If successful, your response includes a copy of the new discount entity.
*/
readonly "createDiscount": (options: typeof DiscountCreate.Encoded) => Effect.Effect<typeof CreateDiscount201.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a discount using its ID.
*/
readonly "getDiscount": (discountId: string) => Effect.Effect<typeof GetDiscount200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Updates a discount using its ID.
* 
* If successful, your response includes a copy of the updated discount entity.
* 
* To update a checkout recovery discount, configure your checkout recovery settings in the dashboard.
*/
readonly "updateDiscount": (discountId: string, options: typeof Discount.Encoded) => Effect.Effect<typeof UpdateDiscount200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a subscription using its ID.
* 
* Use the `include` parameter to include transaction information in the response.
*/
readonly "getSubscription": (subscriptionId: string, options?: typeof GetSubscriptionParams.Encoded | undefined) => Effect.Effect<typeof GetSubscription200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Updates a subscription using its ID.
* 
* When making changes to items or the next billing date for a subscription, you must include the `proration_billing_mode` field to tell Paddle how to bill for those changes.
* 
* Send the complete list of items that you'd like to be on a subscription — including existing items. If you omit items, they're removed from the subscription.
* 
* For each item, send `price_id` and `quantity`. Paddle responds with the full price object for each price. If you're updating an existing item, you can omit the `quantity` if you don't want to update it.
* 
* If successful, your response includes a copy of the updated subscription entity. When an update results in an immediate charge, responses may take longer than usual while a payment attempt is processed.
*/
readonly "updateSubscription": (subscriptionId: string, options: typeof SubscriptionUpdate.Encoded) => Effect.Effect<typeof UpdateSubscription200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of subscriptions. Use the query parameters to page through results.
*/
readonly "listSubscriptions": (options?: typeof ListSubscriptionsParams.Encoded | undefined) => Effect.Effect<typeof ListSubscriptions200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Cancels a subscription using its ID.
* 
* By default, active subscriptions are canceled at the end of the billing period. When you send a request to cancel, Paddle creates a `scheduled_change` against the subscription entity to say that it should cancel at the end of the current billing period. Its `status` remains `active` until after the effective date of the scheduled change, at which point it changes to `canceled`.
* 
* You can cancel a subscription right away by including `effective_from` in your request, setting the value to `immediately`. If successful, your response includes a copy of the updated subscription entity with the `status` of `canceled`. Canceling immediately is the default behavior for paused subscriptions.
* 
* You can't reinstate a canceled subscription.
*/
readonly "cancelSubscription": (subscriptionId: string, options: typeof CancelSubscriptionRequest.Encoded) => Effect.Effect<typeof CancelSubscription200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Pauses a subscription using its ID.
* 
* By default, subscriptions are paused at the end of the billing period. When you send a request to pause, Paddle creates a `scheduled_change` against the subscription entity to say that it should pause at the end of the current billing period. Its `status` remains `active` until after the effective date of the scheduled change, at which point it changes to `paused`.
* 
* You can pause a subscription right away by including `effective_from` in your request, setting the value to `immediately`. If successful, your response includes a copy of the updated subscription entity with the `status` of `paused`.
* 
* To set a resume date, include the `resume_at` field in your request. The subscription remains paused until the resume date, or until you send a resume request. Omit to create an open-ended pause. The subscription remains paused indefinitely, until you send a resume request.
*/
readonly "pauseSubscription": (subscriptionId: string, options: typeof PauseSubscriptionRequest.Encoded) => Effect.Effect<typeof PauseSubscription200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Resumes a paused subscription using its ID. Only `paused` subscriptions can be resumed. If an `active` subscription has a scheduled change to pause in the future, use this operation to set or change the resume date.
* 
* You can't resume a `canceled` subscription.
* 
* On resume, Paddle bills for a subscription immediately by default. Subscription billing dates are recalculated based on the resume date. Use the `on_resume` field to change this behavior.
* 
* If successful, Paddle returns a copy of the updated subscription entity:
* 
* * When resuming a `paused` subscription immediately, the subscription status is `active`, and billing dates are updated to reflect the resume date.
* * When scheduling a `paused` subscription to resume on a date in the future, the subscription status is `paused`, and `scheduled_change.resume_at` is updated to reflect the scheduled resume date.
* * When changing the resume date for an `active` subscription that's scheduled to pause, the subscription status is `active` and `scheduled_change.resume_at` is updated to reflect the scheduled resume date.
* 
* This operation may result in an immediate charge, so responses may take longer than usual while a payment attempt is processed.
*/
readonly "resumeSubscription": (subscriptionId: string, options: typeof ResumeSubscriptionRequest.Encoded) => Effect.Effect<typeof ResumeSubscription200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Activates a trialing subscription using its ID. Only automatically-collected subscriptions where the status is `trialing` can be activated.
* 
* On activation, Paddle bills for a subscription immediately. Subscription billing dates are recalculated based on the activation date (the time the activation request is made).
* 
* If successful, Paddle returns a copy of the updated subscription entity. The subscription status is `active`, and billing dates are updated to reflect the activation date.
* 
* This operation results in an immediate charge, so responses may take longer than usual while a payment attempt is processed.
*/
readonly "activateSubscription": (subscriptionId: string) => Effect.Effect<typeof ActivateSubscription200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a transaction that you can pass to a checkout to let customers update their payment details. Only for subscriptions where `collection_mode` is `automatic`.
* 
* The transaction returned depends on the status of the related subscription:
* 
* * Where a subscription is `past_due`, it returns the most recent `past_due` transaction.
* * Where a subscription is `active`, it creates a new zero amount transaction for the items on a subscription.
* 
* You can use the returned `checkout.url`, or pass the returned transaction ID to Paddle.js to open a checkout to present customers with a way of updating their payment details.
* 
* The `customer`, `address`, `business`, `discount`, `adjustments` and `adjustments_totals` properties are only returned in the response if the API key has read permissions for those related entities.
*/
readonly "getSubscriptionUpdatePaymentMethodTransaction": (subscriptionId: string) => Effect.Effect<typeof GetSubscriptionUpdatePaymentMethodTransaction200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Previews an update for a subscription without applying those changes. Typically used for previewing proration before making changes to a subscription.
* 
* If successful, your response includes `immediate_transaction`, `next_transaction`, and `recurring_transaction_details` so you can see expected transactions for the changes.
* 
* The `update_summary` object contains details of prorated credits and charges created, along with the overall result of the update.
*/
readonly "previewSubscriptionUpdate": (subscriptionId: string, options: typeof SubscriptionUpdate.Encoded) => Effect.Effect<typeof PreviewSubscriptionUpdate200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Creates a new one-time charge for a subscription. Use to bill non-recurring items to a subscription. Non-recurring items are price entities where the `billing_cycle` is `null`.
* 
* If successful, Paddle responds with the updated subscription entity. However, one-time charges aren't held against the subscription entity, so the charges billed aren't returned in the response.
* 
* Once created, to get details of a one-time charge:
* 
* * When created with `effective_from` as `next_billing_period`, get the subscription the charge was billed to and use the `include` query parameter with the `next_transaction` value.
* * When created with `effective_from` as `immediately`, list transactions and use the `subscription_id` query parameter with the subscription ID of the subscription the charge was billed to.
* 
* When an update results in an immediate charge, responses may take longer than usual while a payment attempt is processed.
*/
readonly "createSubscriptionCharge": (subscriptionId: string, options: typeof SubscriptionCharge.Encoded) => Effect.Effect<typeof CreateSubscriptionCharge201.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Previews creating a one-time charge for a subscription without billing that charge. Typically used for previewing calculations before making changes to a subscription.
* 
* One-time charges are non-recurring items. These are price entities where the `billing_cycle` is `null`.
* 
* If successful, your response includes `immediate_transaction`, `next_transaction`, and `recurring_transaction_details` so you can see expected transactions for the changes.
*/
readonly "previewSubscriptionCharge": (subscriptionId: string, options: typeof SubscriptionCharge.Encoded) => Effect.Effect<typeof PreviewSubscriptionCharge200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a paginated list of reports. Use the query parameters to page through results.
* 
* By default, Paddle returns reports that are `pending` or `ready`. Use the `status` query parameter to return reports that are `failed`, `expired`, or `deleted`.
*/
readonly "listReports": (options?: typeof ListReportsParams.Encoded | undefined) => Effect.Effect<typeof ListReports200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Creates a new report.
* 
* Reports are created as `pending` initially while Paddle generates your report. They move to `ready` when they're ready to download.
* 
* You can download a report when it's ready using the [get a CSV file for a report operation](#).
* 
* If successful, your response includes a copy of the new report entity.
*/
readonly "createReport": (options: typeof Report.Encoded) => Effect.Effect<typeof CreateReport201.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a link to a CSV file for a report.
* 
* Only returned for reports that are `ready`. This means Paddle has completed processing the report and it's ready to download.
* 
* The link returned is not a permanent link. It expires after 3 minutes.
*/
readonly "getReportCsv": (reportId: string) => Effect.Effect<typeof GetReportCsv200.Type, HttpClientError.HttpClientError | ParseError>
  /**
* Returns a report using its ID.
*/
readonly "getReport": (reportId: string) => Effect.Effect<typeof GetReport200.Type, HttpClientError.HttpClientError | ParseError>
}

export interface ClientError<Tag extends string, E> {
  readonly _tag: Tag
  readonly request: HttpClientRequest.HttpClientRequest
  readonly response: HttpClientResponse.HttpClientResponse
  readonly cause: E
}

class ClientErrorImpl extends Data.Error<{
  _tag: string
  cause: any
  request: HttpClientRequest.HttpClientRequest
  response: HttpClientResponse.HttpClientResponse
}> {}

export const ClientError = <Tag extends string, E>(
  tag: Tag,
  cause: E,
  response: HttpClientResponse.HttpClientResponse,
): ClientError<Tag, E> =>
  new ClientErrorImpl({
    _tag: tag,
    cause,
    response,
    request: response.request,
  }) as any
