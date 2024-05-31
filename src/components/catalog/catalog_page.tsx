import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import './catalog.scss';
import { getProducts } from '../../services/productService';
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

  return (
    <div className="catalog_wrapper">
      <Breadcrumb />
      <div className="catalog_flex">
        {data?.map((item) => (
          <li key={item.id}>
            {/* There is a test rout, after we'll change it */}
            <Link to={`category/subcategory/${item.id}`}>
              <CatalogItem product={item} />
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}
