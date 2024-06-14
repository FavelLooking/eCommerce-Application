import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProductProjection } from '@commercetools/platform-sdk';
import './catalog.scss';
import { getProducts, searchProducts } from '../../services/productService';
import Breadcrumb from './breadcrumb';
import CatalogItem from './catalog_item';
import { FilterFields, SortingTypes } from '../../types';
import { lengthFilter, priceFilter, sortButtons } from '../../utils/constants';
import AuthService from '../../services/authService';
import CartService from '../../services/cartService';

export default function CatalogPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<ProductProjection[]>();
  const [isSort, setSort] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isFilter, setFilter] = useState(false);

  const { register, handleSubmit, reset } = useForm<FilterFields>();

  const toogleSettings = (toogleSort: boolean, toogleFilter: boolean) => {
    setSort(toogleSort);
    setFilter(toogleFilter);
  };

  const clearUtilsStorage = () => {
    sessionStorage.removeItem('price');
    sessionStorage.removeItem('page');
    sessionStorage.removeItem('sort');
  };

  useEffect(() => {
    toogleSettings(false, false);
    getProducts(location.pathname).then((value: ProductProjection[]) => {
      clearUtilsStorage();
      if (value.length) setData(value);
      else navigate('not-found');
    });
  }, [location, navigate]);

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
      sessionStorage.setItem(
        'price',
        `variants.price.centAmount:range (${Number(price[1]) * 100} to ${Number(price[3]) * 100})`
      );
    } else {
      sessionStorage.removeItem('price');
    }
    const len = filterData.length.split(' ');
    if (len.length === 5) {
      sessionStorage.setItem(
        'page',
        `variants.attributes.len:range (${len[1]} to ${len[3]})`
      );
    } else {
      sessionStorage.removeItem('page');
    }
    await changeData();
  };

  const clearFilters = async () => {
    clearUtilsStorage();
    reset();
    await changeData();
  };

  const search = async () => {
    clearUtilsStorage();
    reset();
    searchProducts(location.pathname, searchValue).then(
      (value: ProductProjection[]) => setData(value)
    );
  };

  useEffect(() => {
    if (AuthService.getFromLocalStorage('cartId')) {
      CartService.getCart(AuthService.getFromLocalStorage('cartId') as string);
    }
  }, []);

  return (
    <div className="catalog_wrapper">
      <div className="some-catalog-div-with-breadcrumb-and-utils">
        <Breadcrumb />
        <div className="catalog-utils">
          <input
            type="text"
            className="catalog-search"
            onInput={(e) =>
              setSearchValue((e.target as HTMLInputElement).value)
            }
          />
          <input
            type="button"
            className="catalog-button catalog-toogle-search"
            onClick={search}
          />
          <input
            type="button"
            className="catalog-button catalog-toogle-filter"
            onClick={() => toogleSettings(false, !isFilter)}
          />
          <input
            type="button"
            className="catalog-button catalog-toogle-sort"
            onClick={() => toogleSettings(!isSort, false)}
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
              <option key={`catalog-filtering-price-${x.split(' ').join()}`}>
                {x}
              </option>
            ))}
          </select>
          <select {...register('length')}>
            {lengthFilter.map((x: string) => (
              <option key={`catalog-filtering-length-${x.split(' ').join()}`}>
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
      {data?.length ? (
        <div className="catalog_flex">
          {data?.map((item) => (
            <li key={item.id}>
              <CatalogItem product={item} />
            </li>
          ))}
        </div>
      ) : (
        <div className="catalog-error">There are no matching products</div>
      )}
    </div>
  );
}
