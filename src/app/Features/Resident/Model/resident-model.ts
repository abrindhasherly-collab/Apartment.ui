export interface Resident {
  id: number;
  userId: number;
  flatId: number;
  name: string;
  phone: string;
  email: string;
  dateOfJoining: string;
  status: number;
}

export interface CreateResident {
  userId: number;
  flatId: number;
  name: string;
  phone: string;
  email: string;
}

export interface UpdateResident {
  userId: number;
  flatId: number;
  name: string;
  phone: string;
  email: string;
  dateOfJoining: string;
  status: number;
}