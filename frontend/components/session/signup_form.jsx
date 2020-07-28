import React from "react";
import Moment from "moment";
import * as style from "../../styles/session";

const FEMALE = "Female";
const MALE = "Male";

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

        this.setState({ email, phone_number, birth_date }, () => {
            let newUser = this.state;
            this.props.signup(newUser);
        });
    }

    textInput(placeholder, field) {
        return (
            <input
                type="text"
                placeholder={placeholder}
                value={this.state[field]}
                autoComplete="on"
                onChange={this.handleInput(field)} />
        );
    }

    componentDidMount() {
        let now = new Moment();
        this.setState({
            year: now.year(),
            month: now.month(),
            day: now.toDate().getDate()
        })
    }

    datePicker(array, field) {
        return (
            <select
                className={style.BIRTHDAY_INPUT}
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
            <div className={style.BIRTHDAY_INPUT + " " + style.GENDER_OPTION}>
                <label>{gender}</label>
                <input
                    className={style.GENDER_RADIO}
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={this.state.gender === gender}
                    onChange={this.handleInput("gender")}
                />
            </div>
        );
    }

    hideForm(e) {
        e.preventDefault();
        $(`.${style.OVERLAY}`).css("display", "none");
    }

    render() {
        let { username, password, month, year, day, date } = this.state;

        let monthMoment = new Moment(`${year}-${month}`, "YYYY-MM");
        let numDaysInMonth = monthMoment.daysInMonth();
        let daysInMonth = Array.from({ length: numDaysInMonth }, (_, i) => i)
        const numYears = 116;
        let thisYear = monthMoment.year();
        let years = Array.from({ length: numYears }, (_, i) => (thisYear - i));

        return (year) ? (
            <div className={style.OVERLAY}>
                <div className={style.CONTAINER}>
                    <div className={style.SIGNUP_MODAL}>
                        <div className={style.SIGNUP_HEADER}>
                            <div className={style.SIGNUP_MESSAGE}>
                                <h2>Sign Up</h2>
                                <p>It's quick and easy.</p>
                            </div>
                            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/TdCEremeWv5.png" onClick={this.hideForm} />
                        </div>
                        <span className={style.SEPARATOR} />
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                {this.textInput("First name", "first_name")}
                                {this.textInput("Last name", "last_name")}
                            </div>

                            <input
                                type="text"
                                placeholder="Mobile number or email"
                                value={username}
                                autoComplete="on"
                                onChange={this.handleInput("username")} />

                            <input
                                type="password"
                                placeholder="New password"
                                value={password}
                                autoComplete="on"
                                onChange={this.handleInput("password")} />

                            <div className={style.TAG}>
                                <label>Birthday
                                <img src="https://www.marshall.edu/it/files/question-mark-circle-icon.png" />
                                </label>
                            </div>
                            <div className={style.GROUPING}>
                                {this.datePicker(Moment.monthsShort(), "month")}
                                {this.datePicker(daysInMonth, "day")}
                                {this.datePicker(years, "year")}
                            </div>

                            <div className={style.TAG}>
                                <label>Gender
                                <img src="https://www.marshall.edu/it/files/question-mark-circle-icon.png" />
                                </label>
                            </div>
                            <div className={style.GROUPING}>
                                {this.genderSelect(FEMALE)}
                                {this.genderSelect(MALE)}
                                {this.genderSelect("Other")}
                            </div>

                            <button
                                id={style.SIGNUP_BUTTON}
                                onClick={this.handleSubmit}>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        ) : null;
    }
}

export default SignupForm;