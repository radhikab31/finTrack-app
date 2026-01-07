import {Link} from "react-router-dom";
import {useFirebase} from "../context/firebase";
import {useState} from "react";
import {FaEyeSlash} from "react-icons/fa6";
import {FaEye} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase = useFirebase();
  const [showPassword, setShowPassword] = useState(false);
  // console.log(firebase);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await firebase.signInUser(email, password);
    // console.log(res);
    if (res) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const signInGoogle = async () => {
    const res = await firebase.createUserwithGoogle();
    // console.log(res);
    if (res) {
      navigate("/dashboard");
    }
  };
  return (
    <div className="flex flex-col items-center gap-4 w-1/2 border shadow border-gray-300 rounded-lg p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <span className="bg-black text-white size-12 flex text-2xl font-bold items-center justify-center rounded-lg">F</span>
      <h2 className="font-bold text-2xl">Welcome Back!</h2>
      <span className="text-gray-500">Enter your credentials to access your account</span>
      <div className="flex flex-col items-start gap-4 w-full">
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="border shadow border-gray-300 rounded-md p-2 w-full" placeholder="mx@example.com" />
        <label>Password </label>
        <div className="relative w-full">
          <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="border  shadow border-gray-300 rounded-md p-2 w-full" placeholder="password" />
          {showPassword ? <FaEyeSlash className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> : <FaEye className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:cursor-pointer" onClick={() => setShowPassword(!showPassword)} />}
        </div>
        <button onClick={handleLogin} className="w-full bg-black text-white py-2 rounded-md ">
          Login
        </button>
        <div className="flex items-center gap-4 w-full">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="text-gray-500">OR CONTINUE WITH</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>
        <button onClick={signInGoogle} className="flex gap-2 px-4 py-2 border shadow justify-center w-full border-gray-300 rounded-md items-center">
          <img src="./assets/google.png" className="size-6" alt="google" />
          <span>Google</span>
        </button>
        <div className="flex gap-2 w-full justify-center">
          <span>Don't have an account?</span>
          <Link to="/signup" className="font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
