import React, { useEffect, useImperativeHandle, useState } from 'react';
import './supplier.css';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import { CurrentUser } from '../../../interface/userInterface';
import userService from '../../../services/userService';
import supplierService from '../../../services/supplierService';

const Suplier: React.FC = () => {
    const navigate = useNavigate();
    const [comboSelected, setComboSelected] = useState(false);
    const [comboSelectedId, setComboSelectedId] = useState<any>();
    const [whatsappVisible, setWhatsappVisible] = useState(false);
    const [whatsappOpen, setWhatsappOpen] = useState(false);
    const [nextEnabled, setNextEnabled] = useState(false);
    const [showError, setShowError] = useState(false);
    const [supplier, setSupplier] = useState<any>([]);
    const [checkedState, setCheckedState] = useState({ contact: false, purchase: false });

    const washer = localStorage.getItem('dryerType' );
    const dryer = localStorage.getItem('washerType' );
    const quantity = localStorage.getItem('machineQuantity');


    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await userService.getCurrentUser();
            if (response) {
                setCurrentUser(response);
                setSupplier(await supplierService.getSuppliersByType(1));
            }else{
                navigate('/login');
            }
        }catch(e){
            navigate('/login');
        }
        };

        fetchData();
    }, []);



    const handleNext = async () => {
    
        const response = await supplierService.createUserSupplier(1);
    
        if (response) {
            navigate('/step/board');
        }
    };

    const handleWhatsappClick = () => {
        const supw = supplier.find((s: any) => s.id === Number(comboSelectedId));
        const phoneNumber = supw.phone;
        const shoppingList = "Lista de compras:\n- Item 1\n- Item 2\n- Item 3"; // Substitua pela sua lista real
        const pngLink = "https://dnschecker.org/themes/common/images/general/logo.svg"; // Substitua pelo link real do seu arquivo PNG
    
        const whatsappMessage = `${encodeURIComponent(shoppingList)}\n\nVeja o PNG aqui: ${encodeURIComponent(pngLink)}`;
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
        
        window.open(whatsappLink, "_blank");
        setWhatsappOpen(true);
    };
    
    

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setComboSelected(event.target.value !== "Escolha seu fornecedor");
        if(event.target.value !== "Escolha seu fornecedor"){
        setComboSelectedId(event?.target?.value)
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
        if(checkedState.contact && checkedState.purchase && whatsappOpen && comboSelected) {
            setNextEnabled(true);
        }else{
            setNextEnabled(false);
        }
    }, [checkedState, whatsappOpen, comboSelected]);

    
    useEffect(() => {
        if(comboSelected) {
            setWhatsappVisible(true)
        }else{
            setWhatsappVisible(false)
        }
    }, [comboSelected]);

    return (
        <div>
            <Menu />
            {supplier?.length > 0  ? 
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8">
                            <div className="welcome-section-quantity my-5 mb-3">
                                <ul>
                                    <li>
                                        <div className='mb-4 text-center'>
                                            <h2 className='p-0 mb-3'>Fornecedor de máquinas</h2>
                                            <p>Disponibilizaremos uma lista de fornecedores para que você possa realizar a compra das máquinas escolhidas.</p>
                                        </div>

                                        <select
                                            className={`form-select py-3  ${showError && !comboSelected ? 'select-error' : ''}`}
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
                                            <button onClick={() => {handleWhatsappClick()}} className={`btn btn-success px-4 py-2 ${!whatsappVisible? 'whatsapp-hidden' : ''}`} style={{ borderRadius: 30 }}><i className="fa-brands fa-whatsapp" aria-hidden="true"></i> Entrar em contato agora</button>
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
                                                Comprei as máquinas escolhidas
                                            </label>
                                        </div>

                                    </li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <button disabled={!nextEnabled} className= {`mt-5 mb-3 px-5 py-3 ${!nextEnabled ? 'btn-request-confirm-disabled' : 'btn-request-confirm-suplier'}`} onClick={handleNext}>
                                    Próximo passo
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

export default Suplier;
