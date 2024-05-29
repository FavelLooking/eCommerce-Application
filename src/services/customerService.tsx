import ClientFactory from './clientFactory';

class CustomerService {
  static getCustomersDetails = async () => {
    const apiRoot = ClientFactory.createApiRoot(ClientFactory.flowType);
    return apiRoot.me().get().execute();
  };

  static saveCustomerDetails = async () => {
    const data = await this.getCustomersDetails();
    const dataString = JSON.stringify(data.body);
    localStorage.setItem('customerDetails', dataString);
  };

  static clearCustomerDetails = async () => {
    localStorage.removeItem('customerDetails');
  };
}

export default CustomerService;
