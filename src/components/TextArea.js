import {EditTextarea} from "react-edit-text";
import React, {useEffect, useRef, useState} from "react";
import {Button} from "primereact/button";
import {TextType} from './model/TextModel.js';
import {Toast} from "primereact/toast";
import {GetByTextType, SaveTextModel} from './service/Service';
import {Panel} from "primereact/panel";

function TextArea() {
    const [textArea, setTextArea] = useState('');
    const [loading, setLoading] = useState(false);

    const toastRef = useRef();
    const handleChange = (event) => {
        setTextArea(event.target.value);
    };

    const handleSaveClick = () => {
        if (textArea) {
            const saveResponse = SaveTextModel(textArea, TextType.TEXT2).then(response => {
                setLoading(true);

                toastRef.current.show({severity: 'info', summery: 'success', detail: 'Saved text: ' + textArea});

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

            <Panel header="Text area edit" className="custom-panel">
                <div style={{margin: '20px'}}>
                    <EditTextarea
                        name={textArea}
                        placeholder={'Text goes here!'}
                        id={'textArea'}
                        rows={7}
                        value={textArea}
                        onChange={handleChange}
                        style={{fontSize: '16px', width: '100%'}}
                    />
            </div>

                <Button type="submit" style={{marginTop: '10px', backgroundColor: '#54b5a6'}} icon="pi pi-check" label="Save"
                        loading={loading} onClick={handleSaveClick} size={"small"}/>
            </Panel>
        </div>
    );
}

export default TextArea;
