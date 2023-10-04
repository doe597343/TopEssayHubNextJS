
import Link from "next/link";
import { useRouter } from "next/router";
import react, { useEffect, useState } from "react";
import {apiHelper} from '../../helpers/ApiHelper'

export default function Index(props) {

    const router = useRouter()


    const forgot_password = async () => {
        let formData = new FormData()

        formData.append('email', props.email);
        const res = await apiHelper('auth/forgot-password', 'POST', formData);
        
        if(res.data.status){
        //     alert(res.data.message)
        //    router.push({
        //     pathname: '/otp',
        //     query: { email: email }
        //     }, 
        //     undefined, { shallow: true }
        //     )
            props.set_step(2)
        }else{
            alert(res.data.message)
        }
    }

    return  <div class="h-screen bg-gray-50 py-10 px-3 md:pt-32">
    <div class="container mx-auto">
        <div class="max-w-sm mx-auto md:max-w-lg">
            <div class="w-full">
                <div class=" bg-white h-74 py-2 shadow-lg border-gray-100 border rounded">
                      
                      <div className=" px-10 py-4 ">
                        <h1 class="text-md font-bold mb-3 text-center">OTP Verification</h1>
                        <div className="items-center mb-2">
                                {/* <span className=" text-right text-sm">Email</span> */}
                                <input onChange={(e) => props.set_email(e.target.value)}  class="w-full p-2 text-center border-gray-300 border h-10 form-control rounded" placeholder="Enter your email..." name="email" type="email" value={props.email} /> 
                        </div>
                        <div className="flex px-10 justify-between">
                            <div class="flex justify-center text-center mt-5">
                              <a href="/login" class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span class="font-bold">Go back</span><i class='bx bx-caret-right ml-1'></i></a>
                            </div>        
                            <div class="flex justify-center text-center mt-5">
                                <a onClick={() => forgot_password()} class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span class="font-bold">Send OTP</span><i class='bx bx-caret-right ml-1'></i></a>
                            </div>
                        </div>
                      </div>
                </div>
            </div>
        </div>
    </div>
</div>
}