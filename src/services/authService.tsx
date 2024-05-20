import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { storageLoginError } from '../utils/constants';
import ClientFactory from './clientFactory';
import AuthManager from './authManager';

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

  static addressId: string | undefined;

  static signUpCustomer = async (
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    country: string,
    city: string,
    streetName: string,
    postalCode: string
  ) => {
    try {
      const clientAnonymous = ClientFactory.getClient('anonymous');
      const apiRoot = createApiBuilderFromCtpClient(
        clientAnonymous
      ).withProjectKey({
        projectKey: AuthManager.getProjectKey(),
      });

      const response = await apiRoot
        .me()
        .signup()
        .post({
          body: {
            email: username,
            password,
            firstName,
            lastName,
            dateOfBirth,
            addresses: [
              {
                country,
                city,
                streetName,
                postalCode,
              },
            ],
          },
        })
        .execute();
      AuthService.addressId = response.body.customer.addresses[0].id;

      return response;
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      localStorage.setItem('ErrorMessage', errorMessage);
      throw error;
    }
  };

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
