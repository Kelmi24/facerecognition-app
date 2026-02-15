import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain_modern.png'
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt glareEnable={true} glareMaxOpacity={0.4} scale={1.05} style={{ height: 150, width: 150, borderRadius: '12px' }}>
                <div className="Tilt-inner" style={{ 
                    height: '100%', 
                    width: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}>
                    <img style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px'}} src={brain} alt="logo" />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo