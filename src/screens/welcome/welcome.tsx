import React, { useState } from 'react';
import './welcome.css';
import Logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
    const [language, setLanguage] = useState('pt');
    const navigate = useNavigate();
    const handleYesClick = () => {
        navigate('/login');
    };

    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className='col-sm-3 inauguracao d-none d-md-block'>
                </div>
                <div className="col">
                    <div className="row">
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className="col-12">
                                <div className="row">
                                    <div className='col-12'>
                                        <div className='d-flex w-100 justify-content-center align-items-center flex-column'>
                                            <img src={Logo} alt="Logo" className='logo' />
                                            <h3 className='mt-4 mb-4 text-center custom-width'>
                                                {language === 'pt' ? 'Boas-vindas ao portal de acompanhamento e inauguração da sua Lavanderia.' : 'Welcome to the monitoring and inauguration portal of your Laundry.'}
                                            </h3>
                                            <h4>
                                                {language === 'pt' ? 'Você já é aluno do LSF?' : 'Are you already a student at LSF?'}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12'>
                                        <div className='mt-4 d-flex justify-content-center align-items-center flex-column'>
                                            <button className="mb-3 py-3 btn btn-request-confirm btn-requst" onClick={handleYesClick}>
                                                {language === 'pt' ? 'Sim' : 'Yes'}
                                            </button>
                                            <a className='' href="https://hotmart.com/pt-br/marketplace/produtos/lavanderia-self-service-metodo-sem-franquia/N75618382D" style={{ textDecoration: 'none' }}>
      <button className="py-3 border  btn-request" style={{color: 'black !important', backgroundColor: '#F5F8FF' }}>
        {language === 'pt' ? 'Não' : 'No'}
      </button>
    </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
