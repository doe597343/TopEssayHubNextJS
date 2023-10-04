import react, { useEffect, useState } from "react";
import Link from "next/link";

import jwt from 'jsonwebtoken';
import { useRouter } from "next/router";

import { apiHelper } from "../../../helpers/ApiHelper";

export default function Index(props) {
    let router = useRouter()
    const [fullname, set_fullname] = useState("")
    const [avatar, set_avatar] = useState("")
    const [user_token, set_user_token] = useState("")
    const [balance, set_balance] = useState(0)

    useEffect(() => {
    
      let user_token = localStorage.getItem('userToken')
      if(!user_token){
        // router.push("/")
        window.location.href = "/"
        return
      }

      set_user_token(user_token)
      let userJSON = jwt.decode(user_token).data;
      let fullname = `${userJSON.firstname} ${userJSON.lastname}`

      set_fullname(fullname)

      if(userJSON.profile_pic){
        set_avatar(userJSON.profile_pic)
      }

      getUserBalance()
 
    },[])

    const logout = () => {
      localStorage.removeItem('userToken')
      window.location.href = "/login"
    }

    const toggleSideBar = (target_id) => {
      // alert("clicked")
      let sidebar = document.getElementById(target_id)
      sidebar.classList.remove("sm:translate-x-0")
      sidebar.classList.remove("-translate-x-full")


      let overlay = document.getElementById("overlay")
      overlay.classList.remove("hidden")
    }

    const close_sidebar = (target_id) => {
      let sidebar = document.getElementById(target_id)
      sidebar.classList.add("sm:translate-x-0")
      sidebar.classList.add("-translate-x-full")

      let overlay = document.getElementById("overlay")
      overlay.classList.add("hidden")
    }

     const getUserBalance = async () => {
        const user_token = localStorage.getItem('userToken')
        const headers = {
            Authorization: user_token
        }
        const res = await apiHelper('user/balance', 'GET', null, headers)
        if(res.data.status){
            let balance = res.data?.data?.balance ? res.data?.data?.balance : 0;
            set_balance(balance)
        }
    }

    return user_token && <div>
        <button onClick={() => toggleSideBar("logo-sidebar")} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="mt-2 ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden">
  <span className="sr-only">Open sidebar</span>
  <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
  </svg>
</button>

<aside id="logo-sidebar" className=" shadow-md fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0" aria-label="Sidebar">
  <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
    <span href="/" className="mb-5 flex items-center pl-2.5">
      {/* <img src={`${process.env.NEXT_PUBLIC_PROFILE_PIC_URL}/${avatar}`} className="mr-3 h-6 rounded-full sm:h-7" alt="Logo" /> */}

      <img src={avatar ? `${process.env.NEXT_PUBLIC_PROFILE_PIC_URL}/${avatar}` : `${process.env.NEXT_PUBLIC_BASE_URL}/user-avatar.svg`} className="mr-3 rounded-full h-12" alt="Logo" />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{fullname}</span>
    </span>
    <ul className="space-y-2">
      <li>
        <Link href="/order" className=" flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <svg aria-hidden="true" className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
          <span className="ml-3">Place Order</span>
        </Link>
      </li>
      <li>
        <Link href="/my-orders/all" className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <svg aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          <span className="ml-3 flex-1 whitespace-nowrap">My Orders</span>
          {/* <span className="ml-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
        </Link>
      </li>
      <li>
        <Link href="/payment-history" className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <svg aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
            <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
          </svg>
          <span className="ml-3 flex-1 whitespace-nowrap">History</span>
          {/* <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">3</span> */}
        </Link>
      </li>
      <li>
        <Link href="/balance" className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <svg aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
            <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
          </svg>
          <span className="ml-3 flex-1 whitespace-nowrap">Balance</span>
          {balance ? <span className="ml-3 inline-flex h-3  items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">${balance.toFixed(2)}</span>  : null }
        </Link>
      </li>
      <li>
        <Link href="/referral" className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <svg aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          <span className="ml-3 flex-1 whitespace-nowrap">Referral</span>
        </Link>
      </li>
      <li>
        <Link href="/profile" className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <svg aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          <span className="ml-3 flex-1 whitespace-nowrap">Profile</span>
        </Link>
      </li>
      <li>
        <Link href="/level" className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <svg aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
          <span className="ml-3 flex-1 whitespace-nowrap">Level</span>
        </Link>
      </li>
      <li>
        <Link href="#" onClick={() => logout()} className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <svg aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
          <span className="ml-3 flex-1 whitespace-nowrap">Log Out</span>
        </Link>
      </li>
      {/* <li>
        <Link href="#" className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <svg aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
          <span className="ml-3 flex-1 whitespace-nowrap">Sign Up</span>
        </Link>
      </li> */}
    </ul>
  </div>
</aside>

<div onClick={() => close_sidebar("logo-sidebar")}  id="overlay" className="z-39 hidden w-full h-full absolute ">

</div>

<div className=" p-4 sm:ml-64">
     {props.children}
</div>
   
    </div>
}