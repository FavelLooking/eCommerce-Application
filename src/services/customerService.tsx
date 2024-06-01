import ClientFactory from './clientFactory';
import AuthService from './authService';
import { storageLoginError } from '../utils/constants';

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
      const { version } = body;

      const apiRoot = ClientFactory.createApiRoot(ClientFactory.flowType);
      return await apiRoot
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
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage(storageLoginError, errorMessage);
    }
    return undefined;
  };
}

export default CustomerService;
