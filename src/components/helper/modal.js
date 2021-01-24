import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
    return isOpen ? ReactDOM.createPortal(
        <>
            <div className="modal-overlay open" />
            <div className="modal-wrapper">
                <div className="modal">
                    <button  className="modal-close-button" onClick={onClose}>X</button>
                    {children}

                </div>
            </div>
        </>, document.body
    ) : null;
}

export default Modal;