import React from 'react'
import bg_img from '../assets/bg_img.jpg'

const Hero = () => {
    return (
        <section
            className="relative w-full h-[440px] md:h-[520px] lg:h-[540px] flex items-center justify-start px-4 md:px-8"
            style={{ backgroundImage: `url(${bg_img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Centered title */}
            <h1 className="relative text-white text-4xl md:text-6xl lg:text-7xl text-left px-4 pt-30">
                GPR Prediction
            </h1>
        </section>
    )
}

export default Hero