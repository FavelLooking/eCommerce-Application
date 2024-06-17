import { LineItem } from '@commercetools/platform-sdk';
import React from 'react';
import { deleteText, minusText, plusText } from '../../utils/constants';
import { getPriceValue } from '../../services/productService';

type CartItemProps = {
  product: LineItem;
  changeCountCallback: Function;
  checkButtonDisable: Function;
  getPrice: Function;
};

export default function CartItem(props: CartItemProps) {
  const { product, changeCountCallback, checkButtonDisable, getPrice } = props;

  const checkMinusDisabled = (): boolean =>
    checkButtonDisable() || product.quantity < 2;

  const checkPlusDisabled = (): boolean =>
    checkButtonDisable() || product.quantity > 9;

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
            <div className="flex count-contol">
              <input
                type="button"
                className="cart-button"
                value={minusText}
                disabled={checkMinusDisabled()}
                onClick={() =>
                  changeCountCallback(product.quantity - 1, product.id)
                }
              />
              <span>{product.quantity}</span>
              <input
                type="button"
                className="cart-button"
                value={plusText}
                disabled={checkPlusDisabled()}
                onClick={() =>
                  changeCountCallback(product.quantity + 1, product.id)
                }
              />
            </div>
            <span className="cart-item-price-ea">
              {getPriceValue(product.price.value)}/ea
            </span>
          </div>
          <input
            type="button"
            className="cart-button flex"
            value={deleteText}
            disabled={checkButtonDisable()}
            onClick={() => changeCountCallback(0, product.id)}
          />
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
