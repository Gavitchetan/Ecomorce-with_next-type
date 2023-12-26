import AdminNav from '@/app/components/Admin/AdminNav'
import React, { FC, ReactNode } from 'react'
interface LayoutPros {
    children: ReactNode
}
const layout: FC<LayoutPros> = ({ children }) => {
    return (
        <div>
            <AdminNav />
            {children}

        </div>
    )
}

export default layout