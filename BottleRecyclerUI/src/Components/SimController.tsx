function SimController() {
    return (
        <div className="card">
            <h5 className="card-header">
                Actions
            </h5>
            <div className="card-body">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">
                    <i className="bi bi-plus-square-fill"></i>
                </button>

                <button type="button" className="btn btn-primary">
                    <i className="bi bi-play-fill"></i>
                </button>

                <button type="button" className="btn btn-primary">
                    <i className="bi bi-stop-fill"></i>
                </button>

                <button type="button" className="btn btn-primary">
                    <i className="bi bi-skip-backward-btn-fill"></i>
                </button>

                <button type="button" className="btn btn-primary">
                    <i className="bi bi-fast-forward-btn-fill"></i>
                </button>
            </div>
        </div>
    );
}

export default SimController;