import {Link, NavLink} from "react-router-dom";
export default function Header() {
  return (
    <header className="flex py-5 px-15 justify-between items-center border-b border-gray-300 sticky top-0 w-full bg-white">
      <Link to="/" className="flex gap-2 items-center">
        <span className="bg-black text-white size-8 text-xl font-bold flex items-center justify-center rounded-lg">F</span>
        <span>Fintrack</span>
      </Link>
      <nav className="flex gap-4">
        <NavLink to="/" className={({isActive}) => (isActive ? "font-bold " : "")}>
          Home
        </NavLink>
        <NavLink to="/features" className={({isActive}) => (isActive ? "font-bold" : "")}>
          Features
        </NavLink>
        <NavLink to="/about" className={({isActive}) => (isActive ? "font-bold" : "")}>
          About
        </NavLink>
        <NavLink to="/contact" className={({isActive}) => (isActive ? "font-bold" : "")}>
          Contact
        </NavLink>
      </nav>
      <div className="flex gap-4 items-center">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup" className="bg-black text-white rounded-lg px-3 py-2">
          Sign Up
        </NavLink>
      </div>
    </header>
  );
}
