import ContactUs from '../components/ContactUs/Index'
import {apiHelper} from '../helpers/ApiHelper'

export default function Index() {
  return (
    <>
      <ContactUs />
    </>
  )
}


export async function getStaticProps(context) {

  let page_name = 'contact-us'
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