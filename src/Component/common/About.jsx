import React from "react";

export default function About() {
  return (
    <div className="p-16 flex flex-col gap-10 items-start">
      <h1 className="font-bold text-3xl text-left">About FinTrack</h1>
      <p className="text-gray-500 text-xl">FinTrack was born from a simple idea: that everyone deserves to have total clarity over their financial life without the complexity of traditional accounting software.</p>
      <h2 className="font-bold text-3xl text-left">Our Mission</h2>
      <p className="text-gray-500 text-xl">Our mission is to empower individuals to make better financial decisions by providing them with intuitive, real-time tools for tracking expenses, managing accounts, and visualizing spending patterns. We believe that awareness is the first step toward financial freedom.</p>
      <h2 className="font-bold text-3xl text-left">Why FinTrack?</h2>
      <p className="text-gray-500 text-xl">Unlike other apps that require complex setups, FinTrack focuses on the day-to-day. From a quick lunch expense with a built-in calculator to tracking which specific bank account paid for your travel, we provide the granularity you need with the simplicity you want.</p>
    </div>
  );
}
