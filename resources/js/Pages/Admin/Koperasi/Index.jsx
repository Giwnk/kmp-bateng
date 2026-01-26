import KoperasiCard from "@/Components/SelfMade/KoperasiCard";
import Pagination from "@/Components/SelfMade/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { Eye, MapPin, Pencil, Trash2 } from "lucide-react";

export default function Index({ auth, koperasis, kecamatans, desas }) {
    console.log("CEK DATA KOPERASI:", koperasis.data);
    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800">
                    Manajemen Koperasi Merah Putih
                </h2>
            }
        >
            <Head title="Koperasi Merah Putih" />
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="font-bold text-xl text-blue-950">
                        Koperasi
                    </h1>
                    <div className=" flex ">
                        <Link
                            href={route("admin.koperasi.create")}
                            className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition"
                        >
                            + Tambah Koperasi
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            {/* THEAD */}
                            <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-semibold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 border-b">
                                        Identitas Koperasi
                                    </th>
                                    <th className="px-6 py-4 border-b">
                                        Lokasi
                                    </th>
                                    <th className="px-6 py-4 border-b">
                                        Jenis Usaha
                                    </th>
                                    <th className="px-6 py-4 border-b text-center">
                                        Status Ops
                                    </th>
                                    <th className="px-6 py-4 border-b text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            {/* TBODY */}
                            <tbody className="divide-y divide-gray-100">
                                {koperasis.data.length > 0 ? (
                                    koperasis.data.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            {/* 1. KOLOM IDENTITAS (Nama & NIK digabung) */}
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-blue-950 text-base">
                                                    {item.nama}
                                                </div>
                                                <div className="text-xs text-slate-500 mt-1 font-mono">
                                                    NIK: {item.nomor_induk}
                                                </div>
                                            </td>

                                            {/* 2. KOLOM LOKASI */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-start gap-2 text-slate-800 text-sm">
                                                    <MapPin
                                                        size={16}
                                                        className="mt-0.5 text-gray-400"
                                                    />
                                                    <div>
                                                        <span className="block font-medium text-gray-700">
                                                            Kec.{" "}
                                                            {
                                                                item.kecamatan
                                                                    ?.nama
                                                            }
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            Desa{" "}
                                                            {item.desa?.nama}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* 3. KOLOM JENIS USAHA (Looping Tags) */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {item.jenis_usahas &&
                                                        item.jenis_usahas.map(
                                                            (ju) => (
                                                                <span
                                                                    key={ju.id}
                                                                    className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-900 border border-blue-300"
                                                                >
                                                                    {ju.nama}
                                                                </span>
                                                            ),
                                                        )}
                                                    {/* Fallback kalau kosong */}
                                                    {(!item.jenis_usahas ||
                                                        item.jenis_usahas
                                                            .length === 0) && (
                                                        <span className="text-gray-400 text-xs italic">
                                                            - Tidak ada -
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* 4. KOLOM STATUS (Badge) */}
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border
                                                ${
                                                    item.status_operasional
                                                        ? "bg-emerald-50 text-cyan-800 border-emerald-400"
                                                        : "bg-red-50 text-red-700 border-red-200"
                                                }
                                            `}
                                                >
                                                    {item.status_operasional
                                                        ? "AKTIF"
                                                        : "NON-AKTIF"}
                                                </span>
                                            </td>

                                            {/* 5. KOLOM AKSI */}
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    {/* Tombol Detail (Penting krn banyak data yg disembunyikan) */}
                                                    <Link
                                                        href={route(
                                                            "admin.koperasi.show",
                                                            item.id,
                                                        )}
                                                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        title="Lihat Detail"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>

                                                    <Link
                                                        href={route(
                                                            "admin.koperasi.edit",
                                                            item.id,
                                                        )}
                                                        className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <Pencil size={18} />
                                                    </Link>

                                                    <button
                                                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-12 text-center text-gray-400"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <span className="text-4xl">
                                                    📂
                                                </span>
                                                <span className="font-medium">
                                                    Belum ada data koperasi.
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION AREA (Nanti di sini) */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
                        {/* Komponen Pagination kamu nanti ditaruh sini */}
                        <Pagination links={koperasis.links}></Pagination>
                        <p className="text-xs text-gray-500 text-center">
                            Menampilkan {koperasis.from} - {koperasis.to} dari{" "}
                            {koperasis.total} data
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
