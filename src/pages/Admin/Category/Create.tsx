import InvalidFeedback from "@/layouts/admin/components/InvalidFeedback"
import BasicButton from "@/layouts/admin/components/buttons/BasicButton"
import BasicButtonLink from "@/layouts/admin/components/buttons/BasicButtonLink"


function CategoryCreate() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-4 card">
            <h5 className="card-header">Create A User</h5>
            <form className="card-body" method="post">
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert">
                <strong>errorResponse</strong>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Username" className="form-label">
                  Username
                </label>
                <input
                  id="Username"
                  type="text"
                  className="form-control invalid"
                  placeholder="Name"
                />
                <InvalidFeedback msg={"Error Username"} />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
                <InvalidFeedback msg={"Error Name"} />
              </div>
              <div className="mb-3">
                <label htmlFor="jenisKelamin" className="form-label">
                  Jenis Kelamin
                </label>
                <select className="form-select" id="jenisKelamin">
                  <option disabled selected>
                    Pilih
                  </option>
                  <option value={"L"} selected>
                    Laki-laki
                  </option>
                  <option value={"P"} selected>
                    Perempuan
                  </option>
                </select>
                <InvalidFeedback msg={"Error Jenis Kelamin"} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  className="form-control"
                  placeholder="Email"
                />
                <InvalidFeedback msg={"Error Email"} />
              </div>
              <div className="mb-3">
                <label htmlFor="telp" className="form-label">
                  Nomor Telepon
                </label>
                <input
                  id="telp"
                  type="text"
                  className="form-control"
                  placeholder="Nomor Telepon"
                />
                <InvalidFeedback msg={"Error Nomor Telepon"} />
              </div>

              {/* <button type="submit" className="mr-1 btn btn-primary">
                <i className="bx bx-save me-1" />
                Pesan Error
              </button> */}
              <BasicButton
                text={"Save"}
                tipe={"submit"}
                color={"primary"}
                icon={"bx-save"}
              />
              <BasicButtonLink
                text={"Kembali"}
                link={"/admin/users"}
                color={"info"}
                icon={"bx-left-arrow-alt"}
              />
            </form>
          </div>
        </div>
      </div>
    );
}

export default CategoryCreate;
