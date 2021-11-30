import { IComment, ICommentResponse, IHttpFormat } from "../interfaces";
import axiosClient from "./axios.client";


const commentApi = {
    createNewComment: (data: IComment) => {
        const url = `/v1/comment/`;
        return axiosClient.post<IHttpFormat<ICommentResponse>>(url, data);
    }
}

export default commentApi;