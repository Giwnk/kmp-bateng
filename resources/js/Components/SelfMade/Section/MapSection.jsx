import { MapPin } from "lucide-react";
import Dropdown from "../Dropdown";
import TextInput from "../TextInput";

export default function MapSection({
    data,
    setData,
    errors,
    kecamatanOpt,
    desaOptions,
}) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border w-full border-gray-100 h-full">
            <h2 className="text-lg font-bold text-blue-950 mb-4 border-b flex gap-2 pb-2">
                <MapPin /> Wilayah
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Dropdown
                    name="kecamatan_id"
                    label={"Pilih Kecamatan"}
                    value={data.kecamatan_id}
                    onChange={(e) => setData("kecamatan_id", e.target.value)}
                    error={errors.kecamatan_id}
                    placeholder="-- Pilih Kecamatan --"
                    options={kecamatanOpt}
                />
                <Dropdown
                    name="desa_id"
                    label={"Pilih Desa"}
                    value={data.desa_id}
                    onChange={(e) => setData("desa_id", e.target.value)}
                    error={errors.desa_id}
                    placeholder="-- Pilih Desa --"
                    options={desaOptions}
                />
                <div className="col-span-2">
                    <label className="mb-1 text-sm font-medium text-gray-700">
                        Alamat Lengkap
                    </label>
                    <textarea
                        className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        value={data.alamat}
                        onChange={(e) => setData("alamat", e.target.value)}
                    />
                </div>
                <TextInput
                    label="Latitude"
                    name="latitude"
                    value={data.latitude}
                    onChange={(e) => setData("latitude", e.target.value)}
                    error={errors.latitude}
                />
                <TextInput
                    label="Longitude"
                    name="longitude"
                    value={data.longitude}
                    onChange={(e) => setData("longitude", e.target.value)}
                    error={errors.longitude}
                />
            </div>
        </div>
    );
}
