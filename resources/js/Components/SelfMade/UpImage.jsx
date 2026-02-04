import React from "react";
import { AlertCircle, Image as ImageIcon, UploadCloud } from "lucide-react";
import InputError from "@/Components/InputError";

export default function UpImage({
    preview = null,
    onFileChange,
    error = null,
    label = "Foto Profil",
    className = "",
}) {
    return (
        <div className={`text-center ${className}`}>
            <label className="text-sm font-bold text-blue-950 uppercase mb-4 block">
                {label}
            </label>

            <div className="relative group mx-auto w-48 h-48 mb-6">
                {/* Container Utama Image */}
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-gray-50 border-4 border-white shadow-inner flex items-center justify-center">
                    {preview ? (
                        <img
                            src={preview}
                            className="w-full h-full object-cover"
                            alt="Preview"
                        />
                    ) : (
                        <ImageIcon size={48} className="text-gray-200" />
                    )}
                </div>

                {/* Overlay Hover untuk Upload */}
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all cursor-pointer rounded-[2.5rem]">
                    <UploadCloud className="text-white" size={32} />
                    <input
                        type="file"
                        className="hidden"
                        onChange={onFileChange}
                        accept="image/*"
                    />
                </label>
            </div>

            {/* Menampilkan Error jika ada */}
            {error && (
                <p className="mt-1 text-xs text-red-800 font-medium flex items-center gap-1">
                    <AlertCircle /> {error}
                </p>
            )}
        </div>
    );
}
