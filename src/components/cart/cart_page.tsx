import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Cart, CentPrecisionMoney } from '@commercetools/platform-sdk';
import './cart.scss';
import { getPriceValue } from '../../services/productService';
import { changeProductCount, getCart } from '../../services/cartService';
import CartItem from './cart_item';
import AuthService from '../../services/authService';
import { priceCurrency } from '../../utils/constants';

export default function CartPage() {
  const location = useLocation();
  const [cart, setCart] = useState<Cart>();
  const [reload, setReload] = useState(false);
  const [changeDisable, setChangeDisable] = useState(false);

  useEffect(() => {
    setReload(false);
    setChangeDisable(true);
    const response = getCart();
    if (response) {
      response.then((cartValue) => {
        if (cartValue.lineItems?.length) {
          setCart(cartValue);
          setChangeDisable(false);
        }
      });
    }
  }, [location, reload]);

  const getPrice = (
    original: CentPrecisionMoney | undefined,
    oldPrice: string | undefined
  ) => {
    const originalPrice = original ? getPriceValue(original) : 0;
    return oldPrice ? (
      <div className="flex flex-column">
        <span className="cart-price">{originalPrice}</span>
        <span className="cart-price cart-discounted">{oldPrice}</span>
      </div>
    ) : (
      <div className="flex">
        <span className="cart-price">{originalPrice}</span>
      </div>
    );
  };

  const checkButtonDisabled = (): boolean =>
    !cart || cart.lineItems.length === 0 || changeDisable;

  const changeCount = async (count: number, id: string) => {
    if (cart) {
      setChangeDisable(true);
      await changeProductCount(count, id, cart.id, cart.version).then(
        (newCartResponse) => {
          AuthService.saveToLocalStorage(
            'cartVersion',
            newCartResponse.body.version.toString()
          );
          setReload(true);
          setChangeDisable(false);
        }
      );
    }
  };

  const displayTotalPrice = () => {
    let oldPrice;
    if (cart?.discountOnTotalPrice) {
      const discountValue =
        cart.totalPrice.centAmount +
        cart.discountOnTotalPrice.discountedAmount.centAmount;
      const priceDigits =
        cart.discountOnTotalPrice.discountedAmount.fractionDigits;
      oldPrice = `${discountValue / 10 ** priceDigits} ${priceCurrency}`;
    }
    const resultPrice = getPrice(cart?.totalPrice ?? undefined, oldPrice);
    return <div className="flex cart-total">Total: {resultPrice}</div>;
  };

  return (
    <div>
      <div className="cart-wrapper flex flex-column">
        {cart?.lineItems?.map((x) => (
          <CartItem
            product={x}
            changeCountCallback={changeCount}
            checkButtonDisable={checkButtonDisabled}
            getPrice={getPrice}
            key={x.id}
          />
        ))}
        {displayTotalPrice()}
      </div>
    </div>
  );
}
