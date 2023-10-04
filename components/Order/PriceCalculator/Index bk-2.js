import React, { useEffect, useState } from "react";
import { apiHelper } from "../../../helpers/ApiHelper";

import jwt from 'jsonwebtoken';

import Router, { useRouter } from "next/router";

export default function Index(props) {

    const router = useRouter()

    // const [order, setOrder] = useState(jwt.decode(props.orderToken).data)

    // const [slides, set_slides] = useState(props.orderJSON.slides)
    const [spacings, setSpacings] = useState([])
    const [deadlines, setDeadlines] = useState([])
    const [writerCategories, setWriterCategories] = useState([])
    const [additionalServices, setAdditionalServices] = useState([])

    // const [pages, set_pages] = useState(props.orderJSON.pages)
    // const [spacing, set_spacing] = useState(props.orderJSON.spacing)
    // const [deadline_id, set_deadline_id] = useState(props.orderJSON.deadline_id)
    // const [writer_category_id, set_writer_category_id] = useState(props.orderJSON.writer_category_id)
    // const [plagiarism_report, set_plagiarism_report] = useState(props.orderJSON.plagiarism_report)
    // const [abstract_page, set_abstract_page] = useState(props.orderJSON.abstract_page)
    // const [high_priority, set_high_priority] = useState(props.orderJSON.high_priority)

    useEffect(() => {

        getSpacing()
        getDeadlines()
        getWriterCategories()
        getAdditionalServices()
    }, [])

    // useEffect(() => {
    //     props.setOrder({...props.orderJSON, pages, spacing, deadline_id, writer_category_id, slides, plagiarism_report, abstract_page, high_priority})
    // }, [pages, spacing, deadline_id, writer_category_id, slides, plagiarism_report, abstract_page, high_priority])

    const onChangePage = (i) => {
        let pages =  props.orderJSON.pages + i
        if(pages > -1){
            props.setOrder({...props.orderJSON, pages})
        }
    }

    const onChangeSlide = (i) => {
        let slides =  props.orderJSON.slides + i
        if(slides > -1){
             props.setOrder({...props.orderJSON, slides})
        }
    }

    const getSpacing = () => {
        apiHelper(`calculator/spacing`, 'GET', null)
        .then(res => {
            let data = res.data.status ? res.data.data : []
            setSpacings(data)
        })
        .catch(err => {
            console.log(err)
        })
    }


   const getDeadlines = () => {
 
        let academic_level_id = props.orderJSON.academic_level_id
        apiHelper(`calculator/deadlines?academic_level_id=${academic_level_id}`, 'GET', null)
        .then(res => {
            let data = res.data.status ? res.data.data : []
            setDeadlines(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getWriterCategories = () => {
        apiHelper(`calculator/writer-categories`, 'GET', null)
        .then(res => {
            let data = res.data.status ? res.data.data : []
            setWriterCategories(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getAdditionalServices = () => {
        apiHelper(`calculator/additional-services`, 'GET', null)
        .then(res => {
            let data = res.data.status ? res.data.data : []
            setAdditionalServices(data)
        })
        .catch(err => {
            console.log(err)
        })
    }



    async function handleSteps(next) {
        let userToken = localStorage.getItem('userToken')
        if(next && !userToken){
            router.push('/login')
        }

        if(next){
            const res = await props.saveOrder()
            if(res.status){
                let order_id = res.data.order_id
                alert(res.message)
                window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/order/${order_id}`
            }else{
                alert(res.message)
            }
        }else{
            props.prevFormStep()
        }
        // next ? props.nextFormStep() : props.prevFormStep()
    } 

    const update_detail = (e) => {
        let name = e.target.name
        let value = e.target.value

        let newOrderJSON = {...props.orderJSON, [name]: value}
        console.log('update detail === ', newOrderJSON)

        let dontExececutePricing = ['topic', 'paper_instructions', 'coupon_code'].includes(name)
        if(dontExececutePricing){
            props.setOrderJSON(newOrderJSON)
        }else{
            props.setOrder(newOrderJSON)
        }
    }

    const set_abstract_page = (abstract_page) => {
        let newOrderJSON = {...props.orderJSON, abstract_page}
        props.setOrder(newOrderJSON)
    }

    const set_plagiarism_report = (plagiarism_report) => {
        let newOrderJSON = {...props.orderJSON, plagiarism_report}
        props.setOrder(newOrderJSON)
    }

    const set_high_priority = (high_priority) => {
        let newOrderJSON = {...props.orderJSON, high_priority}
        props.setOrder(newOrderJSON)
    }

    const apply_coupon_code = () => {
        let orderJSON = props.orderJSON
        props.setOrder(orderJSON)
    }

// pt-[6rem]
    return <section className="pb-4">
    <div>
         <h1 className=" font-semibold text-2xl text-center">
             ORDER
         </h1>
         <div className="p-4 border">
             <div className="flex items-center py-3 pl-5 bg-[#eda110] text-white"> 
                 <span className="inline-block w-5 h-5 mr-2">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                     </svg>
                 </span>
                 <h2>Price Calculation</h2>
             </div>
             <div className="p-4 border">

                 
                 <label htmlFor="pagenumber" className="block mb-1 text-sm font-medium text-gray-600 dark:text-white">Number of Pages</label>
                 <div className="flex items-center mb-3">
                     <div className="flex flex-1 flex-row h-8 w-full rounded-lg relative bg-transparent">
                         <button data-action="decrement" className=" bg-[#f8cc00]  h-full w-8 rounded-l cursor-pointer outline-none" onClick={() => onChangePage(-1)}>
                             <span className="m-auto text-2xl font-thin">−</span>
                         </button>
                         <span id="pagenumber" className="focus:outline-none text-center w-14 mx-1 border border-gray-300 text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 " name="custom-input-number">{props.orderJSON.pages}</span>
                         <button data-action="increment" className="bg-[#f8cc00]   h-full w-8 rounded-r cursor-pointer" onClick={() => onChangePage(1)}>
                         <span className="m-auto text-2xl font-thin">+</span>
                         </button>
                     </div>
                     <span className="block flex-1 text-right">275 words</span>
                 </div>            

                 <label htmlFor="spacing" className="block mb-1 text-sm font-medium text-gray-600 dark:text-white">Spacing</label>
                 <select id="countries" className=" border border-gray-400 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-3" name="spacing" onChange={(e) => update_detail(e)}>
                 {spacings.map(l => {
                    if(l.id == props.orderJSON.spacing){
                        return <option key={l.id} value={l.id} selected>{l.space_format}</option>
                    }else{
                        return <option key={l.id} value={l.id}>{l.space_format}</option>
                    }
                })}
                 </select>
 
                 <label htmlFor="deadline" className="block mb-1 text-sm font-medium text-gray-600 dark:text-white">Deadline</label>
                 <select id="deadline" className="border border-gray-400 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-1" name="deadline_id" onChange={(e) => update_detail(e)}>
                 {deadlines.map(l => {
                     if(l.id == props.orderJSON.deadline_id){
                        return <option key={l.id} value={l.id} selected>{l.deadline} {l.duration}</option>
                     }else{
                        return <option key={l.id} value={l.id}>{l.deadline} {l.duration}</option>
                     }
                 
                })}
                 </select>
                 <span className="text-xs text-gray-600 mb-3 block leading-[1rem] italic">(We estimate that your Final Submission Deadline is approximately.)</span>

                 <label htmlFor="writer-category" className="block mb-1 text-sm font-medium text-gray-600 dark:text-white">Category of Writer</label>
                 <select id="writer-category" className="border border-gray-400 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mb-3" name="writer_category_id" onChange={(e) => update_detail(e)}>
                 {writerCategories.map(l => {
                       if(l.id == props.orderJSON.writer_category_id){
                            return <option key={l.id} value={l.id} selected>{l.writer_category}</option>
                       }else{
                            return <option key={l.id} value={l.id}>{l.writer_category}</option>
                       }
                    
                })}
                 </select>

                 <label htmlFor="slidenumber" className="block mb-1 text-sm font-medium text-gray-600 dark:text-white">Power Point Slides</label>
                 <div className="flex items-center mb-3">
                     <div className="flex flex-1 flex-row h-8 w-full rounded-lg relative bg-transparent">
                         <button data-action="decrement" className=" bg-[#f8cc00]  h-full w-8 rounded-l cursor-pointer outline-none" onClick={() => onChangeSlide(-1)}>
                             <span className="m-auto text-2xl font-thin">−</span>
                         </button>
                         <span id="slidenumber" className="focus:outline-none text-center w-14 mx-1 border border-gray-300 text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 " name="custom-input-number"> {props.orderJSON.slides} </span>
                         <button data-action="increment" className="bg-[#f8cc00]   h-full w-8 rounded-r cursor-pointer" onClick={() => onChangeSlide(1)}>
                         <span className="m-auto text-2xl font-thin">+</span>
                         </button>
                     </div>
                 </div>

                 <h2 className="mb-1 text-gray-600">Additional Services</h2>
                 <div className="text-gray-600 space-y-2 mb-3">                 
                   {additionalServices.map((item) => {
                        return (<div key={item.id}>
                            {item.service_name == 'Plagiarism report' ? 
                                <div className="p-2 bg-yellow-50 border">
                                    {props.orderJSON.plagiarism_report ?
                                     <input checked className="mr-2" type="checkbox" name={item.service_name} id={item.service_name} onChange={() => set_plagiarism_report(props.orderJSON.plagiarism_report == 1 ? 0 : 1)} />
                                    :  <input className="mr-2" type="checkbox" name={item.service_name} id={item.service_name} onChange={() => set_plagiarism_report(props.orderJSON.plagiarism_report ? 0 : 1)} /> 
                                    }
                                    <label htmlFor={item.service_name}>{item.service_name} (${item.price})</label><br />
                                </div> : null}

                            {item.service_name == 'Abstract Page' ? 
                            <div className="p-2 bg-yellow-50 border" >
                                {props.orderJSON.abstract_page ? 
                                <input checked className="mr-2" type="checkbox" name={item.service_name} id={item.service_name} onChange={() => set_abstract_page(props.orderJSON.abstract_page ? 0 : 1)} />
                                : <input className="mr-2" type="checkbox" name={item.service_name} id={item.service_name} onChange={() => set_abstract_page(props.orderJSON.abstract_page ? 0 : 1)} />
                                }
                                <label htmlFor={item.service_name}>{item.service_name} (${item.price})</label><br />
                            </div> : null}

                            {item.service_name == 'High Priority' ? 
                            <div className="p-2 bg-yellow-50 border">
                                {props.orderJSON.high_priority ? 
                                <input checked className="mr-2" type="checkbox" name={item.service_name} id={item.service_name} onChange={() => set_high_priority(props.orderJSON.high_priority ? 0 : 1)} />
                                : <input className="mr-2" type="checkbox" name={item.service_name} id={item.service_name} onChange={() => set_high_priority(props.orderJSON.high_priority ? 0 : 1)} />
                                }
                                <label htmlFor={item.service_name}>{item.service_name} (${item.price})</label><br />
                            </div> : null}
                        </div>
                        )
                   })}
                    
                 </div>
                 <div className="mb-3 border px-2 py-3">
                     <a className="decoration-dashed underline-offset-4 underline text-gray-500 text-sm mb-2 block text-right" href="#">Have a Promo Code?</a>
                     <div className="flex justify-end">
                         <input className="p-1 border-gray-400 border w-full" value={props.orderJSON.coupon_code} onChange={(e) => update_detail(e)} name="coupon_code" type="text" placeholder="Enter promo code" />
                         <button className="bg-[#f8cc00] px-4" onClick={() => apply_coupon_code()}>Apply</button>
                     </div>
                     
                    <small className=" text-red-400 py-1">{props.orderJSON.coupon_message}</small>
                 </div>    
 
             </div>
             <div>
                 <h2 className="p-3 bg-yellow-50 text-center border border-l-1 border-b-1 border-r-1 text-gray-600">Orders Total: ${props.orderJSON.total_price} </h2>
                 <div className="flex justify-between items-center mt-7 p-4">
                     <span className="flex bg-yellow-50 px-4 py-2 font-normal border cursor-pointer" onClick={() => handleSteps(false)}>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                           </svg>                              
                         <span className="ml-2">Previous</span>
                     </span>
                     <span className="flex bg-[#f8cc00] px-4 py-2 font-normal cursor-pointer" onClick={() => handleSteps(true)}>
                         <span className="mr-2">Save &amp; Continue</span>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                         </svg>
                     </span>
                 </div>
             </div>

         </div>
    </div>
 </section>
}