import React from "react";
import * as style from "../../styles/session";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const NamedSelectWrapper = ({ title, iconUrl, children }) => (

    
    <div className={style.NAMED_SELECTOR_CONTAINER}>
<div className={style.NAMED_SELECTOR_TAG}>
    <label>{title}</label>
    <FontAwesomeIcon icon={faQuestionCircle} />

</div>
<div className={style.NAMED_SELECTORS}>
    {/* {this.datePicker(Moment.monthsShort(), "month")}
    {this.datePicker(daysInMonth, "day")}
{this.datePicker(years, "year")} */}
    {children}
</div>
</div>
);

export default NamedSelectWrapper;