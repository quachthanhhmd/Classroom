import { injectable } from "inversify";
import { Attachment, ReferenceType } from "../models";
import { ICreateAttachment } from "./../interfaces";

@injectable()
export class AttachmentService {
    /**
     * Find attachment
     * @param attachmentId 
     * @returns 
     */
    public findAttachmentById = async (attachmentId: number): Promise<Attachment | null> => {
        return Attachment.findByPk(attachmentId);
    }

    public isBelongsToFeed = async (attachmentId: number, feedId: number): Promise<boolean> => {
        const attachment = await this.findAttachmentById(attachmentId);

        if (!attachment) return false;

        if (attachment.refType === ReferenceType.FEED && attachment.refId === feedId) return true;

        return false;
    }

    /**
     * Create new Attachment
     * @param {number}feedId 
     * @param {ICreateAttachment} body 
     * @returns 
     */
    public createAttachment = (feedId: number, body: ICreateAttachment) => {
        return Attachment.create({
            refType: ReferenceType.FEED,
            refId: feedId,
            ...body,
        })
    }

    /**
     * Delete attachment
     * @param attachmentId 
     */
    public deleteAttachment = async (attachmentId: number) => {
        await Attachment.destroy({
            where: {
                id: attachmentId,
            }
        })
    }
}