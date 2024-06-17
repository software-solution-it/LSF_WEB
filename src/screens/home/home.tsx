import React, { useEffect, useState } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/Menu';
import userService from '../../services/userService';
import mandalaService from '../../services/mandalaService';
import { User } from '../../interface/userInterface';
import { Mandala } from '../../interface/mandalaInterface';
import loading from '../../assets/loading.gif';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [mandala, setMandala] = useState<Mandala>({
        id: 0,
        chooseLocation: false,
        closeContract: false,
        plumbingElectrical: false,
        drywall: false,
        mdfOptional: false,
        glassWall: false,
        machines: false,
        automatedComputers: false,
        cardMachine: false,
        platesDispensers: false,
        chemicals: false,
        brandRegistrationOptional: false,
        stickers: false,
        environmentDecoration: false,
        sofaTableBasket: false,
        facade: false,
        airConditioning: false,
        internet: false,
        paperHolder: false,
        alcoholSprayer: false,
        clothesFoldersOptional: false,
        camera: false,
        airSensor: false,
        machineAlarm: false,
        wifiSocketAdapter: false,
        doorLock: false,
        userId: 0
    });

    const [checkListMandala, setCheckListMandala] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInauguration = (projectId: any) => {
        if (!checkListMandala) {
            navigate('/projects', { state: { projectId } });
        }
    };

    const handleChangeChecklist = () => {
        setCheckListMandala(!checkListMandala);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        setMandala((prevState) => ({
            ...prevState,
            [id]: checked
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await userService.getCurrentUser();
                if (userResponse) {
                    setCurrentUser(userResponse.user);
                    const mandalaResponse = await mandalaService.listMandala();
                    if (mandalaResponse) {
                        setMandala(mandalaResponse);
                    }
                } else {
                    navigate('/login');
                }
            } catch (e) {
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    const handleSaveMandala = async () => {
        if (currentUser) {
            setIsLoading(true);
            const response = await mandalaService.createMandala(mandala);
            setIsLoading(false);
            if (response) {
                setMandala(response);
                setCheckListMandala(false);
            }
        }
    };

    return (
        <div>
            <Menu user={currentUser} projectId={null}/>
            {currentUser?.id ? 
            <main className="main-content">
                <div className="row welcome-section" style={{marginTop:100}}>
                    <div className="col">
                        <h1>Olá, {currentUser?.name}</h1>
                        <p>Seja bem-vindo ao portal LSF</p>
                    </div>
                    <div className="col buttons">
                        <button onClick={handleChangeChecklist} className="btn mandala-button">
                            <i className="fas"></i> {checkListMandala ? 'Minha Lavanderia' : 'Checklist Mandala'}
                        </button>
                    </div>
                </div>
                {currentUser.projects.map((project, index) => (
                    <>
                        {checkListMandala ? (
                            <div key={index} onClick={() => handleInauguration(project.id)} className="row project-info-mandala mb-3">
                                <div>
                                    <h2 className="col">CHECK LIST MANDALA</h2>
                                    <p className="text-danger mt-3">Proibido compartilhar mandala; Protegido por direitos autorais</p>
                                    <p className='text-center'>Importante lembrar, que a mandala é sua bússola, te guiará no passo a passo da sua Lavanderia</p>
                                    <ul className="col-12 checklist">
                                        <li>
                                            <span className="fw-bold">1 - PONTO IDEAL:</span>
                                            <ul>
                                                <li className="form-check mb-2 mt-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="chooseLocation" checked={mandala.chooseLocation} />
                                                    <label className="form-check-label" htmlFor="chooseLocation">Escolher Ponto</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="closeContract" checked={mandala.closeContract} />
                                                    <label className="form-check-label" htmlFor="closeContract">Fechar Contrato</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="plumbingElectrical" checked={mandala.plumbingElectrical} />
                                                    <label className="form-check-label" htmlFor="plumbingElectrical">Hidráulica e elétrica</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="drywall" checked={mandala.drywall} />
                                                    <label className="form-check-label" htmlFor="drywall">Drywall</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="mdfOptional" checked={mandala.mdfOptional} />
                                                    <label className="form-check-label" htmlFor="mdfOptional">MDF/ Opcional</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="glassWall" checked={mandala.glassWall} />
                                                    <label className="form-check-label" htmlFor="glassWall">Blindex</label>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <span className="fw-bold">2 - MOTORIZAÇÃO:</span>
                                            <ul>
                                                <li className="form-check mb-2 mt-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="machines" checked={mandala.machines} />
                                                    <label className="form-check-label" htmlFor="machines">Máquinas</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="automatedComputers" checked={mandala.automatedComputers} />
                                                    <label className="form-check-label" htmlFor="automatedComputers">Computador Automatizados</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="cardMachine" checked={mandala.cardMachine} />
                                                    <label className="form-check-label" htmlFor="cardMachine">Maquineta de cartão (Verificar se precisa)</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="platesDispensers" checked={mandala.platesDispensers} />
                                                    <label className="form-check-label" htmlFor="platesDispensers">Placas e dosadores</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="chemicals" checked={mandala.chemicals} />
                                                    <label className="form-check-label" htmlFor="chemicals">Produtos Químicos</label>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <span className="fw-bold">3 - SINALIZAÇÃO:</span>
                                            <ul>
                                                <li className="form-check mb-2 mt-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="brandRegistrationOptional" checked={mandala.brandRegistrationOptional} />
                                                    <label className="form-check-label" htmlFor="brandRegistrationOptional">Registro de marca (Opcional)</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="stickers" checked={mandala.stickers} />
                                                    <label className="form-check-label" htmlFor="stickers">Adesivos</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="environmentDecoration" checked={mandala.environmentDecoration} />
                                                    <label className="form-check-label" htmlFor="environmentDecoration">Decoração ambiente</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="sofaTableBasket" checked={mandala.sofaTableBasket} />
                                                    <label className="form-check-label" htmlFor="sofaTableBasket">Sofá, mesa, cesto</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="facade" checked={mandala.facade} />
                                                    <label className="form-check-label" htmlFor="facade">Fachada</label>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <span className="fw-bold">4 - CONFORTO:</span>
                                            <ul>
                                                <li className="form-check mb-2 mt-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="airConditioning" checked={mandala.airConditioning} />
                                                    <label className="form-check-label" htmlFor="airConditioning">Ar condicionado</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="internet" checked={mandala.internet} />
                                                    <label className="form-check-label" htmlFor="internet">Internet</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="paperHolder" checked={mandala.paperHolder} />
                                                    <label className="form-check-label" htmlFor="paperHolder">Suporte de Papel</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="alcoholSprayer" checked={mandala.alcoholSprayer} />
                                                    <label className="form-check-label" htmlFor="alcoholSprayer">Pulverizador álcool</label>
                                                </li>
                                                <li className="form-check mb-2">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="clothesFoldersOptional" checked={mandala.clothesFoldersOptional} />
                                                    <label className="form-check-label" htmlFor="clothesFoldersOptional">Dobradores de roupa (Opcional)</label>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <span className="fw-bold">5 - CONTROLE E SEGURANÇA:</span>
                                            <ul>
                                                <li className="form-check">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="camera" checked={mandala.camera} />
                                                    <label className="form-check-label" htmlFor="camera">Câmera</label>
                                                </li>
                                                <li className="form-check">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="airSensor" checked={mandala.airSensor} />
                                                    <label className="form-check-label" htmlFor="airSensor">Sensor de Ar</label>
                                                </li>
                                                <li className="form-check">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="machineAlarm" checked={mandala.machineAlarm} />
                                                    <label className="form-check-label" htmlFor="machineAlarm">Alarme de Máquinas</label>
                                                </li>
                                                <li className="form-check">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="wifiSocketAdapter" checked={mandala.wifiSocketAdapter} />
                                                    <label className="form-check-label" htmlFor="wifiSocketAdapter">Adapt. De tomada Wi-Fi</label>
                                                </li>
                                                <li className="form-check">
                                                    <input onChange={handleCheckboxChange} className="form-check-input" type="checkbox" id="doorLock" checked={mandala.doorLock} />
                                                    <label className="form-check-label" htmlFor="doorLock">Tranca de Porta</label>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <div className='d-flex justify-content-center align-items-center my-4'>
                                        <button onClick={handleSaveMandala} style={{width:250, backgroundColor:"#383a99"}} className="btn btn-primary" disabled={isLoading}>
                                            {isLoading ? (
                                                <img style={{width:25}} src={loading} alt="Loading" className="loading-gif" />
                                            ) : (
                                                'Atualizar Mandala'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div key={index} onClick={() => handleInauguration(project.id)} className="row project-info mb-3">
                                <h2 className="col">Minha Lavanderia</h2>
                                <p className="row">Cronograma atual de inauguração:</p>
                                <ul className="col-12 schedule">
                                    <li>
                                        <div className='mb-4 d-flex justify-content-between align-items-center'>
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-map me-3"></i>
                                                <div className='d-flex flex-column'>
                                                    <span className="fw-bold">Mod. 1 | Geolocalização</span>
                                                    <span>{project.geolocation?.createdAt ? project.geolocation.createdAt : "Não iniciado"}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <i className={`${project.geolocation ? 'text-success fas fa-check-square' : 'fa-solid fa-arrow-right'}`}></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='mb-4 d-flex justify-content-between align-items-center'>
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-tools me-3"></i>
                                                <div className='d-flex flex-column'>
                                                    <span className="fw-bold">Mod. 2 | Adequa ponto</span>
                                                    <span>{project.point?.createdAt ? project.point.createdAt : "Não iniciado"}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <i className={`${project.point ? 'text-success fas fa-check-square' : project.geolocation ? 'fa-solid fa-arrow-right' : 'text-danger fas fa-lock'}`}></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='mb-4 d-flex justify-content-between align-items-center'>
                                            <div className="d-flex align-items-center">
                                                <i className="fas fas fa-handshake me-3"></i>
                                                <div className='d-flex flex-column'>
                                                    <span className="fw-bold">Mod. 3 | Aquisição</span>
                                                    <span>{project.suppliers[0]?.createdAt ? project.suppliers[0].createdAt : "Não iniciado"}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <i className={`${project?.technician ? 'text-success fas fa-check-square' : project.point ? 'fa-solid fa-arrow-right' : 'text-danger fas fa-lock'}`}></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='mb-4 d-flex justify-content-between align-items-center'>
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-calendar-alt me-3 ms-1"></i>
                                                <div className='d-flex flex-column'>
                                                    <span className="fw-bold">Mod. 4 | Inauguração</span>
                                                    <span>{project.technician?.createdAt ? project.technician.createdAt : "Não iniciado"}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <i className={`${project.name ? 'text-success fas fa-check-square' : 'text-danger fas fa-lock'}`}></i>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                
                            </div>
                            
                        )}
                                                      <div key={index} onClick={() => handleInauguration(project.id)} className="row project-info-new mb-4">
                                                        <div>
                                                        <button disabled className="btn new-project-button">
                            <i className="fas fa-plus icon"></i> Nova Lavanderia
                        </button>
                        </div>
                            </div>
                    </>
                    
                ))}
            </main>
            : <></>}
        </div>
    );
};

export default Home;
