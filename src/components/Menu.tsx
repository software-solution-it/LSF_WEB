import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { User } from '../interface/userInterface';
import notificationService from '../services/notificationService';
import Logo from '../assets/logo-home.png';

interface MenuProps {
    user: User | null;
    projectId: any;
    setRefresh: (refresh: boolean) => void; // Definindo o tipo de setRefresh corretamente
}

const Menu = ({ user, projectId, setRefresh }: MenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
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

    const fetchNotifications = async () => {
        try {
            const userId = user ? user.id : null;
            if (!userId) return;

            const response = await notificationService.getUserNotifications(userId);
            setNotifications(response!.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [user, setRefresh]);

    const markAsRead = async (id: any) => {
        try {
            await notificationService.markAsRead(id);
            fetchNotifications(); // Refresh notifications after marking as read
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const deleteNotification = async (id: any) => {
        try {
            await notificationService.deleteNotification(id);
            fetchNotifications();
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const openNotification = (url: any, id: any) => {
        markAsRead(id);
        if (url !== null && url !== '') {
            window.open(url);
        }
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
                    {notifications.filter((notification: any) => !notification.isRead).length > 0 &&
                        <span className="notification-count">
                            {notifications.filter((notification: any) => !notification.isRead).length}
                        </span>
                    }
                    <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
                        {notifications.length === 0 ? (
                            <span className='text-center'>Nenhuma notificação</span>
                        ) : (
                            <ul className="notification-list">
                                {notifications.map((notification: any) => (
                                    <li key={notification.id}>
                                        <div className={notification.isRead ? 'notification-container-unread' : 'notification-container'}>
                                            <div className="notification-message">
                                                <a href="#" onClick={() => openNotification(notification.url, notification.id)}>
                                                    <strong>{notification.title}</strong>
                                                    <p>{notification.message}</p>
                                                </a>
                                                <span className="notification-time">{format(new Date(notification.createdAt), 'dd/MM/yyyy HH:mm:ss')}</span>
                                                <span className="notification-status">{notification.isRead ? 'Lida' : 'Não lida'}</span>
                                            </div>
                                            <button className="delete-icon" onClick={() => deleteNotification(notification.id)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </header>

            <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <ul className="mt-2">
                    <li>
                        <a
                            style={{ cursor: 'pointer' }}
                            className={activeMenuItem === 'Página Inicial' ? 'active' : ''}
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
                            style={{ cursor: 'pointer' }}
                            className={activeMenuItem === 'Inauguração' ? 'active' : ''}
                            onClick={() => {
                                handleMenuItemClick('Inauguração');
                                handleNavigation('/projects', { user });
                            }}
                        >
                            <i className="me-2 fas fa-star icon"></i> Inauguração
                        </a>
                    </li>
                    <li>
                        <a
                            style={{ cursor: 'pointer' }}
                            className={activeMenuItem === 'Modelos' ? 'active' : ''}
                            onClick={() => {
                                handleMenuItemClick('Modelos');
                                handleNavigation('/models', { user });
                            }}
                        >
                            <i className="me-2 fas fa-star icon"></i> Meus modelos
                        </a>
                    </li>
                    <li>
                        <a
                            style={{ cursor: 'pointer' }}
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
