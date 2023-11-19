function Recycler() {
    let numberOfGlass = getRandomInt(10, 300);
    let numberOPlastic = getRandomInt(10, 300);
    let numberOfMetal = getRandomInt(10, 300);

    function getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <div className="card">
            <h5 className="card-header">
                Recycler 1
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

                <br/>

                <div className="text-center">
                    <button id="startStopButton" type="button" className="btn btn-secondary" title="Start recycler">
                        Start
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-secondary" data-bs-toggle="modal"
                            data-bs-target="#editModal" title="Edit recycler settings">
                        Edit
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-secondary" data-bs-toggle="modal"
                            data-bs-target="#deleteModal" title="Delete recycler">
                        Delete
                    </button>
                </div>

                {/*Edit Modal */}
                <div className="modal fade" id="editModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit recycler</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Delete modal*/}
                <div className="modal fade" id="deleteModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete recycler</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Yes</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recycler;