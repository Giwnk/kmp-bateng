import React from "react";

export default function Header({
    title,
    desc,
    icon: Icon = null,
    children,
    className = "",
}) {
    return (
        <div
            className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-4 ${className}`}
        >
            <div className="flex items-center gap-4">
                {/* Opsional: Ikon di sebelah Judul */}
                {Icon && (
                    <div className="p-3 bg-blue-50 text-blue-950 rounded-2xl">
                        <Icon size={28} />
                    </div>
                )}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tighter">
                        {title}
                    </h1>
                    <p className="text-gray-500 text-sm font-medium">{desc}</p>
                </div>
            </div>

            {/* Slot untuk Button atau elemen lain */}
            <div className="w-full md:w-auto">{children}</div>
        </div>
    );
}
