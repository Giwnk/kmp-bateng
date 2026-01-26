import { ChevronRight, IdCard, MapPin, Users } from "lucide-react";

export default function KoperasiCard({ item, onDetail }) {
    return (
        <div className="bg-slate-50 border-2 border-blue-900 w-96 h-fit rounded-2xl">
            {/* Header */}
            <div className=" flex justify-between border-b-2 border-slate-500 py-2 px-6">
                <h1 className="font-semibold text-lg text-blue-950">
                    KMP Simpang Perlang
                </h1>
                <div className="bg-green-200 text-sm font-medium px-4 text-teal-700 border-teal-700 border rounded-2xl flex items-center">
                    Aktif
                </div>
            </div>
            {/* Content */}
            <div className="py-3 px-6 flex flex-col gap-2.5">
                <div className="flex items-center gap-3">
                    <MapPin className=" text-cyan-700"></MapPin>
                    <h1 className="text-sm font-medium text-blue-950">
                        Simpang Perlang - Koba
                    </h1>
                </div>

                <div className=" flex items-center gap-3">
                    <IdCard className=" text-cyan-700"></IdCard>
                    <h1 className="text-sm font-medium text-blue-950">
                        AHU-123468163
                    </h1>
                </div>

                {/* <div className="flex items-center gap-3">
                    <Users className=" text-cyan-700"></Users>
                    <h1 className="text-sm font-medium text-blue-950">
                        65 Anggota
                    </h1>
                </div> */}
            </div>
            {/* Detail Action */}
            <div className=" pb-4 px-6 flex justify-end">
                <button
                    className="items-center flex font-semibold text-blue-900 "
                    onClick={() => onDetail(item.id)}
                >
                    Lihat Detail
                    <ChevronRight size={28}></ChevronRight>
                </button>
            </div>
        </div>
    );
}
