import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { Scrollbars } from 'react-custom-scrollbars';
import { useQuery } from '@apollo/react-hooks';
import { GET_TICKETS } from 'graphql/query/tickets.query';
import {
  OrderBox,
  OrderListWrapper,
  OrderList,
  OrderDetailsWrapper,
  Title,
  ImageWrapper,
  ItemWrapper,
  ItemDetails,
  ItemName,
  ItemSize,
  ItemPrice,
  NoOrderFound,
} from './Order.style';

import TicketDetails from './SingleOrderDetails/TicketDetail';
import TicketCard from './OrderCard/TicketCard';
import OrderCardMobile from './OrderCard/orderCardMobile';
import useComponentSize from 'helper/useComponentSize';
import { FormattedMessage } from 'react-intl';

const progressData = ['Order Received', 'Order On The Way', 'Order Delivered'];



const ticketTableColumns = [
  {
    title: <FormattedMessage id='cartItems' defaultMessage='Items' />,
    dataIndex: '',
    key: 'items',
    width: 250,
    ellipsis: true,
    render: (text, record) => {
      return (
        <ItemWrapper>
          <ImageWrapper>
            <img src={record.image} alt={record.title} />
          </ImageWrapper>

          <ItemDetails>
            <ItemName>{record.title}</ItemName>
            <ItemSize>{record.weight}</ItemSize>
            <ItemPrice>${record.price}</ItemPrice>
          </ItemDetails>
        </ItemWrapper>
      );
    },
  },
  {
    title: (
      <FormattedMessage id='intlTableColTitle2' defaultMessage='Quantity' />
    ),
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    width: 100,
  },
  {
    title: <FormattedMessage id='intlTableColTitle3' defaultMessage='Price' />,
    dataIndex: '',
    key: 'price',
    align: 'right',
    width: 100,
    render: (text, record) => {
      return <p>${record.total}</p>;
    },
  },
];

type TicketTableProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const TicketsContent: React.FC<TicketTableProps> = ({
  deviceType: { mobile, tablet, desktop },
}) => {
  const [ticket, setTicket] = useState(null);
  const [active, setActive] = useState('');

  const [targetRef, size] = useComponentSize();
  const orderListHeight = size.height - 79;
  const { data, error, loading } = useQuery(GET_TICKETS, {
    variables: {
      limit: 7,
      userId: "1",
    },
  });

  useEffect(() => {
    if (data && data.tickets && data.tickets.length !== 0) {
      setTicket(data.tickets[0]);
      setActive(data.tickets[0].id);
    }
  }, [data && data.tickets]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) return <div>{console.log(JSON.stringify(error, null, 2))}{error.message}</div>;

  const handleClick = ticket => {
    setTicket(ticket);
    setActive(ticket.id);
  };
  console.log(data)
  console.log(data.tickets, 'data.tickets', ticket, 'ticket');

  return (
    <OrderBox>
      {desktop && (
        <>
          <div style={{ height: size.height }}>
            <Title style={{ padding: '0 20px' }}>
              <FormattedMessage
                id='intlTicketPageTitle'
                defaultMessage='My Ticket'
              />
            </Title>

            <Scrollbars
              universal
              autoHide
              autoHeight
              autoHeightMin={420}
              autoHeightMax={isNaN(orderListHeight) ? 500 : orderListHeight}
            >
              <OrderList>
                {data.tickets.length !== 0 ? (
                  data.tickets.map((ticket: any) => (
                    <TicketCard
                      key={ticket.id}
                      ticketId={ticket.id}
                      className={ticket && ticket.id === active ? 'active' : ''}
                      status={ticket.ticketStatus}
                      ticketNumber = {ticket.ticketNumber}
                      roundNumber = {ticket.roundNumber}

                      
                      amount={ticket.price}
                      onClick={() => {
                        handleClick(ticket);
                      }}
                    />
                  ))
                ) : (
                  <NoOrderFound>
                    <FormattedMessage
                      id='intlNoOrderFound'
                      defaultMessage='No order found'
                    />
                  </NoOrderFound>
                )}
              </OrderList>
            </Scrollbars>
          </div>

          
        </>
      )}

      {(mobile || tablet) && (
        <OrderList>
          <OrderCardMobile
            orders={data.tickets}
            className={ticket && ticket.id === active ? 'active' : ''}
            progressData={progressData}
            columns={ticketTableColumns}
            onClick={() => {
              handleClick(ticket);
            }}
          />
        </OrderList>
      )}
    </OrderBox>
  );
};

export default TicketsContent;
