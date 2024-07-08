import React, { useState } from 'react';
import './waiting_aproval.css';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';

const Waiting_Aproval: React.FC = () => {
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);

    const handleNext = () => {
            navigate('/home');
        }
    return (
        <div>
            <Menu user={null} projectId={null} setRefresh={setRefresh} menuProject={true}/>
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6">
                            <div className="welcome-section-quantity my-5 mb-3">
                                <div className='mb-4 text-center'>
                                <i className="fa-solid fa-check p-2 my-4" style={{fontSize:50, backgroundColor:'rgba(123, 220, 181, 1)', borderRadius:50, width:70, height:70, color:'#FFF'}}></i>
                                    <h2 className='p-0 mb-3'>Recebemos seu comprovante!</h2>
                                    <h5>O comprovante foi recebido com sucesso e será analisado pela nossa equipe em breve. Após essa análise, você poderá prosseguir com o processo. O próximo passo envolve a seleção de um técnico altamente qualificado pela nossa equipe, que será designado para atender a sua loja no endereço indicado na geolocalização.</h5>
                                </div>
                                <div className="text-center">
                                <button className={`mt-5 mb-3 px-5 py-3 btn-request-confirm-suplier`} onClick={handleNext}>
                                    Continuar
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};


export default Waiting_Aproval;
