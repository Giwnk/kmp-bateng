import { SquareUser } from "lucide-react";
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
                <SquareUser /> Kontak
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <TextInput
                    name="email"
                    label={"Email"}
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    error={errors.email}
                    placeholder="koperasi@mail.com"
                />
                <TextInput
                    name="telepon"
                    label={"Nomor Telepon / WA"}
                    value={data.no_telepon}
                    onChange={(e) => setData("no_telepon", e.target.value)}
                    error={errors.no_telepon}
                    placeholder="0821..."
                />
                <div className="col-span-2">
                    <TextInput
                        name="website"
                        label={"Website"}
                        value={data.website}
                        onChange={(e) => setData("website", e.target.value)}
                        error={errors.website}
                        placeholder="https://..."
                    ></TextInput>
                </div>
                <TextInput
                    label={"Tautan Facebook"}
                    name="link_facebook"
                    value={data.link_facebook}
                    onChange={(e) => setData("link_facebook", e.target.value)}
                    error={errors.link_facebook}
                />

                <TextInput
                    label={"Tautan Instagram"}
                    name="link_instagram"
                    value={data.link_instagram}
                    onChange={(e) => setData("link_instagram", e.target.value)}
                    error={errors.link_instagram}
                />

                <TextInput
                    label={"Tautan Youtube"}
                    name="link_youtube"
                    value={data.link_youtube}
                    onChange={(e) => setData("link_youtube", e.target.value)}
                    error={errors.link_youtube}
                />

                <TextInput
                    label="Tautan Tiktok"
                    name="link_tiktok"
                    value={data.link_tiktok}
                    onChange={(e) => setData("link_tiktok", e.target.value)}
                    error={errors.link_tiktok}
                />
            </div>
        </div>
    );
}
