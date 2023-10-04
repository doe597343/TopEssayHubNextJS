import React, { useEffect, useState } from "react";
import { apiHelper } from "../../../helpers/ApiHelper";
// import { orderDefault } from '../../../constants/item'
import Select from "../../Shared/Select/Index"
import OrderSidePanel from '../../Shared/OrderSidePanel/Index'
import FormRow from '../../Shared/FormRow/Index'
import PrimaryButton from '../../Shared/PrimaryButton/Index'

import jwt from 'jsonwebtoken';
import { useRouter } from "next/router";



export default function Index(props){

    // listings
    // const [academicLevels, setAcademicLevels] = useState([])
    // const [paperTypes, setPaperTypes] = useState([])
    // const [subjectTypes, setSubjectTypes] = useState([])
    // const [paperFormats, setPaperFormats] = useState([])
    
    // const [topic, setTopic] = useState("props.orderJSON.topic")
    // const [paper_instructions, set_paper_instructions] = useState(props.orderJSON.paper_instructions)
    // const [selectedFile, setSelectedFile] = useState([]);

    // const [academic_level_id, set_academic_level_id] = useState(props.orderJSON.academic_level_id)
    // const [paper_id, set_paper_id] = useState(props.orderJSON.paper_id)
    // const [subject_id, set_subject_id] = useState(props.orderJSON.subject_id)
    // const [format_id, set_format_id] = useState(props.orderJSON.format_id)

    // const [topic, setTopic] = useState("")
    // const [paper_instructions, set_paper_instructions] = useState(props.orderJSON.paper_instructions)
    const [selectedFile, setSelectedFile] = useState([]);

    // const [academic_level_id, set_academic_level_id] = useState(props.orderJSON.academic_level_id)
    // const [paper_id, set_paper_id] = useState(props.orderJSON.paper_id)
    // const [subject_id, set_subject_id] = useState(props.orderJSON.subject_id)
    // const [format_id, set_format_id] = useState(props.orderJSON.format_id)

    let router = useRouter()
        
    useEffect(()=> {
        let query = router.query;
        if(query.discount_code){
            let newOrderJSON = {...props.orderJSON, coupon_code: query.discount_code}
            props.setOrder(newOrderJSON)
        }
    }, [router.query])


    // recompute pricing
    // useEffect(() => {
    //     let modifiedOrder = {...props.orderJSON, academic_level_id, paper_id, subject_id, format_id, topic, paper_instructions}
    //     props.setOrder(modifiedOrder)
        
    // }, [academic_level_id, paper_id, subject_id, format_id])

    useEffect(() => {
        // if(selectedFile.length){
        //     console.log('uploading files..')
        //     uploadFiles()

        //     console.log("selectedFile == ", selectedFile)
        // }
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

    const uploadFiles = async () => {
        const order_token = localStorage.getItem('order_token');
        let formData = new FormData()

        formData.append('order_token', order_token)
        // formData.append('upload', file, selectedFile)

        for(const file of selectedFile){
            formData.append(`upload`, file);
        }
        const res = await apiHelper('orders/upload', 'POST', formData);
        return res.data;

        // apiHelper('orders/upload', 'POST', formData)
        // .then(res => {
        //     const data = res.data
        //     if(data.status){
        //         alert(data.message)
        //     }
        // }).catch(err => {
        //     console.log(err)
        // })
    }

    const onChangeFile = (e) => {
        console.log("uploaded files === ", e.target.files)
        setSelectedFile([...selectedFile, ...e.target.files])
    }

    const update_detail = (e) => {
        let name = e.target.name
        let value = e.target.value
        
        console.log("e.target.value == ", e.target.value)
        let newOrderJSON = {...props.orderJSON, [name]: value}
        console.log('update detail === ', newOrderJSON)

        let dontExececutePricing = ['topic', 'paper_instructions', 'coupon_code', 'other_paper', 'other_subject', 'other_format'].includes(name)

        console.log("dontExececutePricing == ", dontExececutePricing)

        console.log("name == ", name)
        if(dontExececutePricing){
            console.log('props.orderJSON == ',props.orderJSON)
            props.setOrderJSON(newOrderJSON)
        }else{
            props.setOrder(newOrderJSON)
        }
    }

    const button_update_detail = (params) => {
        let name = params.name
        let itemID = params.itemID
        console.log("params == ", params)

        let newOrderJSON = {...props.orderJSON, [name]: itemID}
        console.log('update detail === ', newOrderJSON)

        let dontExececutePricing = ['topic', 'paper_instructions'].includes(name)
        if(dontExececutePricing){
            props.setOrderJSON(newOrderJSON)
        }else{
            props.setOrder(newOrderJSON)

            if(name == 'academic_level_id'){
                // let acad_level = props.orderJSON.academic_level_id
                props.getPaperTypes(itemID)
                props.getSubjectTypes(itemID)
            }
        }
    }

    const removeFile = async (unique_filename, local = false) => {

        if(local){
            let newSelectedFile = selectedFile.filter(file => file.name != unique_filename);
            setSelectedFile(newSelectedFile);

        }else{ 

            let order_token = localStorage.getItem('order_token');
            let user_token = localStorage.getItem('userToken')
            let headers = {
                Authorization: user_token
            }

            let formData = new FormData()
            formData.append('order_token', order_token)
            formData.append('unique_filename', unique_filename)

            const res = await apiHelper('orders/remove-file', 'POST', formData, headers);
            console.log('removeFile == ', res)
            if(res.data.status){
                order_token = res.data.data.order_token;
                localStorage.setItem('order_token', order_token)

                let orderJSON = jwt.decode(order_token).data
                props.setOrderJSON(orderJSON)
            }else{
                let message = res.data.message
                alert(message)
            }
        }


    }

    const handleSteps = async () => {
        if(selectedFile.length){
            console.log('uploading files..')
            const data = await uploadFiles()
            console.log('res.data.status upload == ', data.status)
            if(data.status){
                let order_token = data.data
                let newOrderJSON = jwt.decode(order_token).data
                console.log('order_token from upload === ',order_token )

                localStorage.setItem('order_token', order_token);
                props.setOrderJSON(newOrderJSON)
            }

            console.log("selectedFile == ", selectedFile)

            props.nextFormStep()
        }else{
            props.nextFormStep()
        }
    }

    // pt-[6rem]
    return <section className="pb-4 bg-gray-50"> 
    <div>
         <div className="md:p-3 ">
             {/* <div className="md:flex items-center py-3 pl-5 bg-[#eda110] text-white"> 
                 <span className="inline-block w-5 h-5 mr-2">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                     </svg>
                 </span>
                 <h2>Paper Details</h2>
             </div> */}
            {/* md:flex md:pb-20 pt-10 justify-between bg-gray-800 */}
        {/* <h1 className="font-semibold text-2xl text-center py-5">
             ORDER
         </h1> */}
            <div className="md:flex md:space-x-5 justify-center">
                {/* md:flex-1 bg-white md:py-14 shadow-lg space-y-3 border rounded-lg */}
                <div className="bg-white rounded-lg shadow-lg px-4 py-10 md:w-1/2 w-full">
                    <div className="hidden md:block">
                        <FormRow>
                            {/*  */}
                            <p htmlFor="countries" className="">Academic Level</p>
                            {/* <Select selectedIndex={props.orderJSON.academic_level_id} list={academicLevels} name="academic_level_id" eventHandler={update_detail} targetKey="academic_name" /> */}
                            <div className="flex space-x-3 justify-evenly col-span-4">
                                {props.academicLevels.map((item, index) => {
                                    return <PrimaryButton value={item.academic_name} eventHandler={button_update_detail}  itemID={item.id} name="academic_level_id" active_id ={props.orderJSON.academic_level_id} />
                                })}
                            </div>
                        </FormRow>
                    </div>
                    <div className="md:hidden">
                        <FormRow>
                            <p htmlFor="countries" className=" w-80 block">Academic Level</p>     
                            <p className="col-span-4">     
                                <Select selectedIndex={props.orderJSON.academic_level_id} list={props.academicLevels} name="academic_level_id" eventHandler={update_detail} targetKey="academic_name" />
                            </p>
                        </FormRow>
                    </div>

                    <FormRow>
                    <p htmlFor="countries" className="">Type of Paper</p>
                    <p className="col-span-4">
                        <Select selectedIndex={props.orderJSON.paper_id} list={props.paperTypes} name="paper_id" eventHandler={update_detail} targetKey="category_name" />
                    </p>
                    </FormRow>

                    {props.orderJSON.paper_id == 31 &&
                        <FormRow>
                            <p>{props.orderJSON.other_paper}</p>
                            <p className="col-span-4">
                                <input onChange={(e) => update_detail(e)} className=" bg-gray-100 border  p-2.5 w-full text-sm mb-3" name="other_paper" id="other_paper" type="text" placeholder="Other type of paper"  value={props.orderJSON.other_paper} />
                            </p>
                        </FormRow>
                    }

                    <FormRow>
                    <p htmlFor="countries" className=" ">Subject or Descipline</p>
                     <p className="col-span-4">
                    <Select selectedIndex={props.orderJSON.subject_id} list={props.subjectTypes} name="subject_id" eventHandler={update_detail} targetKey="category_name" />
                    </p>
                    </FormRow>
                    
                    {props.orderJSON.subject_id == 19 &&  
                        <FormRow>
                            <p></p>
                            <p className="col-span-4">
                                <input onChange={(e) => update_detail(e)} className=" bg-gray-100 border  p-2.5 w-full text-sm mb-3" name="other_subject" id="other_subject" type="text" placeholder="Other subject"  value={props.orderJSON.other_subject} />
                            </p>
                        </FormRow>
                    }
                    <div className="hidden">
                    <FormRow>
                        <p htmlFor="countries" className=" ">Paper Format</p>
                        {/* <Select selectedIndex={props.orderJSON.academic_level_id} list={academicLevels} name="academic_level_id" eventHandler={update_detail} targetKey="academic_name" /> */}
                        <div className="flex w-full space-x-3 justify-evenly">
                            {props.paperFormats.map((item) => {
                                return <PrimaryButton value={item.format_name} eventHandler={button_update_detail} itemID={item.id} name="format_id" />
                            })}
                        </div>
                    </FormRow>
                    </div>
                    

                    <FormRow>
                    <p htmlFor="countries" className=" ">Paper format</p>
                    <p className="col-span-4">
                        <Select selectedIndex={props.orderJSON.format_id} list={props.paperFormats} name="format_id" eventHandler={update_detail} targetKey="format_name" />
                    </p>
                    </FormRow>

                    {props.orderJSON.format_id == 6 && 
                    <FormRow>
                        <p></p>
                        <p className="col-span-4">
                            <input onChange={(e) => update_detail(e)} className=" bg-gray-100 border  p-2.5 w-full text-sm mb-3" name="other_format" id="other_format" type="text" placeholder="Other format"  value={props.orderJSON.other_format} />
                        </p>
                    </FormRow>}


                    <FormRow>
                    <p htmlFor="topic" className="">Topic</p>
                     <p className="col-span-4">
                    <input className=" bg-gray-100 border  p-2.5 w-full text-sm mb-3" name="topic" id="topic" type="text" placeholder="Write's choice" onChange={(e) => update_detail(e) } value={props.orderJSON.topic} />
                    </p>
                    </FormRow>

                    <FormRow>
                    <p htmlFor="paper-instruction" className=" ">Paper Instruction</p>
                     <p className="col-span-4">
                    <textarea className=" bg-gray-100 border  p-1.5 w-full text-sm mb-3" name="paper_instructions" id="paper-instruction" placeholder="Opional field" rows="5" onChange={(e) => update_detail(e) } value={ props.orderJSON.paper_instructions} />
                    </p>
                    </FormRow>

                    {/* <FormRow>
                    <p htmlFor="additional-material" className="">Additional Materials: </p>
                     <p className="col-span-4">
                    <input className=" w-full px-3 py-1 border-gray-400 rounded-md bg-gray-100 border mb-3" id="additional-material" type="file" name="file" multiple onChange={(e) => onChangeFile(e)} />
                    </p>
                    </FormRow> */}
                    <FormRow>
                        <p htmlFor="additional-material" className="md:block hidden">Additional Materials: </p>
                        <label class="cursor-pointer">
                            <span class="font-semibold text-center block leading-normal py-2 bg-yellow-400 text-white text-sm rounded-full" >Upload File</span>
                            <input type='file' name="file" class="hidden" multiple="multiple" onChange={(e) => onChangeFile(e)} accept="accept" />
                        </label> 
                         {/* onChange={(e) => uplaod_avatar(e)}  */}
                    </FormRow>

                    <div className="py-4 w-full">
                        <ul className="space-y-3">
                            {
                                selectedFile.map(file => {
                                    return <li className="flex px-4 justify-between items-center border border-gray-300 py-1 shadow-md shadow-yellow-50 rounded-lg"><span className="text-sm">{file.name}</span> <span className="flex items-center"><span className="flex items-center text-sm cursor-pointer text-red-500" onClick={() => removeFile(file.name, true)}>Remove <img className="ml-2 w-4 h-4" src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" /></span></span></li>
                                })
                            }
                            {
                                props.orderJSON.customer_files.map(file => {
                                    return <li className="flex px-4 justify-between items-center border border-gray-300 py-1 shadow-md shadow-yellow-50 rounded-lg"><span className="text-sm">{file.filename}</span> <span className="flex items-center"><span className="flex items-center text-sm cursor-pointer" onClick={() => removeFile(file.unique_filename, false)}>Remove <img className="ml-2 w-4 h-4" src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" /></span></span></li>
                                })
                            }
                            {/* {selectedFile.map(f => {
                                return <li className="flex px-4 justify-between items-center border border-gray-300 py-1 shadow-md shadow-yellow-50 rounded-lg"><span className="text-sm">{f.name}</span> <span className="flex items-center"><a className="flex items-center text-sm" href="#">Remove <img className="ml-2 w-4 h-4" src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" /></a></span></li>
                            })} */}
                        </ul>
                    </div>
                    <div className="md:hidden flex justify-between font-bold text-2xl px-3 pb-8">
                        <p> Total Price:  </p>
                        <p class="text-green-600">${props.orderJSON.total_price.toFixed(2)}</p>
                    </div>

                    <button onClick={() => handleSteps()} type="button" class="md:hidden block bg-yellow-400 w-full p-3 rounded-md shadow-md font-semibold">Continue</button>
                </div> 
                
                <OrderSidePanel writerCategories={props.writerCategories} academicLevels={props.academicLevels} paperTypes={props.paperTypes} paperFormats={props.paperFormats} subjectTypes={props.subjectTypes} formStep={props.formStep} handleSteps={handleSteps} setOrder={props.setOrder} update_detail={update_detail} orderJSON={props.orderJSON} />              
                
            </div>

            {/* <div className="flex justify-end items-center mt-7">
                     <span className="flex bg-[#f8cc00] px-5 py-2 font-semibold cursor-pointer" onClick={() =>  handleSteps()}>
                         <span className="mr-2">Continue</span>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                         </svg>
                     </span>
                 </div> */}
         </div>
    </div>
 </section>
}