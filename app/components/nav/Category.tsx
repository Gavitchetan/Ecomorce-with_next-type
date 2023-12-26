// Categorys.tsx
'use client'
import React from 'react';
import Conteainer from '../Conteainer';
import categorydata from '@/utils/category';
import CategoryComponente from './CategoryComponente';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const Categorys = () => {
    const pathname = usePathname();
    const params = useSearchParams();
    const category = params?.get('category');

    // if (pathname === '/') {
    //     return null; // or any other handling if needed for the home page
    // }

    return (
        <div className='bg-white'>
            <Conteainer>
                <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                    {categorydata.map((item, index) => (
                        <CategoryComponente
                            key={item.label}
                            title={item.label}
                            icon={item.icon}
                            selected={category === item.label || (category === null && item.label === 'All')}
                        />
                    ))}
                </div>
            </Conteainer>
        </div>
    );
};

export default Categorys;
