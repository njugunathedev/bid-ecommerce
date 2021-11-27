import React from 'react';
import {
  MainMenu,
  SelectedItem,
  Icon,
  Arrow,
  LeftMenuBox,
} from './LeftMenu.style';
import Popover from 'components/Popover/Popover';
import {
  MenuDown,
  FruitsVegetable,
  FacialCare,
  Handbag,
  DressIcon,
  FurnitureIcon,
  HomeIcon,
  BookIcon,
  MedicineIcon,
} from 'components/AllSvgIcon';
import NavLink from 'components/NavLink/NavLink';
import {
  HOME_PAGE,
  GROCERY_PAGE,
  CLOTHING,
  MAKEUP_PAGE,
  BAGS_PAGE,
  FURNITURE_PAGE,
  BOOK_PAGE,
  MEDICINE_PAGE,
} from 'constants/navigation';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import Logo from 'components/Logo/Logo';
const MENU_ITEMS = [
  {
    link: HOME_PAGE,
    icon: <HomeIcon />,
    label: 'Home',
    intlId: 'navHomeMenu',
  },
  {
    link: GROCERY_PAGE,
    icon: <FruitsVegetable />,
    label: 'Computing',
    intlId: 'navGroceryMenu',
  },
  {
    link: MAKEUP_PAGE,
    label: 'Gaming',
    icon: <FacialCare />,
    intlId: 'navMakeupMenu',
  },
  {
    link: BAGS_PAGE,
    label: 'Phones and tablets',
    icon: <Handbag />,
    intlId: 'navBagsMenu',
  },
  {
    link: CLOTHING,
    label: 'Clothing',
    icon: <DressIcon />,
    intlId: 'navClothingMenu',
  },
  {
    link: FURNITURE_PAGE,
    label: 'Home appliances',
    icon: <FurnitureIcon width='15px' height='13px' />,
    intlId: 'navFurnitureMenu',
  },
  {
    link: BOOK_PAGE,
    label: 'IT accessories',
    icon: <BookIcon width='15px' height='13px' />,
    intlId: 'navBookMenu',
  },
  {
    link: MEDICINE_PAGE,
    label: 'Smartphones',
    icon: <MedicineIcon width='15px' height='13px' />,
    intlId: 'navMedicineMenu',
  },
];

const CategoryMenu = ({ onClick }) => {
  return (
    <>
      {MENU_ITEMS.map((item) => (
        <NavLink
          key={item.link}
          onClick={() => onClick(item)}
          className='menu-item'
          href={item.link}
          label={item.label}
          icon={item.icon}
          iconClass='menu-item-icon'
          intlId={item.intlId}
        />
      ))}
    </>
  );
};

type Props = {
  logo: string;
};

export const LeftMenu: React.FC<Props> = ({ logo }) => {
  const { pathname } = useRouter();
  const initialMenu = MENU_ITEMS.find((item) => item.link === pathname);
  const [activeMenu, setActiveMenu] = React.useState(
    initialMenu ?? MENU_ITEMS[0]
  );

  return (
    <LeftMenuBox>
      <Logo
        imageUrl={logo}
        alt={'Shop Logo'}
        onClick={() => setActiveMenu(MENU_ITEMS[0])}
      />

      <MainMenu>
        <Popover
          className='right'
          handler={
            <SelectedItem>
              <span>
                <Icon>{activeMenu?.icon}</Icon>
                <span>
                  <FormattedMessage
                    id={activeMenu?.intlId}
                    defaultMessage={activeMenu?.label}
                  />
                </span>
              </span>
              <Arrow>
                <MenuDown />
              </Arrow>
            </SelectedItem>
          }
          content={<CategoryMenu onClick={setActiveMenu} />}
        />
      </MainMenu>
    </LeftMenuBox>
  );
};
