// import { storageLoginError } from '../utils/constants';
// import AuthService from './authService';
// import ClientFactory from './clientFactory';

// class CartService {
//   static async createCart() {
//     const apiRoot = ClientFactory.createApiRoot(ClientFactory.flowType);
//     const cartResponse = await apiRoot
//       .me()
//       .carts()
//       .post({
//         body: {
//           currency: 'EUR',
//         },
//       })
//       .execute();
//     await AuthService.saveToLocalStorage('cartId', cartResponse.body.id);
//   }

//   catch(error: unknown) {
//     const errorMessage = (error as Error).message;
//     ClientFactory.resetClients();
//     ClientFactory.flowType = 'anonymous';
//     AuthService.saveToLocalStorage(storageLoginError, errorMessage);
//   }
// }
