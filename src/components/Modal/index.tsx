import React from "react";
import ReactDOM from "react-dom";
import { ModalProps } from "@/types";

function Modal({ children }: ModalProps) {
  const modalRoot = document.getElementById("modal-root");
  const modalContent = (
    <div className="w-screen h-screen flex justify-center items-center fixed z-50 bg-white bg-opacity-50">
      <div className="w-full max-w-md max-h-full">
        <div className="bg-white rounded-lg border border-gray-300 shadow p-5">
          {children}
        </div>
      </div>
    </div>
  );

  return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null;
}

export default Modal;
