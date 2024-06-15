import { LineItem } from '@commercetools/platform-sdk';
import React from 'react';
import { getPriceValue } from '../../services/productService';

type CartItemProps = {
  product: LineItem;
  getPrice: Function;
};

export default function CartItem(props: CartItemProps) {
  const { product, getPrice } = props;

  return (
    <div className="cart-item flex">
      <img
        src={product?.variant?.images?.at(0)?.url}
        alt="product"
        className="cart-item-image"
      />
      <div className="cart-item-info flex flex-column">
        {product.name.en}
        <div className="flex">
          <div className="flex flex-column">
            <span className="cart-item-price-ea">
              {getPriceValue(product.price.value)}/ea
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-column cart-item-price">
        {getPrice(
          product.totalPrice,
          product.discountedPricePerQuantity.length
            ? getPriceValue(product.price.value, product.quantity)
            : undefined
        )}
      </div>
    </div>
  );
}
