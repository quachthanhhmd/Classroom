import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from '@material-ui/core/Card';

import "./index.scss";
import Login from "../../containers/Login";
import ThemeMode from "../../components/ThemeMode";
import { AppState } from "../../reducers";
import { GoogleButton, FacebookButton } from "../../components/LoginSocial";

const changeToggleMode = () => {
    const toggle = document.getElementById("toggle-mode");
    toggle && toggle.classList.add("toggle-mode-login");
}

const Authenticate = () => {
    const themeMode = useSelector((state: AppState) => state.themeMode!.toggleMode);

    useEffect(() => {
        changeToggleMode();
    })


    return (


        <div className={`authenticate${themeMode ? " dark-mode" : " light-mode"}`}>
            <ThemeMode />
            <div className="authenticate-main">
                <form className="authenticate-main___form" noValidate autoComplete="off">
                    <Card className="authenticate-main___from--card">
                        <Login />
                        <div className="authenticate-main___other-method-login">
                            <div className="authenticate-main___other-method-login--line">
                            </div>
                            <div className="authenticate-main___other-method-login--name">
                                Hoặc
                            </div>
                            <div className="authenticate-main___other-method-login--line">
                            </div>
                        </div>
                        <div className="login-social">
                            <GoogleButton className="login-social--google" onClick={() => alert("Hello")} />
                            <FacebookButton className="login-social--facebook" onClick={() => alert("Hello")} />
                        </div>
                    </Card>
                </form>

            </div>
        </div>

    )
}

export default Authenticate;