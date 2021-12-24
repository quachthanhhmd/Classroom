import * as yup from "yup";


export const SignUpValidate = yup.object({
    firstName: yup.string().max(30, "Tối đa 30 ký tự").required("Nhập họ của bạn"),
    lastName: yup.string().max(30, "Tối đa 30 ký tự").required("Nhập tên của bạn"),
    email: yup.string().email().required("Nhập email của bạn"),
    password: yup
        .string()
        .required("Please enter your password")
        .matches(
            /^(?=.*[A-Z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            "Mật khẩu phải bao gồm ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và số",
        ),
    birthDay: yup.date().required("Nhập ngày sinh của bạn"),
    gender: yup.string().oneOf(["male", "female", "other"]).required(),
}).required();

export const SignInValidate = yup.object({
    email: yup.string().required("Nhập email của bạn"),
    password: yup
        .string()
        .required("Nhập mật khẩu của bạn")
})

export const PasswordChangeValidate = yup.object({
    oldPassword: yup
        .string()
        .required("Please enter your password")
        .matches(
            /^(?=.*[A-Z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            "Mật khẩu phải bao gồm ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và số",
        ),
    newPassword: yup
        .string()
        .required("Please enter your password")
        .matches(
            /^(?=.*[A-Z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            "Mật khẩu phải bao gồm ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và số",
        ),
    againPassword: yup
        .string()
        .required("Please enter your password"),
})

export const ProfileValidate = yup.object({
    firstName: yup.string().max(30, "Tối đa 30 ký tự").required("Nhập họ của bạn"),
    lastName: yup.string().max(30, "Tối đa 30 ký tự").required("Nhập tên của bạn"),
    // password: yup
    //     .string()
    //     .required("Please enter your password")
    //     .matches(
    //         /^(?=.*[A-Z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    //         "Mật khẩu phải bao gồm ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và số",
    //     ),
    birthDay: yup.date().required("Nhập ngày sinh của bạn"),
    gender: yup.string().oneOf(["male", "female", "other"]).required(),
    avatarUrl: yup.string(),
})

export const CreateCourseValidate = yup.object({
    name: yup.string().max(100, "Tối đa 100 ký tự.").required("Nhập tên lớp học của bạn"),
    topic: yup.string().max(100, "Tối đa 100 ký tự"),
    description: yup.string().max(200, "Tối đa 200 ký tự"),
    studentLimit: yup.number().max(1000000, "Lớp học tối đa chỉ được 1 triệu học sinh"),
})

export const JoinCourseValidate = yup.object({
    code: yup.string().max(10, "Mã lớp chỉ tối đa 10 ký tự").required("Nhập mã lớp học mà giao viên cung cấp"),
})

export const ChangeCourseInfoValidate = yup.object({
    name: yup.string().max(100, "Tối đa 100 ký tự.").required("Nhập tên lớp học của bạn"),
    topic: yup.string().max(100, "Tối đa 100 ký tự"),
    description: yup.string().max(200, "Tối đa 200 ký tự"),
    studentLimit: yup.number().max(1000000, "Lớp học tối đa chỉ được 1 triệu học sinh").min(1, "Tối thiểu phải có 1 học sinh"),
})

export const AddStudentIDValidate = yup.object({
    studentId: yup.string().max(100, "Mã số sinh viên chỉ tối đa 100 ký tự").required("Bạn phải nhập mã số sinh viên khi vào lớp"),
})


export const InviteByEmailValidate = yup.object({
    email: yup.string().email("Bạn phải nhập theo định dạng email").required("Bạn phải nhập email để mời người khác vào lớp"),
})

export const CreateExerciseValidate = yup.object({
    title: yup.string().required("Tiêu đề của bài tập bắt buộc phải có"),
    topic: yup.object({
        id: yup.number(),
        name: yup.string(),
    }),
    description: yup.string(),
    typeId: yup.number().required("Chọn cấu trúc điểm của bài này"),
    deadline: yup.date(),
})

export const ReviewGradeValidate = yup.object({
    grade: yup.number().required("Hãy nhập điểm bạn mong muốn.").min(0, "Điểm số phải lớn hơn 0").max(10, "Điểm môn học không được lớn hơn 10"),
    note: yup.string(),
})