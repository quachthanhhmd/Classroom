import { inject, injectable } from "inversify";
import { serializeExerciseDetail, IAuthorizeRequest, ICreateExercise, IResponse } from "../interfaces";
import { ExerciseService, MemberService, TopicService } from "../services";

@injectable()
export class ExerciseController {
    constructor(
        @inject("ExerciseService") private readonly _exerciseService: ExerciseService,
        @inject("MemberService") private readonly _memberService: MemberService,
        @inject("TopicService") private readonly _topicService: TopicService
    ) { }

    public createNewExercise = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;
            const bodyExercise = req.body;
            console.log(bodyExercise);
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
            console.log(topicId);
            console.log(bodyExercise);
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