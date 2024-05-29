import ClientFactory from './clientFactory';

const getInfoAboutProduct = async (productId: string) => {
  const data = await ClientFactory.createApiRoot(ClientFactory.flowType)
    .products()
    .withId({ ID: productId })
    .get()
    .execute();

  const currentPriceObject =
    data.body.masterData.current.masterVariant.prices?.at(0);
  const centAmount = currentPriceObject?.value.centAmount;
  const fractionDigits = currentPriceObject?.value.fractionDigits;

  let currentPrice: string | undefined;

  if (centAmount !== undefined && fractionDigits !== undefined) {
    currentPrice = `${centAmount / 10 ** fractionDigits} €`;
  } else {
    currentPrice = undefined;
  }

  const productData = {
    productName: data.body.masterData.current.name.en,
    productDescription: data.body.masterData.current.metaDescription?.en,
    productImages: data.body.masterData.current.masterVariant.images,
    productPrice: currentPrice,
  };

  return productData;
};

export default getInfoAboutProduct;
