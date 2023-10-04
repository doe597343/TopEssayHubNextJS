export default function Index(props) {
    const {value, eventHandler, name, itemID} = props;
    const params = {
        name, value, itemID
    }

    let activeState = itemID == props.active_id ? 'bg-yellow-200' : 'bg-yellow-400'

    return <input type="button" id={itemID} className={`${activeState} cursor-pointer py-2 px-1 shadow-md w-full text-xs rounded-md`} onClick={(e) => eventHandler(params)} name={name} value={value} />
}