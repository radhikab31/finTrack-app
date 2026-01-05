import {Link} from "react-router-dom";
import {useFirebase} from "../context/firebase";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const res = await firebase.createUser(firstName, lastName, email, password);
    console.log(res);

    if (res) {
      navigate("/dashboard");
    }
  };

  const signUpGoogle = async () => {
    const res = await firebase.createUserwithGoogle();
    firebase.storeData(`users/${res.user.uid}`, {name: `${res.user.displayName}`, email: res.user.email});
    console.log(res);
    if (res) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-1/2 border shadow border-gray-300 rounded-lg p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <span className="bg-black text-white size-12 flex text-2xl font-bold items-center justify-center rounded-lg">F</span>
      <h2 className="font-bold text-2xl">Create an Account</h2>
      <span className="text-gray-500">Enter your details to start tracking your finances</span>
      <div className="flex flex-wrap items-start gap-4 w-full">
        <div className="flex flex-col gap-2 w-[calc(50%-8px)]">
          <label>First Name</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="border shadow border-gray-300 rounded-md p-2" placeholder="First Name" />
        </div>
        <div className="flex flex-col gap-2 w-[calc(50%-8px)]">
          <label>Last Name</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="border shadow border-gray-300 rounded-md p-2" placeholder="Last Name" />
        </div>
        <label className="w-full">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="border shadow border-gray-300 rounded-md p-2 w-full" placeholder="mx@example.com" />
        <label className="w-full">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="border shadow border-gray-300 rounded-md p-2 w-full" placeholder="password" />
        <button onClick={handleSignUp} className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 hover:cursor-pointer">
          Create account
        </button>
        <div className="flex items-center gap-4 w-full">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="text-gray-500">OR SIGN UP WITH</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>
        <button onClick={signUpGoogle} className="flex gap-2 px-4 py-2 border shadow justify-center w-full border-gray-300 rounded-md items-center hover:cursor-pointer">
          <img src="./assets/google.png" className="size-6" alt="google" />
          <span>Google</span>
        </button>
        <div className="flex gap-2 w-full justify-center">
          <span>Already have an account?</span>
          <Link to="/login" className="font-semibold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
