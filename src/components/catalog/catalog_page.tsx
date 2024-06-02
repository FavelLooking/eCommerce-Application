import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProductProjection } from '@commercetools/platform-sdk';
import './catalog.scss';
import { getProducts } from '../../services/productService';
import Breadcrumb from './breadcrumb';
import CatalogItem from './catalog_item';
import { FilterFields, SortingTypes } from '../../types';
import { priceFilter, sortButtons } from '../../utils/constants';

export default function CatalogPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<ProductProjection[]>();
  const [isSort, setSort] = useState(false);
  const [isFilter, setFilter] = useState(false);

  const { register, handleSubmit, reset } = useForm<FilterFields>();

  useEffect(() => {
    getProducts(location.pathname).then((value: ProductProjection[]) => {
      sessionStorage.removeItem('price');
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
      sessionStorage.setItem(
        'price',
        `variants.price.centAmount:range (${Number(price[1]) * 100} to ${Number(price[3]) * 100})`
      );
    } else {
      sessionStorage.removeItem('price');
    }
    await changeData();
  };

  const clearFilters = async () => {
    sessionStorage.removeItem('price');
    sessionStorage.removeItem('page');
    reset();
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
            {priceFilter.map((x: string) => (
              <option key={`catalog-filtering-${x.split(' ').join()}`}>
                {x}
              </option>
            ))}
          </select>
          <input type="submit" />
          <input type="button" value="Reset Filters" onClick={clearFilters} />
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
