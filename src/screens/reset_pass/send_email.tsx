import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import sendingEmail from '../../services/sendEmail';

const Send = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [language] = useState('pt');

  const handleSubmit = async (event:any) => {
      event.preventDefault();
      try {
        const response = await sendingEmail(email);
      
        if (response) {
          setMessage(response.message);
        } else {
          setMessage('Falha ao receber resposta do servidor.');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        setMessage('Erro ao receber resposta do servidor.');
      }
  };
 
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">{language === 'pt' ? 'Digite seu Email' : 'Enter Your Email'}</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">{language === 'pt' ? ' Email' : 'Email address'}</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">{language ==='pt'? 'Enviar o código' : 'Send Code'}</button>
              </form>
              {message && <div className="mt-3 alert alert-info">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Send;