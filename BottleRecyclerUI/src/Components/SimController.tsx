import NewRecyclerModal from "./NewRecyclerModal.tsx";

function SimController() {

    let simulatorDate: Date = new Date();
    let timeWarp: number = 1;

    return (
        <div className="card">
            <h5 className="card-header">
                Actions
            </h5>
            <div className="card-body">
                <h2 className="text-center">{simulatorDate.toDateString()} {simulatorDate.toLocaleTimeString()} -
                    Speed: {timeWarp}</h2>
                <div className="row justify-content-center">
                    <NewRecyclerModal></NewRecyclerModal>
                    &nbsp;
                    <button type="button" className="btn btn-primary col-1" title="Resume time">
                        <i className="bi bi-play-fill"></i> 
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-primary col-1" title="Stop time">
                        <i className="bi bi-stop-fill"></i>
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-primary col-1" title="Decrease time wrap">
                        <i className="bi bi-skip-backward-btn-fill"></i>
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-primary col-1" title="Increase time wrap">
                        <i className="bi bi-fast-forward-btn-fill"></i>
                    </button>
                    
                    
                </div>
            </div>

        </div>);
}

export default SimController;