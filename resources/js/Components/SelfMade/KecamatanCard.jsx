import React from "react";
import { Building2, Edit3, MapPin, Trash2 } from "lucide-react";

export default function KecamatanCard({
    item,
    onEdit,
    onDelete,
    onEditDesa,
    onDeleteDesa,
}) {
    return (
        <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border-2 border-blue-950 overflow-hidden flex flex-col h-full"
        >
            {/* Header Card */}
            <div className="bg-gray-50 px-5 py-3 border-slate-500 border-b-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <MapPin className="text-blue-950" size={20} />
                    <h3 className="font-bold text-blue-950">{item.nama}</h3>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full border border-red-200">
                        {item.desas.length} Desa
                    </span>
                </div>

                <div className="flex gap-3">
                    <button
                        className="text-gray-400 hover:text-blue-900 transition p-1 hover:bg-blue-100 rounded"
                        onClick={() => onEdit(item)}
                    >
                        <Edit3 size={16}></Edit3>
                    </button>

                    {/* Tombol Hapus Kecamatan */}
                    <button
                        onClick={() => onDelete(item.id)}
                        className="text-gray-400 hover:text-red-500 transition p-1 hover:bg-red-100 rounded"
                        title="Hapus Kecamatan"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Body Card (List Desa) */}
            <div className="p-4 flex-grow">
                {item.desas.length > 0 ? (
                    <ul className="space-y-2">
                        {item.desas.map((desa) => (
                            <li
                                key={desa.id}
                                className="flex justify-between items-center text-sm p-2 border-2 rounded-lg group transition-colors"
                            >
                                <div className="flex items-center gap-2 text-blue-950">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-700"></div>
                                    {desa.nama}
                                </div>

                                <div className="flex gap-5">
                                    {/* Tombol Hapus dan Edit Desa (Muncul pas hover) */}
                                    <button
                                        onClick={() => onEditDesa(desa)}
                                        className=" text-gray-400 hover:text-blue-900 transition p-1 hover:bg-blue-100 rounded"
                                        title="Edit Desa"
                                    >
                                        <Edit3 size={14} />
                                    </button>
                                    <button
                                        onClick={() => onDeleteDesa(desa.id)}
                                        className=" text-gray-400 hover:text-red-500 transition p-1 hover:bg-red-100 rounded"
                                        title="Hapus Desa"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 py-6 text-sm italic border-2 border-dashed border-gray-100 rounded-lg">
                        <MapPin size={24} className="mb-2 opacity-20" />
                        Belum ada desa
                    </div>
                )}
            </div>
        </div>
    );
}
