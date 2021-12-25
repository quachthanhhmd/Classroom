import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

interface IProps {
    isOpen: boolean;
    setIsOpen: () => void;
    content: string,
    uri: string,
    title: string
}

const useStyles = makeStyles({
    topScrollPaper: {
        alignItems: 'flex-start',
    },
    topPaperScrollBody: {
        verticalAlign: 'top',
    },
});




const AlertBox = (props: IProps) => {
    const {
        isOpen,
        setIsOpen,
        content,
        uri,
        title
    } = props;
    const classes = useStyles();

    const handleClick = () => {
        setIsOpen();
        if (uri !== "")
            window.location.href = uri;
    }

    return (
        <Dialog
            open={isOpen}
            onClose={setIsOpen}
            classes={{
                scrollPaper: classes.topScrollPaper,
                paperScrollBody: classes.topPaperScrollBody,
            }}
            keepMounted
            disableBackdropClick
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClick}
                >
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    )
}


export default AlertBox;