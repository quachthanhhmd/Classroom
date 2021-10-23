import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';



import "./index.scss";

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

    const classes = useStyles();
    //const [state, dispatch] = useReducer(reducer, initialState);
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

            <CardActions>
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className={classes.loginBtn}
                // onClick={handleLogin}
                // disabled={state.isButtonDisabled}
                >
                    Đăng nhập
                </Button>
            </CardActions>
        </div>
    );
}

export default Login;