import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import {GoogleButton, FacebookButton} from "../../containers/LoginSocial";

import "./index.scss";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 600,
            margin: `0 auto`,
            height: "100%",
            alignItems: 'center',
            justifyContent: 'center'
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
            // marginTop: theme.spacing(10)
        },
        social: {
            fontSize: "1rem"
        }
    })
);


const Login = () => {
   
    const classes = useStyles();
    //const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
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
                        // onChange={handleUsernameChange}
                        // onKeyPress={handleKeyPress}
                        />
                        <TextField
                            //error={state.isError}
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Mật khẩu"
                            margin="normal"
                        // helperText={state.helperText}
                        // onChange={handlePasswordChange}
                        // onKeyPress={handleKeyPress}
                        />
                    </div>
                </CardContent>
                <div className="login-social">
                    <GoogleButton className={classes.social} onClick={() => alert("Hello")} />
                    <FacebookButton className={classes.social} onClick={() => alert("Hello")} />
                </div>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        className={classes.loginBtn}
                    // onClick={handleLogin}
                    // disabled={state.isButtonDisabled}
                    >
                        Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}

export default Login;