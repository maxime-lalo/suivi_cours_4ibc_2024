import { Request, Response, NextFunction } from "express";
import ApiResponses from "../api/ApiResponses";
import fileTypeChecker from "file-type-checker";

export interface RequestWithFile extends Request {
	file?: Express.Multer.File;
}

export default function RequireFileUploadValidation(mimetypes: string[], maxFileSize: number = 1073741824) {
	return async (request: RequestWithFile, response: Response, next: NextFunction) => {
		if (!request.file) return ApiResponses.httpBadRequest(response, { message: "File is required" });

		const infos = fileTypeChecker.detectFile(request.file.buffer);

		if (request.file.mimetype !== infos?.mimeType) {
			return ApiResponses.httpBadRequest(response, { message: "Invalid file type" });
		}

		if (!mimetypes.includes(infos.mimeType)) {
			return ApiResponses.httpBadRequest(response, { message: `File type not supported, accepted files : ${mimetypes.join(", ")}` });
		}

		if (request.file.size > maxFileSize) {
			return ApiResponses.httpBadRequest(response, { message: `File is too large, max size is ${maxFileSize} bytes` });
		}

		return next();
	};
}
