import React, { useEffect } from 'react';
import './Modal.css';

interface ImageModalProps {
    show: boolean;
    handleClose: () => void;
    imageSrc: string | string[];
}

const ImageModal: React.FC<ImageModalProps> = ({ show, handleClose, imageSrc }) => {
    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    return (
        <div className={`modal ${show ? 'show' : ''}`} onClick={handleClose}>
            <div className="modal-content-image" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header mt-3">
                <h5 className="modal-title p-0">Esse é o modelo mais próximo da dimensão da sua lavanderia</h5>
                </div>
                <div className="modal-body p-0 d-flex justify-content-center align-items-center">
                    {Array.isArray(imageSrc) ? (
                        imageSrc.map((src, index) => (
                            <div key={index} className="no-screenshot">
                                <img src={src} alt={`Modelo Visualizado ${index + 1}`} style={{ width: '300px', height: '300px', margin: '0 10px' }} onContextMenu={(e) => e.preventDefault()} />
                            </div>
                        ))
                    ) : (
                        <div className="no-screenshot">
                            <img src={imageSrc} alt="Modelo Visualizado" style={{ width: '600px', height: '600px' }} onContextMenu={(e) => e.preventDefault()} />
                        </div>
                    )}
                </div>
                <div className="modal-footer d-flex justify-content-center align-items-center">
                    <button type="button" className="btn button-modal px-5" onClick={handleClose}>
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
