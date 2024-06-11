import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo-home.png';

const Menu: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('Página Inicial');
    const navigate = useNavigate();

    const handleMenuItemClick = (menuItem: string) => {
        setActiveMenuItem(menuItem);
        // Você pode adicionar navegação para cada item do menu, se necessário
        if (menuItem === 'Sair') {
            localStorage.removeItem('accessToken');
            navigate('/login');
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <header className="header d-flex align-items-center justify-content-between">
                <div className="menu-icon" onClick={toggleMenu}>
                    <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div>
                    <img src={Logo} className="logo-home" alt="Logo" />
                </div>
                <div className="notification-icon" onClick={toggleDropdown}>
                    <i className="fas fa-bell bell-icon"></i>
                    <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
                        <span>Nenhuma notificação</span>
                    </div>
                </div>
            </header>

            <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <ul className="mt-2">
                    <li>
                        <a
                            href="/home"
                            className={activeMenuItem === 'Página Inicial' ? 'active' : ''}
                            onClick={() => handleMenuItemClick('Página Inicial')}
                        >
                            <i className="me-2 fas fa-home icon"></i> Página Inicial
                        </a>
                    </li>
                    {/* 
                    <li>
                        <a
                            href="#"
                            className={activeMenuItem === 'Projetos' ? 'active' : ''}
                            onClick={() => handleMenuItemClick('Projetos')}
                        >
                           <i className="me-2 fas fa-folder icon"></i> Projetos*
                        </a>
                    </li>
                    */}
                    <li>
                        <a
                            href="/inauguration"
                            className={activeMenuItem === 'Inauguração' ? 'active' : ''}
                            onClick={() => handleMenuItemClick('Inauguração')}
                        >
                            <i className="me-2 fas fa-star icon"></i> Inauguração
                        </a>
                    </li>
                                  {/*
                    <li className="mb-5">
                        <a
                            href="#"
                            className={activeMenuItem === 'Perfil' ? 'active' : ''}
                            onClick={() => handleMenuItemClick('Perfil')}
                        >
                            <i className="me-2 fas fa-user icon"></i> Perfil
                        </a>
                    </li>
                */}
                    <li>
                        <a
                            href="#"
                            className={activeMenuItem === 'Sair' ? 'active' : ''}
                            onClick={() => handleMenuItemClick('Sair')}
                        >
                            <i className="me-2 text-danger fas fa-sign-out-alt icon"></i> Sair
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Menu;
