import * as AWS from 'aws-sdk';
import * as P from 'promise';

import F = require("../fileHelper");

const AwsAccessKey = F.GetJSON(__dirname + "/../../config/aws.json");

const SQS = new AWS.SQS(AwsAccessKey.Tokyo);

const receiveMessage = (param:any) => {
    return new P((resolve,reject) => {
        SQS.receiveMessage(param,(err,result) => {
            if(err) {
                return reject(err);
            }
            resolve(result);
        })
    });
};

const deleteMessage = (param:any) => {
    return new P((resolve,reject) => {
        SQS.deleteMessage(param,(err,result) => {
            if(err) {
                return reject(err);
            }
            resolve(result);
        })
    });
};

function sendMessage(param:any): any  {
    return new P((resolve,reject) => {
        SQS.sendMessage(param,(err,result) => {
            if(err) {
                return reject(err);
            }
            resolve(result);
        })
    });
};

const getQueueAttributes = (param:any) => {
    return new P((resolve,reject) => {
        SQS.getQueueAttributes(param,(err,result) => {
            if(err) {
                return reject(err);
            }
            resolve(result);
        })
    });
};

export default {
    receiveMessage,
    deleteMessage,
    sendMessage,
    getQueueAttributes
}