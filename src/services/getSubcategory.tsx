import ClientFactory from './clientFactory';

const categoryById = async (subCategoryId: string) => {
  const dataSubCategory = await ClientFactory.createApiRoot(
    ClientFactory.flowType
  )
    .categories()
    .withId({ ID: subCategoryId })
    .get()
    .execute();

  const subCategory = dataSubCategory.body.name?.en.toLowerCase();
  const parentCategoryId = dataSubCategory.body.parent?.id;

  let parentCategory: string | undefined;

  if (parentCategoryId) {
    const dataCategory = await ClientFactory.createApiRoot(
      ClientFactory.flowType
    )
      .categories()
      .withId({ ID: parentCategoryId })
      .get()
      .execute();

    parentCategory = dataCategory.body.name?.en.toLowerCase();
  }
  return { parentCategory, subCategory };
};

export default categoryById;
