import { Popper, MenuItem, Button, Card } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { ReactNode, useEffect, useState } from 'react';

const GradingOption = (props: any) => {
    const {
        onDownloadStudentListTemplate,
        onUploadStudentList,
        onDownLoadGradeBoard,
    } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClick = (e: any) => {
        setOpen(!open);
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClickDownloadStudentListTemplate = () => {
        onDownloadStudentListTemplate();
        handleClose();
    };

    const onClickUploadStudentListTemplate = () => {
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute(
            'accept',
            '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
        );
        input.onchange = (e: any) => {
            const file: any = e.target?.files[0];
            if (!file) return;
            onUploadStudentList(file);
        };
        input.click();
        input.remove();

        handleClose();
    };


    const onClickDownLoadGradeBoard = () => {
        onDownLoadGradeBoard();
        handleClose();
    };
    return (
        <>
            <Button
                aria-label="more"
                variant="contained"
                color="primary"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}>
                Tùy chọn

            </Button>
            <Popper
                open={open}
                anchorEl={anchorEl}
                role={undefined}
                placement="bottom-end"
                disablePortal
                style={{ zIndex: 9999 }}
            >
                <Card>
                    <MenuItem onClick={onClickDownloadStudentListTemplate}>
                        Tải Template danh sách học sinh
                    </MenuItem>
                    <MenuItem onClick={onClickUploadStudentListTemplate}>
                        Upload danh sách học sinh
                    </MenuItem>
                    <MenuItem onClick={onClickDownLoadGradeBoard}>
                        Tải về bảng điểm
                    </MenuItem>
                </Card>
            </Popper>
        </>
    )
}

export default GradingOption;
