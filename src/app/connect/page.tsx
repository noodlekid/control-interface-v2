import RosConnection from "../components/RosConnection";
import Connect from "../components/Connect"
import { ToastContainer } from "react-toastify";
import GNSSFix from "../components/GNSSFix";

export default function ConnectPage() {
  return (
    <RosConnection>
      <ToastContainer/>
      <Connect/>
      <GNSSFix/>
    </RosConnection>
  )
}