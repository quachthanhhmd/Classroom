import React, { useEffect } from 'react';
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
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../reducers";
import { joinCoursebyCode } from "../../actions";

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
    const course = useSelector((state: AppState) => state.course);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClose = () => {
        setIsOpenModal(!isOpenModal);
    }

    const handleSubmitJoin = (data: IJoinCourse) => {
        handleClose();
        dispatch(joinCoursebyCode(data.code));
    }
    useEffect(() => {
        if (course.course) {
            history.push(`/course/${course.course.id}`);
        }
    }, [course, history])

    return (
        <div>
            <Dialog
                open={isOpenModal}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Tham gia lớp học</DialogTitle>
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
                            {errors.code && <p style={{ color: "red" }}>{errors.code.message}</p>}
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