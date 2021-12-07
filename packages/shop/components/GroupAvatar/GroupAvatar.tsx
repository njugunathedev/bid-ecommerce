import React from 'react';
import { Avatar, AvatarGroup } from '@mui/material';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { openModal, closeModal } from '@redq/reuse-modal';


const QuickView = "";

type dataProps = {
    data: any;
};

const GroupAvatar: React.FunctionComponent<dataProps> = ({ data }) => {
    const router = useRouter();
    const handleModalClose = () => {
        const href = `${router.pathname}`;
        const as = '/';
        router.push(href, as, { shallow: true });
        closeModal();
    };
    // const handleQuickViewModal = React.useCallback(

    // );
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: '#FF2442',
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }


    return (
        <AvatarGroup max={4}>

            {
                data.map((item, index) => (
                    <Avatar {...stringAvatar('John Doe')} />
                ))
            }

            {/* <Avatar {...stringAvatar('John Doe')} />
            <Avatar key={index} alt="John Doe" src={item.userId} />
            <Avatar {...stringAvatar('John Doe')} />
            <Avatar {...stringAvatar('John Doe')} />
            <Avatar {...stringAvatar('John Doe')} />
            <Avatar {...stringAvatar('John Doe')} /> */}



        </AvatarGroup>
    );
}

