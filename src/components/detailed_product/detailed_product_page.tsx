import React, { useState, useEffect } from 'react';
import './detailed_product_style.scss';
import { useParams } from 'react-router-dom';
import getInfoAboutProduct from '../../services/getDetailedProductInfo';
import NotFoundPage from '../not_found/not_found_page';
import ProductInfo from '../../types/detailed_product_types/fetch_detailed_product_types';

function DetailedProductPage() {
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [errorFetch, setErrorFetch] = useState(false);

  useEffect(() => {
    getInfoAboutProduct(productId as string)
      .then((data: ProductInfo) => {
        setProductInfo(data);
      })
      .catch(() => {
        setErrorFetch(true);
      });
  }, [productId]);

  if (errorFetch) {
    return <NotFoundPage />;
  }

  return (
    <div className="detailde-product-wrapper">
      {productInfo && (
        <div className="detailde-product">
          <h2 className="detailed-product__name">{productInfo.productName}</h2>
          <img
            className="detailed-product__img"
            src={productInfo.productImages?.at(0)?.url}
            alt="detailed_img"
          />
          <p className="detailed-product__description">
            {productInfo.productDescription}
          </p>
        </div>
      )}
    </div>
  );
}

export default DetailedProductPage;
