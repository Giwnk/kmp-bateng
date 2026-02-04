import Dropdown from "@/Components/SelfMade/Dropdown";
import InputError from "@/Components/InputError";
import UsersLayout from "@/Layouts/UsersLayout";
import { useForm, Link } from "@inertiajs/react";
import { ArrowLeft, ImageIcon, UploadCloud, Save } from "lucide-react";
import TextInput from "@/Components/SelfMade/TextInput";
import UpImage from "@/Components/SelfMade/UpImage";
import { useState } from "react";

export default function Create({ auth, jabatanOpt, statusOpt }) {
    const kategoriOpt = ['Pengurus Koperasi', 'Pengawas Koperasi']
    const { data, setData, post, processing, errors, isDirty } = useForm({
        _method: "POST", // Digunakan agar bisa kirim file (foto) via POST namun dibaca PUT oleh Laravel
        nama: "",
        nik: "",
        kategori: "",
        tanggal_bergabung: "",
        jabatan: "",
        alamat: "",
        nomor_telepon: "",
        email: "",
        status: "Aktif",
        foto: null,
    });

    const [preview, setPreview] = useState(
            data.foto ? `/storage/${data.foto}` : null,
        );

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Set data form dengan objek File baru
            setData("foto", file);
            // Buat preview lokal dari file yang baru dipilih
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        // Menggunakan post dengan _method PUT karena PHP/Laravel memiliki kendala
        // membaca data 'multipart/form-data' langsung via metode PUT asli.
        post(route("users.sdm.store"));
    };

    return (
        <UsersLayout auth={auth}>
            <div className="p-8 space-y-8 max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center gap-6">
                    <Link
                        href={route("users.sdm.index")}
                        className="p-4 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm hover:bg-gray-50 transition-all text-gray-400 hover:text-gray-900"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 tracking-tighter leading-none">
                            Tambah SDM
                        </h1>
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Sisi Kiri: Foto & Status */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm text-center">
                            <UpImage onFileChange={handleFileChange} error={errors.foto} preview={preview}/>
                            <Dropdown
                                options={statusOpt}
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                label={"Pilih Status"}
                                className="font-medium flex items-start"
                                error={errors.status}
                            />
                        </div>
                    </div>

                    {/* Sisi Kanan: Detail Data */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                            {/* Baris 1: Nama & NIK */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextInput
                                    type="text"
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                    label={"Nama Lengkap"}
                                    error={errors.nama}
                                />
                                <TextInput
                                    type="text"
                                    value={data.nik}
                                    onChange={(e) =>
                                        setData("nik", e.target.value)
                                    }
                                    label={"NIK (16 Digit)"}
                                    error={errors.nik}
                                />
                            </div>

                            {/* Baris 2: Kategori & Tanggal Bergabung */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Dropdown
                                    value={data.kategori}
                                    onChange={(e) =>
                                        setData("kategori", e.target.value)
                                    }
                                    label={"Pilih Kategori"}
                                    options={kategoriOpt}
                                    error={errors.kategori}
                                />
                                <TextInput
                                    type={"date"}
                                    value={data.tanggal_bergabung}
                                    onChange={(e) =>
                                        setData(
                                            "tanggal_bergabung",
                                            e.target.value,
                                        )
                                    }
                                    label={"Tanggal Bergabung"}
                                    error={errors.tanggal_bergabung}
                                ></TextInput>
                            </div>

                            {/* Baris 3: Jabatan & Telepon */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Dropdown
                                    value={data.jabatan}
                                    onChange={(e) =>
                                        setData("jabatan", e.target.value)
                                    }
                                    label={"Pilih Jabatan"}
                                    options={jabatanOpt}
                                    error={errors.jabatan}
                                />
                                <TextInput
                                    type={"text"}
                                    value={data.nomor_telepon}
                                    onChange={(e) =>
                                        setData("nomor_telepon", e.target.value)
                                    }
                                    label={"Nomor Telepon"}
                                    error={errors.nomor_telepon}
                                ></TextInput>
                            </div>

                            {/* Baris 4: Email & Alamat */}
                            <div className="space-y-6">
                                <TextInput
                                    type={"email"}
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    label={"Email"}
                                    error={errors.email}
                                ></TextInput>
                                <TextInput
                                    type={"text"}
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData("alamat", e.target.value)
                                    }
                                    label={"Alamat"}
                                    error={errors.alamat}
                                ></TextInput>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={processing || !isDirty}
                                    className={`w-full py-4 rounded-2xl flex justify-center items-center gap-3 font-semibold text-xs uppercase tracking-[0.2em] transition-all
                                    ${
                                        !isDirty || processing
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-950 text-white hover:bg-blue-900 shadow-xl"
                                    }`}
                                >
                                    <Save size={18} />
                                    {processing
                                        ? "Proses..."
                                        : "Simpan Perubahan"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </UsersLayout>
    );
}
