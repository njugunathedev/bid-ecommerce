import React from 'react';
import { Avatar, AvatarGroup } from '@mui/material';


type dataProps = {
    data: any;
};

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: '#FF2442',
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
const GroupAvatar: React.FunctionComponent<dataProps> = ({ data }) => {

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
export default GroupAvatar;
