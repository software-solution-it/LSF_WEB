import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import sendemailService from '../../services/sendEmail';

const Send = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [language] = useState('pt');
/*
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Replace this URL with your API endpoint
   
      if (response.ok) {
        alert('A code has been sent to your email!');
      } else {
        setMessage('Failed to send code. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };*/
  const Oi= ()=>{}
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">{language === 'pt' ? 'Digite seu Email' : 'Enter Your Email'}</h5>
              <form onSubmit={Oi}>
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