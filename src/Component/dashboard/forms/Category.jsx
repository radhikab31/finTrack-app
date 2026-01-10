import React, {useState} from "react";
import {Plus, X} from "lucide-react";
import {useFirebase} from "../../context/firebase";
import {ref, get} from "firebase/database"; // Ensure these are imported

export default function Category({userData}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const firebase = useFirebase();

  // Convert object keys to an array and filter out the initializer
  const categories = Object.keys(userData?.settings?.expenseCategories || {}).filter((key) => key !== "initialized");

  // Category.jsx

  // 1. Updated handleAddCategory
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    const cleanCategory = newCategory.trim().toLowerCase();
    const userRef = ref(firebase.db, `users/${firebase.user.uid}/settings/expenseCategories`);
    await firebase.storeData(`users/${firebase.user.uid}/settings/expenseCategories/${cleanCategory}`, true);

    setNewCategory("");
    setIsModalOpen(false);
  };

  const handleDelete = async (catName) => {
    await firebase.storeData(`users/${firebase.user.uid}/settings/expenseCategories/${catName}`, null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expense Categories</h1>
          <p className="text-gray-500">Manage your custom expense categories</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-all">
          <Plus size={20} /> Add Category
        </button>
      </div>

      {/* Unified Categories Grid - Combined Map here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, index) => (
          <div key={index} className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center min-h-10 group">
            <span className="text-xl font-medium text-gray-800">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>

            {/* Delete Button (The "Cross") */}
            <button onClick={() => handleDelete(index)} className="absolute top-1 right-3 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all p-1 hover:bg-red-50 rounded-full cursor-pointer">
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Category</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-sm font-semibold text-gray-700">Category Name</label>
              <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} type="text" placeholder="e.g., Entertainment" className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div className="flex justify-end">
              <button onClick={handleAddCategory} className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800">
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
