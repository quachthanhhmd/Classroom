import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {Typography, Card} from '@material-ui/core';

import "./index.scss";

import Login from "../../containers/Login";
import Register from "../../containers/Register";
import ThemeMode from "../../components/ThemeMode";
import { AppState } from "../../reducers";
import { GoogleButton, FacebookButton } from "../../components/LoginSocial";

import { USER_REGISTER_SUCCESS } from "../../constants";

const changeToggleMode = () => {
    const toggle = document.getElementById("toggle-mode");
    toggle && toggle.classList.add("toggle-mode-login");
}


const Authenticate = () => {
    const [isLogin, setIsLogin] = useState(true);

    const auth = useSelector((state: AppState) => state.auth);
    const themeMode = useSelector((state: AppState) => state.themeMode!.toggleMode);

    useEffect(() => {
        changeToggleMode();
    })

    useEffect(() => {
        setIsLogin(true);
    }, [(auth.signUpStatus === USER_REGISTER_SUCCESS)]);

    function handleChangeAuthen() {
        setIsLogin(!isLogin);
    }
    return (
        <div className={`authenticate${themeMode ? " dark-mode" : " light-mode"}`}>
            <ThemeMode />
            <div className="authenticate-main">
                <form className="authenticate-main___form" noValidate autoComplete="off">
                    <Card className="authenticate-main___from--card">
                        {isLogin ? <Login /> : <Register />}
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

                        <div className="authenticate-main___choose-authen">
                            {
                                isLogin ?
                                    <div className="authenticate-main___choose-authen--register">
                                        <p>Bạn mới biết đến EClassroom <span className="authen-text" onClick={handleChangeAuthen}>Đăng ký ngay</span></p>
                                    </div>
                                    :
                                    <div className="authenticate-main___choose-authen--login">
                                        <p> Bạn đã có tài khoản <span className="authen-text" onClick={handleChangeAuthen}>Đăng nhập ngay</span></p>
                                    </div>
                            }
                        </div>
                    </Card>
                </form>

            </div>
        </div>

    )
}

export default Authenticate;