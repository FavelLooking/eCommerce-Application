import { Product, Price, DiscountedPrice } from '@commercetools/platform-sdk';
import ClientFactory from './clientFactory';
import { isValidPath } from '../utils';

export const getProducts = async () => {
  const data: Product[] = [];
  if (isValidPath()) {
    await ClientFactory.createApiRoot(ClientFactory.flowType)
      .products()
      .get({
        queryArgs: {
          limit: 500,
        },
      })
      .execute()
      .then((value) => {
        data.push(...(value.body.results as Product[]));
      });
  }
  return data;
};

const getPriceValue = (price: Price | DiscountedPrice): string => {
  const priceCurrency = '€';
  const priceCents = price.value.centAmount;
  const priceDigits = price.value.fractionDigits;

  return `${priceCents / 10 ** priceDigits} ${priceCurrency}`;
};

export const getProductPrice = (
  product: Product
): [string | undefined, string | undefined] => {
  const price = product.masterData.current.masterVariant.prices?.at(0);
  if (!price) {
    return [undefined, undefined];
  }

  const originalPrice = getPriceValue(price);
  const discountPrice = price.discounted
    ? getPriceValue(price.discounted)
    : undefined;

  return [originalPrice, discountPrice];
};

export const getProductImage = (product: Product): string =>
  product?.masterData?.current?.masterVariant?.images?.at(0)?.url ?? '';

export const getProductName = (product: Product): string =>
  product.masterData.current.name.en;

export const getProductDescription = (product: Product): string =>
  product.masterData.current.metaDescription?.en ?? '';
