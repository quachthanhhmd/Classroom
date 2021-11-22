import React, { useState, useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { deleteMessage } from '../../actions/manage.action';

interface IPropsType {
    message: string;
    open: boolean;
    setIsOpen: any;
    state:  'success' | 'info' | 'warning' | 'error';
}

const SnackBar = (props: IPropsType) => {
    const { message, open, setIsOpen, state } = props;
    const dispatch = useDispatch();


    const handleClose = () => {
        setIsOpen(false);
        dispatch(deleteMessage());
    }

    return (

        <Snackbar
            open={open}
            onClose={() => handleClose()}
            autoHideDuration={5000}
            ContentProps={{
                'aria-describedby': 'snackbar-message-id',
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <Alert severity={state}>
                {message}
            </Alert>
        </Snackbar>

    )
}

const SnackBarRender = (props: {message: string, isSuccess: boolean}) => {
    const {message, isSuccess} = props;

    const [isOpenBar, setIsOpenBar] = useState(true);
    const handleOpen = () => {
        setIsOpenBar(true);
    }

    const handleCloseBar = () => {
        setIsOpenBar(false);
    }

    return (

        <SnackBar open={isOpenBar} message={message} setIsOpen={handleCloseBar} state={isSuccess ? "success" : "error"} />

    )
}

export {
    SnackBar,
    SnackBarRender
};