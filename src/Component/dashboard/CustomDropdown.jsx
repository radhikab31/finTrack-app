import {useState, useRef, useEffect} from "react";
import {ChevronDown} from "lucide-react";

export default function CustomDropdown({label, options, selected, onSelect, placeholder}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
      <label className="text-sm font-semibold text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>

      {/* Trigger Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between border border-gray-300 rounded-xl p-2.5 bg-white shadow-sm hover:bg-gray-50 transition-all outline-none focus:ring-2 focus:ring-black">
        <span className={selected ? "text-black" : "text-gray-400"}>{selected ? selected.charAt(0).toUpperCase() + selected.slice(1) : placeholder}</span>
        <ChevronDown size={20} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-110 overflow-hidden animate-in fade-in zoom-in duration-150">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors flex items-center gap-2
                  ${selected === option ? "bg-gray-50 font-bold text-black" : "text-gray-700"}
                `}
              >
                {selected === option && <span className="text-black text-xs">✓</span>}
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
