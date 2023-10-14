interface ButtomProps {
  onClick: () => void;
  styles: string;
  text: string;
}

function Buttom({ onClick, styles, text }: ButtomProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2 text-white rounded-md ${styles}`}
    >
      {text}
    </button>
  );
}

export default Buttom;
