import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const OrderDetailsWrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

export const DeliveryInfo = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid ${themeGet('colors.borderColor', '#f1f1f1')};
  border-bottom: 1px solid ${themeGet('colors.borderColor', '#f1f1f1')};
`;

export const DeliveryAddress = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${themeGet('colors.borderColor', '#f1f1f1')};
  padding: 20px;

  h3 {
    font-family: 'Lato', sans-serif;
    font-size: ${themeGet('fontSizes.2', '15')}px;
    font-weight: ${themeGet('fontWeights.6', '700')};
    color: ${themeGet('colors.darkBold', '#1C0C5B')};
    margin-bottom: 10px;
  }
`;

export const Address = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: ${themeGet('fontSizes.2', '15')}px;
  font-weight: ${themeGet('fontWeights.3', '400')};
  color: ${themeGet('colors.darkRegular', '#132C33')};
  line-height: 1.5;
`;

export const CostCalculation = styled.div`
  width: 235px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 20px;

  @media only screen and (min-width: 768px) and (max-width: 990px) {
    width: 220px;
  }
`;

export const PriceRow = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: ${themeGet('fontSizes.2', '15')}px;
  font-weight: ${themeGet('fontWeights.3', '400')};
  color: ${themeGet('colors.darkRegular', '#132C33')};
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 0;
  }

  &.grandTotal {
    font-weight: 700;
    color: ${themeGet('colors.darkBold', '#1C0C5B')};
  }
`;

export const Price = styled.div`
  color: ${themeGet('colors.darkBold', '#1C0C5B')};
`;

export const HeadingSection = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

export const Title = styled('h3')`
  font-family: 'Poppins', sans-serif;
  font-size: ${themeGet('fontSizes.4', '21')}px;
  font-weight: ${themeGet('fontWeights.6', '700')};
  color: ${themeGet('colors.darkBold', '#1C0C5B')};
`;

export const ProgressSection = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 60px 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProgressWrapper = styled('div')`
  width: 100%;
  display: flex;
  padding: 30px 25px;
  border-bottom: 1px solid ${themeGet('colors.borderColor', '#f1f1f1')};
`;

export const OrderTable = styled('table')`
  && {
    border-collapse: collapse;

    thead {
      th {
        padding: 8px 20px;
        font-family: 'Lato', sans-serif;
        font-size: ${themeGet('fontSizes.1', '13')}px;
        font-weight: ${themeGet('fontWeights.6', '700')};
        color: ${themeGet('colors.darkBold', '#1C0C5B')};
        border: none;

        &:first-child {
          padding-left: 110px;
          text-align: left;
        }
      }
    }

    tr {
      &:hover {
        background-color: inherit;
      }

      td {
        padding: 20px;
        font-family: 'Lato', sans-serif;
        font-size: ${themeGet('fontSizes.2', '13')}px;
        font-weight: ${themeGet('fontWeights.3', '400')};
        color: ${themeGet('colors.darkBold', '#1C0C5B')};
        border-bottom: 0;
        border: none;
      }
    }
  }
`;

export const OrderTableWrapper = styled.div`
  .rc-table-content {
    border: 0;
  }
`;
