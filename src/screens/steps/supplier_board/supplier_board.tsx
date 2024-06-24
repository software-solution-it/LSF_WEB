import React, { useEffect, useState } from 'react';
import './supplier_board.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import { User } from '../../../interface/userInterface';
import userService from '../../../services/userService';
import supplierService from '../../../services/supplierService';
import loading from '../../../assets/loading.gif';

const Supplier_Board: React.FC = () => {
    const navigate = useNavigate();
    const [comboSelected, setComboSelected] = useState(false);
    const [whatsappVisible, setWhatsappVisible] = useState(false);
    const [whatsappOpen, setWhatsappOpen] = useState(false);
    const [comboSelectedId, setComboSelectedId] = useState<any>();
    const [nextEnabled, setNextEnabled] = useState(false);
    const [showError, setShowError] = useState(false);
    const [checkedState, setCheckedState] = useState({ contact: false, purchase: false });
    const [isLoading, setIsLoading] = useState(false);
    const quantity = localStorage.getItem('machineQuantity');
    const location = useLocation();
    const { projectId } = location.state || {};
    const dryer = localStorage.getItem('washerType');
    const [refresh, setRefresh] = useState(false);
    
    const handleNext = async () => {
        setIsLoading(true);
        const response = await supplierService.createUserSupplier(comboSelectedId, currentUser?.projects[0]?.id);
        setIsLoading(false);
        if (response) {
            navigate('/step/product', { state: { projectId } });
        }
    };

    const [supplier, setSupplier] = useState<any>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userService.getCurrentUser();
                if (response) {
                    setCurrentUser(response.user);
                    setSupplier(await supplierService.getSuppliersByType(2));
                } else {
                    navigate('/login');
                }
            } catch (e) {
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setComboSelected(event.target.value !== "Escolha seu fornecedor");
        if (event.target.value !== "Escolha seu fornecedor") {
            setComboSelectedId(event?.target?.value);
        }
        setShowError(false);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!comboSelected) {
            setShowError(true);
        } else {
            setCheckedState({
                ...checkedState,
                [event.target.name]: event.target.checked
            });

            setShowError(false);
        }
    };

    useEffect(() => {
        if (checkedState.contact && checkedState.purchase && whatsappOpen && comboSelected) {
            setNextEnabled(true);
        } else {
            setNextEnabled(false);
        }
    }, [checkedState, whatsappOpen, comboSelected]);

    useEffect(() => {
        if (comboSelected) {
            setWhatsappVisible(true);
        } else {
            setWhatsappVisible(false);
        }
    }, [comboSelected]);

    const handleWhatsappClick = () => {
        const supw = supplier.find((s: any) => s.id === Number(comboSelectedId));
        const phoneNumber = supw.phone;
        const message = `Olá, gostaria de falar sobre a compra das placas para meu conjunto de máquinas:
- Conjunto: ${dryer == '9' ? 'Speed Queen STACK Lavadora/Secadora 10kg/10,5kg' : 'Speed Queen STACK Lavadora/Secadora 10kg/10,5kg'}
- Quantidade: ${quantity} conjuntos de máquinas.`;
        
        const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, "_blank");
        setWhatsappOpen(true);
    };

    return (
        <div>
            <Menu user={null} projectId={currentUser?.projects[0]?.id} setRefresh={setRefresh}/>
            {supplier?.length > 0 ? 
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8" style={{ marginTop: 80 }}>
                                <div className="welcome-section-quantity my-5 mb-3">
                                    <ul>
                                        <li>
                                            <div className='mb-4 text-center'>
                                                <h2 className='p-0 mb-3'>Placa</h2>
                                                <p>Agora você vai selecionar uma opção de fornecedor de placas de acordo com o fornecedor mais próximo de você, faremos o envio das informações da máquina para ele.</p>
                                            </div>

                                            <select
                                                className={`form-select py-3 ${showError && !comboSelected ? 'select-error' : ''}`}
                                                aria-label="Default select example"
                                                onChange={handleSelectChange}
                                            >
                                                <option value="Escolha seu fornecedor">Escolha seu fornecedor</option>
                                                {supplier.map((s: any) => (
                                                    <option key={s.id} value={s.id}>
                                                        {s.supplierName}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className='d-flex justify-content-center align-items-center my-4'>
                                                <button onClick={handleWhatsappClick} className={`btn btn-success px-4 py-2 ${!whatsappVisible ? 'whatsapp-hidden' : ''}`} style={{ borderRadius: 30 }}>
                                                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> Entrar em contato agora
                                                </button>
                                            </div>

                                            <div className={`form-check}`}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="contactCheckbox"
                                                    name="contact"
                                                    checked={checkedState.contact}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label className="form-check-label mx-2" htmlFor="contactCheckbox">
                                                    Entrei em contato com o fornecedor
                                                </label>
                                                {showError && !comboSelected && <div className="text-danger">*Por favor, selecione um fornecedor</div>}
                                            </div>

                                            <div className="form-check mt-4">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="purchaseCheckbox"
                                                    name="purchase"
                                                    checked={checkedState.purchase}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label className="form-check-label" htmlFor="purchaseCheckbox">
                                                    Comprei as placas necessárias
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-center">
                                    <button style={{width:200, height:60}}   disabled={!nextEnabled || isLoading} className={`mt-5 mb-3 py-3 ${!nextEnabled ? 'btn-request-confirm-disabled' : 'btn-request-confirm-suplier'}`} onClick={handleNext}>
                                        {isLoading ? (
                                            <img style={{width:25}} src={loading} alt="Loading" className="loading-gif" />
                                        ) : (
                                            'Próximo passo'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            : <></>}
        </div>
    );
};

export default Supplier_Board;
