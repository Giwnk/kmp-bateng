import React from "react";
import { Head, Link } from "@inertiajs/react";
import Table from "@/Components/SelfMade/Table";
import { Building2, Users, CheckCircle, ArrowLeft, Activity, Building2Icon } from "lucide-react";
import StatCard from "@/Components/SelfMade/Cards/StatCard";

// Pakai Layout Publik (Guest) atau buat komponen tanpa pembungkus auth
export default function Show({ kecamatan, koperasis, stats }) {
    const columns = [
        {
            header: "Nama Koperasi",
            render: (item) => (
                <div className="flex flex-col">
                    <Link
                        href={route("koperasi.show", item.id)}
                        className="text-gray-800 flex items-center gap-3 font-semibold hover:text-blue-900 underline transition-all"
                    >
                        {item.nama}
                    </Link>
                    <span className="text-[10px] text-gray-400 uppercase tracking-tighter">
                        {item.nomor_induk || "Tanpa NIK"}
                    </span>
                </div>
            ),
        },
        {
            header: "Wilayah",
            render: (item) => (
                <span className="text-xs text-gray-600 font-medium">
                    {item.desa?.nama || "-"}
                </span>
            ),
        },
        {
            header: "Anggota",
            className: "text-center",
            render: (item) => (
                <span className="font-bold text-gray-700">
                    {/* Mengambil data dari relasi anggotaKoperasi */}
                    {item.anggota_koperasi?.total_anggota?.toLocaleString() ||
                        0}
                </span>
            ),
        },
        {
            header: "Status",
            render: (item) => (
                <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.status_operasional === true
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                    }`}
                >
                    {item.status_operasional === true ? "Aktif" : "Non-Aktif"}
                </span>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <Head title={`Data Koperasi - ${kecamatan.nama}`} />

            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link
                            href={route("home")}
                            className="flex items-center gap-2 text-gray-400 hover:text-red-600 mb-2 transition-all"
                        >
                            <ArrowLeft size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">
                                Beranda Utama
                            </span>
                        </Link>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
                            Kecamatan {kecamatan.nama}
                        </h1>
                    </div>
                </div>

                {/* Grid Statistik Publik */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard
                        title={"Total Unit Koperasi"}
                        value={stats.total_unit}
                        icon={Building2Icon}
                        color={"bg-blue-50 text-blue-900"}
                        unit={"Unit"}
                    ></StatCard>

                    <StatCard
                        title={"Total Unit Koperasi Aktif"}
                        value={stats.aktif}
                        icon={Activity}
                        color={"bg-green-50 text-green-600"}
                        unit={"Unit"}
                    ></StatCard>

                    <StatCard
                        title={"Total Anggota Terdaftar"}
                        value={stats.total_anggota.toLocaleString()}
                        icon={Users}
                        color={"bg-amber-50 text-amber-8    00"}
                        unit={"Orang"}
                    ></StatCard>
                </div>

                {/* Tabel Publik */}
                <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                    <Table columns={columns} items={koperasis} />
                </div>
            </div>
        </div>
    );
}
