export default function FormCreateKoperasi() {
    const kecamatanOpt = [
        { nama: "test 1" },
        { nama: "test 2" },
        { nama: "test 3" },
        { nama: "test 4" },
    ];

    const desaOpt = [
        { nama: "test 1" },
        { nama: "test 2" },
        { nama: "test 3" },
        { nama: "test 4" },
    ];
    return (
        <form
            action=""
            className="bg-slate-700 w-fit px-5 py-2 flex flex-col gap-4"
        >
            {/* Dropdown */}
            <div className="flex gap-5">
                {/* Dropdown Kecamatan */}
                <div className="flex flex-col">
                    <h1>
                        Kecamatan <span className="text-red-800">*</span>
                    </h1>

                    <select className=" border-2 border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900 shadow-sm">
                        <option value="">Pilih Kecamatan</option>

                        {/* Loop list FULL (bukan yg dipaginate) */}
                        {kecamatanOpt.map((kec) => (
                            <option>{kec.nama}</option>
                        ))}
                    </select>
                </div>

                {/* Dropdown Desa */}
                <div className="flex flex-col">
                    <h1>
                        Desa <span className="text-red-800">*</span>
                    </h1>

                    <select className=" border-2 border-gray-300 rounded-lg focus:ring-blue-900 focus:border-blue-900 shadow-sm">
                        <option value="">Pilih Desa</option>

                        {/* Loop list FULL (bukan yg dipaginate) */}
                        {desaOpt.map((kec) => (
                            <option>{kec.nama}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <h1>
                    Nama Koperasi<span className="text-red-800">*</span>
                </h1>
                <input className="w-full" type="text" />
            </div>
        </form>
    );
}
