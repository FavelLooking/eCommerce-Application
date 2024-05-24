import { storageLoginError } from '../utils/constants';
import ClientFactory from './clientFactory';
import { tokenStore } from './authManager';

class AuthService {
  static async loginUser(username: string, password: string) {
    try {
      AuthService.removeFromLocalStorage(storageLoginError);

      const apiRootWithPassword = await ClientFactory.createApiRoot(
        'password',
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
      await this.getCustomersDetails();

      await AuthService.saveToLocalStorage(
        'customerId',
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
      const apiRootForAnonymous = ClientFactory.createApiRoot('anonymous');

      const response = await apiRootForAnonymous
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
      ClientFactory.resetClients();
      tokenStore.clear();
      await AuthService.loginUser(username, password);

      const [{ id: shippingId }, billingAddress] =
        response.body.customer.addresses;
      this.shippingId = shippingId;
      if (billingAddress) {
        this.billingId = billingAddress.id;
      }
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      localStorage.setItem('ErrorMessage', errorMessage);
    }
  };

  static getCustomersDetails = async () => {
    const apiRoot = ClientFactory.createApiRoot('password');
    return apiRoot.me().get().execute();
  };

  static async logoutUser() {
    this.removeFromLocalStorage('customerId');
    this.removeFromLocalStorage('IsUserLogined');
    ClientFactory.resetClients();
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
