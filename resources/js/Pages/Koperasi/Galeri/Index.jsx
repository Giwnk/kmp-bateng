import React, { useState } from "react";
import UsersLayout from "@/Layouts/UsersLayout";
import Header from "@/Components/SelfMade/Header";
import Button from "@/Components/SelfMade/Button";
import ModalDialog from "@/Components/SelfMade/ModalDialog";
import { useForm, router } from "@inertiajs/react";
import { Plus, Trash2, Image as ImageIcon, X } from "lucide-react";

export default function Index({ auth, galeri }) {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // Untuk fitur Zoom/Preview

    // 1. Form setup untuk upload foto
    const { data, setData, post, processing, reset, errors } = useForm({
        foto: null,
        keterangan: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("users.galeri.store"), {
            onSuccess: () => {
                setOpenAddModal(false);
                reset();
            },
            forceFormData: true, // Penting untuk upload file!
        });
    };

    const handleDelete = (id) => {
        if (confirm("Yakin mau hapus foto ini dari kenangan? 😢")) {
            router.delete(route("users.galeri.destroy", id));
        }
    };

    return (
        <UsersLayout auth={auth}>
            <div className="p-6 space-y-8">
                <Header
                    title="Galeri Koperasi"
                    desc="Dokumentasi kegiatan dan aset koperasi."
                >
                    <Button icon={Plus} onClick={() => setOpenAddModal(true)}>
                        Unggah Foto
                    </Button>
                </Header>

                {/* --- 2. GRID FOTO --- */}
                {galeri.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {galeri.data.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 transition-all hover:shadow-xl"
                            >
                                {/* Preview Foto */}
                                <div
                                    className="aspect-square overflow-hidden bg-slate-100 cursor-pointer"
                                    onClick={() => setSelectedImage(item)}
                                >
                                    <img
                                        src={`/storage/${item.foto_path}`}
                                        alt={item.keterangan}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Overlay Aksi (Hanya muncul saat hover) */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                {/* Keterangan */}
                                <div className="p-4">
                                    <p className="text-sm font-medium text-slate-700 line-clamp-2">
                                        {item.keterangan || "Tanpa keterangan"}
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-widest">
                                        {new Date(
                                            item.created_at,
                                        ).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
                        <ImageIcon size={48} className="mb-4 opacity-20" />
                        <p className="font-medium">
                            Belum ada foto yang diunggah.
                        </p>
                    </div>
                )}

                {/* --- 3. PAGINATION (Sederhana) --- */}
                <div className="flex justify-center mt-8 gap-2">
                    {galeri.links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url || link.active}
                            onClick={() => router.get(link.url)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                link.active
                                    ? "bg-blue-950 text-white"
                                    : "bg-white text-slate-600 hover:bg-slate-100"
                            } ${!link.url && "opacity-30 cursor-not-allowed"}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>

            {/* --- MODAL ADD PHOTO --- */}
            <ModalDialog
                show={openAddModal}
                onClose={() => setOpenAddModal(false)}
            >
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <h2 className="text-2xl font-bold tracking-tighter">
                        Unggah Foto Baru
                    </h2>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Pilih File Foto
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setData("foto", e.target.files[0])}
                            className="w-full p-3 border-2 border-dashed border-slate-200 rounded-2xl file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {errors.foto && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.foto}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Keterangan
                        </label>
                        <textarea
                            value={data.keterangan}
                            onChange={(e) =>
                                setData("keterangan", e.target.value)
                            }
                            className="w-full rounded-2xl border-slate-200 text-sm focus:ring-blue-950 min-h-[100px]"
                            placeholder="Ceritakan momen ini..."
                        />
                        {errors.keterangan && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.keterangan}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <Button
                            className="flex-1"
                            variant="outline"
                            onClick={() => setOpenAddModal(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            className="flex-1"
                            type="submit"
                            disabled={processing}
                        >
                            Simpan Foto
                        </Button>
                    </div>
                </form>
            </ModalDialog>

            {/* --- MODAL PREVIEW (LightBox) --- */}
            <ModalDialog
                show={!!selectedImage}
                onClose={() => setSelectedImage(null)}
            >
                {selectedImage && (
                    <div className="relative p-2">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black transition-all"
                        >
                            <X size={20} />
                        </button>
                        <img
                            src={`/storage/${selectedImage.foto_path}`}
                            className="w-full rounded-2xl max-h-[80vh] object-contain"
                        />
                        <div className="p-4 bg-white rounded-b-2xl">
                            <p className="text-slate-900 font-medium">
                                {selectedImage.keterangan}
                            </p>
                        </div>
                    </div>
                )}
            </ModalDialog>
        </UsersLayout>
    );
}
