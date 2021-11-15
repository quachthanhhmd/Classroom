import { inject, injectable } from "inversify";
import { serializeExerciseDetail, IAuthorizeRequest, ICreateExercise, IResponse } from "../interfaces";
import { ExerciseService, MemberService } from "../services";

@injectable()
export class ExerciseController {
    constructor(
        @inject("ExerciseService") private readonly _exerciseService: ExerciseService,
        @inject("MemberService") private readonly _memberService: MemberService,
    ) { }

    public createNewExercise = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;
            const bodyExercise: ICreateExercise = req.body;

            const newExercise = await this._exerciseService.createExercise(courseId, bodyExercise);

            if (!newExercise) return res.composer.internalServerError();

            return res.composer.success(serializeExerciseDetail(newExercise));
        } catch (err) {
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