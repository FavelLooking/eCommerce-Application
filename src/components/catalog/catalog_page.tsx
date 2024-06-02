import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import './catalog.scss';
import { getProducts } from '../../services/productService';
import Breadcrumb from './breadcrumb';
import CatalogItem from './catalog_item';
import { SortingTypes } from '../../types';
import { sortButtons } from '../../utils/constants';

export default function CatalogPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<ProductProjection[]>();
  const [isSort, setSort] = useState(false);
  const [isFilter, setFilter] = useState(false);

  useEffect(() => {
    getProducts(location.pathname).then((value: ProductProjection[]) => {
      if (value.length) setData(value);
      else navigate('not-found');
    });
  }, [location, navigate]);

  const toogleSettings = (toogleSort: boolean, toogleFilter: boolean) => {
    setSort(toogleSort);
    setFilter(toogleFilter);
  };

  const sort = async (sortingType: string) => {
    toogleSettings(false, false);
    sessionStorage.setItem('sort', sortingType);
    getProducts(
      location.pathname,
      sortingType,
      sessionStorage.getItem('filter') ?? ''
    ).then((value: ProductProjection[]) => setData(value));
  };

  const filter = async (filteringType: string) => {
    toogleSettings(false, false);
    sessionStorage.setItem('filter', filteringType);
    getProducts(
      location.pathname,
      sessionStorage.getItem('sort') ?? SortingTypes.NAMEASC,
      filteringType
    ).then((value: ProductProjection[]) => setData(value));
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
            onClick={() => toogleSettings(false, true)}
          />
          <input
            type="button"
            className="catalog-button catalog-toogle-sort"
            onClick={() => toogleSettings(true, false)}
          />
        </div>
      </div>
      <div
        className="catalog-filtering"
        style={{ display: `${isFilter ? '' : 'none'}` }}
      >
        <div role="presentation" onClick={() => filter('')}>
          PriceFilter
        </div>
        <div role="presentation" onClick={() => filter('')}>
          CauntOfPagesFilter
        </div>
        <div role="presentation" onClick={() => filter('')}>
          Publisher
        </div>
      </div>
      <div
        className="catalog-sorting"
        style={{ display: `${isSort ? '' : 'none'}` }}
      >
        {sortButtons.map((x) => (
          <input
            key={`sort-${x.sort.trim()}`}
            type={x.type}
            value={x.value}
            onClick={() => sort(x.sort)}
          />
        ))}
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
