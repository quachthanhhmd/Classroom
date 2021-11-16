import { inject, injectable } from "inversify";
import { serializeComment, IAuthorizeRequest, IResponse } from "../interfaces";
import { CommentService, MemberService } from "../services";

@injectable()
export class CommentController {
    constructor(
        @inject("CommentService") private readonly _commentService: CommentService,
        @inject("MemberService") private readonly _memberService: MemberService,
    ) { }

    public createComment = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const body = req.body;

            const newComment = await this._commentService.createComment(userId, body);

            return res.composer.success(serializeComment(newComment));
        } catch (err) {
            return res.composer.otherException(err);
        }
    }

    public deleteComment = async (
        req: IAuthorizeRequest,
        res: IResponse
    ): Promise<void> => {
        try {
            const userId = <number> req.currentUser?.id;
            const courseId = +req.params.courseId;
            const commentId = +req.params.commentId;

            const isPermitToCRUD = await this._memberService.isPermitToCRUD(courseId, userId);
            const isBelongToComment = await this._commentService.isBelongToComment(commentId, userId);

            if (!isPermitToCRUD && !isBelongToComment) {
                return res.composer.forbidden();
            }

            await this._commentService.deleteComment(commentId);

            return res.composer.success();
        } catch (err) {
            return res.composer.otherException(err);
        }
    }
}