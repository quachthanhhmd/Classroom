import { Box, Button, CardContent, CardHeader, TextField, CardActions } from '@material-ui/core';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmailValidate } from '../../utils/validation';
import authApi from '../../api/auth.api';
import AlertBox from '../../components/AlertBox';

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


const ForgotPassword = () => {

    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>({
        resolver: yupResolver(EmailValidate),
    })
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [contentAlert, setContentAlert] = useState<string>("");

    const onSubmitEmail = async (data) => {

        try {
            const res = await authApi.forgotPassword(data.email);

            if (!res) throw new Error();

            if (res.status === 404) {
                setContentAlert("Email chưa được đăng ký. Vui lòng kiểm tra lại.");
                setIsOpenModal(true);
                return;
            }

            setContentAlert("Gửi email thành công, vui lòng kiểm tra email để xác nhận tài khoản.");
            setIsOpenModal(true);
        } catch (err) {
            setContentAlert("Gửi email thất bại, vui lòng thử lại sau");
            setIsOpenModal(true);
        }
    }

    return (
        <form>
            <Helmet>
                <title>
                    Lấy lại mật khẩu | EClassroom
                </title>
            </Helmet>
            <AlertBox
                isOpen={isOpenModal}
                setIsOpen={() => setIsOpenModal(false)}
                content={contentAlert}
                uri={window.location.href}
                title={`Lấy lại mật khẩu`}
            />
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
                        {errors.email && <span style={{ color: "red" }}>* {errors.email.message}</span>}
                    </Box>
                </div>
            </CardContent>

            <CardActions>
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className={classes.loginBtn}
                    onClick={handleSubmit(onSubmitEmail)}
                >
                    Lấy mã xác nhận
                </Button>

            </CardActions>
        </form>
    )
}

export default ForgotPassword;