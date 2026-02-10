import React from "react";
import SidebarUsers from "@/Components/SelfMade/SidebarAdmin";
import {
    Banknote,
    FileBarChart2,
    Handshake,
    ImageIcon,
    LayoutDashboard,
    Settings,
    Users,
    UserStarIcon,
} from "lucide-react";

export default function UsersLayout({ auth, user, header, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const usersMenu = [
        {
            label: "Dashboard",
            route: route("users.dashboard"),
            active: "users.dashboard",
            icon: <LayoutDashboard size={20} />,
        },
        {
            label: "Profil Koperasi",
            route: route("users.koperasi.show", auth.user.koperasi_id),
            active: "users.koperasi.*",
            icon: <Handshake size={20} />,
        },
        {
            label: "Manajemen Anggota",
            route: route("users.anggota.index", auth.user.koperasi_id),
            active: "users.anggota.*",
            icon: <Users size={20} />,
        },
        {
            label: "Manajemen Pengurus",
            route: route("users.sdm.index", auth.user.koperasi_id),
            active: "users.sdm.*",
            icon: <UserStarIcon size={20} />,
        },
        {
            label: "Transaksi Keuangan",
            route: route("users.transaksi.index", auth.user.koperasi_id),
            active: "users.transaksi.*",
            icon: <Banknote size={20} />,
        },
        {
            label: "Laporan Bulanan",
            route: route("users.laporan.index", auth.user.koperasi_id),
            active: "users.laporan.*",
            icon: <FileBarChart2 size={20} />,
        },
        {
            label: "Galeri Koperasi",
            route: route("users.galeri.index", auth.user.koperasi_id),
            active: "users.galeri.*",
            icon: <ImageIcon size={20} />,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <header className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <LayoutDashboard size={24} />
                    </button>
                    <span className="font-bold text-lg text-gray-800">
                        Panel Anggota
                    </span>
                </div>
            </header>

            {/* Panggil Sidebar, kasih menu Admin */}
            <SidebarUsers
                auth={user}
                menuItems={usersMenu}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            {/* Konten Utama (Disebelah kanan Sidebar) */}
            <main className="md:ml-64 p-4 md:p-8 transition-all duration-300">
                {/* Header Kecil (Opsional) */}
                {header && (
                    <header className="mb-8">
                        <div className="max-w-7xl mx-auto">{header}</div>
                    </header>
                )}

                {/* Isi Halaman (Children) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
