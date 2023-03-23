import ExpenseItem from "./components/ExpenseItem";
import TextEditor from "./components/TextEditor";

function App() {
    return (
        <div>
            <h1>Expenses</h1>
            <p>This is going to be parent root!</p>
            <br/>
            <ExpenseItem/>

            <hr/>
            <TextEditor/>
        </div>
    );
}

export default App;
