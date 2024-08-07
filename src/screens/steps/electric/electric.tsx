import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import userService from '../../../services/userService';
import { User } from '../../../interface/userInterface';
import electricService from '../../../services/electricService';
import loading from '../../../assets/loading.gif';

const Electric: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { projectId } = location.state || {};
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [refresh, setRefresh] = useState(false);
    const [electric, setElectric] = useState<any>({
        voltage: '220v',
        network: 'Monofasica',
        projectId: projectId,
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userService.getCurrentUser();
                if (response) {
                    setCurrentUser(response.user);
                } else {
                    navigate('/login');
                }
            } catch (e) {
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    const handleNext = () => {
        if (currentUser) {
            const fetchData = async () => {
                setIsLoading(true);
                const response = await electricService.createElectric(electric);
                setIsLoading(false);
                if (response) {
                    navigate('/step/project', { state: { projectId } });
                }
            };
            fetchData();
        }
    };

    return (
        <div>
            {currentUser ?
            <>
            <Menu user={currentUser} projectId={projectId} setRefresh={setRefresh} menuProject={true}/>
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8" style={{ marginTop: 80 }}>
                            <div className="welcome-section-electric mt-4">
                                <ul>
                                    <li>
                                        <div className="mb-4">
                                            <h2 className="p-0 m-0">Colete a voltagem de energia do seu ponto comercial</h2>
                                        </div>
                                        <div className="rounded">
                                            <p className="py-1 mx-2">
                                                Todos os equipamentos que você irá utilizar <span style={{ fontWeight: 'bold' }}>220V</span>. Leve um eletricista e solicite os dados abaixo para a inteligência gerar o seu projeto:
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                                <div className="mx-2 mb-3 d-flex justify-content-start flex-column align-items-start">
                                    <label htmlFor="voltageSelect" className="form-label" style={{ fontWeight: 'bold' }}>Voltagem da energia</label>
                                    <select
                                        id="voltageSelect"
                                        className="form-select"
                                        style={{ width: 180 }}
                                        value={electric.voltage}
                                        onChange={(e) => setElectric({ ...electric, voltage: e.target.value })}
                                        disabled={isLoading}
                                    >
                                        <option value="220v">220V</option>
                                        <option value="110v">110V</option>
                                    </select>
                                </div>
                                <div className="mx-2 mb-3 d-flex justify-content-start flex-column align-items-start">
                                    <label htmlFor="energyTypeSelect" className="form-label" style={{ fontWeight: 'bold' }}>Tipo de energia</label>
                                    <select
                                        id="energyTypeSelect"
                                        className="form-select"
                                        style={{ width: 180 }}
                                        value={electric.network}
                                        onChange={(e) => setElectric({ ...electric, network: e.target.value })}
                                        disabled={isLoading}
                                    >
                                        <option value="Monofasica">Monofasica</option>
                                        <option value="Bifasica">Bifasica</option>
                                        <option value="Trifasica">Trifasica</option>
                                    </select>
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
                                            'Confirmar'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            </>
            : <></>}
        </div>
    );
};

export default Electric;
