import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import './catalog.scss';
import { getProducts } from '../../services/productService';
import Breadcrumb from './breadcrumb';
import CatalogItem from './catalog_item';
import CatalogUtils from './catalog_utils';

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

  return (
    <div className="catalog_wrapper">
      <div className="some-catalog-div-with-breadcrumb-and-utils">
        <Breadcrumb />
        <CatalogUtils />
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
