import React, { useEffect, useState } from "react";
import { apiHelper } from "../../../helpers/ApiHelper";
import { orderDefault } from '../../../constants/item'
import Select from "../../Shared/Select/Index"

import jwt from 'jsonwebtoken';

export default function Index(props){

    // listings
    const [academicLevels, setAcademicLevels] = useState([])
    const [paperTypes, setPaperTypes] = useState([])
    const [subjectTypes, setSubjectTypes] = useState([])
    const [paperFormats, setPaperFormats] = useState([])
    
    // const [topic, setTopic] = useState("props.orderJSON.topic")
    // const [paper_instructions, set_paper_instructions] = useState(props.orderJSON.paper_instructions)
    // const [selectedFile, setSelectedFile] = useState([]);

    // const [academic_level_id, set_academic_level_id] = useState(props.orderJSON.academic_level_id)
    // const [paper_id, set_paper_id] = useState(props.orderJSON.paper_id)
    // const [subject_id, set_subject_id] = useState(props.orderJSON.subject_id)
    // const [format_id, set_format_id] = useState(props.orderJSON.format_id)

    const [topic, setTopic] = useState(props.orderJSON.topic)
    const [paper_instructions, set_paper_instructions] = useState(props.orderJSON.paper_instructions)
    const [selectedFile, setSelectedFile] = useState([]);

    const [academic_level_id, set_academic_level_id] = useState(props.orderJSON.academic_level_id)
    const [paper_id, set_paper_id] = useState(props.orderJSON.paper_id)
    const [subject_id, set_subject_id] = useState(props.orderJSON.subject_id)
    const [format_id, set_format_id] = useState(props.orderJSON.format_id)

    useEffect(()=> {
     
        // console.log('decode again toekn variable === ', orderJSON)

        getAcademicLevel()
        getPaperTypes()
        getSubjectTypes()
        getPaperFormats()
    },[])


    // recompute pricing
    useEffect(() => {
        let modifiedOrder = {...props.orderJSON, academic_level_id, paper_id, subject_id, format_id, topic, paper_instructions}
        props.setOrder(modifiedOrder)
        
    }, [academic_level_id, paper_id, subject_id, format_id])

    useEffect(() => {
        if(selectedFile.length){
            console.log('uploading files..')
            uploadFiles()
        }
    }, [selectedFile])

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
        apiHelper('calculator/paper-types', 'GET', null)
       .then(res => {
           let data = res.data.data.highSchool.length ? res.data.data : []
           setPaperTypes(data.highSchool)
       })
       .catch(err => {
           console.log(err)
       })
   }

    const getSubjectTypes = () => {
        apiHelper(`calculator/subject-types`, 'GET', null)
        .then(res => {
            let data = res.data.data.highSchool.length ? res.data.data.highSchool : []
            setSubjectTypes(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getPaperFormats = () => {
        apiHelper(`calculator/paper-formats`, 'GET', null)
        .then(res => {
            let data = res.data.status ? res.data.data : []
            setPaperFormats(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const uploadFiles = () => {
        const orderToken = props.orderToken;
        let formData = new FormData()

        formData.append('order_token', orderToken)
        // formData.append('upload', file, selectedFile)

        for(const file of selectedFile){
            formData.append(`upload`, file);
        }

        apiHelper('orders/upload', 'POST', formData)
        .then(res => {
            const data = res.data
            if(data.status){
                alert(data.message)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const onChangeFile = (e) => {
        console.log("uploaded files === ", e.target.files)
        setSelectedFile(e.target.files)
    }
    
    return <section className="pb-4 pt-[6rem]">
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
                 <h2>Paper Details</h2>
             </div>

             <label htmlFor="countries" className="block mb-1 text-sm font-medium text-gray-600 dark:text-white">Academic Level</label>
             <Select selectedIndex={academic_level_id} list={academicLevels} eventHandler={set_academic_level_id} targetKey="academic_name" />
 
            <label htmlFor="countries" className="block mb-1 text-sm font-medium text-gray-600 dark:text-white">Type of Paper</label>
            <Select selectedIndex={paper_id} list={paperTypes} eventHandler={set_paper_id} targetKey="category_name" />

            <label htmlFor="countries" className="block mb-1 text-sm font-medium text-gray-600 dark:text-white">Subject or Descipline</label>
            <Select selectedIndex={subject_id} list={subjectTypes} eventHandler={set_subject_id} targetKey="category_name" />
           
            <label htmlFor="topic" className="block mb-1 text-sm font-medium text-gray-600 dark:text-white">Topic</label> {props.topic}
            <input className="border border-gray-400 p-1.5 w-full text-sm mb-3" id="topic" type="text" placeholder="Write's choice" onChange={(e) => setTopic(e.target.value) } value={topic} />

            <label htmlFor="paper-instruction" className="block mb-1 text-sm font-medium text-gray-600 dark:text-white">Paper Instruction</label>
            <textarea className="border border-gray-400 p-1.5 w-full text-sm mb-3" id="paper-instruction" placeholder="Opional field" rows="5" onChange={(e) => set_paper_instructions(e.target.value) } value={ paper_instructions} />

            <label htmlFor="additional-material" className="block mb-1 text-sm font-medium text-gray-600 dark:text-white">Additional Materials: </label>
            <input className="px-3 py-1 border-gray-400 rounded-md bg-gray-100 border mb-3" id="additional-material" type="file" name="file" multiple onChange={(e) => onChangeFile(e)} />

            <label htmlFor="countries" className="block mb-1 text-sm font-medium text-gray-600 dark:text-white">Paper format</label>
            <Select selectedIndex={format_id} list={paperFormats} eventHandler={set_format_id} targetKey="format_name" />
 
            <div className="flex justify-end items-center mt-7">
                     <span className="flex bg-[#f8cc00] px-5 py-2 font-semibold" onClick={() =>  props.nextFormStep()}>
                         <span className="mr-2">Continue</span>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                         </svg>
                     </span>
                 </div>
         </div>
    </div>
 </section>
}