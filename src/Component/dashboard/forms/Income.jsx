import {useState} from "react";
import {PlusCircle} from "lucide-react";
import CustomDropdown from "../CustomDropdown";
import {useFirebase} from "../../context/firebase"; // Ensure correct path
import {ref, push, set, runTransaction} from "firebase/database"; // 1. ADDED MISSING IMPORTS

export default function Income({userData}) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");

  const firebase = useFirebase(); // 2. INITIALIZED HOOK

  const paymentPlatforms = Object.keys(userData?.settings?.paymentPlatforms || {}).filter((key) => key !== "initialized");

  const incomeCategories = Object.keys(userData?.settings?.incomeCategories || {}).filter((key) => key !== "initialized");

  const handleAddIncome = async () => {
    if (!amount || !category || !account) {
      alert("Please fill in all fields");
      return;
    }

    const numericAmount = parseFloat(amount);
    const transactionData = {
      name: source || "Untitled Income",
      type: "Income",
      amount: numericAmount,
      date,
      category,
      account,
      details,
      createdAt: new Date().toISOString(),
    };

    try {
      // 3. FIX: Using firebase.db (Ensure you updated firebase.jsx to export 'db')
      const transRef = ref(firebase.db, `users/${firebase.user.uid}/transactions`);
      const newTransRef = push(transRef);
      await set(newTransRef, transactionData);

      const financeRef = ref(firebase.db, `users/${firebase.user.uid}/finance`);
      await runTransaction(financeRef, (currentData) => {
        if (currentData) {
          currentData.currentBalance += numericAmount;
          currentData.totalIncome += numericAmount;
        }
        return currentData;
      });

      alert("Income Added!");
      // Reset Form
      setAmount("");
      setSource("");
      setCategory("");
      setAccount("");
      setDetails("");
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Income</h1>
        <p className="text-gray-500">Record a new income transaction</p>
      </div>

      <div className="space-y-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Income Source</label>
          <input value={source} onChange={(e) => setSource(e.target.value)} type="text" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none" placeholder="e.g., Salary" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Amount <span className="text-red-500">*</span>
          </label>
          <input value={amount} onWheel={(e) => e.target.blur()} onChange={(e) => setAmount(e.target.value)} type="number" min="0" step="0.01" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none" placeholder="0.00" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Date</label>
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none bg-white" />
        </div>

        {/* 4. FIX: Added 'selected' prop and placeholder */}
        <CustomDropdown label="Category" options={incomeCategories} selected={category} onSelect={(val) => setCategory(val)} placeholder="Select category" />

        <CustomDropdown label="Payment Account" options={paymentPlatforms} selected={account} onSelect={(val) => setAccount(val)} placeholder="Select account" />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Details (Optional)</label>
          <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows="3" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none resize-none" placeholder="Notes..." />
        </div>

        <button onClick={handleAddIncome} className="w-full bg-black text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
          <PlusCircle size={18} />
          Add Income
        </button>
      </div>
    </div>
  );
}
