import { Avatar, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import { MoreVert, People, Send } from "@material-ui/icons";
import { EditorState, convertFromRaw } from "draft-js";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useSelector } from "react-redux";
import { IComment } from "../../interfaces";
import { IPostDetail } from "../../interfaces/post.interface";
import { AppState } from "../../reducers";
import { sameDay } from "../../utils/converter";
import { ReferenceType } from "../../constants";
import "./index.scss";


interface Props {
    post: IPostDetail,
    clickCreateComment: (data: IComment, id: number) => void,
}

const Post = (props: Props) => {
    const { post, clickCreateComment } = props;
    const [comment, setComment] = useState<string>("");


    const getDateFormat = (date: Date) => {
        const newDate = new Date(date);
        if (sameDay(newDate, new Date())) {
            return `${newDate.getHours()}: ${newDate.getMinutes()}`
        }
        return `${newDate.getDay()} thg ${newDate.getMonth()}`;
    }

    const handleSubmitComment = () => {
        if (!comment) return;

        clickCreateComment({
            refType: ReferenceType.FEED,
            refId: post.id,
            content: comment
        }, post.id)
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
                className="post-main___header"
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
                        <Typography component="div"> {post && post.commentList.length === 0 ? post.commentList.length : 0} nhận xét về lớp học</Typography>
                    </Grid>
                </Grid>

            </Button>
            <CardContent style={{ width: "100%", marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                {
                    post && post.commentList.length !== 0 && post.commentList.map((comment, index) => (
                        <Grid key={`comment-feed-${index}`} container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar alt="Remy Sharp" src={comment.user.avatarUrl ? comment.user.avatarUrl : "/none-avt.png"} />

                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left", marginBottom: "-0.8rem" }}>{`${comment.user.firstName} ${comment.user.lastName}`} &nbsp;&nbsp; <span style={{ textAlign: "left", opacity: "0.6", fontWeight: "normal", marginTop: "-0.1rem" }}>
                                    {getDateFormat(comment.createdAt)}
                                </span></h4>


                                <p style={{ textAlign: "left" }}>
                                    {comment.content}
                                </p>

                            </Grid>
                        </Grid>
                    ))
                }

            </CardContent>
            <Divider />
            <CardHeader
                avatar={
                    <Avatar src={post.user.avatarUrl ? post.user.avatarUrl : "/none-avt.png"} aria-label="recipe" alt="avt-post">
                        R
                    </Avatar>
                }
                action={
                    <IconButton onClick={handleSubmitComment}>
                        <Send />
                    </IconButton>
                }
                title={
                    <TextField
                        fullWidth
                        label="Bình luận về chủ đề"
                        placeholder="Thêm nhận xét cho lớp học"
                        value={comment}
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                    />
                }
            >
            </CardHeader>

        </Card>
    )
}

export default Post;