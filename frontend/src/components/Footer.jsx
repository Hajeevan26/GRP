import React from 'react';
import logo from '../assets/logo.jpeg';

const Footer = () => {
    return (
        <footer className="bg-zinc-800 text-white py-6">
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">

                {/* Logo */}
                <div className="flex items-center mb-4 lg:mb-0">
                    <img src={logo} alt="Logo" className="h-16 lg:h-24 w-auto" />
                </div>

                {/* Copyright */}
                <div className="text-center lg:text-right text-sm lg:text-lg">
                    © 2025 PCR. All rights reserved. <br className="md:hidden" />
                    Designed and developed by{" "}
                    <a
                        href="https://neirahtech.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-blue-400 transition-colors"
                    >
                        Neirahtech
                    </a>.
                </div>
            </div>
        </footer>
    );
};

export default Footer;