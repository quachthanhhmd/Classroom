import { inject, injectable } from "inversify";
import { IAuthorizeRequest, IResponse } from "../interfaces";
import { AttachmentService, FeedService, MemberService } from "../services";
import { ReferenceType } from "./../models/comment.model";

@injectable()
export class AttachmentController {
    constructor(
        @inject("AttachmentService") private readonly _attachmentService: AttachmentService,
        @inject("FeedService") private readonly _feedService: FeedService,
        @inject("MemberService") private readonly _memberService: MemberService,
    ) { }

    public createBulkAttachment = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const refId = +req.params.refId;
            const refType = req.params.refType;

            const body = req.body;

            const newAttachment =
                await this._attachmentService.createBulkAttachment(<ReferenceType> refType, refId, body);

            return res.composer.success(newAttachment);
        } catch (err) {
            console.log(err);

            return res.composer.otherException(err);
        }
    }

    public createAttachment = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const body = req.body;
            const feedId = +req.params.feedId;
            const userId = <number> req.currentUser?.id;
            console.log(userId, feedId);
            const isBelongsToUser = await this._feedService.isBelongsToFeed(feedId, userId);
            console.log(isBelongsToUser);
            if (!isBelongsToUser) return res.composer.forbidden();

            const newAttachment = await this._attachmentService.createAttachment(feedId, body);

            return res.composer.success(newAttachment);
        } catch (err) {
            res.composer.otherException(err);
        }
    }

    public deleteAttachment = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const attachmentId = +req.params.attachmentId;

            const attachment = await this._attachmentService.findAttachmentById(attachmentId);
            if (!attachment || attachment.refType !== ReferenceType.FEED) return res.composer.notFound();

            const isBelongToUser = await this._feedService.isBelongsToFeed(attachment.refId, userId);
            if (!isBelongToUser) return res.composer.forbidden();

            await this._attachmentService.deleteAttachment(attachmentId);

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}