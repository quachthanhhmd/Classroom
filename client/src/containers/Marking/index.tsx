import { Avatar, Button, Card, CardContent, CardHeader, Divider, FormControl, Grid, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { AttachFile, CloudDownload, KeyboardArrowLeft, KeyboardArrowRight, Send } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { showErrorNotify, showSuccessNotify } from "../../actions/notification.action";
import commentApi from "../../api/comment.api";
import submissionApi from "../../api/submission.api";
import Comment from "../../components/Comment";
import { ReferenceType, SubmissionType } from "../../constants";
import { ISubmissionResponse, ISubmissionSummary } from "../../interfaces";
import { SCORED_FAIL, SCORED_SUCCESS, SubmissionMessage } from "../../messages";
import { AppState } from "../../reducers";
import { openInNewTab } from "../../utils/mail";
import "./index.scss";


const StudentItem = (props: { student: ISubmissionSummary }) => {
    const student = props.student
    return (

        <div
            className="mark___dropdown--item"
        >
            <div className="mark___dropdown--item--avatar">
                <Avatar src={`${student.user.avatarUrl ? student.user.avatarUrl : "/none-avt.png"}`} />
            </div>
            <div className="mark___dropdown--item--name">
                {`${student.user.firstName} ${student.user.lastName}`}
            </div>
            <div className="mark___dropdown--item--action">
                <Typography style={{ fontSize: "0.9rem" }}>
                    {student.score}/10
                </Typography>
                <Typography style={{ fontSize: "0.9rem", fontStyle: "italic", opacity: "0.8" }}>
                    {SubmissionMessage[student.type]}
                </Typography>
            </div>
        </div>

    )
}

const Marking = () => {
    const { postId, courseId } = useParams<{ courseId: string, postId: string }>();
    const dispatch = useDispatch();
    const auth = useSelector((state: AppState) => state.auth);
    const [comment, setComment] = useState<string>("");

    const [submissionView, setSubmissionView] = useState<number>(-1);
    const [submissionDetail, setSubmissionDetail] = useState<ISubmissionResponse | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [studentList, setStudentList] = useState<ISubmissionSummary[]>([]);

    const [score, setScore] = useState<string>("");

    useEffect(() => {

        const getAllSubmission = async () => {

            try {
                setIsLoading(true);
                const res = await submissionApi.getAllInExercise(+courseId, +postId);
                setIsLoading(false);
                if (!res || res.status !== 200) return;

                setStudentList(res.data.payload);
                if (res.data.payload.length > 0)
                    setSubmissionView(0);
            } catch (err) {

            }
        }

        getAllSubmission();

    }, [studentList.length, , courseId, postId])


    useEffect(() => {

        const getSubmissionDetail = async (id: number) => {
            try {
                const res = await submissionApi.getSubmissionDetail(+courseId, id);

                if (!res || res.status !== 200) return;
                setSubmissionDetail(res.data.payload);

            } catch (err) {

            }
        }

        if (studentList.length !== 0) {
            if (!submissionDetail || (submissionView !== submissionDetail.id)) {
                if (submissionView === -1) {
                    getSubmissionDetail(studentList[0].id);
                }
                else {

                    getSubmissionDetail(studentList[submissionView].id);
                }
            }
            setComment("");
        }
    }, [submissionView])


    const handleReturnSubmission = async () => {
        if (!submissionDetail || typeof submissionDetail.score === "undefined") return;

        try {
            const res = await submissionApi.updateScore(+courseId, submissionDetail.userId, submissionDetail.exerciseId, { type: SubmissionType.SCORED, score: submissionDetail.score });

            if (!res || res.status !== 200) throw new Error();

            dispatch(showSuccessNotify(SCORED_SUCCESS));

        } catch (err) {
            dispatch(showErrorNotify(SCORED_FAIL))
        }
    }

    const handleChangeScore = (score: string) => {

        const setScore = (grade: number | undefined) => {
            const newSubmission: ISubmissionResponse = { ...submissionDetail! };
            newSubmission.score = grade;

            setSubmissionDetail(newSubmission);

            const newStudentList = [...studentList];
            newStudentList[submissionView].score = grade;

            setStudentList(newStudentList);
        }
        if (score === "") {
            setScore(undefined);
            return;
        }
        if (Number(score) && Number(score) <= 10 && Number(score) >= 0 && submissionDetail) {
            setScore(Number(score));
        }
    }
    const handleArrowLeft = () => {
        if (submissionView === 0) return;
        setSubmissionView(submissionView - 1);
    }

    const handleArrowRight = () => {
        if (submissionView === studentList.length - 1) {
            return;
        }
        setSubmissionView(submissionView + 1);
    }

    const handleSubmitComment = async () => {

        if (!submissionDetail || !comment) return;

        try {
            const res = await commentApi.createNewComment({
                refType: ReferenceType.SUBMISSION,
                refId: submissionDetail.id,
                content: comment,
            })

            if (!res || res.status !== 200) throw new Error();

            const newSubmission = { ...submissionDetail };
            newSubmission.commentList.push(res.data.payload);

            setSubmissionDetail(newSubmission);
        } catch (err) {

        }
    }

    return (
        <>
            <Helmet>
                <title>
                    Chấm điểm | EClassroom
                </title>
            </Helmet>
            {submissionDetail &&
                <Card className="mark">
                    <Grid className="mark___title" container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl style={{ width: "60%" }}>
                                <Select
                                    displayEmpty
                                    className="mark___dropdown"
                                    value={submissionView}
                                    onChange={(e: any) => {
                                        console.log(e.target.value);
                                        setSubmissionView(+e.target.value)
                                    }}
                                    MenuProps={{
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        transformOrigin: {
                                            vertical: "top",
                                            horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                    }}
                                >

                                    {
                                        studentList.length !== 0 && studentList.map((student, index) => {
                                            return (
                                                <MenuItem key={`student-dropdown-${index}`} value={index} className="mark___dropdown--menu">
                                                    <StudentItem student={student} />
                                                </MenuItem>
                                            )
                                        })
                                    }

                                </Select>
                            </FormControl>

                            <IconButton style={{ marginLeft: "1rem" }} onClick={handleArrowLeft} >
                                <KeyboardArrowLeft />
                            </IconButton>
                            <IconButton onClick={handleArrowRight} >
                                <KeyboardArrowRight />
                            </IconButton>

                        </Grid>
                        <Grid item xs={6} justifyContent="flex-end">
                            <CardContent
                                className="mark___submit"
                                style={{ padding: "0", alignSelf: "center", alignItems: "center" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="mark___submit--button"
                                    style={{ marginRight: "0.6rem" }}
                                    onClick={handleReturnSubmission}
                                    disabled={submissionDetail && submissionDetail.score ? false : true}
                                >
                                    Trả Bài
                                </Button>
                                {/* <Button
                                    variant="contained"
                                    color="primary"
                                    className="mark___submit--button"
                                    style={{ padding: "0.4rem", minWidth: "0px", marginRight: "2rem" }}

                                >
                                    <KeyboardArrowDown />
                                </Button> */}
                            </CardContent>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} style={{ height: "100%", paddingBottom: "1rem" }} >
                        <Grid item xs={9}>

                            <div className="mark___download">
                                <div className="mark___download--text" style={{ marginTop: "-4rem" }}>
                                    Không thể xem trước, vui lòng tải về máy.
                                </div>
                                <div style={{ marginTop: "1rem" }}>
                                    <Button variant="contained" color="secondary">Tải về tất cả</Button>
                                </div>
                            </div>


                        </Grid>
                        <Grid item xs={3}>
                            <Card className="mark___manage">
                                <CardContent>
                                    <Typography style={{ fontSize: "1.2rem" }}>
                                        Tệp
                                    </Typography>
                                    <Typography style={{ fontSize: "0.8rem", opacity: "0.7" }}>
                                        {/* Đã nộp vào 8 thg 12, 17:54 */}
                                        {submissionDetail?.updatedAt}
                                    </Typography>
                                    {
                                        submissionDetail && submissionDetail.attachmentList && submissionDetail.attachmentList.map((attachment, index) => {
                                            return (
                                                <Button
                                                    className="mark___preview___manager"

                                                    startIcon={
                                                        <AttachFile style={{ fontSize: "1.7rem" }} />
                                                    }
                                                    fullWidth
                                                >
                                                    <div className="mark___preview___manager___content">
                                                        <div className="mark___preview___manager___content--title">
                                                            {attachment.name}
                                                        </div>
                                                        <div className="mark___preview___manager___content--action">
                                                            <IconButton
                                                                style={{ marginRight: "1rem" }}
                                                                onClick={() => {
                                                                    openInNewTab(attachment.url);
                                                                }}
                                                            >
                                                                <CloudDownload />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                </Button>
                                            )
                                        })
                                    }


                                </CardContent>
                                <Divider />
                                <CardContent>
                                    <Typography style={{ fontSize: "1rem" }}>
                                        Điểm
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Điểm số"
                                        id="outlined-start-adornment"
                                        type="number"
                                        value={score}
                                        onChange={(e) => {
                                            if (e.target.value === "" || (Number(e.target.value) && Number(e.target.value) <= 10)) {
                                                setScore(e.target.value);
                                            }

                                            handleChangeScore(e.target.value)
                                        }}
                                        InputProps={{
                                            inputProps: { min: 0, max: 10 },
                                            endAdornment: <InputAdornment position="end" style={{ fontSize: "1.2rem" }}>/10</InputAdornment>,

                                        }}
                                    />
                                </CardContent>
                                <Divider />

                                <CardContent>
                                    {
                                        submissionDetail && submissionDetail.commentList && submissionDetail.commentList.map((comment, index) => (
                                            <Comment comment={comment} index={index} />
                                        ))
                                    }
                                </CardContent>
                                <CardHeader
                                    avatar={
                                        <Avatar src={auth && auth.user?.avatarUrl ? auth.user.avatarUrl : "/none-avt.png"} aria-label="recipe" alt="avt-post">
                                            R
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton
                                            onClick={
                                                handleSubmitComment
                                            } >
                                            <Send />
                                        </IconButton>
                                    }
                                    title={
                                        <TextField
                                            fullWidth
                                            label="nhận xét riêng tự"
                                            placeholder="Thêm nhận về bài tập"
                                            value={comment}
                                            onChange={(e) => {
                                                setComment(e.target.value);
                                            }}
                                        />
                                    }
                                >
                                </CardHeader>
                            </Card>
                        </Grid>
                    </Grid>
                </Card >
            }
        </>
    )
}

export default Marking;