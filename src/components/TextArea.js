import {EditTextarea} from "react-edit-text";
import React, {useEffect, useRef, useState} from "react";
import {Button} from "primereact/button";
import {TextType} from './TextModel.js';
import {Toast} from "primereact/toast";
import {GetByTextType, Save} from './Service';

function TextArea() {
    const [textArea, setTextArea] = useState('');

    const toastRef = useRef();
    const handleChange = (event) => {
        setTextArea(event.target.value);
    };

    const handleSaveClick = () => {
        if (textArea) {
            Save(textArea, TextType.TEXT2);
            toastRef.current.show({severity: 'info', summery: 'success', detail: 'Saved text: ' + textArea});
        } else {
            toastRef.current.show({severity: 'error', summery: 'error', detail: 'Value empty!'});
        }
    }

    useEffect(() => {
        console.log('Component TextArea loaded!');
        GetByTextType(TextType.TEXT2)
            .then(value => {
                console.log(value);
                setTextArea(value.data.text);
            });
    }, []);

    return (
        <div style={{padding: '2%'}}>
            <Toast ref={toastRef}/>
            <h2>Opcija 2:</h2>
            <EditTextarea
                name={textArea}
                placeholder={'Text goes here!'}
                id={'textArea'}
                rows={7}
                value={textArea}
                onChange={handleChange}
                style={{fontSize: '16px', width: '100%'}}
            />

            <Button type="submit" style={{marginTop: '5px'}} label="Save" onClick={handleSaveClick}
                    value={"Submit"}/>
        </div>
    );
}

export default TextArea;
