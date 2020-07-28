import React from "react";
import * as style from "../../styles/session";
import LoginFormContainer from "./login_form_container";
import SignupFormContainer from "./signup_form_container";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // let { recentUsers } = this.props;

        return (
            <div className={style.LOGIN_PAGE}>
                {/* {recentUsers.length > 0 ? <ul>
                    {recentUsers.map((user, idx) => (
                        <RecentUser key={idx} user={user} />
                    ))}
                </ul> : null} */}
                <SignupFormContainer />
                <LoginFormContainer />
            </div>
        );
    }
}