import React, { useEffect, useState } from 'react';
import './supplier_product.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import { User } from '../../../interface/userInterface';
import userService from '../../../services/userService';
import supplierService from '../../../services/supplierService';
import loading from '../../../assets/loading.gif';

const Supplier_Product: React.FC = () => {
    const navigate = useNavigate();
    const [comboSelected, setComboSelected] = useState(false);
    const [whatsappVisible, setWhatsappVisible] = useState(false);
    const [whatsappOpen, setWhatsappOpen] = useState(false);
    const [nextEnabled, setNextEnabled] = useState(false);
    const [showError, setShowError] = useState(false);
    const [checkedState, setCheckedState] = useState({ contact: false, purchase: false });
    const [product, setProduct] = useState<any>([]);
    const [supplier, setSupplier] = useState<any>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [refresh, setRefresh] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<any>({
        detergent: null,
        softener: null,
        stainRemover: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const { projectId } = location.state || {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userService.getCurrentUser();
                if (response) {
                    setCurrentUser(response.user);
                    setProduct(await supplierService.getSupplierProductByType(3));
                    setSupplier(await supplierService.getSuppliersByType(3));
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
        const response = await supplierService.createUserSupplier(3, currentUser?.projects[0]?.id);
        setIsLoading(false);
        if (response) {
            navigate('/step/payment', { state: { projectId } });
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, type: string) => {
        const value = event.target.value;
        setComboSelected(value !== "Escolha seu fornecedor");
        setSelectedProducts((prev: any) => ({ ...prev, [type]: value }));
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
        if (checkedState.contact && checkedState.purchase && whatsappOpen && selectedProducts) {
            setNextEnabled(true);
        } else {
            setNextEnabled(false);
        }
    }, [checkedState, whatsappOpen, comboSelected, selectedProducts]);

    useEffect(() => {
        if (comboSelected) {
            setWhatsappVisible(true);
        } else {
            setWhatsappVisible(false);
        }
    }, [comboSelected]);

    const handleWhatsappClick = () => {
        const supw = supplier[0];
        const phoneNumber = supw.phone;
        const detergent = product.find((p: any) => p.id.toString() === selectedProducts.detergent)?.productName;
        const softener = product.find((p: any) => p.id.toString() === selectedProducts.softener)?.productName;
        const stainRemover = product.find((p: any) => p.id.toString() === selectedProducts.stainRemover)?.productName;
        const message = `Olá, gostaria de falar sobre a compra dos produtos para minha lavanderia:
- Detergente: ${detergent}
- Amaciante: ${softener}
- Tira-manchas: ${stainRemover}`;

        const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, "_blank");
        setWhatsappOpen(true);
    };

    return (
        <div>
            {currentUser ?
            <>
            <Menu user={currentUser} projectId={currentUser?.projects[0]?.id} setRefresh={setRefresh} menuProject={true}/>
            {product?.length > 0 ? 
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8" style={{ marginTop: 80 }}>
                                <div className="welcome-section-quantity my-5 mb-3">
                                    <ul>
                                        <li>
                                            <div className='mb-4 text-center'>
                                                <h2 className='p-0 mb-3'>Produtos</h2>
                                                <p>Para essa etapa disponibilizaremos uma lista de produtos para que você possa realizar a compra dos produtos necessários.</p>
                                            </div>

                                            <select
                                                className={`form-select py-3 ${showError && !comboSelected ? 'select-error' : ''}`}
                                                aria-label="Default select example"
                                                onChange={(e) => handleSelectChange(e, 'detergent')}
                                            >
                                                <option value="Escolha seu fornecedor">Escolha o DETERGENTE</option>
                                                {product.filter((s: any) => s.washerType === 4).map((s: any) => (
                                                    <option key={s.id} value={s.id}>
                                                        {s.productName}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                className={`form-select py-3 ${showError && !comboSelected ? 'select-error' : ''}`}
                                                aria-label="Default select example"
                                                onChange={(e) => handleSelectChange(e, 'softener')}
                                            >
                                                <option value="Escolha seu fornecedor">Escolha o AMACIANTE</option>
                                                {product.filter((s: any) => s.washerType === 6).map((s: any) => (
                                                    <option key={s.id} value={s.id}>
                                                        {s.productName}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                className={`form-select py-3 ${showError && !comboSelected ? 'select-error' : ''}`}
                                                aria-label="Default select example"
                                                onChange={(e) => handleSelectChange(e, 'stainRemover')}
                                            >
                                                <option value="Escolha seu fornecedor">Escolha o TIRA-MANCHAS</option>
                                                {product.filter((s: any) => s.washerType === 8).map((s: any) => (
                                                    <option key={s.id} value={s.id}>
                                                        {s.productName}
                                                    </option>
                                                ))}
                                            </select>

                                            <div className='d-flex justify-content-center align-items-center my-4'>
                                                <button onClick={handleWhatsappClick} className={`btn btn-success px-4 py-2 ${!whatsappVisible ? 'whatsapp-hidden' : ''}`} style={{ borderRadius: 30 }}>
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
                                                    Comprei os produtos necessários
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-center">
                                    <button style={{width:200, height:60}} disabled={!nextEnabled || isLoading} className={`mt-5 mb-3 py-3 ${!nextEnabled ? 'btn-request-confirm-disabled' : 'btn-request-confirm-suplier'}`} onClick={handleNext}>
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
                            </>
                 : <></>}
            
        </div>
    );
};

export default Supplier_Product;
