import { Avatar, Button, CardContent, CardHeader, Divider, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import { People, Send } from "@material-ui/icons";
import { convertFromRaw, EditorState } from "draft-js";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useSelector } from "react-redux";
import { ICommentResponse } from "../../interfaces";
import { AppState } from "../../reducers";
import Comment from "../Comment";
import CreateComment from "../Comment/CreateComment";


interface IProps {
    commentList: ICommentResponse[],
    content: string,
    isHiddenComment?: boolean,
    clickCreateComment: (comment: string, id: number) => void,
}

const ContentPost = (props: IProps) => {
    const { commentList, content, isHiddenComment = false, clickCreateComment } = props

    const auth = useSelector((state: AppState) => state.auth);

    const [isShowAll, setIsShowAll] = useState<boolean>(isHiddenComment);


    const handleSubmitComment = (comment: string) => {
        if (!comment) return;

        clickCreateComment(comment, auth.user!.id);

    }


    return (
        <>
            <div className="post-main___content">
                {content &&
                    <Editor readOnly={true}
                        toolbarClassName='hide-toolbar'
                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(content ? content : "")))}
                        toolbar={{
                            options: []
                        }} />
                }
            </div>



            {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Favorite />
                </IconButton>
            </CardActions> */}
            <Divider style={{ marginTop: "1.5rem" }} />

            <Button style={{ textTransform: "none", marginLeft: "1rem", marginTop: "1rem" }} onClick={() => setIsShowAll(!isShowAll)}>
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <People style={{ marginRight: "1rem" }} />
                    </Grid>
                    <Grid item>
                        <Typography component="div"> {commentList.length !== 0 ? commentList.length : 0} nhận xét về lớp học</Typography>
                    </Grid>
                </Grid>
            </Button>

            <CardContent style={{ width: "100%", marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                {!isShowAll ?
                    <>
                        {
                            commentList.length !== 0 && <Comment comment={commentList[commentList.length - 1]} index={1} />
                        }
                    </>
                    :
                    <>
                        {

                            commentList.length !== 0 && commentList.map((comment, index) => (
                                <Comment comment={comment} index={index + 1} />
                            ))

                        }
                    </>
                }
            </CardContent>
            <Divider />
            <CreateComment avatar={auth.user?.avatarUrl} onSubmitComment={handleSubmitComment} />
         
        </>
    )
}

export default ContentPost;