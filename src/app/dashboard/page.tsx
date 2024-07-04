'use client'

import { ToastContainer } from "react-toastify";
import RosConnection from "../components/ROSConnection";
import Subscribe from "../components/TestSubscriber";
import ROSContext from "../contexts/ROSContext";


function Dashboard() {
    return (
    <>
        <ToastContainer/>
        <Subscribe/>
    </>
    )
}

export default Dashboard;
