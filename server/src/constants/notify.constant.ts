export const newExerciseMessage = (name: string) => {
    return `${name} đã đăng tải một bài tập mới.`
}
export const uriNewExercise = (courseId: number, postId: number) => `/course/${courseId}/post/${postId}/details`;