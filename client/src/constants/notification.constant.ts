export const NOTIFICATION_SUCCESS = "NOTIFICATION_SUCCESS";
export const NOTIFICATION_FAIL = "NOTIFICATION_FAIL";
export const CLOSE_NOTIFICATION = "CLOSE_NOTIFICATION";
export const NOTIFICATION_INFO = "NOTIFICATION_INFO";


export const ReviewResponse = (name: string) => {
    return `${name} vừa mới trả lời phản hồi phúc khảo của bạn.`;
}

export const ReviewResponseUri = (courseId: string, exerciseId: string) => {
    return `/course/${courseId}/post/${exerciseId}/details?comment=true`;
}

export const TeacherReviewUri = (courseId: number, exerciseId: number, userId: number) => {
    return `/course/${courseId}/post/${exerciseId}/marking?userId=${userId}`;
}

export const TeacherReview = (name: string) => {
    return `${name} vừa bình luận về bài nộp của mình.`;
}
export enum NotificationType {
    USER = "user",
    COURSE = "course",
}