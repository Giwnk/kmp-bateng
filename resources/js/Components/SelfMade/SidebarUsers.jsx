import { Link } from "@inertiajs/react";
// Import Icon dari Lucide
import {
    LayoutDashboard,
    Users,
    FileCheck,
    Settings,
    LogOut,
    Map,
    Handshake,
    Banknote,
    ChartColumnStacked,
    FileChartColumn,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SidebarUsers({ className, activePage, onNavigate }) {
    // 👇 Helper Component: Biar gak copy-paste class berkali-kali
    // Ini bikin kodingan jauh lebih RAPI!
    const SidebarLink = ({ name, label, icon: Icon, href = "#" }) => {
        // Cek: Apakah link ini sedang aktif?
        // Jika di Playground: cek props 'activePage'
        // Jika di Real App: nanti pake route().current(name)
        const isActive = activePage === name;

        return (
            <motion.button
                onClick={() => onNavigate(name)}
                whileTap={{ scale: 0.75 }} // Efek membal pas diklik // Trigger ganti state di Playground
                className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 group
                ${
                    isActive
                        ? "bg-blue-900 text-gray-200 shadow-md shadow-blue-200" // Style ACTIVE (Biru Solid)
                        : "text-gray-600 hover:bg-slate-200 hover:text-blue-900" // Style INACTIVE (Hover effect)
                }`}
            >
                {/* Icon dengan dynamic color */}
                <motion.div
                    className="div"
                    animate={{ rotate: isActive ? [0, -10, 10, 0] : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Icon
                        size={20}
                        className={`mr-3 transition-colors ${isActive ? "text-white" : "text-gray-600 group-hover:text-blue-900"}`}
                    />
                </motion.div>
                {label}
            </motion.button>
        );
    };

    return (
        <div
            className={`w-64 h-screen bg-gray-100 border-r-2 border-slate-400 border-solid flex flex-col flex-shrink-0 ${className}`}
        >
            {/* 1. Header Logo */}
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <div className="flex items-center gap-2 text-red-700">
                    <span className="text-lg font-bold tracking-tight">
                        KMP BANGKA TENGAH
                    </span>
                </div>
            </div>

            {/* 2. Menu Items */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
                <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Menu Utama
                </p>

                {/* Panggil Helper Component tadi */}
                <SidebarLink
                    name="dashboard"
                    label="Dashboard"
                    icon={ChartColumnStacked}
                />
                <SidebarLink
                    name="koperasi"
                    label="Profil Koperasi"
                    icon={Handshake}
                />
                <SidebarLink name="anggota" label="Manajemen Anggota" icon={Users} />
                <SidebarLink
                    name="transaksi"
                    label="Transaksi"
                    icon={Banknote}
                />
                <SidebarLink
                    name="laporan"
                    label="Laporan Bulanan"
                    icon={FileChartColumn}
                />
                <SidebarLink
                    name="pengaturan"
                    label="Pengaturan Akun"
                    icon={Settings}
                />
            </nav>

            {/* 3. Footer Logout */}
            <div className="p-4 border-t border-gray-200">
                <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={18} />
                    <span>Keluar Aplikasi</span>
                </button>
            </div>
        </div>
    );
}
