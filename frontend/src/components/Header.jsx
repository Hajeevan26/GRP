import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.jpeg'

const Header = () => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`w-full fixed top-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent border-b border-white'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-24 md:h-30">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <img
                            className="h-18 md:h-24 w-auto transition-all duration-300"
                            src={logo}
                            alt="Logo"
                        />
                    </div>

                    {/* Page Name */}
                    <div
                        className={`uppercase text-2xl md:text-3xl lg:text-4xl tracking-wide transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'
                            }`}
                    >
                        Pervious Concrete
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header