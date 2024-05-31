import { Address } from '@commercetools/platform-sdk';

interface AddressProps extends Address {
  isDefaultShippingAddress: (id: string) => boolean;
  isDefaultBillingAddress: (id: string) => boolean;
  isShippingAddress: (id: string) => boolean;
  isBillingAddress: (id: string) => boolean;
}

export default AddressProps;
