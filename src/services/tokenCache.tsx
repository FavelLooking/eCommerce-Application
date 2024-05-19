import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  private myCache: TokenStore = {
    expirationTime: 0,
    refreshToken: undefined,
    token: '',
  };

  public get(): TokenStore {
    return this.myCache;
  }

  private saveTokenToLocalStorage(): void {
    localStorage.setItem('AccessToken', this.myCache.token);
  }

  public set(newCache: TokenStore): void {
    Object.assign(this.myCache, newCache);
    this.saveTokenToLocalStorage();
  }
}
export default MyTokenCache;
