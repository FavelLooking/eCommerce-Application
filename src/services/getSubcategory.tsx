import ClientFactory from './clientFactory';

const categoryById = async (subCategoryId: string) => {
  // Получение данных подкатегории
  const dataSubCategory = await ClientFactory.createApiRoot(
    ClientFactory.flowType
  )
    .categories()
    .withId({ ID: subCategoryId })
    .get()
    .execute();

  const subCategory = dataSubCategory.body.name?.en;
  const parentCategoryId = dataSubCategory.body.parent?.id;

  if (parentCategoryId) {
    const dataCategory = await ClientFactory.createApiRoot(
      ClientFactory.flowType
    )
      .categories()
      .withId({ ID: parentCategoryId })
      .get()
      .execute();

    const parentCategory = dataCategory.body.name?.en;
    console.log({ parentCategory, subCategory });
  }
};

export default categoryById;
