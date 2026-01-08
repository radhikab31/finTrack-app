import {Link} from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-gray-300 py-15 px-15 flex flex-col gap-4">
      <div className="flex items-start justify-evenly w-full">
        <div className="flex flex-col w-[25%] items-start gap-2">
          <div className="flex gap-2 items-center justify-center">
            <span className="bg-black text-white size-10 text-xl font-bold flex items-center justify-center rounded-lg">F</span>
            <span className="text-2xl font-bold">FinTrack</span>
          </div>
          <span>Empowering individuals to take control of their financial destiny through simple, effective tracking.</span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-bold">PRODUCT</span>
          <div className="flex flex-col">
            <Link to="/features">Features</Link>
            <span>Pricing</span>
            <span>Help Center</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-bold">COMPANY</span>
          <div className="flex flex-col">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <span>Policies</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-bold">LEGAL</span>
          <div className="flex flex-col">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-500 border-t-2 border-gray-200 pt-10 mt-5">© 2025 FinTrack Inc. All rights reserved.</p>
    </footer>
  );
}
