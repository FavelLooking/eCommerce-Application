import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './detailed_product_style.scss';
import { useParams } from 'react-router-dom';
import getInfoAboutProduct from '../../services/getDetailedProductInfo';
import NotFoundPage from '../not_found/not_found_page';
import ProductInfo from '../../types/detailed_product_types/fetch_detailed_product_types';

function DetailedProductPage() {
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [errorFetch, setErrorFetch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    getInfoAboutProduct(productId as string)
      .then((data: ProductInfo) => {
        setProductInfo(data);
      })
      .catch(() => {
        setErrorFetch(true);
      });
  }, [productId]);

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

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  if (errorFetch) {
    return (
      <div className="detailde-product-wrapper">
        <NotFoundPage />;
      </div>
    );
  }

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
                  {/* eslint-disable-next-line */}
                  <img
                    className="detailed-product__img"
                    src={image.url}
                    alt={`slide_${index + 1}`}
                    onClick={() => openModal(image.url)}
                  />
                </div>
              ))}
            </div>
            <div className="swiper-pagination"> </div>
            <div className="swiper-button-prev"> </div>
            <div className="swiper-button-next"> </div>
            <div className="swiper-scrollbar"> </div>
          </div>
          <p className="detailed-product__description">
            {productInfo.productDescription}
          </p>
          {productPrice()}
        </div>
      )}
      {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <span className="modal-close" onClick={closeModal}>
            &times;
          </span>
          <img
            className="modal-content"
            src={modalImage}
            alt="Enlarged product"
          />
        </div>
      )}
      {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */}
    </div>
  );
}

export default DetailedProductPage;
