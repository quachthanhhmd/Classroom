import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CardActions, CardContent, CardHeader, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import authApi from '../../api/auth.api';
import AlertBox from '../../components/AlertBox';
import CircularLoading from '../../components/Loading';
import { AuthType } from '../../interfaces';
import { ResetPassword } from '../../utils/validation';

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

interface IResetPassword {
    passwordConfirmation: string,
    password: string,
}

interface IProps {
    handleChangeType: (type: AuthType) => void,
}

const ForgotPassword = (props: IProps) => {
    const {
        handleChangeType,
    } = props;
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const [isAuthReset, setIsAuthReset] = useState<boolean>(false);
    const uri = new URLSearchParams(window.location.search);
    const email = uri.get('email');
    const token = uri.get('token');
    const [content, setContent] = useState<string>("");
    const [uriALert, setUri] = useState<string>("");
    const history = useHistory();
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm<IResetPassword>({
        resolver: yupResolver(ResetPassword),
    });

    useEffect(() => {
        const checkTokenForgot = async () => {
            try {
                if (!email || !token) throw new Error();
                setIsLoading(true);
                const res = await authApi.checkTokenForgot(email, token);
                setIsLoading(false);
                if (!res || res.status !== 200) throw new Error();
                setIsAuthReset(true);
                // handleChangeType(AuthType.RESET);

            } catch (err) {
                handleChangeType(AuthType.NONE);
                setContent("X??c th???c kh??ng ????ng, vui l??ng th??? l???i.");
                setIsOpenModal(true);
            }
        }
        if (!window.location.pathname.includes("verify"))
             checkTokenForgot();
    }, [history])


    const onSubmitResetPassword = async (data) => {

        try {
            if (!email) throw new Error();
            setIsLoading(true);
            const res = await authApi.resetPassword(email, data.password);
            setIsLoading(false);
            if (!res || res.status !== 200) throw new Error();

            setContent("C???p nh???t m???t kh???u th??nh c??ng. B???m x??c nh???n ????? quay v??? trang ????ng nh???p");
            setUri("/auth");
            setIsOpenModal(true);
        } catch (err) {
            setContent("C???p nh???t th???t b???i vui l??ng th??? l???i sau.");
            setUri("/auth");
            setIsOpenModal(true);
        }
    }

    return (
        <>

            <AlertBox
                isOpen={isOpenModal}
                setIsOpen={() => setIsOpenModal(false)}
                content={content}
                uri={uriALert}
                title={`X??c th???c email`}
            />

            {
                !isLoading ?
                    <>
                        {
                            isAuthReset ?

                                <form>
                                    <Helmet>
                                        <title>
                                            L???y l???i m???t kh???u | EClassroom
                                        </title>
                                    </Helmet>

                                    <CardHeader className={classes.header} title="????ng Nh???p" />
                                    <CardContent>
                                        <div>
                                            <TextField
                                                error={Boolean(errors.password)}
                                                fullWidth
                                                id="password"
                                                type="password"
                                                label="M???t kh???u"
                                                margin="normal"
                                                {...register("password")}
                                            />
                                            <Box>
                                                {errors.password && <span style={{ color: "red" }}>* {errors.password.message}</span>}
                                            </Box>
                                            <TextField
                                                error={Boolean(errors.passwordConfirmation)}
                                                fullWidth
                                                id="re-password"
                                                type="password"
                                                label="Nh???p l???i m???t kh???u"
                                                margin="normal"
                                                {...register("passwordConfirmation")}
                                            />
                                            <Box>
                                                {errors.passwordConfirmation && <span style={{ color: "red" }}>* {errors.passwordConfirmation.message}</span>}
                                            </Box>
                                        </div>
                                    </CardContent>

                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            color="secondary"
                                            className={classes.loginBtn}
                                            onClick={handleSubmit(onSubmitResetPassword)}
                                        >
                                            ?????i m???t kh???u
                                        </Button>

                                    </CardActions>
                                </form>
                                :
                                <div style={{ textAlign: "center", margin: "1rem" }}>
                                    <h2>B???n ch??a x??c th???c th??nh c??ng
                                    </h2>
                                </div>
                        }
                    </>
                    :
                    <CircularLoading />
            }


        </>
    )
}

export default ForgotPassword;