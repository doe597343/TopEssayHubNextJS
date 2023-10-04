import Testimonials from '../components/Testimonials/Index'
import {apiHelper} from '../helpers/ApiHelper'

export default function Index() {
  return (
    <>
      <Testimonials />
    </>
  )
}



export async function getStaticProps(context) {

  let page_name = 'testimonials'
  const res = await apiHelper(`page/contents?page_name=${page_name}`, 'GET', null)
  let data = null;
  if(!res.data.status){
    return {
      notFound: true
    }
  }

  data = res.data.data;

  return {
    props: { data },
    revalidate: 10
  }
}