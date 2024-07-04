'ues client'

import Connect from "../components/Connect";
import { ToastContainer } from "react-toastify";
import RosConnect from "../components/ROSConnection";

export default function ConnectPage() {
  return (
    <>
        <RosConnect></RosConnect>
        <ToastContainer />
        <Connect />
    </>
  );
}
