import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvalidFeedback from "@/layouts/admin/components/InvalidFeedback";
import BasicAlert from "@/layouts/admin/components/alert/BasicAlert";
import BasicButton from "@/layouts/admin/components/buttons/BasicButton";
import BasicButtonLink from "@/layouts/admin/components/buttons/BasicButtonLink";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import type { ApiResponse } from "@/types/apiResponse";
import type { User } from "@/types/userTypes";
import type { UserFormData } from "@/types/userTypes";
import { userUpdateSchema } from "@/validations/userSchema";
import { useAlertStore } from "@/store/alertStore";

function EditCreate() {
  const navigate = useNavigate();

  // State untuk menyimpan data formulir
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    name: "",
    jk: "",
    telp: "",
    email: "",
    password: "",
  });

  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertVariant, setAlertVariant] = useState<string>("danger");

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        const response = await axios.get<ApiResponse<User>>(
          `http://localhost:8000/api/user/${id}`,
          { signal: controller.signal }
        );

        setUser(response.data.data);

        const userData = response.data.data;

        setFormData({
          username: userData.username,
          name: userData.name,
          jk: userData.jk,
          email: userData.email,
          telp: userData.telp,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser(); // Panggil fungsi fetch
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Zustand
    const addAlert = useAlertStore.getState().addAlert;

    setError(null);
    setIsLoading(true);
    setAlertMessage(null);
    setAlertVariant("success");
    setErrors({});

    try {
      // ✅ Validasi data form sebelum dikirim ke server
      await userUpdateSchema.validate(formData, { abortEarly: false });

      // ✅ Jika valid, kirim ke API Laravel
      await axios.patch(`http://localhost:8000/api/user/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
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

  // Tampilkan data (perlu penanganan loading/null state)
  if (!user) {
    return <div>Loading...</div>;
  }

  // Helper function untuk memeriksa apakah ada error di field tertentu
  const hasError = (fieldName: string): string =>
    errors[fieldName] ? "is-invalid" : "";
  const getErrorMsg = (fieldName: string): string =>
    errors[fieldName]?.[0] || "";

  if (isLoading) return <div>Memuat data pengguna...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-4 card">
            <h5 className="card-header">Update A User</h5>
            <form className="card-body" onSubmit={handleSubmit}>
              {alertMessage && (
                <BasicAlert msg={alertMessage} variant={alertVariant} />
              )}
              <div className="mb-3">
                <label htmlFor="Username" className="form-label">
                  Username
                </label>
                <input
                  id="Username"
                  type="text"
                  name="username"
                  value={formData.username}
                  className={`form-control ${hasError("username")}`}
                  placeholder="Name"
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
                  name="name"
                  type="text"
                  value={formData.name}
                  className={`form-control ${hasError("name")}`}
                  placeholder="Name"
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
                  name="jk"
                  value={formData.jk}
                  onChange={handleChange}>
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
                {hasError("jk") && <InvalidFeedback msg={getErrorMsg("jk")} />}
              </div>
              <div className="mb-3">
                <label htmlFor="telp" className="form-label">
                  Nomor Telepon
                </label>
                <input
                  id="telp"
                  name="telp"
                  type="text"
                  value={formData.telp}
                  className={`form-control ${hasError("telp")}`}
                  placeholder="Nomor Telepon"
                  onChange={handleChange}
                />
                {hasError("telp") && (
                  <InvalidFeedback msg={getErrorMsg("telp")} />
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  className={`form-control ${hasError("email")}`}
                  placeholder="Email"
                  onChange={handleChange}
                />
                {hasError("email") && (
                  <InvalidFeedback msg={getErrorMsg("email")} />
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
                text={isLoading ? "Updating..." : "Save"}
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

export default EditCreate;
