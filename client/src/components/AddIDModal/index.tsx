import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddStudentIDValidate } from '../../utils/validation';
import { AppState } from "../../reducers";
import { useDispatch, useSelector } from "react-redux"
import { upsertStudentId, getRoleMember } from "../../actions";
import { useParams } from 'react-router';
import { TYPEROLE } from "../../constants";


interface ICreateID {
    studentId: string;
}

interface IParamType {
    courseId: string
}
const AddIDModal = () => {
    const { courseId } = useParams<IParamType>();

    const member = useSelector((state: AppState) => state.member);
    const auth = useSelector((state: AppState) => state!.auth);
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<ICreateID>({
        resolver: yupResolver(AddStudentIDValidate)
    })

    const [isAddId, setIsAddId] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getRoleMember(+courseId))
    }, []);

    useEffect(() => {
        if (member.currentRole && !member.currentRole?.studentId && member.currentRole.role === TYPEROLE.STUDENT) {
            setIsAddId(true);
        }
        else setIsAddId(false);
    }, [member.currentRole?.studentId])

    useEffect(() => {
        if (!member.isSuccess && member.message === "Student ID Exist") {
            setError(
                "studentId", {
                message: "Mã số sinh viên đã trùng, vui lòng kiểm tra lại."
            }
            )
        }
        else {
            clearErrors("studentId")
        }
    }, [member])
    const handleClose = () => {
        setIsAddId(false);
    }

    useEffect(() => {
        if (member.isSuccess) {
            handleClose();
        }
    }, [member])
    const handleCreateID = (data: ICreateID) => {
      
        dispatch(upsertStudentId(+courseId, data.studentId));

    }

    const handleUseIDExist = () => {
        if (auth && auth.user && auth.user.studentId) {
            dispatch(upsertStudentId(+courseId, auth.user.studentId));
            return;
        }
        setError(
            "studentId", {
            message: "Bạn chưa thiết lập mã số sinh viên, vui lòng nhập mã mới."
        })
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
                                onClick={handleUseIDExist}
                            >
                                Sử dụng ID hiện tại
                            </Button>
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