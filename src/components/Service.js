import axios from "axios";
import {TextModel} from "./TextModel";
import {CalendarModel} from "./CalendarModel";

const prefixText = "/text";
const prefixCalendar = "/calendar";
export function SaveTextModel(text, textType) {
    const textModel = new TextModel(null, text, textType)
    if (text) {
       return axios.post(prefixText + "/save", textModel);
    }
}

export function SaveCalendarModel(date, text) {
    const calendarModel = new CalendarModel(null, date, text)
    if (date) {
        return axios.post(prefixCalendar + "/save", calendarModel);
    }
}

export function GetByDate(date) {
    const fixedDate = new Date(date);
    fixedDate.setDate(fixedDate.getDate() + 1);
    const formattedDate = fixedDate.toISOString().slice(0, 10)

    return axios.get(prefixCalendar + "/findByDate", {
        params: {
            "date": formattedDate
        }
    });
}


export function GetByTextType(textType) {
    return axios.get(prefixText + "/findByTextType", {
        params: {
            "textType": Number(textType)
        }
    });
}

export function Delete() {

}
