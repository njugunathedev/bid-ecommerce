import React from 'react';
import Link from 'next/link';
import { Product } from 'interfaces';
import OrderRecivedWrapper, {
  OrderRecivedContainer,
  OrderInfo,
  OrderDetails,
  TotalAmount,
  BlockTitle,
  Text,
  InfoBlockWrapper,
  InfoBlock,
  ListItem,
  ListTitle,
  ListDes,
} from './OrderReceived.style';
import { CURRENCY } from 'helper/constant';
import { useCart } from 'contexts/cart/use-cart';

import { FormattedMessage } from 'react-intl';
import { GraphQLError } from 'graphql';
import { calculateTotalPrice } from 'components/helpers/utility';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

type OrderRecivedProps = {
  orderId: any
};

const GET_ORDERS = gql`
  query getOrders($user: Int, $limit: Int, $text: String) {
    orders(user: $user, limit: $limit, text: $text) {
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

const OrderRecived: React.FunctionComponent<OrderRecivedProps> = ({ orderId }) => {
  const { data, error, loading } = useQuery(GET_ORDERS, {
    variables: {
      id: 1894
    }
  });
  const {
    items,
    removeCoupon,
    coupon,
    applyCoupon,
    clearCart,
    cartItemsCount,
    calculatePrice,
    calculateDiscount,
    calculateSubTotalPrice,
  } = useCart();
  console.log(calculatePrice());
  console.log(typeof parseInt(orderId));
  console.log(typeof orderId)
  if(data) console.log(data)
  if(!data) console.log(GraphQLError);

  return (
    <OrderRecivedWrapper>
      <OrderRecivedContainer>
        <Link href="/">
          <a className="home-btn">
            <FormattedMessage id="backHomeBtn" defaultMessage="Back to Home" />
          </a>
        </Link>

        <OrderInfo>
          <BlockTitle>
            <FormattedMessage
              id="orderReceivedText"
              defaultMessage="Order Received"
            />
          </BlockTitle>

          <Text>
            <FormattedMessage
              id="orderReceivedSuccess"
              defaultMessage="Thank you. Your order has been received"
            />
          </Text>

          <InfoBlockWrapper>
            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage
                  id="orderNumberText"
                  defaultMessage="Order Number"
                />
              </Text>
              <Text>{orderId}</Text>
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage id="orderDateText" defaultMessage="Date" />
              </Text>
              <Text>
                {
                  new Date().toLocaleDateString(
                    'en-US',
                    {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    },
                  )
                }
              </Text>
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage id="totalText" defaultMessage="Total" />
              </Text>
              <Text>{calculatePrice()}</Text>
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage
                  id="paymenMethodText"
                  defaultMessage="Payment Method"
                />
              </Text>
              <Text>
                <FormattedMessage
                  id="paymentMethodName"
                  defaultMessage="Cash on delivery"
                />
              </Text>
            </InfoBlock>
          </InfoBlockWrapper>
        </OrderInfo>

        <OrderDetails>
          <BlockTitle>
            <FormattedMessage
              id="orderDetailsText"
              defaultMessage="Order Details"
            />
          </BlockTitle>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="totalItemText"
                  defaultMessage="Total Item"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>
                {
                  //length items
                  items.length
                }
              </Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="orderTimeText"
                  defaultMessage="Order Time"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>
              {
                  new Date().toLocaleDateString(
                    'en-US',
                    {
                      
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    },
                  )
                }
              </Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="deliveryTimeText"
                  defaultMessage="Delivery Time"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>90 Minute Express Delivery</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="deliveryLocationText"
                  defaultMessage="Delivery Location"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>
                1st Floor, House 149, Road-22, Mohakhali DOHS, Dhaka - North
              </Text>
            </ListDes>
          </ListItem>
        </OrderDetails>

        <TotalAmount>
          <BlockTitle>
            <FormattedMessage
              id="totalAmountText"
              defaultMessage="Total Amount"
            />
          </BlockTitle>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage id="subTotal" defaultMessage="Sub total" />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{calculateSubTotalPrice()}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="paymenMethodText"
                  defaultMessage="Payment Method"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>Mpesa</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="paymentMethodName"
                  defaultMessage="Delivery Charge"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>10</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage id="totalText" defaultMessage="Total" />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{CURRENCY} {calculatePrice()}</Text>
            </ListDes>
          </ListItem>
        </TotalAmount>
      </OrderRecivedContainer>
    </OrderRecivedWrapper>
  );
};

export default OrderRecived;
