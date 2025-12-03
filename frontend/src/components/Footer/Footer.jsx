import React from 'react';
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './Footer.css';

import logo from '../../assets/logo-pescarte.png';

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                
                {/* 1. Lado Esquerdo: Logo e Slogan */}
                <div className="footer-section logo-section">
                    {/* <img src={logo} alt="Logo Pescarte" className="footer-logo-img" /> */}
                    <h2 className="footer-logo">Pescarte Search</h2>
                    <p>Tecnologia e inovação para a pesca artesanal.</p>
                </div>

                {/* 2. Lado Direito: Redes Sociais ou Links */}
                <div className="footer-section social-section">
                    <h3>Siga-nos</h3>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/peapescarte/" className="social-link"><FaInstagram /></a>
                        <a href="https://www.facebook.com/peapescarte/" className="social-link"><FaFacebook /></a>
                        <a href="https://www.youtube.com/PEAPescarte" className='social-link'><FaYoutube /></a>
                    </div>
                </div>
            </div>

            <hr className="footer-divider" />

            {/* 3. Parte Inferior: Copyright e Desenvolvedor */}
            <div className="footer-bottom">
                <p>&copy; 2025 Projeto Pescarte Search. Todos os direitos reservados.</p>
                <p className="dev-credit">
                    Desenvolvido por <strong>Arthur Cézar Martins Ferreira Mól</strong>
                    <a href="https://github.com/arthurcezarmol" target="_blank" rel="noopener noreferrer">
                        <FaGithub style={{ marginLeft: '5px' }} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin style={{ marginLeft: '5px' }} />
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;