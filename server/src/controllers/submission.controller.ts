import { inject, injectable } from "inversify";
import { IAuthorizeRequest, IResponse } from "../interfaces";
import { ReferenceType, SubmissionType } from "../models";
import { AttachmentService, ExerciseService, MemberService, SubmissionService } from "../services";
import { serializeSubmissionDetail } from "./../interfaces/submission.interface";

@injectable()
export class SubmissionController {
    constructor(
        @inject("SubmissionService") private readonly _submissionService: SubmissionService,
        @inject("AttachmentService") private readonly _attachmentService: AttachmentService,
        @inject("MemberService") private readonly _memberService: MemberService,
        @inject("ExerciseService") private readonly _exerciseService: ExerciseService
    ) { }

    public createNewSubmission = async (
        req: IAuthorizeRequest,
        res: IResponse,
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const exerciseId = +req.params.exerciseId;
            const { type, attachmentList } = req.body;

            console.log(req.body);
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

    public getSubmission = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const exerciseId = +req.params.exerciseId;

            const submission = await this._submissionService.findByUserId(userId, exerciseId);

            if (!submission) return res.composer.success();
            const attachmentList =
                await this._attachmentService.findAllAttachment(ReferenceType.SUBMISSION, submission.id)

            return res.composer.success(serializeSubmissionDetail({ ...submission, attachmentList }))
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
            // const isBelongsToUser = await this._submissionService.isBelongsToUser(submissionId, userId);
            // const roleUser = await this._memberService.getRoleMember(userId, courseId);
            // if (!roleUser) return res.composer.notFound();

            // const submission = await this._submissionService.findSubmissionById(submissionId);
            // if (!submission) return res.composer.notFound();

            // const exercise = await this._exerciseService.findExerciseById(submission.id);
            // if (!exercise) return res.composer.notFound();

            // if ((typeof exercise.deadline === "undefined") ||
            //  (roleUser.role === TYPEROLE.STUDENT && exercise.deadline < new Date())) {
            //     return res.composer.forbidden();
            // }
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

            const submission = await this._submissionService.findSubmissionById(submissionId);

            return res.composer.success(serializeSubmissionDetail(submission));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}