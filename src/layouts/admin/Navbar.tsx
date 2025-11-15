import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
// Import komponen UI yang Anda sediakan:

import { useAlertStore } from "@/store/alertStore";

const Logout = () => {
  const token = Cookies.get("token");
  const addAlert = useAlertStore.getState().addAlert;
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      Cookies.remove("token");
      try {
        await axios.delete("http://localhost:8000/api/admin/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        await Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        addAlert("Anda berhasil Logout!", "success");
        window.location.href = "/admin/login";
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 422) {
          addAlert(error.response.data.errors, "danger");
          return;
        }
      }
    }
  });
};

const Navbar = () => {
  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar">
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a className="px-0 nav-item nav-link me-xl-4" href="javascript:void(0)">
          <i className="bx bx-menu bx-sm" />
        </a>
      </div>
      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse">
        {/* Search */}
        <div className="navbar-nav align-items-center">
          <div className="nav-item d-flex align-items-center">
            <i className="bx bx-search fs-4 lh-0" />
            <input
              type="text"
              className="border-0 shadow-none form-control"
              placeholder="Search..."
              aria-label="Search..."
            />
          </div>
        </div>
        {/* /Search */}
        <ul className="flex-row navbar-nav align-items-center ms-auto">
          {/* Place this tag where you want the button to render. */}
          <li className="nav-item lh-1 me-3">
            <a
              className="github-button"
              href="https://github.com/themeselection/sneat-html-admin-template-free"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star themeselection/sneat-html-admin-template-free on GitHub">
              Star
            </a>
          </li>
          {/* User */}
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a
              className="nav-link dropdown-toggle hide-arrow"
              href="javascript:void(0);"
              data-bs-toggle="dropdown">
              <div className="avatar avatar-online">
                <img
                  src="/sneat/assets/img/avatars/1.png"
                  alt=""
                  className="h-auto w-px-40 rounded-circle"
                />
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img
                          src="/sneat/assets/img/avatars/1.png"
                          alt=""
                          className="h-auto w-px-40 rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-semibold d-block">John Doe</span>
                      <small className="text-muted">Admin</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <i className="bx bx-user me-2" />
                  <span className="align-middle">My Profile</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <i className="bx bx-cog me-2" />
                  <span className="align-middle">Settings</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <span className="align-middle d-flex align-items-center">
                    <i className="flex-shrink-0 bx bx-credit-card me-2" />
                    <span className="align-middle flex-grow-1">Billing</span>
                    <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                      4
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <div className="dropdown-divider" />
              </li>
              <li>
                <button onClick={Logout} className="dropdown-item">
                  <i className="bx bx-power-off me-2" />
                  <span className="align-middle">Log Out</span>
                </button>
              </li>
            </ul>
          </li>
          {/*/ User */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
