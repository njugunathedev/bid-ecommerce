import React from 'react';
import { useRouter } from 'next/router';
import { Modal } from '@redq/reuse-modal';
import { withApollo } from 'helper/apollo';
import { SEO } from 'components/seo';
import NavLink from 'components/NavLink/NavLink';
import StoreNav from 'components/StoreNav/StoreNav';
import Carousel from 'components/Carousel/Carousel';
import PCarosel from 'components/Carousel/ProductCarousel';
import Banner from 'containers/Banner/Banner';
import Sidebar from 'containers/Sidebar/Sidebar';
import { ArrowDown } from 'components/AllSvgIcon';
import Products from 'containers/Products/Products';
import CartPopUp from 'containers/Cart/CartPopUp';
import {
  MainContentArea,
  SidebarSection,
  ContentSection,
  OfferSection,
  MobileCarouselDropdown,
} from 'styled/pages.style';
// Static Data Import Here
import OFFERS from 'data/offers';
import BannerImg from 'image/home.jpg';
import storeType from 'constants/storeType';

const PAGE_TYPE = 'home';


function HomePage({ deviceType }) {


  const { query } = useRouter();
  const targetRef = React.useRef(null);
  const options = [
    { value: 'computing', name: 'Computing and Accessories', id: '1' },
    { value: 'computers', name: 'Laptops & Computers', id: '2' },
    { value: 'gaming', name: 'Gaming Consoles', id: '3' },
    { value: 'smartphones', name: 'Phones', id: '4' },
    { value: 'cameras', name: 'Cameras', id: '5' },
    { value: 'bluetooth-speakers', name: 'Bluetooth Speakers', id: '6' },
    { value: 'home-theaters', name: 'Home Theaters', id: '6' },

  ];



  React.useEffect(() => {
    if ((query.text || query.category) && targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 110,
        behavior: 'smooth',
      });
    }
  }, [query]);

  return (
    <>
      <SEO title='Home - Lucky Arcade' description='Home' />
      <Modal>
        <Banner
          intlTitleId='groceriesTitle'
          intlDescriptionId='groceriesSubTitle'
          imageUrl={BannerImg}
        />

        {deviceType.desktop ? (
          <>
            <MobileCarouselDropdown>
              <StoreNav items={storeType} />
              <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
            </MobileCarouselDropdown>
            <OfferSection>
              <div style={{ margin: '0 -10px' }}>
                <Carousel deviceType={deviceType} data={OFFERS} />
              </div>
            </OfferSection>
            <MainContentArea>
              <ContentSection style={{ width: '100%' }}>
                {options.map((item: any, index: number) =>
                (
                  
                  <OfferSection>
                    <h4
                      style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        marginBottom: '20px',
                        marginTop: '0',
                        color: '#998CEB',
                      }}
                    >
                      {item.name}
                    </h4>
                    <a 
                      href={`/${item.value}`}
                      style={{ display: 'flex', alignItems: 'center', float: 'left' }}
                    >
                      <span style={{ fontFamily: `'Lato', sans-serif`, color: "#1C0C5B", fontWeight: "bold" }}>
                        See More <ArrowDown />
                      </span>
                    </a>
                    <div style={{ margin: '0 -10px' }}>
                      <PCarosel
                        type={item.value}
                        deviceType={deviceType}
                        fetchLimit={16}
                      />
                    </div>
                  </OfferSection>

                )
                )}


              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <StoreNav items={storeType} />
            <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
            <OfferSection>
              <div style={{ margin: '0 -10px' }}>
                <Carousel deviceType={deviceType} data={OFFERS} />
              </div>
            </OfferSection>
            <ContentSection style={{ width: '100%' }}>
              <OfferSection>
                <div style={{ margin: '0 -10px' }}>
                  <PCarosel
                    type='computing'
                    deviceType={deviceType}
                    fetchLimit={16}
                  />
                </div>
              </OfferSection>
            </ContentSection>
          </MainContentArea>
        )}
        <CartPopUp deviceType={deviceType} />
      </Modal>
    </>
  );

}

export default withApollo(HomePage);
