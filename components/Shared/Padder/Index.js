import react, { useEffect, useState } from "react";

export default function Index(props){

    const [user_token, set_user_token] = useState(null) 

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        set_user_token(token)
    },[])

    // return user_token ?  props.children : <div className="pt-[6rem]">
    //     {props.children}
    // </div>
        return props.children 
}