import { NextFunction, Request, Response } from "express";
import ApiResponses from "../api/ApiResponses";
import Resource from "common/Resource";

export interface RequestBodyWithResource<T> extends Request {
	body: T;
}

export default function RequireBodyValidation<T extends Resource>(ResourceClass: new () => T) {
	return async (request: RequestBodyWithResource<T>, response: Response, next: NextFunction) => {
		const resource = (ResourceClass as any as T & typeof Resource).hydrate<T>(request.body);
		resource
			.validateOrReject()
			.then(() => {
				request.body = resource;
				next();
			})
			.catch((e) => {
				return ApiResponses.httpBadRequest(response, e);
			});
	};
}
