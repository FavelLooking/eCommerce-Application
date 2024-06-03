import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  private myCache: TokenStore;

  constructor() {
    const existingCache = MyTokenCache.getTokenFromLocalStorage();
    if (existingCache) {
      if (MyTokenCache.isValidJsonString(existingCache)) {
        this.myCache = JSON.parse(existingCache);
      } else {
        MyTokenCache.removeFromLocalStorage();
        this.myCache = {
          expirationTime: 0,
          refreshToken: undefined,
          token: '',
        };
      }
    } else {
      this.myCache = {
        expirationTime: 0,
        refreshToken: undefined,
        token: '',
      };
    }
  }

  static isValidJsonString(str: string) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
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

  static removeFromLocalStorage() {
    localStorage.removeItem('AccessToken');
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
