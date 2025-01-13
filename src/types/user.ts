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

export type UserHeader = {
  id: number;
  firstName: string;
  lastName: string;
  cin: number;
  email: string;
  picture: string;
}