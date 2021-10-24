import React from 'react';
import { SEO } from 'components/seo';
import { useRouter } from 'next/router';
import OrderRecivedPage from 'containers/OrderReceived/OrderReceived';

import { withApollo } from 'helper/apollo';



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
