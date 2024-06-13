import AuthService from '../../services/authService';
import CartService from '../../services/cartService';

export default async function CreateCart(item: string) {
  if (!AuthService.getFromLocalStorage('cartId')) {
    await CartService.createCart();
  }
  await CartService.addItem(item);
}
