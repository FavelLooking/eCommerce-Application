import ClientFactory from './clientFactory';
import AuthService from './authService';

class CustomerService {
  static getCustomersDetails = async () => {
    const apiRoot = ClientFactory.createApiRoot(ClientFactory.flowType);
    return apiRoot.me().get().execute();
  };

  static changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      const customerDetails = await CustomerService.getCustomersDetails();
      const { body } = customerDetails;
      const { version, email } = body;

      const apiRoot = ClientFactory.createApiRoot(ClientFactory.flowType);
      await apiRoot
        .me()
        .password()
        .post({
          body: {
            version,
            currentPassword,
            newPassword,
          },
        })
        .execute();
      return email;
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('ErrorMessage', errorMessage);
    }
    return undefined;
  };
}

  static updateUserInfo = async (
    email: string,
    firstName?: string,
    lastName?: string,
    dateOfBirth?: string
  ) => {
    try {
      const currentVersion = (await this.getCustomersDetails()).body.version;
      const apiRoot = ClientFactory.createApiRoot(ClientFactory.flowType);
      await apiRoot
        .me()
        .post({
          body: {
            version: currentVersion,
            actions: [
              {
                action: 'changeEmail',
                email,
              },
              {
                action: 'setFirstName',
                firstName,
              },
              {
                action: 'setLastName',
                lastName,
              },
              {
                action: 'setDateOfBirth',
                dateOfBirth,
              },
            ],
          },
        })
        .execute();
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('ErrorMessage', errorMessage);
      throw error;
    }
    return undefined;
  };

  static deleteAddress = async (id: string) => {
    try {
      const currentVersion = (await this.getCustomersDetails()).body.version;
      const apiRoot = ClientFactory.createApiRoot(ClientFactory.flowType);
      await apiRoot
        .me()
        .post({
          body: {
            version: currentVersion,
            actions: [
              {
                action: 'removeAddress',
                addressId: id,
              },
            ],
          },
        })
        .execute();
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('ErrorMessage', errorMessage);
      throw error;
    }
    return undefined;
  };

  static setBillingAddress = async (id: string | undefined = undefined) => {
    try {
      const currentVersion = (await this.getCustomersDetails()).body.version;
      const apiRoot = ClientFactory.createApiRoot(ClientFactory.flowType);
      await apiRoot
        .me()
        .post({
          body: {
            version: currentVersion,
            actions: [
              {
                action: 'setDefaultBillingAddress',
                addressId: id,
              },
            ],
          },
        })
        .execute();
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('ErrorMessage', errorMessage);
      throw error;
    }
    return undefined;
  };

  static setShippingAddress = async (id: string | undefined = undefined) => {
    try {
      const currentVersion = (await this.getCustomersDetails()).body.version;
      const apiRoot = ClientFactory.createApiRoot(ClientFactory.flowType);
      await apiRoot
        .me()
        .post({
          body: {
            version: currentVersion,
            actions: [
              {
                action: 'setDefaultShippingAddress',
                addressId: id,
              },
            ],
          },
        })
        .execute();
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('ErrorMessage', errorMessage);
      throw error;
    }
    return undefined;
  };

  static addUserAddress = async (
    streetName: string,
    country: string,
    city: string,
    postalCode: string
  ) => {
    try {
      const currentVersion = (await this.getCustomersDetails()).body.version;
      const apiRoot = ClientFactory.createApiRoot(ClientFactory.flowType);
      await apiRoot
        .me()
        .post({
          body: {
            version: currentVersion,
            actions: [
              {
                action: 'addAddress',
                address: {
                  streetName,
                  country,
                  city,
                  postalCode,
                },
              },
            ],
          },
        })
        .execute();
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('ErrorMessage', errorMessage);
      throw error;
    }
    return undefined;
  };

  static updateUserAddress = async (
    id: string,
    streetName: string,
    country: string,
    city: string,
    postalCode: string
  ) => {
    try {
      const currentVersion = (await this.getCustomersDetails()).body.version;
      const apiRoot = ClientFactory.createApiRoot(ClientFactory.flowType);
      await apiRoot
        .me()
        .post({
          body: {
            version: currentVersion,
            actions: [
              {
                action: 'changeAddress',
                addressId: id,
                address: {
                  streetName,
                  country,
                  city,
                  postalCode,
                },
              },
            ],
          },
        })
        .execute();
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('ErrorMessage', errorMessage);
      throw error;
    }
    return undefined;
  };
}
export default CustomerService;
