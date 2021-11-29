import { IHttpFormat } from "../interfaces";
import { IPostDetail } from "../interfaces/post.interface";
import axiosClient from "./axios.client";


const postApi = {
    postNew: (courseId: number, data: { content: string }) => {
        const url = `/v1/feed/course/${courseId}`;
        return axiosClient.post<IHttpFormat<IPostDetail>>(url, data);
    }
}

export default postApi;