import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  private myCache: TokenStore;

  constructor() {
    const existingCache = MyTokenCache.getTokenFromLocalStorage();
    if (existingCache) {
      this.myCache = JSON.parse(existingCache);
    } else {
      this.myCache = {
        expirationTime: 0,
        refreshToken: undefined,
        token: '',
      };
    }
  }

  public get(): TokenStore {
    return this.myCache;
  }

  private saveTokenToLocalStorage(): void {
    localStorage.setItem('AccessToken', JSON.stringify(this.myCache));
  }

  static getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('AccessToken');
  }

  public set(newCache: TokenStore): void {
    Object.assign(this.myCache, newCache);
    this.saveTokenToLocalStorage();
  }

  public clear(): void {
    this.myCache = {
      expirationTime: 0,
      refreshToken: undefined,
      token: '',
    };
    localStorage.removeItem('AccessToken');
  }
}

export default MyTokenCache;
