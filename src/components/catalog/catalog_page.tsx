import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import './catalog.scss';
import { getProducts, sortProducts } from '../../services/productService';
import Breadcrumb from './breadcrumb';
import CatalogItem from './catalog_item';
import { SortingTypes } from '../../types';
import categoryById from '../../services/getSubcategory';

export default function CatalogPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<ProductProjection[]>();
  const [isSort, setSort] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts(location.pathname);
      if (products.length) {
        setData(products);
      } else {
        navigate('not-found');
      }
    };
    fetchData();
  }, [location, navigate]);

  const sort = async (sortingType: string) => {
    setSort(false);
    const sortedData = await sortProducts(location.pathname, sortingType);
    setData(sortedData);
  };

  const redirect = async (categoryId: string, productId: string) => {
    const categoryResult = await categoryById(categoryId);
    navigate(
      `/catalog/${categoryResult.parentCategory}/${categoryResult.subCategory}/${productId}`
    );
  };

  return (
    <div className="catalog_wrapper">
      <div className="some-catalog-div-with-breadcrumb-and-utils">
        <Breadcrumb />
        <div className="catalog-utils">
          <input
            type="button"
            className="catalog-button catalog-toogle-search"
          />
          <input
            type="button"
            className="catalog-button catalog-toogle-filter"
          />
          <input
            type="button"
            className="catalog-button catalog-toogle-sort"
            onClick={() => setSort(!isSort)}
          />
        </div>
      </div>
      <div
        className="catalog-sorting"
        style={{ display: `${isSort ? '' : 'none'}` }}
      >
        <input
          type="button"
          value="name ↑"
          onClick={() => sort(SortingTypes.NAMEASC)}
        />
        <input
          type="button"
          value="name ↓"
          onClick={() => sort(SortingTypes.NAMEDESC)}
        />
        <input
          type="button"
          value="price ↑"
          onClick={() => sort(SortingTypes.PRICEASC)}
        />
        <input
          type="button"
          value="price ↓"
          onClick={() => sort(SortingTypes.PRICEDESC)}
        />
      </div>
      <div className="catalog_flex">
        {data?.map((item) => (
          <li
            key={item.id}
            onClick={() =>
              redirect(item.categories.at(0)?.id as string, item.id)
            }
          >
            <CatalogItem product={item} />
          </li>
        ))}
      </div>
    </div>
  );
}
