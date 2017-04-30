import * as AWS from 'aws-sdk';
const P = require("promise");

import F = require("../fileHelper");

const AwsAccessKey = F.GetJSON(__dirname + "/../../config/aws.json");

const Kinesis = new AWS.Kinesis(AwsAccessKey.TokyoKinesis);

function putRecord(param:any): any  {
    return new P((resolve,reject) => {
        Kinesis.putRecord(param,(err,result) => {
            if(err) {
                return reject(err);
            }
            resolve(result);
        })
    });
};

export default {
    putRecord
}