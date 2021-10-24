import React from 'react';
import { SEO } from 'components/seo';
import OrderRecivedPage from 'containers/OrderReceived/OrderReceived';
import { Product } from 'interfaces';
import { useRouter } from 'next/router';

import { withApollo } from 'helper/apollo';
import { string } from 'yup';




const OrderRecived: React.FC<any> = (props) => {
  const {
    query: { slug },
  } = useRouter();

  
  return (
    <>
      <SEO title='Invoice - Lucky Arcade' description='Invoice Details' />
      <OrderRecivedPage orderId={slug} />
    </>
  );

}

export default withApollo(OrderRecived);
