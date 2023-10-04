import React, { useEffect, useState } from "react";
import { apiHelper } from "../../../helpers/ApiHelper";
import Image from "next/image";
import Tagline from "../Tagline";

import jwt from 'jsonwebtoken';
import { Router, useRouter } from "next/router";


export default function Calculator() {
    const router = useRouter()

    const [academicLevels, setAcademicLevels] = useState([])
    const [paperTypes, setPaperTypes] = useState([])
    const [acadLevelId, setAcadLevelId] = useState(3)
    const [deadlines, setDeadlines] = useState([])
    const [page, setPage] = useState(0)
    const [orderJSON, setOrderJSON] = useState({
        "academic_level_id": 1,
        "paper_id": 1,
        "other_paper": "",
        "subject_id": 1,
        "other_subject": "",
        "topic": "Writer's Choice",
        "paper_instructions": "",
        "sources": 0,
        "format_id": 1,
        "other_format": "",
        "pages": 1,
        "spacing": 1,
        "deadline_id": 1,
        "writer_category_id": 1,
        "slides": 0,
        "plagiarism_report": 0,
        "abstract_page": 0,
        "high_priority": 0,
        "sub_total": 10,
        "total_price": 10,
        "coupon_id": 0,
        "coupon_discount": 0,
        "referral_id": 0,
        "referral_discount": 0,
        "customer_files": [],
        "coupon_status": false,
        "coupon_message": "",
        "coupon_code": "",
        "cost_per_page": 10,
        "cost_per_slide": 5,
        "page_total_cost": 10,
        "slide_total_cost": 0
    })

    // const [academicLevels, setAcademicLevels] = useState([])
    // const [academicLevels, setAcademicLevels] = useState([])

    useEffect(()=> {
        getAcademicLevel()
        getPaperTypes()
        getDeadlines()
        
        setOrder(orderJSON)
    },[])

    useEffect(() => {
        getPaperTypes()
    }, [acadLevelId])

    const setOrder = (order) => {

        console.log('setOrder == ', order)

        let headers = null;
        const user_token = localStorage.getItem('userToken')
        if(user_token){
            headers = {Authorization: user_token}
        }

        const formData = new FormData();

        let order_token = localStorage.getItem('order_token');

        if(order_token){
            formData.append("order_token", order_token);
        }

        formData.append('other_subject', order.other_subject)
        formData.append('other_format', order.other_format)
        formData.append('other_paper', order.other_paper)
        formData.append("coupon_code", order.coupon_code)
        formData.append("academic_level_id", order.academic_level_id);
        formData.append("paper_id", order.paper_id);
        formData.append("subject_id", order.subject_id);
        formData.append("topic", order.topic);
        formData.append("paper_instructions", order.paper_instructions);
        formData.append("sources", order.sources);
        formData.append("format_id", order.format_id);
        formData.append("pages", order.pages);
        formData.append("spacing", order.spacing);
        formData.append("deadline_id", order.deadline_id);
        formData.append("writer_category_id", order.writer_category_id);
        formData.append("slides", order.slides);
        formData.append("plagiarism_report", order.plagiarism_report);
        formData.append("abstract_page", order.abstract_page);
        formData.append("high_priority", order.high_priority);

        apiHelper(`calculator/pricing`, 'POST', formData, headers)
        .then(res => {
            let token = res.data.status ? res.data.data : ""
            
            if(token){
                // setOrderToken(token)
                setOrderJSON(jwt.decode(token).data)
                localStorage.setItem('order_token', token)
            }
            console.log('Pricing data token: ', token)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const onChangePage = (i) => {
        // setPage(page + 1)
        console.log('onChangePage == ', orderJSON)
        let pages = orderJSON.pages + i
        setOrder({...orderJSON, pages})
    }

    const onChangeDeadline = (e) => {
        // setPage(page + 1)
        setOrder({...orderJSON, deadline_id: e.target.value})
    }

    const onContinue = () => {
        let order_token = localStorage.getItem("order_token")
        localStorage.setItem("cached_order_token", order_token)
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/order`; 
        // router.push("/order");
    }
    

    const getAcademicLevel = () => {
         apiHelper('calculator/academic-levels', 'GET', null)
        .then(res => {
            const data = res.data.status ? res.data.data : []
            setAcademicLevels(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getPaperTypes = () => {
        apiHelper(`calculator/paper-types/${acadLevelId}`, 'GET', null)
       .then(res => {
           let data = res.data.data.length ? res.data.data : []
        //    console.log('highschool === ', data)
           setPaperTypes(data)
       })
       .catch(err => {
           console.log(err)
       })
   }


   const getDeadlines = () => {
        apiHelper(`calculator/deadlines?academic_level_id=${acadLevelId}`, 'GET', null)
        .then(res => {
            let data = res.data.status ? res.data.data : []
            setDeadlines(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return <section className=" md:flex justify-between">

        <div className="md:flex justify-between hidden bg-white w-full">
             <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/hero-writing.gif`} alt="hero image" width="350" height="350"/>
             <div className="px-10  space-y-10 my-auto">
                <h1 className=" text-gray-800 font-semibold text-5xl ">
                    <span className="">Writing</span> that connects, engages, and informs
                </h1>
                <p className=" text-xl">
                    Take charge of your academic success with our innovative essay writing service. Simply communicate your essay requirements to us, and our team of skilled essay writers will complete it within the specified timeframe and at a reasonable cost.
                </p>
             </div>
        </div>
        <div className="md:min-w-1/4 p-4 md:ml-2 bg-white shadow-lg border-gray-200 border">
            {/* <form> */}
                <label htmlFor="countries" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Academic Level</label>
                <select onChange={(e) => setAcadLevelId(e.target.value) } id="acad_level" className=" border border-gray-400 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-3">
                {academicLevels.map(l => {
                    return <option key={l.id} value={l.id}>{l.academic_name}</option>
                })}

                </select>

                <label htmlFor="countries" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Type of Paper</label>
                <select id="type_of_paper" className="border border-gray-400 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-3">
                {paperTypes.map(item => {
                    return <option key={item.id} value={item.id}>{item.category_name}</option>
                })}
                </select>

                <label htmlFor="countries" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Deadline</label>
                <select onChange={(e) => onChangeDeadline(e)} id="deadline" className=" border border-gray-400 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-3">
                {deadlines.map(item => {
                    return <option key={item.id} value={item.id}>{item.deadline} {item.duration}</option>
                })}
                </select>


                <div className="flex items-center">
                    <div className="flex flex-1 flex-row h-8 w-full rounded-lg relative bg-transparent">
                        <button data-action="decrement" className=" bg-[#f8cc00]  h-full w-8 rounded-l cursor-pointer outline-none" onClick={() => onChangePage(-1)}>
                            <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        {/* <input type="number" className="focus:outline-none text-center w-14 mx-1 border border-gray-300 text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 " name="custom-input-number" value={page}></input> */}
                        <span className="focus:outline-none text-center w-14 mx-1 border border-gray-300 text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 " name="custom-input-number">{orderJSON.pages}</span>
                        <button data-action="increment" className="bg-[#f8cc00]   h-full w-8 rounded-r cursor-pointer" onClick={() => onChangePage(1)}>
                        <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                </div>
                <span className="block flex-1 text-right">275 words</span>
                </div>

                <div className="flex justify-between items-center mt-7">
                    <span className="block font-semibold">${orderJSON.total_price.toFixed(2)}</span>
                    <input onClick={() => onContinue()} className="bg-[#f8cc00] px-6 py-2" type="submit" value="Continue" />
                </div>
            {/* </form> */}
        </div>
    </section>

}