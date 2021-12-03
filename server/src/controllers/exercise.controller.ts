import { inject, injectable } from "inversify";
import { serializeAllExercise, serializeExerciseDetail, serializeExerciseList, IAuthorizeRequest, ICreateExercise, IResponse } from "../interfaces";
import { ExerciseService, MemberService, TopicService } from "../services";

@injectable()
export class ExerciseController {
    constructor(
        @inject("ExerciseService") private readonly _exerciseService: ExerciseService,
        @inject("MemberService") private readonly _memberService: MemberService,
        @inject("TopicService") private readonly _topicService: TopicService
    ) { }

    public getAllExercise = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;

            const exerciseList = await this._exerciseService.findAllExerciseByCourseId(courseId);
            // const topicList = await this._topicService.findTopicByCourseId(courseId);

            return res.composer.success(serializeExerciseList(exerciseList));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public createNewExercise = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;
            const bodyExercise = req.body;

            let topicId = -1;
            if (bodyExercise.topic.id === -1) {
                const newTopic = await this._topicService.createTopic(courseId, { topic: bodyExercise.topic.topic });

                if (newTopic) {
                    topicId = newTopic.id;
                }
            }

            if (topicId === -1 && bodyExercise.topic.id !== -1) {
                const topic = await this._topicService.findTopicById(bodyExercise.topic.id);

                if (!topic) return res.composer.badRequest();
                topicId = topic.id;
            }

            delete bodyExercise.topic;
            const newExercise = await this._exerciseService.createExercise(courseId, { ...bodyExercise, topicId });

            if (!newExercise) return res.composer.internalServerError();

            return res.composer.success(serializeExerciseDetail(newExercise));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public updateExercise = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const body: ICreateExercise = req.body;
            const id = +req.params.id;
            const courseId = +req.params.id;
            const userId = <number> req.currentUser?.id;

            const isPermitToCRUD = await this._memberService.isPermitToCRUD(courseId, userId);
            console.log(isPermitToCRUD);
            if (!isPermitToCRUD) return res.composer.forbidden();

            await this._exerciseService.updateExercise(id, body);

            const updateExercise = await this._exerciseService.findExerciseById(id);
            if (!updateExercise) return res.composer.notFound();

            return res.composer.success(serializeExerciseDetail(updateExercise));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public deleteExercise = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const id = +req.params.id;
            const courseId = +req.params.id;
            const userId = <number> req.currentUser?.id;

            const isPermitToCRUD = await this._memberService.isPermitToCRUD(courseId, userId);
            console.log(isPermitToCRUD);
            if (!isPermitToCRUD) return res.composer.forbidden();

            await this._exerciseService.deleteExercise(id);

            const updateExercise = await this._exerciseService.findExerciseById(id);
            if (!updateExercise) return res.composer.notFound();

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}