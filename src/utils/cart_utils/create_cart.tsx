import AuthService from '../../services/authService';
import CartService from '../../services/cartService';

export default function CreateCart() {
  if (!AuthService.getFromLocalStorage('cartId')) {
    CartService.createCart();
  }
}
