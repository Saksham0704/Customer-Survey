import React, { useEffect } from 'react';

const Thanks = ({ onReset }) => {
    useEffect(() => {
        setTimeout(() => {
            onReset();
        }, 5000);
    }, [onReset]);

    return (
        <div className="thank-you-screen">
            <h1>Thank you for your time!</h1>
            <p>Redirecting to the Welcome Screen...</p>
        </div>
    );
};

export default Thanks;
