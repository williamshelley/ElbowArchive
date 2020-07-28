import React from "react";
import { Link } from "react-router-dom";
import * as style from "../../styles/session";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        }

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
        this.props.login(credentials);
    }

    presentSignup(e) {
        e.preventDefault();
        let signupForm = $(`.${style.SIGNUP_OVERLAY}`);
        signupForm.css("display", "flex");
    }

    render() {
        let { username, password } = this.state;

        return (
            <form
                className={style.LOGIN_MODAL}
                onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Email or Phone Number"
                    value={username}
                    autoComplete="on"
                    onChange={this.handleInput("username")} />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    autoComplete="on"
                    onChange={this.handleInput("password")} />

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