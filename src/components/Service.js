import axios from "axios";
import {TextModel} from "./TextModel";

const prefix = "/text";
export function Save(text, textType) {
    const textModel = new TextModel(null, text, textType)
    if (text) {
       return axios.post(prefix + "/save", textModel);
    }
}

export function GetByTextType(textType) {
    return axios.get(prefix + "/findByTextType", {
        params: {
            "textType": Number(textType)
        }
    });
}

export function Delete() {

}
