import {
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import ConfigManager from './configManager';
import MyTokenCache from './tokenCache';

class AuthManager {
  private static tokenStore = new MyTokenCache();

  private static config = ConfigManager.createConfig();

  static getHttpMiddlewareOptions(): HttpMiddlewareOptions {
    return {
      host: this.config.apiBaseUrl,
      fetch,
    };
  }

  static provideOptionsForPasswordFlow(
    username: string,
    password: string
  ): PasswordAuthMiddlewareOptions {
    return {
      host: this.config.authBaseUrl,
      projectKey: this.config.projectKey,
      credentials: {
        clientId: this.config.clientId,
        clientSecret: this.config.clientSecret,
        user: { username, password },
      },
      scopes: this.config.scopes,
      fetch,
      tokenCache: AuthManager.tokenStore,
    };
  }

  static getProjectKey(): string {
    return this.config.projectKey;
  }
}

export default AuthManager;
