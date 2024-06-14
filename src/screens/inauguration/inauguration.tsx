import React, { useEffect, useState } from 'react';
import './inauguration.css';
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/Menu';
import projectService from '../../services/projectService';
import { User } from '../../interface/userInterface';
import { useLocation } from 'react-router-dom';

const Inauguration: React.FC = () => {
    const navigate = useNavigate();
    const [currentProject, setCurrentProject] = useState<any>(null);
    const location = useLocation();
    const { projectId } = location.state || {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await projectService.getProjectById(projectId);
                if (response) {
                    setCurrentProject(response);
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
            navigate('/step/geolocalization' , { state: { projectId } });
        } else if (type === 2) {
            navigate('/step/dimension' , { state: { projectId } });
        } else if (type === 3) {
            if (currentProject?.suppliers.length == 0) {
                navigate('/step/aquisition' , { state: { projectId } });
            } else if (currentProject?.suppliers.length == 1) {
                navigate('/step/board' , { state: { projectId } });
            } else if (currentProject?.suppliers.length == 2) {
                navigate('/step/product' , { state: { projectId } });
            } else if (currentProject?.suppliers.length == 3) {
                navigate('/step/payment' , { state: { projectId } });
            } else if (currentProject?.suppliers.length == 4) {
                navigate('/step/technician' , { state: { projectId } });
            }
        } else if (type === 4) {
            navigate('/step/laundry_inauguration', { state: { projectId }});
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

    if (!currentProject) return null;

    const getCurrentAndNextSteps = () => {
        let currentStep = null;
        let nextSteps:any = [];

        if (currentProject?.geolocation === null) {
            currentStep = renderStep(1, 'Geolocalização', false, false);
            nextSteps = [
                renderStep(2, 'Adequa Ponto', true, false),
                renderStep(3, 'Aquisição', true, false),
                renderStep(4, 'Inauguração', true, false)
            ];
        } else if (currentProject?.point === null) {
            currentStep = renderStep(2, 'Adequa Ponto', false, false);
            nextSteps = [
                renderStep(3, 'Aquisição', true, false),
                renderStep(4, 'Inauguração', true, false)
            ];
        } else if (currentProject?.technician === null) {
            currentStep = renderStep(3, 'Aquisição', false, false);
            nextSteps = [
                renderStep(4, 'Inauguração', true, false)
            ];
        } else if (currentProject?.name === null) {
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
                            {(currentProject.geolocation != null) &&
                                renderStep(1, 'Geolocalização', false, true)
                            }
                            {(currentProject.point != null) &&
                                renderStep(2, 'Adequa Ponto', false, true)
                            }
                            {(currentProject?.technician != null) &&
                                renderStep(3, 'Aquisição', false, true)
                            }
                            {(currentProject?.name != null) &&
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
