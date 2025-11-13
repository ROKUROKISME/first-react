type ButtonVariant = "submit" | "reset" | "button";

interface BasicButtonProps {
  text: string;
  tipe?: ButtonVariant;
  color: string;
  icon?: string;
  disabled?: boolean;
  extraClass?: string;
}

const BasicButton = ({
  text,
  tipe,
  color,
  icon,
  disabled,
  extraClass,
}: BasicButtonProps) => {
  return (
    <button
      disabled={disabled || false}
      type={tipe}
      className={`btn btn-${color || "primary"} ${extraClass}`}>
      <i className={`bx ${icon} me-1`} />
      {text || "Button"}
    </button>
  );
};

export default BasicButton;
