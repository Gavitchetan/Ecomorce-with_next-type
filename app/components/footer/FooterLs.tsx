import React from 'react'
interface fOoterType {
    children: React.ReactNode
}
const FooterLs: React.FC<fOoterType> = ({ children }) => {
    return (
        <div className=' 
        w-full
         sm:w-1/2
        md:w-1/4
         lg:h-1/6
         flex-col
         flex 
         gap-2
         '>
            {children}
        </div>
    )
}

export default FooterLs