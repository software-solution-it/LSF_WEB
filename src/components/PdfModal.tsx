import React, { useEffect } from 'react';

interface ImageModalProps {
    show: boolean;
    handleClose: () => void;
    imageSrc: string | string[];
}

const PdfModal: React.FC<ImageModalProps> = ({ show, handleClose, imageSrc }) => {
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
                <h5 className="modal-title p-0">Esse é o modelo elétrico mais próximo da sua lavanderia</h5>
                </div>
                <div className="modal-body p-0 d-flex justify-content-center align-items-center">
                        <div className="no-screenshot">
                        <div style={{ height: '50vh', width:500 }}>
                <iframe
                    src={`${imageSrc}`}
                    width="100%"
                    height="100%"
                    onContextMenu={(e) => e.preventDefault()}
                />
            </div>
                        </div>
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

export default PdfModal;
