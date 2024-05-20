import { storageLoginError } from '../utils/constants';
import ClientFactory from './clientFactory';
import { tokenStore } from './authManager';

class AuthService {
  static async loginUser(username: string, password: string) {
    try {
      AuthService.removeFromLocalStorage(storageLoginError);

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

      AuthService.saveToLocalStorage(
        `customerId`,
        loginResponse.body.customer.id
      );
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage(storageLoginError, errorMessage);
    }
  }

  static async logoutUser() {
    this.removeFromLocalStorage('customerId');
    this.removeFromLocalStorage('IsUserLogined');
    tokenStore.clear();
  }

  static saveToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  static getFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  static removeFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }
}

export default AuthService;
