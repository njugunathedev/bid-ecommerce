import React from 'react';
import Carousel from 'react-multi-carousel';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CURRENCY } from 'helper/constant';
import { ProductCardWrapper} from '../../containers/Products/Products.style';
import ProductCard from 'components/ProductCard/ProductCard';
import { themeGet } from '@styled-system/theme-get';
import Fade from 'react-reveal/Fade';
import { ArrowNext, ArrowPrev } from '../AllSvgIcon';
import { useLocale } from 'contexts/language/language.provider';
import NoResultFound from 'components/NoResult/NoResult';
const ButtonPrev = styled('button')`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: ${themeGet('colors.primary', '#009E7F')};
  padding: 0;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 40px;
  margin-top: -20px;
  z-index: 99;
`;

const ButtonNext = styled('button')`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: ${themeGet('colors.primary', '#009E7F')};
  padding: 0;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 40px;
  margin-top: -20px;
  z-index: 99;
`;

const ButtonGroupWrapper = styled('div')``;
const GET_PRODUCTS = gql`
  query getProducts(
    $type: String
    $text: String
    $category: String
    $offset: Int
    $limit: Int
  ) {
    products(
      type: $type
      text: $text
      category: $category
      offset: $offset
      limit: $limit
    ) {
      items {
        id
        title
        slug
        unit
        price
        salePrice
        description
        discountInPercent
        type
        image
        gallery {
          url
        }
        categories {
          id
          title
          slug
        }
      }
      hasMore
    }
  }
`;

const PrevButton = ({ onClick, children }: any) => {
  return (
    <ButtonPrev
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="prevButton"
    >
      {children}
    </ButtonPrev>
  );
};
const NextButton = ({ onClick, children }: any) => {
  return (
    <ButtonNext
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="nextButton"
    >
      {children}
    </ButtonNext>
  );
};

const ButtonGroup = ({ next, previous }: any) => {
  const { isRtl }: any = useLocale();

  return (
    <ButtonGroupWrapper>
      {isRtl ? (
        <>
          <NextButton onClick={() => next()} className="rtl">
            <ArrowPrev />
          </NextButton>
          <PrevButton onClick={() => previous()}>
            <ArrowNext />
          </PrevButton>
        </>
      ) : (
        <>
          <PrevButton onClick={() => previous()}>
            <ArrowPrev />
          </PrevButton>
          <NextButton onClick={() => next()}>
            <ArrowNext />
          </NextButton>
        </>
      )}

      {/* if prop isRtl true swap prev and next btn */}
    </ButtonGroupWrapper>
  );
};

type Props = {
  type: string;
  fetchLimit?: number;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  props?: any;
  component?: any;
  autoPlay?: boolean;
  infinite?: boolean;
  isRtl?: boolean;
  customLeftArrow?: React.ReactElement;
  customRightArrow?: React.ReactElement;
  itemClass?: string;
};
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default function CustomCarousel({
  deviceType: { mobile, tablet, desktop },
  type,
  fetchLimit,
  component,
  autoPlay = false,
  infinite = true,
  customLeftArrow,
  customRightArrow,
  itemClass,
  isRtl,
  ...props
}: Props) {
  let deviceType = 'desktop';
  if (mobile) {
    deviceType = 'mobile';
  }
  if (tablet) {
    deviceType = 'tablet';
  }
  const router = useRouter();
  const { data, error, loading, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      type: type,
      text: router.query.text,
      category: router.query.category,
      offset: 0,
      limit: fetchLimit,
    },
  });
  if (error) return <div>{error.message}</div>;
  if (!data || !data.products || data.products.items.length === 0) {
    return <NoResultFound />;
  }
  return (
    <div dir="ltr">
      <Carousel
        arrows={false}
        responsive={responsive}
        ssr={true}
        showDots={false}
        slidesToSlide={1}
        infinite={infinite}
        containerClass="container-with-dots"
        itemClass={itemClass}
        deviceType={deviceType}
        autoPlay={autoPlay}
        autoPlaySpeed={3000}
        renderButtonGroupOutside={true}
        additionalTransfrom={0}
        customButtonGroup={<ButtonGroup />}
        {...props}
        // use dir ltr when rtl true
      >
        {data.products.items.map((item: any, index: number) => {
          if (component) return component(item);
          return (
            <ProductCardWrapper>
              <Fade
                duration={800}
                delay={index * 10}
                style={{ height: '100%' }}
              >
                <ProductCard
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  weight={item.unit}
                  currency={CURRENCY}
                  price={item.price}
                  salePrice={item.salePrice}
                  discountInPercent={item.discountInPercent}
                  data={item}
                  deviceType={deviceType}
                  onClick={() => {
                    router.push('/product' + '/' + item.slug);
                  }}
                />
              </Fade>
            </ProductCardWrapper>
          );
        })}
      </Carousel>
    </div>
  );
}
