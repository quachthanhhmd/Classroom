import { Avatar, Button, Card, CardContent, CardHeader, Divider, FormControl, Grid, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, AttachFile, CloudDownload } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./index.scss";
import submissionApi from "../../api/submission.api";
import { useParams } from "react-router";
import { ISubmissionResponse, ISubmissionSummary } from "../../interfaces";
import { openInNewTab } from "../../utils/mail";


interface IAttachment {
    id: number,
    url: string,
}

const attachmentListDefault = [
    {
        id: 1,
        url: "https://drive.google.com/open?id=1oyjFtw6TBlWllaAPI9oNrYiZ5f64DX8c&authuser=0",
        name: "abcd",
    },
    {
        id: 2,
        url: "https://drive.google.com/open?id=1exH05uXXjfxKfnIvLtiRSeevME1Yyj8R&authuser=0",
        name: "eeee",
    },
    {
        id: 3,
        url: "https://drive.google.com/open?id=1YbnFpon6BPQOxvu2ePDDiR7hksfT8Shc&authuser=0",
        name: "fffffd",
    }
]


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
                    {student.score}/100
                </Typography>
                <Typography style={{ fontSize: "0.9rem", fontStyle: "italic", opacity: "0.8" }}>
                    {student.score ? student.score : "Chưa chấm điểm"}
                </Typography>
            </div>
        </div>

    )
}

const Marking = () => {
    const { postId, courseId } = useParams<{ courseId: string, postId: string }>();
    const [attachmentList, setAttachmentList] = useState(attachmentListDefault);
    const [submissionView, setSubmissionView] = useState<number>(-1);
    const [submissionDetail, setSubmissionDetail] = useState<ISubmissionResponse | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [studentList, setStudentList] = useState<ISubmissionSummary[]>([]);


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
                console.log(res.data.payload)
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
        }
    }, [submissionView])

    const handleChangeScore = (score: string) => {

        if (Number(score) !== undefined && submissionDetail) {
            const newSubmission: ISubmissionResponse = { ...submissionDetail };
            newSubmission.score = +score;

            setSubmissionDetail(newSubmission);
        }

    }
    console.log(submissionDetail);
    return (
        <>
            {submissionDetail &&
                <Card className="mark">
                    <Grid className="mark___title" container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl style={{ width: "60%" }}>
                                <Select
                                    displayEmpty
                                    className="mark___dropdown"
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
                                                <MenuItem key={`student-dropdown-${index}`} className="mark___dropdown--menu">
                                                    <StudentItem student={student} />
                                                </MenuItem>
                                            )
                                        })
                                    }

                                </Select>
                            </FormControl>

                            <IconButton style={{ marginLeft: "1rem" }}>
                                <KeyboardArrowLeft />
                            </IconButton>
                            <IconButton>
                                <KeyboardArrowRight />
                            </IconButton>

                        </Grid>
                        <Grid container item xs={6} justifyContent="flex-end">
                            <CardContent
                                className="mark___submit"
                                style={{ padding: "0", alignSelf: "center", alignItems: "center" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="mark___submit--button"
                                    style={{ marginRight: "0.6rem" }}
                                >
                                    Trả Bài
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="mark___submit--button"
                                    style={{ padding: "0.4rem", minWidth: "0px", marginRight: "2rem" }}

                                >
                                    <KeyboardArrowDown />
                                </Button>
                            </CardContent>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} style={{ height: "100%", paddingBottom: "1rem" }} >
                        <Grid item xs={8}>

                            <div className="mark___download">
                                <div className="mark___download--text" style={{ marginTop: "-4rem" }}>
                                    Không thể xem trước, vui lòng tải về máy.
                                </div>
                                <div style={{ marginTop: "1rem" }}>
                                    <Button variant="contained" color="secondary">Tải về tất cả</Button>
                                </div>
                            </div>


                        </Grid>
                        <Grid item xs={4}>
                            <Card>
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
                                        label="Điểm số"
                                        id="outlined-start-adornment"
                                        value={submissionDetail.score}
                                        onChange={(e) => handleChangeScore(e.target.value)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end" style={{ fontSize: "1.2rem" }}>/10</InputAdornment>,

                                        }}
                                    />
                                </CardContent>

                            </Card>
                        </Grid>
                    </Grid>
                </Card >
            }
        </>
    )
}

export default Marking;