export function FallbackPlanets() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full opacity-60 blur-xl animate-pulse" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.55) 0%, rgba(201,168,76,0.05) 55%, transparent 75%)' }} />
      <div className="absolute top-[16%] right-[8%] w-[280px] h-[280px] rounded-full opacity-55 blur-lg animate-pulse" style={{ animationDelay: '400ms', background: 'radial-gradient(circle, rgba(107,79,26,0.7) 0%, rgba(107,79,26,0.08) 55%, transparent 75%)' }} />
      <div className="absolute bottom-[8%] left-[22%] w-[220px] h-[220px] rounded-full opacity-50 blur-lg animate-pulse" style={{ animationDelay: '900ms', background: 'radial-gradient(circle, rgba(6,182,212,0.38) 0%, rgba(6,182,212,0.06) 55%, transparent 75%)' }} />
    </div>
  );
}
