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
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm<ICreateID>({
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
    }, [member])
    const handleClose = () => {
        setIsAddId(false);
    }

    const handleCreateID = (data: ICreateID) => {
        handleClose();
        console.log(data);
        dispatch(upsertStudentId(+courseId, data.studentId));
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