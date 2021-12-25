import { Avatar, CardHeader, IconButton, TextField } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import React, { useState } from 'react';

interface IProps {
    avatar?: string;
    onSubmitComment: (comment: string) => void;
}
const CreateComment = (props: IProps) => {
    const { avatar, onSubmitComment } = props;

    const [comment, setComment] = useState<string>("");

    const handleSubmitComment = () => {
        if (comment !== "") {
            onSubmitComment(comment);
            setComment("");
        }
    }
    return (
        <CardHeader
            avatar={
                <Avatar src={avatar || "/none-avt.png"} aria-label="recipe" alt="avt-post">
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
        />
    )
}

export default CreateComment;