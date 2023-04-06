import React, {useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import 'primereact/resources/themes/arya-green/theme.css'

import {Editor} from 'primereact/editor';
import {Button} from "primereact/button";
import {GetByTextType, SaveTextModel} from "./service/Service";
import {TextType} from "./model/TextModel";
import {EditText} from "react-edit-text";
import {Panel} from "primereact/panel";
import './style/custompanel.css';
import 'primeicons/primeicons.css';
import FileUploadComponent from "./FileUploadComponent";

function TextEditor() {
    const [text, setText] = useState('');
    const placeholderConstant = 'Enter text here!';
    const [placeholder, setPlaceholder] = useState(placeholderConstant);
    const [isVisibleEditor, setVisibleEditor] = useState(false);
    const [isVisibleEditText, setVisibleEditText] = useState(true);
    const [isVisibleCancel, setVisibleCancel] = useState(false);
    const [loading, setLoading] = useState(false);

    const toastRef = useRef();
    const handleChange = (e) => {
        setText(e.textValue);
    };

    useEffect(() => {
        console.log('Component TextEditor loaded!');
        setPlaceholder(placeholderConstant);
        setVisibleCancel(false);
        GetByTextType(TextType.TEXT1)
            .then(value => {
                console.log(value);
                setText(value.data.text);
            });
    }, []);
    const handleSaveClick = () => {
        if (text) {
            const saveResponse = SaveTextModel(text, TextType.TEXT1).then(response => {
                setVisibleEditor(false);
                setVisibleEditText(true);
                setVisibleCancel(false);
                setLoading(true);

                toastRef.current.show({severity: 'info', summery: 'success', detail: 'Saved text: ' + text});

                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
            saveResponse.catch(function (error) {
                setVisibleCancel(true);
                toastRef.current.show({severity: 'error', summery: 'error', detail: error.response.data});
            });
        } else {
            toastRef.current.show({severity: 'error', summery: 'error', detail: 'Value empty!'});
        }
    }

    const editorClick = () => {
        setPlaceholder(placeholderConstant);
        setVisibleCancel(true);
        setVisibleEditor(true);
        setVisibleEditText(true);
    }

    const hideCancel = () => {
        setPlaceholder(placeholderConstant);
        setVisibleEditor(false);
        setVisibleEditText(true);
        setVisibleCancel(false);
    }


    return (
        <div style={{padding: '2%'}}>
            <Toast ref={toastRef}/>

            <Panel header="Editor" className="custom-panel">
                <div style={{margin: '20px'}} onClick={editorClick}>
                    <EditText className={isVisibleEditText ? "visible-element" : "invisible-element"} id="textElement"
                              placeholder={placeholder} name={text}
                              value={text} inline readonly/>
                </div>
                <div className={isVisibleEditor ? "visible-element" : "invisible-element"}>
                    <Editor id={'editorElement'}
                            value={text} name={text} onTextChange={handleChange}
                            style={{height: '320px'}}/>

                    <FileUploadComponent/>
                </div>


                <Button type="submit" style={{marginTop: '10px', backgroundColor: '#54b5a6'}} icon="pi pi-check"
                        label="Save" loading={loading} onClick={handleSaveClick} size={"small"}/>

                <Button className={isVisibleCancel ? "visible-element" : "invisible-element"}
                        style={{marginTop: '10px', marginLeft: '10px'}} icon="pi pi-times"
                        label="Cancel" loading={loading} onClick={hideCancel} size={"small"}/>
            </Panel>
        </div>
    );
}

export default TextEditor;
