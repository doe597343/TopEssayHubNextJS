import Link from "next/link";
import react, { useEffect, useState } from "react";
import { apiHelper } from "../../../helpers/ApiHelper";
import Loader from "../Loader/Index"

export default function Index(props) {

    const [orderList, setOrderList] = useState([])
    const [all_orders, set_all_orders] = useState([])
    const [loading, set_loading] = useState(true)

    useEffect(() => {
        getOrders();
    }, [])

    const getOrders = async () => {
        const user_token = localStorage.getItem('userToken')
        const headers = {
            Authorization: user_token
        }
        const res = await apiHelper('orders/list', 'GET', null, headers)
        if(res.data.status){
            let orders = res.data.data;
            if(props.order_status){
                orders = orders.filter(o => props.order_status.includes(o.order_status_id))
            }

            setOrderList(orders)
            set_all_orders(orders)
            console.log('order list === ', orders)
            set_loading(false)
        }
    }

    const removeOrder = async (order_id) => {
        let bool = confirm(`Are you sure you want to delete this order# ${order_id}?!`)
        console.log('confirm == ', bool)
        if(bool == false){
            return;
        }

        const user_token = localStorage.getItem('userToken')
        const headers = {
            Authorization: user_token
        }
        const res = await apiHelper(`orders/remove-order/${order_id}`, 'POST', null, headers)
        if(res.data.status){
            alert(res.data.message)
            getOrders();
        }else{
            alert(res.data.message)
        }
    }

    const searchOrder = (e) => {
        let order_id = e.target.value;
        if(order_id){
            let orders = all_orders.filter(o => o.id == e.target.value);
            setOrderList(orders)
        }else{
            setOrderList(all_orders)
        }

    }

    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex items-center justify-between pb-4">
        <div className=" flex items-center">
            <span className="px-3 py-1.5 font-bold mr-5 w-48">{props.title}</span>
            <div>
                <Link href="/my-orders/all" className="p-4 font-semibold text-yellow-600">All</Link>
                <Link href="/my-orders/in-progress" className="p-4 font-semibold">in-Progress</Link>
                <Link href="/my-orders/completed" className="p-4 font-semibold">Completed</Link>
                <Link href="/my-orders/refunded" className="p-4 font-semibold">Refunded</Link>
                <Link href="/my-orders/draft" className="p-4 font-semibold">Draft</Link>
            </div>
        </div>

        {/* <div>
            <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <svg className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
                Last 30 days
                <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <!-- Dropdown menu --> 
            <div id="dropdownRadio" className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(522.5px, 3847.5px, 0px);">
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                    <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-1" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="filter-radio-example-1" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last day</label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input checked="" id="filter-radio-example-2" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="filter-radio-example-2" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 7 days</label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-3" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="filter-radio-example-3" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 30 days</label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-4" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="filter-radio-example-4" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last month</label>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id="filter-radio-example-5" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="filter-radio-example-5" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last year</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div> */}
        <label for="table-search" className="sr-only">Search</label>
        <div className="relative hidden md:inline-block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input onChange={(e) => searchOrder(e)} type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
        </div>
    </div>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {/* bg-gray-50 
        text-gray-700
        */}
        <thead className="text-xs text-white uppercase  dark:bg-gray-700 dark:text-gray-400 bg-[#eda110]">
            <tr>
                <th scope="col" className="p-4 hidden md:inline-block">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3 hidden md:inline-block">
                    Page
                </th>                
                <th scope="col" className="px-6 py-3 hidden md:inline-block">
                    Topic
                </th>
                <th scope="col" className="px-6 py-3">
                    Payment Status 
                </th>
                <th scope="col" className="px-6 py-3">
                    Deadline 
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {orderList.map(o => {
                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4 hidden md:inline-block">
                        <div className="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {o.id}
                    </th>
                    <td className="px-6 py-4">
                        {o.timestamp.split("T").shift()}
                    </td>
                    <td className="px-6 py-4">
                        ${o.total_price}
                    </td>
                    <td className="px-6 py-4 hidden md:inline-block">
                        {o.pages}
                    </td>
                    <td className="px-6 py-4 hidden md:inline-block">
                        {o.topic}
                    </td>
                    <td className="px-6 py-4">
                        {o.order_status_id ? <span className=" text-green-600 text-sm">
                            {o.status}
                        </span> : <span className=" text-red-500 text-sm">
                            {o.status}
                        </span>}
                    </td>
                    <td className="px-6 py-4">
                        {o.deadline} {o.duration}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                        <Link href={`/order/${o.id}`} className="font-medium text-yellow-600 dark:text-blue-500 hover:underline">View/Edit</Link>
                        <span onClick={() => removeOrder(o.id)} className="font-medium text-yellow-600 dark:text-blue-500 hover:underline cursor-pointer">Delete</span>
                    </td>
                </tr>
            })}
            
        </tbody>
    </table>
    {loading && <Loader />}

    {!loading && orderList.length == 0 && <p className=" text-gray-700 p-4 text-center font-semibold text-xl">No record found</p>}
</div>


}