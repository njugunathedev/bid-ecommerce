import React, { useState, useCallback, Children } from 'react';
import { useForm } from 'react-hook-form';
import uuidv4 from 'uuid/v4';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDrawerDispatch } from '../../context/DrawerContext';
import Uploader from '../../components/Uploader/Uploader';
import Button, { KIND } from '../../components/Button/Button';
import DrawerBox from '../../components/DrawerBox/DrawerBox';
import { Row, Col } from '../../components/FlexBox/FlexBox';
import Input from '../../components/Input/Input';
import { Textarea } from '../../components/Textarea/Textarea';
import Select from '../../components/Select/Select';
import { FormFields, FormLabel } from '../../components/FormFields/FormFields';

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';

const options = [
  { value: 'Laptops', name: 'Laptops', id: '1' },
  { value: 'Computer Accessories', name: 'computer Accessories', id: '2' },
  { value: 'Printers and Accessories', name: 'Printers and Accessories', id: '3' },
  { value: 'Memory Devices', name: 'Computer memory devices', id: '4' },
  { value: 'Computer cables', name: 'Computer cables', id: '5' },
  { value: 'Computer Screens', name: 'Computer screens', id: '6' },
  { value: 'Laptop bags', name: 'Laptop bags', id: '7' },
  { value: 'CPUs', name: 'CPU', id: '8' },
  { value: 'computer components', name: 'Computer components', id: '9' },
  { value: '', name: 'Pants', id: '10' },
];

const typeOptions = [
  { value: 'computing', name: 'Computing', id: '1' },
  { value: 'computers', name: 'Laptops and Computers', id: '2' },
  { value: 'gaming', name: 'Gaming Consoles', id: '3' },
  { value: 'smartphones', name: 'Smart Phones', id: '4' },
];
const GET_CATEGORIES = gql`
  query getCategories($type: String, $searchBy: String) {
    categories(type: $type, searchBy: $searchBy) {
      id
      icon
      title
      slug
      type
    }
  }
`;
const GET_PRODUCTS = gql`
  query getProducts(
    $type: String
    $sortByPrice: String
    $searchText: String
    $offset: Int
  ) {
    products(
      type: $type
      sortByPrice: $sortByPrice
      searchText: $searchText
      offset: $offset
    ) {
      items {
        id
        name
        image
        type
        price
        unit
        salePrice
        discountInPercent
      }
      totalCount
      hasMore
    }
  }
`;
const CREATE_PRODUCT = gql`
  mutation createProduct($product: AddProductInput!) {
    createProduct(product: $product) {
      id
      name
      image
      slug
      type
      price
      unit
      description
      salePrice
      discountInPercent
      unit
      quantity
      creation_date
    }
  }
`;
type Props = any;

const AddProduct: React.FC<Props> = props => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, handleSubmit, setValue } = useForm();
  const [type, setType] = useState([]);
  const [tag, setTag] = useState([]);
  const [description, setDescription] = useState('');

  React.useEffect(() => {
    register({ name: 'type' });
    register({ name: 'categories' });
    register({ name: 'image', required: true });
    register({ name: 'description' });
  }, [register]);

  const handleDescriptionChange = e => {
    const value = e.target.value;
    setValue('description', value);
    setDescription(value);
  };

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    update(cache, { data: { createProduct } }) {
      const { products } = cache.readQuery({
        query: GET_PRODUCTS,
      });

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          products: {
            __typename: products.__typename,
            items: [createProduct, ...products.items],
            hasMore: true,
            totalCount: products.items.length + 1,
          },
        },
      });
    },
  });
  const handleMultiChange = ({ value }) => {
    setValue('categories', value);
    setTag(value);
  };

  const handleTypeChange = ({ value }) => {
    setValue('type', value);
    setType(value);
  };
  const handleUploader = files => {
    setValue('image', files[0].path);
  };
  const onSubmit = data => {
    const newProduct = {
      id: uuidv4(),
      title: data.name,
      type: data.type[0].value,
      description: data.description,
      image: data.image && data.image.length !== 0 ? data.image : '',
      price: Number(data.price),
      unit: data.unit,
      salePrice: Number(data.salePrice),
      discountInPercent: Number(data.discountInPercent),
      quantity: Number(data.quantity),
      slug: data.name,
      creation_date: new Date(),
    };
    console.log(newProduct, 'newProduct data');
    createProduct({
      variables: { product: newProduct },
    });
    closeDrawer();
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Product</DrawerTitle>
      </DrawerTitleWrapper>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
        <Scrollbars
          autoHide
          renderView={props => (
            <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
          )}
          renderTrackHorizontal={props => (
            <div
              {...props}
              style={{ display: 'none' }}
              className="track-horizontal"
            />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>Upload your Product image here</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: '100%',
                      height: 'auto',
                      padding: '30px',
                      borderRadius: '3px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  },
                }}
              >
                <Uploader onChange={handleUploader} />
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Add your Product description and necessary information from here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Name</FormLabel>
                  <Input
                    inputRef={register({ required: true, maxLength: 20 })}
                    name="name"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Unit</FormLabel>
                  <Input type="text" inputRef={register} name="unit" />
                </FormFields>

                <FormFields>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="price"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Sale Price</FormLabel>
                  <Input type="number" inputRef={register} name="salePrice" />
                </FormFields>

                <FormFields>
                  <FormLabel>Discount In Percent</FormLabel>
                  <Input
                    type="number"
                    inputRef={register}
                    name="discountInPercent"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Product Quantity</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="quantity"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Type</FormLabel>
                  <Select
                    options={typeOptions}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Type"
                    value={type}
                    searchable={false}
                    onChange={handleTypeChange}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      OptionContent: {
                        style: ({ $theme, $selected }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $selected
                              ? $theme.colors.textDark
                              : $theme.colors.textNormal,
                          };
                        },
                      },
                      SingleValue: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      Popover: {
                        props: {
                          overrides: {
                            Body: {
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Tag"
                    value={tag}
                    onChange={handleMultiChange}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      Popover: {
                        props: {
                          overrides: {
                            Body: {
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                    multi
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                  marginRight: '15px',
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }),
              },
            }}
          >
            Create Product
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddProduct;
