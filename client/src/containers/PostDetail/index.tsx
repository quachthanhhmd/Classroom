import { Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from "@material-ui/core";
import { Add, Assignment, Clear } from '@material-ui/icons';
import { DropzoneDialog } from 'material-ui-dropzone';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import { showErrorNotify, showSuccessNotify } from "../../actions/notification.action";
import attachmentApi from "../../api/attachment.api";
import commentApi from "../../api/comment.api";
import exerciseApi from '../../api/exercise.api';
import submissionApi from "../../api/submission.api";
import CircularLoading from '../../components/Loading';
import ContentPost from "../../components/Post/ContentPost";
import { uploadBulk } from "../../configs/firebase";
import { FolderName, ReferenceType, SubmissionType } from "../../constants";
import { IComment, ICreateSubmission, IExerciseDetail, ISubmissionResponse } from '../../interfaces';
import { ICreateAttachment } from "../../interfaces/attachment.interface";
import { UPDATE_SUCCESS } from "../../messages";
import { SUBMISSION_FAIL, SUBMISSION_SUCCESS } from "../../messages/exercise.message";
import { AppState } from "../../reducers";
import { getDateTimeFormat } from '../../utils/converter';
import { convertAttachToFile, deleteAttachment, fileState, IFileState, uploadBulkAttachment } from "./crud-attachment";
import "./index.scss";


const PostDetail = () => {
    const { courseId, postId } = useParams<{ courseId: string, postId: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [exercise, setExercise] = useState<IExerciseDetail | null>(null);
    const [submission, setSubmission] = useState<ISubmissionResponse | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [spendingFile, setSpendingFile] = useState<IFileState[]>([]);

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const dispatch = useDispatch();
    const member = useSelector((state: AppState) => state.member)

    useEffect(() => {
        async function getSubmission() {
            const res = await submissionApi.getSubmission(+courseId, +postId);

            if (!res || res.status !== 200) return;

            if (res.data.payload)
                updateSpendingFileState(res.data.payload);
        }

        async function getExercise(courseId: number, postId: number) {
            setIsLoading(true);
            const res = await exerciseApi.getOneExercise(courseId, postId);
            setIsLoading(false);
            if (!res || res.status !== 200) return;

            setExercise(res.data.payload);
        }

        getExercise(+courseId, +postId);
        //if (member && member.currentRole?.role === TYPEROLE.STUDENT) {
        getSubmission();
        //}
    }, [])


    const handleUpdateStatusSubmission = async (state: SubmissionType) => {
        if (!submission) return;

        const data = {
            type: state,
        }
        try {
            const res = await submissionApi.updateSubmission(submission.id, +courseId, data);

            if (!res || res.status !== 200) throw new Error();

            dispatch(showSuccessNotify(UPDATE_SUCCESS));
            setSubmission({
                ...submission,
                type: state
            })
            if (state === SubmissionType.CANCELLED) {
                setIsSubmitted(false);
                return;
            }
            setIsSubmitted(true);
        } catch (err) {
            dispatch(showErrorNotify("Cập nhật thất bại"))
        }
    }
    const createBulkAttachment = async (data: ICreateAttachment[]) => {
        try {
            const res = await attachmentApi.createBulkAttachment(ReferenceType.SUBMISSION, submission!.id, +courseId, { attachmentList: data });

            if (!res || res.status !== 200) return;

            const newSpendingFile = spendingFile.filter(file => file.type !== fileState.SPENDING);
            setSpendingFile([...newSpendingFile, ...res.data.payload.map(convertAttachToFile)])

        } catch (err) {

        }
    }

    const createSubmission = async (attachmentList: ICreateAttachment[]) => {

        const data: ICreateSubmission = {
            type: SubmissionType.SUBMITTED,
            attachmentList
        }
        try {

            const res = await submissionApi.createSubmission(+courseId, +postId, data);
            if (!res || res.status !== 200) {
                throw new Error()
            }
            dispatch(showSuccessNotify(SUBMISSION_SUCCESS));
            updateSpendingFileState(res.data.payload);
            setIsSubmitted(true);
        } catch (err) {
            dispatch(showErrorNotify(SUBMISSION_FAIL))
        }
    }

    const updateSpendingFileState = (data: ISubmissionResponse) => {
        setSpendingFile(data.attachmentList.map(convertAttachToFile));
        setSubmission(data);
        setIsSubmitted(true);
    }

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

    const handleSave = (fileList: File[]) => {
        handleClose();
        const standardFileList: IFileState[] = fileList.map((file) => {
            return {
                file,
                type: fileState.SPENDING,
                id: -1
            }
        })

        const newSpendingFile: IFileState[] = [...spendingFile, ...standardFileList];
        setSpendingFile(newSpendingFile);
    }

    const handleEditFile = (indexValue: number) => {
        const newFileList = spendingFile.map((file, index) => {
            if (index === indexValue) return { ...file, type: fileState.DELETE };
            return file;
        });
        setSpendingFile(newFileList);
    }


    const handleSubmitAttachment = async () => {
        if (spendingFile.length === 0) {
            alert("Hãy chọn file để nộp bài");
            return;
        }
        if (submission && submission.type === SubmissionType.SCORED) {
            alert("Bài này đã được chấm điểm, bạn không thể nộp thêm");
            return;
        }
        setIsLoading(true);
        if (submission) {
            // delete attachment
            const deleteList = await deleteAttachment(+courseId, spendingFile);

            if (deleteList) {
                setSpendingFile(deleteList);
            }
            // check upload new
            const isUpdateBulk = await uploadBulkAttachment(+courseId, spendingFile, createBulkAttachment);
            if (isUpdateBulk || deleteList) {
                await handleUpdateStatusSubmission(SubmissionType.SUBMITTED)
                setIsSubmitted(true);
                setIsLoading(false);
                return;
            }
        }


        const uploadList = spendingFile.filter((file, index) => file.type === fileState.SPENDING);

        if (uploadList.length === 0) {
            await handleUpdateStatusSubmission(SubmissionType.SUBMITTED);
            setIsLoading(false);
            return;
        }
        // only update state

        let fileUploadList: File[] = [];
        uploadList.forEach(element => {
            if (element.type === fileState.SPENDING) {
                fileUploadList.push(element.file)
            }
        });
        await uploadBulk(FolderName.EXERCISE, fileUploadList, createSubmission);

        if (submission) {
            setSubmission({
                ...submission,
                type: SubmissionType.SUBMITTED
            })
        }
        setIsSubmitted(true);
        setIsLoading(false);
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

                                    {(!submission && spendingFile.length === 0) ?
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
                                                onClick={() => createSubmission([])}
                                                fullWidth
                                            >
                                                Đánh dấu là đã nộp
                                            </Button>
                                        </>
                                        :
                                        <>
                                            {
                                                spendingFile.map((file, index) => {
                                                    if (file.type !== fileState.DELETE)
                                                        return (
                                                            <div className="submission-file">
                                                                <div className="submission-file___avatar">
                                                                    <Assignment />
                                                                </div>

                                                                <div className="submission-file___title">
                                                                    {file.file.name}
                                                                </div>
                                                                <div className="submission-file___action">
                                                                    {

                                                                        (!isSubmitted || (submission?.type === SubmissionType.CANCELLED)) &&
                                                                        <IconButton onClick={() => handleEditFile(index)}>
                                                                            <Clear />
                                                                        </IconButton>
                                                                    }
                                                                </div>

                                                            </div>


                                                        )
                                                })
                                            }

                                            {(!isSubmitted || (submission?.type === SubmissionType.CANCELLED)) &&
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
                                            }
                                            {(!isSubmitted || (submission?.type === SubmissionType.CANCELLED)) ?
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={handleSubmitAttachment}
                                                    style={{ marginTop: "1rem", backgroundColor: "rgb(3, 169, 244)" }}

                                                > Nộp bài</Button>
                                                :
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={() => {
                                                        handleUpdateStatusSubmission(SubmissionType.CANCELLED)

                                                    }}
                                                    style={{ marginTop: "1rem" }}

                                                > Hủy nộp bài</Button>
                                            }
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