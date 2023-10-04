import React, { useEffect, useState } from "react";
import PaperDetails from './PaperDetails/Index'
import PriceCalculator from './PriceCalculator/Index'
import OrderSummary from './OrderSummary/Index'

import jwt from 'jsonwebtoken';

// import {orderDefault} from '../../constants/item'

import { apiHelper } from "../../helpers/ApiHelper";
import Router, { useRouter } from "next/router";

import SideBar from '../Shared/SideBar/Index'

export default function Index(props){

    const router = useRouter()

    const [auth, setAuth] = useState("")
    const defauttToken = props.order_token
    const [formStep, setFormStep] = useState(1)
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

    const [order_details, set_order_details] = useState(jwt.decode(defauttToken).data)
    
    const nextFormStep = () => {
        setOrder(orderJSON)
        setFormStep((currentStep) => currentStep + 1);
    }
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    const [academicLevels, setAcademicLevels] = useState([])
    const [paperTypes, setPaperTypes] = useState([])
    const [subjectTypes, setSubjectTypes] = useState([])
    const [paperFormats, setPaperFormats] = useState([])
    const [writerCategories, setWriterCategories] = useState([])

    const [listOptions, setListOptons] = useState({})

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
    
    const saveOrder = async () => {

        let userToken = localStorage.getItem('userToken')
        let headers = {Authorization: userToken}

        let order_token = localStorage.getItem('order_token')

        let formData = new FormData()
        formData.append('order_token', order_token)
        console.log('order_toekn === ', order_token)

        const res = await apiHelper('orders/save', 'POST', formData, headers);
        return res.data;
        // .then(res => {
        //     if(res.data.status) {
        //         alert(res.data.message)
        //     }else{
        //         console.log('saveOrder error === ', res)
        //          alert(res.data.message)
        //     }
        // })
        // .catch(err => {
        //     console.log('orders/save === ',err)
        // })

        // apiHelper('orders/save', 'POST', formData, headers);
        // .then(res => {
        //     if(res.data.status) {
        //         alert(res.data.message)
        //     }else{
        //         console.log('saveOrder error === ', res)
        //          alert(res.data.message)
        //     }
        // })
        // .catch(err => {
        //     console.log('orders/save === ',err)
        // })
    }

    // const getOrderSummary = () => {
    //     let userToken = localStorage.getItem('userToken')
    //     let headers = {Authorization: userToken}

    //     let order_token = localStorage.getItem('order_token')
    //     if(props.order_id){
            
    //     }


    // }

    const setOrderDetails = (oDetails) => {
        console.log("changed === ", oDetails)
        set_order_details({...order_details, ...oDetails})
    }


    const getAcademicLevel = () => {
         apiHelper('calculator/academic-levels', 'GET', null)
        .then(res => {
            const data = res.data.status ? res.data.data : []
            // setListOptons({...listOptions, academicLevels: data})
            setAcademicLevels(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getPaperTypes = (acad_level) => {
        apiHelper(`calculator/paper-types/${acad_level}`, 'GET', null)
       .then(res => {
        //    let data = res.data.data.highSchool.length ? res.data.data : []
        //    setListOptons({...listOptions, paperTypes: data})

            if(res.data.status){
                setPaperTypes(res.data.data)
            }
       })
       .catch(err => {
           console.log(err)
       })
   }

    const getSubjectTypes = (acad_level) => {
        apiHelper(`calculator/subject-types/${acad_level}`, 'GET', null)
        .then(res => {
            // let data = res.data.data.highSchool.length ? res.data.data.highSchool : []
            // setListOptons({...listOptions, subjectTypes: data})
            if(res.data.status){
                let subject_types = res.data.data
                setSubjectTypes(subject_types)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getPaperFormats = () => {
        apiHelper(`calculator/paper-formats`, 'GET', null)
        .then(res => {
            let data = res.data.status ? res.data.data : []
            // setListOptons({...listOptions, paperFormats: data})
            setPaperFormats(data)
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

    // recompute pricing
    // useEffect(()=> {
    //     console.log('updating order_details: ', order_details)
    //     setOrder(order_details)
    // }, [order_details])

    useEffect(() => {

     

        // load list options
        console.log('load list options')
        getAcademicLevel()
        getPaperTypes(1)
        getSubjectTypes(1)
        getPaperFormats()

        getWriterCategories()

        console.log('listOptions == '. listOptions)

        // localStorage.removeItem('order_token')

        

        console.log('parent componentDidMount')

        let user_token = localStorage.getItem('userToken')
        if(user_token){
            setAuth(user_token)
        }

        // setFormStep(3)
        // let order_token = localStorage.getItem('order_token');
        
        if(props.order_id){
            setFormStep(3)
        }else{
            let cached_order_token = localStorage.getItem('cached_order_token')
            if(cached_order_token){
                let cachedOrderJSON = jwt.decode(cached_order_token).data;
                 setOrder(cachedOrderJSON)
                 localStorage.removeItem('cached_order_token')
                 setFormStep(2)
                // setOrderJSON(cachedOrderJSON)
            }else{
                localStorage.removeItem('order_token')
                setOrder(orderJSON)
            }
        }
        

        console.log('decoded == ', jwt.decode(defauttToken))

  
    }, [])

    return <div className={auth ? '' : `pt-[6rem]`}>
       
        {auth ? <SideBar>
            {formStep == 1 && <PaperDetails getPaperTypes={getPaperTypes} getSubjectTypes={getSubjectTypes} writerCategories={writerCategories} academicLevels={academicLevels} paperTypes={paperTypes} paperFormats={paperFormats} subjectTypes={subjectTypes} formStep={formStep} nextFormStep={nextFormStep} setOrder={setOrder} setOrderDetails={setOrderDetails} orderJSON={orderJSON} setOrderJSON={setOrderJSON} />}
            {formStep == 2 && <PriceCalculator writerCategories={writerCategories} academicLevels={academicLevels} paperTypes={paperTypes} paperFormats={paperFormats} subjectTypes={subjectTypes} formStep={formStep} prevFormStep={prevFormStep} nextFormStep={nextFormStep} setOrder={setOrder} setOrderDetails={setOrderDetails} saveOrder={saveOrder} orderJSON={orderJSON} setOrderJSON={setOrderJSON}/>}
            {formStep == 3 && <OrderSummary prevFormStep={prevFormStep} nextFormStep={nextFormStep} setOrder={setOrder} order_id={props.order_id} orderJSON={orderJSON} setOrderJSON={setOrderJSON}/>}
        </SideBar> : 
        <>
            <h1 className="pb-4 text-center font-bold text-xl">Place an order</h1>
            {formStep == 1 && <PaperDetails getPaperTypes={getPaperTypes} getSubjectTypes={getSubjectTypes} writerCategories={writerCategories} academicLevels={academicLevels} paperTypes={paperTypes} paperFormats={paperFormats} subjectTypes={subjectTypes} formStep={formStep} nextFormStep={nextFormStep} setOrder={setOrder} setOrderDetails={setOrderDetails} orderJSON={orderJSON} setOrderJSON={setOrderJSON} />}
            {formStep == 2 && <PriceCalculator writerCategories={writerCategories} academicLevels={academicLevels} paperTypes={paperTypes} paperFormats={paperFormats} subjectTypes={subjectTypes} formStep={formStep} prevFormStep={prevFormStep} nextFormStep={nextFormStep} setOrder={setOrder} setOrderDetails={setOrderDetails} saveOrder={saveOrder} orderJSON={orderJSON} setOrderJSON={setOrderJSON} />}
            {formStep == 3 && <OrderSummary prevFormStep={prevFormStep} nextFormStep={nextFormStep} setOrder={setOrder} order_id={props.order_id} orderJSON={orderJSON} setOrderJSON={setOrderJSON}/>}
        </> }


           {/* <p>
             {JSON.stringify(orderJSON)}
        </p> */}
    </div> 
}