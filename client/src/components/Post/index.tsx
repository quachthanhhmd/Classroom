import { Avatar, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import { MoreVert, People, Send } from "@material-ui/icons";
import { EditorState, convertFromRaw } from "draft-js";
import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { IPostDetail } from "../../interfaces/post.interface";
import { sameDay } from "../../utils/converter";
import "./index.scss";


const Post = (props: { post: IPostDetail }) => {
    const { post } = props;

    const getDateFormat = (date: Date) => {
        const newDate = new Date(date);
        if (sameDay(newDate, new Date())) {
            return `${newDate.getHours()}: ${newDate.getMinutes()}`
        }
        return `${newDate.getDay()} thg ${newDate.getMonth()}`;
    }
    return (
        <Card className="post-main">
            <CardHeader
                avatar={
                    <Avatar src={post.user.avatarUrl ? post.user.avatarUrl : "/none-avt.png"} aria-label="recipe" alt="avt-post">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={`${post.user.firstName} ${post.user.lastName}`}
                subheader={getDateFormat(post.createdAt)}
            />


            <div className="post-main___content">
                <Editor readOnly={true}
                    toolbarClassName='hide-toolbar'
                    editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)))}
                    toolbar={{
                        options: []
                    }} />
            </div>



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