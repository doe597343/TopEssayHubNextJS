import React, { useEffect, useState } from "react";
import PaperDetails from './PaperDetails/Index'
import PriceCalculator from './PriceCalculator/Index'
import OrderSummary from './OrderSummary/Index'

import jwt from 'jsonwebtoken';

import {orderDefault} from '../../constants/item'

import { apiHelper } from "../../helpers/ApiHelper";
import Router, { useRouter } from "next/router";

export default function Index(props){

    const router = useRouter()

    const defauttToken = props.order_token
    const [formStep, setFormStep] = useState(1)
    const [orderJSON, setOrderJSON] = useState(jwt.decode(defauttToken).data)

    const [order_details, set_order_details] = useState(jwt.decode(defauttToken).data)
    
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    const setOrder = (order) => {

        console.log('setOrder == ', order)

        const formData = new FormData();

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

        apiHelper(`calculator/pricing`, 'POST', formData)
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

        apiHelper('orders/save', 'POST', formData, headers)
        .then(res => {
            if(res.data.status) {
                alert('order Save na')
            }else{
                console.log('saveOrder error === ', res)
                 alert(res.data.message)
            }
        })
        .catch(err => {
            console.log('orders/save === ',err)
        })
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

    // recompute pricing
    // useEffect(()=> {
    //     console.log('updating order_details: ', order_details)
    //     setOrder(order_details)
    // }, [order_details])

    useEffect(() => {

        console.log('parent componentDidMount')
        // setFormStep(3)
        let order_token = localStorage.getItem('order_token');
        if(order_token == null) {
            localStorage.setItem('order_token', defauttToken)
        }

        console.log('decoded == ', jwt.decode(defauttToken))
  
    }, [])

    return <>

        {formStep == 1 && <PaperDetails nextFormStep={nextFormStep} setOrder={setOrder} setOrderDetails={setOrderDetails} orderJSON={orderJSON} />}
        {formStep == 2 && <PriceCalculator prevFormStep={prevFormStep} nextFormStep={nextFormStep} setOrder={setOrder} setOrderDetails={setOrderDetails} saveOrder={saveOrder} orderJSON={orderJSON}/>}
        {formStep == 3 && <OrderSummary prevFormStep={prevFormStep} nextFormStep={nextFormStep} setOrder={setOrder} order_id={props.order_id} orderJSON={orderJSON}/>}
           <p>
             {JSON.stringify(orderJSON)}
        </p>
    </> 
}