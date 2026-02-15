import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box, onImageLoaded }) => {
    console.log('FaceRecognition rendered with:', { imageUrl, box });
    if (!imageUrl) return null;
    return (
        <div className="center" style={{marginTop: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'center'}}>
            <div className='relative mt2' style={{width: 'fit-content'}}>
                <img id='inputimage' src={imageUrl} alt="detection-photo" width="600px" height="auto" style={{borderRadius: '6px'}} onLoad={onImageLoaded} />
                <div className='bounding-box' style={{top: box.topRow, left: box.leftCol, width: box.width, height: box.height}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;