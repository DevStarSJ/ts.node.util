import AWS = require("aws-sdk");
import fs = require("fs");
import P = require("promise");

import F = require("../fileHelper");
const AwsAccessKey = F.GetJSON(__dirname + "/../../config/aws.json");

const S3 = new AWS.S3(AwsAccessKey.Tokyo);

export function put(file: string, bucket: string, key: string, errorHandler: any = null) {
    const param = {
        Bucket:bucket,
        Key:key,
        Body:fs.createReadStream(file)
    }

    return new Promise((resolve, reject) => {
        return S3.upload(param, (error: any, data) =>  {
            if (error && errorHandler)
                return errorHandler.lambdaError(errorHandler.HttpStatus.InternalServerError, error, error.code, reject);

            return resolve(data);
        });
    });
}

export function get(file: string, bucket: string, key: string, errorHandler: any = null) {

    const param = {
        Bucket:bucket,
        Key:key
    };

    let fileStream = fs.createWriteStream(file);

    return new Promise((resolve, reject) => {
        return S3.getObject(param).createReadStream()
            .on('end', () => {
                return resolve();
            }).on('error', (error: any) => {
                if (errorHandler) {
                    // const rejectCall = (v) => {
                    //   reject(v);
                    // };
                    return errorHandler.lambdaError(errorHandler.HttpStatus.NotFound, error, null, reject);
                }
            }).pipe(fileStream);
    });
}

export function list(bucket: string, marker: string, func: any = null, errorHandler: any = null) {
    const params = {
        Bucket: bucket,
        //Delimiter: "/",
        Prefix: marker
    };

    return new Promise((resolve, reject) => {
        return S3.listObjects(params, (error, data: any) => {
            if (error && errorHandler)
                return errorHandler.lambdaError(errorHandler.HttpStatus.InternalServerError, error, null, reject);

            if (func !== null)
                data = data.Contents.map(i => func(i));

            return resolve(data);
        });
    });
}
