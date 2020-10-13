import React from 'react';

import './HistoryButton.css';

const HistoryButton = ({ move, onClick, description }) => {
    return (
        <div className="container">
            <p className="count">{move}.</p>
            <button className="history-button" onClick={() => onClick()}>
                {description}
            </button>
        </div>
    )
}

export default HistoryButton;