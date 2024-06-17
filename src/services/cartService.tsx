import { storageCartId } from '../utils/constants';
// eslint-disable-next-line
import AuthService from './authService';
import ClientFactory from './clientFactory';

export default class CartService {
  static cartProductid: string[] | undefined;

  static async createCart() {
    try {
      const apiRoot = await ClientFactory.createApiRoot(ClientFactory.flowType);

      const cartResponse = await apiRoot
        .me()
        .carts()
        .post({
          body: {
            currency: 'EUR',
          },
        })
        .execute();
      await AuthService.saveToLocalStorage('cartId', cartResponse.body.id);
      await AuthService.saveToLocalStorage(
        'cartVersion',
        cartResponse.body.version.toString()
      );
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('cartError', errorMessage);
    }
  }

  static async addItem(item: string) {
    const cartId = AuthService.getFromLocalStorage('cartId') as string;
    const cartVersion = parseInt(
      AuthService.getFromLocalStorage('cartVersion') as string,
      10
    );

    try {
      const apiRoot = await ClientFactory.createApiRoot(ClientFactory.flowType);

      const updateResponse = await apiRoot
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version: cartVersion,
            actions: [
              {
                action: 'addLineItem',
                productId: item,
                variantId: 1,
                quantity: 1,
              },
            ],
          },
        })
        .execute();
      await AuthService.saveToLocalStorage(
        'cartVersion',
        updateResponse.body.version.toString()
      );
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('cartError', errorMessage);
    }
  }

  static async removeAllItems(productId: string) {
    const cartId = AuthService.getFromLocalStorage('cartId') as string;
    const originalCartVersion = parseInt(
      AuthService.getFromLocalStorage('cartVersion') as string,
      10
    );

    try {
      const apiRoot = await ClientFactory.createApiRoot(ClientFactory.flowType);

      const cartResponse = await apiRoot
        .me()
        .carts()
        .withId({ ID: cartId })
        .get()
        .execute();

      const { lineItems } = cartResponse.body;

      const itemsToRemove = lineItems.filter(
        (item) => item.productId === productId
      );

      const actions: { action: 'removeLineItem'; lineItemId: string }[] =
        itemsToRemove.map((item) => ({
          action: 'removeLineItem',
          lineItemId: item.id,
        }));

      if (actions.length > 0) {
        await apiRoot
          .me()
          .carts()
          .withId({ ID: cartId })
          .post({
            body: {
              version: originalCartVersion,
              actions,
            },
          })
          .execute();
      }

      // После выполнения удаления, обновляем версию корзины в localStorage
      await AuthService.saveToLocalStorage(
        'cartVersion',
        cartResponse.body.version.toString()
      );
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('cartError', errorMessage);
    }
  }

  static async getCart(idCart: string) {
    try {
      const apiRoot = await ClientFactory.createApiRoot(ClientFactory.flowType);

      const cartInfo = await apiRoot
        .me()
        .carts()
        .withId({ ID: idCart })
        .get()
        .execute();

      const cartDataArr = cartInfo?.body.lineItems;
      const cartDataArrId: string[] = [];
      if (cartDataArr) {
        for (let i = 0; i < cartDataArr.length; i += 1) {
          cartDataArrId.push(cartDataArr[i].productId);
        }
      }
      this.cartProductid = cartDataArrId;
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('cartError', errorMessage);
    }
    return undefined;
  }

  static async getActiveCart() {
    try {
      const apiRoot = await ClientFactory.createApiRoot(
        ClientFactory.flowType,
        'password'
      );

      const cartInfo = await apiRoot.me().activeCart().get().execute();

      const cartId = cartInfo.body.id;
      AuthService.saveToLocalStorage('cartId', cartId);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      AuthService.saveToLocalStorage('cartError', errorMessage);
    }
    return undefined;
  }
}

export const getCart = () =>
  AuthService.getFromLocalStorage(storageCartId)
    ? ClientFactory.createApiRoot(ClientFactory.flowType)
        .carts()
        .withId({ ID: AuthService.getFromLocalStorage(storageCartId) ?? '' })
        .get()
        .execute()
        .then((value) => value.body)
    : undefined;

export const changeProductCount = (count: number, productId: string) =>
  getCart()?.then((cart) =>
    ClientFactory.createApiRoot(ClientFactory.flowType)
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId: productId,
              quantity: count,
            },
          ],
          version: cart.version,
        },
      })
      .execute()
  );

export const applyCarDiscount = (promocode: string) =>
  getCart()?.then((cart) =>
    ClientFactory.createApiRoot(ClientFactory.flowType)
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          actions: [
            {
              action: 'addDiscountCode',
              code: promocode,
            },
          ],
          version: cart.version,
        },
      })
      .execute()
  );

export const getPromocodes = () =>
  ClientFactory.createApiRoot(ClientFactory.flowType)
    .discountCodes()
    .get()
    .execute();

export const deleteCart = () =>
  getCart()?.then((cart) =>
    ClientFactory.createApiRoot(ClientFactory.flowType)
      .carts()
      .withId({ ID: cart.id })
      .delete({
        queryArgs: {
          version: cart.version,
        },
      })
      .execute()
  );

export const createNewCart = () =>
  ClientFactory.createApiRoot(ClientFactory.flowType)
    .me()
    .carts()
    .post({
      body: {
        currency: 'EUR',
      },
    })
    .execute();
