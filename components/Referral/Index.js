import react, { useEffect, useState } from "react";

import jwt from 'jsonwebtoken';


export default function Index() {

    const [referral_code, set_referral_code] = useState("")

    const copyText = (id) => {
        // Get the text field
        var element = document.getElementById(id);

        console.log("element", element)
        // Select the text field
        // element.select();
        // element.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(element.value);
    }

    useEffect(() => {
      let user_token = localStorage.getItem('userToken')
      let userJSON = jwt.decode(user_token).data;

      let {referral_code} = userJSON;

      set_referral_code(referral_code)


    }, [])

    return <div className="md:p-7 bg-gray-50"> 
    <div class=" bg-white shadow-lg  rounded-lg">
  <div class=" text-gray-700 text-center p-6">
      <h1 class=" font-bold text-4xl mb-3">By referring a friend today, you have the opportunity to earn up to $200.</h1>
      <p>You can earn up to $200 for each friend you refer by sharing either your coupon code or referral link.</p>
  </div>
  <div class="grid grid-cols-3 gap-3 mt-7 mb-2 items-center">
    <div class="text-right">
      Referral Code
    </div>
    <div class="">
      <input disabled value={referral_code} id="referral_code" type="text" class=" border text-center text-sm bg-gray-50 px-2 py-2 w-full" />
    </div>
    <div>
      <span onClick={() => copyText("referral_code")}  class="block w-5 cursor-pointer">
         <img className="w-24" src={`${process.env.NEXT_PUBLIC_BASE_URL}/copy.png`}/>
      </span>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-3 mb-3 items-center">
    <div class="text-right">
      Referral Link
    </div>
    <div class="">
      <input disabled id="referral_link" value={`${process.env.NEXT_PUBLIC_BASE_URL}/order?discount_code=${referral_code}`} type="text" class=" text-sm border bg-gray-50 px-2 py-2 w-full" />
    </div>
    <div>
      <span onClick={() => copyText("referral_link")} class="block w-5 cursor-pointer">
         <img className="w-24" src={`${process.env.NEXT_PUBLIC_BASE_URL}/copy.png`}/>
      </span>
    </div>
  </div>
  <div class="md:flex md:space-y-0 space-y-4 justify-center md:space-x-10 mt-20 p-10 text-center text-gray-600">
    {/* <div class="md:w-56 md:h-56 bg-white shadow-md  border border-1 text-center rounded-3xl font-bold mb-7"> */}
    <div className=" shadow-md p-5 flex-1 border">
      {/* <p className=" font-semibold mb-2">STEP 1</p>  */}
      <img className=" mb-4 mx-auto" src={`${process.env.NEXT_PUBLIC_BASE_URL}/referral-step1.png`}/>
      <p>Those who use your coupon code or click on your link will receive a 15% discount on their initial purchase.</p>
    </div>
    {/* <div class="md:w-56 md:h-56 bg-white shadow-md  border border-1 text-center rounded-3xl font-bold mb-7"> */}
    <div className=" shadow-md p-5 flex-1 border">
      {/* <p className=" font-semibold mb-2">STEP 2</p>  */}
      <img className=" mb-4 mx-auto" src={`${process.env.NEXT_PUBLIC_BASE_URL}/referral-step2.png`}/>
      <p>There is no minimum purchase required to receive a credit of 20% of the total amount spent.</p>
    </div>
    {/* <div class="md:w-56 md:h-56 bg-white shadow-md  border border-1 text-center rounded-3xl font-bold mb-7"> */}
    <div className=" shadow-md p-5 flex-1 border">
     {/* <p className=" font-semibold mb-2">STEP 3</p>  */}
      <img className=" mb-4 mx-auto" src={`${process.env.NEXT_PUBLIC_BASE_URL}/referral-step3.png`}/>
      <p>Suppose you refer a friend who spends $1000 on their order; in that case, you'll receive a credit of $200. Just imagine the possibilities if you refer more people!</p>
    </div>
  </div>
</div>
</div>
}