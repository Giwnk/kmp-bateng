import { Link } from "@inertiajs/react";
import { Edit2, EditIcon, Eye, Trash2 } from "lucide-react";

export function ShowButton({ showRoute = null }) {
    return (
        <div>
            {showRoute && (
                <Link
                    href={showRoute}
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-900 hover:text-blue-100  focus:ring-2 focus:outline-none focus:ring-blue-300 transition duration-150"
                >
                    <Eye size={16} />
                </Link>
            )}
        </div>
    );
}

export function EditButton({ editRoute = null }) {
    return (
        <div>
            {editRoute && (
                <Link
                    href={editRoute}
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-amber-700 bg-amber-100 rounded-lg hover:bg-amber-700 hover:text-amber-100  focus:ring-2 focus:outline-none focus:ring-amber-300 transition duration-150"
                >
                    <EditIcon size={16} />
                </Link>
            )}
        </div>
    );
}

export function DeleteButton({ deleteRoute = null }) {
    return (
        <div>
            {deleteRoute && (
                <button
                    onClick={deleteRoute}
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-red-900 bg-red-100 rounded-lg hover:bg-red-900 hover:text-red-100  focus:ring-2 focus:outline-none focus:ring-red-300 transition duration-150"
                >
                    <Trash2 size={16} />
                </button>
            )}
        </div>
    );
}

