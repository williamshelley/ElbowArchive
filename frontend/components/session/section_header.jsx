import React from "react";
import SectionHeaderMessage from "./section_header_message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../styles/session";

const SectionHeader = ({ title, description, faIcon, onIconClick }) => (

    <div className={style.SECTION_HEADER}>
        <SectionHeaderMessage
            title={title}
            description={description} />
        { faIcon ?
            <FontAwesomeIcon className="medium-icon" 
                icon={faIcon} 
                onClick={(e) => { onIconClick(e) }} />
            : null
        }
    </div>
);

export default SectionHeader;