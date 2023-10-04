
import Link from "next/link";
import { useRouter } from "next/router";
import react, { useEffect, useState } from "react";
import {apiHelper} from '../../helpers/ApiHelper'




export default function Index(props) {

    const router = useRouter()
    
    const [new_password, set_new_password] = useState("")
    const [confirm_password, set_confirm_password] = useState("")
    const [OTP, setOTP] = useState("")
    const [first, set_first] = useState("")
    const [second, set_second] = useState("")
    const [third, set_third] = useState("")
    const [fourth, set_fourth] = useState("")
    const [fifth, set_fifth] = useState("")
    const [sixth, set_sixth] = useState("")
    const [reset_password_status, set_reset_password_status] = useState(false)
    const [email, set_email] = useState("")

    useEffect(() => {
        // const query = router.query;
        set_email(props.email)
    }, [])


    const reset_password = async () => {
        try {
            let formData = new FormData()
            formData.append('email', email);
            formData.append('otp', OTP);
            formData.append('new_password', new_password)
            formData.append('confirm_password', confirm_password)

            const res = await apiHelper('auth/reset-password', 'POST', formData);
         
            if(res.data.status){
                alert(res.data.message)
                set_reset_password_status(true)
            }else{
                alert(res.data.message)
            }
        } catch (error) {
            alert(error.response.data.message)
            console.log('auth/reset-password response == ', error)
        }


        
    }

    const forgot_password = async () => {
        let formData = new FormData()

        formData.append('email', email);
        const res = await apiHelper('auth/forgot-password', 'POST', formData);
        
        if(res.data.status){
            alert(res.data.message)
        }else{
            alert(res.data.message)
        }
    }

    const goBack = () => {
        set_reset_password_status(false)
        setOTP("")
        set_first("")
        set_second("")
        set_third("")
        set_fourth("")
        set_fifth("")
        set_sixth("")
    }

    const customKeyDown = (e) => {
        
        const inputs = document.querySelectorAll('#otp > *[id]');

        let prevElementID = ''
        let currentIndex = ''
        for (let index = 0; index < inputs.length; index++) {
            const element = inputs[index];
            currentIndex = index;
            if(element.id == e.target.id){
                break;
            }
            prevElementID = element.id;
        }

        if(e.key == "Backspace"){

            if (currentIndex !==0) {
                document.getElementById(prevElementID).focus()
            }
        }else if(currentIndex===inputs.length - 1 && e.target.value !=='' ){
            console.log('call api')
            let my_otp = first + second + third + fourth + fifth + sixth
            setOTP(my_otp)
            return true
        }else if( e.keyCode > 47 && e.keyCode < 58){
            inputs[currentIndex].value=e.key; 
            if(e.target.value.trim().length < 1){
                e.preventDefault()
            }
            if (currentIndex !==inputs.length - 1){
                inputs[currentIndex + 1].focus();
            } 
            e.preventDefault(); 
        }else if(e.keyCode> 64 && e.keyCode < 91){
           inputs[currentIndex].value=String.fromCharCode(e.keyCode);                    
            if (currentIndex !==inputs.length - 1) inputs[currentIndex + 1].focus(); 
            event.preventDefault(); 
        }
    }    

    return  <div class="h-screen bg-gray-50 py-20 px-3">
    <div class="container mx-auto">
        <div class="max-w-sm mx-auto md:max-w-lg">
            <div class="w-full">
                <div class=" bg-white h-74 py-4 shadow-lg border-gray-100 border rounded text-center">
                     
                      {!reset_password_status && OTP.length < 6 && <>
                        <h1 class="hidden text-2xl font-bold">OTP Verification</h1>
                      <div className="">
                        <div class="flex flex-col mt-4">
                            <span>Enter the OTP you received at</span>
                            <span class="font-bold">{email}</span>
                        </div>
                        
                        <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5">
                            <input onChange={(e) => set_first(e.target.value)} onKeyUp={(e) => customKeyDown(e)} class="m-2 border-gray-300 border h-10 w-10 text-center form-control rounded" type="text" id="first" value={first} maxlength="1" /> 
                            <input onChange={(e) => set_second(e.target.value)} onKeyUp={(e) => customKeyDown(e)} class="m-2 border-gray-300 border h-10 w-10 text-center form-control rounded" type="text" id="second" value={second} maxlength="1" /> 
                            <input onChange={(e) => set_third(e.target.value)} onKeyUp={(e) => customKeyDown(e)} class="m-2 border-gray-300 border h-10 w-10 text-center form-control rounded" type="text" id="third" value={third} maxlength="1" /> 
                            <input onChange={(e) => set_fourth(e.target.value)} onKeyUp={(e) => customKeyDown(e)} class="m-2 border-gray-300 border h-10 w-10 text-center form-control rounded" type="text" id="fourth" value={fourth} maxlength="1" />
                            <input onChange={(e) => set_fifth(e.target.value)} onKeyUp={(e) => customKeyDown(e)} class="m-2 border-gray-300 border h-10 w-10 text-center form-control rounded" type="text" id="fifth" value={fifth} maxlength="1" /> 
                            <input onChange={(e) => set_sixth(e.target.value)} onKeyUp={(e) => customKeyDown(e)} class="m-2 border-gray-300 border h-10 w-10 text-center form-control rounded" type="text" id="sixth" value={sixth} maxlength="1" />
                        </div>

                        <div className="flex justify-evenly mb-2">
                            <div class="flex justify-center text-center mt-5">
                                <a onClick={() => props.set_step(1)} class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span class="font-bold">Go back</span><i class='bx bx-caret-right ml-1'></i></a>
                            </div>                       
                            <div class="flex justify-center text-center mt-5">
                                <a onClick={() => forgot_password()} class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span class="font-bold">Resend OTP</span><i class='bx bx-caret-right ml-1'></i></a>
                            </div>
                        </div>
                      </div> </>}:

                    {!reset_password_status && OTP.length == 6 && <>
                      <h1 class="text-2xl font-bold">Change Password</h1>
                      <div className=" px-10 py-4 mt-10">
                        <div className="grid grid-cols-3 gap-2 items-center pl-4 pr-10 mb-2">
                                <span className="text-right text-sm">New password</span>
                                <input onChange={(e) => set_new_password(e.target.value)} class=" w-full px-2 col-span-2 border-gray-300 border h-10 form-control rounded" name="password" type="password" value={new_password} /> 

                        </div>
                        {/* <div className="hidden  grid-cols-3 gap-2 items-center pl-4 pr-10 mb-2">
                                <span className=" text-right text-sm">Confirm password</span>
                                <input onChange={(e) => set_confirm_password(e.target.value)} class="w-full px-2 col-span-2 border-gray-300 border h-10 form-control rounded" name="password" type="password" value={confirm_password} /> 
                        </div> */}
                        <div className="grid grid-cols-3 gap-2 items-center pl-4 pr-10 mb-2">
                                <span className=" text-right text-sm">Confirm password</span>
                                <input onChange={(e) => set_confirm_password(e.target.value)} class="w-full px-2 col-span-2 border-gray-300 border h-10 form-control rounded" name="password" type="password" value={confirm_password} /> 
                        </div>
                        <div className="flex px-10 justify-between mb-2">
                            <div class="flex justify-center text-center mt-5">
                              <a onClick={() => goBack()} class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span class="font-bold">Go back</span><i class='bx bx-caret-right ml-1'></i></a>
                            </div>        
                            <div class="flex justify-center text-center mt-5">
                                <a onClick={() => reset_password()} class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span class="font-bold">Update password</span><i class='bx bx-caret-right ml-1'></i></a>
                            </div>
                        </div>
                      </div>
                      </>}

                      {reset_password_status && <>
                        <h1 class="hidden text-2xl font-bold">OTP Verification</h1>
                        <div className="">
                                            <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                    <path fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                            <div class="flex flex-col mt-4">
                                <span className=" text-green-500  text-2xl">You've successfully reset your Password</span>
                            </div>
                            <div className="py-10 text-center">
                                <Link href="/login" className="px-12 bg-[#eda110] text-white font-semibold py-3">
                                    GO BACK 
                                </Link>
                            </div>
                        </div>
                      </>}
                </div>
            </div>
        </div>
    </div>
</div>
}