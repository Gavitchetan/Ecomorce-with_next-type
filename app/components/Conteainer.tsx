import React, { ReactNode } from "react"
interface ConteainerProps {
    children: React.ReactNode
}
const Conteainer: React.FC<ConteainerProps> = ({ children }) => {
    return (
        <div className=" * mx-w[1920px] mx-auto xl:px-20   md:px-2 px-4">{children}</div>
    )
}

export default Conteainer