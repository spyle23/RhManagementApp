export type Role = "RH" | "Admin" | "Manager" | "Employee";

export type ILogin = {
  email: string;
  password: string;
};

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
};

export type UserRoles = {
  role: Role;
} & UserHeader;

export type ICreateUser = {
  firstName: string;
  lastName: string;
  cin: number;
  email: string;
  password: string;
  file?: File;
  role: Role;
  dateOfHiring?: Date;
  teamId?: number;
  depatment?: string;
  accessLevel?: string;
  specialisation?: string;
  certification?: string;
  managementLevel?: string;
  yearsOfExperience?: number;
  [k: string]: any;
};
