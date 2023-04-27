import React, { FC } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 py-10 my-30 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="fixed inset-0 transition-opacity" onClick={onClose}>
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="py-4 px-6 pt-10 p-6">
          <div className="flex justify-end">
            <button
              className="text-3xl leading-none hover:text-gray-300"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
