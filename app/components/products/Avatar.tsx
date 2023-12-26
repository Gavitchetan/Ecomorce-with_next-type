import { Avatar } from '@mui/material';
import Image from 'next/image';
import React from 'react'


interface AvatarProps {
    src?: string | null | undefined;
}
const Avatarc: React.FC<AvatarProps> = ({ src }) => {
    return (
        <div>
            {
                src ? <img src={src} className=' rounded-full' alt='' /> : <Avatar />
            }

        </div>
    )
}

export default Avatarc