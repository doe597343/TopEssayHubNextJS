import Order from '../../components/Order/Index'
import Nav from '../../components/Nav/Index'
import SideBar from '../../components/Shared/SideBar/Index'

export default function Index(props) {
  return (
    <>
        <Order order_id={props.order_id} order_token={props.order_token}/>
    </>
  )
}


export async function getServerSideProps(context) {
          
  let default_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im9yZGVyX2lkIjoxNywiYWNhZGVtaWNfbGV2ZWxfaWQiOjEsInBhcGVyX2lkIjoxLCJzdWJqZWN0X2lkIjoxLCJ0b3BpYyI6IldyaXRlcidzIENob2ljZSIsInBhcGVyX2luc3RydWN0aW9ucyI6InJycmVyIHIgciByIHIgciByIiwic291cmNlcyI6MCwiZm9ybWF0X2lkIjoxLCJwYWdlcyI6MSwic3BhY2luZyI6MSwiZGVhZGxpbmVfaWQiOjEsIndyaXRlcl9jYXRlZ29yeV9pZCI6MSwic2xpZGVzIjo1LCJwbGFnaWFyaXNtX3JlcG9ydCI6MCwiYWJzdHJhY3RfcGFnZSI6MCwiaGlnaF9wcmlvcml0eSI6MCwidG90YWxfcHJpY2UiOjM1LCJjb3Vwb25faWQiOjAsImNvdXBvbl9kaXNjb3VudCI6MCwiY3VzdG9tZXJfZmlsZXMiOltdfSwiaWF0IjoxNjc4NjcwODk4fQ.fEtWCzSuCOnE2p7i1iXBLBG10cptUOLuLuba1XTUEBA"

  return {
    props: {
        order_id: context.params.order_id,
        order_token: default_token 
    }, 
  }
}