import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './detailed_product_style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import getInfoAboutProduct from '../../services/getDetailedProductInfo';
import ProductInfo from '../../types/detailed_product_types/fetch_detailed_product_types';

function DetailedProductPage() {
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getInfoAboutProduct(productId as string)
      .then((data: ProductInfo) => {
        setProductInfo(data);
      })
      .catch(() => {
        navigate('not-found');
      });
  }, [navigate, productId]);

  useEffect(() => {
    if (productInfo) {
      // eslint-disable-next-line
      const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination],
        direction: 'horizontal',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  }, [productInfo]);

  useEffect(() => {
    if (isModalOpen) {
      // eslint-disable-next-line
      new Swiper('.swiper-modal', {
        modules: [Navigation, Pagination],
        initialSlide: startIndex,
        direction: 'horizontal',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  }, [isModalOpen, startIndex]);

  const openModal = (index: number) => {
    setIsModalOpen(true);
    setStartIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const productPrice = () => {
    if (!productInfo?.productPrice) {
      return (
        <div className="detailed-product__price-wrapper">
          <div className="detailed-product__price-sold-out">SOLD OUT</div>
        </div>
      );
    }

    return productInfo.productDiscount ? (
      <div className="detailed-product__price-wrapper">
        <div className="detailed-product__price">
          {productInfo.productDiscount}
        </div>
        <div className="detailed-product__price-discount">
          {productInfo.productPrice}
        </div>
      </div>
    ) : (
      <div className="detailed-product__price-wrapper">
        <div className="detailed-product__price">
          {productInfo.productPrice}
        </div>
      </div>
    );
  };

  return (
    <div className="detailde-product-wrapper">
      {productInfo && (
        <div className="detailde-product">
          <h2 className="detailed-product__name">{productInfo.productName}</h2>
          <div className="swiper">
            <div className="swiper-wrapper">
              {productInfo.productImages?.map((image, index) => (
                // eslint-disable-next-line
                <div className="swiper-slide" key={index}>
                  <img
                    className="detailed-product__img"
                    src={image.url}
                    alt={`slide_${index + 1}`}
                    onClick={() => openModal(index)}
                  />
                </div>
              ))}
            </div>
            <div className="swiper-pagination"> </div>
            <div className="swiper-button-prev"> </div>
            <div className="swiper-button-next"> </div>
          </div>
          <p className="detailed-product__description">
            {productInfo.productDescription}
          </p>
          {productPrice()}
        </div>
      )}
      {isModalOpen && (
        <div className="modal">
          <span className="modal-close" onClick={closeModal}>
            &times;
          </span>
          <div className="swiper swiper-modal">
            <div className="swiper-wrapper">
              {productInfo?.productImages?.map((image, index) => (
                // eslint-disable-next-line
                <div className="swiper-slide" key={index}>
                  <img
                    className="modal-content"
                    src={image.url}
                    alt={`slide_${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="swiper-pagination"> </div>
            <div className="swiper-button-prev"> </div>
            <div className="swiper-button-next"> </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailedProductPage;
