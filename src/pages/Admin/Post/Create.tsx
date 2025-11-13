import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
// Import komponen UI yang Anda sediakan:
import InvalidFeedback from "@/layouts/admin/components/InvalidFeedback";
import BasicAlert from "@/layouts/admin/components/alert/BasicAlert";
import BasicButton from "@/layouts/admin/components/buttons/BasicButton";
import BasicButtonLink from "@/layouts/admin/components/buttons/BasicButtonLink";
import type { PostFormData } from "@/types/postTypes";
import type { Category } from "@/types/categoryTypes";

import { useAlertStore } from "@/store/alertStore";

import { userCreateSchema } from "@/validations/userSchema";
import type { ApiResponse } from "@/types/apiResponse";

function PostCreate() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  // State untuk menyimpan data formulir
  const [formData, setFormData] = useState<PostFormData>({
    category: null,
    title: "",
    content: "",
    image: "",
  });

  // State untuk status loading dan pesan feedback (success/error umum)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertVariant, setAlertVariant] = useState<string>("danger");

  // State untuk validasi error spesifik per field dari backend
  // const [errors, setErrors] = useState({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      try {
        // 2. Gunakan URL yang benar untuk daftar pengguna (tanpa ID di belakang)
        const response = await axios.get<ApiResponse<Category[]>>(
          "http://localhost:8000/api/category",
          { signal: controller.signal }
        );

        // 3. Set state dengan array data yang benar
        setCategories(response.data.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };
    // 4. Panggil fungsi fetchUsers
    fetchUsers();
  }, []);

  // Handler untuk memperbarui state saat input berubah
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handler untuk pengiriman formulir
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Zustand
    const addAlert = useAlertStore.getState().addAlert;

    setIsLoading(true);
    setAlertMessage(null);

    setErrors({});

    try {
      // ✅ Validasi data form sebelum dikirim ke server
      await userCreateSchema.validate(formData, { abortEarly: false });

      // ✅ Jika valid, kirim ke API Laravel
      await axios.post("http://localhost:8000/api/user", formData, {
        headers: { "Content-Type": "application/json" },
      });

      addAlert("Pengguna berhasil dibuat!", "success");

      // Opsional: Redirect setelah beberapa detik
      setTimeout(() => {
        navigate("/admin/users");
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string[]> = {};
        error.inner.forEach((err) => {
          if (err.path) validationErrors[err.path] = [err.message];
        });
        setErrors(validationErrors);
        setAlertMessage("Terdapat kesalahan pada formulir.");
        setAlertVariant("danger");
        return;
      }

      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response.data.errors);
        setAlertMessage("Terdapat kesalahan validasi dari server.");
        setAlertVariant("danger");
        return;
      }

      setAlertMessage("Terjadi kesalahan saat menyimpan data.");
      setAlertVariant("danger");
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function untuk memeriksa apakah ada error di field tertentu
  const hasError = (fieldName: string): string =>
    errors[fieldName] ? "is-invalid" : "";
  const getErrorMsg = (fieldName: string): string =>
    errors[fieldName]?.[0] || "";

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-4 card">
            <h5 className="card-header">Create A Post</h5>
            <form className="card-body" onSubmit={handleSubmit}>
              {alertMessage && (
                <BasicAlert msg={alertMessage} variant={alertVariant} />
              )}

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Username
                </label>
                <input
                  id="title"
                  type="text"
                  className={`form-control ${hasError("title")}`}
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                />
                {hasError("title") && (
                  <InvalidFeedback msg={getErrorMsg("title")} />
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Jenis Kelamin
                </label>
                <select
                  className={`form-select ${hasError("category")}`}
                  id="category"
                  value={formData.category}
                  onChange={handleChange}>
                  <option value={null}>
                    Pilih
                  </option>
                  {categories.map((cat) => (
                    <option value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {hasError("category") && (
                  <InvalidFeedback msg={getErrorMsg("category")} />
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Content
                </label>
                <textarea
                  id="content"
                  className={`form-control ${hasError("content")}`}
                  placeholder="Content"
                  value={formData.content}
                  rows={5}
                  onChange={handleChange}></textarea>
                {hasError("content") && (
                  <InvalidFeedback msg={getErrorMsg("content")} />
                )}
              </div>

              <BasicButton
                text={isLoading ? "Saving..." : "Save"}
                tipe={"submit"}
                color={"primary"}
                icon={"bx-save"}
                disabled={isLoading}
              />
              <BasicButtonLink
                text={"Kembali"}
                link={"/admin/post"}
                color={"info"}
                icon={"bx-left-arrow-alt"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCreate;
