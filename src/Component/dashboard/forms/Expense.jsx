import {useState, useRef, useEffect} from "react";
import {PlusCircle} from "lucide-react";
import CalculatorModal from "../CalculatorModal";
import {LuCalculator} from "react-icons/lu";
import CustomDropdown from "../CustomDropdown";
import {useFirebase} from "../../context/firebase";
import {ref, push, set, runTransaction} from "firebase/database";

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

export default function Expense({userData}) {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(getTodayDate());
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [details, setDetails] = useState("");
  const [showCalc, setShowCalc] = useState(false);
  const firebase = useFirebase();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
    };

    const currentInput = inputRef.current;
    if (currentInput) {
      currentInput.addEventListener("wheel", handleWheel, {passive: false});
    }

    return () => {
      if (currentInput) {
        currentInput.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  // Logic: Convert Objects to Arrays
  const expenseCategories = Object.keys(userData?.settings?.expenseCategories || {}).filter((key) => key !== "initialized");

  const paymentPlatforms = Object.keys(userData?.settings?.paymentPlatforms || {}).filter((key) => key !== "initialized");

  // --- STRICT NUMBER VALIDATION ---
  const handleAmountChange = (e) => {
    const val = e.target.value;

    /**
     * Regex Breakdown:
     * ^\d* -> Starts with any number of digits
     * (\.\d{0,2})? -> Allows one optional decimal point followed by max 2 digits
     * $           -> End of string
     */
    const regex = /^\d*(\.\d{0,2})?$/;

    if (regex.test(val) || val === "") {
      setAmount(val);
    }
  };

  const handleAmountKeyDown = (e) => {
    // Specifically block the 'e' key, plus, and minus signs
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleAddExpense = async () => {
    if (!amount || !category || !account) {
      alert("Please fill in all required fields");
      return;
    }

    const numericAmount = parseFloat(amount);
    const transactionData = {
      name: expenseName || "Untitled Expense",
      type: "Expense",
      amount: numericAmount,
      date,
      category,
      account,
      details,
      createdAt: new Date().toISOString(),
    };

    try {
      const transRef = ref(firebase.db, `users/${firebase.user.uid}/transactions`);
      const newTransRef = push(transRef);
      await set(newTransRef, transactionData);

      const financeRef = ref(firebase.db, `users/${firebase.user.uid}/finance`);
      await runTransaction(financeRef, (currentData) => {
        if (currentData) {
          currentData.currentBalance -= numericAmount;
          currentData.totalExpense += numericAmount;
        }
        return currentData;
      });

      alert("Expense Added Successfully!");
      setAmount("");
      setExpenseName("");
      setDetails("");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Expense</h1>
        <p className="text-gray-500">Record a new expense transaction</p>
      </div>

      <div className="space-y-5">
        {/* Expense Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Expense Name</label>
          <input value={expenseName} onChange={(e) => setExpenseName(e.target.value)} type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black outline-none transition-all" placeholder="e.g., Groceries, Coffee" />
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Amount <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input ref={inputRef} value={amount} onChange={handleAmountChange} onKeyDown={handleAmountKeyDown} type="text" inputMode="decimal" placeholder="0.00" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black outline-none transition-all" />
            <button type="button" onClick={() => setShowCalc(true)} className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center shadow-sm">
              <LuCalculator size={20} />
            </button>
          </div>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Date</label>
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none" />
        </div>

        {/* Dropdowns side-by-side */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <CustomDropdown label="Category" options={expenseCategories} selected={category} onSelect={(val) => setCategory(val)} placeholder="Select category" />
          </div>
          <div className="flex-1">
            <CustomDropdown label="Payment Account" options={paymentPlatforms} selected={account} onSelect={(val) => setAccount(val)} placeholder="Select account" />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Details (Optional)</label>
          <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows="3" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none resize-none" placeholder="Additional notes..." />
        </div>

        {/* Submit Button */}
        <button onClick={handleAddExpense} className="w-full bg-black text-white font-semibold p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
          <PlusCircle size={18} />
          Add Expense
        </button>

        {showCalc && (
          <CalculatorModal
            onClose={() => setShowCalc(false)}
            onConfirm={(value) => {
              // Ensure the value from calculator also respects the 2 decimal limit
              const formattedCalcValue = parseFloat(value).toFixed(2);
              setAmount(formattedCalcValue);
              setShowCalc(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
