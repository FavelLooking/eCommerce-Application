import {
  Price,
  DiscountedPrice,
  ProductProjection,
  Category,
} from '@commercetools/platform-sdk';
import ClientFactory from './clientFactory';
import { isValidPath } from '../utils';

const getCategory = async () =>
  ClientFactory.createApiRoot(ClientFactory.flowType)
    .categories()
    .get()
    .execute()
    .then((value) => value.body.results);

export const getProducts = async (path: string) => {
  const data: ProductProjection[] = [];
  if (isValidPath(path)) {
    const currentCategoryTitle = path.split('/').at(-1) ?? 'catalog';
    const currentCategory = (await getCategory()).filter(
      (x: Category) => String(x.name.en).toLowerCase() === currentCategoryTitle
    )[0];
    const filterString =
      currentCategoryTitle !== 'catalog'
        ? [`categories.id: subtree("${currentCategory.id}")`]
        : [];
    await ClientFactory.createApiRoot(ClientFactory.flowType)
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit: 500,
          filter: filterString,
        },
      })
      .execute()
      .then((value) => {
        data.push(...(value.body.results as ProductProjection[]));
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
  product: ProductProjection
): [string | undefined, string | undefined] => {
  const price = product.masterVariant.prices?.at(0);
  if (!price) {
    return [undefined, undefined];
  }

  const originalPrice = getPriceValue(price);
  const discountPrice = price.discounted
    ? getPriceValue(price.discounted)
    : undefined;

  return [originalPrice, discountPrice];
};

export const getProductImage = (product: ProductProjection): string =>
  product?.masterVariant?.images?.at(0)?.url ?? '';

export const getProductName = (product: ProductProjection): string =>
  product.name.en;

export const getProductDescription = (product: ProductProjection): string =>
  product.metaDescription?.en ?? '';
