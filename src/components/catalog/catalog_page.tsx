import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import './catalog.scss';
import { getProducts } from '../../services/productService';
import Breadcrumb from './breadcrumb';
import CatalogItem from './catalog_item';

export default function CatalogPage() {
  const location = useLocation();
  const [data, setData] = useState<ProductProjection[] | null>(null);

  useEffect(() => {
    getProducts(location.pathname).then((value: ProductProjection[]) =>
      setData(value)
    );
  }, [location]);

  return (
    <div className="catalog_wrapper">
      <Breadcrumb />
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
