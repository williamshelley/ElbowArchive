import React from "react";

const SessionErrors = ({ errors }) => {
    return (
        <ul className="error-list">
            { errors.map((error, idx) => (
                <li key={idx} className="error-item">{error}</li>
            ))}
        </ul>
    );
};

export default SessionErrors;