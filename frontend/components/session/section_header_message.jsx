import React from "react";
import * as style from "../../styles/session";

const SectionHeaderMessage = ({ title, description }) => (
    <div className={style.SECTION_HEADER_MESSAGE}>
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
);

export default SectionHeaderMessage;