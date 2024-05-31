import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import './catalog.scss';
import { getProducts, sortProducts } from '../../services/productService';
import Breadcrumb from './breadcrumb';
import CatalogItem from './catalog_item';

export default function CatalogPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<ProductProjection[]>();

  useEffect(() => {
    getProducts(location.pathname).then((value: ProductProjection[]) => {
      if (value.length) setData(value);
      else navigate('not-found');
    });
  }, [location, navigate]);

  const sort = async () =>
    sortProducts(location.pathname).then((value: ProductProjection[]) =>
      setData(value)
    );

  return (
    <div className="catalog_wrapper">
      <div className="some-catalog-div-with-breadcrumb-and-utils">
        <Breadcrumb />
        <div className="catalog-utils">
          <input type="button" className="catalog-button catalog-search" />
          <input type="button" className="catalog-button catalog-filter" />
          <input
            type="button"
            className="catalog-button catalog-sort"
            onClick={sort}
          />
        </div>
      </div>
      <div className="catalog_flex">
        {data?.map((item) => (
          <li key={item.id}>
            <CatalogItem product={item} />
          </li>
        ))}
      </div>
    </div>
  );
}
