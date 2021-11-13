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

const sendMail = async(to: string, subject: string, text: string) => {
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
