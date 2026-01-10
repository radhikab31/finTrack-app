import {Trash2} from "lucide-react";

export default function Transactions({userData}) {
  // Convert transactions object to array
  const transactionList = userData?.transactions ? Object.entries(userData.transactions).map(([id, data]) => ({id, ...data})) : [];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <p className="text-gray-500">All transactions for {new Date().toISOString().slice(0, 7)}</p>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-gray-400 font-medium">
            <th className="py-4 px-2">Date</th>
            <th className="py-4 px-2">Name</th>
            <th className="py-4 px-2">Type</th>
            <th className="py-4 px-2">Category</th>
            <th className="py-4 px-2">Account</th>
            <th className="py-4 px-2">Amount</th>
            <th className="py-4 px-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactionList.map((t) => (
            <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="py-4 px-2">{t.date}</td>
              <td className="py-4 px-2 font-bold">{t.name}</td>
              <td className="py-4 px-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${t.type === "Expense" ? "bg-red-500" : "bg-green-500"}`}>{t.type}</span>
              </td>
              <td className="py-4 px-2">{t.category}</td>
              <td className="py-4 px-2">{t.account}</td>
              <td className={`py-4 px-2 font-bold ${t.type === "Expense" ? "text-red-600" : "text-green-600"}`}>{t.type === "Expense" ? `-$${t.amount.toFixed(2)}` : `+$${t.amount.toFixed(2)}`}</td>
              <td className="py-4 px-2 text-center">
                <button className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}