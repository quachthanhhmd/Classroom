import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogTitle, DialogContent, TextField, Box, Button, DialogActions } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { InviteByEmailValidate } from "../../utils/validation";
import { IInviteMember } from "../../interfaces";
import { useDispatch } from "react-redux";
import { inviteMemberByEmail } from "../../actions";
import { useParams } from "react-router";


const InviteMember = (props: { role: string, isOpenModal: boolean, setIsOpenModal: any }) => {
    const { role, isOpenModal, setIsOpenModal } = props;

    const { courseId } = useParams<{ courseId: string }>();

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<IInviteMember>({
        resolver: yupResolver(InviteByEmailValidate),
    });

    const handleSubmitEmail = (data: IInviteMember) => {
        setIsOpenModal(false);
        dispatch(inviteMemberByEmail(+courseId, data.email, role));
    }

    const onClose = () => {
        setIsOpenModal(false);
    }

    return (
        <>
            <Dialog
                open={isOpenModal}
                onClose={setIsOpenModal}

            >
                <DialogTitle>
                    Nhập Email để mời {role === "student" ? "Học Sinh" : role === "teacher" ? "Giáo viên" : "Trợ giảng"} vào lớp học
                </DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        InputLabelProps={{ shrink: true, required: true }}
                        type="text"
                        error={Boolean(errors.email)}
                        label="Email"
                        placeholder="Nhập email để mời vào lớp"
                        margin="normal"
                        {...register('email')}
                    />
                    <Box>
                        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => onClose()}
                    >
                        Hủy bỏ
                    </Button>

                    <Button

                        onClick={handleSubmit(handleSubmitEmail)}
                    >
                        Mời
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

export default InviteMember;