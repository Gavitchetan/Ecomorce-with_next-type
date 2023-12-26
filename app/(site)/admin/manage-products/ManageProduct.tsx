// Remove unnecessary 'use client' statement
'use client'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from '@prisma/client';
import React, { FC, useCallback } from 'react';
import { formatPrice } from "@/utils/formatprice";
import Headings from "@/app/components/products/Headings";
import Status from "@/components/Status";
import { MdCached, MdDone, MdRemove, MdRemoveRedEye } from "react-icons/md";
import ActionButton from "@/app/components/ActionBTN";
import { BsEye } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteObject, ref } from "firebase/storage";
import storage from "@/libs/Firebase";

interface ProductsProps {
    product: Product[] | null;
}

const Mproducts: FC<ProductsProps> = ({ product }) => {
    // Initialize rows as an empty array
    let rows: any[] = [];

    if (product) {
        // Assign the mapped array to rows
        rows = product.map((item) => ({
            id: item.id,
            price: formatPrice(item.price),
            name: item.name,
            category: item.category,
            reviews: item.brand,
            inStock: item.inStock,
            images: item.images,
        }));
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: "name", headerName: "Name", width: 220 },
        {
            field: "price", headerName: "Price(IND)", width: 100, renderCell: (params) => (
                <div className="font-bold text-slate-800">{params.value}</div>
            )
        },
        { field: "category", headerName: "category", width: 220 },
        { field: "brand", headerName: "Brand", width: 220 },
        {
            field: "inStock", headerName: "inStock", width: 120, renderCell: (params) => (
                <div className="font-bold text-slate-800 bg-green-400 ">
                    {
                        params.value === true ?
                            <Status Icon={MdDone} color="text-teal-800" bg="bg-teal-200" text="Instock" /> :
                            <Status Icon={MdDone} color="text-rose-800" bg="bg-rose-200" text="out of Stock" />}
                </div>
            )
        },
        {
            field: "actions", headerName: "Actions", width: 220, renderCell: (params) => (
                <div className=" flex justify-between gap-4  w-full ">
                    <ActionButton disabled={false} onClick={() => { HandleToggleStock(params.row.id, params.row.inStock) }} Icon={MdCached} />
                    <ActionButton disabled={false} onClick={() => { ondDeleteProduct(params.row.id, params.row.images) }} Icon={MdRemove} />
                    <ActionButton disabled={false} onClick={() => { router.push(`product/${params.row.id}`) }} Icon={MdRemoveRedEye} />

                </div>
            )
        },
        // Add other columns as needed
    ];



    const router = useRouter();
    // product action  Update actions for Delete , chage stock status  and hide

    const HandleToggleStock = useCallback(
        (id: string, inStock: boolean) => {
            axios.put('/api/v1/product', { id, inStock: !inStock }).then((res) => {
                toast.success('Product status is changed');
                router.refresh()
            }).catch((er) => {
                toast.error('Opps! somthing wend Wrong')
            })
        },
        [],
    )
    // deletign products 
    const ondDeleteProduct = useCallback(
        async (id: string, images: any) => {
            const confirms = confirm('Do you really want to delete the product?');
            if (confirms === false) return;
            console.log(id, 'id')
            try {
                // Delete the product using API call

                // Handle deletion of associated images
                await HandleDelete(images);
                await axios.delete(`/api/v1/product/${id}`).then(() => {
                    toast.success('product is deleted succesfully');
                    router.refresh()
                }).catch((er) => {
                    console.log(er)
                    toast.error('Somthing Went Wrong')
                })

                // Refresh the page or update the product list
                router.refresh();
            } catch (error) {
                toast.error('Oops! Something went wrong');
            }
        },
        [router],
    );

    const HandleDelete = async (images: any) => {
        try {
            await Promise.all(
                images.map(async (item: any) => {
                    if (item.image) {
                        toast('Deleting iamges First Keep On web Do Not leave')
                        const imageRef = ref(storage, item.image);
                        await deleteObject(imageRef);
                        console.log('Image deleted:', item.image);
                        toast('product is deling Just wait few seconds')
                    }
                })
            );
        } catch (error) {
            console.error('Error deleting images:', error);
            // Handle error accordingly
        }
    };




    return (
        <div className=" max-w-[1150px] m-auto text-xl  ">
            <div className=" mb-4 mt-10   relative left-[40%]">
                <Headings title=" Manage Products" />
            </div>
            <div >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
};

export default Mproducts;
