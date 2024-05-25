import { Product } from '@commercetools/platform-sdk';
import ClientFactory from './clientFactory';

export const getProducts = async () => {
  const data: Product[] = [];
  await ClientFactory.createApiRoot(ClientFactory.flowType)
    .products()
    .get()
    .execute()
    .then((value) => {
      data.push(...(value.body.results as Product[]));
    });
  return data;
};

export const getProductImage = (product: Product): string =>
  product?.masterData?.current?.masterVariant?.images?.at(0)?.url ?? '';

export const getProductName = (product: Product): string =>
  product.masterData.current.name.en;

export const getProductDescription = (product: Product): string =>
  product.masterData.current.metaDescription?.en ?? '';
