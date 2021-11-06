import React, { useContext } from 'react';
import {
  LinkButton,
  Button,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  OfferSection,
  Offer,
  Input,
  Divider,
} from './SignInOutForm.style';
import { Facebook, Google } from 'components/AllSvgIcon';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage } from 'react-intl';
import { closeModal } from '@redq/reuse-modal';
import Image from 'components/Image/Image';
import PickBazar from '../../image/PickBazar.png';


const GET_USER = gql`
  query getUser($email: String!) {
    me(email: $email) {
    
      id
      name
      email
      address {
        id
        type
        name
        info
      }
      contact {
        id
        type
        number
      }
      card {
        id
        type
        cardType
        name
        lastFourDigit
      }
    }
 
    
  }
`;

export default function SignInModal() {
  const { authDispatch } = useContext<any>(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      email: "jhondDoe@demo.com",
    },
  });

  const toggleSignUpForm = () => {
    authDispatch({
      type: 'SIGNUP',
    });
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: 'FORGOTPASS',
    });
  };

  const loginCallback = async() => {
    if (typeof window !== 'undefined') {
      if(error) console.log(JSON.stringify(error, null, 2));
      if(data){
        console.log(data)
        localStorage.setItem('access_token', `${email}.${password} `);
        authDispatch({ type: 'SIGNIN_SUCCESS' });
        closeModal();
      }
     
      if (!loading){
        const user = await data
        console.log(data)
         
       }

      



    }
  };

  return (
    <Wrapper>
      <Container>
        {/* <LogoWrapper>
          <Image url={PickBazar} />
        </LogoWrapper> */}

        <Heading>
          <FormattedMessage id='welcomeBack' defaultMessage='Welcome Back' />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id='loginText'
            defaultMessage='Login with your email &amp; password'
          />
        </SubHeading>
        <form onSubmit={loginCallback}>
          <FormattedMessage
            id='emailAddressPlaceholder'
            defaultMessage='Email Address.'
          >
            {(placeholder) => (
              <Input
                type='email'
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            )}
          </FormattedMessage>

          <FormattedMessage
            id='passwordPlaceholder'
            defaultMessage='Password (min 6 characters)'
            values={{ minCharacter: 6 }}
          >
            {(placeholder) => (
              <Input
                type='password'
                placeholder={placeholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            )}
          </FormattedMessage>

          <Button
            fullwidth
            title={'Continue'}
            intlButtonId='continueBtn'
            type='submit'
            style={{ color: '#fff' }}
          />
        </form>
        <Divider>
          <span>
            <FormattedMessage id='orText' defaultMessage='or' />
          </span>
        </Divider>

        <Button
          fullwidth
          title={'Continue with Facebook'}
          className='facebook'
          icon={<Facebook />}
          iconPosition='left'
          iconStyle={{ color: '#ffffff', marginRight: 5 }}
          intlButtonId='continueFacebookBtn'
          onClick={loginCallback}
          style={{ color: '#fff' }}
        />

        <Button
          fullwidth
          title={'Continue with Google'}
          className='google'
          icon={<Google />}
          iconPosition='left'
          iconStyle={{ color: '#ffffff', marginRight: 5 }}
          intlButtonId='continueGoogleBtn'
          onClick={loginCallback}
          style={{ color: '#fff' }}
        />

        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id='dontHaveAccount'
            defaultMessage="Don't have any account?"
          />{' '}
          <LinkButton onClick={toggleSignUpForm}>
            <FormattedMessage id='signUpBtnText' defaultMessage='Sign Up' />
          </LinkButton>
        </Offer>
      </Container>

      <OfferSection>
        <Offer>
          <FormattedMessage
            id='forgotPasswordText'
            defaultMessage='Forgot your password?'
          />{' '}
          <LinkButton onClick={toggleForgotPassForm}>
            <FormattedMessage id='resetText' defaultMessage='Reset It' />
          </LinkButton>
        </Offer>
      </OfferSection>
    </Wrapper>
  );
}
