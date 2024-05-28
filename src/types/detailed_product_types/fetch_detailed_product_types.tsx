type ProductImg = {
  url: string;
};

type ProductInfo = {
  productName: string;
  productDescription?: string;
  productImages?: ProductImg[];
};

export default ProductInfo;
