import SimController from "./Components/SimController.tsx";
import Recycler from "./Components/Recycler.tsx";

function App() {

    return ( 
    <div>
        <SimController></SimController>

        <br/>
        
        <div className="row row-cols-3 gy-3">
            <div className="col"><Recycler></Recycler></div>
        </div>
    </div>
    )
}

export default App;