import react, { useEffect, useState } from "react";
import { apiHelper } from "../../helpers/ApiHelper";
import Loader from '../Shared/Loader/Index'

export default function Index(){


    const [paymentHistoryList, setPaymentHistoryList] = useState([])
    const [loading, set_loading] = useState(true)

    useEffect(() => {
        getPaymentHistory();
    }, [])

    const getPaymentHistory = async () => {
        const user_token = localStorage.getItem('userToken')
        const headers = {
            Authorization: user_token
        }
        const res = await apiHelper('transaction/history', 'GET', null, headers)
        if(res.data.status){
            let paymentHistories = res.data.data;
            setPaymentHistoryList(paymentHistories)
            set_loading(false)
            console.log('paymentHistories list === ', paymentHistories)
        }
    }

    return <div className="pb-4">
        <div className="flex justify-between items-center ml-auto py-2">
            <div>
                <span className="px-3  font-bold mr-5 w-48">Payment History</span>
            </div>
            <div>
                <label for="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                </div>
            </div>

        </div>


        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {/* bg-gray-50 
        text-gray-700
        */}
        <thead className="text-xs text-white uppercase  dark:bg-gray-700 dark:text-gray-400 bg-[#eda110]">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Transaction ID
                </th>
               <th scope="col" className="px-6 py-3">
                    Discount Amount
                </th>
                <th scope="col" className="px-6 py-3">
                    Sub Total
                </th>                
                <th scope="col" className="px-6 py-3">
                    Total Price 
                </th>
                <th scope="col" className="px-6 py-3">
                    Paid Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Order Status
                </th>
            </tr>
        </thead>
        <tbody>
                        {/* "order_id": 4,
            "transaction_id": "EC-0P5589884B677491H",
            "sub_total": 24.99,
            "coupon_discount": 0,
            "referral_discount": 0,
            "total_price": 24.99,
            "timestamp": "2023-03-16T15:54:48.000Z",
            "order_status_description": "Processing" */}
            {paymentHistoryList.map(o => {
                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                        <div className="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                        </div>
                    </td>
                    <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        {o.order_id}
                    </td>
                    <td className="px-6 py-4">
                        {o.transaction_id}
                    </td>
                    <td className="px-6 py-4">
                        ${(o.coupon_discount + o.referral_discount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                        ${o.sub_total.toFixed(2) }
                    </td>
                    <td className="px-6 py-4">
                        ${o.total_price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                        {o.timestamp}
                    </td>
                    {o.order_status_description == "Processing" ?
                    <td className="px-6 py-4 text-blue-600">
                        {o.order_status_description}
                    </td> : <td className="px-6 py-4 text-green-500">
                        {o.order_status_description}
                    </td>}
                    
                    {/* <td className="px-6 py-4 space-x-2">
                        <Link href={`/order/${o.id}`} className="font-medium text-yellow-600 dark:text-blue-500 hover:underline">View/Edit</Link>
                        <span onClick={() => removeOrder(o.id)} className="font-medium text-yellow-600 dark:text-blue-500 hover:underline cursor-pointer">Delete</span>
                    </td> */}
                </tr>
            })}
            
        </tbody>
    </table>

    {loading && <Loader />}
    {!loading && paymentHistoryList.length == 0 && <p className=" text-gray-700 p-4 text-center font-semibold text-xl">No record found</p>}
    </div>
}