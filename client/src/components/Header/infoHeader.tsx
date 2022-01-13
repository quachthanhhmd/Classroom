import { Avatar, Badge, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserData, signOut, updateNotifyState } from "../../actions";
import notificationApi from "../../api/notification.api";
import { INotification } from '../../interfaces';
import { AppState } from '../../reducers';
import { getDateFormat } from '../../utils/converter';
import Profile from "../Profile";
import env from "../../configs/env";
import { Socket } from "../../configs/websocket";
import "./index.scss";

const TYPE_MODAL_COURSE = "TYPE_MODAL_COURSE";
const TYPE_MODAL_INFO = "TYPE_MODE_INFO";
const TYPE_MODAL_NOTIFY = "TYPE_MODAL_NOTIFY";


const NotifyItem = (props: { notify: INotification, updateNotification: (id: number, uri: string) => void }) => {

    const { notify, updateNotification } = props;

    const handleUpdate = (id: number, uri: string) => {

        updateNotification(id, uri);

    }


    return (
        <div className={`notification ${notify.isRead ? " notify-read" : ""}`} style={{ height: "4.5rem" }} onClick={() => handleUpdate(notify.id, notify.uri)} >
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
    const [notifyList, setNotifyList] = useState<INotification[]>([]);
    const OneSignal = window['OneSignal'] || [];
    // useEffect(() => {
    //   OneSignal.push(()=> {
    //     OneSignal.init(
    //       {
    //         appId: "fbbfe69e-c4dc-43ee-b28f-2296d7071f98", //STEP 9
    //         promptOptions: {
    //           slidedown: {
    //             enabled: true,
    //             actionMessage: "We'd like to show you notifications for the latest news and updates about the following categories.",
    //             acceptButtonText: "OMG YEEEEESS!",
    //             cancelButtonText: "NAHHH",
    //             categories: {
    //                 tags: [
    //                     {
    //                         tag: "react",
    //                         label: "ReactJS",
    //                     },
    //                     {
    //                       tag: "angular",
    //                       label: "Angular",
    //                     },
    //                     {
    //                       tag: "vue",
    //                       label: "VueJS",
    //                     },
    //                     {
    //                       tag: "js",
    //                       label: "JavaScript",
    //                     }
    //                 ]
    //             }     
    //         } 
    //       },
    //       welcomeNotification: {
    //         "title": "One Signal",
    //         "message": "Thanks for subscribing!",
    //       } 
    //     },
    //       /**Automatically subscribe to the new_app_version tag */
    //       OneSignal.sendTag("new_app_version", "new_app_version", tagsSent => {
    //         // Callback called when tag has finished sending
    //         console.log('new_app_version TAG SENT', tagsSent);
    //       })
    //     );
    //   });
    // }, []);

    useEffect(() => {
        if (auth.user) {
            Socket.emit("update-user-id", auth.user?.id || -1);
        }
    }, [auth.user])
    useEffect(() => {
        Socket.on('notify-send-one-user', (data) => {
            //Socket.onmessage = (event) => {
            const notify: INotification = data;
            const newList = [...notifyList];

            setNotifyList([notify, ...newList]);

            //}
        })
        // return () => {
        //     Socket.disconnected = () => {
        //         console.log('WebSocket Disconnected');
        //     }
        // }
        return () => {
            Socket.off("notify-push")
        }
    }, [notifyList]);

    useEffect(() => {
        const getNotify = async () => {
            try {
                const res = await notificationApi.getNotificationUser();
                if (!res || res.status !== 200) throw new Error();
                console.log(res.data.payload);
                setNotifyList(res.data.payload);
            } catch (err) {

            }
        }
        if (auth.user) {
            getNotify();

        }
    }, [auth])

    const handleClick = (e: any, type: string) => {
        setAnchorEl(e.currentTarget);
        setTypeOpen(type);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

    const updateNotification = async (id: number, uri: string) => {

        const updateState = async (notifyId: number) => {

            try {
                const res = await notificationApi.updateNotification(notifyId);

                if (!res || res.status !== 200) return;

                let uriChoose = "";
                const newNotifyList = [...notifyList].map((item) => {
                    if (item.id === notifyId) {
                        item.isRead = true;
                        uriChoose = item.uri;
                    }
                    return item;
                })
                setNotifyList(newNotifyList);
                // const notify = notifyList.filter(notify => notify.id === notifyId);

                if (uriChoose !== "")
                    history.push(uriChoose)
            } catch (err) {

            }
        }
        if (id !== 0) {
            await updateState(id);
        } else {
            history.push(uri);
        }

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
    //console.log(notifyList);
    return (
        <div className="info-header">
            <Profile isOpenModal={typeOpen === TYPE_MODAL_INFO && isOpenModal} setIsOpenModal={handleCloseModal} />
            <div className="header-main___right--calendar">
                <IconButton
                    style={{
                        color: "#ffffff"
                    }}
                >
                    <Badge badgeContent={notifyList.filter((notify, index) => !notify.isRead).length} color="error">
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
                        // getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        open={Boolean(typeOpen === TYPE_MODAL_NOTIFY && isOpenModal === false && anchorEl != null)}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            auth && notifyList && notifyList.length > 0 ?
                                <>
                                    {
                                        notifyList.map((notify, index) => (
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