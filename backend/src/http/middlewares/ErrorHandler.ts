import ApiResponses from "../api/ApiResponses";
import { Request, Response, NextFunction } from "express";

export default function ErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  return ApiResponses.httpInternalError(res, {
    message: err.message,
  });
}
