import React, { useState, useEffect } from 'react';
import './detailed_product_style.scss';
import { useParams } from 'react-router-dom';
import getInfoAboutProduct from '../../services/getDetailedProductInfo';

export interface ProductImg {
  url: string;
}

export interface ProductInfo {
  productName: string;
  productDescription?: string;
  productImages?: ProductImg[];
}

function DetailedProductPage() {
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);

  useEffect(() => {
    getInfoAboutProduct(productId as string).then((data: ProductInfo) => {
      console.log('img in component ', data.productImages);
      setProductInfo(data);
    });
  }, [productId]);

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {productId}</p>
      {productInfo && (
        <div>
          <p>Product Name: {productInfo.productName}</p>
          <p>Product Description: {productInfo.productDescription}</p>
        </div>
      )}
    </div>
  );
}

export default DetailedProductPage;
