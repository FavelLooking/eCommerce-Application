import priceCalculation from '../utils/detailed_product_component_utils/price_calculation';
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
  const centAmountDiscount = currentPriceObject?.discounted?.value.centAmount;
  const fractionDigitsDiscount =
    currentPriceObject?.discounted?.value.fractionDigits;

  console.log(currentPriceObject);

  let currentPrice: string | undefined;
  let discountedPrice: string | undefined;

  if (centAmount !== undefined && fractionDigits !== undefined) {
    currentPrice = priceCalculation(centAmount, fractionDigits);
  } else {
    currentPrice = undefined;
  }

  if (
    centAmountDiscount !== undefined &&
    fractionDigitsDiscount !== undefined
  ) {
    discountedPrice = priceCalculation(
      centAmountDiscount,
      fractionDigitsDiscount
    );
  }

  const productData = {
    productName: data.body.masterData.current.name.en,
    productDescription: data.body.masterData.current.metaDescription?.en,
    productImages: data.body.masterData.current.masterVariant.images,
    productPrice: currentPrice,
    productDiscount: discountedPrice,
  };

  return productData;
};

export default getInfoAboutProduct;
