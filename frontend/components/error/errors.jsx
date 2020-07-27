import React from "react";

const Errors = ({ sessionErrors }) => {
    let key = 0;
    function mapErrors(errors) {
        return (errors.map(error => (
            <li key={key++} className="error-item">{error}</li>
        )));
    }
    return (
        <ul className="error-list">
            { mapErrors(sessionErrors) }
        </ul>
    );
};

export default Errors;