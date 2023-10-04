import react from "react";
import Table from '../../components/Shared/Table/Index'
import SideBar from '../../components/Shared/SideBar/Index'
import {ORDER_STATUS} from '../../constants/Item'

export default function Index(){
     return <SideBar>
        <Table title="In-Progress Orders"  order_status={ORDER_STATUS.IN_PROGRESS} />
    </SideBar>
   
}