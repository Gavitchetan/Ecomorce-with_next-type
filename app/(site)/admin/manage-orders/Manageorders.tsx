// Remove unnecessary 'use client' statement
'use client'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order, Product, User } from '@prisma/client';
import React, { FC, useCallback } from 'react';
import { formatPrice } from "@/utils/formatprice";
import Headings from "@/app/components/products/Headings";
import Status from "@/components/Status";
import { MdCached, MdDeliveryDining, MdDone, MdOutlineAccessTime, MdRemove, MdRemoveRedEye } from "react-icons/md";
import ActionButton from "@/app/components/ActionBTN";
import { BsEye } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteObject, ref } from "firebase/storage";
import moment from "moment";

interface OrdersProps {
    Orders: exTandedOrders[] | null;
}
type exTandedOrders = Order & {
    user: User,
}

const MOrders: FC<OrdersProps> = ({ Orders }) => {
    // Initialize rows as an empty array
    let rows: any[] = [];

    if (Orders) {
        // Assign the mapped array to rows
        rows = Orders.map((order) => ({
            id: order.id,
            amount: formatPrice(order.amount / 100),
            name: order.user.name,
            payment_status: order.status,
            date: moment(order.createdAt).fromNow(),
            deleveryStatus: order.deliveryStatus,
            paymentStatus: order.status,
        }));
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: "name", headerName: "Customer name", width: 120 },
        {
            field: "amount", headerName: "TotalAmout(IND)", width: 100, renderCell: (params) => (
                <div className="font-bold text-slate-800">{params.row.amount}</div>
            )
        },
        // { field: "paymentStatus", headerName: "Payment status", width: 220 },
        {
            field: "deleveryStatus", headerName: "Delevery Status", width: 120, renderCell: (params) => (
                <div className="font-bold text-slate-800 bg-green-400 ">
                    {
                        params.row.deleveryStatus == "Pending" ?
                            <Status Icon={MdOutlineAccessTime} color="text-rose-800" bg="bg-rose-200" text="Pendig" /> : params.row.deleveryStatus == "dispatched" ? <Status Icon={MdDeliveryDining} color="text-purple-800" bg="bg-purple-200" text="dispatch" /> : params.row.deleveryStatus == "delivered" ? <Status Icon={MdDone} color="text-purple-800" bg="bg-purple-200" text="Deleverd" /> : <></>
                    }
                </div>
            )
        },
        {
            field: "paymentStatus", headerName: "Payment status", width: 120, renderCell: (params) => (
                <div key={'paymentStatus'} className="font-bold text-slate-800 bg-green-400 ">
                    {
                        params.row.paymentStatus == "pending" ?
                            <Status Icon={MdOutlineAccessTime} color="text-rose-800" bg="bg-rose-200" text="Pendig" /> : params.row.paymentStatus !== "compleated" ? <Status Icon={MdDeliveryDining} color="text-purple-800" bg="bg-purple-200" text="dispatch" /> : <></>
                    }
                </div>
            )
        },


        {
            field: "actions", headerName: "Actions", width: 220, renderCell: (params) => (
                <div className=" flex justify-between gap-4  w-full ">
                    <ActionButton disabled={false} onClick={() => { HandleDispached(params.row.id, params.row.inStock) }} Icon={MdDeliveryDining} />
                    <ActionButton disabled={false} onClick={() => { HandleDeleverid(params.row.id, params.row.inStock) }} Icon={MdDone} />
                    <ActionButton disabled={false} onClick={() => { router.push(`order/${params.row.id}`) }} Icon={MdRemoveRedEye} />

                </div>
            )
        },
        // Add other columns as needed
    ];



    const router = useRouter();
    // product action  Update actions for Delete , chage stock status  and hide

    const HandleDispached = useCallback(
        (id: string, inStock: boolean) => {
            axios.put('/api/v1/order', { id, deliveryStatus: "dispatched" }).then((res) => {
                toast.success('Product Has Dispatched');
                router.refresh()
            }).catch((er) => {
                toast.error('Opps! somthing wend Wrong')
            })
        },
        [],
    )

    const HandleDeleverid = useCallback(
        (id: string, inStock: boolean) => {
            axios.put('/api/v1/order', { id, deliveryStatus: "delivered" }).then((res) => {
                toast.success('Product Has Delevired');
                router.refresh()
            }).catch((er) => {
                toast.error('Opps! somthing wend Wrong')
            })
        },
        [],
    )
    // deletign products 





    return (
        <div className=" max-w-[1150px] m-auto text-xl  ">
            <div className=" mb-4 mt-10   relative left-[40%]">
                <Headings title=" Manage Manage orders" />
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

export default MOrders;
