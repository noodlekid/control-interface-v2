'ues client'

import Connect from "../components/Connect";
import RosConnect from "../components/ROSConnection";

export default function ConnectPage() {
  return (
    <>
        <RosConnect/>
        <Connect />
    </>
  );
}
