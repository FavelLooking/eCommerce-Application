import React from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import {
  getProductDescription,
  getProductImage,
  getProductName,
  getProductPrice,
} from '../../services/productService';
import redirect from '../../services/redirectService';
import CreateCart from '../../utils/cart_utils/create_cart';

export default function CatalogItem(
  props: { product: ProductProjection },
  cartProductId?: string[]
) {
  const { product } = props;
  const navigate = useNavigate();
  console.log(cartProductId);

  const getPrice = (): JSX.Element => {
    const [originalPrice, discountPrice] = getProductPrice(product);

    if (!originalPrice) {
      return <div className="catalog-item-price">SOLD OUT</div>;
    }

    return discountPrice ? (
      <div className="catalog-item-price">
        <span className="catalog-price">{discountPrice}</span>
        <span className="catalog-price catalog-discounted">
          {originalPrice}
        </span>
      </div>
    ) : (
      <div className="catalog-item-price">
        <span className="catalog-price">{originalPrice}</span>
      </div>
    );
  };

  return (
    <div className="catalog-item">
      <div
        className="catalog-item-redirect"
        onClick={() =>
          redirect(product.categories.at(0)?.id as string, product.id, navigate)
        }
      >
        <img
          src={getProductImage(product)}
          alt="product"
          className="catalog-item-image"
        />
        <div className="catalog-item-info">
          <span className="catalog-item-name">{getProductName(product)}</span>
          <span className="catalog-item-description">
            {getProductDescription(product)}
          </span>
          {getPrice()}
        </div>
      </div>
      <input
        type="button"
        className="catalog-add"
        onClick={() => {
          CreateCart(product.id);
        }}
      />
    </div>
  );
}
