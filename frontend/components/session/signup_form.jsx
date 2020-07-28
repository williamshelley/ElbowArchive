import React from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import * as style from "../../styles/session";
import SectionHeaderMessage from "./section_header_message";
import NamedSelectWrapper from "./named_select_wrapper";

const FEMALE = "Female";
const MALE = "Male";
const Q_MARK_URL = "https://www.marshall.edu/it/files/question-mark-circle-icon.png";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, this.props.nullState);

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.mergeDate = this.mergeDate.bind(this);
        this.handleErrorPresence = this.handleErrorPresence.bind(this);
    }

    handleInput(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        }
    }

    mergeDate() {
        let { year, month, day } = this.state;
        return [year, month, day].join("-");
    }

    handleSubmit(e) {
        e.preventDefault();
        let { username } = this.state;
        let email = undefined;
        let phone_number = undefined;
        if (username.includes("@")) {
            email = username;
        } else if (!username.match(/[a-z]/)) {
            phone_number = username;
        }
        let birth_date = this.mergeDate();

        let gender = this.state.gender;
        if (this.state.customGender.length > 0) {
            gender = this.state.customGender;
        }

        this.setState({ email, phone_number, birth_date, gender }, () => {
            let newUser = this.state;
            this.props.signup(newUser);
        });
    }


    componentDidMount() {
        let now = new Moment();
        this.setState({
            year: now.year(),
            month: now.month(),
            day: now.toDate().getDate()
        })
    }

    textInput(placeholder, field) {
        return (
            <input
                type="text"
                placeholder={placeholder}
                value={this.state[field]}
                autoComplete="on"
                onBlur={this.handleErrorPresence}
                onChange={this.handleInput(field)} />
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
                    <option key={idx} value={idx}>{unit}</option>
                ))}
            </select>
        );
    }

    genderSelect(gender) {
        return (
            <div className={style.RADIO_OPTION}>
                <label>{gender}</label>
                <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={this.state.gender === gender}
                    onChange={this.handleInput("gender")}
                    onBlur={this.handleErrorPresence}
                    onClick={() => {
                        this.setState({ customGender: "" })
                    }}
                />
            </div>
        );
    }


    hideForm(e) {
        e.preventDefault();
        $(`.${style.SIGNUP_OVERLAY}`).css("display", "none");
    }

    handleErrorPresence(e) {
        e.preventDefault();
        if (e.target.value.length <= 0) {
            $(e.target).css("border", "1px solid red");
        } else {
            $(e.target).css("border", style.INPUT_BORDER);
        }
    }

    render() {
        let { username, password, month, year } = this.state;

        let monthMoment = new Moment(`${year}-${month}`, "YYYY-MM");
        // let numDaysInMonth = monthMoment.daysInMonth();
        let numDaysInMonth = 31;
        let daysInMonth = Array.from({ length: numDaysInMonth }, (_, i) => (i + 1))
        const numYears = 116;
        let thisYear = monthMoment.year();
        let years = Array.from({ length: numYears }, (_, i) => (thisYear - i));

        return (year) ? (
            <div className={style.LOGIN_MODAL}>
                <div className={style.SECTION_HEADER}>
                    <SectionHeaderMessage
                        title={"Sign Up"}
                        description={"It's quick and easy."} />
                    <img
                        className="medium-icon"
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/TdCEremeWv5.png" onClick={this.hideForm} />
                </div>

                <form
                    className={style.SIGNUP_FORM}
                    onSubmit={this.handleSubmit}>
                    <div className={style.SIGNUP_FORM_H_STACK}>
                        {this.textInput("First name", "first_name")}
                        {this.textInput("Last name", "last_name")}
                    </div>

                    <input
                        type="text"
                        placeholder="Mobile number or email"
                        value={username}
                        autoComplete="on"
                        onBlur={this.handleErrorPresence}
                        onChange={this.handleInput("username")} />

                    <input
                        type="password"
                        placeholder="New password"
                        value={password}
                        autoComplete="on"
                        onBlur={this.handleErrorPresence}
                        onChange={this.handleInput("password")} />

                    <NamedSelectWrapper
                        title={"Birthday"}
                        iconUrl={Q_MARK_URL}>
                        {this.datePicker(Moment.monthsShort(), "month")}
                        {this.datePicker(daysInMonth, "day")}
                        {this.datePicker(years, "year")}
                    </NamedSelectWrapper>

                    <NamedSelectWrapper
                        title={"Gender"}
                        iconUrl={Q_MARK_URL}>
                        {this.genderSelect(FEMALE)}
                        {this.genderSelect(MALE)}
                        {this.genderSelect("Custom")}
                    </NamedSelectWrapper>

                    {this.state.gender === "Custom" ? (
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