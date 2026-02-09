import React from "react";

export default function Button({
    children,
    type = "button",
    variant = "primary",
    icon: Icon = null,
    sizeIcon,
    className = "",
    ...props
}) {
    // Definisi gaya berdasarkan variant
    const variants = {
        primary:
            "bg-blue-950 text-white hover:bg-blue-900 shadow-xl shadow-gray-200",
        outline: "border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-xl shadow-red-100",
        success:
            "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl shadow-emerald-100",
    };

    return (
        <button
            type={type}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm tracking-widest transition-all active:scale-95 disabled:opacity-50 ${variants[variant]} ${className}`}
            {...props}
        >
            {Icon && <Icon {...props} size={sizeIcon || 24} />}
            {children}
        </button>
    );
}
