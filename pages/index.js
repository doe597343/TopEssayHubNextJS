import Home from '../components/Home/Index'
import {apiHelper} from '../helpers/ApiHelper'

export default function Index() {
  return (
    <>
      <Home />
    </>
  )
}


export async function getStaticProps(context) {

  let page_name = 'index'
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