import DashHeader from "./DashHeader";
import {useFirebase} from "../context/firebase";

export default function Dashboard() {
  const firebase = useFirebase();
  console.log("check the userData", firebase.userData);
  return (
    <div>
      <DashHeader />
    </div>
  );
}
