import { heroStats } from "@/data/site/hero";

export function HeroStats() {
  return (
    <div className="mx-auto max-w-[1200px] px-8 font-sans">
      <div className="relative z-[5] -mt-6 sm:-mt-8 grid grid-cols-2 overflow-hidden rounded-xl border border-[#E3DFD5] bg-white shadow-[0_16px_40px_rgba(20,22,24,0.08)] md:grid-cols-4">
        {heroStats.map((st, i) => (
          <div
            key={st.label}
            className={`px-[30px] py-[26px] ${
              i % 2 !== 0 ? "border-l border-[#E3DFD5]" : ""
            } ${i >= 2 ? "border-t border-[#E3DFD5] md:border-t-0" : ""} ${
              i !== 0 ? "md:border-l md:border-[#E3DFD5]" : ""
            }`}
          >
            <div className="font-serif text-[34px] font-semibold leading-none text-[#0A2540]">
              {st.value}
            </div>
            <div className="mt-2 text-[12px] uppercase tracking-[0.1em] text-[#6E7178]">
              {st.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}