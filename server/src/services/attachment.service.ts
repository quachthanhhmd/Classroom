import { injectable } from "inversify";
import { Op } from "sequelize";
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

    /**
     * 
     * @param {number} attachmentId 
     * @param {number} feedId 
     * @returns 
     */
    public isBelongsToFeed = async (attachmentId: number, feedId: number): Promise<boolean> => {
        const attachment = await this.findAttachmentById(attachmentId);

        if (!attachment) return false;

        if (attachment.refType === ReferenceType.FEED && attachment.refId === feedId) return true;

        return false;
    }
    /**
     * 
     * @param {string} refType 
     * @param {number} refId 
     * @returns 
     */
    public findAllAttachment = async (refType: string, refId: number): Promise<Attachment[]> => {
        return Attachment.findAll({
            where: {
                [Op.and]: {
                    refId,
                    refType,
                }
            }
        })
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
     * 
     * @param {string} refType 
     * @param {number}refId 
     * @param {ICreateAttachment} body
     * @returns 
     */
    public createBulkAttachment = (
        refType: ReferenceType, refId: number, body: ICreateAttachment[]) :Promise<Attachment[]> => {
        const valueCreateBulk = body.map((v) => ({ ...v, refType, refId }));

        return Attachment.bulkCreate(
            valueCreateBulk,
            { returning: true }
        )
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