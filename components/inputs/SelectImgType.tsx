"use client"
import { ImgeType } from '@/app/(site)/admin/add-products/Addproudctform';
import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface selectedImageProps {
    item?: ImgeType;
    handleSubmit: (value: File) => void;
}
// import { } from "./"
const MyDropzone: FC<selectedImageProps> = ({ handleSubmit, item }) => {
    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            handleSubmit(acceptedFiles[0]);
        }
        // Do something with the files
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.svg'] }
    });

    return (
        <div {...getRootProps()} className='cursor-pointer text-sm items-center flex justify-center border-2 border-slate-400 p-2 border-dashed'>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
    );
};

export default MyDropzone;

// 1: 33: 54;