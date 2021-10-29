import {
    Button, Card, CardContent, CardHeader, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper
} from "@material-ui/core";
import {
    CropFree, FileCopy, MoreHoriz, MoreVert
} from "@material-ui/icons";
import { EditorState } from "draft-js";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link } from "react-router-dom";
import "./index.scss";

const deadlineList = [
    {
        id: "ahasdjk",
        deadline: "5/10",
        content: "22:00 - BTCN03 - Chức năng tạo và đăng ký"
    },
    {
        id: "ahaasdjk",
        deadline: "5/10",
        content: "22:00 - BTCN03 - Chức năng tạo và đăng ký"
    },
    {
        id: "ahaas2djk",
        deadline: "5/10",
        content: "22:00 - BTCN03 - Chức năng tạo và đăng ký"
    },
    {
        id: "ahaas1djk",
        deadline: "5/10",
        content: "22:00 - BTCN03 - Chức năng tạo và đăng ký"
    }
]

const Feed = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const [isShowInfor, setIsShowInfor] = useState(false);
    const [isShowShareCode, setIsShowShareCode] = useState(false);
    const [isWriteStatus, setIsWriteStatus] = useState(false);

    const handleClose = () =>
        isShowInfor && setIsShowInfor(false);

    const handleCloseCode = () =>
        isShowShareCode && setIsShowShareCode(false);


    return (
        <>
            <Dialog
                fullWidth
                keepMounted
                open={isShowShareCode}
                onClose={handleCloseCode}
                maxWidth={"md"} >

                <DialogTitle>Mã Lớp Học</DialogTitle>
                <DialogContent>
                    <div className="feed-main___body___show-code___modal">
                        <div className="feed-main___body___show-code___modal--code">
                            ripgco6
                        </div>
                        <div className="feed-main___body___show-code___modal--copy">
                            <div className="feed-main___body___show-code___modal--copy--course-name">
                                Lap trinh ung dung web
                            </div>
                            <div className="feed-main___body___show-code___modal--copy--copy-code">

                                <IconButton style={{ borderRadius: "0%" }} onClick={() => navigator.clipboard.writeText('ripgco6')}>
                                    <FileCopy />
                                    <span>
                                        Sao chép đường liên kết
                                    </span>
                                </IconButton>
                            </div>
                        </div>
                    </div>

                </DialogContent>
            </Dialog>

            <Dialog

                keepMounted
                open={isShowInfor}
                onClose={handleClose}>
                <DialogTitle>Thông tin về lớp học</DialogTitle>
                <DialogContent>
                    <div className="feed-main___show-infor___modal-detail">
                        <span className="feed-main___show-infor___modal-detail--title">Mã Lớp: </span>
                        <span className="feed-main___show-infor___modal-detail--info">Reactjs </span>
                        <IconButton onClick={() => {
                            handleClose();
                            setIsShowShareCode(true);
                        }}>
                            <CropFree />
                        </IconButton>
                    </div>
                    <div className="feed-main___show-infor___modal-detail">
                        <span className="feed-main___show-infor___modal-detail--title">Chủ đề: </span>
                        <span className="feed-main___show-infor___modal-detail--info">Reactjs </span>
                    </div>
                    <div className="feed-main___show-infor___modal-detail">
                        <span className="feed-main___show-infor___modal-detail--title">Phòng: </span>
                        <span className="feed-main___show-infor___modal-detail--info">30 </span>
                    </div>
                    <div className="feed-main___show-infor___modal-detail">
                        <span className="feed-main___show-infor___modal-detail--title">Số lượng sinh viên: </span>
                        <span className="feed-main___show-infor___modal-detail--info">99 </span>
                    </div>
                    <div className="feed-main___show-infor___modal-detail">
                        <span className="feed-main___show-infor___modal-detail--title">Số lượng sinh viên hiện tại: </span>
                        <span className="feed-main___show-infor___modal-detail--info">100 </span>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
            <div className="feed-main">
                <Paper elevation={4} className={`container-info feed-main___background${" feed-main___background--has-image"}`} style={{ backgroundImage: `url("/background-course.jpg")` }} >
                    <div className="feed-main___background___course-name">
                        <h1>LTUUW nang cao</h1>
                        <div>CQ_18-3</div>
                    </div>
                    <div className="feed-main___background___more-infor">
                        <IconButton onClick={(e) => setIsShowInfor(!isShowInfor)}>
                            <MoreHoriz style={{ fontSize: "2rem", color: "white" }} />
                        </IconButton>
                    </div>
                </Paper>

                <Container className="feed-main___body">
                    <div className="feed-main___body___left">
                        <Card className="feed-main___body___left--course-code">
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVert />
                                    </IconButton>
                                }
                                title={<p className="feed-main___body___left--card-header">Mã lớp</p>}
                            />
                            <CardContent className="feed-main___body___left--course-code___content">
                                <span className="feed-main___body___left--course-code___content--code">Hajahd </span>
                                <IconButton style={{ marginTop: "-0.5rem" }} onClick={() => {
                                    handleClose();
                                    setIsShowShareCode(true);
                                }}>
                                    <CropFree />
                                </IconButton>
                            </CardContent>
                        </Card>

                        <Card className="feed-main___body___left--deadline" style={{ fontSize: "1rem" }}>
                            <CardHeader
                                title={<p className="feed-main___body___left--card-header">Sắp hết hạn</p>}
                            >

                            </CardHeader>
                            <CardContent className="feed-main___body___left--deadline___content">
                                {
                                    deadlineList.map(exam => (
                                        <div className="feed-main___body___left--deadline___content--item">
                                            <div className="feed-main___body___left--deadline___content--item___time">
                                                Đến hạn {exam.deadline}
                                            </div>
                                            <div className="feed-main___body___left--deadline___content--item___link">
                                                <Link to={`/${exam.id}`} className="feed-main___body___left--deadline___content--item___link--name overflow-text">
                                                    {exam.content}
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </CardContent>
                        </Card>
                    </div>
                    <div className="feed-main___body___right">

                        <Card className="feed-main___body___right--write-status">
                            {
                                isWriteStatus ?
                                    <CardContent className="feed-main___body___right--write-status___expand">
                                        <div className="feed-main___body___right--write-status___expand--rich-text">
                                            <Editor
                                                editorState={editorState}
                                                onEditorStateChange={setEditorState}
                                                editorClassName="editor-class"
                                                toolbarClassName="toolbar-class"
                                            />
                                        </div>
                                        <div className="feed-main___body___right--write-status___expand--submit">
                                            <Button

                                                onClick={(e) => setIsWriteStatus(false)}
                                            >
                                                Hủy
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={(e) => setIsWriteStatus(false)}
                                            >Đăng Bài</Button>
                                        </div>
                                    </CardContent>
                                    :
                                    <CardContent className="feed-main___body___right--write-status___brief">
                                        <Button
                                            fullWidth
                                            onClick={() => setIsWriteStatus(true)}>
                                            <div className="feed-main___body___right--write-status___brief--avt" >
                                                <img src="/none-avt.png" alt="avatar" />
                                            </div>
                                            <div className="feed-main___body___right--write-status___brief--content" >
                                                Thông báo nội dung nào đó cho lớp học của bạn
                                            </div>
                                        </Button>
                                    </CardContent>
                            }


                        </Card>

                        {/* <Card className="feed-main___body___right--exam">
                            <CardContent>

                            </CardContent>
                        </Card> */}
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Feed;