import List from '../../components/Services/List'
import {apiHelper} from '../../helpers/ApiHelper'

export default function Index(props) {
    console.log('services list prop == ', props);
  return (
    <>
      <List data={props.data} />
    </>
  )
}



export async function getStaticProps(context) {

  let page_name = 'services'
  const res = await apiHelper(`page/contents?page_name=${page_name}`, 'GET', null)
  let data = null;
  if(!res.data.status){
    return {
      notFound: true
    }
  }
  data = res.data.data;

  const res2 = await apiHelper(`page/services`, 'GET', null)
  let services = res2.data.data;
  data.servicesList = services;


  return {
    props: { data },
    revalidate: 10
  }
}