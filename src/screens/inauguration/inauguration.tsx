import React, { useEffect, useState } from 'react';
import './inauguration.css';
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/Menu';
import { CurrentUser } from '../../interface/userInterface';
import userService from '../../services/userService';

const Inauguration: React.FC = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userService.getCurrentUser();
                if (response) {
                    setCurrentUser(response);
                } else {
                    navigate('/login');
                }
            } catch (e) {
                navigate('/login');
            }
        };

        fetchData();
    }, []);

    const handleNext = (type: number) => {
        if (type === 1) {
            navigate('/step/geolocalization');
        } else if (type === 2) {
            navigate('/step/inauguration_2');
        } else if (type === 3) {
            if (currentUser?.supplier == null) {
                navigate('/step/inauguration_6');
            } else if (currentUser?.supplier.supplierType === 1) {
                navigate('/step/board');
            } else if (currentUser?.supplier.supplierType === 2) {
                navigate('/step/product');
            } else if (currentUser?.supplier.supplierType === 3) {
                navigate('/step/payment');
            } else if (currentUser?.supplier.supplierType === 4) {
                navigate('/step/technician');
            }
        } else if (type === 4) {
            navigate('/step/laundry_inauguration');
        }
    };

    const renderStep = (stepNumber: number, stepName: string, blockedCondition: boolean | null, completedCondition: boolean | null) => {
        const getStatus = () => {
            if (completedCondition) {
                return 'closed';
            } else if (blockedCondition) {
                return 'blocked';
            } else {
                return 'on-board';
            }
        };

        const isClickable = stepName === 'Inauguração' || (!blockedCondition && !completedCondition);


        return (
            <div
                onClick={() => isClickable && handleNext(stepNumber)}
                className={`inauguration-info mb-3`}
                style={{ pointerEvents: isClickable ? 'auto' : 'none' }}
            >
                <span></span>
                <ul className="p-0 d-flex justify-content-between align-items-center">
                    <li>
                        <p>Etapa {stepNumber}:</p>
                        <div className='mb-2'>
                            <h2 className='p-0 m-0'>{stepName}</h2>
                        </div>
                        <div className={`status d-flex rounded justify-content-center align-items-center ${getStatus()}`}>
                            <span className='py-1 '>
                                {completedCondition ? 'Concluído' : (blockedCondition ? 'Bloqueado' : 'Em andamento')}
                            </span>
                        </div>
                    </li>
                    <i className={`${completedCondition ? 'text-success fas fa-check-square' : (blockedCondition ? 'text-danger fas fa-lock' : 'fa-solid fa-arrow-right')}`}></i>
                </ul>
            </div>
        );
    };

    if (!currentUser) return null;

    const getCurrentAndNextSteps = () => {
        let currentStep = null;
        let nextSteps:any = [];

        if (currentUser.geolocation === null) {
            currentStep = renderStep(1, 'Geolocalização', false, false);
            nextSteps = [
                renderStep(2, 'Adequa Ponto', true, false),
                renderStep(3, 'Aquisição', true, false),
                renderStep(4, 'Inauguração', true, false)
            ];
        } else if (currentUser.point === null) {
            currentStep = renderStep(2, 'Adequa Ponto', false, false);
            nextSteps = [
                renderStep(3, 'Aquisição', true, false),
                renderStep(4, 'Inauguração', true, false)
            ];
        } else if (currentUser.technician === null) {
            currentStep = renderStep(3, 'Aquisição', false, false);
            nextSteps = [
                renderStep(4, 'Inauguração', true, false)
            ];
        } else if (currentUser.inauguration === null) {
            currentStep = renderStep(4, 'Inauguração', false, false);
        }

        return { currentStep, nextSteps };
    };

    const { currentStep, nextSteps } = getCurrentAndNextSteps();

    return (
        <div>
            <Menu />
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-5">
                            <h3 className="m-0">Minha Lavanderia</h3>
                            <span>Projeto atual</span>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-4 mb-3">
                            <span className='fw-bold'>Etapa atual:</span>
                            {currentStep ? currentStep : <p>Nenhuma etapa em andamento</p>}
                        </div>

                        <div className="col-md-4">
                            <span className='fw-bold'>Próximas etapas:</span>
                            {nextSteps.length > 0 ? nextSteps : <p>Você já concluiu todas as etapas</p>}
                        </div>

                        <div className="col-md-4">
                            <span className='fw-bold'>Etapas concluídas:</span>
                            {(currentUser.geolocation != null) &&
                                renderStep(1, 'Geolocalização', false, true)
                            }
                            {(currentUser.point != null) &&
                                renderStep(2, 'Adequa Ponto', false, true)
                            }
                            {(currentUser.supplier != null) &&
                                renderStep(3, 'Aquisição', false, true)
                            }
                            {(currentUser.inauguration != null) &&
                                renderStep(4, 'Inauguração', false, true)
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Inauguration;
