export const newExerciseMessage = (name: string) => {
    return `${name} đã đăng tải một bài tập mới.`
}
export const uriNewExercise = (courseId: number, postId: number) => `/course/${courseId}/post/${postId}/details`;

export const reviewGradeMessage = (name: string) => {
    return `${name} đã yêu cầu phúc khảo điểm số.`;
}

export const uriReviewGrade = (courseId: number, exerciseId: number, userId: number) => {
    return `/course/${courseId}/post/${exerciseId}/marking?userId=${userId}`;
}