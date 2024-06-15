import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Cart, CentPrecisionMoney } from '@commercetools/platform-sdk';
import './cart.scss';
import { getPriceValue } from '../../services/productService';
import { getCart } from '../../services/cartService';
import CartItem from './cart_item';

export default function CartPage() {
  const location = useLocation();
  const [cart, setCart] = useState<Cart>();

  useEffect(() => {
    const response = getCart();
    if (response) {
      response.then((cartValue) => {
        if ((cartValue as unknown as Cart).lineItems?.length) {
          setCart(cartValue as unknown as Cart);
        }
      });
    }
  }, [location]);

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

  return (
    <div>
      <div className="cart-wrapper flex flex-column">
        {cart?.lineItems?.map((x) => (
          <CartItem product={x} getPrice={getPrice} key={x.id} />
        ))}
      </div>
    </div>
  );
}
