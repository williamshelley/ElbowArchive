import React from "react";
import { Link } from "react-router-dom";
import * as style from "../../styles/session";
import LoginFormContainer from "./login_form_container";
import SignupFormContainer from "./signup_form_container";
import { GITHUB, LINKEDIN, PERSONAL, ANGELLIST } from "../../util/sites";
import { faGithub, faLinkedin, faAngellist } from "@fortawesome/free-brands-svg-icons";
import { faPersonBooth } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EA_LOGO = "logo.png";
export default class LoggedOut extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.LOGGED_OUT_CONTAINER}>
                <div className={style.LOGGED_OUT_BODY}>
                    <div className={style.LOGGED_OUT_BODY_RECENT_LOGINS}>
                        <img 
                            className={style.LOGGED_OUT_LOGO}
                            src={EA_LOGO}
                            />
                        <p>Facebook clone (single-page-app) where users can search/befriend other users, make posts, comments, likes, and upload photos</p>
                        <div className="links">
                            <a href={GITHUB}>
                                <FontAwesomeIcon icon={faGithub} />
                                {/* GitHub */}
                            </a>
                            
                            <a href={PERSONAL}>
                                <FontAwesomeIcon icon={faPersonBooth} />
                                {/* Personal Site */}
                            </a>

                            <a href={LINKEDIN}>
                                <FontAwesomeIcon icon={faLinkedin} />
                                {/* LinkedIn */}
                            </a>

                            <a href={ANGELLIST}>
                                <FontAwesomeIcon icon={faAngellist} />
                                {/* AngelList */}
                            </a>
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
                    {/* FOOTER */}
                </div>

                <div className={style.SIGNUP_OVERLAY}>
                    <SignupFormContainer />
                </div>
            </div>
        );
    }
}