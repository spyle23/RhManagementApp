export type Team = {
  id: number;
  name: string;
  specialty: string;
  managerId: number;
};

export type TeamMember = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  status: string;
  email: string;
  picture: string;
  teamId: number;
};

export type TeamWithManagerDetails = Team & {
  managerFirstName: string;
  managerLastName: string;
  managerEmail: string;
  managerPicture?: string;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
};


