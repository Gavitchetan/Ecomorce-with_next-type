import React, { FC } from 'react'
interface BackDropsProps {
    onclick: () => void
}
const BackDrops: FC<BackDropsProps> = ({ onclick }) => {
    return (
        <div onClick={onclick} className=' w-screen h-screen fixed top-0 left-0 z-20 bg-slate-200 opacity-50'>

        </div>
    )
}

export default BackDrops