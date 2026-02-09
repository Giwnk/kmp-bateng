export default function StatCard({ title, value, unit, icon: Icon, color }) {
    return (
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col items-start gap-5 hover:scale-[1.02] transition-all">
            <div className={`p-3 rounded-2xl ${color}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                    {title}
                </p>
                <h3 className="text-2xl font-bold text-slate-950 leading-none">
                    {value}
                </h3>
                <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-tighter">
                    {unit}
                </p>
            </div>
        </div>
    );
}
