import { ModalProps } from "@/types";

function Modal({ children }: ModalProps) {
  return (
    <div className="w-screen h-screen flex justify-center items-center fixed  z-50 bg-white bg-opacity-50">
      <div className="w-full max-w-md max-h-full">
        <div className="bg-white rounded-lg border border-gray-300 shadow p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
