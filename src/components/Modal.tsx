import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, children }:any) => {
    return (
        <div className={`modal ${show ? 'show' : ''}`} onClick={() => handleClose('closeModal')}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header mt-3">
                    <h5 className="modal-title p-0">Etapa Concluída</h5>
                </div>
                <div className="modal-body p-0">{children}</div>
                <div className="modal-footer d-flex justify-content-center align-items-center">
                    <button type="button" className="btn button-modal-home" onClick={() => handleClose('home')}>
                        Home
                    </button>
                    <button type="button" className="btn button-modal" onClick={() => handleClose('nextStep')}>
                        Próxima etapa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
