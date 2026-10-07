import styles from "./Button.module.css";

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
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
