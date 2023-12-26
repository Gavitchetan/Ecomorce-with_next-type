'use client'
import { ImgeType } from '@/app/(site)/admin/add-products/Addproudctform'
import React, { FC, useCallback, useEffect, useState } from 'react'

import SelectedImg from "./SelectImgType"
// import { Button } from '@mui/material'
import Button from '@/app/components/products/Button'

interface selectcolorprops {
    item: ImgeType,
    addImgeTostate: (value: ImgeType) => void,
    removeImgFromState: (value: ImgeType) => void,
    isProductCreted: boolean,
}
const setcolors: FC<selectcolorprops> = ({ item, addImgeTostate, removeImgFromState, isProductCreted }) => {
    const [isSelected, setSelected] = useState<boolean>(false);
    const [files, setFiles] = useState<File | null>(null)

    useEffect(() => {

        if (isProductCreted) {
            setFiles(null)
            setSelected(false)
        }
    }, [isProductCreted])

    const handleFileChange = useCallback(
        (value: File) => {
            setFiles(value);
            addImgeTostate({ ...item, image: value })

        },
        [],
    )
    const HandleCheck = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSelected(e.target.checked)

            if (!e.target.checked) {
                setFiles(null)
                removeImgFromState(item)

            }

        },
        [],
    )

    return (
        <div className=' grid grid-cols-1 md:grid-cols-2 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2'>
            <div className=" flex flex-row  gap-2  items-center h-[60px]">
                <input type="checkbox" onChange={HandleCheck} className=' cursor-pointer' id={item.color} />
                <label className=' font-medium cursor-pointer' htmlFor={item.color}>{item.color}</label>
            </div>
            <div className="">
                {isSelected && !files && (

                    <SelectedImg item={item} handleSubmit={handleFileChange} />
                )}
                {
                    files && (
                        <div className=" flex flex-row gap-2 text-sm col-span-2">
                            <p>{files.name}</p>
                            <div className=' w-[70px]'>
                                <Button label='cancel' onclick={() => { setFiles(null) }} />
                            </div>
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default setcolors 