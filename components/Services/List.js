import Header from './Header'
import Faq from '../Faq/Index'
import Link from 'next/link'

export default function Index(props) {
    return <div>

        <Header data={props.data} />
       
        <div className="mt-10">

         <h2 className=' font-bold text-center text-4xl'>List of Services</h2>
  {/* <div className="justify-evenly text-lg text-gray-600 flex flex-wrap"> */}
  <div className="text-lg text-gray-600 grid grid-cols-2 md:grid-cols-4 md:px-20 px-5"> 
    
    {props.data.servicesList.map((service, index) => {
        return <div className="  mt-20 px-5" key={index}>
            <p className="mb-5 font-semibold text-2xl">{service.group}</p>
            <div>
                <ul className="space-y-3">
                {service.pages.map(page => {
                    return <li><Link href={page.link} className='hover:text-yellow-600'>{page.page_name}</Link></li>
                })}
                </ul>
            </div>
        </div>
    })}


  </div>
</div>


        <Faq data={props.data} />
    </div> 
}