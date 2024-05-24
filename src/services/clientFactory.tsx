import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  ByProjectKeyRequestBuilder,
} from '@commercetools/platform-sdk';
import { AuthManager } from './authManager';
import { FlowType } from '../types/clientFactory';

class ClientFactory {
  static client: Client | null | ByProjectKeyRequestBuilder = null;

  private static clientAnonymous: Client | null | ByProjectKeyRequestBuilder =
    null;

  static getClient(
    flowType: FlowType,
    username?: string,
    password?: string
  ): Client | ByProjectKeyRequestBuilder {
    if (flowType === 'password') {
      if (this.client) {
        return this.client;
      }

      if (username && password) {
        const httpMiddlewareOptions = AuthManager.getHttpMiddlewareOptions();
        const passwordFlowOptions = AuthManager.provideOptionsForPasswordFlow(
          username,
          password
        );

        this.client = new ClientBuilder()
          .withHttpMiddleware(httpMiddlewareOptions)
          .withPasswordFlow(passwordFlowOptions)
          .build();

        return this.client;
      }
      throw new Error(
        'Username and password must be provided for password flow'
      );
    }

    if (flowType === 'anonymous') {
      if (this.clientAnonymous) {
        return this.clientAnonymous;
      }

      const httpMiddlewareOptions = AuthManager.getHttpMiddlewareOptions();
      const optionsForAnonymousFlow = AuthManager.getOptionsForAnonymousFlow();

      this.clientAnonymous = new ClientBuilder()
        .withHttpMiddleware(httpMiddlewareOptions)
        .withAnonymousSessionFlow(optionsForAnonymousFlow)
        .build();

      return this.clientAnonymous;
    }

    throw new Error('Unsupported authentication flow type');
  }

  static createApiRootWithPassword(username?: string, password?: string) {
    if (this.client) {
      return createApiBuilderFromCtpClient(this.client).withProjectKey({
        projectKey: AuthManager.getProjectKey(),
      });
    }

    const clientWithPassword = this.getClient('password', username, password);
    this.client = clientWithPassword;
    return createApiBuilderFromCtpClient(clientWithPassword).withProjectKey({
      projectKey: AuthManager.getProjectKey(),
    });
  }

  static createApiRootForAnonymous() {
    const clientAnonymous = this.getClient('anonymous');
    return createApiBuilderFromCtpClient(clientAnonymous).withProjectKey({
      projectKey: AuthManager.getProjectKey(),
    });
  }

  static resetClients() {
    this.client = null;
    this.clientAnonymous = null;
  }
}

export default ClientFactory;
