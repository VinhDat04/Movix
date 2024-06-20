import React from 'react';
import './modalfilter.css';

const CustomModal = ({ show, handleClose, children }) => {
    return (
        <div className={`modal ${show ? 'show' : ''}`} onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={handleClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default CustomModal;
