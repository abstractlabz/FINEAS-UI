// Modal.tsx
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-alternate-color p-5 w-2/5 rounded-lg shadow-lg relative text-white">
                <button onClick={onClose} className="absolute top-2 right-2 text-lg font-semibold text-white hover:text-bg-main-color">X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
