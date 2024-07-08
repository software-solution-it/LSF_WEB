import React, { useState } from 'react';
import './supplier_document.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';

const Supplier_Document: React.FC = () => {
    const navigate = useNavigate();
    const [nextEnabled, setNextEnabled] = useState(false);
    const [showError, setShowError] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const location = useLocation();
    const { projectId } = location.state || {};
    const [refresh, setRefresh] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setNextEnabled(true);
            setShowError(false);
        }
    };

    const handleNext = () => {
        if (selectedFile) {
            navigate('/step/waiting_aproval', { state: { projectId } });
        } else {
            setShowError(true);
        }
    };

    const formatFileSize = (size: number) => {
        if (size >= 1000000) {
            return (size / 1000000).toFixed(2) + ' MB';
        }
        return (size / 1000).toFixed(2) + ' KB';
    };

    

    return (
        <div>
            <Menu user={null} projectId={projectId} setRefresh={setRefresh} menuProject={true}/>
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8">
                            <div className="welcome-section-quantity my-5 mb-3">
                                <div className='mb-4 text-center'>
                                    <h2 className='p-0 mb-3'>Comprovante de pagamento</h2>
                                    <p>Para prosseguir com o processo de aquisição, solicitamos que anexe o comprovante de pagamento da(s) máquina(s) logo a seguir:</p>
                                </div>
                                <div className="upload-section text-center">
                                    {selectedFile ? (
                                        <div className='d-flex justify-content-center align-items-center flex-column'>
                                        <div className="file-display-box d-flex justify-content-center align-items-center flex-column">
                                            <div className="file-icon mb-2"></div>
                                            <i className="fas fa-folder mb-2" style={{fontSize:25} }></i>
                                            <p className='mb-2'>{selectedFile.name}</p>
                                            <p className='mb-2'>{formatFileSize(selectedFile.size)}</p>
                                            <p className="upload-status mb-5">Concluído</p>
                                        </div>
                                        <div>
                                             <button onClick={() => setSelectedFile(null)} className="change-file-button my-3">Trocar documento</button>
                                            </div>
                                            </div>
                                        
                                    ) : (
                                        <label htmlFor="fileInput" className="file-input-label mb-4">
                                            <div className="file-input-box">
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    className="file-input"
                                                    onChange={handleFileChange}
                                                />
                                                <span>Selecionar arquivo</span>
                                            </div>
                                        </label>
                                    )}
                                    <p className="note-text">
                                        *Por favor, assegure-se de que as fotografias estejam bem iluminadas e posicionadas adequadamente. Fotos borradas ou com baixa luminosidade não serão aceitas.
                                    </p>
                                </div>
                                <div className="text-center">
                                <button disabled={!nextEnabled} className={`mt-5 mb-3 px-5 py-3 ${!nextEnabled ? 'btn-request-confirm-disabled' : 'btn-request-confirm-suplier'}`} onClick={handleNext}>
                                    Concluir
                                </button>
                                {showError && <p className="error-text">Por favor, selecione um arquivo.</p>}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Supplier_Document;
