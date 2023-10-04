import react from "react";


export default function Index(props){
    // md:flex items-center md:space-x-2 md:p-0 p-3
    // return <div className="mb-5 space-y-2 items-center flex">
    //     {props.children}
    // </div>

    return <div className="mb-5 items-center md:grid md:grid-cols-5 md:gap-3 md:space-x-2 md:space-y-0 space-y-2">
        {props.children}
    </div>
}