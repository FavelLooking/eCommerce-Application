import React from 'react';
import { useLocation } from 'react-router-dom';

function DetailedProductPage() {
  const location = useLocation();
  const productData = location.state;

  console.log('render component', productData);
  return (
    <div className="detailed-product-wrapper">
      <h2 className="detailed-product__name">{productData.productName}</h2>
      <img
        src={productData.productImages}
        alt="product_img"
        className="detailed-product__img"
      />
      <p className="detailed-product__description">
        {productData.productDescription}
      </p>
    </div>
  );
}

export default DetailedProductPage;
