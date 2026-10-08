const base =
  "uppercase px-4 py-2 font-[inherit] rounded-control cursor-pointer";

const variants = {
  primary: "text-[1.5rem] border-none font-bold bg-brand-2 text-dark-1",
  back: "text-[1.5rem] text-inherit font-semibold bg-transparent border border-current",
  position:
    "text-sm border-none font-bold absolute z-1000 bottom-10 left-1/2 -translate-x-1/2 bg-brand-2 text-dark-1 shadow-[0_0.4rem_1.2rem_rgba(36,42,46,0.16)]",
};

// `type` is the visual variant (primary / back / position).
// `nativeType` is the real HTML button type. It defaults to "button" so a
// Button dropped inside a form doesn't submit it by accident — forms opt in
// explicitly with nativeType="submit".
function Button({
  children,
  onClick,
  type,
  nativeType = "button",
  disabled = false,
}) {
  return (
    <button
      type={nativeType}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[type] ?? ""}`}
    >
      {children}
    </button>
  );
}

export default Button;
