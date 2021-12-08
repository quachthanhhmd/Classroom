import { Card } from '@material-ui/core';
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginOAuth } from "../../actions";
import { GoogleButton } from "../../components/LoginSocial";
import ThemeMode from "../../components/ThemeMode";
import { signInWithGoogle } from "../../configs/firebase";
import Login from "../../containers/Login";
import Register from "../../containers/Register";
import { SIGNUP_SUCCESS } from '../../messages';
import { AppState } from "../../reducers";
import "./index.scss";

const changeToggleMode = () => {
    const toggle = document.getElementById("toggle-mode");
    toggle && toggle.classList.add("toggle-mode-login");
}

const Authenticate = () => {
    const [isLogin, setIsLogin] = useState(true);

    const dispatch = useDispatch();
    const auth = useSelector((state: AppState) => state.auth);
    const themeMode = useSelector((state: AppState) => state.themeMode!.toggleMode);
    const history = useHistory();

    useEffect(() => {
        changeToggleMode();
    })

    useEffect(() => {
        if (auth.message === SIGNUP_SUCCESS && auth.isSuccess === true)
            setIsLogin(true);
    }, [auth]);

    useEffect(() => {
        if (auth!.isAuth) {
            history.push("/");
        }
    }, [auth.isAuth, history]);

    function handleChangeAuthen() {
        setIsLogin(!isLogin);
    }

    const handleSignInWithGoogle = async () => {
        const user = await signInWithGoogle();
        console.log(user);
        if (!user) return;
        dispatch(loginOAuth(user));
    }

    return (
        <div className={`authenticate${themeMode ? " dark-mode" : " light-mode"}`}>
            <ThemeMode />
            <Helmet>
                Đăng Nhập | EClassroom
            </Helmet>
            <div className="authenticate-main">
                <div className="authenticate-main___form">
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
                            <GoogleButton className="login-social--google" onClick={handleSignInWithGoogle} />
                            {/* <FacebookButton className="login-social--facebook" onClick={() => alert("Hello")} /> */}
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
                </div>

            </div>
        </div>

    )
}

export default Authenticate;