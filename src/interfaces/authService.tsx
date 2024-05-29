import { MyCustomerDraft } from '@commercetools/platform-sdk';

export interface ExtendedCustomerDraft extends MyCustomerDraft {
  shippingAddresses?: [number];
  billingAddresses?: [number];

  defaultShippingAddress?: number;

  defaultBillingAddress?: number;
}
