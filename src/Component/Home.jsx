import React from "react";
import {Link} from "react-router-dom";
export default function Home() {
  return (
    <>
      <div className="bg-white p-16 flex flex-col gap-8 items-center">
        <p className="text-center md:text-6xl font-extrabold tracking-tight text-balance w-[40%] wrap-break-word">Master Your Money with FinTrack</p>
        <p className="text-center wrap-break-word w-[45%] text-gray-600">The simplest way to track your daily expenses, manage multiple accounts, and visualize your financial habits with intuitive charts and real-time insights.</p>
        <div className="flex gap-4">
          <Link className="bg-black text-white py-2 px-2.5 rounded-md" to="/signup">
            Get Started for Free →
          </Link>
          <button className="py-1 px-2 border border-gray-300 rounded-md">▶ View Demo</button>
        </div>
      </div>
      <div className=" bg-gray-100 p-16 flex flex-col items-center gap-8">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="font-bold text-3xl">Everything you need to stay on track</h1>
          <h4 className="text-gray-600">Comprehensive tools designed for your financial decisions</h4>
        </div>
        <div className="grid grid-cols-2 gap-x-20 gap-y-8 w-[65%]">
          <div className="flex flex-col gap-2.5 items-flex-start">
            <img src="./assets/wallet.png" className="size-8" alt="wallet" />
            <span className="font-bold text-lg">Expense Tracking</span>
            <p className="text-gray-600">Easily log daily expenses and categorize them for better visibility.</p>
          </div>
          <div className="flex flex-col gap-2.5 items-flex-start">
            <img src="./assets/log.png" className="size-8" alt="log" />
            <span className="font-bold text-lg">Income Logging</span>
            <p className="text-gray-600">Record all your income streams and track your net savings monthly.</p>
          </div>
          <div className="flex flex-col gap-2.5 items-flex-start">
            <img src="./assets/pie.png" className="size-8" alt="pie" />
            <span className="font-bold text-lg">Visual Insights</span>
            <p className="text-gray-600">Monthly stats generated in beautiful charts to show where your money goes.</p>
          </div>
          <div className="flex flex-col gap-2.5 items-flex-start">
            <img src="./assets/verified.png" className="size-8" alt="verified" />
            <span className="font-bold text-lg">Multi Account Support</span>
            <p className="text-gray-600">Manage multiple bank accounts and track payments from different platforms.</p>
          </div>
        </div>
      </div>
    </>
  );
}
