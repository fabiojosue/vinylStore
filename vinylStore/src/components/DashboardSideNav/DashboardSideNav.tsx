import React from 'react';
import './DashboardSideNav.css';
import icon from '../../assets/vinylicon.png'
import { Link } from 'react-router-dom';

const DashboardSideNav: React.FC = () => {
    const handleLogOut = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/';
    }

    return (
        <div className="sidenav">
                <img src={icon} alt="avatar" className="avatar"></img>
        <h2>Fabio</h2>
        <p className="subtitle">Administrator</p>
        <hr className="divider"></hr>
        
        <Link to="/dashboard/artist" className="sdvButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill icon" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            </svg>
                Artists
        </Link>
        <Link to="/dashboard/vinyl" className="sdvButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-vinyl-fill icon" viewBox="0 0 16 16">
                <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0"/>
            </svg>
                Vinyls
        </Link>
        <hr className="divider"></hr>
        <button className="sdvButton" onClick={handleLogOut}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open-fill icon" viewBox="0 0 16 16">
                <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/>
            </svg>
            Logout
        </button>
        </div>
    );
    }

    export default DashboardSideNav;