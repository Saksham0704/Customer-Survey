import React from 'react';

const Start = ({ onStart }) => {
    return (
        <div className="welcome-screen">
            <h1>Welcome to the Customer Survey</h1>
            <button onClick={onStart}>Start Survey</button>
        </div>
    );
};

export default Start;
