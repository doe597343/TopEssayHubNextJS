import React, { useEffect, useState } from "react";
import {FAQS} from '../../constants/Item'

export default function Index(props) {

    const [faqs, set_faqs] = useState([])
    useEffect(() => {
        let dynamicFaqs = props?.data?.faqs;
        dynamicFaqs && dynamicFaqs.length ? set_faqs(dynamicFaqs) : set_faqs(FAQS)
    }, [])

    const toggle = (body_id) => {
        let target_body = document.getElementById(body_id)
        target_body.classList.toggle("hidden")
    }        
    
    return <section className=" pt-[6rem] px-4 space-y-5 mb-8">
        <h3 className="font-semibold text-2xl text-center">Frequently asked questions</h3>
        <div id="accordion-collapse" data-accordion="collapse">
        {faqs.map((faq, index) => {
             return <>
            <h2 id={`accordion-collapse-heading-${index}`}>
            <button onClick={() => toggle(`accordion-collapse-body-${index}`)} type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                <span>{faq.question}</span>
                <svg data-accordion-icon className="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
            </h2>
            <div id={`accordion-collapse-body-${index}`} className="hidden" aria-labelledby="accordion-collapse-heading-1">
                <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">{faq.answer}</p>    
                </div>
            </div>
            </>
        })}
        </div>
    </section>
}