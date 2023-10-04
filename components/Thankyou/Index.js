import Link from "next/link";
import { useRouter } from "next/router";
import react, { useEffect, useState } from "react";
import { apiHelper } from "../../helpers/ApiHelper";

export default function Index(props){

    let router = useRouter();
    const [summary, setSummary] = useState(null)
    const [user_token, set_user_token] = useState("")

    useEffect(() => {
        let user_token = localStorage.getItem('userToken')
        if(!user_token){
            router.push("/")
            return
        }
    
        set_user_token(user_token)
        fetchSummary()
    }, [])

     useEffect(() => {

        console.log("start tracking order")
        if(summary){
            console.log("now tracking order")
            tdconv('init', '2359216', {'element': 'iframe' });
            tdconv('track', 'sale', {
                'transactionId':summary.order_id, 
                'ordervalue':summary.sub_total, 
                'voucher': summary.discount_code, 
                'currency':'USD', 
                'event':438176
            });
        }

    }, [summary])

    const fetchSummary = async () => {
        let user_token = localStorage.getItem('userToken')
        let headers = {
            Authorization: user_token
        }
        const res = await apiHelper(`orders/summary/${props.order_id}`, 'GET', null, headers);
        if(res.data.status){
            const data = res.data.data.summary_data;
            setSummary(data)
        }
    }


    return  user_token && <div>
        <div className="bg-gray-100 ">
            <div className="bg-white p-6  md:mx-auto">
                <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                    <path fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                    <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                    <p> Have a great day!  </p>
                    <div className="py-10 text-center">
                        <Link href="/my-orders/all" className="px-12 bg-[#eda110] text-white font-semibold py-3">
                            GO BACK 
                    </Link>
                    </div>
                </div>
            </div>
        </div>

        <section className="pb-4 ">
            <div>
                {/* <h1 className=" font-semibold text-2xl text-center">
                    ORDER
                </h1> */}
                <div className="p-4 border bg-gray-50">
                    {/* <div className="flex items-center py-3 pl-5 bg-[#eda110] text-white"> 
                        <span className="inline-block w-5 h-5 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </span>
                        <h2>Order Summary</h2>
                    </div> */}
                    <div className="p-4 border text-gray-600">

                        <h2>Your order summary</h2>
                        <p className="italic text-xs">Please review your order details below.</p>
                        <div className="bg-yellow-50 border p-4 mt-3 mb-3 font-light md:flex justify-between">              
                            <div className=" space-y-2">
                                <p className="font-bold">Order ID: <span className="">{summary && summary.order_id}</span> </p>
                                <p className="font-bold">Transaction ID: <span className="">{summary && summary.transaction_id}</span> </p>
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

                </div>
            </div>
        </section>
    </div>

}