export interface User {
  id: number;
  username: string;
  name: string;
  jk: string;
  telp: string;
  email: string;
  role: string;
}

export interface UserFormData {
  username: string;
  name: string;
  jk: string;
  telp: string;
  email: string;
  password?: string;
  role: string;
}