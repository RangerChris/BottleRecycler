
function Recycler() {
    let numberOfGlass = 1;
    let numberOPlastic = 2;
    let numberOfMetal = 3;
    
    return (
        <div className="card">
            <h5 className="card-header">
                <span className="float-start">Recycler 1</span>
            </h5>
            <div className="card-body">
                <h6 className="card-title">Glass: {numberOfGlass}</h6>
                <div className="progress">
                    <div className="progress-bar" role="progressbar"></div>
                </div>
                <h6 className="card-title">Plastic: {numberOPlastic}</h6>
                <div className="progress">
                    <div className="progress-bar" role="progressbar"></div>
                </div>
                <h6 className="card-title">Metal: {numberOfMetal}</h6>
                <div className="progress">
                    <div className="progress-bar" role="progressbar"></div>
                </div>

                <div className="text-center">
                    <button id="startStopButton" type="button" className="btn btn-primary">
                        Start
                    </button>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#editModal">
                        Edit
                    </button>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#deleteModal">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Recycler;