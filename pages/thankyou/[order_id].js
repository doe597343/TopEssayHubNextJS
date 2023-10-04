import react from "react";
import Thankyou from '../../components/Thankyou/Index'

export default function Index(props){
    return <Thankyou order_id={props.order_id}/>
}

export async function getServerSideProps(context) {

    const order_id = context.params.order_id;
  return {
    props: {
        order_id
    }, // will be passed to the page component as props
  }
}