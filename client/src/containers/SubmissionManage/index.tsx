import { Button, Card, CardContent, Grid, Checkbox, IconButton, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Divider, Avatar, Typography, AppBar, CardHeader } from '@material-ui/core';
import { EmailSharp, Settings, People, Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react';
import { SubmissionType } from '../../constants';
import { SubmissionMessage } from '../../messages';
import { isEmpty } from '../../utils/object-solve';

import "./index.scss";

const studentListDefault = [
    {
        id: 11,
        avatarUrl: "/none-avt.png",
        firstName: "Van",
        lastName: "Anh",
        score: 10,
        type: "completed",
    },
    {
        id: 12,
        avatarUrl: "/none-avt.png",
        firstName: "Hai",
        lastName: "Thanh",
        score: 10,
        type: "completed",
    },

]


const ContainerSubmission = (props: { student: any }) => {
    const { student } = props;

    const handleSearchName = (e) => {

    }
    return (
        <Button style={{ textTransform: "none" }}>
            <Card variant="elevation" style={{ width: "100%", height: "7rem" }} >

                <CardHeader
                    titleTypographyProps={{
                        fontSize: 22,
                    }}
                    title={`${student.firstName} ${student.lastName}`}
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

interface IDictCheckList {
    key: number,
    value: boolean,
}

const SubmissionManage = () => {

    const [sortType, setSortType] = useState<number>(3);
    const [markType, setMarkType] = useState<SubmissionType | "all">("all");
    const [studentList, setStudentList] = useState(studentListDefault);
    const [checkedList, setCheckedList] = useState<Object>({});
    const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);

    useEffect(() => {
        if (isEmpty(checkedList)) {
            let newCheckList: Object = {};
            studentList.forEach((student, index) => {

                newCheckList = { ...newCheckList, [student.id]: false };
            })
            setCheckedList(newCheckList);
        }
    }, [studentList.length])

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

    const sortStudent = () => {
        switch (sortType) {
            case 1: {
                const newStudentList = studentList.sort((a, b) => a.firstName > b.firstName ? 1 : -1);
                setStudentList(newStudentList);
                return;
            }
            case 2: {
                const newStudentList = studentList.sort((a, b) => a.lastName > b.lastName ? 1 : -1);
                setStudentList(newStudentList);
                return;
            }
            default: {
                return;
            }
        }
    }

    return (
        <Card className="manage-main">
            <CardContent className="manage-main___title">
                <div className="manage-main___title___left">
                    <Button
                        variant="contained"
                        color="primary"
                    >Trả Bài</Button>
                    <Button
                        startIcon={
                            <EmailSharp />
                        }
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

            <CardContent >
                <Grid container spacing={2} className="manage-main___content">
                    <Grid item xs={4}

                    >
                        <div
                            className="manage-main___content--manager"
                        >
                            <TextField
                                fullWidth
                                variant="outlined" size="small"
                                //style={{marginBottom: "1rem"}}
                                label="Tìm kiếm học sinh"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton>
                                            <Search />
                                        </IconButton>
                                    )
                                }}
                            />
                            <FormControl variant="standard" className="manage-main___content--manager--dropdown">
                                <InputLabel id="uncontrolled-native-topic">Chủ đề</InputLabel>
                                <Select
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
                              checked={isCheckedAll}/>
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
                            {studentList.map((student, index) => {

                                return (
                                    <div key={`student-${index}`} className="manage-main___content--student">
                                        <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            checked={checkedList[student.id] || false}
                                            onClick={() => {
                                                let newCheckedList = {...checkedList};
                                                newCheckedList[student.id] = !checkedList[student.id];
                                                setCheckedList(newCheckedList);
                                            }} />
                                        <Button
                                            fullWidth
                                            startIcon={
                                                <Avatar src={student.avatarUrl} style={{ fontSize: "1.1rem" }} />
                                            }
                                        >
                                            {`${student.firstName} ${student.lastName}`}
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>

                    </Grid>
                    <Grid item xs={8} style={{ overflow: "scroll", height: "80vh" }}>
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
                                        Đã nộp: 10
                                    </Button>

                                    <Button
                                        style={{ backgroundColor: "#33DCFF", marginRight: "1rem" }}
                                        variant="contained"
                                        onClick={() => setMarkType(SubmissionType.COMPLETED)}
                                    >
                                        Đã trả bài: 10
                                    </Button>
                                    <Button
                                        style={{ backgroundColor: "#33DCFF" }}
                                        variant="contained"
                                        onClick={() => setMarkType(SubmissionType.SCORED)}
                                    >
                                        Đã chấm điểm: 10
                                    </Button>


                                </Grid>
                            </Grid>
                            <FormControl variant="standard" style={{ width: "20%" }}>
                                <InputLabel id="uncontrolled-native-topic">Chủ đề</InputLabel>
                                <Select
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
                                    return <ContainerSubmission student={student} />
                            })
                        }

                    </Grid>
                </Grid>


            </CardContent>
        </Card>
    )
}

export default SubmissionManage