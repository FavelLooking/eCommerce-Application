import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  ByProjectKeyRequestBuilder,
} from '@commercetools/platform-sdk';
import { AuthManager } from './authManager';
import { FlowType } from '../types/clientFactory';

class ClientFactory {
  static client: Client | null | ByProjectKeyRequestBuilder = null;

  static flowType: string = 'anonymous';

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
      if (this.client) {
        return this.client;
      }

      const httpMiddlewareOptions = AuthManager.getHttpMiddlewareOptions();
      const optionsForAnonymousFlow = AuthManager.getOptionsForAnonymousFlow();

      this.client = new ClientBuilder()
        .withHttpMiddleware(httpMiddlewareOptions)
        .withAnonymousSessionFlow(optionsForAnonymousFlow)
        .build();

      return this.client;
    }

    throw new Error('Unsupported authentication flow type');
  }

  static createApiRoot(flowType: string, username?: string, password?: string) {
    let { client } = this;

    if (!client) {
      if (flowType === 'password') {
        client = this.getClient('password', username, password);
      } else if (flowType === 'anonymous') {
        client = this.getClient('anonymous');
      } else {
        throw new Error('Unsupported authentication flow type');
      }

      this.client = client;
    }

    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: AuthManager.getProjectKey(),
    });
  }

  static resetClients() {
    this.client = null;
  }

  static resetFlow() {
    this.flowType = 'anonymous';
  }
}

export default ClientFactory;
