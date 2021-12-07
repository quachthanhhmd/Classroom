import { Button, Card, CardContent, Grid, Checkbox, IconButton, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Divider, Avatar } from '@material-ui/core';
import { EmailSharp, Settings, People, Search } from '@material-ui/icons'
import React, { useState } from 'react';

import "./index.scss";

const studentList = [
    {
        avatarUrl: "/none-avt.png",
        firstName: "Thanh",
        lastName: "Hai",
        score: 10,
    },
    {
        avatarUrl: "/none-avt.png",
        firstName: "Thanh",
        lastName: "Hai",
        score: 10,
    },
    {
        avatarUrl: "/none-avt.png",
        firstName: "Thanh",
        lastName: "Hai",
        score: 10,
    },
    {
        avatarUrl: "/none-avt.png",
        firstName: "Thanh",
        lastName: "Hai",
        score: 10,
    },
    {
        avatarUrl: "/none-avt.png",
        firstName: "Thanh",
        lastName: "Hai",
        score: 10,
    },
    {
        avatarUrl: "/none-avt.png",
        firstName: "Thanh",
        lastName: "Hai",
        score: 10,
    },
    {
        avatarUrl: "/none-avt.png",
        firstName: "Thanh",
        lastName: "Hai",
        score: 10,
    }, {
        avatarUrl: "/none-avt.png",
        firstName: "Thanh",
        lastName: "Hai",
        score: 10,
    },
    {
        avatarUrl: "/none-avt.png",
        firstName: "Thanh",
        lastName: "Hai",
        score: 10,
    },
    {
        avatarUrl: "/none-avt.png",
        firstName: "Thanh",
        lastName: "Hai",
        score: 10,
    },
    {
        avatarUrl: "/none-avt.png",
        firstName: "Thanh",
        lastName: "Hai",
        score: 10,
    },
    {
        avatarUrl: "/none-avt.png",
        firstName: "Thanh",
        lastName: "Hai",
        score: 10,
    },

]

const SubmissionManage = () => {

    const [sortType, setSortType] = useState<number>(3);


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
                                    onChange={(e) => setSortType(Number(e.target.value))}
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
                            <Checkbox />
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
                                        <Checkbox />
                                        <Button
                                            fullWidth
                                            startIcon={
                                                <Avatar src={student.avatarUrl} style={{ fontSize: "1.1rem" }} />
                                            }
                                        >

                                            Tất cả học viên
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>

                    </Grid>
                    <Grid item xs={8}>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default SubmissionManage