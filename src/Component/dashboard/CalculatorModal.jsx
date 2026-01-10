import React, {useState} from "react";
import {X} from "lucide-react";

export default function CalculatorModal({onClose, onConfirm}) {
  const [display, setDisplay] = useState("0");

  const handleBtnClick = (val) => {
    if (display === "0" && val !== ".") {
      setDisplay(val);
    } else {
      setDisplay((prev) => prev + val);
    }
  };

  const calculate = () => {
    try {
      // Replace symbols for evaluation
      const result = eval(display.replace(/×/g, "*").replace(/÷/g, "/"));
      // Format to 2 decimal places if necessary
      setDisplay(Number(result).toFixed(2).toString());
    } catch (e) {
      setDisplay("Error");
    }
  };

  const buttons = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-bold">Calculator</h2>
              <p className="text-gray-500 text-sm">Calculate your expense amount</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Calculator Display */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-right">
            <span className="text-4xl font-bold truncate block">{display}</span>
          </div>

          {/* Buttons Grid */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {buttons.map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === "=") calculate();
                  else handleBtnClick(btn);
                }}
                className={`h-14 rounded-xl text-xl font-semibold transition-all shadow-sm active:scale-95
                  ${["÷", "×", "-", "+", "="].includes(btn) ? "bg-white border border-gray-200 text-gray-800" : "bg-white border border-gray-200 text-gray-800"}`}
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex gap-3">
            <button onClick={() => setDisplay("0")} className="flex-1 bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-colors">
              Clear
            </button>
            <button onClick={() => onConfirm(display)} className="flex-1 bg-[#1A1A1A] text-white font-bold py-4 rounded-xl hover:bg-black transition-colors">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
