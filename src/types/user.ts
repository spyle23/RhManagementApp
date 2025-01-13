export type Role = "RH" | "Admin" | "Manager" | "Employee";

export type ILogin = {
  email: string;
  password:string;
}

export type User = {
  userId: number;
  token: string;
  role: Role;
};
