import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Button, CardActions,
    CardContent, CardHeader, TextField
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signIn } from "../../actions";
import { SnackBarRender } from "../../components/SnackBar";
import { ISigninInput } from '../../interfaces';
import { AppState } from "../../reducers";
import { SignInValidate } from "../../utils/validation";
import "./index.scss";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: 600,
            margin: `0 auto`,
            height: "100%",

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
    })
);


const LoginError = (err: { message: string }) => {
    return (
        <span style={{ color: "red" }}>* {err.message}</span>
    )
}



const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<ISigninInput>({
        resolver: yupResolver(SignInValidate),
    })

    //const [stateRequest, setStateRequest] = useState<stateCode>("success");

    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector((state: AppState) => state.auth);

    const classes = useStyles();

    function signInWithEmailePassword(data: ISigninInput) {

        dispatch(
            signIn(data)
        );
    }
    useEffect(() => {
        if (auth!.isAuth) {
            history.push("/");
        }
    }, [auth.isAuth, history]);

    return (
        <form>
            <Helmet>
                <title>
                    Đăng Nhập | EClassroom
                </title>
            </Helmet>
            {
                auth.message && <SnackBarRender message={auth.message!} isSuccess={auth.isSuccess} />
            }
            <CardHeader className={classes.header} title="Đăng Nhập" />
            <CardContent>
                <div>
                    <TextField
                        error={Boolean(errors.email)}
                        fullWidth
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="Email"
                        margin="normal"
                        {...register("email")}
                    />
                    <Box>
                        {errors.email && (<LoginError message={errors!.email.message as string} />)}
                    </Box>
                    <TextField
                        error={Boolean(errors.password)}
                        fullWidth
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Mật khẩu"
                        margin="normal"
                        {...register("password")}

                    />
                    <Box>
                        {errors.password && (<LoginError message={errors!.password.message as string} />)}
                    </Box>
                </div>
            </CardContent>

            <CardActions>
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className={classes.loginBtn}
                    onClick={handleSubmit(signInWithEmailePassword)}
                >
                    Đăng nhập
                </Button>


            </CardActions>
        </form>
    );
}

export default Login;