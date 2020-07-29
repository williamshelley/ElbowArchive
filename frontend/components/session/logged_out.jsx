import React from "react";
import { Link } from "react-router-dom";
import * as style from "../../styles/session";
import LoginFormContainer from "./login_form_container";
import SignupFormContainer from "./signup_form_container";
import SectionHeaderMessage from "./section_header_message";

const FB_LOGO = "https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg";
const EA_LOGO = "logo.png";
export default class LoggedOut extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let recentLogins = [1,2,3,4,5];
        return (
            <div className={style.LOGGED_OUT_CONTAINER}>
                <div className={style.LOGGED_OUT_BODY}>
                    <div className={style.LOGGED_OUT_BODY_RECENT_LOGINS}>
                        <img 
                            className={style.LOGGED_OUT_LOGO}
                            src={FB_LOGO}
                            // src={EA_LOGO}
                            />
                        <SectionHeaderMessage title="Recent Logins"
                            description="Click your picture or add an account."
                        />
                        <div className={style.RECENT_LOGIN_LIST}>
                            { recentLogins.map((user, idx) => {
                                return (
                                    <div key={idx} className={style.RECENT_LOGIN_CARD}>
                                        {user}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={style.LOGGED_OUT_BODY_LOGIN}>
                        <LoginFormContainer />
                        <p><Link className={style.LINK} to="/pages/new">Create a Page</Link> for a celebrity, band or business.</p>
                        <button 
                            className={style.LOGIN_BUTTON}
                            onClick={() => { 
                            this.props.loginDemoUser()
                        }}>Login as demo user</button>
                    </div>
                </div>
                
                <div className={style.LOGGED_OUT_FOOTER}>
                    FOOTER
                </div>

                <div className={style.SIGNUP_OVERLAY}>
                    <SignupFormContainer />
                </div>
            </div>
        );
    }
}