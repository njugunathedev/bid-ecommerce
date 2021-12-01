import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { RouteComponentProps } from '@reach/router'
import uuidv4 from 'uuid/v4';
import Link from 'next/link';
import Button from 'components/Button/Button';
import RadioCard from 'components/RadioCard/RadioCard';
import RadioGroup from 'components/RadioGroup/RadioGroup';
import PaymentGroup from 'components/PaymentGroup/PaymentGroup';
import Loader from 'components/Loader/Loader';
import UpdateAddress from './Update/UpdateAddress';
import UpdateContact from './Update/UpdateContact';
import StripePaymentForm from '../Payment/StripePaymentForm';

import { DELETE_ADDRESS } from 'graphql/mutation/address';
import { DELETE_CARD } from 'graphql/mutation/card';
import { DELETE_CONTACT } from 'graphql/mutation/contact';
import { CURRENCY } from 'helper/constant';
import { openModal } from '@redq/reuse-modal';
import { Product } from 'interfaces';
import { useMutation } from '@apollo/react-hooks';
import { Scrollbars } from 'react-custom-scrollbars';

import CheckoutWrapper, {
  CheckoutContainer,
  CheckoutInformation,
  InformationBox,
  DeliverySchedule,
  Heading,
  ButtonGroup,
  CheckoutSubmit,
  HaveCoupon,
  CouponBoxWrapper,
  CouponInputBox,
  Input,
  CouponCode,
  RemoveCoupon,
  ErrorMsg,
  TermConditionText,
  TermConditionLink,
  CartWrapper,
  CalculationWrapper,
  OrderInfo,
  Title,
  ItemsWrapper,
  Items,
  Quantity,
  Multiplier,
  ItemInfo,
  Price,
  TextWrapper,
  Text,
  Bold,
  Small,
  NoProductMsg,
} from './CheckoutWithSidebar.style';

import { Plus } from 'components/AllSvgIcon';

import Sticky from 'react-stickynode';
import { HeaderContext } from 'contexts/header/header.context';
import gql from 'graphql-tag';
import { ProfileContext } from 'contexts/profile/profile.context';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';
import { APPLY_COUPON } from 'graphql/mutation/coupon';
import { useLocale } from 'contexts/language/language.provider';
import { date } from 'yup';
import { DeliveryAddress } from 'containers/Checkout/Checkout.style';
import { GET_PRODUCT } from 'graphql/query/product.query';

//gql
const CREATE_TICKET = gql`
mutation ($ticketInput: TicketInput!) {
  addTicket(ticketInput: $ticketInput){
    id
    userId
    ticketType
    ticketNumber
    roundNumber
  }
}
`;


const GET_TICKETS = gql`
query getTickets($userId: String, $limit: Int, $text: String) {
    tickets(userId: $userId, limit: $limit, text: $text){
      id
      userId
      ticketType
      ticketNumber
      roundNumber
    }
  }
`;




const ADD_ORDER = gql`
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

const UPDATE_PRODUCT = gql`
  mutation ($ticket: TicketInput!, $productId: String!) {
    updateProductTickets(ticket: $ticket, id: $productId) {
      id
      title
      description
      image
      quantity
      unit
      type
      price
    }
  }
`;


const GET_ORDERS = gql`
  query getOrders($user: String, $limit: Int, $text: String) {
    orders(user: $user, limit: $limit, text: $text) {
      id
      userId
      products{
        id
        title
        image
        quantity
        unit
        price
        
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




// The type of props Checkout Form receives
interface MyFormProps {
  token: string;
  deviceType: any;
  user: any;
}

type CartItemProps = {
  product: Product;
};

const OrderItem: React.FC<CartItemProps> = ({ product }) => {
  const { id, quantity, title, unit, price, salePrice } = product;
  const displayPrice = salePrice ? salePrice : price;
  return (
    <Items key={id}>
      <Quantity>{quantity}</Quantity>
      <Multiplier>x</Multiplier>
      <ItemInfo>
        {title} | {unit ?? ''}
      </ItemInfo>
      <Price>
        {CURRENCY}
        {(displayPrice * quantity).toFixed(2)}
      </Price>
    </Items>
  );
};

const CheckoutWithSidebar: React.FC<MyFormProps> = ({ token, deviceType, user }) => {
  const [hasCoupon, setHasCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setError] = useState('');

  const [checked, setChecked] = useState(false);
  const { state, dispatch } = useContext(ProfileContext);
  const { isRtl } = useLocale();
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
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { address, contact, card, schedules } = state;

  const [deleteContactMutation] = useMutation(DELETE_CONTACT);
  const [deleteAddressMutation] = useMutation(DELETE_ADDRESS);
  const [deletePaymentCardMutation] = useMutation(DELETE_CARD);
  const [appliedCoupon] = useMutation(APPLY_COUPON);

  const { headerState } = useContext<any>(HeaderContext);

  const totalHeight =
    headerState?.desktopHeight > 0 ? headerState.desktopHeight + 30 : 76 + 30;
  const [addOrder] = useMutation(ADD_ORDER, {
    update(cache, { data: { addOrder } }) {
      const { orders } = cache.readQuery({
        query: GET_ORDERS,
      });

      cache.writeQuery({
        query: GET_ORDERS,
        data: { orders: orders.concat([addOrder]) },
      });

    },
  });
  const [addTicket] = useMutation(CREATE_TICKET, {
    update(cache, { data: { addTicket } }) {
      const { tickets } = cache.readQuery({
        query: GET_TICKETS,
      });

      cache.writeQuery({
        query: GET_ORDERS,
        data: { tickets: tickets.concat([addTicket]) },
      });

    },
  });
  const [updateProduct] = useMutation(UPDATE_PRODUCT);


  const handleSubmit = async () => {
    setLoading(true);

    if (isValid) {
      const newOrder = {
        //unique id int
        id: new Date().getTime().toString(),
        userId: user.me.id,
        products: items.map(item => ({
          id: item.id,
          title: item.title,
          image: item.image,
          weight: item.unit,
          category: item.categories[0].slug,
          price: item.price,
          quantity: item.quantity,
          total: item.price,
        })),
        amount: parseInt(calculatePrice()),
        deliveryTime: schedules
          ?.filter((schedule) => schedule.type === 'primary'
          )
          .map((schedule) => {
            return schedule.time_slot;
          }
          )[0],
        deliveryAddress: address
          ?.filter((address) => address.type === 'primary'
          )
          .map((address) => {
            return address.info;
          }
          )[0],
        subtotal: parseInt(calculateSubTotalPrice()),
        discount: parseInt(calculateDiscount()),
        status: 1,
        deliveryFee: 0,
        date: new Date().toLocaleDateString(
          'en-US',
          {

            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          },
        )

      };
      // const newTicket = items.map(item => {
      //   ({
      //     id: uuidv4(),
      //     ticketType: 'order',
      //     ticketNumber: "1",
      //     userId: user.me.id,
      //     roundNumber: "test"
      //   })

      // },


      // )


      const newTicket = items.map(item => ({
        id: uuidv4(),
        userId: user.me.id,
        ticketType: "1939",
        ticketNumber: "1",
        roundNumber: item.id.toString()
      }))

      try {
        for (let i = 0; i < items.length; i++) {
          const newTicket = {
            id: uuidv4(),
            userId: user.me.id,
            ticketType: "1939",
            ticketNumber: uuidv4(),
            roundNumber: items[i].id.toString()
          }

          const response2 = await addTicket({
            variables: {
              ticketInput: newTicket,
            },
          });
          const response3 = await updateProduct({
            variables: {
              productId: items[i].id.toString(),
              ticket: newTicket,
            },
          });
          console.log(response3);
          console.log(response2);
        }

      } catch (error) {
        console.log(JSON.stringify(error, null, 2));
      }

      




      console.log(isValid);
      setLoading(true)
      //get unix timestamp
      try {

        const response = await addOrder({
          variables: {
            orderInput: newOrder,
          },
        });
        



        console.log(response);


      } catch (err) {
        console.log(Object.keys(err));
        console.log(JSON.stringify(err, null, 2));
      }






      console.log(typeof newOrder.id);
      const slug = newOrder.id
      if (isValid) {
      await Router.push(`/order/${slug}`)

      }

      setLoading(false)
     


      clearCart();

      console.log('order added');


    }
    setLoading(false);
  };

  useEffect(() => {
    if (
      calculatePrice() > 0 &&
      cartItemsCount > 0 &&
      address.length &&
      contact.length &&
      card.length &&
      checked &&
      schedules.length
    ) {
      setIsValid(true);
    }
  }, [state]);

  // Add or edit modal
  const handleModal = (
    modalComponent: any,
    modalProps = {},
    className: string = 'add-address-modal'
  ) => {
    openModal({
      show: true,
      config: {
        width: 360,
        height: 'auto',
        enableResizing: false,
        disableDragging: true,
        className: className,
      },
      closeOnClickOutside: true,
      component: modalComponent,
      componentProps: { item: modalProps },
    });
  };

  const handleEditDelete = async (item: any, type: string, name: string) => {
    if (type === 'edit') {
      const modalComponent = name === 'address' ? UpdateAddress : UpdateContact;
      handleModal(modalComponent, item);
    } else {
      switch (name) {
        case 'payment':
          dispatch({ type: 'DELETE_CARD', payload: item.id });

          return await deletePaymentCardMutation({
            variables: { cardId: JSON.stringify(item.id) },
          });
        case 'contact':
          dispatch({ type: 'DELETE_CONTACT', payload: item.id });

          return await deleteContactMutation({
            variables: { contactId: JSON.stringify(item.id) },
          });
        case 'address':
          dispatch({ type: 'DELETE_ADDRESS', payload: item.id });

          return await deleteAddressMutation({
            variables: { addressId: JSON.stringify(item.id) },
          });
        default:
          return false;
      }
    }
  };

  const handleApplyCoupon = async () => {
    const { data }: any = await appliedCoupon({
      variables: { code: couponCode },
    });
    if (data.applyCoupon && data.applyCoupon.discountInPercent) {
      applyCoupon(data.applyCoupon);
      setCouponCode('');
    } else {
      setError('Invalid Coupon');
    }
  };
  const handleOnUpdate = (couponCode: any) => {
    setCouponCode(couponCode);
  };


  return (
    <form>
      <CheckoutWrapper>
        <CheckoutContainer>
          <CheckoutInformation>
            {/* DeliveryAddress */}
            <InformationBox>
              <Heading>
                <FormattedMessage
                  id='checkoutDeliveryAddress'
                  defaultMessage='Delivery Address'
                />
              </Heading>
              <ButtonGroup>
                <RadioGroup
                  items={address}
                  component={(item: any) => (
                    <RadioCard
                      id={item.id}
                      key={item.id}
                      title={item.name}
                      content={item.info}
                      name='address'
                      checked={item.type === 'primary'}
                      onChange={() =>
                        dispatch({
                          type: 'SET_PRIMARY_ADDRESS',
                          payload: item.id.toString(),
                        })
                      }
                      onEdit={() => handleEditDelete(item, 'edit', 'address')}
                      onDelete={() =>
                        handleEditDelete(item, 'delete', 'address')
                      }
                    />
                  )}
                  secondaryComponent={
                    <Button
                      className='addButton'
                      title='Add New'
                      icon={<Plus width='10px' />}
                      iconPosition='left'
                      colors='primary'
                      size='small'
                      variant='textButton'
                      type='button'
                      intlButtonId='addNew'
                      onClick={() =>
                        handleModal(UpdateAddress, 'add-address-modal')
                      }
                    />
                  }
                />
              </ButtonGroup>
            </InformationBox>

            {/* DeliverySchedule */}
            <InformationBox>
              <DeliverySchedule>
                <Heading>
                  <FormattedMessage
                    id='deliverySchedule'
                    defaultMessage='Select Your Delivery Schedule'
                  />
                </Heading>
                <RadioGroup
                  items={schedules}
                  component={(item: any) => (
                    <RadioCard
                      id={item.id}
                      key={item.id}
                      title={item.title}
                      content={item.time_slot}
                      name='schedule'
                      checked={item.type === 'primary'}
                      withActionButtons={false}
                      onChange={() =>
                        dispatch({
                          type: 'SET_PRIMARY_SCHEDULE',
                          payload: item.id.toString(),
                        })
                      }
                    />
                  )}
                />
              </DeliverySchedule>
            </InformationBox>

            {/* Contact parseInt */}
            <InformationBox>
              <Heading>
                <FormattedMessage
                  id='contactparseIntText'
                  defaultMessage='Select Your Contact parseInt'
                />
              </Heading>
              <ButtonGroup>
                <RadioGroup
                  items={contact}
                  component={(item: any) => (
                    <RadioCard
                      id={item.id}
                      key={item.id}
                      title={item.type}
                      content={item.parseInt}
                      checked={item.type === 'primary'}
                      onChange={() =>
                        dispatch({
                          type: 'SET_PRIMARY_CONTACT',
                          payload: item.id.toString(),
                        })
                      }
                      name='contact'
                      onEdit={() => handleEditDelete(item, 'edit', 'contact')}
                      onDelete={() =>
                        handleEditDelete(item, 'delete', 'contact')
                      }
                    />
                  )}
                  secondaryComponent={
                    <Button
                      title='Add Contact'
                      icon={<Plus width='10px' />}
                      iconPosition='left'
                      colors='primary'
                      size='small'
                      variant='outlined'
                      type='button'
                      intlButtonId='addContactBtn'
                      onClick={() =>
                        handleModal(UpdateContact, 'add-contact-modal')
                      }
                    />
                  }
                />
              </ButtonGroup>
            </InformationBox>
            {/* PaymentOption */}

            <InformationBox
              className='paymentBox'
              style={{ paddingBottom: 30 }}
            >
              <Heading>
                <FormattedMessage
                  id='selectPaymentText'
                  defaultMessage='Select Payment Option'
                />
              </Heading>
              <PaymentGroup
                name='payment'
                deviceType={deviceType}
                items={card}
                onEditDeleteField={(item: any, type: string) =>
                  handleEditDelete(item, type, 'payment')
                }
                onChange={(item: any) =>
                  dispatch({
                    type: 'SET_PRIMARY_CARD',
                    payload: item.id.toString(),
                  })
                }
                handleAddNewCard={() => {
                  handleModal(
                    StripePaymentForm,
                    { totalPrice: calculatePrice() },
                    'add-address-modal stripe-modal'
                  );
                }}
              />

              {/* Coupon start */}
              {coupon ? (
                <CouponBoxWrapper>
                  <CouponCode>
                    <FormattedMessage id='couponApplied' />
                    <span>{coupon.code}</span>

                    <RemoveCoupon
                      onClick={(e) => {
                        e.preventDefault();
                        removeCoupon();
                        setHasCoupon(false);
                      }}
                    >
                      <FormattedMessage id='removeCoupon' />
                    </RemoveCoupon>
                  </CouponCode>
                </CouponBoxWrapper>
              ) : (
                <CouponBoxWrapper>
                  {!hasCoupon ? (
                    <HaveCoupon onClick={() => setHasCoupon((prev) => !prev)}>
                      <FormattedMessage
                        id='specialCode'
                        defaultMessage='Have a special code?'
                      />
                    </HaveCoupon>
                  ) : (
                    <>
                      <CouponInputBox>
                        <Input
                          onUpdate={handleOnUpdate}
                          value={couponCode}
                          intlPlaceholderId='couponPlaceholder'
                        />
                        <Button
                          onClick={handleApplyCoupon}
                          title='Apply'
                          intlButtonId='voucherApply'
                        />
                      </CouponInputBox>

                      {couponError && (
                        <ErrorMsg>
                          <FormattedMessage
                            id='couponError'
                            defaultMessage={couponError}
                          />
                        </ErrorMsg>
                      )}
                    </>
                  )}
                </CouponBoxWrapper>
              )}

              <TermConditionText>

                <input
                  type='checkbox'
                  checked={checked}
                  onChange={() => {
                    setChecked((prev) => !prev)
                  }}
                />

                <FormattedMessage
                  id='termAndConditionHelper'
                  defaultMessage='By making this purchase you agree to our'
                />
                <Link href='#'>
                  <TermConditionLink>
                    <FormattedMessage
                      id='termAndCondition'
                      defaultMessage='terms and conditions.'
                    />
                  </TermConditionLink>
                </Link>
              </TermConditionText>

              {/* CheckoutSubmit */}

              <CheckoutSubmit>

                <Button
                  onClick={handleSubmit}
                  type='button'
                  disabled={!isValid}
                  title='Proceed to Checkout'
                  intlButtonId='proceesCheckout'
                  loader={<Loader />}
                  isLoading={loading}
                />

              </CheckoutSubmit>

            </InformationBox>
          </CheckoutInformation>

          <CartWrapper>
            <Sticky enabled={true} top={totalHeight} innerZ={999}>
              <OrderInfo>
                <Title>
                  <FormattedMessage
                    id='cartTitle'
                    defaultMessage='Your Order'
                  />
                </Title>

                <Scrollbars
                  universal
                  autoHide
                  autoHeight
                  autoHeightMax='390px'
                  renderView={(props) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        marginLeft: isRtl ? props.style.marginRight : 0,
                        marginRight: isRtl ? 0 : props.style.marginRight,
                        paddingLeft: isRtl ? 15 : 0,
                        paddingRight: isRtl ? 0 : 15,
                      }}
                    />
                  )}
                >
                  <ItemsWrapper>
                    {cartItemsCount > 0 ? (
                      items.map((item) => (
                        <OrderItem key={`cartItem-${item.id}`} product={item} />
                      ))
                    ) : (
                      <NoProductMsg>
                        <FormattedMessage
                          id='noProductFound'
                          defaultMessage='No products found'
                        />
                      </NoProductMsg>
                    )}
                  </ItemsWrapper>
                </Scrollbars>

                <CalculationWrapper>
                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='subTotal'
                        defaultMessage='Subtotal'
                      />
                    </Text>
                    <Text>
                      {CURRENCY}
                      {calculateSubTotalPrice()}
                    </Text>
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='intlOrderDetailsDelivery'
                        defaultMessage='Delivery Fee'
                      />
                    </Text>
                    <Text>{CURRENCY}0.00</Text>
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='discountText'
                        defaultMessage='Discount'
                      />
                    </Text>
                    <Text>
                      {CURRENCY}
                      {calculateDiscount()}
                    </Text>
                  </TextWrapper>

                  <TextWrapper style={{ marginTop: 20 }}>
                    <Bold>
                      <FormattedMessage id='totalText' defaultMessage='Total' />{' '}
                      <Small>
                        (
                        <FormattedMessage
                          id='vatText'
                          defaultMessage='Incl. VAT'
                        />
                        )
                      </Small>
                    </Bold>
                    <Bold>
                      {CURRENCY}
                      {calculatePrice()}
                    </Bold>
                  </TextWrapper>
                </CalculationWrapper>
              </OrderInfo>
            </Sticky>
          </CartWrapper>
        </CheckoutContainer>
      </CheckoutWrapper>
    </form>
  );
};

export default CheckoutWithSidebar;
