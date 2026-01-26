export default function Checkbox({
    type,
    label,
    name,
    className,
    checked,
    ...props
}) {
    return (
        <div
            className={`flex items-center py-2 px-4 border-blue-950 border-2 rounded-full justify-center ${className}`}
        >
            {label && (
                <label
                    htmlFor={name}
                    className="text-sm font-medium items-center flex gap-3 cursor-pointer justify-center text-blue-950"
                >
                    <input
                        type="checkbox"
                        name={name}
                        checked={checked}
                        id={name}
                        className="flex items-center transition-all border-blue-900 border-2 cursor-pointer text-blue-900 focus:ring-blue-900 rounded-full w-6 h-6"
                        {...props}
                    />
                    <div className="font-medium text-sm text-gray-700">
                        {label}
                    </div>
                </label>
            )}
        </div>
    );
}
