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
      await AuthService.saveToLocalStorage(
        'cartVersion',
        cartResponse.body.version.toString()
      );
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('cartError', errorMessage);
    }
  }

  static async addItem(item: string) {
    const cartId = AuthService.getFromLocalStorage('cartId') as string;
    const cartVersion = parseInt(
      AuthService.getFromLocalStorage('cartVersion') as string,
      10
    );

    try {
      const apiRoot = await ClientFactory.createApiRoot(ClientFactory.flowType);

      const updateResponse = await apiRoot
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version: cartVersion,
            actions: [
              {
                action: 'addLineItem',
                productId: item,
                variantId: 1,
                quantity: 1,
              },
            ],
          },
        })
        .execute();
      await AuthService.saveToLocalStorage(
        'cartVersion',
        updateResponse.body.version.toString()
      );
      console.log(updateResponse);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('cartError', errorMessage);
    }
  }
}
