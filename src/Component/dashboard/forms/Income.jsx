import {useState} from "react";
import {PlusCircle} from "lucide-react";
import CustomDropdown from "../CustomDropdown"; // Ensure this path is correct

export default function Income({userData}) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("2026-01-10");
  const [account, setAccount] = useState("");
  const [details, setDetails] = useState("");
  const paymentPlatforms = Object.keys(userData?.settings?.paymentPlatforms || {}).filter((key) => key !== "initialized");
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Header section matching your reference image */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Income</h1>
        <p className="text-gray-500">Record a new income transaction</p>
      </div>

      <div className="space-y-5">
        {/* Income Source */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Income Source</label>
          <input value={source} onChange={(e) => setSource(e.target.value)} type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black focus:outline-none transition-all" placeholder="e.g., Salary, Freelance" />
        </div>

        {/* Amount with Steppers (No Calculator) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Amount <span className="text-red-500">*</span>
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            min="0"
            step="0.01"
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black outline-none 
                       [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:appearance-auto"
            placeholder="0.00"
          />
        </div>

        {/* Date Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Date</label>
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none bg-white" />
        </div>

        {/* Income Category Dropdown */}
        {/* <CustomDropdown label="Category" options={userData?.settings?.incomeCategories || []} selected={category} onSelect={(val) => setCategory(val)} placeholder="Select category" /> */}

        {/* Payment Account Dropdown */}
        <CustomDropdown label="Payment Account" options={paymentPlatforms} selected={account} onSelect={(val) => setAccount(val)} placeholder="Select account" />

        {/* Details Textarea */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Details (Optional)</label>
          <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows="3" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none resize-none" placeholder="Additional notes..." />
        </div>

        {/* Action Button */}
        <button className="w-full bg-black text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
          <PlusCircle size={18} />
          Add Income
        </button>
      </div>
    </div>
  );
}
