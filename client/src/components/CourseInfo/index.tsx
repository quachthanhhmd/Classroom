import {
    Button, Card, Dialog, DialogContent, DialogTitle, Grid, Box, Paper, TextField, DialogActions
} from "@material-ui/core";
import {
    PhotoCamera
} from "@material-ui/icons";
import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeCourseInfoValidate } from "../../utils/validation";

import "./index.scss";

interface IOpenModal {
    isOpenModal: boolean,
    setIsOpenModal: any,
}

interface IChangeCourse {
    name: string,
    topic: string,
    studentLimit: number,
    description: string,
}

const CourseInfo = (props: IOpenModal) => {
    const { isOpenModal, setIsOpenModal } = props;
    const { register, handleSubmit, formState: { errors } } = useForm<IChangeCourse>({
        resolver: yupResolver(ChangeCourseInfoValidate),

    });

    const handleClose = () => {
        setIsOpenModal(false);
    }

    const handleUpdateInfo = (data: IChangeCourse) => {
        console.log(data);
    }

    return (
        <>
            <Dialog
                fullWidth
                open={isOpenModal}
                onClose={handleClose}

            >
                <DialogTitle>Chỉnh sửa thông tin lớp học</DialogTitle>
                <DialogContent>
                    <div className="change-info___modal">

                        <Paper className="change-info___modal--header" style={{ backgroundImage: `url("/background-course.jpg")` }}>
                            <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="raised-button-file"

                                type="file"
                            />
                            <label htmlFor="raised-button-file">
                                <Button
                                    component="span"
                                    style={{ padding: 0, borderRadius: "100%", width: "inherit" }}
                                >
                                    <div className="change-info___modal--header___course-img">
                                        <div className="change-info___modal--header___course-img--img">
                                            <img alt="avatar" src={`${"/none-avt.png"}`} />
                                        </div>
                                        <PhotoCamera className="change-info___modal--header___course-img--icon-upload" />
                                    </div>
                                </Button>
                            </label>
                        </Paper>
                        <Card className="change-info___modal--body">
                            <Grid container spacing={2}>

                                <Grid
                                    item={true}
                                    xs={6}

                                >
                                    <TextField
                                        fullWidth
                                        label="Tên lớp học"
                                        {...register("name")}
                                    />
                                    <Box>
                                        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                                    </Box>
                                </Grid>

                                <Grid
                                    item={true}
                                    xs={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Tên chủ đề"
                                        {...register("topic")}
                                    >
                                    </TextField>
                                    <Box>
                                        {errors.topic && <p style={{ color: "red" }}>{errors.topic.message}</p>}
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid
                                    item={true}
                                    xs={6}
                                >
                                    <TextField
                                        fullWidth
                                        {...register("studentLimit")}
                                        label="Số lượng học sinh"
                                    />
                                    <Box>
                                        {errors.studentLimit && <p style={{ color: "red" }}>{errors.studentLimit.message}</p>}
                                    </Box>
                                </Grid>
                                <Grid
                                    item={true}
                                    xs={6}
                                >
                                    <TextField
                                        fullWidth

                                        label="Số lượng học sinh hiện tại"
                                        value={20}
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                className="change-info___modal--body___text-input"
                                fullWidth
                                label="Mô tả về lớp học"
                                {...register("description")}
                            />
                            <Box>
                                {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}
                            </Box>
                        </Card>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => handleClose()}>
                        Hủy Bỏ
                    </Button>
                    <Button
                        color="primary"
                        onClick={
                            handleSubmit(handleUpdateInfo)
                            //handleClose(); handleUpdateProfile
                        }>
                        Cập Nhật
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default CourseInfo;