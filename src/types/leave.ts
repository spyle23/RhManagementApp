export type SoldLeave = {
  holidayBalance: number;
  balancePermission: number;
};

export enum LeaveStatus {
  Approved = "Approuvé",
  Pending = "En Attente",
  Rejected = "Rejeté",
}

export enum LeaveType {
  holiday = "Congé payé",
  permission = "Permission",
}

export type LeaveResult = {
  id: number;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  rhStatus: LeaveStatus;
  type: LeaveType;
  firstName: string;
  lastName: string;
  reason: string;
};

export type LeaveForm = {
  id?: number | null;
  startDate?: string  | null;
  endDate?: string | null;
  type:LeaveType;
  reason?: string;
  adminId?: number
  employeeId: number
}
