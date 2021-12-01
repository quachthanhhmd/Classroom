import {
    AppBar, Box, Button, Card, CardContent,
    Dialog, DialogContent, Divider, FormControl,
    Grid, IconButton, InputLabel, NativeSelect,
    TextField, Toolbar, Typography, CardHeader
} from '@material-ui/core';
import { Close } from "@material-ui/icons";
import { EditorState } from "draft-js";
import React, { useState } from 'react';
import RichText from '../RichText';
import "./index.scss";



interface IPropsType {
    open: boolean;
    handleClose: () => void;
    clickCreate: () => void;
}

const AddExercise = (props: IPropsType) => {
    const { open, handleClose, clickCreate } = props;

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const onClose = () => {

        handleClose();
    }

    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
            >
                {/* <DialogTitle id="form-dialog-title">Thêm bài tập mới</DialogTitle> */}
                <AppBar style={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <Close />
                        </IconButton>
                        <Typography style={{ marginLeft: 2, flex: 1 }} variant="h5" component="div">
                            Thêm bài tập mới
                        </Typography>
                        <Button style={{ marginRight: "1.5rem" }} autoFocus color="inherit" onClick={onClose}>
                            Giao bài
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Grid container spacing={2} style={{ padding: "1.5rem" }}>
                        <Grid item xs={8}>
                            <Card style={{ padding: "1rem" }}>
                                <CardHeader
                                    title="Nội dung"
                                    style={{fontWeight: "bold"}}
                                />
                                <TextField
                                    fullWidth
                                    label="Tiêu đề"
                                />
                                <Card style={{ marginTop: "1rem" }} >
                                    <CardContent
                                        style={{ fontSize: "1rem" }}
                                    >
                                        Hướng dẫn (không bắt buộc)
                                    </CardContent>
                                    <div className="exercise___rich-text">
                                        <RichText content={editorState} setContent={setEditorState} />
                                    </div>
                                </Card>
                            </Card>
                        </Grid>
                        <Grid item xs={3} style={{ marginLeft: "2.5rem" }}>
                            <Card style={{ padding: "1rem" }}>
                                <CardHeader
                                    title="Tùy chỉnh"
                                />
                                <Box sx={{ minWidth: 120 }} className="exercise___option">
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Chủ đề
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={30}
                                            inputProps={{
                                                name: 'topic',
                                                id: 'uncontrolled-native-topic',
                                            }}
                                        >
                                            <option value={10}>Ten</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                                <Divider />
                                <Box sx={{ minWidth: 120 }} className="exercise___option">
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native-grade-structure">
                                            Phân loại
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={30}
                                            inputProps={{
                                                name: 'topic',
                                                id: 'uncontrolled-native-grade-structure',
                                            }}
                                        >
                                            <option value={10}>Ten</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Box>

                                <Divider />
                                <Box sx={{ minWidth: 120 }} className="exercise___option">
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native-deadline">
                                            Hạn nộp
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={30}
                                            inputProps={{
                                                name: 'deadline',
                                                id: 'uncontrolled-native-deadline',
                                            }}
                                        >
                                            <option value={10}>Ten</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddExercise;