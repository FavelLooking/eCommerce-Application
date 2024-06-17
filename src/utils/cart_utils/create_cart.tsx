import Toastify from 'toastify-js';
import AuthService from '../../services/authService';
import CartService from '../../services/cartService';

export default async function CreateCart(item: string) {
  const showToast = (text: string) => {
    Toastify({
      text,
      duration: 1000,
      className: 'info',
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },
      gravity: 'bottom',
      position: 'right',
    }).showToast();
  };
  if (!AuthService.getFromLocalStorage('cartId')) {
    await CartService.createCart();
  }
  await CartService.addItem(item);
  showToast('The product has been added to the grocery cart');
}
