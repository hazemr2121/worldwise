function Spinner() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-15 h-15 rounded-full bg-[conic-gradient(#0000_10%,var(--color-light-2))] [-webkit-mask:radial-gradient(farthest-side,#0000_calc(100%-8px),#000_0)] animate-spinner"></div>
    </div>
  );
}

export default Spinner;
