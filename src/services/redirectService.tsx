import { NavigateFunction } from 'react-router-dom';
import categoryById from './getSubcategory';

const redirect = async (
  categoryId: string,
  productId: string,
  navigate: NavigateFunction
) => {
  const categoryResult = await categoryById(categoryId);

  if (categoryResult.parentCategory && categoryResult.subCategory) {
    navigate(
      `/catalog/${categoryResult.parentCategory}/${categoryResult.subCategory}/${productId}`
    );
  }
};

export default redirect;
