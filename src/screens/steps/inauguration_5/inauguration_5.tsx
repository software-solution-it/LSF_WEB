import React, { useEffect, useState } from 'react';
import './inauguration_5.css';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import userService from '../../../services/userService';

const Inauguration_5: React.FC = () => {
    const navigate = useNavigate();

    const handleProduct = (type:string) => {
        handleNext(type);
    };

    const handleNext = (type:any) => {
        localStorage.setItem('dryerType', type );
        navigate('/step/inauguration_6');
    };

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await userService.getCurrentUser();
              if (response) {
              } else {
                  navigate('/login');
              }
          } catch (e) {
              navigate('/login');
          }
      };

      fetchData();
  }, []);


    const carouselData = {
            "carousel": [
              {
                "title": "SECADOR DRYLIGHT",
                "image": "https://maltec.com.br/wp-content/uploads/2023/11/DL-28-STANDARD-e1700485035638.png",
                "description": "Estrutura metálica com pintura eletrostática a pó. Cesto em aço inoxidável. Possui inversor de frequência que possibilita o ajuste de velocidade e reversão do cesto, permitindo uma secagem mais eficiente e igualitária entre os tecidos...",
                "product_id": "17"
              },
              {
                "title": "SECADOR ROTATIVO",
                "image": "https://maltec.com.br/wp-content/uploads/2023/11/DL-28-STANDARD-e1700485035638.png",
                "description": "Estrutura metálica com pintura eletrostática a pó. Cesto em aço inoxidável. Ampla porta de acesso com fácil abertura e fechamento...",
                "product_id": "18"
              },
              {
                "title": "SECADORA GIANT-C+",
                "image": "https://maltec.com.br/wp-content/uploads/2023/08/Giant-C-Pro-Dryer-Wifi-722x1024.png",
                "description": "A Secadora Giant-C+ oferece excelente custo benefício para lavanderias profissionais que necessitam de um equipamento prático, seguro e design moderno...",
                "product_id": "16"
              }
            ]
          
}

    return (
        <div>
        <Menu />
        <main className="d-flex justify-content-center align-items-center">
          <div style={{width:'420px'}}  className="d-flex flex-column align-items-center">
            <div className="d-flex justify-content-center align-items-center py-4">
              <div className="welcome-section-machine">
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {carouselData.carousel.map((item, index) => (
                      <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={item.product_id}>
                        <div className="d-flex justify-content-center align-items-center flex-column">
                          <h2 className="mt-5 text-center">{item.title}</h2>
                          <img className="machine-image my-5" src={item.image} alt="Lavadora" />
                          <div className="px-3 scroll-container">
                            <h4 className="mt-4">Características:</h4>
                            <p className="scroll-text">{item.description}</p>
                          </div>
                          <button className="px-4 btn py-2 my-5 btn-request-confirm-machine" onClick={() => handleProduct(item.product_id)}>
                            Selecionar Lavadora
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
};

export default Inauguration_5;
