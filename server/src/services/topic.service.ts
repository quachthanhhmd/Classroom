import { injectable } from "inversify";
import { ICreateTopic } from "../interfaces";
import { Topic } from "../models";

@injectable()
export class TopicService {

    public findTopicById = async (id: number): Promise<Topic | null> => {
        return Topic.findOne({
            where: { id }
        })
    }

    public createTopic = async (courseId: number, body: ICreateTopic) => {
        return Topic.create({
            courseId,
            ...body,
        })
    }

    /**
     * Find Topic by courseId
     * @param courseId 
     * @returns 
     */
    public findTopicByCourseId = async (courseId: number) => {
        return Topic.findAll({
            where: {
                courseId,
            },
            raw: true,
            nest: true
        })
    }

    /**
     * update topic name
     * @param courseId 
     * @param body 
     * @returns 
     */
    public updateTopic = async (courseId: number, body: ICreateTopic) => {
        return Topic.update(
            body,
            {
                where: {
                    courseId,
                }
            }
        )
    }

}