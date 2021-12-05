import React from 'react';
import {
  SingleOrderList,
  OrderListHeader,
  TrackID,
  Status,
  OrderMetas,
  Meta,
} from './OrderCard.style';
import { FormattedMessage } from 'react-intl';

import { CURRENCY } from 'helper/constant';

type TicketCardProps = {
  ticketId?: any;
  onClick?: (e: any) => void;
  className?: any;
  status?: any;
  amount?: any;
  ticketNumber?: any
  roundNumber?: any

};

const OrderCard: React.FC<TicketCardProps> = ({
  ticketId,
  onClick,
  className,
  status,
  ticketNumber,
  roundNumber,
  amount
}) => {
  return (
    <>
      <SingleOrderList onClick={onClick} className={className}>
        <OrderListHeader>
          <TrackID>
            <FormattedMessage
              id='intlTicketCardTitleText'
              defaultMessage='Ticket'
            />
            <span>#{ticketId}</span>
          </TrackID>
          <Status>{status}</Status>
        </OrderListHeader>

        <OrderMetas>
          <Meta>
            <FormattedMessage
              id='roundNumberText'
              defaultMessage='Round'
            />
            : <span>{roundNumber}</span>
          </Meta>
          <Meta>
            <FormattedMessage
              id='ticketNumberText'
              defaultMessage='Ticket Number'
            />
            : <span>{ticketNumber}</span>
          </Meta>
          <Meta className='price'>
            <FormattedMessage
              id='intlOrderCardTotalText'
              defaultMessage='Total Price'
            />
            :
            <span>
              {CURRENCY}
              {amount}
            </span>
          </Meta>
        </OrderMetas>
      </SingleOrderList>
    </>
  );
};

export default OrderCard;
