import { Card, Grid, CardContent, CardHeader, Divider, Button, IconButton, Typography } from '@material-ui/core';
import { Add, MoreVert, Assignment } from '@material-ui/icons';
import React from 'react';



import "./index.scss";



const ButtonExam = () => {

    return (
        <Button
            className="exercise-main___exam___button"
            fullWidth
        >

            <div className="exercise-main___exam___button--title">
                <Assignment className="exercise-main___exam___button--icon" style={{ fontSize: "2rem" }} />
                <span className="exercise-main___exam___button--display exercise-main___exam___button--name">Reactjs</span>
            </div>
            <div className="exercise-main___exam___button--info">
                <span className="exercise-main___exam___button--display exercise-main___exam___button--time" >10 thang 2</span>
                <IconButton  >
                    <MoreVert className="exercise-main___exam___button--icon" style={{ fontSize: "1.5rem" }} />
                </IconButton>
            </div>
        </Button>
    )
}


const Exercise = () => {
    return (
        <div className="exercise-main">
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Card className="exercise-main___topic">
                        <CardHeader
                            title="Chủ đề"
                        />
                        <Divider />
                        <CardContent>
                            <Button
                                fullWidth
                                style={{ textTransform: "none" }} >
                                Tất cả chủ đề
                            </Button>
                        </CardContent>

                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Card className="exercise-main___exam">
                        <CardHeader
                            title="Bài tập"
                            action={
                                <Button className="exercise-main___exam--create" variant="contained" startIcon={<Add />}>
                                    Tạo
                                </Button>
                            }
                        />
                        <Divider />
                        <CardContent>

                            <CardHeader
                                style={{ fontWeight: "bold", borderBottom: "1px solid", marginBottom: "0.2rem" }}
                                title="Reactjs"
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVert />
                                    </IconButton>
                                }
                            />
                            <ButtonExam />

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div >
    )
}

export default Exercise;