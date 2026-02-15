import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> 
            <p className="f3 center" style={{ textAlign: 'center', marginBottom: 24, color: 'var(--text-secondary)' }}>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className="center" style={{ width: '100%', maxWidth: '700px' }}>
                <div className="form center pa4 br3 shadow-5">
                    <input id="imageUrl" name="imageUrl" className="f4 pa2 w-70 center custom-input" type="text" placeholder="Paste image URL here..." onChange={onInputChange} />
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple custom-btn" onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;