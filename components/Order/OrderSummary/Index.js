import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import jwt from 'jsonwebtoken';
import { apiHelper } from "../../../helpers/ApiHelper";
import Link from "next/link";
import DeadlineTimer from '../../Shared/DeadlineTimer/Index'
import Loader from '../../Shared/Loader/Index'


export default function Index(props) {

    const router = useRouter()

    const [summary, setSummary] = useState(null)
    const ONGOING_STATUS = [
         "Awarded" , "Completed", "Revision", "Refunded"
    ]
    const [loading, set_loading] = useState(true)
    const [redeem_amount, set_redeem_amount] = useState(0.00)
    const [has_redeem_applied, set_has_redeem_applied] = useState(false)
    // const [did_redeem, set_did_redeem] = useState(false)

    useEffect(() => {
        getSummary()
    }, [])

    const getSummary = () => {
        let user_token = localStorage.getItem('userToken')
        let headers = {
            Authorization: user_token
        }
        apiHelper(`orders/summary/${props.order_id}`, 'GET', null, headers)
        .then(res => {
            if(res.data.status){
                let {order_token, summary_data} = res.data.data

                let orderJSON = jwt.decode(order_token).data
                console.log('order summary order_token == ', order_token)
                localStorage.setItem('order_token', order_token)
                props.setOrderJSON(orderJSON)

                // props.setOrder(orderJSON)
                setSummary(summary_data)
                set_loading(false)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const doPaypalCheckOut = () => {
        let user_token = localStorage.getItem('userToken')
        let headers = {
            Authorization: user_token
        }
        apiHelper(`payment/paypal/${props.order_id}`, 'POST', null, headers)
        .then(res => {
            console.log(res.data.message)
            if(res.data.status){
                const url = res.data.data;
                window.location.href = url
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const doRedeem = async (redeem_amount) => {
        let user_token = localStorage.getItem('userToken')
        let headers = {
            Authorization: user_token
        }
        let formData = new FormData()
        formData.append('order_id', props.order_id);
        formData.append('amount', redeem_amount)

        const res = await apiHelper(`payment/redeem`, 'POST', formData, headers);
        if(res.data.status){
            console.log(redeem_amount)
            if(redeem_amount){
                set_has_redeem_applied(true)
            }else{
                set_has_redeem_applied(false)
            }
            getSummary()
        }
        alert(res.data.message)
    }
    

    function handleSteps(next) {
        next ? props.nextFormStep() : props.prevFormStep()
    } 

    // pt-[6rem]
    return <section className="pb-4">
    <div>
         <h1 className=" font-semibold text-2xl text-center">
             ORDER
         </h1>
         
        {loading ? <><Loader /><p className="text-center">Fetching data...</p></> : <div className="p-4 border">
             <div className="flex items-center py-3 pl-5 bg-[#eda110] text-white"> 
                 <span className="inline-block w-5 h-5 mr-2">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                     </svg>
                 </span>
                 <h2>Order Summary</h2>
             </div>

         
              <div className="p-4 border text-gray-600">
                <div className="md:flex justify-between items-center">
                    <div>
                        <h2>Your order summary</h2>
                        <p className="italic text-xs">Please review your order details below.</p>
                    </div>
                    
                     <div className="items-center justify-center md:justify-start"> 
                         { summary && summary.status == "Paid" &&
                        <DeadlineTimer final_deadline={summary.final_deadline} status="Paid" /> }
                        { summary && summary.status == "Unpaid" &&
                        <DeadlineTimer final_deadline={summary.final_deadline} deadline={summary.deadline} duration={summary.duration} status="Unpaid" />}
                        {summary && Date.now() > Date.parse(summary.final_deadline) &&
                        <small className="pl-1 block text-red-500">{summary.duration}(s) passed after deadline!</small>}
                    </div> 
                </div>
                 <div className="bg-yellow-50 border p-4 mt-3 mb-3 font-light md:flex justify-between">              
                     <div className=" space-y-2">
                         <p className="font-bold">Order ID: <span className="">{summary && summary.order_id}</span> </p>
                         <p>Academic Level: <span className="font-semibold">{summary && summary.academic_level}</span> </p>
                         <p>Type of Paper: <span className="font-semibold">{summary && summary.type_of_paper}</span></p>
                         <p>Subject or Descipline: <span className="font-semibold">{summary && summary.subject}</span></p>
                         <p>Topic: <span className="font-semibold">{summary && summary.topic}</span></p>
                         <p>Paper format: <span className="font-semibold">{summary && summary.paper_format}</span></p>
                     </div>
                     <div className=" space-y-2">
                         <p>Pages: <span className="font-semibold">{summary && summary.pages}</span></p>
                         <p>Spacing: <span className="font-semibold">{summary && summary.paper_spacing}</span></p>
                         <p>Category or writer: <span className="font-semibold">{summary && summary.writer_category}</span></p>
                         <p>Powerpoint Slide: <span className="font-semibold">{summary && summary.power_point_slides}</span></p>
                         <p>Additional Service: <span className="font-semibold">{summary && summary.additional_services}</span></p>
                         <p>Deadline: <span className="font-semibold">{summary && summary.final_deadline}</span></p>
                     </div>
                 </div>

                { summary && ONGOING_STATUS.includes(summary.order_status) && 
                <div className="flex justify-between">
                    <div className="md:w-1/2">
                        <p className=" font-bold text-yellow-500 text-2xl p-3">Writer Files</p>
                        <ul className="space-y-3 px-3">
                            {
                                summary && summary.writer_files.map(file => {
                                    return <li className="flex justify-between items-center-300 py-1 "><a href={`${process.env.NEXT_PUBLIC_API_URL}/orders/download-file?order_id=${props.order_id}&filename=${file.unique_filename}`} target="_blank" className=" hover:underline text-sm">{file.filename}</a></li>
                                })
                        }
                        </ul>
                    </div>
                </div>}


                 {/* <!--     
                 <div className="flex items-center">
                     <div className="flex flex-1 flex-row h-8 w-full rounded-lg relative bg-transparent">
                         <button data-action="decrement" className=" bg-[#f8cc00]  h-full w-8 rounded-l cursor-pointer outline-none">
                             <span className="m-auto text-2xl font-thin">−</span>
                         </button>
                         <input type="number" className="focus:outline-none text-center w-14 mx-1 border border-gray-300 text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 " name="custom-input-number" value="0"></input>
                         <button data-action="increment" className="bg-[#f8cc00]   h-full w-8 rounded-r cursor-pointer">
                         <span className="m-auto text-2xl font-thin">+</span>
                         </button>
                   </div>
                   <span className="block flex-1 text-right">275 words</span>
                 </div> --> */}
 
             </div>

             {summary && summary.status == "Unpaid" ? 
             <div>
                 <h2 className="p-3 bg-yellow-50 text-center border border-l-1 border-b-1 border-r-1 text-gray-600">Orders Total: ${props.orderJSON.total_price.toFixed(2)} </h2>
                 <div className="md:flex justify-between items-center mt-7 p-4">
                     {/* <!-- <span className="block font-semibold text-gray-600">$10.00</span> -->
                     <!-- <input className="bg-[#f8cc00] px-4 py-2" type="submit" value="Continue"> --> */}
                     <div className="mb-3 md:mb-0">
                        <span className=" justify-center flex bg-yellow-50 px-4 py-2 font-normal border cursor-pointer" onClick={() => handleSteps(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>                              
                            <span className="ml-2">Edit Order</span>
                        </span>
                     </div>
                     <div className="md:flex md:space-x-3 space-y-3 md:space-y-0">
                        {has_redeem_applied ? <div className="flex">
                            <span onClick={(e) => doRedeem(0)} className="flex flex-1 bg-[#f8cc00] items-center px-4 py-2 font-normal cursor-pointer">
                                {/* <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg> */}
                                <span className=" mx-auto text-blue-900">Remove Redeem </span>
                            </span>
                            {/* <input placeholder="0.00" type="text"  onChange={(e) => set_redeem_amount(e.target.value)} className="h-full text-center flex-1 shadow-sm bg-gray-50 border-2 md:w-24 w-full py-2 text-green-500 font-bold px-2"/> */}
                        </div> :
                            <div className="flex">
                                <span onClick={(e) => doRedeem(redeem_amount)} className="flex flex-1 bg-[#f8cc00] items-center px-4 py-2 font-normal cursor-pointer">
                                    {/* <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg> */}
                                    <span className=" mx-auto text-blue-900">Redeem </span>
                                </span>
                                <input placeholder="0.00" type="text"  onChange={(e) => set_redeem_amount(e.target.value)} className="h-full text-center flex-1 shadow-sm bg-gray-50 border-2 md:w-24 w-full py-2 text-green-500 font-bold px-2"/>
                            </div>
                        }
                        <span className=" justify-center flex bg-[#f8cc00] items-center px-4 py-2 font-normal cursor-pointer" onClick={() => doPaypalCheckOut()}>
                            <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg>
                            <span className="mr-2  text-blue-900"> Check out with PayPal</span>
                        </span>
                     </div>
                 </div>
                </div> : 
                            <div>
                    <h2 className="p-3 bg-yellow-50 text-center border border-l-1 border-b-1 border-r-1 text-gray-600">Orders Total: ${props.orderJSON.total_price.toFixed(2)} </h2>
                    <div className="flex justify-end items-center mt-7 p-4">
                        {/* <!-- <span className="block font-semibold text-gray-600">$10.00</span> -->
                        <!-- <input className="bg-[#f8cc00] px-4 py-2" type="submit" value="Continue"> --> */}
                        {/* <span className="flex bg-yellow-50 px-4 py-2 font-normal border cursor-pointer" onClick={() => handleSteps(false)}> */}
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>                              
                            <span className="ml-2">Edit Order</span> */}
                        {/* </span> */}
                        <Link className="flex bg-[#f8cc00] items-center px-4 py-2 font-normal" href="/my-orders/all">
                            <img className="w-4 h-4 mr-2" src={`${process.env.NEXT_PUBLIC_BASE_URL}/back.png`} />
                            Back to my Orders
                        </Link>
                    </div>
                </div> }
            
         </div>}
    </div>
 </section>
}