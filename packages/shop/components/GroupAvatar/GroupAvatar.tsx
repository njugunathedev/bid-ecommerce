import React from 'react';
import { Avatar, AvatarGroup } from '@mui/material';


function stringAvatar(name) {
    return {
        sx: {
            bgcolor: '#FF2442',
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
const GroupAvatar: React.FC = () => {

    return (
        <AvatarGroup max={4}>
            <Avatar {...stringAvatar('John Doe')} />
            <Avatar {...stringAvatar('John Doe')} />
            <Avatar {...stringAvatar('John Doe')} />
            <Avatar {...stringAvatar('John Doe')} />
            <Avatar {...stringAvatar('John Doe')} />
            <Avatar {...stringAvatar('John Doe')} />

        </AvatarGroup>
    );
}
export default GroupAvatar;
