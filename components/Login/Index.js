import react, { useEffect, useState } from "react";
import { apiHelper } from "../../helpers/ApiHelper";
import { useRouter } from 'next/router'
import Link from "next/link";


export default function Index(){
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error_msg, setErrorMsg] = useState("")

    const forgot_password = async () => {
        let formData = new FormData()

        formData.append('email', email);
        const res = await apiHelper('auth/forgot-password', 'POST', formData);
        
        if(res.data.status){
            alert(res.data.message)
           router.push({
            pathname: '/otp',
            query: { email: email }
            }, 
            undefined, { shallow: true }
            )
        }else{
            alert(res.data.message)
        }
    }

    const onSubmitHandler = () => {
         event.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        apiHelper('auth/signin', 'POST', formData)
       .then(res => {
        
           if(res.data.status == true){
                let userToken = res.data.data
                localStorage.setItem('userToken', userToken)
                // router.push("/order")
                window.location.href = process.env.NEXT_PUBLIC_BASE_URL + "/order"
           }else{
                setErrorMsg(res.data.message)
           }
       })
       .catch(err => {
           console.log(err)
       })
    }

    
    return <>
    
        <div className="absolute min-h-screen w-full bg-slate-100">
            <div className="m-auto mt-40 max-w-sm  bg-white p-4 shadow-md rounded-lg pb-9">
                <p className="text-center pt-2 pb-4 font-medium text-xl text-gray-700">Login to your account</p>
                <form onSubmit={onSubmitHandler}>
                    <div className="p-2">
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border shadow-sm border-slate-400 p-3 bg-slate-50" placeholder="Your email"/>
                    </div>
                    <div className="p-2">
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-md border shadow-sm border-slate-400 p-3 bg-slate-50" placeholder="Your password"/>
                    </div>
                    {error_msg && <small className=" text-red-400 p-3">Error: {error_msg}</small>}
                    <div className="p-2">
                        {/* <input type="submit" onClick={() => login()} className="w-full rounded-md bg-yellow-300 py-2 font-medium border-gray-400 border text-gray-600 shadow-md cursor-pointer" value="Login" /> */}
                          <input type="submit" className="w-full rounded-md bg-yellow-300 py-2 font-medium border-gray-400 border text-gray-600 shadow-md cursor-pointer" value="Login" />
                    </div>
                </form>
                    <div className="p-2">
                        <Link href="/signup" className="block text-center w-full rounded-md bg-yellow-300 py-2 font-medium border-gray-400 border text-gray-600 shadow-md cursor-pointer">Signup</Link> 
                    </div>
                    <div className="p-2">
                        {/* <span onClick={() => forgot_password()} href="" className="block text-center text-blue-400 w-full rounded-md py-2 font-medium cursor-pointer">Forgot password</span>  */}
                        <a href="/otp" className="block text-center text-blue-400 w-full rounded-md py-2 font-medium cursor-pointer">Forgot password</a>
                    </div>
            </div>
        </div>
    </>
}