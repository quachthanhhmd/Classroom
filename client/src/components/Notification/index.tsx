import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotify } from '../../actions/notification.action';
import { AppState } from "../../reducers";

const Notification = () => {

    const dispatch = useDispatch();
    const { open, message, state } = useSelector((state: AppState) => state.notify);


    const handleClose = (event: any, reason: any) => {
        if (reason === "clickaway") return;

        dispatch(closeNotify());
    };

    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={3000}
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

export default Notification;