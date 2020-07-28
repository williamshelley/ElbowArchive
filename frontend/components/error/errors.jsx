import React from "react";
import * as style from "../../styles/error";

const Errors = ({ sessionErrors }) => {
    let key = 0;
    function mapErrors(errors) {
        return (errors.map(error => (
            <li key={key++} className="error-item">{error}</li>
        )));
    }
    
    return sessionErrors.length > 0 ? (
        <ul className={style.ERROR_LIST}>
            { mapErrors(sessionErrors) }
        </ul>
    ) : null;
};

export default Errors;