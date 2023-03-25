import React, {useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import 'primereact/resources/themes/arya-green/theme.css'

import {Editor} from 'primereact/editor';
import {Button} from "primereact/button";
import {GetByTextType, Save} from "./Service";
import {TextType} from "./TextModel";
import {EditText} from "react-edit-text";
import {Panel} from "primereact/panel";
import './style/custompanel.css';
import 'primeicons/primeicons.css';

function TextEditor() {
    const [text, setText] = useState('');
    const [hiddenEditor, setHiddenEditor] = useState(true);
    const [hiddenText, setHiddenText] = useState(false);
    const [loading, setLoading] = useState(false);

    const toastRef = useRef();
    const handleChange = (e) => {
        setText(e.textValue);
    };

    useEffect(() => {
        console.log('Component TextEditor loaded!');
        GetByTextType(TextType.TEXT1)
            .then(value => {
                console.log(value);
                setText(value.data.text);
            });
    }, []);
    const handleSaveClick = () => {
        if (text) {
            const saveResponse = Save(text, TextType.TEXT1).then(response => {
                setHiddenEditor(true);
                setHiddenText(false);
                setLoading(true);

                toastRef.current.show({severity: 'info', summery: 'success', detail: 'Saved text: ' + text});

                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
            saveResponse.catch(function (error) {
                toastRef.current.show({severity: 'error', summery: 'error', detail: error.response.data});
            });
        } else {
            toastRef.current.show({severity: 'error', summery: 'error', detail: 'Value empty!'});
        }
    }

    const editorClick = () => {
        setHiddenEditor(false);
        setHiddenText(true);
    }


    return (
        <div style={{padding: '2%'}}>
            <Toast ref={toastRef}/>

            <Panel header="Option 1" className="custom-panel">
                <div style={{margin: '20px'}} onClick={editorClick}>
                    <EditText hidden={hiddenText} id="textElement" placeholder={"Enter text!"} name="{text}"
                              value={text} inline readonly/>
                </div>
                <Editor hidden={hiddenEditor} id={'editorElement'} value={text} name={text} onTextChange={handleChange}
                        style={{height: '320px'}}/>

                <Button type="submit" style={{marginTop: '10px', backgroundColor: '#54b5a6'}} icon="pi pi-check"
                        label="Save" loading={loading} onClick={handleSaveClick} size={"small"}/>
            </Panel>
        </div>
    );
}

export default TextEditor;
