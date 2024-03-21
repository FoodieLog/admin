interface ButtonProps {
  onClick: () => void;
  styles: string;
  text: string;
  disabled?: boolean;
}

function Button({ onClick, styles, text, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2 text-white rounded-md ${styles} ${
        rest.disabled ? "bg-gray-400" : ""
      }`}
      {...rest}
    >
      {text}
    </button>
  );
}

export default Button;
