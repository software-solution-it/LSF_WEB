import React, { useState, useEffect } from 'react';
import './inauguration.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import userService from '../../../services/userService';
import loading from '../../../assets/loading.gif';

const Inauguration: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { projectId } = location.state || {};
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const handleNext = () => {
        setIsLoading(true);
        navigate('/step/dimension', { state: { projectId } });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userService.getCurrentUser();
                if (!response) {
                    navigate('/login');
                }
            } catch (e) {
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div>
            <Menu user={null} projectId={projectId} setRefresh={setRefresh}/>
            <main className="main-content-inauguration">
                <div className='container mt-5'>
                    <div className='row justify-content-center align-items-center'>
                        <div className='col-md-8'>
                            <h3 className="mt-5">Guia rápido</h3>
                            <p className="me-5 mt-3">Nesta etapa você irá definir o tamanho do seu espaço, receber uma recomendação e escolher o número de máquinas.</p>

                            <p className="me-5 mt-3">Próximos passos:</p>
                            <div className='d-flex align-items-end flex-column'>
                                <div className='w-100'>
                                    <div className='w-100 d-flex align-items-center py-3 bg-white' style={{ borderRadius: 10, borderBottom: '4px solid' }}>
                                        <div className='bg-dark d-flex justify-content-center align-items-center ms-5 p-3' style={{ width: 20, height: 20, borderRadius: '100%' }}>
                                            <span className='text-white'>1</span>
                                        </div>
                                        <span className="ms-3">Definição do espaço</span>
                                    </div>

                                    <div className='w-100 d-flex align-items-center py-3 bg-white' style={{ borderRadius: 10, borderBottom: '4px solid' }}>
                                        <div className='bg-dark d-flex justify-content-center align-items-center ms-5 p-3' style={{ width: 20, height: 20, borderRadius: '100%' }}>
                                            <span className='text-white'>2</span>
                                        </div>
                                        <span className="ms-3">Definição número de máquinas</span>
                                    </div>

                                    <div className='w-100 d-flex align-items-center py-3 bg-white' style={{ borderRadius: 10, borderBottom: '4px solid' }}>
                                        <div className='bg-dark d-flex justify-content-center align-items-center ms-5 p-3' style={{ width: 20, height: 20, borderRadius: '100%' }}>
                                            <span className='text-white'>3</span>
                                        </div>
                                        <span className="ms-3">Escolha do modelo máquina</span>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button
                                        className="mt-3 py-3 btn btn-request-confirm-steps text-center"
                                        onClick={handleNext}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <img style={{width:25}} src={loading} alt="Loading" className="loading-gif" />
                                        ) : (
                                            'Começar'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div>
            </div>
        </div>
    );
};

export default Inauguration;
