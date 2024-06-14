import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo-home.png';
import { User } from '../interface/userInterface';

interface MenuProps {
    user: User | null;
    projectId: any;
}

const Menu = ({ user, projectId }: MenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('Página Inicial');
    const navigate = useNavigate();
    
    const handleMenuItemClick = (menuItem: string) => {
        setActiveMenuItem(menuItem);
        if (menuItem === 'Sair') {
            localStorage.removeItem('accessToken');
            navigate('/login');
        }
    };

    const handleNavigation = (path: string, state?: any) => {
        if (projectId != null) {
            navigate(path, { state: { projectId: projectId } });
        } else {
            navigate(path, { state: { projectId: state.user.projects[0].id } });
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
                            style={{cursor: 'pointer'}}
                            className={`cursor-pointer activeMenuItem === 'Página Inicial' ? 'active' : ''`}
                            onClick={() => {
                                handleMenuItemClick('Página Inicial');
                                handleNavigation('/home', { user });
                            }}
                        >
                            <i className="me-2 fas fa-home icon"></i> Página Inicial
                        </a>
                    </li>
                    <li>
                        <a
                            style={{cursor: 'pointer'}}
                            className={activeMenuItem === 'Inauguração' ? 'active' : ''}
                            onClick={() => {
                                handleMenuItemClick('Inauguração');
                                handleNavigation('/projects', { user});
                            }}
                        >
                            <i className="me-2 fas fa-star icon"></i> Inauguração
                        </a>
                    </li>
                    <li>
                        <a
                            style={{cursor: 'pointer'}}
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
