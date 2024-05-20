import EnvConfig from '../interfaces/envConfig';

class ConfigManager {
  static createConfig(): EnvConfig {
    if (
      !process.env.CTP_PROJECT_KEY ||
      !process.env.CTP_SCOPES ||
      !process.env.CTP_AUTH_URL ||
      !process.env.CTP_API_URL ||
      !process.env.CTP_CLIENT_ID ||
      !process.env.CTP_CLIENT_SECRET
    ) {
      throw new Error('Missing required environment variables');
    }
    return {
      projectKey: process.env.CTP_PROJECT_KEY,
      scopes: process.env.CTP_SCOPES.split(' '),
      authBaseUrl: process.env.CTP_AUTH_URL,
      apiBaseUrl: process.env.CTP_API_URL,
      clientId: process.env.CTP_CLIENT_ID,
      clientSecret: process.env.CTP_CLIENT_SECRET,
    };
  }
}

export default ConfigManager;
