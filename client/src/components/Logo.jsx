import React from 'react';
import logo from '../assets/logo.png';

const Logo = ({ className = 'h-9 w-9' }) => (
    <img src={logo} alt="Logo" className={className} />
);

export default Logo;