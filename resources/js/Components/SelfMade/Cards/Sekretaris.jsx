import { ImageOff } from "lucide-react";

export default function SekretarisCard({ koperasi }) {
    const data = koperasi.sekretaris;
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center hover:shadow-md transition">
            <div className="w-32 h-32 bg-gray-200 flex justify-center items-center rounded-full mx-auto mb-3 overflow-hidden">
                {data?.foto_url ? (
                    <img
                        src={data.foto_url}
                        alt={data.nama}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <ImageOff size={40} className="text-slate-600"/>
                )}
            </div>
            <h4 className="font-bold text-gray-800">
                {data?.nama || "Belum Diisi"}
            </h4>
            <p className="text-sm text-blue-900 font-semibold">Sekretaris</p>
        </div>
    );
}
