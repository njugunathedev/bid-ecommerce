import gql from 'graphql-tag';

export const ADD_ORDER = gql`
  mutation ($orderInput: AddOrderInput!) {
    addOrder(orderInput: $orderInput) {
      id
      userId
      products{
        id
        title
        image
        quantity
        category
        weight
        price
        total
      }
      amount
      deliveryTime
      deliveryAddress
      subtotal
      discount
      status
      deliveryFee
      date
      
    }
  }
`;
export const GET_ORDERS = gql`
  query getOrders($status: String, $limit: Int, $searchText: String) {
    orders(status: $status, limit: $limit, searchText: $searchText) {
      id
      userId
      products{
        id
        title
        image
        quantity
        category
        weight
        price
        total
      }
      amount
      deliveryTime
      deliveryAddress
      subtotal
      discount
      status
      deliveryFee
      date
    }
  }
`;
export const GET_PAYMENT = gql`
  mutation($paymentInput: String!) {
    charge(paymentInput: $paymentInput) {
      status
    }
  }
`;
