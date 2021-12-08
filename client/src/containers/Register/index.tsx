import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box, Button, CardActions, CardContent, CardHeader,
    FormControl, InputLabel,
    Select, TextField
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../actions";
import { ISignUpInput } from "../../interfaces";
import { SignUpValidate } from "../../utils/validation";
import { AppState } from "../../reducers";
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
        inputName: {
            display: 'flex',
            justifyContent: 'space-between'
        },

    })
);




const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<ISignUpInput>({
        resolver: yupResolver(SignUpValidate),
    })
    const auth = useSelector((state: AppState) => state.auth);

    const dispatch = useDispatch();
    const classes = useStyles();

    function registerAccount(data: ISignUpInput) {
        dispatch(signUp(data));
    }

    return (
        <form onSubmit={handleSubmit(registerAccount)}>
            <Helmet>
                <title>
                    Đăng Ký | EClassroom
                </title>
            </Helmet>

            <CardHeader className={classes.header} title="Đăng Ký" />

            <CardContent>
                <div>
                    <div className="name-input">
                        <div>
                            <TextField
                                error={Boolean(errors.firstName)}
                                fullWidth
                                label="Họ"
                                placeholder="Họ"
                                margin="normal"
                                {...register("firstName")}
                                autoFocus
                                InputLabelProps={{ shrink: true, required: true }}
                            />
                            <Box style={{ color: "red" }}>
                                {errors.firstName && (
                                    <span>* {errors.firstName.message}</span>
                                )}
                            </Box>
                        </div>
                        <div>
                            <TextField
                                error={Boolean(errors.lastName)}
                                fullWidth
                                label="Tên"
                                placeholder="Tên"
                                margin="normal"
                                {...register("lastName")}
                                autoFocus
                                InputLabelProps={{ shrink: true, required: true }}

                            />
                            <Box style={{ color: "red" }}>
                                {errors.lastName && (
                                    <span>* {errors.lastName.message}</span>
                                )}
                            </Box>
                        </div>
                    </div>
                    <TextField
                        error={Boolean(errors.email)}
                        fullWidth
                        type="email"
                        label="Email"
                        placeholder="Email"
                        margin="normal"
                        {...register("email")}
                        InputLabelProps={{ shrink: true, required: true }}
                    />
                    <Box style={{ color: "red" }}>
                        {errors.email && (
                            <span>* {errors.email.message}</span>
                        )}
                    </Box>
                    <TextField
                        error={Boolean(errors.password)}
                        fullWidth
                        id="password"
                        type="password"
                        label="Mật khẩu"
                        placeholder="Mật khẩu"
                        margin="normal"
                        {...register("password", { required: true })}
                        InputLabelProps={{ shrink: true, required: true }}
                    />
                    <Box style={{ color: "red" }}>
                        {errors.password && (
                            <span>* {errors.password.message}</span>
                        )}
                    </Box>
                    <TextField
                        error={Boolean(errors.birthDay)}
                        fullWidth
                        type="date"
                        label="Ngày Sinh"
                        InputLabelProps={{ shrink: true, required: true }}
                        margin="normal"
                        {...register("birthDay")}
                    />
                    <FormControl fullWidth>
                        <InputLabel htmlFor="signup_gender">
                            Giới tính
                        </InputLabel>
                        <Select
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left"
                                },
                                transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left"
                                },
                                getContentAnchorEl: null
                            }}
                            id="signup_gender"
                            native

                            defaultValue="male"
                            {...register("gender")}
                        >
                            <option value="male" style={{ paddingLeft: "0.5rem" }}>Nam</option>
                            <option value="female" style={{ paddingLeft: "0.5rem" }}>Nữ</option>
                            <option value="other" style={{ paddingLeft: "0.5rem" }}>Khác</option>
                        </Select>
                    </FormControl>
                    <Box style={{ color: "red" }}>
                        {errors.gender && (
                            <span>* {errors.gender.message}</span>
                        )}
                    </Box>

                </div>
            </CardContent>

            <CardActions>
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className={classes.loginBtn}
                    onClick={handleSubmit(registerAccount)}
                >
                    Đăng Ký
                </Button>

            </CardActions>
        </form>
    );
}

export default Register;