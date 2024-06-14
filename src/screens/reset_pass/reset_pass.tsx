import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Logo from '../../assets/logo.png';
import userService from '../../services/userService';
import {jwtDecode} from 'jwt-decode';
import './reset_pass.css';

const Reset: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [language] = useState('pt');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (validatePassword(password, confirmPassword)) {
            const response = await userService.newPassword(password);
            if (response) {
                localStorage.removeItem('accessToken');
                navigate('/login');
            }
        }
    };

    const validatePassword = (password: string, confirmPassword: string) => {
        const errors: string[] = [];
        if (password !== confirmPassword) {
            errors.push('As senhas não coincidem.');
        }

        setPasswordErrors(errors);
        return errors.length === 0;
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handlePasswordFocus = () => {
        setPasswordErrors([]);
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
                                            <h1 className='mt-3 text-center custom-width'>Reset de senha</h1>
                                            <h5 className='text-center custom-width'>Informe sua nova senha de acesso</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12'>
                                        <div className='mt-4 d-flex justify-content-center align-items-center flex-column px-3'>
                                            <div className="form-floating mb-3 position-relative custom-password login-type">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className={`form-control login-type ${passwordErrors.length > 0 ? 'is-invalid' : ''}`}
                                                    id="password"
                                                    placeholder={'Senha'}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    onFocus={handlePasswordFocus}
                                                />
                                                <label htmlFor="password">{language === 'pt' ? 'Senha' : 'Password'}</label>
                                                <i
                                                    className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute eye-icon`}
                                                    style={{ cursor: 'pointer', top: 26 }}
                                                    onClick={togglePasswordVisibility}
                                                ></i>
                                            </div>
                                            <div className="mb-3 error-message">
                                                <ul className="list-unstyled">
                                                    <li className='mb-2'>
                                                        <i className={`me-2 fas ${password.length >= 8 ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'}`}></i>
                                                        Mínimo de 8 dígitos
                                                    </li>
                                                    <li className='mb-2'>
                                                        <i className={`me-2 fas ${/(?=.*[a-z])/.test(password) ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'}`}></i>
                                                        1 Caractere minúsculo
                                                    </li>
                                                    <li className='mb-2'>
                                                        <i className={`me-2 fas ${/(?=.*[A-Z])/.test(password) ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'}`}></i>
                                                        1 Caractere maiúsculo
                                                    </li>
                                                    <li>
                                                        <i className={`me-2 fas ${/(?=.*[\W_])/.test(password) ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'}`}></i>
                                                        1 Caractere especial [@#$]
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="form-floating mb-3 position-relative custom-password login-type">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    className={`form-control login-type ${passwordErrors.length > 0 ? 'is-invalid' : ''}`}
                                                    id="confirmPassword"
                                                    placeholder={'Confirmar Senha'}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    onFocus={handlePasswordFocus}
                                                />
                                                <label htmlFor="confirmPassword">{language === 'pt' ? 'Confirmar Senha' : 'Confirm Password'}</label>
                                                <i
                                                
                                                    className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute eye-icon`}
                                                    style={{ cursor: 'pointer', top: 26}}
                                                    onClick={toggleConfirmPasswordVisibility}
                                                ></i>
                                            </div>
                                            {passwordErrors.length > 0 && (
                                                <div className="d-flex invalid-feedback d-block error-message">
                                                    <ul>
                                                        {passwordErrors.map((error, index) => (
                                                            <li key={index}>{error}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            <button className="mt-3 login-type mb-3 py-3 btn btn-request-confirm" onClick={handleLogin}>
                                                {language === 'pt' ? 'Redefinir Senha' : 'Reset Password'}
                                            </button>
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

export default Reset;
