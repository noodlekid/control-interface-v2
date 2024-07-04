'use client'

import RosConnection from "../components/ROSConnection";
import Subscribe from "../components/TestSubscriber";
import ROSContext from "../contexts/ROSContext";


function Dashboard() {
    return (
    <RosConnection>
        <Subscribe/>
    </RosConnection>
    )
}

export default Dashboard;
