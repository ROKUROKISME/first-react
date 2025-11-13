import * as yup from "yup";

export const authLoginSchema = yup.object().shape({
  username: yup.string().required("Username wajib diisi."),
  password: yup
    .string()
    .required("Password wajib diisi."),
});
