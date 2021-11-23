import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, TextField } from "@material-ui/core";
import {
    PhotoCamera
} from "@material-ui/icons";
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { updateCourseInfo } from '../../actions';
import { storage } from "../../configs/firebase";
import { ICourseInfo } from "../../interfaces";
import { objectFieldChange } from '../../utils/object-solve';
import { ChangeCourseInfoValidate } from "../../utils/validation";
import "./index.scss";


interface IPropType {
    isOpenModal: boolean,
    setIsOpenModal: any,
    course: ICourseInfo | null,
}

interface IChangeCourse {

    name: string,
    topic: string,
    studentLimit: number,
    description: string,
    avatarUrl?: string,
}

const CourseInfo = (props: IPropType) => {
    const { courseId } = useParams<{ courseId: string }>();

    const { isOpenModal, setIsOpenModal, course } = props;
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const dispatch = useDispatch();

    const [preview, setPreview] = useState<string>("");

    const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors } = useForm<IChangeCourse>({
        resolver: yupResolver(ChangeCourseInfoValidate),
        defaultValues: useMemo(() => {
            return {
                name: course?.name,
                topic: course?.topic,
                description: course?.description,
                studentLimit: course?.studentLimit,
            }
        }, [course])
    });
    const { onChange, ...rest } = register("studentLimit");

    const handleUpload = async () => {
        const uploadTask = storage.ref(`course-images/${selectedFile!.name}`).put(selectedFile!);
        uploadTask.on(
            "state_changed",
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot)
            },
            (error: any) => {
                console.log(error);
            },
            () => {

                storage
                    .ref("images")
                    .child(selectedFile!.name)
                    .getDownloadURL()
                    .then((url: string) => {
                        dispatch(updateCourseInfo(+courseId, { avatarUrl: url }));
                        setPreview(url);
                    });
            }
        );
        return true;
    };

    useEffect(() => {
        if (!selectedFile) {
            setPreview("")
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    useEffect(() => {
        setPreview(course?.avatarUrl || "");
        reset({
            name: course?.name,
            topic: course?.topic,
            description: course?.description,
            studentLimit: course?.studentLimit,
        });
    }, [course]);

    const handleClose = () => {
        setIsOpenModal(false);
    }

    const handleUpdateInfo = async (data: IChangeCourse) => {
        handleClose();

        if (selectedFile && preview) {
            handleUpload();
        }

        const newData = objectFieldChange(course, data);
        console.log(newData);
        if (Object.keys(newData).length === 0) {
            return;
        }

        dispatch(updateCourseInfo(+courseId, newData));
    }

    function changeImageUpload(e: any) {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0]);
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
                                onChange={changeImageUpload}
                                type="file"
                            />
                            <label htmlFor="raised-button-file">
                                <Button
                                    component="span"
                                    style={{ padding: 0, borderRadius: "100%", width: "inherit" }}
                                >
                                    <div className="change-info___modal--header___course-img">
                                        <div className="change-info___modal--header___course-img--img">
                                            <img alt="avatar" src={`${preview || "/none-avt.png"}`} />
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
                                        onChange={(e) => {
                            
                                            if (course && +e.target.value < course?.studentExist) {
                                                setError("studentLimit", {
                                                    message: "Không thể bé hơn số học sinh hiện tại.",
                                                });
                                                onChange(e);
                                            }
                                            else {
                                                clearErrors("studentLimit");
                                                onChange(e);
                                            }
                                        }}
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
                                        disabled
                                        label="Số lượng học sinh hiện tại"
                                        value={course?.studentExist}
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
                        onClick={handleSubmit(handleUpdateInfo)}>
                        Cập Nhật
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default CourseInfo;