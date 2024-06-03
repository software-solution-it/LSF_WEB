import React, { useState, useEffect } from 'react';
import './inauguration_2.css';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import { CurrentUser } from '../../../interface/userInterface';
import userService from '../../../services/userService';
import pointService from '../../../services/pointService';
import Modal from '../../../components/Modal';

interface PointData {
    width: string;
    length: string;
}

const Inauguration_2: React.FC = () => {
    const navigate = useNavigate();

    const [width, setWidth] = useState('');
    const [length, setLength] = useState('');
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [machineCount, setMachineCount] = useState(0);
    const [invalidWeight, setInvalidWeight] = useState(false);
    const [invalidNext, setInvalidNext] = useState(false);

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


    useEffect(() => {
        const fetchData = async () => {
            if(Number(width) < 4 || Number(length) < 4){
                setInvalidWeight(false);
                setInvalidNext(false);
            }else{
                setInvalidWeight(true);
            }
        };

        fetchData();
    }, [width, length]);

    const handleNext = () => {
        if (currentUser) {
            const fetchData = async () => {
                const pointData: PointData = { width, length };
                const response = await pointService.createPoint(pointData);
                if (response) {
                    setShowModal(true);
                }
            };

            fetchData();
        }
    };

    const handleCloseModal = (parameter:any) => {
        setShowModal(false);
        if(parameter === 'home'){
            navigate('/home');
        }else{
            navigate('/step/inauguration_3');
        }
    };

    const handleCalculate = () => {
        const widthNum = parseInt(width);
        const lengthNum = parseInt(length);

        const machinesPerRow = Math.floor(widthNum / 2);
        const machinesPerColumn = Math.floor(lengthNum / 2);
        const totalMachines = machinesPerRow * machinesPerColumn;
        if(Number(width) >= 4 || Number(length) >= 4){
        setInvalidNext(true);
        }
        setMachineCount(totalMachines);
    };

    return (
        <div>
            <Menu />
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 text-center">
                            <div className="welcome-section-geolocalization mt-4">
                                <ul>
                                    <li>
                                        <div className="mb-4">
                                            <h2 className="p-0 m-0">Definição de espaço</h2>
                                        </div>
                                        <div className="w-100 rounded">
                                            <p className="py-1 mx-2 w-100">
                                                Uma avaliação determinará quantas máquinas podem ser acomodadas no espaço disponível. Para isso, digite as dimensões do espaço escolhido:
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center mb-2">
                                            <div className="mr-3">
                                                <h5>Largura</h5>
                                                <div className="input-container">
                                                    <input
                                                        type="text"
                                                        value={width}
                                                        maxLength={2}
                                                        className="dimension-input"
                                                        onChange={(e) => setWidth(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <h5>Comprimento</h5>
                                                <div className="input-container">
                                                    <input
                                                        type="text"
                                                        value={length}
                                                        maxLength={2}
                                                        className="dimension-input"
                                                        onChange={(e) => setLength(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <h5 className="mt-4">*Dimensão mínima de 4 (largura) x 4 (comprimento)</h5>
                                        <button className={`btn mt-4 ${!invalidWeight ? 'invalidWeight' : 'validWeight'}`} onClick={handleCalculate}>
                                            Calcular
                                        </button>

                                        <div className="mt-4 container-quantity p-3 text-center">
                                            <h5>
                                                Seu espaço pode acomodar: <span style={{ fontSize: 24, fontWeight: 'bold' }}>{machineCount}</span> máquinas
                                            </h5>
                                        </div>
                                    </li>
                                </ul>
                                <div className='d-flex justify-content-center align-items-center'>
                                <button
                                disabled={!invalidNext}
                                className="mt-3 py-3 btn btn-request-confirm-steps text-center"
                                onClick={handleNext}
                            >
                                Confirmar
                            </button>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <Modal show={showModal} handleClose={handleCloseModal}>
                <p>Parabéns, você concluiu a etapa atual. Agora você pode passar para a próxima etapa do projeto.</p>
            </Modal>
            </main>
        </div>
    );
};

export default Inauguration_2;
