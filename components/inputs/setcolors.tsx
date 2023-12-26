'use client'
import { ImgeType } from '@/app/(site)/admin/add-products/Addproudctform';
import React, { FC, useCallback, useEffect, useState } from 'react';

import SelectedImg from './SelectImgType';
import Button from '@/app/components/products/Button';

interface SelectColorProps {
    item: ImgeType;
    addImgeToState: (value: ImgeType) => void;
    removeImgFromState: (value: ImgeType) => void;
    isProductCreated: boolean;
}

const SetColors: FC<SelectColorProps> = ({ item, addImgeToState, removeImgFromState, isProductCreated }) => {
    const [isSelected, setSelected] = useState<boolean>(false);
    const [files, setFiles] = useState<File | null>(null);

    useEffect(() => {
        if (isProductCreated) {
            setFiles(null);
            setSelected(false);
        }
    }, [isProductCreated]);

    const handleFileChange = useCallback(
        (value: File) => {
            setFiles(value);
            addImgeToState({ ...item, image: value });
        },
        [addImgeToState, item]
    );

    const handleCheck = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSelected(e.target.checked);

            if (!e.target.checked) {
                setFiles(null);
                removeImgFromState(item);
            }
        },
        [removeImgFromState, item]
    );

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2'>
            <div className='flex flex-row gap-2 items-center h-[60px]'>
                <input type='checkbox' onChange={handleCheck} className='cursor-pointer' id={item.color} />
                <label className='font-medium cursor-pointer' htmlFor={item.color}>
                    {item.color}
                </label>
            </div>
            <div className=''>
                {isSelected && !files && <SelectedImg item={item} handleSubmit={handleFileChange} />}
                {files && (
                    <div className='flex flex-row gap-2 text-sm col-span-2'>
                        <p>{files.name}</p>
                        <div className='w-[70px]'>
                            <Button label='cancel' onclick={() => setFiles(null)} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SetColors;
