export interface ImageDetailedPage {
  url: string;
}

export interface ProductDataDetailedPage {
  productName: string;
  productDescription?: string;
  productImages?: ImageDetailedPage[];
}
