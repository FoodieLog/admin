import { ModalProps } from "@/types";

function Modal({ children }: ModalProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 w-screen h-screen">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
