import _ = require('lodash');
import R = require("raygun");
import F = require("./fileHelper");
import T = require("./typeHelper");

const config = F.GetJSON(__dirname + "/../config/raygun.json");
const raygun = new R.Client().init(config);

export const HttpStatus = {
    OK: "OK",

    BadRequest: "BadRequest",
    Unauthorized: "Unauthorized",
    NotFound: "NotFound",

    PreconditionFailed: "PreconditionFailed",
    PreconditionRequired: "PreconditionRequired",

    InternalServerError: "IInternalServerError",
    BadGateway: "BadGateway"
}

const StatusCode = {
    OK: 200,

    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,

    PreconditionFailed: 412,
    PreconditionRequired: 428,

    InternalServerError: 500,
    BadGateway: 502
};

const DefaultMessage = {
    OK: "OK",

    BadRequest: "Bad Request",
    Unauthorized: "Unauthorized",
    NotFound: "Resource Not Found",

    PreconditionFailed: "Parameter wrong",
    PreconditionRequired: "Parameter required",

    InternalServerError: "Internal Server Error",
    BadGateway: "Bad Gateway"
};

let event = null;
let apiName = "";

export function set(param: any, name: string) {
    event = param;
    apiName = name;
}

function sendRaygun(error, log, response, reject) {
    return raygun.send(error, log, () => {
        console.log(response);
        return reject(response);
    });
}

export function lambdaError(httpStatus: string, error: any = {}, body = null, reject = null) {
    if (!body)
        body = DefaultMessage[httpStatus];
    const statusCode = StatusCode[httpStatus];

    const response = {
        "statusCode": statusCode,
        "body": body
    };

    error.message = apiName + " : " + statusCode + " : " + body;

    const log = { event: event, error: error };

    if (reject === null) {
        return new Promise((resolve, reject) =>  {
            return sendRaygun(error, log, response, reject);
        });
    } else {
        return sendRaygun(error,log, response, reject);
    }
}
