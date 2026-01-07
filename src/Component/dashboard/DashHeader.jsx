import {Link, NavLink} from "react-router-dom";
import {useFirebase} from "../context/firebase";
import {useNavigate} from "react-router-dom";

// import {useFirebase} from "../context/firebase";s

export default function DashHeader() {
  // const {logoutuser} = useFirebase();
  const firebase = useFirebase();
  const navigate = useNavigate();

  const logout = () => {
    firebase.logoutuser();
    navigate("/");
  };

  const user = firebase.user;
  // console.log("check the current user ddetails", firebase, firebase.user);
  return (
    <header className="flex py-5 px-15 justify-between items-center border-b border-gray-300 sticky top-0 w-full bg-white">
      <Link to="/" className="flex gap-2 items-center">
        <span className="bg-black text-white size-8 text-xl font-bold flex items-center justify-center rounded-lg">F</span>
        <span>Fintrack</span>
      </Link>

      <div className="flex gap-4 items-center">
        <span>Welcome {user?.displayName}!</span>
        <button onClick={logout} className="bg-black text-white rounded-lg px-3 py-2 hover:bg-gray-800 hover:cursor-pointer">
          Logout
        </button>
      </div>
    </header>
  );
}
