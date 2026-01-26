import React, { useState } from "react"; // 👈 Import useState
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/SelfMade/WilayahModal"; // 👈 Import Modal Sakti tadi
import { Head, useForm, router } from "@inertiajs/react";
import { Building2, Edit3, MapPin, Trash2 } from "lucide-react";
import Pagination from "@/Components/SelfMade/Pagination";
import KecamatanCard from "@/Components/SelfMade/KecamatanCard";
import Dropdown from "@/Components/SelfMade/Dropdown";
import TextInput from "@/Components/SelfMade/TextInput";

// 👇 Props 'list_wilayah' otomatis dikirim dari Controller tadi
export default function Index({ auth, wilayah, kecamatanOpt }) {
    // Cek di console biar yakin datanya masuk
    console.log("Data dari BE:", wilayah);

    // 1. STATE MODAL dan MODE EDIT
    const [isEditKecamatanMode, setIsEditKecamatanMode] = useState(false); // Buat Kecamatan
    const [editKecamatanId, setEditKecamatanId] = useState(null);

    // 👇 INI YANG BARU: Buat Desa
    const [isEditDesaMode, setIsEditDesaMode] = useState(false);
    const [editDesaId, setEditDesaId] = useState(null);

    const [modalKecamatanOpen, setModalKecamatanOpen] = useState(false);
    const [modalDesaOpen, setModalDesaOpen] = useState(false);

    // --- FORM INERTIA ---
    const formKecamatan = useForm({ nama: "" });

    const formDesa = useForm({
        kecamatan_id: "",
        nama: "",
    });

    // --- HANDLERS ---
    const openCreateKecamatan = () => {
        setIsEditKecamatanMode(false);
        setEditKecamatanId(null);
        formKecamatan.reset();
        formKecamatan.clearErrors();
        setModalKecamatanOpen(true);
    };

    const openEditKecamatan = (item) => {
        setIsEditKecamatanMode(true);
        setEditKecamatanId(item);
        formKecamatan.setData({
            nama: item.nama,
        });
        formKecamatan.clearErrors();
        setModalKecamatanOpen(true);
    };

    const openCreateDesa = () => {
        setIsEditDesaMode(false);
        setEditDesaId(null);
        formDesa.reset();
        formDesa.clearErrors();
        setModalDesaOpen(true);
    };

    const openEditDesa = (item) => {
        setIsEditDesaMode(true);
        setEditDesaId(item);
        formDesa.setData({
            kecamatan_id: item.kecamatan_id,
            nama: item.nama,
        });
        formKecamatan.clearErrors();
        setModalDesaOpen(true);
    };

    const submitKecamatan = (e) => {
        e.preventDefault();
        if (isEditKecamatanMode) {
            formKecamatan.put(
                route("admin.kecamatan.update", editKecamatanId),
                {
                    onSuccess: () => {
                        setModalKecamatanOpen(false);
                        formKecamatan.reset();
                    },
                },
            );
        } else {
            formKecamatan.post(route("admin.kecamatan.store"), {
                onSuccess: () => {
                    setModalKecamatanOpen(false);
                    formKecamatan.reset();
                },
            });
        }
    };

    const submitDesa = (e) => {
        e.preventDefault();
        if (isEditDesaMode) {
            formDesa.put(route("admin.desa.update", editDesaId), {
                onSuccess: () => {
                    setModalDesaOpen(false);
                    formDesa.reset();
                },
            });
        } else {
            formDesa.post(route("admin.desa.store"), {
                onSuccess: () => {
                    setModalDesaOpen(false);
                    formDesa.reset();
                },
            });
        }
    };

    const handleDelete = (url, message) => {
        if (confirm(message || "Yakin mau hapus data ini?")) {
            router.delete(url);
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800">
                    Manajemen Wilayah Bangka Tengah
                </h2>
            }
        >
            <Head title="Data Wilayah" />

            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Tombol Tambah */}
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="font-bold text-xl text-blue-950">
                            Wilayah
                        </h1>
                        <div className=" flex gap-4">
                            <button
                                onClick={openCreateKecamatan}
                                className="bg-white text-blue-950 px-4 py-2 rounded-lg hover:bg-blue-950 border-2 border-blue-950 hover:text-white transition"
                            >
                                + Tambah Kecamatan
                            </button>
                            <button
                                onClick={openCreateDesa}
                                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition"
                            >
                                + Tambah Desa
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Cek apakah data ada */}
                        {wilayah.data.length > 0 ? (
                            wilayah.data.map((kec) => (
                                <KecamatanCard
                                    key={kec.id}
                                    item={kec}
                                    onEdit={() => openEditKecamatan(kec)}
                                    onDelete={() =>
                                        handleDelete(
                                            route(
                                                "admin.kecamatan.destroy",
                                                kec.id,
                                            ),
                                            "Hapus kecamatan ini beserta semua desanya?",
                                        )
                                    }
                                    onEditDesa={(desaId) =>
                                        openEditDesa(desaId)
                                    }
                                    onDeleteDesa={(desaId) =>
                                        handleDelete(
                                            route("admin.desa.destroy", desaId),
                                            "Hapus Desa Ini?",
                                        )
                                    }
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                Belum ada data kecamatan.
                            </div>
                        )}
                    </div>

                    <div className="mt-8">
                        {/* Kita kirim props 'links' dari object pagination Laravel */}
                        <Pagination links={wilayah.links} />
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalKecamatanOpen}
                onClose={() => setModalKecamatanOpen(false)}
                // Judul berubah sesuai mode
                title={
                    isEditKecamatanMode
                        ? "Edit Kecamatan"
                        : "Tambah Kecamatan Baru"
                }
            >
                <form onSubmit={submitKecamatan} className="space-y-5">
                    <TextInput
                        label={"Nama Kecamatan"}
                        type={"text"}
                        value={formKecamatan.data.nama}
                        onChange={(e) =>
                            formKecamatan.setData("nama", e.target.value)
                        }
                        placeholder="Contoh: Koba"
                        error={formKecamatan.errors.nama}
                    ></TextInput>

                    <div className="flex justify-end gap-4">
                        <button
                            className="px-4 py-2 bg-gray-100 text-red-700 rounded-lg hover:bg-red-700 hover:text-white border-2 border-red-700  transition text-sm font-medium"
                            type="button"
                            onClick={() => setModalKecamatanOpen(false)}
                        >
                            Batal
                        </button>

                        {/* Tombol Submit berubah label */}
                        <button
                            className="bg-blue-900 hover:bg-blue-950 transition-all text-white px-4 py-2 rounded-lg"
                            type="submit"
                            disabled={formKecamatan.processing}
                        >
                            {formKecamatan.processing
                                ? "Loading..."
                                : isEditKecamatanMode
                                  ? "Update Perubahan"
                                  : "Simpan Data"}
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal
                isOpen={modalDesaOpen}
                onClose={() => setModalDesaOpen(false)}
                // Judul berubah sesuai mode
                title={isEditDesaMode ? "Edit Desa" : "Tambah Desa Baru"}
            >
                <form onSubmit={submitDesa} className="space-y-4">
                    {/* INPUT KECAMATAN (Pake list_kecamatan_full biar lengkap) */}

                    <Dropdown
                        label={"Nama Kecamatan"}
                        name={"kecamatan_id"}
                        key={"kecamatan_id"}
                        value={formDesa.data.kecamatan_id}
                        onChange={(e) =>
                            formDesa.setData("kecamatan_id", e.target.value)
                        }
                        placeholder="-- Pilih Kecamatan --"
                        options={kecamatanOpt}
                        error={formDesa.errors.kecamatan_id}
                    ></Dropdown>

                    {/* INPUT NAMA DESA */}
                    <TextInput
                        label={"Nama Desa"}
                        type={"text"}
                        value={formDesa.data.nama}
                        onChange={(e) =>
                            formDesa.setData("nama", e.target.value)
                        }
                        placeholder="Contoh: Simpang Perlang"
                        error={formDesa.errors.nama}
                    ></TextInput>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
                        <button
                            type="button"
                            onClick={() => setModalDesaOpen(false)}
                            className="px-4 py-2 bg-gray-100 text-red-700 rounded-lg hover:bg-red-700 hover:text-white border-2 border-red-700  transition text-sm font-medium"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={formDesa.processing}
                            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition text-sm font-medium shadow-sm disabled:opacity-50"
                        >
                            {formDesa.processing ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
