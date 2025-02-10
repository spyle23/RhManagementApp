export type CreateEmployeeRecordDto = {
  telephone: string;
  adresse: string;
  birthday: string;
  poste: string;
  profil: string;
  grossSalary: number;
  employeeId?: number;
};

export type EmployeeDto = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  picture?: string;
  dateOfHiring: string;
};

export type EmployeeRecordDto = {
  id: number;
  telephone: string;
  adresse: string;
  birthday: string;
  poste: string;
  profil: string;
  status: string;
  grossSalary: number;
  cv: string;
  employeeId: number;
  employee: EmployeeDto;
};

export enum EmployeeStatus {
  onLeave = "En Congé",
  active = "Actif"
}
