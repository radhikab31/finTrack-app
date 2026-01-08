import DashHeader from "./DashHeader";
import {useFirebase} from "../context/firebase";
import {Overview} from "./Overview";

export default function Dashboard() {
  const {userData, loading} = useFirebase(); // Destructure loading

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  console.log(userData);
  return (
    <div>
      <DashHeader />
      <Overview userData={userData} />
    </div>
  );
}
