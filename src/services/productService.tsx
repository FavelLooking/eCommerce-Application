import {
  ProductProjection,
  Category,
  CentPrecisionMoney,
  TypedMoney,
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
  sortingType: string | undefined = undefined,
  filteringType: string[] | undefined = undefined
) => {
  const data: ProductProjection[] = [];
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
          limit: 500,
          filter: filterString,
          sort: sortingType ?? SortingTypes.NAMEASC,
        },
      })
      .execute()
      .then((value) => {
        data.push(...(value.body.results as ProductProjection[]));
      });
  }
  return data;
};

export const getPriceValue = (
  price: TypedMoney | CentPrecisionMoney,
  quantity: number = 1
): string => {
  const priceCents = price.centAmount;
  const priceDigits = price.fractionDigits;

  return `${(quantity * priceCents) / 10 ** priceDigits} ${priceCurrency}`;
};

export const getProductPrice = (
  product: ProductProjection
): [string | undefined, string | undefined] => {
  const price = product.masterVariant.prices?.at(0);
  if (!price) {
    return [undefined, undefined];
  }

  const originalPrice = getPriceValue(price.value);
  const discountPrice = price.discounted
    ? getPriceValue(price.discounted.value)
    : undefined;

  return [originalPrice, discountPrice];
};

export const getProductImage = (product: ProductProjection): string =>
  product?.masterVariant?.images?.at(0)?.url ?? '';

export const getProductName = (product: ProductProjection): string =>
  product.name.en;

export const getProductDescription = (product: ProductProjection): string =>
  product.metaDescription?.en ?? '';

export const searchProducts = async (path: string, searchValue: string) => {
  const data: ProductProjection[] = [];
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
          limit: 500,
          filter: filterString,
          'text.en': searchValue,
          fuzzy: true,
        },
      })
      .execute()
      .then((value) => {
        data.push(...(value.body.results as ProductProjection[]));
      });
  }
  return data;
};
