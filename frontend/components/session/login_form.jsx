import React from "react";
import { Link } from "react-router-dom";
import * as style from "../../styles/session";
import { handleBadInput, errorMessage } from "../../util/form_util";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.presentSignup = this.presentSignup.bind(this);
    }

    handleInput(field) {
        return e => {
            e.preventDefault();
            this.setState({ [field]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let { username, password } = this.state;
        let email = undefined;
        let phone_number = undefined;
        if (username.includes("@")) {
            email = username;
        } else {
            phone_number = username;
        }
        let credentials = {
            email,
            phone_number,
            password
        };

        this.props.login(credentials).then(()=>{}, ()=>{
            this.setBorders(style.ERROR_INPUT_BORDER);
        });;
    }

    setBorders(border) {
        $(`#login-username`).css("border", border);
        $(`#login-password`).css("border", border);
    }

    presentSignup(e) {
        e.preventDefault();
        this.props.clearErrors();
        this.setBorders(style.INPUT_BORDER);
        let signupForm = $(`.${style.SIGNUP_OVERLAY}`);
        signupForm.css("display", "flex");
    }

    createInput(placeholder, field) {
        const type = field === "password" ? "password" : "text";

        let login = this.props.errors.login;
        let error = undefined;
        if (login) {
            error = login[field];
        }
        let message = errorMessage(field);

        return (
            <div style={{position: "relative"}}>
            <input
                id={`login-${field}` }
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

    render() {
        return (
            <form
                className={style.LOGIN_MODAL}
                onSubmit={this.handleSubmit}>

                {this.createInput("Email or Phone Number", "username")}
                {this.createInput("Password", "password")}

                <button
                    className={style.LOGIN_BUTTON}
                    onClick={this.handleSubmit}>
                    Log In
                </button>

                <Link className={style.LINK} to="/recover">
                    Forgot account?
                </Link>

                <div className={style.SECTION_SEPARATOR}/>

                <button
                    className={style.SIGNUP_BUTTON}
                    onClick={this.presentSignup}>
                    Create New Account
                </button>
            </form>
        );
    }
}

export default LoginForm;