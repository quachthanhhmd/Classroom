import { inject, injectable } from "inversify";
import { serializeExerciseTypeDetail, serializeExerciseTypeDetailList, IAuthorizeRequest, IResponse } from "../interfaces";
import { ExerciseTypeService } from "../services";

@injectable()
export class ExerciseTypeController {
    constructor(
        @inject("ExerciseTypeService") private readonly _exerciseTypeService: ExerciseTypeService,
    ) { }

    public createExerciseType = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const body = req.body;
            const courseId = +req.params.courseId;

            const newOrderIndex = await this._exerciseTypeService.generateNewOrderIndex(courseId);
            const newType =
                await this._exerciseTypeService.createExerciseType(courseId, { ...body, orderIndex: newOrderIndex });
            console.log(newType);

            return res.composer.success(serializeExerciseTypeDetail(newType));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public updateExerciseType = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const body = req.body;
            const id = +req.params.id;

            await this._exerciseTypeService.updateExerciseType(id, body);

            const updateExerciseType = await this._exerciseTypeService.findExerciseTypeById(id);
            if (!updateExerciseType) return res.composer.notFound();

            return res.composer.success(serializeExerciseTypeDetail(updateExerciseType))
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
    public deleteExerciseType = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const id = +req.params.id;

            await this._exerciseTypeService.deleteExerciseType(id);

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public changeOrderIndex = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const courseId = +req.params.courseId;
            const body = req.body;
            await this._exerciseTypeService.updateOrderIndex(body);

            const typeList = await this._exerciseTypeService.findAllExerciseDetail(courseId);

            return res.composer.success(serializeExerciseTypeDetailList(typeList));
        } catch (err) {
            res.composer.otherException(err);
        }
    }
}