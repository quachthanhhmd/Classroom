import firebaseAdmin from "firebase-admin";
import * as path from "path";

export enum ContentType {
  TSV = "text/tsv",
  CSV = "text/csv",
  PDF = "application/pdf",
}
export interface IDocument {
  fileName: string;
  type?: string;
  pathFile?: string;
  contentType?: ContentType;
}

export function uploadNewFileFromBuffer(
    buffer: Buffer,
    option: IDocument
  ): Promise<{ url: string }> {
    const { fileName, type, pathFile, contentType } = option;
    const bucket = firebaseAdmin
      .storage()
      .bucket("eclassroom-80b31.appspot.com");
    const buildPathFile = path.join(
      "excel-server-uploads/",
      type || "",
      pathFile || "",
      fileName
    );
    const filePath = buildPathFile.replace(/\\/g, "/");
    const file = bucket.file(filePath);

    return new Promise((resolve, reject) => {
      const options = <any> {
        action: "read",
        expires: "03-17-3000",
      };
      file.save(
        buffer,
        {
          metadata: { contentType },
        },
        (error) => {
          if (error) {
            console.log("error");
            reject(error);
          }
          file.getSignedUrl(options).then((results) => {
            const url = results[0];
            resolve({ url });
          });
        }
      );
    });
  }
