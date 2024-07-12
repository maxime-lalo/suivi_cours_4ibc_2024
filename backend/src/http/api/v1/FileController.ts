import express, { Router } from "express";
import multer from "multer";
import RequireFileUploadValidation from "../../middlewares/RequireFileUploadValidation";

const storage = multer.memoryStorage();

const acceptedMimeTypes = ["application/pdf", "image/png", "image/jpeg", "image/webp"];

export default (superRouter: Router) => {
	const router = express.Router();

	// npm i multer
	// npm i --save-dev @types/multer
	superRouter.use("/files", multer({ storage: storage }).single("file"), router);

	router.post("/", RequireFileUploadValidation(acceptedMimeTypes), async (request, res) => {
		res.writeHead(200, { "Content-Type": request.file!.mimetype });
		return res.end(Buffer.from(request.file!.buffer));
	});
};
