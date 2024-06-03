import React, { useEffect, useState } from 'react';
import './inauguration_4.css';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/Menu';
import userService from '../../../services/userService';

const Inauguration_4: React.FC = () => {
    const navigate = useNavigate();

    const handleNext = (type:any) => {
        localStorage.setItem('washerType', type );
        navigate('/step/inauguration_5');
    };

    const handleProduct = (type:string) => {
        handleNext(type);
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
                "title": "LAVADORA EXTRATORA FRONTAL (high spin)",
                "image": "https://maltec.com.br/wp-content/uploads/2023/08/LEF-28-Nova-e1692411656648.png",
                "description": "Lavadora Extratora frontal, high spin, destinada à lavar, enxaguar e centrifugar roupas em geral. Estrutura externa, tambor e cesto em aço inoxidável. Estrutura interna do equipamento sem solda, processada por união a frio. Dreno elétrico. IHM touch screen de 7”, com navegação em telas interativas. Possibilidade de modo automático e manual configurável. Monitoramento de entradas e saídas. Acesso aos dados de consumo diário. Programação de até 50 receitas com até 30 etapas cada, que podem ser transferidas via USB. Versatilidade na lavagem com: 8 bombas dosadoras mais flush e a possibilidade do ajuste de níveis de água por cm, conforme a porção de roupas inseridas, gerando economia de água por processo. Processos protegidos por senhas. Misturador de água e produtos químicos para evitar manchas e danos nos tecidos. Dosagem de produto químico manual através de saboneteira. Velocidade de lavagem e centrifugação ajustável conforme processo. Sistema Wet Cleaning para lavagens de roupas delicadas. Calibração automática de temperatura, caso ocorra o uso de água quente nos processos. Porta de acesso ao cesto de ampla abertura para facilitar carga e descarga. Sistema de segurança acoplado através de trava eletromecânica, que impede sua abertura enquanto houver movimento no cesto e não permite o funcionamento do equipamento quando a mesma estiver aberta. Possui botão de emergência. Sistema anti-vibração com suspensão através de amortecedores e molas com balanço de carga convergente, permitindo atuação em alta rotação, o que garante baixo índice de umidade residual nos tecidos, gerando economia de energia na secagem. Distribuição da carga monitorada pelo controlador, evitando desbalanceamento. Controle de velocidade através de inversor de frequência, reduzindo o consumo de energia e proporcionando maior durabilidade do equipamento. Transmissão por correias em micro “v”. Equipamento Trifásico. Equipamento com acionamento totalmente elétrico, dispensando o uso de compressor.",
                "product_id": "9"
              },
              {
                "title": "LAVADORA EXTRATORA FRONTAL",
                "image": "https://maltec.com.br/wp-content/uploads/2023/08/LEB-30-ATUALIZADA-2023-2-e1692410783464-768x923.png",
                "description": "Lavadora Extratora frontal, high spin, destinada à lavar, enxaguar e centrifugar roupas em geral. O cesto é em aço inoxidável AISI 304. LEF-50: Parte frontal em aço inoxidável e laterais em aço com pintura eletrostática a pó com aplicação do fundo e-coat. LEF-110: Carenagens em aço inoxidável e dupla saída de dreno. Possui IHM de alta tecnologia com comunicação interativa, permitindo a programação de até 25 receitas com 26 etapas que podem ser transferidas via USB. Possibilidade de atuar em modo manual ou automático. Economia, agilidade e versatilidade a cada processo com 7 bombas dosadoras mais flush, controle de níveis por cm de água, que possibilita o ajuste dos níveis da água conforme a quantidade de roupas inseridas, gerando economia de água nos processos e opção de auto enchimento. Motor dedicado ao processo de lavagem e centrifugação de altíssima eficiência, acionado por inversor de frequência, reduzindo o consumo de energia e proporcionando maior durabilidade do equipamento, permitindo 3 velocidades de lavagem e 4 velocidades de centrifugação. Transmissão por correias em “v” dentadas. Sistema antivibração com suspensão através de amortecedores e molas com balanço de carga convergente, permitindo atuação em alta rotação, o que garante baixo índice de umidade residual nos tecidos gerando economia de energia na secagem. Dispositivo de Segurança que impede o funcionamento da máquina com a porta aberta. Sistema de segurança dotado por botão de emergência, trava pneumática e sensor magnético monitorado por relé de segurança. Sistema anti-vibração que em caso de desbalanceamento da carga, o ciclo é interrompido. Equipamento Trifásico.",
                "product_id": "10"
              },
              {
                "title": "LAVADORA EXTRATORA COM BARREIRA",
                "image": "https://maltec.com.br/wp-content/uploads/2021/12/Lavadora-Extratora-Frontal-Maltec.png",
                "description": "Lavadora Extratora frontal, high spin, destinada à lavar, enxaguar e centrifugar roupas em geral. O cesto é em aço inoxidável AISI 304. LEF-50: Parte frontal em aço inoxidável e laterais em aço com pintura eletrostática a pó com aplicação do fundo e-coat. LEF-110: Carenagens em aço inoxidável e dupla saída de dreno. Possui IHM de alta tecnologia com comunicação interativa, permitindo a programação de até 25 receitas com 26 etapas que podem ser transferidas via USB. Possibilidade de atuar em modo manual ou automático. Economia, agilidade e versatilidade a cada processo com 7 bombas dosadoras mais flush, controle de níveis por cm de água, que possibilita o ajuste dos níveis da água conforme a quantidade de roupas inseridas, gerando economia de água nos processos e opção de auto enchimento. Motor dedicado ao processo de lavagem e centrifugação de altíssima eficiência, acionado por inversor de frequência, reduzindo o consumo de energia e proporcionando maior durabilidade do equipamento, permitindo 3 velocidades de lavagem e 4 velocidades de centrifugação. Transmissão por correias em “v” dentadas. Sistema antivibração com suspensão através de amortecedores e molas com balanço de carga convergente, permitindo atuação em alta rotação, o que garante baixo índice de umidade residual nos tecidos gerando economia de energia na secagem. Dispositivo de Segurança que impede o funcionamento da máquina com a porta aberta. Sistema de segurança dotado por botão de emergência, trava pneumática e sensor magnético monitorado por relé de segurança. Sistema anti-vibração que em caso de desbalanceamento da carga, o ciclo é interrompido. Equipamento Trifásico.",
                "product_id": "11"
              },
              {
                "title": "LAVADORA EXTRATORA COM BARREIRA",
                "image": "https://maltec.com.br/wp-content/uploads/2023/08/leb-virada-e1692410985833.png",
                "description": "Lavadora Extratora com Barreira anti-infecção, tipo Horizontal, high spin, destinada a lavar, enxaguar e centrifugar roupas em geral. O sistema high spin atua em alta rotação, o que garante grande extração da umidade dos tecidos gerando economia de energia na secagem. Estrutura metálica com aplicação do fundo e-coat e pintura eletrostática a pó. Todas áreas em contato com o processo de lavagem são em aço inoxidável AISI 304. Base estrutural galvanizada à fogo. IHM touch screen de 7” com navegação interativa. Possui 50 receitas com 30 etapas cada, que podem ser transferidas via USB. Painéis de operação na área de carga e descarga. Monitoramento de entradas e saídas, alarmes e comandos intertravados impedindo operações simultâneas entre os ambientes. Processos protegidos por senhas. Possibilidade de atuar em modo manual. Possui 13 saídas para bombas dosadoras mais flush. Motor dedicado ao processo de lavagem e centrifugação de altíssima eficiência, acionado por inversor de frequência, reduzindo o consumo de energia e proporcionando maior durabilidade do equipamento além de reduzir o custo de infraestrutura na instalação. O inversor é acoplado no próprio equipamento sem necessidade de periféricos externos. Transmissão por correias em “v” dentadas. Sistema de anti-vibração com balanço de carga convergente e suspensões por bolsas de ar com regulador de pressão e válvulas independentes e, pressostato que impede a centrifugação caso não haja pressão suficiente. Possui amortecedores para redução da vibração e ruídos. Sistema de segurança que impedem abertura das portas enquanto o cesto estiver em movimento. Posicionamento automático do cesto exclusivamente com as portas fechadas. Portas internas com travamento através de mola e trava de segurança. Abertura das portas externas ao final do posicionamento de cesto, mediante acionamento do operador. Drenagem por válvulas de alta vazão inserida na lateral da máquina, para facilitar a manutenção. Controle de nível por cm de água, que possibilita o ajuste dos níveis da água conforme a porção de roupas inseridas, gerando economia de água nos processos. Aquecimento por entrada de vapor direto monitorado pelo controlador, possui válvula solenoide de vapor e filtro Y. Equipamento Trifásico. Possui cesto bipartido para capacidades de 60, 100 e 140 kg. Possui cesto tripartido na capacidade de 240 kg.",
                "product_id": "12"
              },
              {
                "title": "LAVADORA HORIZONTAL COM BARREIRA",
                "image": "https://maltec.com.br/wp-content/uploads/2021/02/LHB-e1614282175862.png",
                "description": "Equipamento destinado à lavagem e enxágue de roupas em geral. Possui barreira de separação de ambiente anti-infecção com visor de acrílico. Painéis de Operação nas áreas de carga e descarga. Estrutura metálica com aplicação do fundo e-coat e pintura eletroestática a pó. Cesto, tambor e suas laterais revestidas em aço inoxidável AISI 304. Possui controlador digital programável, com a indicação de tempo e temperatura, aviso sonoro e parada ao término do ciclo. Drenagem através de válvula borboleta. Possui visor de nível frontal, ponto de entrada de vapor e de produto químico. Saboneteira para abastecimento manual de produtos químicos. Sistema de segurança é composto por botões de emergência monitorados por relé de segurança e sensores magnéticos nas portas externas com intertravamento entre áreas de carga e descarga, que impedem o funcionamento da máquina com alguma das portas abertas. Posicionamento do cesto com as portas fechadas e em baixa velocidade. Movimento do cesto é executado pelo motofreio acionado pelo inversor de frequência que permite o controle de aceleração e desaceleração do equipamento além de contribuir na redução de consumo de energia. Equipamentos com capacidades de até 50Kg, possuem sistema de transmissão por correias em ‘’V’’ e motofreio. LHI-100 possui sistema de transmissão por engrenagens com correntes e motoredutor com motofreio. LHB-100 possui sistema de transmissão por engrenagens com correntes e motoredutor com motofreio.. Equipamentos Monofásicos 220V (LHB-22 e LHB-30). Equipamentos Trifásicos (LHB-50 e LHB-100).",
                "product_id": "13"
              },
              {
                "title": "LAVADORA HORIZONTAL INDUSTRIAL",
                "image": "https://maltec.com.br/wp-content/uploads/2021/03/LHI-e1614616093576.png",
                "description": "Equipamento destinado à lavagem e enxágue de roupas em geral. Estrutura metálica com aplicação do fundo e-coat e pintura eletroestática a pó. Cesto, tambor e suas laterais revestidas em aço inoxidável AISI 304. Possui controlador digital programável, com a indicação de tempo e temperatura, aviso sonoro e parada ao término do ciclo. Drenagem através de válvula borboleta. Possui visor de nível frontal, ponto de entrada de vapor e de produto químico. Saboneteira para abastecimento manual de produtos químicos. Sistema de segurança é composto por botão de emergência monitorado por relé de segurança e sensor magnético que impede o funcionamento da máquina com a porta aberta. Posicionamento do cesto com porta fechada e em baixa velocidade. Movimento do cesto é executado pelo motofreio acionado pelo inversor de frequência que permite o controle de aceleração e desaceleração do equipamento além de contribuir na redução de consumo de energia. Equipamentos com capacidades de até 50Kg, possuem sistema de transmissão por correias em ‘’V’’ e motofreio. LHI-100 possui sistema de transmissão por engrenagens com correntes e motoredutor com motofreio. LHI-100 possui sistema de transmissão por engrenagens com correntes e motoredutor com motofreio. Equipamentos Monofásicos 220v (LHI-22 e LHI-30). Equipamentos Trifásicos (LHI-50 e LHI-100).",
                "product_id": "14"
              },
              {
                "title": "LAVADORA GIANT-C+",
                "image": "https://maltec.com.br/wp-content/uploads/2023/08/New-Giant-C-Pro-Washer-Wifi-768x911.png",
                "description": "A lavadora Giant-C+ oferece excelente custo benefício para lavanderias profissionais que necessitam de um equipamento prático, seguro e design moderno. As lavadoras possuem flexibilidade na instalação, podendo ser instaladas lado a lado ou uma acima da outra (Stacked). Isso proporciona facilidade na reinstalação, caso você mude o layout da sua lavanderia.",
                "product_id": "15"
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

export default Inauguration_4;
