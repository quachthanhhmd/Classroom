import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddStudentIDValidate } from '../../utils/validation';

interface ICreateID {
    studentId: string;
}

const AddIDModal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICreateID>({
        resolver: yupResolver(AddStudentIDValidate)
    })

    const [isAddId, setIsAddId] = useState<boolean>(true);

    const handleClose = () => {
        setIsAddId(false);
    }

    const handleCreateID = (data: ICreateID) => {
        handleClose();
        console.log(data);
    }
    return (
        <>
            {isAddId &&
                (
                    <Dialog
                        keepMounted
                        open={isAddId}
                        onClose={handleClose}
                        disableBackdropClick
                    >
                        <DialogTitle>
                            Nhập mã số sinh viên của bạn
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                fullWidth
                                label="Nhập mã số sinh viên"
                                {...register("studentId")}
                                error={Boolean(errors.studentId)}
                            />
                            <Box>
                                {errors.studentId && <p style={{ color: "red" }}>{errors.studentId.message}</p>}
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleSubmit(handleCreateID)}
                            >
                                Cập Nhật
                            </Button>
                        </DialogActions>
                    </Dialog>
                )
            }
        </>
    )
}

export default AddIDModal;