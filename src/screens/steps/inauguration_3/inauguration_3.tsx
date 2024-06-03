import React, { useEffect, useState } from 'react';
import './inauguration_3.css';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import userService from '../../../services/userService';

const Inauguration_3: React.FC = () => {
    const navigate = useNavigate();
    
    const [comboCount, setComboCount] = useState<any>(0);


    const handleNext = () => {
        localStorage.setItem('machineQuantity', comboCount.toString());
        navigate('/step/inauguration_4');
    };

    const increaseCount = (count: number) => {
        setComboCount(count + 1);
    };

    const decreaseCount = (count: number) => {
        if (count > 0) {
            setComboCount(count - 1);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userService.getCurrentUser();
                if (response) {
                } else {
                    navigate('/login');
                }
            } catch (e) {
                navigate('/login');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
         <Menu />
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8">
                            <div className="welcome-section-quantity mt-4">
                                <ul className='p-0'>
                                        <div className='mb-4 text-center'>
                                            <h2 className='p-0 m-0'>Número de máquinas</h2>
                                        </div>
                                        <div className="my-4 container-quantity p-3 text-center">
                                            <h5>Seu espaço tem recomendação mínima para: <span className="recommendation">04</span></h5>
                                        </div>
                                        <div>
                                            <h5 className='mt-4'>Escolha de máquinas</h5>
                                            <div className="machine-selection">
                                                <div className="machine-option">
                                                    <label htmlFor="combo">Conjunto (Lavadora e Secadora)</label>
                                                    <div className="quantity-control d-flex justify-content-between">
                                                        <button className='increase-button'  onClick={() => decreaseCount(comboCount)}>-</button>
                                                        <span>{comboCount}</span>
                                                        <button className='increase-button' onClick={() => increaseCount(comboCount)}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </ul>
                                <div className='d-flex justify-content-center align-items-center'>
                                <button
                                className="mt-4 py-3 btn btn-request-confirm-steps text-center"
                                onClick={handleNext}
                            >
                                Escolher máquinas
                            </button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Inauguration_3;