import Toastify from 'toastify-js';
import CartService from '../../services/cartService';

export default async function removeItemFromCart(item: string) {
  const showToast = (text: string) => {
    Toastify({
      text,
      duration: 2500,
      className: 'info',
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },
      gravity: 'bottom',
      position: 'right',
    }).showToast();
  };
  showToast('The product has been removed from the grocery cart');
  await CartService.removeAllItems(item);
}
