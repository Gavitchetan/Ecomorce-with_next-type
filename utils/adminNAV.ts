import { MdDashboard, MdFormatListBulleted, MdHistory, MdLibraryAdd, MdManageHistory, MdSell } from "react-icons/md"

export const adminOptions = [
    {
        label: "Dashboard",
        Icon: MdDashboard,
        path: "admin/dashboard"
    },
    {
        label: "Manage Products",
        Icon: MdManageHistory,
        path: "admin/manage-product"
    },
    {
        label: "Mange orders",
        Icon: MdFormatListBulleted,
        path: "admin/manage-orders"
    },
    {
        label: "Add Prodcut",
        Icon: MdLibraryAdd,
        path: "admin/add-products"
    },
    {
        label: "Sells",
        Icon: MdSell,
        path: "admin/sells"
    },
]
export default adminOptions