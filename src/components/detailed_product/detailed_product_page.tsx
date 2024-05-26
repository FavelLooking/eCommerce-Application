import React from 'react';
import { useParams } from 'react-router-dom';
import './detailed_product_style.scss';
// import getInfoAboutProduct from '../../services/getDetailedProductInfo';
// import { ProductDataDetailedPage } from '../../interfaces/detailed_product_page_interfaces/detailed_product_page_interfaces';

function DetailedProductPage() {
  console.log(useParams());
  // const { productId } = useParams();
  // const [productData, setProductData] =
  //   useState<ProductDataDetailedPage | null>(null);

  // useEffect(() => {
  //   if (productId) {
  //     getInfoAboutProduct(productId).then((data) => {
  //       setProductData(data);
  //     });
  //   }
  // }, [productId]);

  return (
    <div className="detailed-product-wrapper">
      {/* <h2 className="detailed-product__name">{productData?.productName}</h2>
      <img
        src={productData?.productImages?.[0].url}
        alt="product_img"
        className="detailed-product__img"
      />
      <p className="detailed-product__description">
        {productData?.productDescription}
      </p> */}
    </div>
  );
}

export default DetailedProductPage;
