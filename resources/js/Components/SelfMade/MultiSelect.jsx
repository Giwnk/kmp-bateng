import { useState, useRef, useEffect } from "react";
import { ChevronDown, CheckSquare, Square } from "lucide-react";

export default function MultiSelect({
    label,
    options,
    value = [],
    onChange,
    error,
    placeholder = "Pilih Data",
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Tutup dropdown kalau klik di luar
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            )
                setIsOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Logic: Tambah atau Hapus ID dari array
    const toggleOption = (id) => {
        if (value.includes(id)) {
            // Kalau sudah ada, hapus (Uncheck)
            onChange(value.filter((item) => item !== id));
        } else {
            // Kalau belum ada, tambah (Check)
            onChange([...value, id]);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {label}
                </label>
            )}

            {/* TRIGGER BUTTON */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between rounded-full border px-4 py-2 bg-white text-left transition-all
                    ${error ? "border-red-500 bg-red-50" : "border-gray-300 border-2 hover:border-gray-400"}
                    ${isOpen ? "ring-2 ring-blue-950 border-blue-950" : ""}
                `}
            >
                <span
                    className={
                        value.length > 0
                            ? "text-gray-900 font-medium"
                            : "text-gray-400"
                    }
                >
                    {value.length > 0
                        ? `${value.length} Jenis Usaha Dipilih`
                        : placeholder}
                </span>
                <ChevronDown
                    size={18}
                    className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* DROPDOWN LIST */}
            {isOpen && (
                <div className="absolute z-50  w-full bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto p-2">
                    {options.map((item) => {
                        const isSelected = value.includes(item.id);
                        return (
                            <div
                                key={item.id}
                                onClick={() => toggleOption(item.id)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm mb-1
                                    ${isSelected ? "bg-blue-50 text-blue-900" : "hover:bg-gray-50 text-gray-700"}
                                `}
                            >
                                {/* Checkbox Icon Custom */}
                                {isSelected ? (
                                    <CheckSquare
                                        size={18}
                                        className="text-blue-950 transition-all"

                                    />
                                ) : (
                                    <Square
                                        size={18}
                                        className="text-gray-400"
                                    />
                                )}
                                <span className="font-medium">{item.nama}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {error && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                    ⚠️ {error}
                </p>
            )}
        </div>
    );
}
