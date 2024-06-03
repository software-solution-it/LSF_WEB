import React, { useEffect, useState } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/Menu';
import userService from '../../services/userService';
import { CurrentUser } from '../../interface/userInterface';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

    const handleInauguration = () => {
        navigate('/inauguration');
    };

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
            {currentUser?.user ? 
            <main className="main-content">
                <div className="row welcome-section">
                    <div className="col mt-3 mt-5">
                        <h1>Olá, {currentUser?.user.name}</h1>
                        <p>Seja bem vindo ao portal LSF</p>
                    </div>
                    <div className="col buttons">
                        <button disabled className="btn new-project-button">
                            <i className="fas fa-plus icon"></i> Nova Lavanderia
                        </button>
                    </div>
                </div>
                <div onClick={() => handleInauguration()} className="row project-info">
                    <span></span>
                    <h2 className="col">Minha Lavanderia</h2>
                    <p className="row">Cronograma atual de inauguração:</p>
                    <ul className="col-12 schedule">
                        <li>
                            <div className='mb-4 d-flex justify-content-between align-items-center'>
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-tools me-3"></i>
                                    <div className='d-flex flex-column'>
                                        <span className="fw-bold">Mod. 1 | Geolocalização</span>
                                        <span>{currentUser?.geolocation?.createdAt ? currentUser?.geolocation?.createdAt : "Não iniciado"}</span>
                                    </div>
                                </div>
                                <div>
                                    <i className={`${
                                        currentUser?.geolocation ? 'text-success fas fa-check-square' : 
                                        'fa-solid fa-arrow-right'
                                    }`}></i>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='mb-4 d-flex justify-content-between align-items-center'>
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-tools me-3"></i>
                                    <div className='d-flex flex-column'>
                                        <span className="fw-bold">Mod. 2 | Adequa ponto</span>
                                        <span>{currentUser?.point?.createdAt ? currentUser?.point?.createdAt : "Não iniciado"}</span>
                                    </div>
                                </div>
                                <div>
                                    <i className={`${
                                        currentUser?.point ? 'text-success fas fa-check-square' : 
                                        currentUser?.geolocation ? 'fa-solid fa-arrow-right' : 
                                        'text-danger fas fa-lock'
                                    }`}></i>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='mb-4 d-flex justify-content-between align-items-center'>
                                <div className="d-flex align-items-center">
                                    <i className="fas fas fa-handshake me-3"></i>
                                    <div className='d-flex flex-column'>
                                        <span className="fw-bold">Mod. 3 | Aquisição</span>
                                        <span>{currentUser?.supplier?.createdAt ? currentUser?.supplier?.createdAt : "Não iniciado"}</span>
                                    </div>
                                </div>
                                <div>
                                    <i className={`${
                                        currentUser?.supplier ? 'text-success fas fa-check-square' : 
                                        currentUser?.point ? 'fa-solid fa-arrow-right' : 
                                        'text-danger fas fa-lock'
                                    }`}></i>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='mb-4 d-flex justify-content-between align-items-center'>
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-calendar-alt me-3 ms-1"></i>
                                    <div className='d-flex flex-column'>
                                        <span className="fw-bold">Mod. 4 | Inauguração</span>
                                        <span>{currentUser?.inauguration?.createdAt ? currentUser?.inauguration?.createdAt : "Não iniciado"}</span>
                                    </div>
                                </div>
                                <div>
                                    <i className={`${
                                        currentUser?.inauguration ? 'text-success fas fa-check-square' : 
                                        currentUser?.supplier ? 'fa-solid fa-arrow-right' : 
                                        'text-danger fas fa-lock'
                                    }`}></i>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                
            </main>
            :<></>}
        </div>
    );
};

export default Home;
