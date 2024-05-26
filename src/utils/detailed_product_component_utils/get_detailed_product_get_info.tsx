import ClientFactory from '../../services/clientFactory';

const getInfoAboutProduct = async (productId: string) => {
  console.log(productId);
  await ClientFactory.createApiRoot(ClientFactory.flowType)
    .products()
    .withId({ ID: productId })
    .get()
    .execute()
    .then((data) => {
      console.log('fetch data', data);
      const getSelectedProductImages =
        data.body.masterData.current.masterVariant.images;
      const getSelectedProductName = data.body.masterData.current.name.en;
      const getSelectedProductDescription =
        data.body.masterData.current.metaDescription?.en;

      console.log('name', getSelectedProductName);
      console.log('description', getSelectedProductDescription);
      console.log('imgs', getSelectedProductImages);
    });
};

export default getInfoAboutProduct;
