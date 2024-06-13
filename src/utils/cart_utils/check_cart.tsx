import CartService from '../../services/cartService';

export default async function checkCart(
  idCard: string | undefined = undefined
) {
  if (idCard) {
    try {
      const cartData = await CartService.getCart(idCard as string);
      const cartDataArr = cartData?.body.lineItems;
      const cartDataArrId: string[] = [];
      if (cartDataArr) {
        for (let i = 0; i < cartDataArr.length; i += 1) {
          cartDataArrId.push(cartDataArr[i].productId);
        }
      }
      return cartDataArrId;
    } catch (error) {
      console.error('Error fetching cart data', error);
      throw error;
    }
  }
  return null;
}
