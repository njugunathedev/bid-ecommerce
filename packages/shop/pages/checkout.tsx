import React, { useContext } from 'react';
import { NextPage } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { openModal } from '@redq/reuse-modal';
import { Modal } from '@redq/reuse-modal';
import { withApollo } from 'helper/apollo';
import { SEO } from 'components/seo';
import AuthenticationForm from 'containers/SignInOutForm/Form';
import Checkout from 'containers/CheckoutWithSidebar/CheckoutWithSidebar';
import Button from "components/Button/Button";
import { GET_LOGGED_IN_CUSTOMER } from 'graphql/query/customer.query';
import { AuthContext } from "contexts/auth/auth.context"
import { ProfileProvider } from 'contexts/profile/profile.provider';
import NoResultSvg from '../../shop/components/NoResult/no-result.svg';
import { NoResultWrapper, ImageWrapper, ButtonWrapper } from 'components/NoResult/NoResult.style';

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage: NextPage<Props> = ({ deviceType }) => {
  const { data, error, loading } = useQuery(GET_LOGGED_IN_CUSTOMER);
  const { authState: { isAuthenticated }, authDispatch } = useContext<any>(AuthContext);
  const onClick = () => {
    authDispatch({
      type: 'SIGNIN',
    });

    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
    });
  };

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log(JSON.stringify(error, null, 2));

    return <div>{error.message}</div>;

  }
  if(data){
    console.log(data)
  }
  const token = 'true';

  return (
    <>

      <SEO title='Checkout - LuckArcade' description='Checkout Details' />
      <br />
      <br />
      <br />
      <br />
      <br />

      <ProfileProvider initData={data.me}>
        {isAuthenticated ? (
          <Modal>
            <Checkout token={token} deviceType={deviceType} user={data} />
          </Modal>
        ) :
          (
            <Modal>
              <NoResultWrapper>
                <br />
                <br />
                <br />
                <br />
                <h3>Opps Can't checkout without signing in :(</h3>
                <ImageWrapper>
                  <img src={NoResultSvg} alt="No Result" />
                </ImageWrapper>
                <ButtonWrapper>
                  <div onClick={onClick}>
                    <Button title="Sign Up / Login" />
                  </div>
                </ButtonWrapper>

              </NoResultWrapper>
            </Modal>



          )

        }



      </ProfileProvider>
    </>
  );
};

export default withApollo(CheckoutPage);
