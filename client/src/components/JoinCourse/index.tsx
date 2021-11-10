import React, { } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Box
} from "@material-ui/core";

import { JoinCourseValidate } from "../../utils/validation";


interface IOpenModal {
    isOpenModal: boolean,
    setIsOpenModal: any,
}
interface IJoinCourse {
    code: string,
}

const JoinCourse = (props: IOpenModal) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IJoinCourse>({
        resolver: yupResolver(JoinCourseValidate),
    })
    const { isOpenModal, setIsOpenModal } = props;

    const handleClose = () => {
        setIsOpenModal(!isOpenModal);
    }

    const handleSubmitJoin = (data: IJoinCourse) => {
        handleClose();
        console.log(data);
    }
    return (
        <div>
            <Dialog
                open={isOpenModal}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Join class</DialogTitle>
                <form >
                <DialogContent>
                    <DialogContentText>
                        Nhập mã lớp mà giáo viên đã cung cấp cho bạn
                    </DialogContentText>

                    <TextField
                        autoFocus
                        error={Boolean(errors.code)}
                        margin="dense"
                        label="Mã Lớp"
                        type="text"
                        {...register("code")}
                        fullWidth
                    />
                     <Box>
                        {errors.code && <p style={{color: "red" }}>{errors.code.message}</p>}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => handleClose()}>
                        Hủy Bỏ
                    </Button>
                    <Button color="primary" onClick={handleSubmit(handleSubmitJoin)}>
                        Tham Gia
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
        </div >
    )
}

export default JoinCourse;