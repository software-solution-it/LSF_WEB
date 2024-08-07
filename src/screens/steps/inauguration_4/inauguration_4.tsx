import React, { useEffect, useState } from 'react';
import './inauguration_4.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import userService from '../../../services/userService';
import productService from '../../../services/productService';
import notificationService from '../../../services/notificationService';

const Inauguration_4: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { projectId } = location.state || {};
    const { comboCount } = location.state || {};
    const [currentUser, setCurrentUser] = useState<any | null>(null);
    const [refresh, setRefresh] = useState(false);

    const handleNext = async (type:any) => {
        const product = {
            supplierType: 1,
            productId: type,
            quantity: comboCount,
            projectId: projectId
        };

        const response = await productService.createUserProduct(product);

        if(response){

          const notify = {
            userId: currentUser.user.id,
            title: "Novos modelos disponíveis",
            message: "Você recebeu a planta da sua lavanderia e o modelo elétrico, clique para visualizar",
            url: "/models"
        };

          const responseNotify = await notificationService.createNotification(notify);
          if(responseNotify){
            navigate('/step/aquisition', { state: { projectId } });
          }
        }
    };

    const handleProduct = (type:string) => {
        handleNext(type);
    };

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await userService.getCurrentUser();
              setCurrentUser(response);
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
                "title": "Speed Queen STACK Lavadora/Secadora 10kg/10,5kg",
                "image": "https://speedqueencommercial.com/br//wp-content/uploads/sites/38/2019/04/ST_Drop_QuantumGold_Right.png",
                "description": "As lavadoras/secadoras acopladas Speed Queen® oferecem toda a potência e o desempenho que você já espera das nossas lavadoras e secadoras convencionais, mas ocupam metade do espaço.",
                "product_id": "9"
              },
              {
                "title": "Lavadora/Secadora GIANT-C+",
                "image": "https://www.lg.com/ph/images/plp-b2c/ph-giantc-gaellery-1.jpg",
                "description": "O Giant-C+ é a melhor solução para o seu negócio. Economize custos e espaço com alta eficiência e fácil instalação e ganhe dinheiro com a confiabilidade da LG. Mais clientes visitarão sua lavanderia!.",
                "product_id": "15"
              }
            ]
    }


    return (
<div>
  {currentUser ?
  <>
<Menu user={currentUser} projectId={projectId} setRefresh={setRefresh} menuProject={true}/>
  <main className="d-flex justify-content-center align-items-center">
    <div style={{width:'420px', marginTop:80}}  className="d-flex flex-column align-items-center">
      <div className="d-flex justify-content-center align-items-center py-4">
        <div className="welcome-section-machine">
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {carouselData.carousel.map((item, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={item.product_id}>
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <h2 className="mt-5 text-center" style={{width:300}}>{item.title}</h2>
                    <img src={item.image}  className={`machine-image my-5 ${item.product_id === "15" ? 'machine-image-lg' : 'machine-image-speed-queen'}`}  />
                    <div className="px-3 scroll-container px-3">
                      <h4 className="mt-4">Características:</h4>
                      <p className="scroll-text">{item.description}</p>
                    </div>
                    <button className="px-4 btn py-2 my-5 btn-request-confirm-machine" onClick={() => handleProduct(item.product_id)}>
                      Selecionar
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
  </>
                 : <></>}
</div>

    );
};

export default Inauguration_4;
