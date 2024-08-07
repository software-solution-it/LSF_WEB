import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './login.css';
import Logo from '../../assets/logo.png';
import userService from '../../services/userService';
import {jwtDecode} from 'jwt-decode';
import loading from '../../assets/loading.gif';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [language] = useState('pt');
    const [userInactive, setUserInactive] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true);
        const response = await userService.login(email, password);
        setIsLoading(false);

        if (response?.accessToken) {
            const payload: any = jwtDecode(response.accessToken);

            if (payload.active.toLowerCase() === 'true') {
                localStorage.setItem('accessToken', response.accessToken);
                if(payload.fa.toLowerCase() === 'false'){
                navigate('/home');
                }else{
                    navigate('/reset');
                }
            } else {
                setUserInactive(true);
            }
        } else {
            setEmailError(true);
            setPasswordError(true);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailFocus = () => {
        setEmailError(false);
        setUserInactive(false);
    };

    const handlePasswordFocus = () => {
        setPasswordError(false);
        setUserInactive(false);
    };

    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className='bg-dark col-sm-3 inauguracao d-none d-md-block'></div>
                <div className="col">
                    <div className="row">
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className="col-12">
                                <div className="row">
                                    <div className='col-12'>
                                        <div className='d-flex mb-5 w-100 justify-content-center align-items-center flex-column'>
                                            <img src={Logo} alt="Logo" className='logo' />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12'>
                                        <div className='d-flex justify-content-center align-items-center flex-column'>
                                            <h1 className='mt-3 text-center custom-width'>Portal do aluno</h1>
                                            <h5 className='text-center custom-width'>Gerencie sua lavanderia de forma rápida e prática</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12'>
                                        <div className='mt-4 d-flex justify-content-center align-items-center flex-column'>
                                            <div className="form-floating mb-3 login-type">
                                                <input
                                                    type="email"
                                                    className={`form-control login-type ${emailError ? 'is-invalid' : ''}`}
                                                    id="email"
                                                    placeholder={language === 'pt' ? 'Email' : 'E-mail'}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    onFocus={handleEmailFocus}
                                                    disabled={isLoading}
                                                />
                                                <label htmlFor="email">{language === 'pt' ? 'Email' : 'E-mail'}</label>
                                                {emailError && <div className="invalid-feedback">{language === 'pt' ? 'Email inválido' : 'Invalid email'}</div>}
                                            </div>
                                            <div className="form-floating mb-3 position-relative custom-password login-type">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className={`form-control login-type ${passwordError ? 'is-invalid' : ''}`}
                                                    id="password"
                                                    placeholder={language === 'pt' ? 'Senha' : 'Password'}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    onFocus={handlePasswordFocus}
                                                    disabled={isLoading}
                                                />
                                                <label htmlFor="password">{language === 'pt' ? 'Senha' : 'Password'}</label>
                                                <i
                                                    className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute ${passwordError ? 'eye-icon' : 'eye-icon-old'}`}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={togglePasswordVisibility}
                                                ></i>
                                                {passwordError && <div className="invalid-feedback error-message">{language === 'pt' ? 'Senha inválida' : 'Invalid password'}</div>}
                                            </div>
                                            {userInactive && <div className="text-danger mb-3">{language === 'pt' ? 'Usuário ainda não está ativo' : 'User is not active yet'}</div>}
                                            <button className="login-type mb-3 py-3 btn btn-request-confirm" onClick={handleLogin} disabled={isLoading}>
                                                {isLoading ? (
                                                    <img style={{width: 25}} src={loading} alt="Loading" className="loading-gif" />
                                                ) : (
                                                    language === 'pt' ? 'Entrar' : 'Login'
                                                )}
                                            </button>
                                            <a className="text-muted" href="/sendemail">Esqueceu a Senha?</a>
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

export default Login;
