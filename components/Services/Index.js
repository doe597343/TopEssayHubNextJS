import Header from './Header'
import Content from './Content'
import Faq from '../Faq/Index'

export default function Index(props) {

    return <>
        <Header data={props.data} />
        <Content data={props.data} />
        <Faq data={props.data} />
    </>
}