import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Menu from '../../components/Menu';
import userService from '../../services/userService';
import productService from '../../services/productService';
import PDFViewer from '../../components/PdfViewer';

const ViewPdf: React.FC = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [product, setProduct] = useState<any>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const location = useLocation();
    const { type } = location.state || {};
    const { projectId } = location.state || {};
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userResponse = await userService.getCurrentUser();
                if (userResponse) {
                    setCurrentUser(userResponse.user);
                } else {
                    navigate('/login');
                }
            } catch (e) {
                navigate('/login');
            }
        };

        fetchUser();
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

    useEffect(() => {
        if (product && currentUser) {
            if (type !== 'electric') {
                const { length, width } = currentUser.projects[0].point;
                switch (`${length}x${width}`) {
                    case '3x4':
                        setFileUrl("https://faculdadedalavanderia.s3.sa-east-1.amazonaws.com/SketchTemplate/3X4m.pdf");
                        break;
                    case '5x3':
                        setFileUrl("https://faculdadedalavanderia.s3.sa-east-1.amazonaws.com/SketchTemplate/5x3m.pdf");
                        break;
                    case '4x4':
                        setFileUrl("https://faculdadedalavanderia.s3.sa-east-1.amazonaws.com/SketchTemplate/4x4m.pdf");
                        break;
                    case '4x5':
                        setFileUrl("https://faculdadedalavanderia.s3.sa-east-1.amazonaws.com/SketchTemplate/4x5m.pdf");
                        break;
                    case '5x5':
                        setFileUrl("https://faculdadedalavanderia.s3.sa-east-1.amazonaws.com/SketchTemplate/5x5m.pdf");
                        break;
                    case '3x6':
                        setFileUrl("https://faculdadedalavanderia.s3.sa-east-1.amazonaws.com/SketchTemplate/3x6m.pdf");
                        break;
                    case '4x6':
                        setFileUrl("https://faculdadedalavanderia.s3.sa-east-1.amazonaws.com/SketchTemplate/4x6m.pdf");
                        break;
                    default:
                        setFileUrl("https://faculdadedalavanderia.s3.sa-east-1.amazonaws.com/SketchTemplate/5x6m.pdf");
                }
            } else {
                const { network } = currentUser.projects[0].electric;
                switch (`${network}-${product.quantity}`) {
                    case 'Monofasica-1':
                    case 'Monofasica-2':
                    case 'Monofasica-3':
                        case 'Monofasica-4':
                            case 'Monofasica-5':
                                case 'Monofasica-6':
                        setFileUrl("https://faculdadedalavanderia.s3.sa-east-1.amazonaws.com/ElectricModel/elec2conjmono.pdf");
                        break;
                    case 'Bifasica-1':
                    case 'Bifasica-2':
                    case 'Bifasica-3':
                    case 'Bifasica-4':
                        setFileUrl("https://faculdadedalavanderia.s3.sa-east-1.amazonaws.com/ElectricModel/elec3conjbif.pdf");
                        break;
                    case 'Trifasica-1':
                    case 'Trifasica-2':
                    case 'Trifasica-3':
                        setFileUrl("https://faculdadedalavanderia.s3.sa-east-1.amazonaws.com/ElectricModel/elec3conjtrif.pdf");
                        break;
                    case 'Trifasica-4':
                    case 'Trifasica-5':
                        setFileUrl("https://faculdadedalavanderia.s3.sa-east-1.amazonaws.com/ElectricModel/elec4conjtrif.pdf");
                        break;
                }
            }
        }
    }, [product, currentUser, type]);

    return (
        <div>
            <Menu user={currentUser?.user} projectId={currentUser?.projects[0]?.id} setRefresh={() => {}} />
            {currentUser?.id ? (
                <main className="main-content">
                    <div className="welcome-section-model" style={{ marginTop: 100 }}>
                        <div>
                            {type === 'electric' ? <h1>Modelo Elétrico</h1> : <h1>Planta</h1>}
                            <p>{type === 'electric' ? 'Modelo elétrico da sua lavanderia' : 'Planta baixa da sua lavanderia'}</p>
                        </div>
                    </div>
                    {currentUser.projects.map((project: any, index: any) => (
                        <div className="project-info-model" key={index}>
                            {fileUrl ? <PDFViewer fileUrl={fileUrl} /> : <p>Carregando...</p>}
                        </div>
                    ))}
                </main>
            ) : null}
        </div>
    );
};

export default ViewPdf;
