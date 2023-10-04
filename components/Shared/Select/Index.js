import react from "react";

export default function Index(props) {

    const {list, selectedIndex, targetKey, eventHandler} = props;

    return <select id="countries" className=" bg-gray-100 border  text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name={props.name} onChange={(e) => props.eventHandler(e)}>
    {props.list.map(item => {
         if(item.id == props.selectedIndex) {
            return <option key={item.id} value={item.id} selected>{item[props.targetKey]}</option>
         }else{
            return <option key={item.id} value={item.id}>{item[props.targetKey]}</option>
         }
    })}
     </select>
}