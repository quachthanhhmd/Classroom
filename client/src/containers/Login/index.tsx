import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import "./index.scss";

import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../actions";
import { AppState } from "../../reducers";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            // display: 'flex',
            // flexWrap: 'wrap',
            width: 600,
            margin: `0 auto`,
            height: "100%",
            // alignItems: 'center',
            // justifyContent: 'center'
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            textAlign: 'center',
            background: '#212121',
            color: '#fff'
        },
        card: {

        },

    })
);


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector((state: AppState) => state.auth);

    const classes = useStyles();

    async function signInWithEmailePassword() {
        console.log(email, password);
        if (!email || !password)
            return;

        dispatch(
            signIn({
                email,
                password,
            })
        );
    }
    useEffect(() => {
        if (auth!.isAuth) {
            history.push("/");
        }
    }, [auth.isAuth, history]);


    return (
        <div>
            <CardHeader className={classes.header} title="Đăng Nhập" />
            <CardContent>
                <div>
                    <TextField
                        //error={state.isError}
                        fullWidth
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="Email"
                        margin="normal"
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <TextField
                        //error={state.isError}
                        fullWidth
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Mật khẩu"
                        margin="normal"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </CardContent>

            <CardActions>
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className={classes.loginBtn}
                    onClick={signInWithEmailePassword}
                // disabled={state.isButtonDisabled}
                >
                    Đăng nhập
                </Button>
            </CardActions>
        </div>
    );
}

export default Login;