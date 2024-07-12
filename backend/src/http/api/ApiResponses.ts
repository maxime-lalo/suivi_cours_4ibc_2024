import { Response } from "express";
import HttpCodes from "../HttpCodes";

type IResponseData = Record<string, unknown> | Error | string | number | boolean | null | unknown;
type IResponseJson<T extends Response> = Parameters<T["json"]>[0];

export default abstract class ApiResponses {
	public httpCode: typeof HttpCodes = HttpCodes;

	public static httpSuccess<T extends Response>(response: T, responseData: IResponseJson<T>) {
		return this.httpResponse(response, HttpCodes.SUCCESS, responseData);
	}

	public static httpCreated<T extends Response>(response: T, responseData: IResponseJson<T>) {
		return this.httpResponse(response, HttpCodes.CREATED, responseData);
	}

	public static httpConflict<T extends Response>(response: T, responseData: IResponseJson<T>) {
		return this.httpResponse(response, HttpCodes.CONFLICT, responseData);
	}

	public static httpUpdated<T extends Response>(response: T, responseData: IResponseJson<T>) {
		return this.httpResponse(response, HttpCodes.SUCCESS, responseData);
	}

	public static httpUpdatedNoContent(response: Response) {
		return this.httpResponse(response, HttpCodes.NO_CONTENT);
	}

	public static httpNoContent(response: Response) {
		return this.httpResponse(response, HttpCodes.NO_CONTENT);
	}

	public static httpBadRequest(response: Response, responseData: IResponseData = "Http Bad Request") {
		return this.httpResponse(response, HttpCodes.BAD_REQUEST, responseData);
	}

	public static httpMalformedRequest(response: Response, responseData: IResponseData = "Malformed Request") {
		return this.httpResponse(response, HttpCodes.BAD_REQUEST, responseData);
	}

	public static httpNotFound(response: Response, responseData: IResponseData = "Not Found") {
		return this.httpResponse(response, HttpCodes.NOT_FOUND, responseData);
	}

	public static httpInternalError(response: Response, responseData: IResponseData = "http Internal Server Error") {
		return this.httpResponse(response, HttpCodes.INTERNAL_ERROR, responseData);
	}

	public static httpUnauthorized(response: Response, responseData: IResponseData = "http Unauthorized Request") {
		return this.httpResponse(response, HttpCodes.UNAUTHORIZED, responseData);
	}

	public static httpNotImplemented(response: Response, responseData: IResponseData = "Not implemented") {
		return this.httpResponse(response, HttpCodes.NOT_IMPLEMENTED, responseData);
	}

	public static httpForbidden(response: Response, responseData: IResponseData = "Forbidden") {
		return this.httpResponse(response, HttpCodes.FORBBIDEN, responseData);
	}

	public static httpResponse(response: Response, httpCode: HttpCodes, responseData: IResponseData = {}) {
		if (responseData instanceof Error) {
			throw responseData;
		}
		return response.status(httpCode).send(responseData);
	}
}
