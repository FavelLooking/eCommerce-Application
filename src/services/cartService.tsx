import AuthService from './authService';
import ClientFactory from './clientFactory';

export default class CartService {
  static async createCart() {
    try {
      const apiRoot = await ClientFactory.createApiRoot(ClientFactory.flowType);

      const cartResponse = await apiRoot
        .me()
        .carts()
        .post({
          body: {
            currency: 'EUR',
          },
        })
        .execute();
      await AuthService.saveToLocalStorage('cartId', cartResponse.body.id);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('cartError', errorMessage);
    }
  }

  static addItem() {
    console.log('add item');
  }
}
