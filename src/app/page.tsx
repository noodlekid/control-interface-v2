import RosConnection from "./components/RosConnection";
import Connect from "./components/Connect"
import { ToastContainer } from "react-toastify";

export default function ConnectPage() {
  return (
    <RosConnection>
      <ToastContainer/>
      <Connect/>
    </RosConnection>
  )
}