import react, { useEffect, useRef, useState } from "react";
import { apiHelper } from "../../helpers/ApiHelper";

import jwt from 'jsonwebtoken';

export default function Index(){
    const [old_password, set_old_password] = useState("")
    const [new_password, set_new_password] = useState("")
    const [confirm_password, set_confirm_password] = useState("")
    const [firstname, set_firstname] = useState("")
    const [lastname, set_lastname] = useState("")
    const [countries, set_countries] = useState([])
    const [country_id, set_country_id] = useState(162)
    const [phone_code, set_phone_code] = useState("")
    const [phone, set_phone] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [profile_pic, set_profile_pic] = useState("")

    const onChangeFile = (e) => {
        console.log("uploaded files === ", e.target.files)
        let avatar = e.target.files[0]
        setSelectedFile(avatar)
    }

    // useEffect(() => {
    //     console.log('uploading files' , selectedFile)
    //     uplaod_avatar();
    // }, [selectedFile])

    const uplaod_avatar = async (e) => {
        const user_token = localStorage.getItem('userToken')
        if(!user_token){
            window.location.href = "/login"
        }

        let headers = {Authorization: user_token}
        let formData = new FormData()
        formData.append('profile_pic', e.target.files[0])

        const res = await apiHelper('profile/picture', 'POST', formData, headers);    
        if(res.data.status){
            let new_user_token = res.data.data;
            localStorage.setItem('userToken', new_user_token)

            let userJSON = jwt.decode(new_user_token).data;

            if(userJSON.profile_pic){
                set_profile_pic(userJSON.profile_pic)
            }
        }
        alert(res.data.message)
        
    }


    const update_password = async () => {
        

        const user_token = localStorage.getItem('userToken')
        if(!user_token){
            window.location.href = "/login"
        }

        let headers = {Authorization: user_token}
        let formData = new FormData()
        formData.append('old_password', old_password)
        formData.append('new_password', new_password)
        formData.append('confirm_password', confirm_password)

        const res = await apiHelper('profile/password', 'POST', formData, headers);    
        if(res.data.status){
            set_new_password("")
            set_old_password("")
            set_confirm_password("")
        }
        alert(res.data.message)
        
    }

    useEffect(()=> {
        console.log('selecting country' + country_id)
        let country = countries.filter(item => {return item.id == country_id})[0]

        if(country){
            let phonecode = '+' + country.phonecode;
            set_phone_code(phonecode)
        }
    }, [country_id])


    const getCountries = () => {
        apiHelper('calculator/countries', 'GET', null)
       .then(res => {
           if(res.data.status){
                let countries = res.data.data
                set_countries(countries)
           }
       })
       .catch(err => {
           console.log(err)
       })
    }


    useEffect(() => {
        const user_token = localStorage.getItem('userToken')
        if(!user_token){
            window.location.href = "/login"
        }
        let userJSON = jwt.decode(user_token).data;

        console.log('userJSON == ', userJSON )

        set_firstname(userJSON.firstname)
        set_lastname(userJSON.lastname)

        set_phone_code('+' + userJSON.phonecode)
        set_phone(userJSON.phone)


        set_profile_pic(userJSON.profile_pic)

        getCountries()
        set_country_id(userJSON.country_id)
        
    }, [])

    const update_name = async () => {
        const user_token = localStorage.getItem('userToken')
        if(!user_token){
            window.location.href = "/login"
        }

        let headers = {Authorization: user_token}
        let formData = new FormData()
        formData.append('firstname', firstname)
        formData.append('lastname', lastname)

        const res = await apiHelper('profile/fullname', 'POST', formData, headers);    
     
        if(res.data.status){
            let new_user_token = res.data.data
            localStorage.setItem('userToken', new_user_token)
        }
        alert(res.data.message)       
    }

     const update_phone = async () => {
        const user_token = localStorage.getItem('userToken')
        if(!user_token){
            window.location.href = "/login"
        }

        let headers = {Authorization: user_token}
        let formData = new FormData()
        formData.append('country_id', country_id)
        formData.append('phone', phone)

        const res = await apiHelper('profile/phone', 'POST', formData, headers);    
     
        if(res.data.status){
            let new_user_token = res.data.data
            localStorage.setItem('userToken', new_user_token)
        }
        alert(res.data.message)       
    }

    const enableEditMode = (name) => {
        let element = document.getElementById(name);
        
        element.toggleAttribute("disabled")
        element.focus()
        element.classList.remove("bg-gray-50")
        element.classList.add("shadow-md")

        let password_input = ['old_password', 'new_password', 'confirm_password'].includes(name)
        if(password_input){
            element.setAttribute("type", "text");
        }
    }

    const disableEditMode = async (e) => {
  
        e.target.toggleAttribute("disabled")
        e.target.classList.add("bg-gray-50")
        e.target.classList.remove("shadow-md")

        let updatingName = ['firstname', 'lastname'].includes(e.target.id)
        if(updatingName) await update_name();

        let updatingPhone = ['phone'].includes(e.target.id)
        if(updatingPhone) await update_phone()

        let updatingPassword = ['confirm_password'].includes(e.target.id)
        if(updatingPassword) await update_password();

        let password_input = ['old_password', 'new_password', 'confirm_password'].includes(e.target.id)
        if(password_input){
            e.target.setAttribute("type", "password");
        }


    }


    return <div className=" pt-10">
     <div className="md:mx-40 shadow-lg bg-white p-10">
    <div className="flex justify-center mb-5">
        <div class="py-3 center mx-auto">
            <div class="bg-white px-4 py-5 rounded-lg shadow-lg text-center w-48">
            <div class="mb-4">
                <img class=" w-32 mx-auto rounded-full object-cover object-center" src={profile_pic ? `${process.env.NEXT_PUBLIC_PROFILE_PIC_URL}/${profile_pic}` : `${process.env.NEXT_PUBLIC_BASE_URL}/user-avatar.svg`} alt="Avatar Upload" />
            </div>
            <label class="cursor-pointer mt-6">
                <span class="mt-2 leading-normal px-4 py-2 bg-blue-500 text-white text-sm rounded-full" >Select Avatar</span>
                <input onChange={(e) => uplaod_avatar(e)} type='file' class="hidden" multiple="multiple" accept="accept" />
            </label>
            </div>
        </div>
    </div>
    <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        {/* Security  */}
        <div className="border border-1 rounded-lg border-gray-200 px-7 pb-7">
            <p className=" py-6 font-bold text-lg text-gray-500">Signin and Security</p>
            <div className="mb-4">
                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                <div className="flex">
                    <input value={old_password} onChange={(e) => set_old_password(e.target.value)} onBlur={(e) => disableEditMode(e)} disabled type="password" id="old_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   required />
                    <p onClick={() => enableEditMode("old_password")} className=" cursor-pointer hover:bg-yellow-50 border px-1 py-2 border-gray-300 rounded-r-lg block">
                        <svg className=" text-gray-700" width="24" stroke-width="1.5" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor"> <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M8 10H16M8 6H12M8 14H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> </svg>
                    </p>
                </div>
            </div>  
           <div className="mb-4">
                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                <div className="flex">
                    <input value={new_password} onChange={(e) => set_new_password(e.target.value)} onBlur={(e) => disableEditMode(e)}  disabled type="password" id="new_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   required />
                    <p onClick={() => enableEditMode("new_password")} className=" cursor-pointer hover:bg-yellow-50 border px-1 py-2 border-gray-300 rounded-r-lg block">
                        <svg className=" text-gray-700" width="24" stroke-width="1.5" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor"> <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M8 10H16M8 6H12M8 14H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> </svg>
                    </p>
                </div>
            </div>  
            <div className="mb-5">
                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <div className="flex">
                    <input value={confirm_password} onChange={(e) => set_confirm_password(e.target.value)} onBlur={(e) => disableEditMode(e)}  disabled type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   required />
                    <p onClick={() => enableEditMode("confirm_password")} className=" cursor-pointer hover:bg-yellow-50 border px-1 py-2 border-gray-300 rounded-r-lg block">
                        <svg className=" text-gray-700" width="24" stroke-width="1.5" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor"> <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M8 10H16M8 6H12M8 14H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> </svg>
                    </p>
                </div>
            </div>  
            
        </div>
        {/* Personal info */}
        <div className="border border-1 rounded-md border-gray-200 px-7 pb-7">

            <p className=" py-6 font-bold text-lg text-gray-500">General Details</p>
            <div className="mb-5">
                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                <div className="flex">
                    <input value={firstname} onChange={(e) => set_firstname(e.target.value)} onBlur={(e) => disableEditMode(e)}  disabled type="text" id="firstname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   required />
                    {/* <input className=" px-3 text-sm bg-yellow-400 font-semibold cursor-pointer text-white rounded-r-lg" type="button" value="EDIT" /> */}
                    <p onClick={() => enableEditMode("firstname")} className=" cursor-pointer hover:bg-yellow-50 border px-1 py-2 border-gray-300 rounded-r-lg block">
                        <svg className=" text-gray-700" width="24" stroke-width="1.5" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor"> <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M8 10H16M8 6H12M8 14H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> </svg>
                    </p>
                </div>
            </div>
            <div className="mb-5">
                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                <div className="flex">
                    <input value={lastname} onChange={(e) => set_lastname(e.target.value)}  onBlur={(e) => disableEditMode(e)}  disabled type="text" id="lastname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   required />
                    {/* <input className=" px-3 text-sm bg-yellow-400 font-semibold cursor-pointer text-white rounded-r-lg" type="button" value="EDIT" /> */}
                    <p onClick={() => enableEditMode("lastname")} className=" cursor-pointer hover:bg-yellow-50 border px-1 py-2 border-gray-300 rounded-r-lg block">
                        <svg className=" text-gray-700" width="24" stroke-width="1.5" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor"> <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M8 10H16M8 6H12M8 14H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> </svg>
                    </p>
                </div>
            </div>
            <div className="mb-5">
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                {/* <div className="flex">
                    <input disabled type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                    <p className=" cursor-pointer hover:bg-yellow-50 border px-1 py-2 border-gray-300 rounded-r-lg block">
                        <svg className=" text-gray-700" width="24" stroke-width="1.5" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor"> <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M8 10H16M8 6H12M8 14H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> </svg>
                    </p>
                </div> */}

                {/* <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label> */}
            
                <select value={country_id} onChange={(e) => set_country_id(e.target.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {/* <option selected>Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option> */}
                    {countries.map(item => {
                        return <option value={item.id}>{item.country_name}</option>
                    })}
                </select>
            </div>

            
            <div className="mb-5">
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                <div className="flex text-gray-500">
                    <span className=" bg-yellow-50 p-2 border border-1 rounded-l-lg">{phone_code}</span>
                    <input value={phone} onChange={(e) => set_phone(e.target.value)} onBlur={(e) => disableEditMode(e)}  disabled type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                    <p onClick={() => enableEditMode("phone")} className=" cursor-pointer hover:bg-yellow-50 border px-1 py-2 border-gray-300 rounded-r-lg block">
                        <svg className=" text-gray-700" width="24" stroke-width="1.5" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor"> <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M8 10H16M8 6H12M8 14H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> </svg>
                    </p>
                </div>
            </div>
        </div>
       
    </div>
{/*     
    <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
    </div> 
    <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
    </div> 
    <div class="mb-6">
        <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
        <input type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
    </div> 
    <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
        </div>
        <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button> */}
</form>
</div>
</div>
}