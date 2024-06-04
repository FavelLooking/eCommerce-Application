import { storageLoginError } from '../utils/constants';
import ClientFactory from './clientFactory';
import { tokenStore } from './authManager';
import { ExtendedCustomerDraft } from '../interfaces/authService';

class AuthService {
  static async loginUser(username: string, password: string) {
    try {
      ClientFactory.resetClients();
      tokenStore.clear();
      AuthService.removeFromLocalStorage(storageLoginError);
      ClientFactory.flowType = 'password';

      const apiRoot = await ClientFactory.createApiRoot(
        ClientFactory.flowType,
        username,
        password
      );

      const loginResponse = await apiRoot
        .me()
        .login()
        .post({
          body: {
            email: username,
            password,
          },
        })
        .execute();
      await AuthService.saveToLocalStorage(
        'customerId',
        loginResponse.body.customer.id
      );
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      ClientFactory.resetClients();
      ClientFactory.flowType = 'anonymous';
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
    billingPostalCode?: string,
    switchStateUseAsShipping?: Boolean,
    switchStateDefaultShipping?: Boolean,
    switchStateDefaultBilling?: Boolean
  ) => {
    try {
      const apiRoot = ClientFactory.createApiRoot(ClientFactory.flowType);
      const defaultShipping = switchStateDefaultShipping ? 0 : null;
      const defaultBilling = switchStateDefaultBilling ? 1 : null;

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
            shippingAddresses: [0],
            billingAddresses: [switchStateUseAsShipping ? 0 : 1],
            defaultShippingAddress: defaultShipping,
            defaultBillingAddress: defaultBilling,
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
          } as ExtendedCustomerDraft,
        })
        .execute();
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

  static async logoutUser() {
    this.removeFromLocalStorage('customerId');
    this.removeFromLocalStorage('IsUserLogined');
    ClientFactory.resetClients();
    ClientFactory.resetFlow();

    tokenStore.clear();
  }

  static reconnect = (email: string, renew: string) => {
    this.logoutUser();
    this.loginUser(email, renew);
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
