import React from 'react';
import logo from '../assets/logo.jpg';

const Logo = ({ className = 'h-8 w-8' }) => (
    <img src={logo} alt="Logo" className={className} />
);

export default Logo;