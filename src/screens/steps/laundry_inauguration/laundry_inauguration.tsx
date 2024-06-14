import React, { useEffect, useState } from 'react';
import './laundry_inauguration.css'; // Importando o arquivo CSS
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import supplierService from '../../../services/supplierService';

const Laundry_Inauguration: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { projectId } = location.state || {};
    const handleNext = async () => {
        const response = await supplierService.createUserInauguration(projectId);
    
        if (response) {
            navigate('/home');
        }

    };


    useEffect(() => {
        const steps = document.querySelectorAll('.step');
    
        function checkScroll() {
            steps.forEach((step) => {
                const stepTop = step.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (stepTop < windowHeight * 0.9) {
                    step.classList.add('fade-in');
                }
            });
        }
    
        window.addEventListener('scroll', checkScroll);
    
        checkScroll();
    
        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, []);
    

    return (
        <div>
            <Menu user={null} projectId={projectId}/>
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8" style={{marginTop:80}}>
                            <div className="my-5 mb-3">
                                <ul className='p-0'>
                                    <li>
                                        <div className='mb-5'>
                                            <h2 className='p-0 mb-3'>Inauguração</h2>
                                            <p>Um suporte diferenciado para lhe auxiliar na inauguração de sua loja.</p>
                                        </div>

                                        <h4 className='p-0 mb-3 text-center'>Ficha google meu negócio</h4>

                                        <div className='d-flex step my-5'>
                                            <div className='d-flex bg-white step-number' >
                                                <div className='d-flex justify-content-center align-items-center me-3 p-3 ' style={{ backgroundColor: '#00014E', width: 20, height: 20, borderRadius: '100%' }}>
                                                    <span className='text-white'>1</span>
                                                </div>
                                            </div>
                                            <p>Acesse o Google Business Profile: Vá para o site do Google Business Profile e faça login com sua conta do Google. Se você não tiver uma, será necessário criar uma.</p>
                                        </div>
                                        <div className='d-flex step mb-5'>
                                            <div className='d-flex bg-white step-number' >
                                                <div className='d-flex justify-content-center align-items-center me-3 p-3' style={{ backgroundColor: '#00014E', width: 20, height: 20, borderRadius: '100%' }}>
                                                    <span className='text-white'>2</span>
                                                </div>
                                            </div>
                                            <p>Clique em "Gerenciar agora" e comece o processo de adição do seu negócio. Digite o nome da sua empresa para ver se ela já está listada. Se não estiver, você poderá adicionar uma nova empresa.</p>
                                        </div>
                                        <div className='d-flex step mb-5'>
                                            <div className='d-flex bg-white step-number' >
                                                <div className='d-flex justify-content-center align-items-center me-3 p-3' style={{ backgroundColor: '#00014E', width: 20, height: 20, borderRadius: '100%' }}>
                                                    <span className='text-white'>3</span>
                                                </div>
                                            </div>
                                            <p>Preencha as informações necessárias, como o nome da empresa, categoria, endereço e número de telefone. Esses detalhes ajudam os clientes a encontrarem e escolherem sua empresa.</p>
                                        </div>
                                        <div className='d-flex step mb-5'>
                                            <div className='d-flex bg-white step-number' >
                                                <div className='d-flex justify-content-center align-items-center me-3 p-3' style={{ backgroundColor: '#00014E', width: 20, height: 20, borderRadius: '100%' }}>
                                                    <span className='text-white'>4</span>
                                                </div>
                                            </div>
                                            <p>Para controlar a listagem do seu negócio e garantir a precisão das informações, você precisará verificar seu negócio com o Google. Isso pode ser feito por telefone, e-mail, ou correio, dependendo das opções disponíveis para sua localização.</p>
                                        </div>
                                        <div className='d-flex step mb-5'>
                                            <div className='d-flex bg-white step-number' >
                                                <div className='d-flex justify-content-center align-items-center me-3 p-3' style={{ backgroundColor: '#00014E', width: 20, height: 20, borderRadius: '100%' }}>
                                                    <span className='text-white'>5</span>
                                                </div>
                                            </div>
                                            <p>Depois de verificar sua empresa, adicione informações adicionais, como horários de funcionamento, fotos do negócio e uma descrição. Isso pode melhorar a visibilidade do seu negócio e atrair mais clientes.</p>
                                        </div>
                                        <div className='d-flex step mb-5'>
                                            <div className='d-flex bg-white step-number' >
                                                <div className='d-flex justify-content-center align-items-center me-3 p-3' style={{ backgroundColor: '#00014E', width: 20, height: 20, borderRadius: '100%' }}>
                                                    <span className='text-white'>6</span>
                                                </div>
                                            </div>
                                            <p>Após a criação, você pode gerenciar sua listagem pelo Google Business Profile, responder a avaliações, atualizar informações e postar atualizações ou ofertas especiais.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <button className={`mb-5 px-5 py-2 btn-request-confirm-suplier`} onClick={handleNext}>
                                    Concluir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Laundry_Inauguration;
