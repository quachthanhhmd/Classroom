import { Card, CardHeader, Avatar, IconButton, CardContent, Typography, Button, CardActions, TextField, Grid, Divider } from "@material-ui/core";
import { MoreVert, Favorite, Send, People } from "@material-ui/icons";
import React from "react";

import "./index.scss";

const Post = () => {

    return (
        <Card className="post-main">
            <CardHeader
                avatar={
                    <Avatar src="/none-avt.png" aria-label="recipe" alt="avt-post">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />

            <CardContent>
                <Typography variant="body2">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>

            {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Favorite />
                </IconButton>
            </CardActions> */}
            <Divider />
            <Button style={{ textTransform: "none", marginLeft: "1rem", marginTop: "1rem" }}>
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <People style={{ marginRight: "1rem" }} />
                    </Grid>
                    <Grid item>
                        <Typography component="div"> 1 nhận xét về lớp học</Typography>
                    </Grid>
                </Grid>

            </Button>
            <CardContent style={{ width: "100%" }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="Remy Sharp" src="/none-avt.png" />

                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel &nbsp;&nbsp; <span style={{ textAlign: "left", opacity: "0.6", fontWeight: "normal", marginTop: "-0.1rem" }}>
                            posted 1 minute ago
                        </span></h4>


                        <p style={{ textAlign: "left" }}>
                            Vân anh bị khùng.{" "}
                        </p>

                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <CardHeader
                avatar={
                    <Avatar src="/none-avt.png" aria-label="recipe" alt="avt-post">
                        R
                    </Avatar>
                }
                action={
                    <IconButton>
                        <Send />
                    </IconButton>
                }
                title={
                    <TextField
                        fullWidth
                        label="Bình luận về chủ đề"
                        placeholder="Thêm nhận xét cho lớp học"
                    />
                }
            >
            </CardHeader>

        </Card>
    )
}

export default Post;