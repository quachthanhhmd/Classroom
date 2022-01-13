import { Avatar, Card, CardHeader, IconButton, CardContent } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React from "react";
import { ReferenceType } from "../../constants";
import { IComment } from "../../interfaces";
import { IPostDetail } from "../../interfaces/post.interface";
import { getDateFormat } from "../../utils/converter";
import ContentPost from "./ContentPost";
import "./index.scss";


interface Props {
    post: IPostDetail,// | IExerciseThumbnail,
    clickCreateComment: (data: IComment, id: number) => void,

}

const Post = (props: Props) => {
    const { post, clickCreateComment } = props;
    const handleCreateComment = (content: string, id: number) => {
        clickCreateComment({
            content,
            refId: post.id,
            refType: ReferenceType.FEED,
        }, id)
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
        
                <ContentPost commentList={post.commentList} content={post.content} clickCreateComment={handleCreateComment} />
        

        </Card >
    )
}

export default Post;