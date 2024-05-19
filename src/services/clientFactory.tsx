import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import AuthManager from './authManager';
import { FlowType } from '../types/clientFactory';

class ClientFactory {
  static getClient(flowType: FlowType, username?: string, password?: string) {
    const httpMiddlewareOptions = AuthManager.getHttpMiddlewareOptions();
    const clientBuilder = new ClientBuilder().withHttpMiddleware(
      httpMiddlewareOptions
    );

    switch (flowType) {
      case 'password':
        if (username && password) {
          const passwordFlowOptions = AuthManager.provideOptionsForPasswordFlow(
            username,
            password
          );
          clientBuilder.withPasswordFlow(passwordFlowOptions);
        } else {
          throw new Error(
            'Username and password must be provided for password flow'
          );
        }
        break;
      default:
        throw new Error('Unsupported authentication flow type');
    }
    return clientBuilder.build();
  }

  static createApiRootWithPassword(username: string, password: string) {
    const clientWithPassword = this.getClient('password', username, password);
    return createApiBuilderFromCtpClient(clientWithPassword).withProjectKey({
      projectKey: AuthManager.getProjectKey(),
    });
  }
}

export default ClientFactory;
