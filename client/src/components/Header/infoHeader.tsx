import { Avatar, Badge, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserData, signOut, updateNotifyState } from "../../actions";
import notificationApi from "../../api/notification.api";
import { INotification } from '../../interfaces';
import { AppState } from '../../reducers';
import { getDateFormat } from '../../utils/converter';
import Profile from "../Profile";

const TYPE_MODAL_COURSE = "TYPE_MODAL_COURSE";
const TYPE_MODAL_INFO = "TYPE_MODE_INFO";
const TYPE_MODAL_NOTIFY = "TYPE_MODAL_NOTIFY";


const NotifyItem = (props: { notify: INotification, updateNotification: (id: number) => void }) => {

    const { notify, updateNotification } = props;

    const handleUpdate = (id: number) => {

        updateNotification(id);

    }


    return (
        <div className="notification" style={{ height: "4.5rem" }} onClick={() => handleUpdate(notify.id)}>
            <div className="notification___avatar">
                <Avatar src={notify.info.avatarUrl ? notify.info.avatarUrl : "/none-avt.png"} style={{ width: "4rem", height: "4rem" }} />
            </div>
            <div className="notification___content">
                <div className="notification___content--title">
                    {notify.info.name}
                </div>
                <div className="notification___content--description">
                    {notify.content}

                </div>
            </div>
            <div className="notification___action">
                {getDateFormat(notify.createdAt)}
            </div>
        </div>
    )
}

const InfoHeader = () => {
    const auth = useSelector((state: AppState) => state!.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const [typeOpen, setTypeOpen] = useState<string>("");
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const handleClick = (e: any, type: string) => {
        setAnchorEl(e.currentTarget);
        setTypeOpen(type);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const updateNotification = async (id: number) => {

        const updateState = async (notifyId: number) => {

            try {
                const res = await notificationApi.updateNotification(notifyId);

                if (!res || res.status !== 200) return;

                dispatch(updateNotifyState(notifyId));
                const notify = auth.user?.notifyList.filter(notify => notify.id === notifyId);

                if (notify && notify.length > 0)
                    history.push(notify[0].uri)
            } catch (err) {

            }
        }
        await updateState(id);
    }

    const handleCloseModal = (openModal: boolean) => {
        setTypeOpen("");
        setIsOpenModal(false);
    }


    useEffect(() => {
        if (!auth.user) {
            dispatch(getUserData())
        }
    }, [])

    const handleLogout = async () => {
        await dispatch(signOut());
        window.location.href = "/";
    }

    return (
        <div className="info-header">
            <Profile isOpenModal={typeOpen === TYPE_MODAL_INFO && isOpenModal} setIsOpenModal={handleCloseModal} />
            <div className="header-main___right--calendar">
                <IconButton
                    style={{
                        color: "#ffffff"
                    }}
                >
                    <Badge badgeContent={!auth || !auth.user || !auth.user.notifyList || auth.user.notifyList.length === 0 ? 0 : auth.user.notifyList.filter((notify, index) => !notify.isRead).length} color="error">

                        <Notifications onClick={(e) => handleClick(e, TYPE_MODAL_NOTIFY)} />


                    </Badge>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        PaperProps={{
                            style: {
                                width: 400,
                            },
                        }}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        open={Boolean(typeOpen === TYPE_MODAL_NOTIFY && isOpenModal === false && anchorEl != null)}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            auth && auth.user && auth.user.notifyList && auth.user.notifyList.length !== 0 ?
                                <>
                                    {
                                        auth.user.notifyList.map((notify, index) => (
                                            <MenuItem key={`notify-item-${1}`} onClick={handleClose}><NotifyItem updateNotification={updateNotification} notify={notify} /></MenuItem>
                                        ))
                                    }
                                </>
                                :
                                <div className="notification___none">
                                    Bạn không có thông báo nào
                                </div>
                        }


                    </Menu>
                </IconButton>
            </div>
            <div className="header-main___right--avatar">
                <Button
                    aria-controls="info-menu"
                    aria-haspopup="true"
                    onClick={(e) => handleClick(e, TYPE_MODAL_INFO)}
                >
                    <img className="header-main___right--avatar___img" src={auth.user && auth.user.avatarUrl ? auth.user.avatarUrl : "/none-avt.png"} alt="avt" />
                </Button>

                <Menu
                    id="info-menu"
                    className="header-main___right--more-features___menu-info"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(typeOpen === TYPE_MODAL_INFO && isOpenModal === false && anchorEl != null)}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={() => {
                            setIsOpenModal(true);
                            handleClose();
                        }}
                    >
                        Thông tin cá nhân
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleLogout();
                            handleClose();
                        }}
                    >
                        Đăng xuất
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default InfoHeader;