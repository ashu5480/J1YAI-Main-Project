const FundrHubMock = () => (
  <div
    data-testid="fundrhub-mockup"
    className="overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-2xl shadow-cyan-950/30"
    aria-label="Browser mockup of the FundrHub website"
    role="img"
  >
    <div className="flex items-center gap-2 border-b border-white/10 bg-slate-900/80 px-4 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
      <span className="ml-3 flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-400">
        fund-r-hub-web.vercel.app
      </span>
    </div>
    <div className="space-y-5 bg-gradient-to-b from-slate-950 to-[#0a1224] p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600" />
          <span className="h-2 w-16 rounded-full bg-slate-600" />
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-10 rounded-full bg-slate-700" />
          <span className="h-2 w-10 rounded-full bg-slate-700" />
          <span className="h-6 w-16 rounded-full bg-cyan-400/90" />
        </div>
      </div>
      <div className="space-y-2.5 pt-2">
        <span className="block h-3 w-24 rounded-full bg-cyan-400/50" />
        <span className="block h-5 w-4/5 rounded-full bg-slate-300/90" />
        <span className="block h-5 w-3/5 rounded-full bg-slate-400/60" />
        <span className="block h-2.5 w-2/3 rounded-full bg-slate-700" />
      </div>
      <div className="flex gap-3 pt-1">
        <span className="h-8 w-24 rounded-full bg-cyan-400" />
        <span className="h-8 w-24 rounded-full border border-white/20" />
      </div>
      <div className="grid grid-cols-3 gap-3 pt-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-3">
            <span className="block h-7 w-7 rounded-full bg-gradient-to-br from-slate-600 to-slate-800" />
            <span className="block h-2 w-full rounded-full bg-slate-600" />
            <span className="block h-2 w-2/3 rounded-full bg-slate-700" />
            <span className="block h-4 w-12 rounded-full bg-emerald-400/30" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FundrHubMock;
