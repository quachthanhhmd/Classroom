
import { showErrorNotify, showSuccessNotify } from "../../actions/notification.action";
import attachmentApi from "../../api/attachment.api";
import { uploadBulk } from "../../configs/firebase";
import { FolderName } from "../../constants";
import { IAttachmentResponse, ICreateAttachment } from "../../interfaces";

export enum fileState {
    DELETE = "deleted",
    SPENDING = "spending",
    SUBMITTED = "submitted"
}

export interface IFileState {
    file: File,
    type: fileState,
    id: number
}

export enum typeApi {
    SUCCESS = "success",
    FAILURE = "failure"
}

export const notifyAttachment = (type: string, message: string) => {

    switch (type) {
        case "success":
            return showSuccessNotify(message);
        case "failure":
            return showErrorNotify(message);
        default: {
            return showErrorNotify(message);
        }
    }
}

export const convertAttachToFile = (attachment: IAttachmentResponse) => {
    return {
        type: fileState.SUBMITTED,
        file: new File([], attachment.name),
        id: attachment.id
    }
}

export const deleteAttachment = async (courseId: number, fileList: IFileState[]): Promise<null | IFileState[]> => {

    const deleteList = fileList.filter((file) => file.type === fileState.DELETE && file.id !== -1).map((file) => {
        return {
            id: file.id
        }
    })
    if (deleteList.length === 0) return null;

    try {
        const res = await attachmentApi.deleteBulkAttachment(courseId, { attachmentList: deleteList });
        if (!res || res.status !== 200) return null;

        return fileList.filter((file) => file.type !== fileState.DELETE)
    } catch (err) {

    }
    return null;
}



export const uploadBulkAttachment = async (courseId: number, fileList: IFileState[], createBulkAttachment: (data: ICreateAttachment[]) => void) => {

    const createList = fileList.filter((file) => file.type === fileState.SPENDING && file.id === -1).map((file) => file.file);

    if (createList.length === 0) return false;

    try {
        await uploadBulk(FolderName.EXERCISE, createList, createBulkAttachment);
        return true;
    } catch (err) {

    }
    return false;
}