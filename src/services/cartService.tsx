import ClientFactory from './clientFactory';
import Currency from '../enums/cartService';

class CartService {
  static async createAnonymousCart(currency: Currency = Currency.USD) {
    const apiRoot = ClientFactory.createApiRootForAnonymous();

    const response = await apiRoot
      .me()
      .carts()
      .post({ body: { currency } })
      .execute();
    if (response) {
      const cartId = response.body.id;
      CartService.saveToLocalStorage('cart-id', cartId);
    }
    return response;
  }

  private static saveToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private static getFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }
}

export default CartService;
