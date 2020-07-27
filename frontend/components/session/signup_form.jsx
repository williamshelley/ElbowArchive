import React from "react";
import Moment from "moment";

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
            e.preventDefault();
            this.setState({ [field]: e.target.value });
        }
    }

    mergeDate() {
        let { year, month, day} = this.state;
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
                day: now.toDate().getDate() })
    }

    datePicker(array, field) {
        return (
            <select
                className={`birthday-${field}`}
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

    render() {
        let { formType, className } = this.props;
        let { username, password, month, year, day, date } = this.state;

        let monthMoment = new Moment(`${year}-${month}`, "YYYY-MM");
        let numDaysInMonth = monthMoment.daysInMonth();
        let daysInMonth = Array.from({ length: numDaysInMonth }, (_, i) => i)
        const numYears = 116;
        let thisYear = monthMoment.year();
        let years = Array.from({ length: numYears}, (_, i) => (thisYear - i));

        return (year) ? (
            <form className={className} onSubmit={this.handleSubmit}>
                <h1>{formType}!</h1>
                <div className={`${className}-name`}>
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

                { this.datePicker(Moment.months(), "month")}
                { this.datePicker(daysInMonth, "day")}
                { this.datePicker(years, "year")}

                <button onClick={this.handleSubmit}>{formType}!</button>
            </form>
        ) : null;
    }
}

export default SignupForm;