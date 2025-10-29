import React from 'react';
import { NavLink } from 'react-router-dom';     // Utilizo o NavLink em vez de 'a'
import './Navbar.css'; // Importando o CSS para estilização

function Navbar () {
    return (
        <nav className='navbar'>
            <ul className="nav-menu">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/servicos" className="nav-link">Serviços</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/clima" className="nav-link">Clima</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/financeiro" className="nav-link">Financeiro</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/sobre" className="nav-link">Sobre</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;