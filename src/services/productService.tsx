import {
  Price,
  DiscountedPrice,
  ProductProjection,
  Category,
} from '@commercetools/platform-sdk';
import ClientFactory from './clientFactory';
import { isValidPath } from '../utils';
import { SortingTypes } from '../types';
import { priceCurrency } from '../utils/constants';

const getCategory = async () =>
  ClientFactory.createApiRoot(ClientFactory.flowType)
    .categories()
    .get()
    .execute()
    .then((value) => value.body.results);

const getCategoryByPath = async (path: string) =>
  (await getCategory()).filter(
    (x: Category) => String(x.name.en).toLowerCase() === path
  )[0];

const generateFilterString = (props: {
  category: Category | undefined;
}): string[] =>
  props.category ? [`categories.id: subtree("${props.category.id}")`] : [];

export const getProducts = async (
  path: string,
  limit: number,
  sortingType: string | undefined = undefined,
  filteringType: string[] | undefined = undefined,
  page: number = 1
) => {
  const data: ProductProjection[] = [];
  let totalProducts: number | undefined = 0;

  if (isValidPath(path)) {
    const currentCategoryTitle = path.split('/').at(-1) ?? 'catalog';
    const currentCategory = await getCategoryByPath(currentCategoryTitle);
    const filterString = generateFilterString({
      category:
        currentCategoryTitle !== 'catalog' ? currentCategory : undefined,
    });
    if (filteringType !== undefined) filterString.push(...filteringType);
    await ClientFactory.createApiRoot(ClientFactory.flowType)
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit,
          offset: (page - 1) * limit,
          filter: filterString,
          sort: sortingType ?? SortingTypes.NAMEASC,
        },
      })
      .execute()
      .then((value) => {
        data.push(...(value.body.results as ProductProjection[]));
        totalProducts = value.body.total;
      });
  }
  return { data, totalProducts };
};

const getPriceValue = (price: Price | DiscountedPrice): string => {
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

export const searchProducts = async (
  path: string,
  limit: number,
  searchValue: string,
  page: number = 1
) => {
  const data: ProductProjection[] = [];
  let totalProducts: number | undefined = 0;

  if (isValidPath(path)) {
    const currentCategoryTitle = path.split('/').at(-1) ?? 'catalog';
    const currentCategory = await getCategoryByPath(currentCategoryTitle);
    const filterString = generateFilterString({
      category:
        currentCategoryTitle !== 'catalog' ? currentCategory : undefined,
    });
    await ClientFactory.createApiRoot(ClientFactory.flowType)
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit,
          offset: (page - 1) * limit,
          filter: filterString,
          'text.en': searchValue,
          fuzzy: true,
        },
      })
      .execute()
      .then((value) => {
        data.push(...(value.body.results as ProductProjection[]));
        totalProducts = value.body.total;
      });
  }
  return { data, totalProducts };
};
