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

export default CustomerService;
