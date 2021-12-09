import { Avatar, Button, Card, CardContent, CardHeader, Checkbox, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { EmailSharp, KeyboardArrowLeft, People, Search, Settings } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import submissionApi from '../../api/submission.api';
import CircularLoading from '../../components/Loading';
import { SubmissionType } from '../../constants';
import { ISubmissionSummary } from '../../interfaces';
import { SubmissionMessage } from '../../messages';
import { removeVietnameseTones } from '../../utils/converter';
import { openInNewTab, sendMailAllURL } from '../../utils/mail';
import { isEmpty } from '../../utils/object-solve';
import "./index.scss";


const ContainerSubmission = (props: {courseId: string, postId: string, student: ISubmissionSummary }) => {
    const { student, courseId, postId } = props;
    const history = useHistory();

    const handleRedirect = () => {
        history.push(`/course/${courseId}/post/${postId}/marking`)
    }

    return (
        <Button
            onClick={handleRedirect}
        style={{ textTransform: "none" }}>
            <Card variant="elevation" style={{ width: "100%", height: "7rem" }} >

                <CardHeader
                    titleTypographyProps={{
                        fontSize: 22,
                    }}
                    title={`${student.user.firstName} ${student.user.lastName}`}
                    avatar={
                        <Avatar src="/none-avt.png" />
                    }
                />
                <Typography style={{ opacity: 0.6 }}>
                    {SubmissionMessage[student.type]}
                </Typography>
            </Card>
        </Button>


    )
}

const SubmissionManage = () => {
    const { postId, courseId } = useParams<{ courseId: string, postId: string }>();
    const history = useHistory();

    const [sortType, setSortType] = useState<number>(3);
    const [markType, setMarkType] = useState<SubmissionType | "all">("all");
    const [checkedList, setCheckedList] = useState<Object>({});
    const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [studentList, setStudentList] = useState<ISubmissionSummary[]>([]);
    const [searchData, setSearchData] = useState<ISubmissionSummary[]>([]);


    useEffect(() => {

        const getAllSubmission = async () => {

            try {
                setIsLoading(true);
                const res = await submissionApi.getAllInExercise(+courseId, +postId);
                setIsLoading(false);
                if (!res || res.status !== 200) return;

                setStudentList(res.data.payload);
                setSearchData(res.data.payload);


                if (isEmpty(checkedList)) {
                    let newCheckList: Object = {};
                    res.data.payload.forEach((student, index) => {

                        newCheckList = { ...newCheckList, [student.id]: false };
                    })
                    setCheckedList(newCheckList);
                }

            } catch (err) {

            }
        }

        getAllSubmission();

    }, [studentList.length, checkedList, courseId, postId])



    const handleChangeSubmission = (e) => {
        setMarkType(String(e.target.value) as SubmissionType | "all")

    }

    const handleCheckedAll = () => {
        let newCheckList = { ...checkedList };
        for (var key in newCheckList) {
            if (newCheckList.hasOwnProperty(key)) {
                newCheckList[key] = !isCheckedAll;
            }
        }
        setCheckedList(newCheckList);
        setIsCheckedAll(!isCheckedAll);
    }

    const countTypeSubmission = (state: string) => {
        const countStudent = studentList.filter(student => student.type === state);
        return countStudent.length;
    }

    const sortStudent = () => {
        switch (sortType) {
            case 1: {
                const newStudentList = studentList.sort((a, b) => a.user.firstName > b.user.firstName ? 1 : -1);
                setStudentList(newStudentList);
                setSearchData(newStudentList);
                return;
            }
            case 2: {
                const newStudentList = studentList.sort((a, b) => a.user.lastName > b.user.lastName ? 1 : -1);
                setStudentList(newStudentList);
                setSearchData(newStudentList);
                return;
            }
            default: {
                return;
            }
        }
    }

    const handleSearchName = (e) => {
        setSearchString(e.target.value);
        if (e.target.value === "") {
            setSearchData(studentList);
            return;
        }

        const filteredData = studentList.filter(element => {
            const fullName = removeVietnameseTones(`${element.user.firstName} ${element.user.lastName}`.toLowerCase());
            return fullName.includes((e.target.value).toLowerCase());
        });

        setSearchData(filteredData);
    }

    const handleSendMailAll = () => {
        const studentEmail = studentList.filter((student) => {
            if (checkedList[student.id]) return true;
            return false;
        })

        openInNewTab(sendMailAllURL(studentEmail.map(student => student.user.email)));
    }


    const handleReturnPost = () => {
        history.push(`/course/${courseId}/post/${postId}/details`);
    }
    return (
        <>
            {!isLoading ?
                <Card className="manage-main">
                    <CardContent className="manage-main___title">
                        <div className="manage-main___title___left">

                            <Button
                                startIcon={
                                    <KeyboardArrowLeft />
                                }
                                onClick={handleReturnPost}
                            >Hướng dẫn</Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className="manage-main___title___left--button"
                            >Trả Bài</Button>
                            <Button
                                startIcon={
                                    <EmailSharp />
                                }
                                onClick={handleSendMailAll}
                                className="manage-main___title___left--button">
                                Gửi Email
                            </Button>
                        </div>
                        <div className="manage-main___title___right">
                            <IconButton>
                                <Settings />
                            </IconButton>
                        </div>
                    </CardContent>


                    <Grid container spacing={2} className="manage-main___content" style={{ paddingTop: "0.5rem" }}>
                        <Grid item xs={4}
                            style={{ borderRight: "1px solid #cacaca" }}
                        >
                            <div
                                className="manage-main___content--manager"
                            >
                                <TextField
                                    fullWidth
                                    variant="outlined" size="small"
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter') {
                                            // Do code here
                                            ev.preventDefault();
                                            handleSearchName(ev)
                                        }
                                    }}
                                    onChange={(e) => handleSearchName(e)}
                                    value={searchString}
                                    label="Tìm kiếm học sinh"
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton onClick={(e) => handleSearchName(e)}>
                                                <Search />
                                            </IconButton>
                                        )
                                    }}
                                />
                                <FormControl variant="standard" className="manage-main___content--manager--dropdown">
                                    <InputLabel id="uncontrolled-native-topic">Chủ đề</InputLabel>
                                    <Select
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
                                        value={sortType}
                                        defaultValue={3}
                                        onChange={(e) => {
                                            setSortType(Number(e.target.value));
                                            sortStudent();
                                        }}
                                        variant="standard" labelId="uncontrolled-native-topic">
                                        <MenuItem className="manage-main___content--manager--dropdown--option"
                                            key="sort-firstName"
                                            value={1}
                                        >

                                            Sắp xếp theo họ

                                        </MenuItem>
                                        <MenuItem className="manage-main___content--manager--dropdown--option"
                                            key="sort-latName"
                                            value={2}
                                        >

                                            Sắp xếp theo tên

                                        </MenuItem>
                                        <MenuItem className="manage-main___content--manager--dropdown--option"
                                            key="sort-state"
                                            value={3}>

                                            Sắp xếp theo trạng thái

                                        </MenuItem>
                                    </Select>

                                </FormControl>
                            </div>

                            <div
                                className="manage-main___content--all"
                            >
                                <Checkbox
                                    onClick={handleCheckedAll}
                                    checked={isCheckedAll} />
                                <Button
                                    fullWidth
                                    startIcon={
                                        <People style={{ fontSize: "1.1rem" }} />
                                    }

                                >

                                    Tất cả học viên
                                </Button>
                            </div>
                            <Divider />

                            <div className="manage-main___content--all-student">
                                {searchData.map((student, index) => {

                                    return (
                                        <div key={`student-${index}`} className="manage-main___content--student">
                                            <Checkbox
                                                edge="start"
                                                tabIndex={-1}
                                                disableRipple
                                                checked={checkedList[student.id] || false}
                                                onClick={() => {
                                                    let newCheckedList = { ...checkedList };
                                                    newCheckedList[student.id] = !checkedList[student.id];
                                                    setCheckedList(newCheckedList);
                                                }} />
                                            <Button
                                                fullWidth
                                                startIcon={
                                                    <Avatar src={student.user.avatarUrl} style={{ fontSize: "1.1rem" }} />
                                                }
                                            >
                                                {`${student.user.firstName} ${student.user.lastName}`}
                                            </Button>
                                        </div>
                                    )
                                })}
                            </div>

                        </Grid>
                        <Grid item xs={8} style={{ overflow: "scroll", height: "80vh" }}>
                            {studentList.length !== 0 ?
                                <>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={5}>
                                                <Typography variant="h4" component="h1">Reactjs</Typography>
                                            </Grid>
                                            <Grid item xs={7} style={{ display: "inline" }}>
                                                <Button
                                                    style={{ backgroundColor: "#33DCFF", marginRight: "1rem" }}
                                                    variant="contained"
                                                    onClick={() => setMarkType(SubmissionType.SUBMITTED)}
                                                >
                                                    Đã nộp: {countTypeSubmission(SubmissionType.SUBMITTED)}
                                                </Button>

                                                <Button
                                                    style={{ backgroundColor: "#33DCFF", marginRight: "1rem" }}
                                                    variant="contained"
                                                    onClick={() => setMarkType(SubmissionType.COMPLETED)}
                                                >
                                                    Đã trả bài: {countTypeSubmission(SubmissionType.COMPLETED)}
                                                </Button>
                                                <Button
                                                    style={{ backgroundColor: "#33DCFF" }}
                                                    variant="contained"
                                                    onClick={() => setMarkType(SubmissionType.SCORED)}
                                                >
                                                    Đã chấm điểm: {countTypeSubmission(SubmissionType.SCORED)}
                                                </Button>


                                            </Grid>
                                        </Grid>
                                        <FormControl variant="standard" style={{ width: "20%" }}>
                                            <InputLabel id="uncontrolled-native-topic">Chủ đề</InputLabel>
                                            <Select
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
                                                value={markType}
                                                defaultValue={1}
                                                onChange={(e) => handleChangeSubmission(e)}
                                                variant="standard" labelId="uncontrolled-native-topic">
                                                <MenuItem className="manage-main___content--manager--dropdown--option"
                                                    key="all-state"
                                                    value={"all"}
                                                >
                                                    Tất cả
                                                </MenuItem>
                                                <MenuItem className="manage-main___content--manager--dropdown--option"
                                                    key="submitted-state"
                                                    value={SubmissionType.SUBMITTED}
                                                >
                                                    Đã nộp
                                                </MenuItem>
                                                <MenuItem className="manage-main___content--manager--dropdown--option"
                                                    key="completed-state"
                                                    value={SubmissionType.COMPLETED}>

                                                    Đã trả bài

                                                </MenuItem>
                                                <MenuItem className="manage-main___content--manager--dropdown--option"
                                                    key="state-scored"
                                                    value={SubmissionType.SCORED}>

                                                    Đã chấm điểm

                                                </MenuItem>
                                            </Select>

                                        </FormControl>

                                    </CardContent>

                                    {
                                        studentList.map(student => {
                                            if (markType === "all" || student.type === markType)
                                                return <ContainerSubmission postId={postId} courseId={courseId}  student={student} />
                                        })
                                    }
                                </>
                                :
                                <Typography component="div" variant="h4" className="manage-main___content--no-submission">
                                    Hiện chưa có thành viên nào nộp bài tập
                                </Typography>
                            }
                        </Grid>
                    </Grid>



                </Card>
                : <CircularLoading />
            }
        </>
    )
}

export default SubmissionManage