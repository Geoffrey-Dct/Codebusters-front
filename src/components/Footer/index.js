// == Import npm
import React from 'react';
import './footer.scss';
import { NavLink } from 'react-router-dom';

// == Composant
const Footer = () => (
  <footer className="footer-container">
    <span className="footer-date">2021</span>
    <span className="footer-link">Contact/Mentions légales</span>
  </footer>
);

// == Export
export default Footer;
