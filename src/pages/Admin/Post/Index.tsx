import { Helmet } from "react-helmet";
import Cookies from "js-cookie";
import RefreshButton from "@/layouts/admin/components/buttons/RefreshButton";
import IsLoading from "@/layouts/admin/components/loadings/Loading";
import { NavLink, Link } from "react-router-dom";
import LogoReact from "@/assets/react.svg";

import { useEffect, useState } from "react";
import axios from "axios";
import type { ApiResponse } from "@/types/apiResponse";
import type { Post } from "@/types/postTypes";

import { useAlertStore } from "@/store/alertStore";
import Alert from "@/layouts/admin/components/alert/AlertDisplay";
import Swal from "sweetalert2";

function Posts() {
  const addAlert = useAlertStore((state) => state.addAlert);
  const token = Cookies.get('token');

  const [posts, setPosts] = useState<Post[]>([]);
  const [filtered, setFiltered] = useState<Post[]>([]);

  // Additions
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(5);
  // const [totalPages, setTotalPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filtered.length / postsPerPage);

  // Ini supaya tiap page tidak selalu mulai dari 1 ...
  const offset = (currentPage - 1) * postsPerPage;

  useEffect(() => {
    const controller = new AbortController();
    const fetchPosts = async () => {
      try {
        //1 Reset error dan set loading
        setError(null);
        setIsLoading(true);

        // 2. Gunakan URL yang benar untuk daftar pengguna (tanpa ID di belakang)
        const response = await axios.get<ApiResponse<Post[]>>(
          "http://localhost:8000/api/post",
          {
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${token}`, // Add this line to include the JWT
            },
            withCredentials: true,
          }
        );

        // 3. Set state dengan array data yang benar
        setPosts(response.data.data);
        setFiltered(response.data.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Gagal mengambil data pengguna.");
      } finally {
        setIsLoading(false); // Selesai loading, baik sukses maupun error
      }
    };
    // 4. Panggil fungsi fetchPosts
    fetchPosts();
  }, [token]);

  // Filtered Data Posts
  useEffect(() => {
    if (!search) {
      setFiltered(posts);
      setCurrentPage(1);
      return;
    }

    const lower = search.toLowerCase();
    const results = posts.filter((u) => u.title.toLowerCase().includes(lower));

    setFiltered(results);
    setCurrentPage(1);
  }, [search, posts]);

  const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPostsPerPage(Number(e.target.value));
  };

  const handlePageChange = (e: number) => {
    setCurrentPage(Number(e));
  };

  // Search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Delete
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
          await axios.delete(`http://localhost:8000/api/post/${itemId}`);

          await Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          setPosts(posts.filter((post) => post.id !== itemId));
          addAlert("Data berhasil dihapus.", "success");
        } catch (error) {
          console.error("Gagal menghapus data:", error);
          addAlert("Gagal menghapus data. Coba lagi.", "error");
        }
      }
    });
  };

  const getPageNumbers = () => {
    const visiblePages = 5; // jumlah halaman yang mau selalu tampil di tengah
    const pages: (number | string)[] = [];

    // kalau total halaman kecil, tampilkan semua
    if (totalPages <= visiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);

    // pastikan jumlah halaman yang tampil tetap 5
    if (currentPage <= 3) {
      endPage = 1 + visiblePages;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - visiblePages;
    }

    // halaman pertama
    pages.push(1);

    // titik di depan range
    if (startPage > 2) pages.push("…");

    // halaman di tengah
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // titik di belakang range
    if (endPage < totalPages - 1) pages.push("…");

    // halaman terakhir
    pages.push(totalPages);

    return pages;
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
        <title>Posts | Laravel for React</title>
        <meta name="description" content="Selamat datang di website saya." />
      </Helmet>
      <div className="container-xxl flex-grow-1 container-p-y">
        <Alert />
        <h4 className="py-3 mb-4 fw-bold">
          <span className="text-muted fw-light">Data/</span>Posts
        </h4>
        <div className="card">
          <h5 className="card-header">All Posts</h5>
          <div className="card-body">
            <div className="mb-3 demo-inline-spacing">
              <div className="px-0 row justify-content-beetwen">
                <div className="px-0 col-lg-6">
                  <NavLink to="create" className="btn btn-outline-primary">
                    <i className="bx bx-plus"></i>
                    <i className="bx bx-news"></i>
                    Tambah
                  </NavLink>
                  <RefreshButton />
                </div>
                <form className="px-0 col-lg-6 col-md-6 col-sm-6">
                  <div className="row justify-content-end">
                    <div className="col-5">
                      <input
                        name="search"
                        type="search"
                        className="form-control"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearchChange}
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
                    <th>Category</th>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Thumbnail</th>
                    {/* <th>Content</th> */}
                    <th>Published At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts.map((post, index) => (
                    <tr key={post.id}>
                      <td>{offset + index + 1}</td>
                      <td>{post.category?.name}</td>
                      <td>
                        <strong>{post.title}</strong>
                      </td>
                      <td>{post.slug}</td>
                      <td className="text-center">
                        <Link to={LogoReact} target="_blank">
                          <img
                            src={LogoReact}
                            alt="logo-react"
                            className="rotate-animation"
                          />
                        </Link>
                      </td>
                      {/* <td>{post.content}</td> */}
                      <td>{post.published_at}</td>
                      <td>
                        <span className="badge bg-label-primary me-1">
                          Active
                        </span>
                      </td>
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
                              to={`/admin/posts/${post.id}`}
                              className="dropdown-item">
                              <i className="bx bx-edit-alt me-1" /> Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(post.id)}
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
                    Showing {`{`} {currentPage} {`}`} of {`{`} {totalPages}{" "}
                    {`}`}
                  </div>
                  <div className="my-2">
                    <select
                      value={postsPerPage}
                      onChange={handlePerPage}
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
                  <div className="demo-inline-spacing">
                    <nav aria-label="Page navigation">
                      <ul className="pagination">
                        <li className="page-item first">
                          <button
                            onClick={() => handlePageChange(1)}
                            className="page-link">
                            <i className="tf-icon bx bx-chevrons-left" />
                          </button>
                        </li>
                        <li className="page-item prev">
                          <button
                            disabled={currentPage == 1}
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}>
                            <i className="tf-icon bx bx-chevron-left" />
                          </button>
                        </li>

                        {getPageNumbers().map((page, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              currentPage === page ? "active" : ""
                            }`}>
                            {page === "…" ? (
                              <span className="page-link">…</span>
                            ) : (
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(Number(page))}>
                                {page}
                              </button>
                            )}
                          </li>
                        ))}
                        <li className="page-item next">
                          <button
                            disabled={currentPage == totalPages}
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}>
                            <i className="tf-icon bx bx-chevron-right" />
                          </button>
                        </li>
                        <li className="page-item last">
                          <button
                            onClick={() => handlePageChange(totalPages)}
                            className="page-link">
                            <i className="tf-icon bx bx-chevrons-right" />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-5" />
      </div>
    </div>
  );
}

export default Posts;
