import React from 'react'

interface HeadingProps {
    title: string,
    center?: boolean
}
const Headings: React.FC<HeadingProps> = ({ title, center }) => {
    return (
        <div className={center ? `text-center` : "text-start"}>
            <h1 className=" font-bold text-2xl">{title}</h1>
        </div>
    )
}

export default Headings