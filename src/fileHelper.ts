import fs = require("fs");
import path = require("path");


export function Mkdir(filePath: string)
{
    const dirname = path.dirname(filePath);

    if (!fs.existsSync(dirname))
    {
        Mkdir(dirname);
    }

    fs.mkdirSync(filePath);
}

export function GetSize(filePath: string)
{
    return fs.statSync(filePath).size;
}

export function WriteFile(filePath: string, content: string)
{
    fs.writeFileSync(filePath, content);
}

export function GetLastPath(url: string): string {
    return "./" + url.split("/").pop();
}

export function GetJSON(filePath: string) : any {
    const content = fs.readFileSync(filePath);
    return JSON.parse(content.toString());
}
