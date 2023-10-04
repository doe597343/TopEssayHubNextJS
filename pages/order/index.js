import Order from '../../components/Order/Index'
import {apiHelper} from '../../helpers/ApiHelper'

export default function Index() {
  let default_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFjYWRlbWljX2xldmVsX2lkIjoxLCJwYXBlcl9pZCI6MSwic3ViamVjdF9pZCI6MSwidG9waWMiOiIiLCJwYXBlcl9pbnN0cnVjdGlvbnMiOiIiLCJzb3VyY2VzIjowLCJmb3JtYXRfaWQiOjEsInBhZ2VzIjoxLCJzcGFjaW5nIjoxLCJkZWFkbGluZV9pZCI6MSwid3JpdGVyX2NhdGVnb3J5X2lkIjoxLCJzbGlkZXMiOjAsInBsYWdpYXJpc21fcmVwb3J0IjowLCJhYnN0cmFjdF9wYWdlIjowLCJoaWdoX3ByaW9yaXR5IjowLCJ0b3RhbFByaWNlIjoxMH0sImlhdCI6MTY3NTQyNTMwN30.FHC5RbQrgC1WzjmJtlZZzK9mUmfFNbE4hkoIvL0zDPs"
  return (
    <>
        <Order order_token={default_token}/>
    
    </>
  )
}


export async function getStaticProps(context) {

  let page_name = 'order'
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