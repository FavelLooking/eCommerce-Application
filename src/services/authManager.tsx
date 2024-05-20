import {
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import ConfigManager from './configManager';
import MyTokenCache from './tokenCache';

const { v4: uuidv4 } = require('uuid');

export const tokenStore = new MyTokenCache();

const { v4: uuidv4 } = require('uuid');

class AuthManager {
  private static config = ConfigManager.createConfig();

  private static anonymousId = uuidv4();

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
      tokenCache: tokenStore,
    };
  }

  static getOptionsForAnonymousFlow(): AnonymousAuthMiddlewareOptions {
    return {
      host: this.config.authBaseUrl,
      projectKey: this.config.projectKey,
      credentials: {
        clientId: this.config.clientId,
        clientSecret: this.config.clientSecret,
        anonymousId: this.anonymousId,
      },
      scopes: this.config.scopes,
      fetch,
      tokenCache: tokenStore,
    };
  }

  static getOptionsForAnonymousFlow(): AnonymousAuthMiddlewareOptions {
    return {
      host: this.config.authBaseUrl,
      projectKey: this.config.projectKey,
      credentials: {
        clientId: this.config.clientId,
        clientSecret: this.config.clientSecret,
        anonymousId: this.anonymousId,
      },
      scopes: this.config.scopes,
      fetch,
    };
  }

  static getProjectKey(): string {
    return this.config.projectKey;
  }
}

export default AuthManager;
