const isLoading = () => {
  return (
    <div>
      <div className="container-xxl container-p-y">
        <div className="mb-4 card">
          <div className="card-body d-flex justify-content-center">
            <div className="row gy-3">
              <div className="col-md">
                <div className="text-light small fw-semibold">
                  Load data ...
                </div>
                <div className="demo-inline-spacing">
                  <div
                    className="spinner-border spinner-border-lg text-primary"
                    role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default isLoading;