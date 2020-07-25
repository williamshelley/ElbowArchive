import React from "react";
import SessionErrorsContainer from "./session_errors_container";

const BIRTH_DATE = "birth_date";
const PASSWORD = "password";
const DATE = "date";

class SessionForm extends React.Component {
    constructor(props) {
        super();

        this.state = Object.assign({}, props.nullState);

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(field) {
        return e => {
            e.preventDefault();
            this.setState({ [field]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.action(this.state);
    }

    determineType(field) {
        switch (field){
            case PASSWORD: return PASSWORD;
            case BIRTH_DATE: return DATE;
            default: return "text";
        }
    }

    createInput(label, field) {
        let value = this.state[field];

        return (value !== undefined) ? (
            <label>{label}
                <input
                    type={this.determineType(field)}
                    value={value}
                    autoComplete="on"
                    onChange={this.handleInput(field)} />
            </label>
        ) : null;
    }

    render() {
        let { formType, className } = this.props;
        let { username, password, first_name, last_name, birth_date, gender, phone_number, email } = this.state;

        return (
            <form className={className} onSubmit={this.handleSubmit}>
                <h1>{formType}!</h1>
                <SessionErrorsContainer />
                { this.createInput("First Name:", "first_name") }
                { this.createInput("Last Name:", "last_name") }
                { this.createInput("Birthday:", "birth_date") }
                { this.createInput("Gender:", "gender") }
                
                { this.createInput("Username:", "username") }
                { this.createInput("Password:", "password", "password") }
                { this.createInput("Email:", "email") }

                <button onClick={this.handleSubmit}>{formType}!</button>
            </form>
        );
    }
}

export default SessionForm;