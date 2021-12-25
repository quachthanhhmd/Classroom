import nodemailer from "nodemailer";
import { IAuthorizeRequest } from "../interfaces";
import env from "./env";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: env.EMAIL.HOST,
    secure: false,
    auth: {
        user: env.EMAIL.USERNAME,
        pass: env.EMAIL.PASSWORD,
    }
});

const sendMail = async (to: string, subject: string, text: string) => {
    const content = {
        from: env.EMAIL.USERNAME,
        to,
        subject,
        text,
    }

    await transporter.sendMail(content);
}

export const sendInviteMember = async (
    _req: IAuthorizeRequest, userEmail: string, token: string, role: string, courseId: number): Promise<void> => {

    const urlVerify = `${env.CLIENT_DOMAIN}/course/invite/${courseId}?token=${token}&role=${role}`;
    console.log(urlVerify);
    const text = `Gửi ${userEmail}, \nĐể vào lớp học, vui lòng nhấn vào link ${urlVerify}\nNếu bạn không muốn vào lớp, hãy bỏ qua email này.`

    await sendMail(userEmail, "Mời bạn vào lớp học", text);

}

export const sendMailForgotPassword = async (
    _req: IAuthorizeRequest, userEmail: string, token: string): Promise<void> => {
        const urlVerify = `${env.CLIENT_DOMAIN}/auth?token=${token}&email=${userEmail}`;
        console.log(123123);
        console.log(urlVerify);
        const text = `Gửi ${userEmail}, \nBấm vào ${urlVerify} để lấy lại mật khẩu. Nếu bạn không phải là người gửi, hãy bỏ qua email này.`

        await sendMail(userEmail, "Quên mật khẩu", text);
}
