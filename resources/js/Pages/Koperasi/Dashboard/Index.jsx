import React, { useMemo } from "react";
import UsersLayout from "@/Layouts/UsersLayout";
import Header from "@/Components/SelfMade/Header";
import { Line, Doughnut } from "react-chartjs-2";
import {
    Users,
    Wallet,
    FileCheck,
    FileWarning,
    TrendingUp,
    PieChart,
    History,
    LucideAlignHorizontalSpaceBetween,
} from "lucide-react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import StatCard from "@/Components/SelfMade/Cards/StatCard";
import Table from "@/Components/SelfMade/Table";

// Register ChartJS agar tidak error
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function Index({ auth, data }) {
    const { stats, charts, recent_transaksi, recent_anggota } = data;

    // 1. Data untuk Line Chart (Tren Bulanan)
    const lineData = useMemo(
        () => ({
            labels: charts.trend.map((item) => item.bulan),
            datasets: [
                {
                    label: "Total Simpanan",
                    data: charts.trend.map((item) => item.total),
                    borderColor: "#4f46e5",
                    backgroundColor: "rgba(79, 70, 229, 0.1)",
                    tension: 0.4,
                    fill: true,
                },
            ],
        }),
        [charts.trend]
    );

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

    // 2. Data untuk Doughnut Chart (Komposisi)
    const doughnutData = useMemo(
        () => ({
            labels: charts.komposisi.map((item) => item.jenis_transaksi),
            datasets: [
                {
                    data: charts.komposisi.map((item) => item.total),
                    backgroundColor: ["#1e1b4b", "#4f46e5", "#818cf8"],
                    borderWidth: 0,
                },
            ],
        }),
        [charts.komposisi]
    );

    const colAnggota = [
        {
            header: "Nama Anggota",
            render: (item) => (
                <div className="flex flex-col">
                    <span className="font-semibold">{item.nama}</span>
                    <span className="text-xs text-slate-500">{item.nik}</span>
                </div>
            ),
        },
        {
            header: "Status",
            className: "text-right",
            render: (item) => (
                <div className="flex flex-col items-end">
                    <div className="px-2 py-1 w-fit text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {item.status}
                    </div>
                    <div className="text-xs text-slate-500">
                        {formatTanggal(item.tanggal_bergabung)}
                    </div>
                </div>
            ),
        },
    ];

    const colTransaksi = [
        {
            header: "Anggota",
            render: (item) => (
                <div className="flex flex-col">
                    <span className="font-semibold">
                        {item.anggota_koperasi?.nama || "Tanpa Nama"}
                    </span>
                    <span className="text-xs text-slate-500">
                        {item.jenis_transaksi}
                    </span>
                </div>
            ),
        },
        {
            header: "Jumlah",
            className: "text-right",
            render: (item) => (
                <div className="flex flex-col items-end">
                    <div className="px-2 py-1 w-fit text-xs font-bold text-slate-800">
                        {item.jumlah}
                    </div>
                </div>
            ),
        },
    ];

    return (
        <UsersLayout auth={auth}>
            <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
                <Header
                    title="Dashboard Koperasi"
                    desc="Pantau kesehatan finansial dan pertumbuhan anggota secara real-time."
                ></Header>

                {/* --- STATS CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Anggota Aktif"
                        value={stats.total_anggota}
                        unit="Orang"
                        icon={Users}
                        color="bg-blue-50 text-blue-900"
                    />
                    <StatCard
                        title="Total Saldo"
                        value={new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                        }).format(stats.total_saldo)}
                        unit="Akumulasi Simpanan"
                        icon={Wallet}
                        color="bg-amber-50 text-amber-800"
                    />
                    <StatCard
                        title="Status Laporan"
                        value={
                            stats.sudah_lapor ? "Sudah Lapor" : "Belum Lapor"
                        }
                        unit={
                            stats.sudah_lapor
                                ? "Bulan ini aman"
                                : "Deadline hampir tiba!"
                        }
                        icon={stats.sudah_lapor ? FileCheck : FileWarning}
                        color={
                            stats.sudah_lapor
                                ? "bg-emerald-50 text-emerald-900"
                                : "bg-red-50 text-red-900"
                        }
                    />
                </div>

                {/* --- CHARTS SECTION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold">
                            <TrendingUp size={20} className="text-blue-600" />
                            <span>Tren Simpanan (6 Bulan Terakhir)</span>
                        </div>
                        <div className="h-72">
                            <Line
                                data={lineData}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                }}
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold">
                            <PieChart size={20} className="text-indigo-600" />
                            <span>Komposisi Kas</span>
                        </div>
                        {charts.komposisi?.length > 0 ? (
                            <div className="h-64 flex justify-center">
                                <Doughnut
                                    data={doughnutData}
                                    options={{ maintainAspectRatio: false }}
                                />
                            </div>
                        ) : (
                            <div className="h-64 flex flex-col justify-center items-center text-center text-slate-400">
                                <PieChart
                                    size={48}
                                    className="mb-2 opacity-50"
                                />
                                <p className="text-sm font-medium">
                                    Belum ada transaksi
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    <div className="grid col-span-2">
                        {/* --- RECENT ACTIVITY --- */}
                        <div className="bg-white p-6 flex flex-col gap-4 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className=" border-b border-slate-50 flex justify-between items-center">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    <History
                                        size={18}
                                        className="text-slate-400"
                                    />{" "}
                                    Aktivitas Transaksi Terakhir
                                </h3>
                            </div>
                            <Table
                                columns={colTransaksi}
                                items={recent_transaksi}
                            />
                        </div>
                    </div>
                    <div className="grid col-span-2">
                        <div className="bg-white p-6 flex flex-col gap-4 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className=" border-b border-slate-50 flex justify-between items-center">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    <History
                                        size={18}
                                        className="text-slate-400"
                                    />{" "}
                                    Anggota Terakhir
                                </h3>
                            </div>
                            <Table
                                columns={colAnggota}
                                items={recent_anggota || []}
                            ></Table>
                        </div>
                    </div>
                </div>
            </div>
        </UsersLayout>
    );
}
