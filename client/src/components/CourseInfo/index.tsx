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
import { uploadFile } from "../../configs/firebase";
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
        const url: string = await uploadFile("course-images", selectedFile);

        dispatch(updateCourseInfo(+courseId, { avatarUrl: url }));
        setPreview(url);
        
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
        if (Object.keys(newData).length === 0) {
            return;
        }
        console.log(newData);
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
                <DialogTitle>Ch???nh s???a th??ng tin l???p h???c</DialogTitle>
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
                                        label="T??n l???p h???c"
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
                                        label="T??n ch??? ?????"
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
                                        label="S??? l?????ng h???c sinh"
                                        onChange={(e) => {
                            
                                            if (course && +e.target.value < course?.studentExist) {
                                                setError("studentLimit", {
                                                    message: "Kh??ng th??? b?? h??n s??? h???c sinh hi???n t???i.",
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
                                        label="S??? l?????ng h???c sinh hi???n t???i"
                                        value={course?.studentExist}
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                className="change-info___modal--body___text-input"
                                fullWidth
                                label="M?? t??? v??? l???p h???c"
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
                        H???y B???
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleSubmit(handleUpdateInfo)}>
                        C???p Nh???t
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default CourseInfo;