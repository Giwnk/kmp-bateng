import KoperasiCard from "@/Components/SelfMade/Cards/KoperasiCard";
import Pagination from "@/Components/SelfMade/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react"; // 👈 Import router
import Swal from "sweetalert2";
import { Building2, Eye, MapPin, Pencil, Trash2 } from "lucide-react";
import Table from "@/Components/SelfMade/Table";
import {
    DeleteButton,
    EditButton,
    ShowButton,
} from "@/Components/SelfMade/ActionButton";

export default function Index({ auth, koperasis, kecamatans, desas }) {
    const handleDelete = (id, nama) => {
        Swal.fire({
            title: `Hapus ${nama}?`,
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                // 👇 Panggil Route Destroy
                router.delete(route("admin.koperasi.destroy", id), {
                    onSuccess: () => {
                        Swal.fire(
                            "Terhapus!",
                            "Data koperasi berhasil dihapus.",
                            "success",
                        );
                    },
                });
            }
        });
    };

    const columns = [
        {
            header: "Nama Koperasi",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center text-slate-600">
                        <Building2 size={20} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-900">
                            {item.nama}
                        </div>
                        <div className="text-xs text-gray-500">
                            NIK: {item.nomor_induk}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            header: "Wilayah",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-700">
                        {item?.kecamatan?.nama} - {item?.desa?.nama}
                    </span>
                </div>
            ),
        },
        {
            header: "Status",
            render: (item) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status_operasional
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {item.status_operasional ? "AKTIF" : "NON-AKTIF"}
                </span>
            ),
        },
        {
            header: "Aksi",
            className: "text-right",
            render: (item) => (
                <div className="flex justify-end gap-2">
                    <ShowButton showRoute={route("admin.koperasi.show", item.id)} />
                    <EditButton editRoute={route("admin.koperasi.edit", item.id)} />
                    <DeleteButton
                        deleteRoute={() => handleDelete(item.id, item.nama)}
                    />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout user={auth.user}>
            <Head title="Koperasi Merah Putih" />
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <div className="">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Manajemen Koperasi Merah Putih
                        </h1>
                        <p className="text-sm text-gray-500">
                            Kelola seluruh data dari setiap koperasi
                        </p>
                    </div>
                    <div className=" flex ">
                        <Link
                            href={route("admin.koperasi.create")}
                            className="bg-blue-950 font-semibold text-white px-4 py-2 h-[45px] flex justify-center items-center rounded-xl hover:bg-blue-900 transition"
                        >
                            + Tambah Koperasi
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table columns={columns} items={koperasis}></Table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
