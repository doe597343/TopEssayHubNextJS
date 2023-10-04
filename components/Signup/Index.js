import React, { useEffect, useState } from "react";
import { apiHelper } from "../../helpers/ApiHelper";



export default function Index() {

    const [countries, setCountries] = useState([])

    const [firstname, set_first_name] = useState("") 
    const [lastname, set_last_name] = useState("") 
    const [email, set_email] = useState("") 
    const [password, set_password] = useState("") 
    const [confirm_password, set_confirm_password] = useState("") 
    const [country_id, set_country_id] = useState(null) 
    const [phone, set_phone] = useState(null) 

    const [dial_code, set_dial_code] = useState("")

    useEffect(() => {
        getCountries()
    }, [])

    useEffect(()=> {
        let country = countries.filter(item => {return item.id == country_id})[0]

        if(country){
            let phonecode = '+' + country.phonecode;
            set_dial_code(phonecode)
        }
    }, [country_id])




    const getCountries = () => {
        apiHelper('calculator/countries', 'GET', null)
       .then(res => {
           if(res.data.status){
                let countries = res.data.data
                setCountries(countries)
           }
       })
       .catch(err => {
           console.log(err)
       })
    }

    const signup = () => {

        let formData = new FormData();

        formData.append('firstname', firstname)
        formData.append('lastname', lastname)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirm_password', confirm_password)
        formData.append('country_id', country_id)
        formData.append('phone', phone)

        apiHelper('auth/signup', 'POST', formData)
       .then(res => {
            alert(res.data.message)
           if(res.data.status){
                window.location.href = "/login"
           }
       })
       .catch(err => {
           console.log(err)
       })
    }

    return <>
       
        <div className="flex justify-evenly items-center bg-slate-100 md:px-20 pt-[6rem] pb-[2rem]">
            <div className="md:block hidden w-1/2 ">
                <img src="https://www.meisternote.com/pages/wp-content/uploads/sites/5/2022/12/MN-Internal-Documentation_Hero-2.png" className=" w-96 mx-auto" />
                <h1 className=" font-bold text-3xl text-center p-3 mt-3">UNMATCHED QUALITY</h1>
                <p className="font-light text-lg text-gray-600 text-center">
                    We stand behind the quality of our <br /> services every time, no matter the subject or difficulty.
                </p>
            </div>
            <div className="md:w-1/2 w-full bg-white p-4 max-w-[450px] shadow-md rounded-lg pb-9">
                <p className="text-center pt-2 pb-4 font-medium text-2xl text-gray-700">Create your account</p>
                <div>
                <div className="p-2">
                    <input onChange={e => set_first_name((e.target.value))} name="firstname" type="text" className="w-full rounded-md border shadow-sm border-slate-400 p-3 bg-slate-50" placeholder="First name"/>
                </div>
                <div className="p-2">
                    <input onChange={e => set_last_name(e.target.value)} name="lastname" type="text" className="w-full rounded-md border shadow-sm border-slate-400 p-3 bg-slate-50" placeholder="Last name"/>
                </div>
                <div className="p-2">
                    <input onChange={e => set_email(e.target.value)} name="email" type="text" className="w-full rounded-md border shadow-sm border-slate-400 p-3 bg-slate-50" placeholder="Your email"/>
                </div>
                <div className="p-2">
                    <input onChange={e => set_password(e.target.value)} name="password" type="password" className="w-full rounded-md border shadow-sm border-slate-400 p-3 bg-slate-50" placeholder="Your password"/>
                </div>
                <div className="p-2">
                    <input onChange={e => set_confirm_password(e.target.value)} name="confirm_password" type="password" className="w-full rounded-md border shadow-sm border-slate-400 p-3 bg-slate-50" placeholder="Confirm password"/>
                </div>
                <div className="flex p-2">
                    <select id="countries" onChange={e => set_country_id(e.target.value)} name="country_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-3">
                    <option selected>Choose a country</option>
                    {countries.map(c => {
                        return <option index={c.id} value={c.id}>{c.country_name}</option>
                    })}
                    </select>
                </div>
                <div className="flex p-2">
                    <input name="phone" type="text" value={dial_code} className="w-16 text-right  border-l border-t border-b border-slate-400 p-2 text-gray-500" disabled />
                    <div className="w-full">
                    <input type="tel" onChange={e => set_phone(e.target.value)} name="phone" className="w-full border border-slate-400 p-3" placeholder="Phone"/>
                    </div>
                </div>
                <div className="p-2">
                    <input type="button" onClick={() => signup()} className="w-full border-gray-400 border rounded-md bg-yellow-300 py-2 font-medium text-gray-600 shadow-md cursor-pointer" value="Signup" />
                </div>
                </div>
            </div>
        </div>
    </>
}