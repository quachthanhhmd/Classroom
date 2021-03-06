import { Card, IconButton, Menu, MenuItem, Popper } from "@material-ui/core";
import { MoreVert } from '@material-ui/icons';
import * as React from 'react';



interface Props {
    id: string;
    pointStructure: any;
    onExportPointGrading: (pointStructure: any) => void;
    onToggleFinalizePoint: (pointStructure: any, state: string) => void;
    onUploadExerciseGrade: (file: any, exerciseId: number) => void;
}

const PointStructureColOption: React.FC<Props> = (props) => {
    const { id, pointStructure, onExportPointGrading, onToggleFinalizePoint, onUploadExerciseGrade } =
        props;

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<any>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: any) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const exportPointGrading = (e: any) => {
        onExportPointGrading(pointStructure.id);
        handleClose(e);
    };
    const importPointGrading = (e: any) => {
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute(
            'accept',
            '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
        );
        input.onchange = (e: any) => {
            const file: any = e.target?.files[0];
            if (!file) return;
            onUploadExerciseGrade(file, pointStructure.id);
        };
        input.click();
        input.remove();

        handleClose(e);
    }

    const toggleFinalizePoint = (e: any, state: string) => {
        onToggleFinalizePoint(pointStructure.id, state);
        handleClose(e);
    };

    return (
        <>
            <div>

                <IconButton
                    ref={anchorRef}
                    aria-label="more"
                    id={id}
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <MoreVert />
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-end"
                    disablePortal
                >
                    <Card>
                        <MenuItem onClick={importPointGrading}>
                            Nh???p ??i???m
                        </MenuItem>
                        <MenuItem onClick={exportPointGrading}>
                            Xu???t ??i???m
                        </MenuItem>
                        <MenuItem onClick={(e) => toggleFinalizePoint(e, pointStructure.state)}>
                            {pointStructure.state === "completed" ? 'H???y ho??n th??nh' : 'Ho??n th??nh'}
                        </MenuItem>
                    </Card>
                </Popper>
            </div>
        </>
    );
};

export default PointStructureColOption;
