import React from "react";
import { IComment, ICommentResponse } from "../../interfaces";
import { Grid, Avatar } from "@material-ui/core";
import { getDateFormat } from "../../utils/converter";


interface IPropsType {
    comment: ICommentResponse;
    index: number;
}

const Comment = (props: IPropsType) => {
    const { comment, index } = props;

    return (
        <Grid key={`comment-feed-${index}`} container wrap="nowrap" spacing={2}>
            <Grid item>
                <Avatar alt="Remy Sharp" src={comment.user.avatarUrl ? comment.user.avatarUrl : "/none-avt.png"} />

            </Grid>
            <Grid item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left", marginBottom: "-0.8rem" }}>{`${comment.user.firstName} ${comment.user.lastName}`} &nbsp; <span style={{ textAlign: "left", opacity: "0.6", fontWeight: "normal", marginTop: "-0.1rem" }}>
                    {getDateFormat(comment.createdAt)}
                </span></h4>


                <p style={{ textAlign: "left" }}>
                    {comment.content}
                </p>

            </Grid>
        </Grid>
    )
}

export default Comment;