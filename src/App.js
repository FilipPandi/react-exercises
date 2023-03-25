import TextEditor from "./components/TextEditor";
import TextArea from "./components/TextArea";
import Header from "./components/Header";
import CalendarPreview from "./components/CalendarPreview";


function App() {
    return (
        <div>
            <Header/>
            <hr/>
            <TextEditor/>
            <hr/>
            <TextArea/>
            <hr/>
            <CalendarPreview/>
        </div>
    );
}

export default App;
