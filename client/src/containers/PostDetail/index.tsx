import { Card, CardContent, CardHeader, Grid, Typography, Divider, Button, IconButton } from "@material-ui/core";
import { Add, Assignment, Clear } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import commentApi from "../../api/comment.api";
import exerciseApi from '../../api/exercise.api';
import CircularLoading from '../../components/Loading';
import ContentPost from "../../components/Post/ContentPost";
import { ReferenceType } from "../../constants";
import { IComment, IExerciseDetail } from '../../interfaces';
import { getDateFormat, getDateTimeFormat } from '../../utils/converter';
import { DropzoneDialog } from 'material-ui-dropzone'
import "./index.scss";

const PostDetail = () => {
    const { courseId, postId } = useParams<{ courseId: string, postId: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [exercise, setExercise] = useState<IExerciseDetail | null>(null);

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [spendingFile, setSpendingFile] = useState<any[]>([]);


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

    const handleSave = (fileList: any[]) => {
        handleClose();
        const newSpendingFile = [...spendingFile, ...fileList];
        console.log(newSpendingFile);
        setSpendingFile(newSpendingFile)
    }

    const handleEditFile = (indexValue: number) => {

        const newFileList = spendingFile.filter((file, index) => index !== indexValue);
        setSpendingFile(newFileList);
    }

    const handleClose = () => {
        setOpenDialog(false);
    }
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
                                        :
                                        <>
                                            {
                                                spendingFile.map((file, index) => {
                                                    return (
                                                        <CardHeader
                                                            key={`files-${index}`}
                                                            avatar={<Assignment />}
                                                            title={file.name}
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
                                        </>
                                    }
                                    <DropzoneDialog
                                        open={openDialog}
                                        onSave={handleSave}
                                        acceptedFiles={[]}
                                        showPreviews={true}
                                        maxFileSize={5000000}
                                        onClose={handleClose}
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        style={{ marginTop: "1rem" }}

                                    > Hủy nộp bài</Button>
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