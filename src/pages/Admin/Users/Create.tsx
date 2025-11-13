import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
// Import komponen UI yang Anda sediakan:
import InvalidFeedback from "@/layouts/admin/components/InvalidFeedback";
import BasicAlert from "@/layouts/admin/components/alert/BasicAlert";
import BasicButton from "@/layouts/admin/components/buttons/BasicButton";
import BasicButtonLink from "@/layouts/admin/components/buttons/BasicButtonLink";
import type { UserFormData } from "@/types/userTypes";

import { useAlertStore } from "@/store/alertStore";

import { userCreateSchema } from "@/validations/userSchema";

function UserCreate() {
  const navigate = useNavigate();

  // State untuk menyimpan data formulir
  const [formData, setFormData] = useState<UserFormData>({
    username: "franslie",
    name: "Frans Lie",
    jk: "L",
    telp: "082158252231",
    email: "rokurokisme@gmail.com",
    password: "12345",
  });

  // State untuk status loading dan pesan feedback (success/error umum)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertVariant, setAlertVariant] = useState<string>("danger");

  // State untuk validasi error spesifik per field dari backend
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Handler untuk memperbarui state saat input berubah
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
        withCredentials: true
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
            <h5 className="card-header">Create A User</h5>
            <form className="card-body" onSubmit={handleSubmit}>
              {alertMessage && (
                <BasicAlert msg={alertMessage} variant={alertVariant} />
              )}

              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className={`form-control ${hasError("username")}`}
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {hasError("username") && (
                  <InvalidFeedback msg={getErrorMsg("username")} />
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={`form-control ${hasError("name")}`}
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {hasError("name") && (
                  <InvalidFeedback msg={getErrorMsg("name")} />
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="jk" className="form-label">
                  Jenis Kelamin
                </label>
                <select
                  className={`form-select ${hasError("jk")}`}
                  id="jk"
                  value={formData.jk}
                  onChange={handleChange}>
                  <option value="" disabled>
                    Pilih
                  </option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
                {hasError("jk") && <InvalidFeedback msg={getErrorMsg("jk")} />}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-control ${hasError("email")}`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {hasError("email") && (
                  <InvalidFeedback msg={getErrorMsg("email")} />
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="telp" className="form-label">
                  Nomor Telepon
                </label>
                <input
                  id="telp"
                  type="text"
                  className={`form-control ${hasError("telp")}`}
                  placeholder="Nomor Telepon"
                  value={formData.telp}
                  onChange={handleChange}
                />
                {hasError("telp") && (
                  <InvalidFeedback msg={getErrorMsg("telp")} />
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={`form-control ${hasError("password")}`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {hasError("password") && (
                  <InvalidFeedback msg={getErrorMsg("password")} />
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
                link={"/admin/users"}
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

export default UserCreate;
