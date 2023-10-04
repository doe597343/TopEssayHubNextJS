import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BASIC_PAGES } from "../../constants/Item";
import { apiHelper } from "../../helpers/ApiHelper";

export default function Index() {
    let router = useRouter()

    const [is_basic_page, set_is_basic_page] = useState(true)
    const [auth, set_auth] = useState("");
    const [services_list, set_services_list] = useState([])

    useEffect(() => {
        let user_token = localStorage.getItem('userToken');
        set_auth(user_token)

        // console.log('nav router == ', router)
        // console.log('nav router == ', router.pathname.split("/"))
        let page = router.pathname.split("/")[1] == '' ? 'home' : router.pathname.split("/")[1];
        if(page == 'order'){
            page = user_token ? 'order-member' : 'order-guest'
        }

        let bool = BASIC_PAGES.includes(page) ? 1 : 0;
        set_is_basic_page(bool)

        getServicesList();

        console.log("is_basic_page == ", is_basic_page)
        console.log("is_basic_page page == ", page)

    }, [])

    useEffect(() => {

    }, [router])

    const onMouseEnterServicesLink = async () => {
        let dropdwon = document.getElementById("services-dropdwon");
        dropdwon.classList.add("flex")
        dropdwon.classList.remove("hidden")
    }
    const onMouseLeaveServicesLink = async () => {
        let dropdwon = document.getElementById("services-dropdwon");
        dropdwon.classList.add("hidden")
        dropdwon.classList.remove("flex")
    }

    const getServicesList = async () => {
        const res = await apiHelper(`page/services`, 'GET', null)
        if(res.data.status){
            let data = res.data.data;
            data.pop()
            set_services_list(data)
        }
    }


    //  px-4 fixed top-0 left-0 right-0 bg-white z-30 drop-shadow-lg
    return is_basic_page ? <nav className="px-4 fixed top-0 left-0 right-0 bg-white z-30 drop-shadow-lg md:flex md:items-center">
        <div className="h-[4rem] flex items-center justify-between">
            {/* <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo.svg`} alt="logo" width="125" height="25"/> */}
            <div className="flex items-center">
                <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo-new.png`} alt="logo" width="40" height="40"/>
                <p><span className= "font-light">TopEssay</span><span className=" font-semibold">Hub</span></p>
            </div>
            <svg onClick={() => toggleMenu()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:hidden w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
        </div>
        {/* space-y-2 hidden pb-3 mb-4 */}
        <div id="menu" className=" text-gray-600 md:flex -z-50 space-y-3 md:space-y-0 hidden pb-3 md:pb-0 mb-4 md:mb-0 md:items-center md:ml-auto">
            <Link href="/" className="block md:px-6">Home</Link>
            <Link onMouseEnter={() => onMouseEnterServicesLink()} onMouseLeave={() => onMouseLeaveServicesLink()} href="/services" className=" block md:px-6">Services</Link>
            <Link href="/how-it-works" className="block md:px-6">How it works</Link>
            {/* <Link href="/samples" className="block md:px-6">Samples</Link> */}
            <Link href="/testimonials" className="block md:px-6">Testimonials</Link>
            <Link href="/faqs" className="block md:px-6">FAQs</Link>
            <Link href="/contact-us" className="block md:px-6">Contact</Link>
            <Link href="/privacy-policy" className="block md:px-6">Privacy Policy</Link>
            <Link href="/order" className="block md:px-6">Order</Link>
            {auth ? 
                <a href="/my-orders/all" className="block md:px-6"><span className=" shadow-md bg-yellow-300 rounded-md p-3" >My Orders</span></a>
            :
                <a href="/login" className="block md:px-6"><span className=" shadow-md bg-yellow-300 rounded-md p-3" >Signin</span></a>
            }

        </div>

        {/* services list */}
        <div id="services-dropdwon" onMouseEnter={() => onMouseEnterServicesLink()}  onMouseLeave={() => onMouseLeaveServicesLink()} class=" rounded-md border border-gray-100  hidden z-50  absolute top-10  bg-white left-[400px] w-[700px] shadow-md justify-center">
          <div class="grid grid-cols-3 gap-x-7 gap-y-2 px-5 py-10 text-gray-800">
              { services_list.map(item => {
                 {return item.pages.map(page => {
                    return <Link className=" hover:text-yellow-500" href={page.link}>{page.page_name}</Link>
                })}
            })}
          </div>
        </div>
    </nav>  : <></>
}

function toggleMenu(){
    var element = document.getElementById("menu");
        element.classList.toggle("hidden");
        // alert(element.offsetHeight);
    // var content = document.getElementById('content-wrapper')
    //     content.classList.toggle('top-[6rem]')
    //     content.classList.toggle('top-[17rem]')
}
