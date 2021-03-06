import React from 'react';
import Image from 'components/Image/Image';
import Button from '../Button/Button';
import { BidIcon } from '../AllSvgIcon';
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  SaleTag,
  DiscountPercent,
} from './ProductCard.style';
import { useCart } from 'contexts/cart/use-cart';
import { Counter } from 'components/Counter/Counter';
import { cartAnimation } from 'helper/cart-animation';
import BidProgressBar from 'components/ProgressBar/BidProgressBar';
type ProductCardProps = {
  title: string;
  image: any;
  weight: string;
  totalTickets: number;
  currency: string;
  description: string;
  price: number;
  tickets: any;
  salePrice?: number;
  discountInPercent?: number;
  data: any;
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
  increment?: (e: any) => void;
  decrement?: (e: any) => void;
  cartProducts?: any;
  addToCart?: any;
  updateCart?: any;
  value?: any;
  deviceType?: any;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  weight,
  tickets,
  totalTickets,
  price,
  salePrice,
  discountInPercent,
  cartProducts,
  addToCart,
  updateCart,
  value,
  currency,
  onChange,
  increment,
  decrement,
  data,
  deviceType,
  onClick,
  ...props
}) => {
  const { addItem, removeItem, getItem, isInCart, items } = useCart();
  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
    if (!isInCart(data.id)) {
      cartAnimation(e);
    }
  };
  const handleInstantBuy = (e) => {
    e.stopPropagation();
    let value = 10;
    for (let i = 0; i < value; i++) {
      addItem(data);
    }
    if (!isInCart(data.id)) {
      cartAnimation(e);
    }
  };
  
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };

  return (
    <ProductCardWrapper onClick={onClick} className="product-card">
      <ProductImageWrapper>
        <Image
          url={image}
          className="product-image"
          style={{ position: 'relative' }}
          alt={title}
        />
        {discountInPercent ? (
          <>
            <DiscountPercent>{discountInPercent}%</DiscountPercent>
          </>
        ) : (
          ''
        )}
      </ProductImageWrapper>
      <ProductInfo>
        <h3 className="product-title">{title}</h3>
        <span className="product-weight">{weight}</span>
        <div className="product-meta">
          <div className="productPriceWrapper">
            {discountInPercent ? (
              <span className="discountedPrice">
                {currency}
                {price}
              </span>
            ) : (
              ''
            )}

            <span className="product-price">
              {currency}
              {salePrice ? salePrice : price}
            </span>
          </div>

          {!isInCart(data.id) ? (
            <Button
              title="Cart"
              intlButtonId="addCartButton"
              iconPosition="left"
              colors="primary"
              size="small"
              variant="outlined"
              disabled = {data.ticket.length === data.totalTickets ? true : false }
              className="cart-button"
              icon={<BidIcon />}
              onClick={handleAddClick}
            />
          ) : (
            <Counter
              value={getItem(data.id).quantity}
              onDecrement={handleRemoveClick}
              onIncrement={handleAddClick}
            />
          )}
          <Button
            title="Instant Buy"
            intlButtonId="instant Buy"
            iconPosition="left"
            colors="secondary"
            size="small"
            variant="outlined"
            className="cart-button"
            disabled = { data.ticket.length !== 0 ? true : false }
            icon={<BidIcon />}
            onClick={handleInstantBuy}
          />

        </div>
        <div>
          <BidProgressBar totalBids={tickets.length} />
          <span className="bids-left">
            Bids Left: {
              data.totalTickets - data.ticket.length
            }
            
          </span>
        </div>
        
       
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
