import React from 'react';
import { Card, CardHeader, Divider, Button, IconButton, CardContent } from "@material-ui/core";
import { MoreVert, Assignment } from "@material-ui/icons";

import "./index.scss";
import { IExerciseThumbnail } from '../../interfaces';
import { getDateFormat } from '../../utils/converter';
import { useHistory, useParams } from "react-router";

interface IPropsType {
    feed: IExerciseThumbnail
}

const ThumbnailExercise = (props: IPropsType) => {
    const {courseId} = useParams<{courseId: string}>();
    const history = useHistory();

    const { feed } = props;

    const handleClick = () => {
        history.push(`/course/${courseId}/post/${feed.id}/details`)
    }

    return (
        <Card className="thumbnail-container">
            <Button
                fullWidth
                onClick={handleClick}
                style={{ textTransform: "none", textAlign: "left", display: "initial" }}
            >
                <CardHeader
                    avatar={

                        <Assignment style={{ fontSize: "2rem" }} />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVert />
                        </IconButton>
                    }
                    className="post-main___header"
                    title={`Hải Thanh đã đăng bài tập mới: ${feed.title}`}
                    subheader={`${getDateFormat(feed.createdAt)}`}
                />
                <Divider />
                <CardContent>
                    1 nhận xét về lớp học
                </CardContent>
            </Button>

        </Card>
    )
}

export default ThumbnailExercise;