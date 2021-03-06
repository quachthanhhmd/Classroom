import { Card } from '@material-ui/core';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginOAuth } from "../../actions";
import authApi from '../../api/auth.api';
import CircularLoading from '../../components/Loading';
import { GoogleButton } from "../../components/LoginSocial";
import ThemeMode from "../../components/ThemeMode";
import { signInWithGoogle } from "../../configs/firebase";
import { NOTIFICATION_FAIL, NOTIFICATION_SUCCESS } from '../../constants';
import ForgotPassword from '../../containers/ForgotPassword';
import Login from "../../containers/Login";
import Register from "../../containers/Register";
import ResetPassword from '../../containers/ResetPassword';
import { AuthType } from '../../interfaces';
import { SIGNUP_SUCCESS } from '../../messages';
import { AppState } from "../../reducers";
import "./index.scss";

const changeToggleMode = () => {
    const toggle = document.getElementById("toggle-mode");
    toggle && toggle.classList.add("toggle-mode-login");
}



const Authenticate = () => {


    const [authType, setAuthType] = useState<AuthType>(AuthType.LOGIN);
  
    const dispatch = useDispatch();
    const auth = useSelector((state: AppState) => state.auth);
    const themeMode = useSelector((state: AppState) => state.themeMode.toggleMode);
    const history = useHistory();

    useEffect(() => {
        changeToggleMode();
    })

    useEffect(() => {
        async function verifyAccount() {
        
                const uri = new URLSearchParams(window.location.search);
                const token = uri.get('token');
                if (token) {
                    try {
                        const res = await authApi.verifyAccount(token);
                        
                        if (res.status !== 200) throw new Error();

                        dispatch({
                            type: NOTIFICATION_SUCCESS,
                            payload: "X??c th???c email Th??nh c??ng, h??y ????ng nh???p v?? tr???i nghi???m nh??!",
                        })
                    } catch(err) {
        
                        dispatch({
                            type: NOTIFICATION_FAIL,
                            payload: "X??c th???c email Kh??ng th??nh c??ng, vui l??ng th??? l???i.",
                        })
                    }
                }
             
        }
        if (window.location.pathname.includes("verify")) {
          verifyAccount();
        }
    }, [])


    useEffect(() => {
        const uri = new URLSearchParams(window.location.search);
        const email = uri.get('email');
        const token = uri.get('token');

        if ((email || token) && !window.location.pathname.includes("verify")) {
            setAuthType(AuthType.RESET);
        }
    }, [])


    useEffect(() => {
        if (auth.message === SIGNUP_SUCCESS && auth.isSuccess === true)
            setAuthType(AuthType.LOGIN);
    }, [auth]);

    useEffect(() => {
        if (auth!.isAuth && auth.user) {
            history.push("/");
        }
    }, [auth.isAuth, history]);




    const handleSignInWithGoogle = async () => {
        const user = await signInWithGoogle();
        if (!user) return;
        dispatch(loginOAuth(user));
    }

    const handleChangeType = (type: AuthType) => {
        setAuthType(type);
    }

    return (
        <div className={`authenticate${themeMode ? " dark-mode" : " light-mode"}`}>
            <ThemeMode />
            {
                
                    <div className="authenticate-main">
                        <div className="authenticate-main___form">
                            {
                                authType === AuthType.LOGIN || authType === AuthType.REGISTER ?
                                    <Card className="authenticate-main___from--card">

                                        {authType === AuthType.LOGIN && <Login />}
                                        {authType === AuthType.REGISTER && <Register />}
                                        <div className="authenticate-main___forgot-password">
                                            <span className="authen-text" onClick={() => handleChangeType(AuthType.FORGOT)}> L???y l???i m???t kh???u</span>
                                        </div>
                                        <div className="authenticate-main___other-method-login">
                                            <div className="authenticate-main___other-method-login--line">
                                            </div>
                                            <div className="authenticate-main___other-method-login--name">
                                                Ho???c
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
                                                authType === AuthType.LOGIN ?
                                                    <div className="authenticate-main___choose-authen--register">
                                                        <p>B???n m???i bi???t ?????n EClassroom <span className="authen-text" onClick={() => handleChangeType(AuthType.REGISTER)}>????ng k?? ngay</span></p>
                                                    </div>
                                                    :
                                                    <div className="authenticate-main___choose-authen--login">
                                                        <p> B???n ???? c?? t??i kho???n <span className="authen-text" onClick={() => handleChangeType(AuthType.LOGIN)}>????ng nh???p ngay</span></p>
                                                    </div>
                                            }
                                        </div>
                                    </Card>
                                    :
                                    <Card className="authenticate-main___from--card" style={{ paddingBottom: "1rem" }}>
                                        {
                                            authType === AuthType.FORGOT ?
                                                <ForgotPassword />
                                                :
                                                <ResetPassword handleChangeType={handleChangeType} />
                                        }
                                        <div className="authenticate-main___forgot-password">
                                            <span className="authen-text" onClick={() => handleChangeType(AuthType.LOGIN)}>Quay v??? ????ng nh???p</span>
                                        </div>
                                    </Card>
                            }

                        </div>

                    </div>
            }

        </div>

    )
}

export default Authenticate;