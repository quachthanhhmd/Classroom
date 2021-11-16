import { inject, injectable } from "inversify";
import { serializeFeedDetail, IAuthorizeRequest, IResponse } from "../interfaces";
import { ReferenceType } from "../models";
import { AttachmentService, CommentService, FeedService, MemberService } from "../services";

@injectable()
export class FeedController {
    constructor(
        @inject("FeedService") private readonly _feedService: FeedService,
        @inject("MemberService") private readonly _memberService: MemberService,
        @inject("CommentService") private readonly _commentService: CommentService,
        @inject("AttachmentService") private readonly _attachmentService: AttachmentService,
    ) { }

    public getOneFeed = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const feedId = +req.params.feedId;

            const feed = await this._feedService.findFeedById(feedId);
            if (!feed) return res.composer.notFound();

            const commentList = await this._commentService.findAllComment(feed.userId, ReferenceType.FEED, feedId);
            const attachmentList = await this._attachmentService.findAllAttachment(ReferenceType.FEED, feedId);

            return res.composer.success(serializeFeedDetail({...feed, commentList, attachmentList}))
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public createNewFeed = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const courseId = +req.params.courseId;

            const isMember = await this._memberService.isActiveMember(userId, courseId);
            console.log(isMember);
            if (!isMember) return res.composer.forbidden()

            const newFeed = await this._feedService.createFeed(courseId, userId, req.body);

            return res.composer.success(serializeFeedDetail(newFeed));
        } catch (err) {
            res.composer.otherException(err);
        }
    }

    public updateFeed = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const feedId = +req.params.feedId;

            const isBelongToFeed = await this._feedService.isBelongsToFeed(feedId, userId);
            if (!isBelongToFeed) {
                return res.composer.forbidden();
            }

            const updateFeed = await this._feedService.updateFeed(feedId, req.body);

            return res.composer.success(serializeFeedDetail(updateFeed));
        } catch (err) {
            res.composer.otherException(err);
        }
    }

    public deleteFeed = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const id = +req.params.feedId;
            const userId = <number> req.currentUser?.id;

            const feed = await this._feedService.findFeedById(id);

            if (!feed) {
                return res.composer.notFound();
            }

            const isPermitToCRUD = await this._memberService.isPermitToCRUD(feed.courseId, userId);
            if (!isPermitToCRUD) {
                return res.composer.forbidden();
            }

            await this._feedService.deleteFeed(id);

            return res.composer.success()
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}