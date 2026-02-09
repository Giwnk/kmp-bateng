import UsersLayout from "@/Layouts/UsersLayout";
import { Link } from "@inertiajs/react";
import {
    Activity,
    ArrowLeft,
    Banknote,
    Briefcase,
    Calendar,
    Edit,
    IdCardIcon,
    Layers,
    Phone,
    Route,
    User,
} from "lucide-react";
import React from "react";

export default function Show({ auth, anggotaData }) {
    const formatTanggal = (dateString) => {
        if (!dateString) return "Tanggal tidak tersedia";

        const date = new Date(dateString);
        // Kita pakai Intl.DateTimeFormat biar otomatis dapet nama bulan Indo
        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    return (
        <UsersLayout auth={auth}>
            <div className="flex flex-col justify-between items-start gap-4">
                <div className="flex items-center gap-6">
                    <Link
                        href={route("users.anggota.index")}
                        className="p-4 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm hover:bg-gray-50 transition-all text-gray-400 hover:text-gray-900"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 tracking-tighter leading-none">
                            Detail Profil
                        </h1>
                    </div>
                </div>

                <div className="flex justify-start items-center flex-col gap-3">
                    <div className="flex flex-col md:flex-row justify-center w-full items-center gap-5">
                        <StatCard
                            title={"Simpanan Wajib"}
                            icon={Banknote}
                            value={anggotaData.saldo_simpanan_wajib}
                            unit="Rp"
                        />
                        <StatCard
                            title={"Simpanan Pokok"}
                            icon={Banknote}
                            value={anggotaData.saldo_simpanan_pokok}
                            unit="Rp"
                        />
                    </div>
                    <div className="bg-white p-10 rounded-[1.5rem] flex justify-center items-center border-2 border-slate-300 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <InfoItem
                                label="Nama"
                                value={anggotaData.nama}
                                icon={<User />}
                            />
                            <InfoItem
                                label="NIK"
                                value={anggotaData.nik}
                                icon={<IdCardIcon />}
                            />
                            <InfoItem
                                label="Nomor Anggota"
                                value={anggotaData.nomor_anggota}
                                icon={<IdCardIcon />}
                            />
                            <InfoItem
                                label="Status"
                                value={anggotaData.status}
                                icon={<Activity />}
                            />
                            <InfoItem
                                label="Mulai Bergabung"
                                value={formatTanggal(
                                    anggotaData.tanggal_bergabung
                                )}
                                icon={<Calendar />}
                            />
                            <InfoItem
                                label="Nomor Telepon"
                                value={anggotaData.nomor_telepon}
                                icon={<Phone />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </UsersLayout>
    );
}

function InfoItem({ label, value, icon }) {
    return (
        <div className="flex items-start gap-4 w-fit">
            <div className="p-3 bg-gray-50 rounded-2xl text-gray-500">
                {React.cloneElement(icon, { size: 18 })}
            </div>
            <div>
                <p className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-1">
                    {label}
                </p>
                <p className="text-base font-bold text-gray-800">
                    {value || "Tidak Tersedia"}
                </p>
            </div>
        </div>
    );
}

function StatCard({ title, value, unit, icon: Icon, color }) {
    return (
        <div className="bg-white p-6 rounded-3xl border-2 w-full border-slate-300 shadow-sm flex flex-col items-start gap-5 hover:shadow-md transition-all">
            <div className={`p-4 rounded-2xl ${color}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-sm font-bold text-blue-950 uppercase tracking-widest mb-1">
                    {title}
                </p>
                <h3 className="text-lg font-black text-slate-950 leading-none">
                    {value}
                </h3>
                <p className="text-[14px] font-medium text-slate-400 mt-1 ">
                    {unit}
                </p>
            </div>
        </div>
    );
}
