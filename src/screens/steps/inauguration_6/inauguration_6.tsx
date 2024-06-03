import React, { useState, useEffect, useRef } from 'react';
import './inauguration_6.css';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import userService from '../../../services/userService';
import supplierService from '../../../services/supplierService';
import { CurrentUser } from '../../../interface/userInterface';

const Inauguration_6: React.FC = () => {
    const navigate = useNavigate();



    const handleNext = () => {
        navigate('/step/supplier');
    };

    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await userService.getCurrentUser();
            if (response) {
                setCurrentUser(response);
            }else{
                navigate('/login');
            }
        }catch(e){
            navigate('/login');
        }
        };

        fetchData();
    }, []);





    return (
        <div>
                            <Menu />
            <main className="main-content-inauguration">
                <div className='container mt-5'>
                    <div className='row justify-content-center align-items-center'>
                        <div className='col-md-8'>
                            <h3 className="mt-5">Aquisição</h3>
                            <p className="me-5 mt-3">Forneceremos uma lista de fornecedores para que você possa realizar suas compras..</p>

                            <p className="me-5 mt-3">Próximos passos:</p>
                            <div className='d-flex align-items-end flex-column'>
                                <div className='w-100'>
                                    <div className='w-100 d-flex align-items-center py-3 bg-white' style={{ borderRadius: 10, borderBottom: '4px solid' }}>
                                        <div className='bg-dark d-flex justify-content-center align-items-center ms-5 p-3' style={{ width: 20, height: 20, borderRadius: '100%' }}>
                                            <span className='text-white'>1</span>
                                        </div>
                                        <span className="ms-3">Fornecedor de Máquinas</span>
                                    </div>

                                    <div className='w-100 d-flex align-items-center py-3 bg-white' style={{ borderRadius: 10, borderBottom: '4px solid' }}>
                                        <div className='bg-dark d-flex justify-content-center align-items-center ms-5 p-3' style={{ width: 20, height: 20, borderRadius: '100%' }}>
                                            <span className='text-white'>2</span>
                                        </div>
                                        <span className="ms-3">Fornecedor de placa</span>
                                    </div>

                                    <div className='w-100 d-flex align-items-center py-3 bg-white' style={{ borderRadius: 10, borderBottom: '4px solid' }}>
                                        <div className='bg-dark d-flex justify-content-center align-items-center ms-5 p-3' style={{ width: 20, height: 20, borderRadius: '100%' }}>
                                            <span className='text-white'>3</span>
                                        </div>
                                        <span className="ms-3">Fornecedor de produtos químicos</span>
                                    </div>

                                    <div className='w-100 d-flex align-items-center py-3 bg-white' style={{ borderRadius: 10, borderBottom: '4px solid' }}>
                                        <div className='bg-dark d-flex justify-content-center align-items-center ms-5 p-3' style={{ width: 20, height: 20, borderRadius: '100%' }}>
                                            <span className='text-white'>4</span>
                                        </div>
                                        <span className="ms-3">Meio de pagamento</span>
                                    </div>
                                    <div className='w-100 d-flex align-items-center py-3 bg-white' style={{ borderRadius: 10, borderBottom: '4px solid' }}>
                                        <div className='bg-dark d-flex justify-content-center align-items-center ms-5 p-3' style={{ width: 20, height: 20, borderRadius: '100%' }}>
                                            <span className='text-white'>5</span>
                                        </div>
                                        <span className="ms-3">Comprovante de pagamento</span>
                                    </div>

                                    <div className='w-100 d-flex align-items-center py-3 bg-white' style={{ borderRadius: 10, borderBottom: '4px solid' }}>
                                        <div className='bg-dark d-flex justify-content-center align-items-center ms-5 p-3' style={{ width: 20, height: 20, borderRadius: '100%' }}>
                                            <span className='text-white'>6</span>
                                        </div>
                                        <span className="ms-3">Escolha do técnico</span>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                <button
                                className="mt-3 py-3 btn btn-request-confirm-steps text-center"
                                onClick={handleNext}
                            >
                                Começar
                            </button>
                            </div>
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

export default Inauguration_6;
