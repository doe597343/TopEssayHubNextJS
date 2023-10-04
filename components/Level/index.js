import react, { useEffect, useState } from "react";
import { apiHelper } from "../../helpers/ApiHelper";



export default function Index() {

    const [level, set_level] = useState(null);

    useEffect(() => {
        getLevel()
    }, [])

    
    const getLevel = async () => {
        let user_token = localStorage.getItem("userToken");
        let headers = {Authorization: user_token}
        let res = await apiHelper("user/level", "GET", null, headers)
        if(res.data.status){
            set_level(res.data.data)
        }
    }


    return <div class="pt-10 text-gray-500">
        <div class="mx-auto w-4/5 bg-white shadow-lg rounded-md py-24 px-12">
            <h1 class=" text-center mb-5 font-bold text-4xl">Life-Time Discount</h1>
            
            <p class="text-center">Get Cash Back, VIP support, Best writers, Free Plagiarism Report & more…Terms of use</p>

            <div class="md:flex justify-between md:space-y-0 space-y-12 mt-6">
                <div className={level && level.id == 1 ? `border border-1 rounded-lg shadow-yellow-100 shadow-lg px-2 pb-2 pt-3`: ''}>
                    <img class="mx-auto w-24" src="./trophy-bronze.png" />
                    <p class="mt-2 font-extrabold text-center">Bronze</p>
                </div>
                <div className={level && level.id == 2 ? `border border-1 rounded-lg shadow-yellow-100 shadow-lg px-2 pb-2 pt-3`: ''}>
                    <img class="mx-auto w-24" src="./trophy-silver.png" />
                    <p class="mt-2 font-extrabold text-center">Silver</p>
                </div>
                <div className={level && level.id == 3 ? `border border-1 rounded-lg shadow-yellow-100 shadow-lg px-2 pb-2 pt-3`: ''}>
                    <img class="mx-auto w-24" src="./trophy-gold.png" />
                    <p class="mt-2 font-extrabold text-center">Gold</p>
                </div>
                <div className={level && level.id == 4 ? `border border-1 rounded-lg shadow-yellow-100 shadow-lg px-2 pb-2 pt-3`: ''}>
                    <img class="mx-auto w-24" src="./trophy-diamond.png" />
                    <p class="mt-2 font-extrabold text-center">Diamond</p>
                </div>
            </div>
            <p class=" mx-auto mt-8 text-center font-semibold">
                {level && level.id ?  <>
                    <p>You now reach the <span className=" text-yellow-500">{level.level_name}</span> membership. Congratulations and enjoy the advantages of our <span className=" text-yellow-500">{level.level_name}</span> members.</p>
                    <p><span className=" text-yellow-500">{level.remaining}</span> remaining to reach the {level.next_level_name} level</p>
                </>
                : <>You haven't reach yet any level.</>}
            </p>
        </div>
    </div>

}