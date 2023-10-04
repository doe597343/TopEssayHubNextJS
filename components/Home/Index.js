import dynamic from "next/dynamic";
// import Calculator from "./Calculator/Index";
// import Tagline from "./Tagline/index";
// import WhatWeOffer from "./WhatWeOffer/Index";
// import WhyChooseUs from "./WhyChooseUs/Index";
// import Faq from '../Faq/Index'

const Calculator = dynamic(() => import("./Calculator/Index"));
const Tagline = dynamic(() => import("./Tagline/index"));
const WhatWeOffer = dynamic(() => import("./WhatWeOffer/Index"));
const WhyChooseUs = dynamic(() => import( "./WhyChooseUs/Index"));
const Faq = dynamic(() => import('../Faq/Index'));
import { Organization, Website } from "../../constants/Schema";
import Script from 'next/script'

export default function Home() {


    // bg-gradient-to-b from-gray-50 to-gray-100 pb-4
    return <div className="md:px-10">
        <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: Organization }} strategy="beforeInteractive" />
        <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: Website }} strategy="beforeInteractive" />
        <Tagline />
        <Calculator />
        <WhyChooseUs />
        <WhatWeOffer />
        <Faq />
    </div>
}