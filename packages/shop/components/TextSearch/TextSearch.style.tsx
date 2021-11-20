import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Wrapper = styled.div`
  > div {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    > label {
      color: ${themeGet('colors.darkBold', '#1C0C5B')};
      font-size: 16px;
      line-height: 19px;
      font-weight: 700;
    }
  }

  .inner-wrap {
    width: 100%;
    margin-top: 15px;
    box-sizing: border-box;
    position: relative;

    &:only-child {
      margin: 0;
    }

    input,
    input[type='text'] {
      width: 100%;
      height: 54px;
      border-radius: 6px;
      font-family: ${themeGet('colors.fontFamily', 'Lato, sans-serif')};
      border: 1px solid ${themeGet('colors.borderColor', '#e6e6e6')};
      color: ${themeGet('colors.darkBold', '#1C0C5B')};
      font-size: 16px;
      line-height: 19px;
      font-weight: 400;
      padding: 0 18px;
      box-sizing: border-box;
      transition: border-color 0.25s ease;

      &:hover,
      &:focus {
        outline: 0;
      }

      &:focus {
        border-color: ${themeGet('colors.primary', '#160da4')};
      }

      &::placeholder {
        color: ${themeGet('colorsdarkRegular', '#77798C')};
      }
    }
  }

  &.disabled {
    .inner-wrap {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &.with-search-icon {
    .inner-wrap {
      position: relative;

      .search-icon {
        width: 45px;
        height: 100%;
        font-size: 15px;
        color: ${themeGet('colorsdarkRegular', '#77798C')};
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;

        &.right {
          right: 0;
          left: auto;
        }
      }

      .icon-left {
        padding-left: 45px;
      }

      .icon-right {
        padding-right: 45px;
      }
    }
  }
`;
