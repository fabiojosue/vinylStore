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
                <Link to="/dashboard/artist" className="sdvButton">Artists</Link>
                <Link to="/dashboard/vinyl" className="sdvButton">Vinyls</Link>
                <hr className="divider" />
                <button className="sdvButton" onClick={handleLogOut}>Logout</button>
            </div>
        </>
    );
};

export default DashboardSideNav;
