import { Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from "@material-ui/core";
import { Add, Assignment, Clear } from '@material-ui/icons';
import { DropzoneDialog } from 'material-ui-dropzone';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import commentApi from "../../api/comment.api";
import exerciseApi from '../../api/exercise.api';
import CircularLoading from '../../components/Loading';
import ContentPost from "../../components/Post/ContentPost";
import { uploadFile } from "../../configs/firebase";
import { FolderName, ReferenceType } from "../../constants";
import { IComment, IExerciseDetail } from '../../interfaces';
import { ICreateAttachment } from "../../interfaces/attachment.interface";
import { getDateTimeFormat } from '../../utils/converter';
import "./index.scss";

const PostDetail = () => {
    const { courseId, postId } = useParams<{ courseId: string, postId: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [exercise, setExercise] = useState<IExerciseDetail | null>(null);

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [spendingFile, setSpendingFile] = useState<File[]>([]);


    useEffect(() => {
        async function getExercise(courseId: number, postId: number) {
            setIsLoading(true);
            const res = await exerciseApi.getOneExercise(courseId, postId);
            setIsLoading(false);
            if (!res || res.status !== 200) return;

            console.log(res.data.payload);
            setExercise(res.data.payload);
        }

        getExercise(+courseId, +postId);
    }, [])

    const handleCreateComment = async (content: string, id: number) => {

        const data: IComment = {
            content,
            refId: exercise!.id,
            refType: ReferenceType.EXERCISE
        }
        if (!exercise) return;
        try {
            const res = await commentApi.createNewComment(data);

            if (!res || res.status !== 200) throw new Error();

            // update exercise

            exercise?.commentList.push(res.data.payload);

            setExercise({ ...exercise });
        } catch (err) {

        }
    }

    const createNewAttachment = (data: ICreateAttachment) => {
        console.log(data);
    }

    const handleSave = (fileList: File[]) => {
        handleClose();
        const newSpendingFile = [...spendingFile, ...fileList];

        setSpendingFile(newSpendingFile);
        //uploadFile(FolderName.EXERCISE, fileList[0], createNewAttachment)
    }

    const handleEditFile = (indexValue: number) => {

        const newFileList = spendingFile.filter((file, index) => index !== indexValue);
        setSpendingFile(newFileList);
    }

    const handleClose = () => {
        setOpenDialog(false);
    }

    const styles = {

        cardHeader: {
           backgroundColor: "#d8e2f3",
           MuiTypography: {
              fontVariant: "h4"
           }
        }
     };

    return (
        <>
            {(exercise && !isLoading) ?
                <div className="post-detail">
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Card>
                                <CardHeader
                                    action={
                                        <Typography >Hạn nộp: {getDateTimeFormat(exercise.deadline)}</Typography>
                                    }
                                    avatar={
                                        <Assignment style={{ fontSize: "2rem", color: "blue" }} />
                                    }
                                    classes={{
                                        action: "post-detail___action",
                                        title: "post-detail___title"
                                    }}
                                    titleTypographyProps={{ fontWeight: "bold", variant: 'h3' }}
                                    title={exercise.title}
                                    subheader={`${exercise.user.firstName} ${exercise.user.lastName}`}
                                >
                                    <Typography>Hạn nộp</Typography>
                                </CardHeader>

                                <Divider style={{ marginBottom: "3rem" }} />
                                <ContentPost commentList={exercise.commentList} isHiddenComment={true} clickCreateComment={handleCreateComment} content={exercise.description} />
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card>
                                <CardHeader
                                    title="Bài tập của bạn"
                                >

                                </CardHeader>
                                <CardContent>

                                    {spendingFile.length === 0 ?
                                        <>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                onClick={() => setOpenDialog(true)}
                                                startIcon={
                                                    <Add />
                                                }
                                            >
                                                Nộp bài tập
                                            </Button>
                                            <Button
                                                style={{ marginTop: "1rem" }}
                                                variant="contained"
                                                fullWidth
                                            >
                                                Đánh dấu là đã nộp
                                            </Button>
                                        </>
                                        :
                                        <>
                                            {
                                                spendingFile.map((file, index) => {
                                                    return (
                                                        <CardHeader
                                                            fullWidth
                                                            style={{width: "100%"}}
                                                            key={`files-${index}`}
                                                            avatar={<Assignment />}
                                                            title={file.name}
                                                            titleTypographyProps={{
                                                                textOverflow: "ellipsis !important",
                                                                width: "100% !important",
                                                                display:"inline",
                                                                whiteSpace: "nowrap !important",
                                                                overflow: "hidden !important"
                                                            }}
                                                            action={
                                                                <IconButton onClick={() => handleEditFile(index)}>
                                                                    <Clear />
                                                                </IconButton>
                                                            }
                                                        />


                                                    )
                                                })
                                            }
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                onClick={() => setOpenDialog(true)}
                                                startIcon={
                                                    <Add />
                                                }
                                            >
                                                Thêm mới
                                            </Button>
                                            <Button
                                                fullWidth
                                                variant="contained"

                                                style={{ marginTop: "1rem", backgroundColor: "rgb(3, 169, 244)" }}

                                            > Nộp bài</Button>

                                            <Button
                                                fullWidth
                                                variant="contained"
                                                style={{ marginTop: "1rem" }}

                                            > Hủy nộp bài</Button>
                                        </>
                                    }
                                    <DropzoneDialog
                                        open={openDialog}
                                        onSave={handleSave}
                                        acceptedFiles={[]}
                                        showPreviews={true}
                                        maxFileSize={5000000}
                                        onClose={handleClose}
                                        submitButtonText="Tải lên"
                                        dialogTitle="Tải tệp lên"
                                        cancelButtonText="Hủy bỏ"
                                        dropzoneText="Kéo thả vào để tải tệp lên"
                                    />

                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                :
                <CircularLoading />
            }
        </>
    )
}

export default PostDetail;