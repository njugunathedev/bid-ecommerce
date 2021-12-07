import React from 'react';
import Router from 'next/router';
import { closeModal } from '@redq/reuse-modal';
import Button from 'components/Button/Button';
import {
    QuickViewWrapper,
    ProductDetailsWrapper,
    ProductPreview,
    DiscountPercent,
    ProductInfoWrapper,
    ProductInfo,
    ProductTitlePriceWrapper,
    ProductTitle,
    ProductWeight,
    ProductDescription,
    ProductMeta,
    ProductCartWrapper,
    ProductPriceWrapper,
    ProductPrice,
    SalePrice,
    ProductCartBtn,
    MetaSingle,
    MetaItem,
    ModalClose,
} from './QuickView.style';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { CURRENCY } from 'helper/constant';
import { CloseIcon, CartIcon } from 'components/AllSvgIcon';
import ReadMore from 'components/Truncate/Truncate';
import CarouselWithCustomDots from 'components/MultiCarousel/MultiCarousel';
import { useLocale } from 'contexts/language/language.provider';
import { useCart } from 'contexts/cart/use-cart';
import { Counter } from 'components/Counter/Counter';

type QuickViewProps = {
    modalProps: any;
    deviceType: any;
    onModalClose: any;
};

const QuickView: React.FunctionComponent<QuickViewProps> = ({
    modalProps,
    deviceType,
    onModalClose,
}) => {
    const { addItem, removeItem, isInCart, getItem } = useCart();
    const {
        id,
        type,
        title,
        unit,
        price,
        discountInPercent,
        salePrice,
        description,
        gallery,
        categories,
    } = modalProps;

    const { isRtl } = useLocale();

    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) {
        return { name, calories, fat, carbs, protein };
    }
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    const handleAddClick = (e: any) => {
        e.stopPropagation();
        addItem(modalProps);
    };

    const handleRemoveClick = (e: any) => {
        e.stopPropagation();
        removeItem(modalProps);
    };
    function onCategoryClick(slug) {
        Router.push({
            pathname: `/${type.toLowerCase()}`,
            query: { category: slug },
        }).then(() => window.scrollTo(0, 0));
        closeModal();
    }

    return (
        <>
            <ModalClose onClick={onModalClose}>
                <CloseIcon />
            </ModalClose>
            <QuickViewWrapper>
                <ProductDetailsWrapper className='product-card' dir='ltr'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert (100g serving)</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </ProductDetailsWrapper>
            </QuickViewWrapper>
        </>
    );
};

export default QuickView;
