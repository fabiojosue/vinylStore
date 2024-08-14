import React, { useState, useEffect } from 'react';
import './DashboardSideNav.css';
import icon from '../../assets/vinylicon.png';
import { Link } from 'react-router-dom';

const DashboardSideNav: React.FC = () => {
    const [isSidenavVisible, setSidenavVisible] = useState(window.innerWidth > 1000);
    const [isNavbarVisible, setNavbarVisible] = useState(window.innerWidth <= 1000);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1000) {
                setSidenavVisible(true);
                setNavbarVisible(false);
            } else {
                setSidenavVisible(false);
                setNavbarVisible(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidenav = () => {
        setSidenavVisible(!isSidenavVisible);
    };

    const handleLogOut = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/';
    };

    return (
        <>
            {isNavbarVisible && (
                <div className="navbar2">
                    <button className="menu-icon" onClick={toggleSidenav}>
                        &#9776;
                    </button>
                </div>
            )}
            <div className={`sidenav ${isSidenavVisible ? 'active' : ''}`}>
                <img src={icon} alt="avatar" className="avatar" />
                <h2>Fabio</h2>
                <p className="subtitle">Administrator</p>
                <hr className="divider" />
                <Link to="/dashboard/artist" className="sdvButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                    Artists
                </Link>
                <Link to="/dashboard/vinyl" className="sdvButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-vinyl-fill" viewBox="0 0 16 16">
                        <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0"/>
                    </svg>
                    Vinyls
                </Link>
                <hr className="divider" />
                <button className="sdvButton" onClick={handleLogOut}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open-fill" viewBox="0 0 16 16">
                        <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/>
                    </svg>
                    Logout
                </button>
            </div>
        </>
    );
};

export default DashboardSideNav;
