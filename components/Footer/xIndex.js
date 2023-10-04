import React, { useEffect, useState } from "react";




export default function Footer(){

    const [user_token, set_user_token] = useState("")

    useEffect(() => {
        let token = localStorage.getItem('userToken');
        if(token){
            set_user_token(token)
        }
    })

    return <footer className="text-[#333333] p-4">
    
    {/* {!user_token && <>
        <h2 className=" font-semibold text-xl text-center">
            The Most Impressive Academic <br /> Papers from Qualified Performers!
        </h2>
        <h2 className="font-semibold text-xl text-center mt-5">
            <span className="text-[#f8cc00] text-3xl">7% discount </span> with subscription
        </h2>
        <div>
            <form className="flex justify-center items-center mt-7">
                <input className="px-3 py-3 border-[#f8cc00] border" type="email" />
                <button className="bg-[#f8cc00] px-4 py-3">subscribe</button>
            </form>
        </div>
    </>} */}
    <div className="mt-6">
        <ul className="flex justify-center">
            <li><img src={`${process.env.NEXT_PUBLIC_BASE_URL}/secure1@2x.png`} alt="" width="111" height="57" /></li>
            <li><img src={`${process.env.NEXT_PUBLIC_BASE_URL}/secure2@2x.png`} alt="" width="111" height="57" /></li>
            <li><img src={`${process.env.NEXT_PUBLIC_BASE_URL}/secure3@2x.webp`}  alt="" width="196" height="57" /></li>
            <li><img src={`${process.env.NEXT_PUBLIC_BASE_URL}/secure1@2x.png`}  alt="" width="0" height="0" /></li>
        </ul>
    </div>
    <div className="text-xs text-center mt-3">
        © Copyright 2017 - 2023 <br />
        topessayhub. All Rights Reserved.
    </div>
</footer>
}