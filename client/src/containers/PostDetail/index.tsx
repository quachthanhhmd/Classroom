import { Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from "@material-ui/core";
import { Add, Assignment, Clear, KeyboardArrowRight } from '@material-ui/icons';
import { DropzoneDialog } from 'material-ui-dropzone';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router';
import { showErrorNotify, showSuccessNotify } from "../../actions/notification.action";
import attachmentApi from "../../api/attachment.api";
import commentApi from "../../api/comment.api";
import exerciseApi from '../../api/exercise.api';
import notificationApi from "../../api/notification.api";
import submissionApi from "../../api/submission.api";
import Comment from "../../components/Comment";
import CreateComment from "../../components/Comment/CreateComment";
import CircularLoading from '../../components/Loading';
import ContentPost from "../../components/Post/ContentPost";
import { uploadBulk } from "../../configs/firebase";
import { Socket } from "../../configs/websocket";
import { FolderName, NotificationType, ReferenceType, ReviewResponse, ReviewResponseUri, SubmissionType, TeacherReview, TeacherReviewUri, TYPEROLE } from "../../constants";
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
    const history = useHistory();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [exercise, setExercise] = useState<IExerciseDetail | null>(null);
    const [submission, setSubmission] = useState<ISubmissionResponse | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [spendingFile, setSpendingFile] = useState<IFileState[]>([]);

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);


    const dispatch = useDispatch();
    const member = useSelector((state: AppState) => state.member);
    const auth = useSelector((state: AppState) => state!.auth);
    const course = useSelector((state: AppState) => state!.course);

    useEffect(() => {

        async function getExercise(courseId: number, postId: number) {
            setIsLoading(true);
            try {
                const res = await exerciseApi.getOneExercise(courseId, postId);
                setIsLoading(false);
                if (!res || res.status !== 200) return;

                setExercise(res.data.payload);
            } catch (err) {

            }
        }

        getExercise(+courseId, +postId);

    }, [])

    useEffect(() => {
        async function getSubmission() {
            const res = await submissionApi.getSubmission(+courseId, +postId);

            if (!res || res.status !== 200) return;

            if (res.data.payload)
                updateSpendingFileState(res.data.payload);
        }

        if (member && member.currentRole?.role === TYPEROLE.STUDENT) {
            getSubmission();
        }
    }, [member, member.currentRole?.role])

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
            dispatch(showErrorNotify("C???p nh???t th???t b???i"))
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
            alert("H??y ch???n file ????? n???p b??i");
            return;
        }
        if (submission && submission.type === SubmissionType.SCORED) {
            alert("B??i n??y ???? ???????c ch???m ??i???m, b???n kh??ng th??? n???p th??m");
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

    const handleToSubmission = () => {
        history.push(`/course/${courseId}/post/${postId}/submission`);
    }

    const handleSubmitComment = async (comment: string) => {

        if (!submission || !course || !course.course) return;

        const data = {
            id: 0,
            content: TeacherReview(`${auth.user?.firstName} ${auth.user?.lastName}`),
            isRead: false,
            createdAt: new Date(),
            uri: TeacherReviewUri(+courseId, submission.exerciseId, auth!.user!.id),
            info: {
                avatarUrl: auth.user?.avatarUrl,
                name: `${auth.user?.firstName} ${auth.user?.lastName}`
            }
        }
        Socket.emit("notify-one-exercise", ({ data, userId: course.course?.ownerId }))

        try {
            setIsLoading(true);
            const res = await commentApi.createNewComment({
                refType: ReferenceType.SUBMISSION,
                refId: submission.id,
                content: comment,
            })

            await notificationApi.createNotification({
                content: TeacherReview(`${auth.user?.firstName} ${auth.user?.lastName}`),
                isRead: false,
                uri: TeacherReviewUri(+courseId, submission.exerciseId, +postId),
                refType: NotificationType.COURSE,
                userId: course.course!.ownerId,
                refId: +courseId
            })

            setIsLoading(false);

            if (!res || res.status !== 200) throw new Error();

            submission.commentList.push(res.data.payload);
            setSubmission({ ...submission });
        } catch (err) {

        }
    }
    return (
        <>
            {(exercise && !isLoading) ?
                <div className="post-detail">
                    <Grid container spacing={2}>
                        <Grid item xs={8} >
                            <Card style={{ padding: "0.5rem" }}>
                                <CardHeader
                                    action={
                                        <Typography >H???n n???p: {getDateTimeFormat(exercise.deadline)}</Typography>
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
                                    <Typography>H???n n???p</Typography>
                                </CardHeader>

                                <Divider style={{ marginBottom: "3rem" }} />
                                <ContentPost commentList={exercise.commentList} isHiddenComment={true} clickCreateComment={handleCreateComment} content={exercise.description} />
                            </Card>
                        </Grid>
                        {member && member.currentRole && member.currentRole.role === TYPEROLE.STUDENT ?
                            <Grid item xs={4} >
                                <Card >
                                    <CardHeader
                                        title="B??i t???p c???a b???n"
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
                                                    N???p b??i t???p
                                                </Button>
                                                <Button
                                                    style={{ marginTop: "1rem" }}
                                                    variant="contained"
                                                    onClick={() => createSubmission([])}
                                                    fullWidth
                                                >
                                                    ????nh d???u l?? ???? n???p
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
                                                        Th??m m???i
                                                    </Button>
                                                }
                                                {(!isSubmitted || (submission?.type === SubmissionType.CANCELLED)) ?
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        onClick={handleSubmitAttachment}
                                                        style={{ marginTop: "1rem", backgroundColor: "rgb(3, 169, 244)" }}

                                                    > N???p b??i</Button>
                                                    :
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        onClick={() => {
                                                            handleUpdateStatusSubmission(SubmissionType.CANCELLED)

                                                        }}
                                                        style={{ marginTop: "1rem" }}

                                                    > H???y n???p b??i</Button>
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
                                            submitButtonText="T???i l??n"
                                            dialogTitle="T???i t???p l??n"
                                            cancelButtonText="H???y b???"
                                            dropzoneText="K??o th??? v??o ????? t???i t???p l??n"
                                        />

                                    </CardContent>
                                </Card>
                                {
                                    submission && isSubmitted && <Card style={{ marginTop: "1rem" }}>
                                        <CardHeader
                                            title="Ph???n h???i & Ph??c kh???o"
                                        />
                                        <CardContent className="post-detail___submission-comment">
                                            {
                                                submission && submission.commentList.map((comment, index) => <Comment comment={comment} index={index} />)
                                            }
                                        </CardContent>
                                        <Divider />
                                        <CreateComment avatar={auth?.user?.avatarUrl} onSubmitComment={handleSubmitComment} />
                                    </Card>
                                }

                            </Grid>

                            :
                            <Grid item xs={4}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<KeyboardArrowRight />}
                                    onClick={
                                        handleToSubmission
                                    }
                                >
                                    B??i t???p c???a h???c vi??n
                                </Button>
                            </Grid>
                        }
                    </Grid>
                </div>
                :
                <CircularLoading />
            }
        </>
    )
}

export default PostDetail;