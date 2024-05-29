type ProductImg = {
  url: string;
};

type ProductInfo = {
  productName: string;
  productDescription?: string;
  productImages?: ProductImg[];
  productPrice: string | undefined;
};

export default ProductInfo;
