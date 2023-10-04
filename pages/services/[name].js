import Services from '../../components/Services/Index'
import { apiHelper } from '../../helpers/ApiHelper'

export default function Index(props) {
  console.log('services props == ', props)
  return (
    <>
      <Services data={props.data} />
    </>
  )
}

export async function getStaticPaths() {

  const res = await apiHelper(`page/list`, 'GET', null)
  let names = res.data.data.services;

  names = names.map(name => {
    return {params: {name}}
  })

  return {
    paths: names,
    fallback: false,
  }
}

export async function getStaticProps(context) {

  let page_name = context.params.name;
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