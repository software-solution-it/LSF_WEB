import React, { useEffect, useState } from 'react';
import './supplier_technician.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import userService from '../../../services/userService';
import supplierService from '../../../services/supplierService';
import technicianService from '../../../services/technicianService';
import loading from '../../../assets/loading.gif';

const Supplier_Technician: React.FC = () => {
    const navigate = useNavigate();
    const [comboSelected, setComboSelected] = useState(false);
    const [whatsappVisible, setWhatsappVisible] = useState(false);
    const [whatsappOpen, setWhatsappOpen] = useState(false);
    const [nextEnabled, setNextEnabled] = useState(false);
    const [showError, setShowError] = useState(false);
    const [checkedState, setCheckedState] = useState({ contact: false, purchase: false });
    const [supplier, setSupplier] = useState<any>([]);
    const [comboSelectedId, setComboSelectedId] = useState<any>();
    const [currentUser, setCurrentUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const { projectId } = location.state || {};
    const dryer = localStorage.getItem('washerType');
    const quantityString = localStorage.getItem('machineQuantity');
    const [refresh, setRefresh] = useState(false);
    const quantity = quantityString ? parseInt(quantityString) : 0;

    const extractState = (address: string) => {
        const addressParts = address.split('-');
        if (addressParts.length > 2) {
            const statePart = addressParts[addressParts.length - 2].trim();
            return statePart.split(' ')[0].replace(',', '');
        }
        return '';
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userService.getCurrentUser();
                if (response) {
                    setCurrentUser(response.user);
                    const userState = extractState(response.user.projects[0].geolocation.address).toUpperCase();

                    const responseTech = await technicianService.listTechnician();

                    const filteredTechnicians = responseTech.filter((tech: any) => 
                        tech.country.toUpperCase() === userState
                    );
                    setSupplier(filteredTechnicians);
                } else {
                    navigate('/login');
                }
            } catch (e) {
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    const handleNext = async () => {
        setIsLoading(true);
        const response = await supplierService.createUserTech(comboSelectedId, currentUser?.projects[0]?.id);
        setIsLoading(false);
        if (response) {
            navigate('/step/laundry_inauguration', { state: { projectId } });
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setComboSelected(selectedValue !== "Escolha seu fornecedor");
        if (selectedValue !== "Escolha seu fornecedor") {
            setComboSelectedId(selectedValue);
        }
        setShowError(false);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!comboSelected) {
            setShowError(true);
        } else {
            setCheckedState({
                ...checkedState,
                [event.target.name]: event.target.checked,
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
        setWhatsappVisible(comboSelected);
    }, [comboSelected]);

    const handleWhatsappClick = () => {

        const supw = supplier.find((s: any) => s.id === Number(comboSelectedId));
        const phoneNumber = supw.phone;
        const message = `Olá, gostaria de falar sobre a instalação das máquinas abaixo para minha lavanderia:
- Conjunto: ${dryer === '9' ? 'Speed Queen STACK Lavadora/Secadora 10kg/10,5kg' : 'Lavadora/Secadora GIANT-C+'}
- Quantidade: ${quantity} conjuntos de máquinas.`;

        const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, "_blank");
        setWhatsappOpen(true);
    };

    return (
        <div>
            {currentUser ? 
            <>
            <Menu user={currentUser} projectId={currentUser?.projects[0]?.id} setRefresh={setRefresh} menuProject={true}/>
            {supplier?.length > 0 ? (
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8" style={{marginTop:80}}>
                                <div className="welcome-section-quantity my-5 mb-3">
                                    <ul>
                                        <li>
                                            <div className='mb-4 text-center'>
                                                <h2 className='p-0 mb-3'>Técnico</h2>
                                                <p>Para essa etapa disponibilizaremos uma lista de téncicos para que você possa escolher uma opção.</p>
                                            </div>
                                            <select
                                                className={`form-select py-3 ${showError && !comboSelected ? 'select-error' : ''}`}
                                                aria-label="Default select example"
                                                onChange={handleSelectChange}
                                            >
                                                <option>Escolha o técnico</option>
                                                {supplier.map((s: any) => (
                                                    <option key={s.id} value={s.id}>
                                                        {s.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className='d-flex justify-content-center align-items-center my-4'>
                                                <button
                                                    onClick={handleWhatsappClick}
                                                    className={`btn btn-success px-4 py-2 ${!whatsappVisible ? 'whatsapp-hidden' : ''}`}
                                                    style={{ borderRadius: 30 }}
                                                >
                                                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> Entrar em contato agora
                                                </button>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="contactCheckbox"
                                                    name="contact"
                                                    checked={checkedState.contact}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label className="form-check-label mx-2" htmlFor="contactCheckbox">
                                                    Entrei em contato com o técnico
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
                                                    Conclui todos os itens da etapa de aquisição
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-center">
                                    <button
                                        style={{width:200, height:60}} 
                                        disabled={!nextEnabled || isLoading}
                                        className={`mt-5 mb-3 py-3 ${!nextEnabled ? 'btn-request-confirm-disabled' : 'btn-request-confirm-suplier'}`}
                                        onClick={handleNext}
                                    >
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
            ) : null}
                            </>
                 : <></>}
        </div>
    );
};

export default Supplier_Technician;
