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
    email: yup.string().email().required("Nhập email của bạn"),
    password: yup
        .string()
        .required("Nhập mật khẩu của bạn")
        .matches(
            /^(?=.*[A-Z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            "Mật khẩu phải bao gồm ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và số",
        )
})

export const ProfileValidate = yup.object({
    firstName: yup.string().max(30, "Tối đa 30 ký tự").required("Nhập họ của bạn"),
    lastName: yup.string().max(30, "Tối đa 30 ký tự").required("Nhập tên của bạn"),
    password: yup
        .string()
        .required("Please enter your password")
        .matches(
            /^(?=.*[A-Z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            "Mật khẩu phải bao gồm ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và số",
        ),
    birthDay: yup.date().required("Nhập ngày sinh của bạn"),
    gender: yup.string().oneOf(["male", "female", "other"]).required(),
})

export const CreateCourseValidate = yup.object({
    name: yup.string().max(100, "Tối đa 100 ký tự.").required("Nhập tên lớp học của bạn"),
    topic: yup.string().max(100, "Tối đa 100 ký tự"),
    description: yup.string().max(200, "Tối đa 200 ký tự"),
    studentLimit: yup.number().max(1000000, "Lớp học tối đa chỉ được 1 triệu học sinh"),
})

