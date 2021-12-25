import { inject, injectable } from "inversify";
import { CourseService, MemberService, UserService } from ".";
import { TYPEROLE } from "../constants";
import { ICreateNotification } from "../interfaces";
import { Notification, NotificationType } from "../models";

@injectable()
export class NotificationService {
    constructor(
        @inject("MemberService") private readonly _memberService: MemberService,
        @inject("CourseService") private readonly _courseService: CourseService,
        @inject("UserService") private readonly _userService: UserService
    ) { }

    public createNewNotification = async (courseId: number, data: ICreateNotification) => {

        const studentList = await this._memberService.findAllMemberByRole(courseId, TYPEROLE.STUDENT);
        const standardData = studentList.map((student) => {
            return {
                ...data,
                userId: student.id
            }
        })
        await Notification.bulkCreate(standardData);
    }

    public createOneNotification = async (data: Required<ICreateNotification>) => {

        return Notification.create({
            ...data
        })

    }
    public getAllNotificationUser = async (userId: number): Promise<any[]> => {
        const notificationList = await Notification.findAll({
            where: {
                userId
            },
            order: [["createdAt", "DESC"]],
            raw: false,
            nest: true,
        });

        return Promise.all(notificationList.map(async (notification) => {
            if (notification.refType === NotificationType.USER) {
                const userInfo = await this._userService.findUserById(notification.refId);

                return {
                    ...notification,
                    info: {
                        name: `${userInfo?.firstName} ${userInfo?.lastName}`,
                        avatarUrl: userInfo?.avatarUrl
                    }
                }
            }

            const courseInfo = await this._courseService.getCourseDetail(notification.refId);

            return {
                id: notification.id,
                content: notification.content,
                uri: notification.uri,
                createdAt: notification.createdAt,
                isRead: notification.isRead,
                info: {
                    name: `${courseInfo?.name}`,
                    avatarUrl: courseInfo?.avatarUrl
                }
            }

        }));

    }

    public updateNotify = async (notifyId: number) => {
        await Notification.update({
            isRead: true,
        }, {
            where: {
                id: notifyId,
            }
        })
    }
}