import {IncomingMessage, ServerResponse} from "http";
import {castToObjectNotUndef} from "../castTo";
import JSONParse from "../JSONParse";

export default <Type>(data: string, res: ServerResponse, dataObj: Type, testObjFunvc: (d_o: Type) => Type): Type | undefined => {
    try {
        dataObj = JSONParse(data);
        dataObj = castToObjectNotUndef(dataObj);
        if (dataObj === undefined) {
            throw new Error("undefined!");
        }
        return testObjFunvc(dataObj);
    } catch (e) {
        if (e === 400) {
            res.writeHead(400);
        } else if (e === 422) {
            res.writeHead(422);
        } else {
            res.writeHead(500);
        }
        res.end();
        throw new Error("parse error");
    }
}