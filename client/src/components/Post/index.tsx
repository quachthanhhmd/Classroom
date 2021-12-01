import { Avatar, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import { MoreVert, People, Send } from "@material-ui/icons";
import { EditorState, convertFromRaw } from "draft-js";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useSelector } from "react-redux";
import { IComment } from "../../interfaces";
import { IPostDetail } from "../../interfaces/post.interface";
import { AppState } from "../../reducers";
import { getDateFormat, sameDay } from "../../utils/converter";
import Comment from "../Comment";
import { ReferenceType } from "../../constants";
import "./index.scss";


interface Props {
    post: IPostDetail,
    clickCreateComment: (data: IComment, id: number) => void,
}

const Post = (props: Props) => {
    const { post, clickCreateComment } = props;
    const [comment, setComment] = useState<string>("");
    const [isShowAll, setIsShowAll] = useState<boolean>(false);

    const auth = useSelector((state: AppState) => state.auth);



    const handleSubmitComment = () => {
        if (!comment) return;

        clickCreateComment({
            refType: ReferenceType.FEED,
            refId: post.id,
            content: comment
        }, post.id)

        setComment("");
    }
    const handleShowAllComment = () => {
        setIsShowAll(!isShowAll);
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
            <Button style={{ textTransform: "none", marginLeft: "1rem", marginTop: "1rem" }} onClick={handleShowAllComment}>
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <People style={{ marginRight: "1rem" }} />
                    </Grid>
                    <Grid item>
                        <Typography component="div"> {post.commentList.length !== 0 ? post.commentList.length : 0} nhận xét về lớp học</Typography>
                    </Grid>
                </Grid>

            </Button>
            <CardContent style={{ width: "100%", marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                {!isShowAll ?
                    <>
                        {
                            post && post.commentList.length !== 0 && <Comment comment={post.commentList[post.commentList.length - 1]} index={1} />
                        }
                    </>
                    :
                    <>
                        {

                            post && post.commentList.length !== 0 && post.commentList.map((comment, index) => (
                                <Comment comment={comment} index={index + 1} />
                            ))

                        }
                    </>
                }
            </CardContent>
            <Divider />
            <CardHeader
                avatar={
                    <Avatar src={auth && auth.user?.avatarUrl ? auth.user.avatarUrl : "/none-avt.png"} aria-label="recipe" alt="avt-post">
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

        </Card >
    )
}

export default Post;