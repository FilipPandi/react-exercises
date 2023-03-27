export class TextType {
    static TEXT1 = 0;
    static TEXT2 = 1;
    static TEXT3 = 2;

}
export class TextModel {
    id;
    text;
    textType;

    constructor(id, text, textType) {
        this.id = id;
        this.text = text;
        this.textType = textType;
    }
}
