export interface FormData {
  name: string;
  gender: "male" | "female" | "";
  birthDate: string;
  email: string;
  id: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  name?: string;
  gender?: string;
  birthDate?: string;
  email?: string;
  id?: string;
  password?: string;
  confirmPassword?: string;
}
