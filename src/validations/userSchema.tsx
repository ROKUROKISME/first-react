import * as yup from "yup";

export const userCreateSchema = yup.object().shape({
  username: yup.string().required("Username wajib diisi."),
  name: yup.string().required("Nama lengkap wajib diisi."),
  jk: yup
    .string()
    .oneOf(["L", "P"], "Pilih jenis kelamin yang valid.")
    .required("Jenis kelamin wajib diisi."),
  email: yup
    .string()
    .email("Format email tidak valid.")
    .required("Email wajib diisi."),
  telp: yup
    .string()
    .matches(
      /^08[0-9]{10}$/,
      "Nomor telepon harus dimulai dengan 08 dan 12 digit."
    )
    .required("Nomor telepon wajib diisi."),
  password: yup
    .string()
    .required("Password wajib diisi."),
});

export const userUpdateSchema = yup.object().shape({
  username: yup.string().required("Username wajib diisi."),
  name: yup.string().required("Nama lengkap wajib diisi."),
  jk: yup
    .string()
    .oneOf(["L", "P"], "Pilih jenis kelamin yang valid.")
    .required("Jenis kelamin wajib diisi."),
  email: yup
    .string()
    .email("Format email tidak valid.")
    .required("Email wajib diisi."),
  telp: yup
    .string()
    .matches(
      /^08[0-9]{10}$/,
      "Nomor telepon harus dimulai dengan 08 dan 12 digit."
    )
    .required("Nomor telepon wajib diisi."),
  password: yup.string().optional(),
});

// export default { userCreateSchema, userUpdateSchema };
