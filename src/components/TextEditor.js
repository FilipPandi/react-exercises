import React, {useCallback, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import 'primereact/resources/themes/arya-green/theme.css'

import {Editor} from 'primereact/editor';
import {Button} from "primereact/button";
import axios from "axios";

function TextEditor() {
    const [text, setText] = useState('');
    const toastRef = useRef();

    let textModel1 = {
        id: 1,
        text: ''
    };

    const handleChange = (event) => {
        setText(event.target.value);
        textModel1.text = text;
    };

    const save = useCallback(async () => {
        console.log("Saving!" + textModel1.text)
        await axios.post("/text/save", textModel1);
    }, [textModel1]);

    const handleSave = useCallback((e) => {
        e.preventDefault()
        if (text) {
            textModel1.text = text;
            save();
            toastRef.current.show({severity: 'info', summery: 'success', detail: 'Saved text: ' + text });
        } else {
            toastRef.current.show({severity: 'error', summery: 'error', detail: 'Value empty!'});
        }
    }, [save]);

    return(
        <div>
            <Toast ref={toastRef}/>
                <Editor value={textModel1.text} name={text} onChange={handleChange} style={{ height: '320px' }} />

                <Button type="submit" style={{marginTop: '5px'}} label="Save" onClick={handleSave} value={"Submit"} />

        </div>
    );
}

export default TextEditor;
