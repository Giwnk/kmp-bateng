import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({auth}) {
    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard Dinas
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="text-gray-900">
                <h3>Selamat Datang, Admin {auth.user.name}! 👋</h3>
                <p className="mt-2 text-gray-600">
                    Ini adalah area kekuasaanmu.
                </p>

                {/* Content dashboard lainnya di sini... */}
            </div>
        </AdminLayout>
    );
}
