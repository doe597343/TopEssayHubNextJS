import React from "react";

export default function WhyChooseUs(){
    return <section className="text-[#333333] p-4">
    <h2 className="text-center font-semibold text-xl mt-7">WHY CHOOSE US</h2>
    <div className="md:grid grid-cols-3">
        <div className="text-center mt-7">
            <img src="./whyus_1.svg" alt="why choose us item logo" className="mx-auto my-4 p-3 shadow-lg h-28 w-28  border-2 rounded-full" />
            <h2 className="font-semibold">UNMATCHED QUALITY</h2>
            <p className="pt-1">
                We stand behind the quality of our services every time, no matter the subject or difficulty.
            </p>
        </div>
        <div className="text-center mt-7">
            <img src="./whyus_2.svg" alt="why choose us item logo" className="mx-auto my-4 p-3 shadow-lg h-28 w-28  border-2 rounded-full"/>
            <h2 className="font-semibold">ORIGINAL WRITING</h2>
            <p className="pt-1">
                Every word you read in the paper we’ve written is original, every thought is unique.
            </p>
        </div>
        <div className="text-center mt-7">
            <img src="./whyus_3.svg" alt="why choose us item logo" className="mx-auto my-4 p-3 shadow-lg h-28 w-28  border-2 rounded-full"/>
            <h2 className="font-semibold">ALWAYS ON TIME</h2>
            <p className="pt-1">
                Time is the most important thing these days and we understand that you turned to us to save yours.
            </p>
        </div>
        <div className="text-center mt-7">
            <img src="./whyus_4.svg" alt="why choose us item logo" className="mx-auto my-4 p-3 shadow-lg h-28 w-28  border-2 rounded-full"/>
            <h2 className="font-semibold">CONFIDENTIALITY</h2>
            <p className="pt-1">
                We will protect your personal information like a vault in Fort Knox. No personal information will ever leak, unless you say so.
            </p>
        </div>
        <div className="text-center mt-7">
            <img src="./whyus_5.svg" alt="why choose us item logo" className="mx-auto my-4 p-3 shadow-lg h-28 w-28  border-2 rounded-full"/>
            <h2 className="font-semibold">FREE REVISIONS</h2>
            <p className="pt-1">
                Not only do we write quality academic works, we also offer absolutely free revisions so that you can correct anything you need.            
            </p>
        </div>
        <div className="text-center mt-7">
            <img src="./support.svg" alt="why choose us item logo" className="mx-auto my-4 p-3 shadow-lg h-28 w-28  border-2 rounded-full"/>
            <h2 className="font-semibold">SUPPORT 24/7</h2>
            <p className="pt-1">     
                We're always there for you, working nonstop to help you in your hour of academic need.   
            </p>
        </div>
    </div>
</section>
}