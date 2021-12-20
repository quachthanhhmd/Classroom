import { inject, injectable } from "inversify";
import { serializeSubmissionList, IAuthorizeRequest, IResponse } from "../interfaces";
import { ReferenceType, SubmissionType } from "../models";
import { AttachmentService, CommentService, ExerciseService, SubmissionService } from "../services";
import { serializeSubmissionDetail } from "./../interfaces/submission.interface";

@injectable()
export class SubmissionController {
    constructor(
        @inject("SubmissionService") private readonly _submissionService: SubmissionService,
        @inject("AttachmentService") private readonly _attachmentService: AttachmentService,
        @inject("CommentService") private readonly _commentService: CommentService,
        @inject("ExerciseService") private readonly _exerciseService: ExerciseService
    ) { }

    public getAllSubmission = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const exerciseId = +req.params.exerciseId;
            // const courseId = +req.params.courseId;

            const submissionList = await this._submissionService.findAllSubmissionExercise(exerciseId);

            return res.composer.success(serializeSubmissionList(submissionList));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public createNewSubmission = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const exerciseId = +req.params.exerciseId;
            const { type, attachmentList } = req.body;

            const newSubmission = await this._submissionService.createSubmission(exerciseId, userId, type);

            const newAttachmentList = await this._attachmentService.createBulkAttachment(
                ReferenceType.SUBMISSION, newSubmission.id, attachmentList
            );

            return res.composer.success(
                serializeSubmissionDetail({ ...newSubmission, attachmentList: newAttachmentList })
            );
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public getSubmissionDetail = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const submissionId = +req.params.submissionId;

            const submission = await this._submissionService.findSubmissionById(submissionId);

            if (!submission) { return res.composer.success(); }
            const attachmentList =
                await this._attachmentService.findAllAttachment(ReferenceType.SUBMISSION, submission.id);

            const commentList =
                await this._commentService.findCommentByRefType(ReferenceType.SUBMISSION, submission.id);

            return res.composer.success(serializeSubmissionDetail({ ...submission, attachmentList, commentList }));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }
    public getSubmission = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const exerciseId = +req.params.exerciseId;

            const submission = await this._submissionService.findByUserId(userId, exerciseId);

            if (!submission) { return res.composer.success(); }
            const attachmentList =
                await this._attachmentService.findAllAttachment(ReferenceType.SUBMISSION, submission.id);
            const commentList =
                await this._commentService.findCommentByRefType(ReferenceType.SUBMISSION, submission.id);

            return res.composer.success(serializeSubmissionDetail({ ...submission, attachmentList, commentList }));
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public updateSubmission = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const submissionId = +req.params.submissionId;
            const body = req.body;

            await this._submissionService.updateSubmission(submissionId, body);

            const submission = await this._submissionService.findSubmissionById(submissionId);

            return res.composer.success(serializeSubmissionDetail(submission));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public updateScore = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const submissionId = +req.params.submissionId;
            const score = +req.body.score;

            await this._submissionService.updateSubmission(submissionId, { score, type: SubmissionType.SCORED });

            // const submission = await this._submissionService.findSubmissionById(submissionId);

            return res.composer.success();
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }
}
