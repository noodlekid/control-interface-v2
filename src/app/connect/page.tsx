import RosConnection from "../components/ROSConnection";
import Connect from "../components/Connect"
import { ToastContainer } from "react-toastify";

export default function ConnectPage() {
  return (
    <RosConnection>
      <ToastContainer/>
      <Connect/>
    </RosConnection>
  )
}