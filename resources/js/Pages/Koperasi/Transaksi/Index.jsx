import Button from "@/Components/SelfMade/Button";
import Dropdown from "@/Components/SelfMade/Dropdown";
import Header from "@/Components/SelfMade/Header";
import ModalDialog from "@/Components/SelfMade/ModalDialog";
import Table from "@/Components/SelfMade/Table";
import TextInput from "@/Components/SelfMade/TextInput";
import UsersLayout from "@/Layouts/UsersLayout";
import { router, useForm } from "@inertiajs/react";
import {
    Banknote,
    Calendar,
    ChevronRightIcon,
    Eye,
    Layers,
    Plus,
    Save,
    Text,
    Trash2,
    User,
    Wallet2,
    X,
} from "lucide-react";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Index({
    auth,
    transaksi,
    anggotaOpt,
    jenisTransaksiOpt,
    filters,
}) {
    const [openModal, setOpenModal] = useState(false);
    const [openShowModal, setOpenShowModal] = useState(false);
    const [selectedTransaksi, setSelectedTransaksi] = useState(null);
    const [params, setParams] = useState({
        search: filters.search || "",
        jenis: filters.jenis || "",
    });

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

    const {
        data,
        setData,
        post,
        delete: destroy,
        isDirty,
        processing,
        errors,
        reset,
    } = useForm({
        id: null,
        anggota_koperasi_id: "",
        nomor_transaksi: "",
        jenis_transaksi: "",
        jumlah: "",
        tanggal_transaksi: "",
        keterangan: "",
    });

    const columns = [
        {
            header: "Nama Anggota",
            render: (item) => (
                <span className="font-bold text-gray-800 text-xs uppercase tracking-tight">
                    {item.anggota_koperasi.nama}
                </span>
            ),
        },
        {
            header: "Jenis Transaksi",
            render: (item) => (
                <span className="font-bold text-gray-800 text-xs uppercase tracking-tight">
                    {item.jenis_transaksi}
                </span>
            ),
        },
        {
            header: "Jumlah",
            render: (item) => (
                <span className="font-bold text-gray-800 text-xs uppercase tracking-tight">
                    {item.jumlah}
                </span>
            ),
        },
        {
            header: "Aksi",
            className: "text-center",
            render: (item) => (
                <span className="font-bold flex justify-center text-gray-800 text-sm uppercase tracking-tight">
                    <button
                        onClick={() => handleShow(item)}
                        className="p-1.5 flex justify-center items-center hover:bg-blue-50 text-blue-900 hover:text-blue-950 transition-all font-semibold rounded-lg"
                    >
                        Lihat Detail{" "}
                        <ChevronRightIcon
                            className="hover:translate-x-1 transition-transform"
                            size={24}
                        />
                    </button>
                </span>
            ),
        },
    ];

    const handleAdd = () => {
        reset();
        setOpenModal(true);
    };

    const handleShow = (item) => {
        setSelectedTransaksi(item);
        setOpenShowModal(true);
    };

    const handleFilter = () => {
        router.get(route("users.transaksi.index"), params, {
            preserveState: true, // 👈 Penting! Biar input gak kehilangan fokus
            replace: true, // Biar gak menumpuk history di browser
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Hapus Transaksi?",
            text: "Data ini tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Ya, Hapus!",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("users.transaksi.destroy", id));
                setOpenShowModal(false);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("users.transaksi.store"), {
            onSuccess: () => {
                setOpenModal(false);
                reset();
            },
        });
    };

    return (
        <UsersLayout auth={auth}>
            <div className="p-6 flex flex-col gap-5">
                <Header title={'Manajemen Transaksi'} desc={'Kelola Seluruh Transaksi Koperasi.'} >
                    <Button icon={Plus} variant="primary" onClick={handleAdd}>
                        Tambah Transaksi
                    </Button>
                </Header>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-wrap items-end gap-4">
                    {/* Input Pencarian */}
                    <div className="flex-1 min-w-[300px]">
                        <TextInput
                            placeholder="Cari No. Transaksi atau Nama Anggota..."
                            value={params.search}
                            onChange={(e) =>
                                setParams({ ...params, search: e.target.value })
                            }
                            className="w-full"
                        />
                    </div>

                    {/* Dropdown Jenis Transaksi */}
                    <Dropdown
                        options={jenisTransaksiOpt}
                        value={params.jenis}
                        onChange={(e) =>
                            setParams({ ...params, jenis: e.target.value })
                        }
                        placeholder="Pilih Jenis Transaksi"
                    ></Dropdown>

                    {/* Tombol Aksi */}
                    <div className="flex gap-2">
                        <Button variant="primary" onClick={handleFilter}>
                            Filter
                        </Button>
                        <button
                            onClick={() => {
                                setParams({ search: "", jenis: "" });
                                router.get(route("users.transaksi.index"));
                            }}
                            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <Table columns={columns} items={transaksi}></Table>
            </div>

            <ModalDialog show={openModal} onClose={() => setOpenModal(false)}>
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="flex justify-end items-center">
                        <button
                            className="text-slate-600 rounded-full p-3 hover:bg-slate-200 transition-all "
                            onClick={() => setOpenModal(false)}
                        >
                            <X size={28} />
                        </button>
                    </div>
                    <h2 className="text-xl font-bold text-slate-950 mb-6">
                        Tambah Transaksi
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Form Input Kamu di Sini */}
                        <Dropdown
                            label={"Anggota Koperasi"}
                            type={"text"}
                            value={data.anggota_koperasi_id}
                            error={errors.anggota_koperasi_id}
                            onChange={(e) =>
                                setData("anggota_koperasi_id", e.target.value)
                            }
                            options={anggotaOpt}
                        />
                        <Dropdown
                            label={"Jenis Transaksi"}
                            type={"text"}
                            value={data.jenis_transaksi}
                            error={errors.jenis_transaksi}
                            onChange={(e) =>
                                setData("jenis_transaksi", e.target.value)
                            }
                            options={jenisTransaksiOpt}
                        />
                        <TextInput
                            label={"Nominal Transaksi"}
                            type={"number"}
                            value={data.jumlah}
                            error={errors.jumlah}
                            onChange={(e) => setData("jumlah", e.target.value)}
                        />
                        <TextInput
                            label={"Tanggal Transaksi"}
                            type={"date"}
                            value={data.tanggal_transaksi}
                            error={errors.tanggal_transaksi}
                            onChange={(e) =>
                                setData("tanggal_transaksi", e.target.value)
                            }
                        />
                        <TextInput
                            label={"Keterangan"}
                            type={"text"}
                            value={data.keterangan}
                            error={errors.keterangan}
                            onChange={(e) =>
                                setData("keterangan", e.target.value)
                            }
                        />
                    </div>

                    <div className="mt-8 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => setOpenModal(false)}
                            className="..."
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing || !isDirty}
                            className={`py-2 px-3 rounded-lg flex justify-center items-center gap-3 font-semibold text-xs uppercase tracking-[0.2em] transition-all
                                    ${
                                        !isDirty || processing
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-950 text-white hover:bg-blue-900 shadow-xl"
                                    }`}
                        >
                            <Save size={20} /> Simpan Perubahan
                        </button>
                    </div>
                </form>
            </ModalDialog>

            <ModalDialog
                show={openShowModal}
                onClose={() => setOpenShowModal(false)}
            >
                <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-950 ">
                            Detail Transaksi
                        </h2>
                        <button
                            className="text-slate-600 rounded-full p-3 hover:bg-slate-200 transition-all "
                            onClick={() => setOpenShowModal(false)}
                        >
                            <X size={28} />
                        </button>
                    </div>

                    {selectedTransaksi && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <InfoItem
                                    label="Nomor Transaksi"
                                    value={selectedTransaksi.nomor_transaksi}
                                    icon={<Banknote />}
                                />
                                <InfoItem
                                    label="Anggota Koperasi"
                                    value={
                                        selectedTransaksi.anggota_koperasi.nama
                                    }
                                    icon={<User />}
                                />
                                <InfoItem
                                    label="Jenis Transaksi"
                                    value={selectedTransaksi.jenis_transaksi}
                                    icon={<Layers />}
                                />
                                <InfoItem
                                    label="Jumlah Nominal Transaksi"
                                    value={selectedTransaksi.jumlah}
                                    icon={<Wallet2 />}
                                />
                                <InfoItem
                                    label="Tanggal Transaksi"
                                    value={formatTanggal(
                                        selectedTransaksi.tanggal_transaksi,
                                    )}
                                    icon={<Calendar />}
                                />
                                <InfoItem
                                    label="Keterangan"
                                    value={selectedTransaksi.keterangan}
                                    icon={<Text />}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex justify-start items-center mt-8">
                        <button className="py-2 px-2 rounded-lg flex items-center justify-center gap-3 border-2 border-red-900 text-red-900 hover:bg-red-900 hover:text-white transition-all font-semibold bg-red-100" onClick={() => handleDelete(selectedTransaksi.id)}>
                            <Trash2 size={20} /> Hapus Transaksi
                        </button>
                    </div>
                </div>
            </ModalDialog>
        </UsersLayout>
    );
}

// Komponen Kecil untuk Baris Informasi agar rapi
function InfoItem({ label, value, icon }) {
    return (
        <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-50 rounded-2xl text-gray-500">
                {React.cloneElement(icon, { size: 18 })}
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">
                    {label}
                </p>
                <p className="text-sm font-bold text-gray-800">
                    {value || "-"}
                </p>
            </div>
        </div>
    );
}
