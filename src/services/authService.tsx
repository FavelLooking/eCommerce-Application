import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { storageLoginError } from '../utils/constants';
import ClientFactory from './clientFactory';
import { tokenStore, AuthManager } from './authManager';

const clientAnonymous = ClientFactory.getClient('anonymous');
const apiRoot = createApiBuilderFromCtpClient(clientAnonymous).withProjectKey({
  projectKey: AuthManager.getProjectKey(),
});

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

  static shippingId: string | undefined;

  static billingId: string | undefined;

  static signUpCustomer = async (
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    shippingCountry: string,
    shippingCity: string,
    shippingStreet: string,
    shippingPostalCode: string,
    billingCity?: string,
    billingStreet?: string,
    billingCountry?: string,
    billingPostalCode?: string
  ) => {
    try {
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
                country: shippingCountry,
                city: shippingCity,
                streetName: shippingStreet,
                postalCode: shippingPostalCode,
              },
              ...(billingCity &&
              billingStreet &&
              billingCountry &&
              billingPostalCode
                ? [
                    {
                      country: billingCountry,
                      city: billingCity,
                      streetName: billingStreet,
                      postalCode: billingPostalCode,
                    },
                  ]
                : []),
            ],
          },
        })
        .execute();

      const [{ id: shippingId }, billingAddress] =
        response.body.customer.addresses;
      if (billingAddress) {
        this.billingId = billingAddress.id;
        this.shippingId = shippingId;
      }

      return response;
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      localStorage.setItem('ErrorMessage', errorMessage);
      throw error;
    }
  };

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
