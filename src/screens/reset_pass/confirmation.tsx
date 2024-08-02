import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import confirmation from '../../services/confirmationToken';
import {jwtDecode} from 'jwt-decode';

const HandleConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleConfirmation = async () => {
      try {
        const token = searchParams.get('token') ?? '';
        const id = Number(searchParams.get('Id'));

        const response = await confirmation(token, id);

        if (response?.accessToken) {
            const payload: any = jwtDecode(response.accessToken);

            if (payload.active.toLowerCase() === 'true') {
                localStorage.setItem('accessToken', response.accessToken);
                if(payload.fa.toLowerCase() === 'false'){
                navigate('/reset');
                }else{
                    navigate('/login');
                }
            } 
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log('An unknown error occurred');
        }
      }
    };

    handleConfirmation();
  }, [searchParams, navigate]);

  return (
    <div className="container mt-3 d-flex justify-content-center" >
    <div className="toast show ">
      <div className="toast-header flex-row">
        <strong className="me-auto ">Estamos fazendo a autenticação do link</strong>
        <button type="button" className="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div className="toast-body">
        <p>Logo você será redirecionado para a tela de mudar a senha</p>
      </div>
      <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary mb-3 justify-content-center" role="status">
        <span className="visually-hidden ">Loading...</span>
      </div>
      </div>
    </div>
  </div>
  );
};

export default HandleConfirmation;
