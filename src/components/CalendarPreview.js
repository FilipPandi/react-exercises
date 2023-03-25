import React, {useState} from "react";
import {Panel} from "primereact/panel";
import {Calendar} from "primereact/calendar";

function CalendarPreview() {
    const [date, setDate] = useState(new Date());

    return (
        <div style={{padding: '2%'}}>
            <Panel header="Calendar preview" className="custom-panel">
                <table>
                    <tr>
                        <td style={{float: "left", marginLeft: "50px"}}>
                            <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek/>
                        </td>
                        <td style={{float: "right", marginLeft: "340px"}}>
                            <p>{String(date)}</p>
                        </td>
                    </tr>
                </table>
            </Panel>
        </div>
    );
}

export default CalendarPreview;