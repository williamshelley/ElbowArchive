import React from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import * as style from "../../styles/session";
import NamedSelectWrapper from "./named_select_wrapper";
import SectionHeader from "./section_header";
import { faTimes, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleBadInput, errorMessage } from "../../util/form_util";

const FEMALE = "Female";
const MALE = "Male";
const CUSTOM = "Custom";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, this.props.nullState);

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.mergeDate = this.mergeDate.bind(this);
    }

    handleInput(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        }
    }

    mergeDate() {
        let { year, month, day } = this.state;
        return [year, Moment.months(month), day].join("-");
    }

    handleSubmit(e) {
        e.preventDefault();
        let { username, customGender } = this.state;
        let email = undefined;
        let phone_number = undefined;
        if (username.includes("@")) {
            email = username;
        } else if (!username.match(/[a-z]/)) {
            phone_number = username;
        }
        let birth_date = this.mergeDate();

        let gender = this.state.gender;
        if (customGender.length > 0 && customGender !== CUSTOM) {
            gender = customGender;
        }

        this.setState({ email, phone_number, birth_date, gender }, () => {
            console.log(this.state);
            let newUser = this.state;
            this.props.signup(newUser).then(()=>{}, ()=>{
                Object.keys(this.props.errors).forEach(field => {
                    this.setState({ [field]: "" }, () => {
                        $(`#${field}`).css("border", style.ERROR_INPUT_BORDER);
                    });
                });
            });
        });
    }

    createInput(placeholder, field) {
        const type = field === "password" ? "password" : "text";

        let error = this.props.errors[field];
        let message = errorMessage(field);

        return (
            <div style={{position: "relative"}}>
            <input
                id={field}
                type={type}
                placeholder={error ? message : placeholder}
                value={this.state[field]}
                autoComplete="on"
                onBlur={handleBadInput({ field, message, props: this.props })}
                onChange={this.handleInput(field)} />
            {   error ?
                <FontAwesomeIcon 
                className="error" 
                icon={faExclamationCircle} 
                /> : null
            }
            </div>
        );
    }

    datePicker(array, field) {
        return (
            <select
                value={this.state[field]}
                onChange={this.handleInput(field)}>

                <option disabled={true} value={0}>
                    {field[0].toUpperCase() + field.slice(1)}
                </option>

                {array.map((unit, idx) => (
                    <option key={idx} value={unit}>{unit}</option>
                ))}
            </select>
        );
    }

    genderSelect(gender) {
        return (
            <div className={style.RADIO_OPTION} id="gender">
                <label>{gender}</label>
                <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={this.state.gender === gender}
                    onChange={this.handleInput("gender")}
                    onClick={() => { this.setState({ customGender: "" })}}
                />
            </div>
        );
    }

    hideForm(e) {
        e.preventDefault();
        const _nullState = Object.assign({}, this.props.nullState);
        this.setState(()=>_nullState , () =>{
            $(`.${style.SIGNUP_OVERLAY}`).css("display", "none");
            $("input").css("border", style.INPUT_BORDER);
            this.props.clearErrors();
        });
    }

    render() {
        let { month, day, year } = this.state;

        let monthMoment = new Moment(`${year}-${month}`, "YYYY-MM");
        let numDaysInMonth = 31;
        let daysInMonth = Array.from({ length: numDaysInMonth }, 
            (_, i) => (i + 1));
        const numYears = 116;
        let thisYear = monthMoment.year();
        let years = Array.from({ length: numYears }, (_, i) => (thisYear - i));
        let months = Moment.monthsShort();
    
        return (year) ? (
            <div className={style.LOGIN_MODAL}>
                <SectionHeader title="Sign Up" 
                    description="It's quick and easy."
                    faIcon={faTimes}
                    onIconClick={this.hideForm.bind(this)}/>


                <form
                    className={style.SIGNUP_FORM}
                    onSubmit={this.handleSubmit}>
                    <div className={style.SIGNUP_FORM_H_STACK}>
                        {this.createInput("First name", "first_name")}
                        {this.createInput("Last name", "last_name")}
                    </div>

                    {this.createInput("Mobile number or email", "username")}
                    {this.createInput("New Password", "password")}

                    <NamedSelectWrapper id="birth_date" title={"Birthday"}>
                        {this.datePicker(months, "month")}
                        {this.datePicker(daysInMonth, "day")}
                        {this.datePicker(years, "year")}
                    </NamedSelectWrapper>

                    <NamedSelectWrapper id="gender" title={"Gender"}>
                        {this.genderSelect(FEMALE)}
                        {this.genderSelect(MALE)}
                        {this.genderSelect(CUSTOM)}
                    </NamedSelectWrapper>

                    {this.state.gender === CUSTOM ? (
                        <>
                            <div className={style.SMALL_MESSAGE}>
                                Your pronoun is visible to everyone.
                            </div>
                            <input type="text"
                                placeholder="Gender (optional)"
                                value={this.state.customGender}
                                onChange={this.handleInput("customGender")}
                            />
                        </>
                    ) : null}


                    <p>By clicking Sign Up, you agree to our <Link className={style.LINK} to="/terms">Terms</Link>, <Link className={style.LINK} to="/data-policy">Data Policy</Link> and <Link className={style.LINK} to="/cookies-policy">Cookies Policy</Link>. You may receive SMS Notifications from us and can opt out any time.</p>

                    <button
                        className={style.SIGNUP_BUTTON}
                        onClick={this.handleSubmit}>
                        Sign Up
                    </button>
                </form>
            </div>
        ) : null;
    }
}

export default SignupForm;