import {Link, NavLink} from "react-router-dom";
import {useFirebase} from "../context/firebase";
import {useNavigate} from "react-router-dom";

export default function DashHeader() {
  const {logoutuser} = useFirebase();
  const navigate = useNavigate();

  const logout = () => {
    logoutuser();
    navigate("/");
  };
  return (
    <header className="flex py-5 px-15 justify-between items-center border-b border-gray-300 sticky top-0 w-full bg-white">
      <Link to="/" className="flex gap-2 items-center">
        <span className="bg-black text-white size-8 text-xl font-bold flex items-center justify-center rounded-lg">F</span>
        <span>Fintrack</span>
      </Link>

      <div className="flex gap-4 items-center">
        <NavLink to="/profile">Profile</NavLink>
        <button onClick={logout} className="bg-black text-white rounded-lg px-3 py-2 hover:bg-gray-800 hover:cursor-pointer">
          Logout
        </button>
      </div>
    </header>
  );
}
