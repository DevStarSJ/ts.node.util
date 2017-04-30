import request = require("request");
import fs = require("fs");

export function GetImageFromUrl(url: string, file: string) : Promise<any>
{
    let fileStream = fs.createWriteStream(file);

    return new Promise((resolve, reject) => {
        return request(url).pipe(fileStream).on("close", () => resolve());
    });
}

