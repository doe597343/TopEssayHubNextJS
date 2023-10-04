export default function Index(props) {
    console.log('content props == ', props)
    
    return <div class="p-5  md:space-y-0 space-y-5 md:grid grid-cols-2 bg-gray-50 text-gray-700">
        {
            props.data.sub_contents.map(sub_content => {
                return <div class="p-10 border rounded-xl bg-white shadow m-3">
                    <h2 class=" font-semibold text-2xl mb-5">
                        {/* Discover our EssayPro custom dissertation writing service */}
                        {sub_content.header}
                    </h2>
                    <p>
                        {sub_content.content}
                        {/* With our essay writing service, you get the best. And indeed, we are the best custom dissertation writing service out there. Everything produced by our writing staff is 100% original, confidential, and written from the ground up. You get unlimited edits, 24/7 support, on-time delivery, and affordable prices. Other phd dissertation writing services in this industry are notorious for hiring just about anybody solely to churn out generic essays and pocket your cash. Unlike the competitors who give this dissertation help industry a bad name, we value our reputation deeply. As a result, we strive for absolute professionalism in our work and your results. There are real advantages to working with us: Pricing. EssayPro has found a balance between high quality and low rates. You will be very surprised to see the quality you can get on a budget when you order our services. We understand the value of your time, and we’re confident in our reputation that your satisfaction will spread the word about our quality. */}
                    </p>
                </div>
            })
        }
    </div>
}