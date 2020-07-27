import React from "react";
import { Link } from "react-router-dom";
import RecentUser from "./recent_user";
import * as style from "../../styles/session";

class LoginForm extends React.Component {
    constructor(props) {
        super();

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

    render() {
        let { recentUsers } = this.props;
        let { username, password } = this.state;

        return (
            <div className={style.CONTAINER}>
                {/* <ul>
                    {recentUsers.map((user, idx) => (
                        <RecentUser key={idx} user={user} />
                    ))}
                </ul> */}


                <form onSubmit={this.handleSubmit}>
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
                        onClick={this.handleSubmit}>Log In</button>
                </form>

                <Link className={style.LINK} to="/recover">Forgot account?</Link>

                <span className={style.SEPARATOR} />
                {/* <button */}
                
                <Link 
                    id={style.INHERITS_ALL}
                    to="/signup">
                    <button id={style.SIGNUP_BUTTON}>
                        Create New Account
                    </button>
                </Link>
                {/* </button> */}
            </div>
        );
    }
}

export default LoginForm;