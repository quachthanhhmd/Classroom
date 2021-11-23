import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, TextField, Box, DialogActions, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PasswordChangeValidate } from '../../utils/validation';
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../reducers";
import { updatePassword } from '../../actions';

interface IPropsType {
    isOpenModal: boolean;
    setIsOpenModal: Function;
}

interface IChangePassword {
    oldPassword: string;
    newPassword: string;
    againPassword: string;
}

const PasswordManage = (props: IPropsType) => {
    const { isOpenModal, setIsOpenModal } = props
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }, setError, clearErrors, getValues } = useForm<IChangePassword>({
        resolver: yupResolver(PasswordChangeValidate),
    });

    const handleClose = () => {
        setIsOpenModal(false);
    }

    const submitChangPassword = (data: IChangePassword) => {
        dispatch(updatePassword({
            oldPassword: data.oldPassword, 
            newPassword: data.newPassword
        }))
        handleClose();
    }

    return (
        <Dialog
            fullWidth
            open={isOpenModal}
            onClose={handleClose}
        >
            <DialogTitle>Đổi mật khẩu</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Nhập mật khẩu cũ"
                    type="password"
                    {...register("oldPassword")}
                />
                <Box>
                    {errors.oldPassword && <p style={{ color: "red" }}>{errors.oldPassword.message}</p>}
                </Box>

                <TextField
                    fullWidth
                    label="Nhập mật khẩu mới"
                    type="password"
                    {...register("newPassword")}
                />
                <Box>
                    {errors.newPassword && <p style={{ color: "red" }}>{errors.newPassword.message}</p>}
                </Box>

                <TextField
                    fullWidth
                    label="Xác nhận lại mật khẩu"
                    type="password"
                    {...register("againPassword")}
                    onChange={
                        (e) => {
                            const newPassword = getValues("newPassword"); // "test-input"
                            if (e.target.value !== newPassword) {
                                setError("againPassword", {
                                    message: "Mật khẩu không khớp"
                                }
                                )
                            }
                            else {
                                clearErrors("againPassword");
                            }
                        }
                    }
                />
                <Box>
                    {errors.againPassword && <p style={{ color: "red" }}>{errors.againPassword.message}</p>}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => handleClose()}>
                    Hủy bỏ
                </Button>
                <Button
                    color="primary"
                    onClick={handleSubmit(submitChangPassword)}>
                    Cập Nhật
                </Button>

            </DialogActions>
        </Dialog>
    )
}

export default PasswordManage;