import React, { useState, useEffect } from 'react';
import './inauguration_2.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import userService from '../../../services/userService';
import pointService from '../../../services/pointService';
import Modal from '../../../components/Modal';
import Plant3x4 from '../../../assets/plant/3x4.png';
import Plant4x4 from '../../../assets/plant/4x4.png';
import Plant4x4_2 from '../../../assets/plant/4x4_2.png';
import Plant5x6 from '../../../assets/plant/5x6.png';
import ImageModal from '../../../components/ImageModal';
import { User } from '../../../interface/userInterface';
import loading from '../../../assets/loading.gif';
import notificationService from '../../../services/notificationService';

interface PointData {
    width: string;
    length: string;
    projectId: any;
}

const Inauguration_2: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { projectId } = location.state || {};
    const [width, setWidth] = useState('');
    const [length, setLength] = useState('');
    const [currentUser, setCurrentUser] = useState<User | any>(null);
    const [showModal, setShowModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | string[]>('');
    const [machineCount, setMachineCount] = useState(0);
    const [invalidWeight, setInvalidWeight] = useState(false);
    const [invalidNext, setInvalidNext] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

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

    useEffect(() => {
        if (Number(width) < 3 || Number(length) < 4) {
            setInvalidWeight(false);
            setInvalidNext(false);
        } else {
            setInvalidWeight(true);
        }
    }, [width, length]);

    const handleNext = () => {
        if (currentUser) {
            const fetchData = async () => {
                setIsLoading(true);
                const pointData: PointData = { width, length, projectId: projectId };
                const response = await pointService.createPoint(pointData);
                setIsLoading(false);
                if (response) {
                        navigate('/step/quantity', { state: { projectId } });
                }
            };
            fetchData();
        }
    };

    const handleCloseModal = (parameter: any) => {
        setShowModal(false);
        if (parameter === 'home') {
            navigate('/home');
        } else {
            navigate('/step/quantity', { state: { projectId } });
        }
    };

    const handleCalculate = () => {
        const widthNum = parseInt(width);
        const lengthNum = parseInt(length);

        const machinesPerRow = Math.floor(widthNum / 2);
        const machinesPerColumn = Math.floor(lengthNum / 2);
        const totalMachines = machinesPerRow * machinesPerColumn;
        if (Number(width) >= 3 || Number(length) >= 4) {
            setInvalidNext(true);
        }
        setMachineCount(totalMachines);
    };

    const handleVisualize = () => {
        const widthNum = parseInt(width);
        const lengthNum = parseInt(length);
        let selectedImage: string | string[] = '';

        if (widthNum > 3 && lengthNum < 5) {
            selectedImage = [Plant4x4, Plant4x4_2];
        } else if (widthNum > 2 && lengthNum < 5) {
            selectedImage = Plant3x4;
        } else if (widthNum > 4 && lengthNum < 7) {
            selectedImage = Plant5x6;
        } else {
            selectedImage = Plant5x6;
        }

        setImageSrc(selectedImage);
        setShowImageModal(true);
    };

    const handleCloseImageModal = () => {
        setShowImageModal(false);
    };

    return (
        <div>

            <main>

                {currentUser ?
                <>
                <Menu user={currentUser} projectId={projectId} setRefresh={setRefresh} menuProject={true}/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 text-center" style={{ marginTop: 80 }}>
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
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </div>
                                            <div className='ms-4'>
                                                <h5>Comprimento</h5>
                                                <div className="input-container">
                                                    <input
                                                        type="text"
                                                        value={length}
                                                        maxLength={2}
                                                        className="dimension-input"
                                                        onChange={(e) => setLength(e.target.value)}
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <h5 className="mt-4">*Dimensão mínima de 4 (largura) x 4 (comprimento)</h5>
                                        <div className='d-flex justify-content-center align-items-center flex-column'>
                                            <button disabled={!invalidWeight || isLoading} className={`btn mt-4 ${!invalidWeight ? 'invalidWeight' : 'validWeight'}`} onClick={handleCalculate}>
                                                Calcular
                                            </button>

                                            <button disabled={!invalidNext || isLoading} className={`btn mt-4 ${!invalidNext ? 'invalidWeight' : 'validWeight'}`} onClick={handleVisualize}>
                                                Visualizar modelo
                                            </button>

                                        </div>

                                        <div className="mt-4 container-quantity p-3 text-center">
                                            <h5>
                                                Seu espaço pode acomodar: <span style={{ fontSize: 24, fontWeight: 'bold' }}>{machineCount}</span> máquinas
                                            </h5>
                                        </div>
                                    </li>
                                </ul>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button
                                        disabled={!invalidNext || isLoading}
                                        className="mt-3 py-3 btn btn-request-confirm-steps text-center"
                                        onClick={handleNext}
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
                </>
                 : <></>}
                 
                 
                <Modal show={showModal} handleClose={handleCloseModal}>
                    <p>Parabéns, você concluiu a etapa atual. Agora você pode passar para a próxima etapa do projeto.</p>
                </Modal>
                <ImageModal show={showImageModal} handleClose={handleCloseImageModal} imageSrc={imageSrc} />
            </main>
        </div>
    );
};

export default Inauguration_2;
