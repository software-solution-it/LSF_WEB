import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/Menu';
import userService from '../../services/userService';
import mandalaService from '../../services/mandalaService';
import { User } from '../../interface/userInterface';
import { Mandala } from '../../interface/mandalaInterface';
import PDFViewer from '../../components/PdfViewer';
import ReactPDF from '@react-pdf/renderer';
import productService from '../../services/productService';

const Model: React.FC = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<User | any>(null);
    const [refresh, setRefresh] = useState(true);
    const [product, setProduct] = useState<any>(null);
    const [mandala, setMandala] = useState<Mandala>({
        id: 0,
        chooseLocation: false,
        closeContract: false,
        plumbingElectrical: false,
        drywall: false,
        mdfOptional: false,
        glassWall: false,
        machines: false,
        automatedComputers: false,
        cardMachine: false,
        platesDispensers: false,
        chemicals: false,
        brandRegistrationOptional: false,
        stickers: false,
        environmentDecoration: false,
        sofaTableBasket: false,
        facade: false,
        airConditioning: false,
        internet: false,
        paperHolder: false,
        alcoholSprayer: false,
        clothesFoldersOptional: false,
        camera: false,
        airSensor: false,
        machineAlarm: false,
        wifiSocketAdapter: false,
        doorLock: false,
        userId: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await userService.getCurrentUser();
                if (userResponse) {
                    setCurrentUser(userResponse.user);
                    const mandalaResponse = await mandalaService.listMandala();
                    if (mandalaResponse) {
                        setMandala(mandalaResponse);
                    }
                } else {
                    navigate('/login');
                }
            } catch (e) {
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    useEffect(() => {
        const fetchProduct = async () => {
            if (currentUser) {
                try {
                    const productResponse = await productService.getUserProduct(currentUser.projects[0].id);
                    if (productResponse) {
                        setProduct(productResponse);
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        };

        fetchProduct();
    }, [currentUser]);

    const ViewPdf = (type:string) => {
    navigate('/view_model', { state: { type: type } });   
};

    return (
        <div>
            {currentUser?.id ? 
            <>
                      <Menu user={currentUser} projectId={currentUser?.projects[0]?.id} setRefresh={setRefresh} menuProject={true}/>
            <main className="main-content">
                <div className="row welcome-section" style={{marginTop:100}}>
                    <div className="col">
                        <h1>Meus modelos</h1>
                        <p>Abaixo você encontra os modelos da sua lavanderia</p>
                    </div>
                </div>
                {currentUser.projects.map((project:any, index:any) => (
                    <div key={index}>
                        <div className="project-info-documents mb-3 row px-5 mx-3">
                        <div className="col">
                            <h4 className="col">Modelo elétrico</h4>
                            <p className="col">Modelo elétrico da sua lavanderia:</p>
                            <div className='d-flex'>
                            <button disabled={!currentUser?.projects[0]?.electric && !currentUser?.projects[0].point} onClick={() => ViewPdf("electric")} className="btn mandala-button me-1">
                            <i className="fas"></i> Visualizar
                        </button>
                        </div>
                       
                        </div>
                        <div className="col">
                            <h4 className="col">Planta</h4>
                            <p className="col">Planta da sua lavanderia:</p>
                            <div className='d-flex'>
                            <button disabled={!product?.quantity && !product?.id} onClick={() => ViewPdf("plant")} className="btn mandala-button me-1">
                            <i className="fas"></i> Visualizar
                        </button>
                        </div>
                        </div>
                        </div>
                    </div>
                ))}
            </main>
            </>
            : <></>}
            
        </div>
    );
};

export default Model;
