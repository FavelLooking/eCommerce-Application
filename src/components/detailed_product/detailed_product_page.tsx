import React from 'react';
import './detailed_product_style.scss';
import { useParams } from 'react-router-dom';

function DetailedProductPage() {
  console.log(useParams());

  const { productId } = useParams();

  console.log('Rendering DetailedProductPage with productId:', productId);

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {productId}</p>
      {/* Additional code to fetch and display product details */}
    </div>
  );
}

export default DetailedProductPage;
