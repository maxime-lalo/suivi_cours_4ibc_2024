import assert from "assert";
import { NextFunction, Request, Response } from "express";
export interface RequestWithId extends Request {
  params: {
    id: string;
  };
}

export default function AddZerosToId() {
  return async (req: RequestWithId, res: Response, next: NextFunction) => {
    assert(req.params.id, "id is required");
    req.params.id = "000" + req.params.id;
    next();
  };
}
