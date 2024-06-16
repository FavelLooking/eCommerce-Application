import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Cart,
  CentPrecisionMoney,
  DiscountCode,
} from '@commercetools/platform-sdk';
import './cart.scss';
import { getPriceValue } from '../../services/productService';
import {
  applyCarDiscount,
  changeProductCount,
  getCart,
  getPromocodes,
} from '../../services/cartService';
import CartItem from './cart_item';
import AuthService from '../../services/authService';
import { emptyCartImage, priceCurrency } from '../../utils/constants';

export default function CartPage() {
  const location = useLocation();
  const [cart, setCart] = useState<Cart>();
  const [reload, setReload] = useState(false);
  const [changeDisable, setChangeDisable] = useState(false);
  const [errorPage, setError] = useState(false);
  const [promocode, setPromocode] = useState<DiscountCode[]>();
  const { register, handleSubmit, reset } = useForm<{
    promo: string;
  }>();

  useEffect(() => {
    setReload(false);
    setChangeDisable(true);
    const response = getCart();
    if (response) {
      response.then((cartValue) => {
        if (cartValue.lineItems?.length) {
          setCart(cartValue);
          setError(false);
          setChangeDisable(false);
          getPromocodes().then((promocodeValue) => {
            setPromocode(promocodeValue.body.results);
          });
        } else {
          setError(true);
        }
      });
    } else {
      setError(true);
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

  const emptyCartMessage = (): JSX.Element => (
    <div className="cart-wrapper flex flex-column">
      <img src={emptyCartImage} alt="empty cart" className="cart-empty" />
      <Link to="/catalog" className="cart-link">
        Go to Catalog
      </Link>
    </div>
  );

  const applyDiscount: SubmitHandler<{ promo: string }> = async (data) => {
    setChangeDisable(true);
    if (cart) {
      promocode
        ?.filter((x: DiscountCode) => x.code === data.promo)
        .forEach((y: DiscountCode) => {
          applyCarDiscount(y.code, cart.id, cart.version).then((value) => {
            AuthService.saveToLocalStorage(
              'cartVersion',
              value.body.version.toString()
            );
            setChangeDisable(false);
            reset();
            setReload(true);
          });
        });
    }
    setChangeDisable(false);
    reset();
  };

  const displayAllDiscounts = () => {
    if (cart && promocode) {
      const promoResult: DiscountCode[] = [];
      cart.discountCodes.forEach((x) => {
        promoResult.push(
          promocode.filter((y: DiscountCode) => y.id === x.discountCode.id)[0]
        );
      });
      if (promoResult.length) {
        return (
          <div className="cart-applied-promo flex flex-column">
            <span>Applied promocodes:</span>
            {promoResult?.map((x: DiscountCode) => (
              <span key={x.code} className="cart-promo-key">
                {x.code}
              </span>
            ))}
          </div>
        );
      }
    }
    return (
      <div className="cart-applied-promo flex flex-column">
        <span>No active promocodes</span>
      </div>
    );
  };

  const displayPromocodes = () => (
    <div className="flex flex-column">
      <form className="flex cart-promo" onSubmit={handleSubmit(applyDiscount)}>
        <input {...register('promo')} className="cart-promocode-input" />
        <input
          type="submit"
          value="Apply"
          disabled={checkButtonDisabled()}
          className="cart-promocode-apply"
        />
      </form>
      {displayAllDiscounts()}
    </div>
  );

  return errorPage || !cart ? (
    emptyCartMessage()
  ) : (
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
        {displayPromocodes()}
      </div>
    </div>
  );
}
