import React from "react";

export default function Features() {
  return (
    <div className="p-16 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold md:text-5xl">Powerful Features for Your Finances</h1>
        <p className="text-center text-xl text-gray-600 w-[65%]">Explore the tools we've built to help you track every penny and achieve your financial goals.</p>
      </div>
      <div className="grid grid-cols-2 gap-x-20 gap-y-8 w-[70%]">
        <div className="flex flex-col gap-2.5 items-flex-start border border-gray-300 rounded-md p-4">
          <img src="./assets/calc.png" className="size-8" alt="wallet" />
          <span className="font-bold text-lg">Integrated Calculator</span>
          <p className="text-gray-600">Calculate amounts directly within the expense entry form. No need to switch between apps.</p>
        </div>
        <div className="flex flex-col gap-2.5 items-flex-start border border-gray-300 rounded-md p-4">
          <img src="./assets/wallet.png" className="size-8" alt="wallet" />
          <span className="font-bold text-lg">Multi-Account Tracking</span>
          <p className="text-gray-600">Track spending across multiple bank accounts, cash, and digital wallets in one place.</p>
        </div>
        <div className="flex flex-col gap-2.5 items-flex-start border border-gray-300 rounded-md p-4">
          <img src="./assets/pie.png" className="size-8" alt="pie" />
          <span className="font-bold text-lg">Category Analytics Logging</span>
          <p className="text-gray-600">Visual breakdowns of your spending by category using intuitive monthly pie charts.</p>
        </div>
        <div className="flex flex-col gap-2.5 items-flex-start border border-gray-300 rounded-md p-4">
          <img src="./assets/mobile.png" className="size-8" alt="pie" />
          <span className="font-bold text-lg">Mobile First Design</span>
          <p className="text-gray-600">Manage your finances on the go with a fully responsive and optimized mobile interface.</p>
        </div>
        <div className="flex flex-col gap-2.5 items-flex-start border border-gray-300 rounded-md p-4">
          <img src="./assets/verified.png" className="size-8" alt="verified" />
          <span className="font-bold text-lg">Secure Storage</span>
          <p className="text-gray-600">Your financial data is protected with enterprise-grade security and encryption.</p>
        </div>
        <div className="flex flex-col gap-2.5 items-flex-start border border-gray-300 rounded-md p-4">
          <img src="./assets/bolt.png" className="size-8" alt="wallet" />
          <span className="font-bold text-lg">Real-Time Updates</span>
          <p className="text-gray-600">Instantly see the impact of every transaction on your monthly budget and balance.</p>
        </div>
      </div>
    </div>
  );
}
