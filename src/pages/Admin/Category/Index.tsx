import { Helmet } from "react-helmet";
import RefreshButton from "@/layouts/admin/components/buttons/RefreshButton";
import IsLoading from "@/layouts/admin/components/loadings/Loading";
import { Link, NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import type { ApiResponse } from "@/types/apiResponse";
import type { Category } from "@/types/categoryTypes";

import { useAlertStore } from "@/store/alertStore";
import Alert from "@/layouts/admin/components/alert/AlertDisplay";
import Swal from "sweetalert2";

function Category() {
  const addAlert = useAlertStore((state) => state.addAlert);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      try {
        //1 Reset error dan set loading
        setError(null);
        setIsLoading(true);

        // 2. Gunakan URL yang benar untuk daftar pengguna (tanpa ID di belakang)
        const response = await axios.get<ApiResponse<Category[]>>(
          "http://localhost:8000/api/category",
          { signal: controller.signal }
        );

        // 3. Set state dengan array data yang benar
        setCategories(response.data.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Gagal mengambil data pengguna.");
      } finally {
        setIsLoading(false); // Selesai loading, baik sukses maupun error
      }
    };
    // 4. Panggil fungsi fetchUsers
    fetchUsers();
  }, []);

  const handleDelete = async (itemId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/api/category/${itemId}`);

          await Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          setCategories(
            categories.filter((category) => category.id !== itemId)
          );
          addAlert("Data berhasil dihapus.", "success");
        } catch (error) {
          console.error("Gagal menghapus data:", error);
          addAlert("Gagal menghapus data. Coba lagi.", "error");
        }
      }
    });
  };

  if (isLoading)
    return (
      <div>
        <IsLoading />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Helmet>
        <title>Category | Laravel for React</title>
        <meta name="description" content="Selamat datang di website saya." />
      </Helmet>
      <div className="container-xxl flex-grow-1 container-p-y">
        <Alert />
        <h4 className="py-3 mb-4 fw-bold">
          <span className="text-muted fw-light">Data/</span> Category
        </h4>
        <div className="card">
          <h5 className="card-header">All Users</h5>
          <div className="card-body">
            <div className="mb-3 demo-inline-spacing">
              <div className="px-0 row justify-content-beetwen">
                <div className="px-0 col-lg-6">
                  <NavLink to="create" className="btn btn-outline-primary">
                    <i className="bx bx-plus"></i>
                    <i className="bx bx-category"></i>
                    Tambah
                  </NavLink>
                  <RefreshButton />
                </div>
                <form className="px-0 col-lg-6 col-md-6 col-sm-6">
                  <div className="row justify-content-end">
                    <div className="col-5">
                      <input
                        name="nama"
                        type="search"
                        className="form-control"
                        v-model="search"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="table-responsive text-nowrap">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <strong>{category.name}</strong>
                      </td>
                      <td>{category.slug}</td>
                      <td>
                        <div className="dropdown">
                          <button
                            type="button"
                            className="p-0 btn dropdown-toggle hide-arrow"
                            data-bs-toggle="dropdown">
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div className="dropdown-menu">
                            <Link
                              to={`/admin/category/${category.id}`}
                              className="dropdown-item">
                              <i className="bx bx-edit-alt me-1" /> Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(category.id)}
                              className="dropdown-item">
                              <i className="bx bx-trash me-1" /> Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mb-3 demo-inline-spacing">
              <div className="px-0 row justify-content-between">
                <div className="mt-0 d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto">
                  <div className="my-2">
                    Showing {"{"} {"{"}
                    {"{"} currentPage {"}"}
                    {"}"} {"}"} of {"{"} {"{"}
                    {"{"} totalPages {"}"}
                    {"}"} {"}"}
                  </div>
                  <div className="my-2">
                    <select
                      v-model="perPage"
                      className="py-1 mx-1 min-w-16 form-select">
                      <option value={3}>3</option>
                      <option value={5}>5</option>
                      <option value={7}>7</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>
                <div className="mt-0 d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">
                  <div className="dt-paging">
                    <nav aria-label="pagination">
                      <ul className="pagination">
                        <li className="dt-paging-button page-item">
                          <button
                            className="page-link previous"
                            role="link"
                            type="button">
                            <i className="icon-base bx bx-chevrons-left scaleX-n1-rtl icon-sm" />
                          </button>
                        </li>
                        <li className="dt-paging-button page-item">
                          <button
                            className="page-link previous"
                            role="link"
                            type="button">
                            <i className="icon-base bx bx-chevron-left scaleX-n1-rtl icon-sm" />
                          </button>
                        </li>
                        <li className="dt-paging-button page-item">
                          <button
                            className="page-link"
                            role="link"
                            type="button">
                            {"{"}
                            {"{"} page {"}"}
                            {"}"}
                          </button>
                        </li>
                        <li className="dt-paging-button page-item">
                          <button
                            className="page-link next"
                            role="link"
                            type="button">
                            <i className="icon-base bx bx-chevron-right scaleX-n1-rtl icon-sm" />
                          </button>
                        </li>
                        <li className="dt-paging-button page-item">
                          <button
                            className="page-link next"
                            role="link"
                            type="button">
                            <i className="icon-base bx bx-chevrons-right scaleX-n1-rtl icon-sm" />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination */}
          </div>
        </div>
        {/*/ Bordered Table */}
        <hr className="my-5" />
      </div>
    </div>
  );
}

export default Category;
