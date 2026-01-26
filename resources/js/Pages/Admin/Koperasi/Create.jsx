import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import axios from "axios";
import { Save, ArrowLeft } from "lucide-react";
import IdentityCard from "@/Components/SelfMade/Section/IdentitySection";
import MapSection from "@/Components/SelfMade/Section/MapSection";
import ContactSection from "@/Components/SelfMade/Section/ContactSection";
import StatusSection from "@/Components/SelfMade/Section/StatusSection";

export default function Create({ auth, kecamatanOpt, jenisUsahaOpt }) {
    // --- 1. STATE & FORM SETUP ---
    const [desaOptions, setDesaOptions] = useState([]);

    const { data, setData, post, processing, errors } = useForm({
        // A. Identitas
        // --- 1. IDENTITAS ---
        nama: "",
        nomor_induk: "", // 👈 Ganti dari no_induk
        nomor_ahu: "", // 👈 Ganti dari no_ahu
        tanggal_ahu: "", // 👈 Ganti dari tgl_ahu
        tanggal_berdiri: "", // 👈 Ganti dari tgl_berdiri
        tahun_pembentukan: "", // 👈 Ganti dari thn_pembentukan

        // --- 2. LOKASI ---
        kecamatan_id: "",
        desa_id: "",
        alamat: "",
        latitude: "",
        longitude: "",

        // --- 3. STATUS (Boolean) ---
        status_operasional: false, // 👈 Ganti dari status_ops
        status_pelatihan: false,
        status_sertifikat: false,

        // --- 4. KONTAK ---
        email: "",
        no_telepon: "", // 👈 Ganti dari telepon
        website: "",

        // --- 5. SOSMED ---
        link_facebook: "", // 👈 Ganti dari fb
        link_instagram: "", // 👈 Ganti dari ig
        link_youtube: "", // 👈 Ganti dari yt
        link_tiktok: "", // 👈 Ganti dari tiktok

        // --- 6. PIVOT ---
        jenis_usaha_ids: [], // Sudah benar array
    });

    // --- 2. LOGIC DROP DOWN BERANTAI (AXIOS) ---
    useEffect(() => {
        if (data.kecamatan_id) {
            setData("desa_id", ""); // Reset desa pas ganti kecamatan
            setDesaOptions([]); // Kosongin opsi

            // Panggil API Internal
            axios
                .get(route("admin.api.getDesa", data.kecamatan_id))
                .then((res) => setDesaOptions(res.data))
                .catch((err) => console.error(err));
        }
    }, [data.kecamatan_id]);

    // --- 3. SUBMIT ---
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.koperasi.store"));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Tambah Koperasi Baru" />

            {/* --- HEADER --- */}
            <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Link
                        href={route("admin.koperasi.index")}
                        className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-200 transition-all"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-bold text-blue-950">
                        Tambah Koperasi
                    </h1>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="max-w-7xl mx-auto space-y-6 pb-20"
            >
                {/* ==========================================
                    KARTU 1: IDENTITAS & LEGALITAS
                   ========================================== */}
                <IdentityCard
                    data={data}
                    setData={setData}
                    errors={errors}
                    jenisUsahaOpt={jenisUsahaOpt}
                ></IdentityCard>

                {/* ==========================================
                    KARTU 2: LOKASI (Dependent Dropdown)
                   ========================================== */}
                <MapSection
                    data={data}
                    setData={setData}
                    kecamatanOpt={kecamatanOpt}
                    desaOptions={desaOptions}
                    errors={errors}
                ></MapSection>

                {/* ==========================================
                    KARTU 3: STATUS OPERASIONAL (Checkbox)
                   ========================================== */}
                <StatusSection
                    data={data}
                    setData={setData}
                    errors={errors}
                ></StatusSection>

                {/* ==========================================
                    KARTU 4: KONTAK & JEJAK DIGITAL
                   ========================================== */}
                <ContactSection data={data} setData={setData} errors={errors} />

                {/* --- TOMBOL ACTION --- */}
                <div className="flex justify-end gap-3 pt-6">
                    <Link
                        href={route("admin.koperasi.index")}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        onSubmit={handleSubmit}
                        disabled={processing}
                        className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition font-bold shadow-lg flex items-center gap-2"
                    >
                        <Save size={20} />
                        {processing ? "Menyimpan..." : "Simpan Data Koperasi"}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
