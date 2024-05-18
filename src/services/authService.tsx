import ClientFactory from './clientFactory';

class AuthService {
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

      AuthService.saveToLocalStorage(
        `customerId`,
        loginResponse.body.customer.id
      );
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('ErrorMessage', errorMessage);
    }
  }

  private static saveToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private static getFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }
}

export default AuthService;
