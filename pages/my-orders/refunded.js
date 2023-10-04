import react from "react";
import Table from '../../components/Shared/Table/Index'
import SideBar from '../../components/Shared/SideBar/Index'
import {ORDER_STATUS} from '../../constants/Item'

export default function Index(){
     return <SideBar>
        <Table title="Refunded Orders"  order_status={ORDER_STATUS.REFUMDED} />
    </SideBar>
   
}