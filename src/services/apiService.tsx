import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ClientFactory from './clientFactory';
import AuthManager from './authManager';

class ApiService {
  static async createAnonymousCart(currency: string = 'USD') {
    const clientAnonymous = ClientFactory.getClient('anonymous');
    const apiRoot = createApiBuilderFromCtpClient(
      clientAnonymous
    ).withProjectKey({
      projectKey: AuthManager.getProjectKey(),
    });

    const response = await apiRoot
      .me()
      .carts()
      .post({ body: { currency } })
      .execute();
    if (response) {
      const cartId = response.body.id;
      ApiService.saveToLocalStorage('cart-id', cartId);
    }
    return response;
  }

  static async loginUser(username: string, password: string) {
    try {
      const apiRootWithPassword = ClientFactory.createApiRootWithPassword(
        username,
        password
      );

      const loginResponse = await apiRootWithPassword
        .me()
        .login()
        .post({
          body: {
            email: username,
            password,
          },
        })
        .execute();

      ApiService.saveToLocalStorage(
        `customerId`,
        loginResponse.body.customer.id
      );
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      ApiService.saveToLocalStorage('ErrorMessage', errorMessage);
    }
  }

  private static saveToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}

export default ApiService;
