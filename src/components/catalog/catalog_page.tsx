import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProductProjection } from '@commercetools/platform-sdk';
import './catalog.scss';
import { getProducts } from '../../services/productService';
import Breadcrumb from './breadcrumb';
import CatalogItem from './catalog_item';
import { FilterFields, SortingTypes } from '../../types';
import { priceCurrency, sortButtons } from '../../utils/constants';

export default function CatalogPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<ProductProjection[]>();
  const [isSort, setSort] = useState(false);
  const [isFilter, setFilter] = useState(false);

  const { register, handleSubmit } = useForm<FilterFields>();

  useEffect(() => {
    getProducts(location.pathname).then((value: ProductProjection[]) => {
      sessionStorage.removeItem('price');
      sessionStorage.removeItem('page');
      sessionStorage.removeItem('sort');
      if (value.length) setData(value);
      else navigate('not-found');
    });
  }, [location, navigate]);

  const toogleSettings = (toogleSort: boolean, toogleFilter: boolean) => {
    setSort(toogleSort);
    setFilter(toogleFilter);
  };

  const generateFilterString = (): string[] => [
    sessionStorage.getItem('price') ?? '',
    sessionStorage.getItem('page') ?? '',
  ];

  const generateSortingString = (): string =>
    sessionStorage.getItem('sort') ?? SortingTypes.NAMEASC;

  const changeData = async () => {
    toogleSettings(false, false);
    getProducts(
      location.pathname,
      generateSortingString(),
      generateFilterString()
    ).then((value: ProductProjection[]) => setData(value));
  };

  const sort = async (sortingType: string) => {
    sessionStorage.setItem('sort', sortingType);
    await changeData();
  };

  const filter: SubmitHandler<FilterFields> = async (filterData) => {
    const price = filterData.price.split(' ');
    if (price.length === 5) {
      // ADD STRING HERE
      sessionStorage.setItem('price', ``);
    } else {
      sessionStorage.removeItem('price');
    }
    const len = filterData.length.split(' ');
    if (len.length === 5) {
      // ADD STRING HERE
      sessionStorage.setItem('page', ``);
    } else {
      sessionStorage.removeItem('page');
    }
    await changeData();
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
        <form id="filter-form" onSubmit={handleSubmit(filter)}>
          <select {...register('price')}>
            <option>any price</option>
            <option>from 0 to 10 {priceCurrency}</option>
            <option>from 10 to 20 {priceCurrency}</option>
            <option>from 20 to 50 {priceCurrency}</option>
            <option>from 50 to 100 {priceCurrency}</option>
            <option>from 100 to 200 {priceCurrency}</option>
          </select>
          <select {...register('length')}>
            <option>any length</option>
            <option>from 0 to 40 pages</option>
            <option>from 40 to 100 pages</option>
            <option>from 100 to 300 pages</option>
            <option>from 300 to 500 pages</option>
          </select>
          <input type="submit" />
        </form>
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
