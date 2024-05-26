import ClientFactory from '../../services/clientFactory';

const getInfoAboutProduct = async (productId: string) => {
  try {
    const data = await ClientFactory.createApiRoot(ClientFactory.flowType)
      .products()
      .withId({ ID: productId })
      .get()
      .execute();

    const productData = {
      productName: data.body.masterData.current.name.en,
      productDescription: data.body.masterData.current.metaDescription?.en,
      productImages: data.body.masterData.current.masterVariant.images,
    };

    return productData;
  } catch (error) {
    console.error('Failed to fetch product data:', error);
    throw error;
  }
};

export default getInfoAboutProduct;
