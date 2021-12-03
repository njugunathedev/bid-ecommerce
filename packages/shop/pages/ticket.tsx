import React from 'react';
import { NextPage } from 'next';
import { SEO } from 'components/seo';
import Ticket from 'containers/Profile/Order/Ticket';
import { PageWrapper, SidebarSection } from 'containers/Profile/Profile.style';
import Sidebar from 'containers/Profile/Sidebar/Sidebar';
import { withApollo } from 'helper/apollo';
import { Modal } from '@redq/reuse-modal';

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const TicketPage: NextPage<Props> = ({ deviceType }) => {
  return (
    <>
      <SEO title='Tickets - Lucky Arcade' description='My Tickets' />
      <Modal>
        <PageWrapper>
          {deviceType.desktop && (
            <SidebarSection>
              <Sidebar />
            </SidebarSection>
          )}

          <Ticket deviceType={deviceType} />
        </PageWrapper>
      </Modal>
    </>
  );
};

export default withApollo(TicketPage);
