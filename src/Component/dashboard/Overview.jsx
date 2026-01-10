import clsx from "clsx";
import React, {useState, useRef, useEffect} from "react";
import Accounts from "./forms/Accounts";
import Category from "./forms/Category";
import Expense from "./forms/Expense";
import Income from "./forms/Income";
import Transactions from "./forms/Transactions";

export function Overview({userData}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const containerRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("transactions");

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMonthClick = (monthIndex) => {
    setSelectedDate(new Date(viewYear, monthIndex));
    setIsOpen(false);
  };

  const isSelected = (monthIndex) => {
    return selectedDate.getMonth() === monthIndex && selectedDate.getFullYear() === viewYear;
  };

  return (
    <div className="py-8 px-15 bg-white">
      <div className="flex justify-between mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-gray-900">Monthly Overview</h1>
          <p className="text-lg text-gray-500">Track and manage your finances</p>
        </div>
        <div className="flex gap-2.5 items-center" ref={containerRef}>
          <label className="text-lg font-semibold text-gray-700">Month:</label>

          <div className="relative">
            {/* Main Input Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2.5 justify-between w-full max-w-xs px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
              <span className="text-gray-900 font-medium">
                {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>

            {/* Month/Year Selection Menu */}
            {isOpen && (
              <div className="absolute left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-4">
                {/* Year Navigation (Editable Year) */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                  <button onClick={() => setViewYear(viewYear - 1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <span className="text-lg font-bold text-gray-800">{viewYear}</span>

                  <button onClick={() => setViewYear(viewYear + 1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                {/* Grid for Months */}
                <div className="grid grid-cols-3 gap-2">
                  {months.map((month, index) => (
                    <button
                      key={month}
                      onClick={() => handleMonthClick(index)}
                      className={`py-3 text-sm rounded-lg transition-all
                      ${isSelected(index) ? "bg-blue-600 text-white font-bold shadow-md" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"}
                    `}
                    >
                      {month.substring(0, 3)}
                    </button>
                  ))}
                </div>

                {/* Action Bar */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-center">
                  <button
                    onClick={() => {
                      const now = new Date();
                      setViewYear(now.getFullYear());
                      setSelectedDate(now);
                      setIsOpen(false);
                    }}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Jump to Current Month
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div id="balance-tags" className="flex gap-2.5 mb-8">
        <div className="border p-10 rounded-lg shadow w-1/3 h-30 flex flex-col justify-center gap-5 font-bold bg-black text-white">
          <div className="flex justify-between gap-1">
            <span className="text-lg">Current Balance</span>
            <img src="./assets/wallet-white.png" className="size-8" alt="wallet" />
          </div>
          <span>{userData?.finance?.currentBalance ?? 0}</span>
        </div>
        <div className="border p-10 rounded-lg shadow w-1/3 h-30 flex flex-col justify-center gap-5 font-bold">
          <div className="flex justify-between gap-1">
            <span>Total Income</span>
            <img src="./assets/arrow-up.png" className="size-7" alt="arrow-up" />
          </div>
          <span>{userData?.finance?.totalIncome ?? 0}</span>
        </div>
        <div className="border p-10 rounded-lg shadow w-1/3 h-30 flex flex-col justify-center gap-5 font-bold">
          <div className="flex justify-between gap-1">
            <span>Total Expense</span>
            <img src="./assets/arrow-down.png" className="size-7" alt="arrow-down" />
          </div>
          <span>{userData?.finance?.totalExpense ?? 0}</span>
        </div>
      </div>
      <div className="inline-flex flex-col gap-4 p-2">
        <div id="view-tabs" className="bg-gray-200 rounded-lg shadow py-1 px-2 gap-4 inline-flex">
          <button
            className={clsx("hover:cursor-pointer p-2", currentTab == "transactions" && "bg-white rounded-md shadow")}
            onClick={() => {
              setCurrentTab("transactions");
            }}
          >
            Transactions
          </button>
          <button
            className={clsx("hover:cursor-pointer p-2", currentTab == "expense" && "bg-white rounded-md shadow")}
            onClick={() => {
              setCurrentTab("expense");
            }}
          >
            Add Expense
          </button>
          <button
            className={clsx("hover:cursor-pointer p-2", currentTab == "income" && "bg-white rounded-md shadow")}
            onClick={() => {
              setCurrentTab("income");
            }}
          >
            Add Income
          </button>
          <button
            className={clsx("hover:cursor-pointer p-2", currentTab == "categories" && "bg-white rounded-md")}
            onClick={() => {
              setCurrentTab("categories");
            }}
          >
            Categories
          </button>
          {/* <button
            className={clsx("hover:cursor-pointer p-2", currentTab == "accounts" && "bg-white rounded-md shadow")}
            onClick={() => {
              setCurrentTab("accounts");
            }}
          >
            Accounts
          </button> */}
        </div>

        <div>
          {currentTab === "transactions" && <Transactions />}
          {currentTab === "expense" && <Expense userData={userData} />}
          {currentTab === "income" && <Income userData={userData} />}
          {currentTab === "categories" && <Category userData={userData} />}
          {/* {currentTab === "accounts" && <Accounts />} */}
        </div>
      </div>
    </div>
  );
}
