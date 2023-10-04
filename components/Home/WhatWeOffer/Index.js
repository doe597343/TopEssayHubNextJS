import Link from "next/link";
import React from "react";

export default function WhatWeOffer(){
    return <section className="text-[#333333] p-4">
    <h2 className="text-center font-semibold text-xl mt-10">
        WHAT WE OFFER
    </h2>
    <p className="mt-4">
        Our expertise allows us to provide students with quality academic writing services, editing & proofreading services and whatever you need. What’s better is that our prices are very reasonable, to the point where even those who do not need academic writing services will order.
    </p>
    <ul className="md:grid grid-cols-3 mt-6 space-y-2 md:pl-24">
        <li><img className="inline px-2" src="./check_icon.svg" alt="What we offer item logo" width="15" height="11"/><a href="/order/?typeOfPaper=Essay+%28any+type%29">Writing From Scratch</a></li>
        <li><img className="inline px-2" src="./check_icon.svg" alt="What we offer item logo" width="15" height="11"/><a href="/order/?typeOfPaper=Proofreading">Academic Proofreading</a></li>
        <li><img className="inline px-2" src="./check_icon.svg" alt="What we offer item logo" width="15" height="11"/><a href="/order/?typeOfPaper=Editing">Professional Editing</a></li>
        <li><img className="inline px-2" src="./check_icon.svg" alt="What we offer item logo" width="15" height="11"/><a href="/order/?typeOfPaper=Problem+solving">Problem Solving</a></li>
        <li><img className="inline px-2" src="./check_icon.svg" alt="What we offer item logo" width="15" height="11"/><a href="/order/?typeOfPaper=Problem+solving">Essay writing</a></li>
        <li><img className="inline px-2" src="./check_icon.svg" alt="What we offer item logo" width="15" height="11"/><a href="/order/?typeOfPaper=Problem+solving">Research paper writing</a></li>
        <li><img className="inline px-2" src="./check_icon.svg" alt="What we offer item logo" width="15" height="11"/><a href="/order/?typeOfPaper=Problem+solving">Editing and proofreading</a></li>
        <li><img className="inline px-2" src="./check_icon.svg" alt="What we offer item logo" width="15" height="11"/><a href="/order/?typeOfPaper=Problem+solving">Resume and CV writing</a></li>
        <li><img className="inline px-2" src="./check_icon.svg" alt="What we offer item logo" width="15" height="11"/><a href="/order/?typeOfPaper=Problem+solving">Content writing</a></li>
        <li><img className="inline px-2" src="./check_icon.svg" alt="What we offer item logo" width="15" height="11"/><a href="/order/?typeOfPaper=Problem+solving">Creative writing</a></li>
        <li><img className="inline px-2" src="./check_icon.svg" alt="What we offer item logo" width="15" height="11"/><a href="/order/?typeOfPaper=Problem+solving">Technical writing</a></li>
        <li><img className="inline px-2" src="./check_icon.svg" alt="What we offer item logo" width="15" height="11"/><a href="/order/?typeOfPaper=Problem+solving">Business Writing</a></li>
    </ul>
    <p className="mt-4">
        The quality, the price, timing, everything we do we strive to do at the highest level, it is not our style to disappoint our client.
    </p>
    <div className="flex justify-center mt-6">
        <Link href="/order" className="py-2 px-3 shadow-md bg-[#f8cc00]">ORDER NOW</Link>
    </div>
</section>
}