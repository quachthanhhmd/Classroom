import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IReviewGrade } from '../../../interfaces';
import { ReviewGradeValidate } from '../../../utils/validation';

interface IProps {
    isOpenModal: boolean;
    setIsOpenModal: () => void;
    onSubmitReviewGrade: (data: IReviewGrade) => void;
}

const ReviewGrade = (props: IProps) => {
    const { isOpenModal, setIsOpenModal, onSubmitReviewGrade } = props;
    const { register, handleSubmit, formState: { errors } } = useForm<IReviewGrade>({
        resolver: yupResolver(ReviewGradeValidate)
    })
    const handleClose = () => {
        setIsOpenModal();
    }

    const handleSubmitReview = (data: any) => {
        console.log(data);
        handleClose();
        onSubmitReviewGrade(data);
    }
    return (
        <Dialog
            open={isOpenModal}
            onClose={handleClose}
            aria-labelledby="form-review-grade"
            fullWidth={true}
            maxWidth={"sm"}
        >
            <DialogTitle id="form-review-grade">Phúc khảo điểm</DialogTitle>

            {/* <form onSubmit={handleSubmit(handleSubmitReview)}> */}
                <DialogContent>
                    <TextField
                        
                        error={Boolean(errors.grade)}
                        id="grade-review"
                        label="Điểm mong muốn"
                        type="number"
                        autoFocus
                        {...register("grade")}
                        InputLabelProps={{ shrink: true, required: true }}
                        required
                        fullWidth
                    />
                    <Box>
                        {errors.grade && (<span style={{ color: 'red' }}>* {errors.grade.message}</span>)}
                    </Box>
                    <TextField
                   
                        error={Boolean(errors.note)}
                        id="grade-review"
                        label="Ghi chú cho giáo viên"
                        rows={2}
                        type="text"
                        {...register("note")}
                        maxRows={4}
                        //InputLabelProps={{ shrink: true }}
                        // required
                        fullWidth
                    />
                    <Box>
                        {errors.note && (<span style={{ color: 'red' }}>{errors.note.message}</span>)}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => handleClose()}>
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={handleSubmit(handleSubmitReview)}
                        color="primary"
                    >
                        Cập Nhật
                    </Button>
                </DialogActions>
            
        </Dialog>
    )
}

export default ReviewGrade;