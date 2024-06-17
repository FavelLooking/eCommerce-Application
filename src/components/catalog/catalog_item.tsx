import React, { useState } from 'react';
import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  getProductDescription,
  getProductImage,
  getProductName,
  getProductPrice,
} from '../../services/productService';
import redirect from '../../services/redirectService';
import CreateCart from '../../utils/cart_utils/create_cart';
import CartService, { getCart } from '../../services/cartService';

export default function CatalogItem(props: { product: ProductProjection }) {
  const { product } = props;
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(
    CartService.cartProductid?.includes(product.id) || false
  );
  const setCounter: React.Dispatch<React.SetStateAction<number>> =
    useOutletContext();

  const handleAddToCart = () => {
    CreateCart(product.id).then(() => {
      getCart()?.then((cartValue: Cart) =>
        setCounter(cartValue.lineItems.length ?? 0)
      );
    });
    setIsInCart(true);
  };

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
          redirect(product.categories[0]?.id as string, product.id, navigate)
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
        className={`catalog-add ${isInCart ? 'in-cart' : ''}`}
        onClick={handleAddToCart}
        disabled={isInCart}
      />
    </div>
  );
}
