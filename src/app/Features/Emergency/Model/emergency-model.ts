export interface Emergency {
  id: number;
  residentId: number;
  flatId: number;
  emergencyType: string;
  description: string;
  priority: number;
  reportedDate: string;
  status: number;
}

export interface CreateEmergency {
  residentId: number;
  flatId: number;
  emergencyType: string;
  description: string;
  priority: number;
}

export interface UpdateEmergency {
  residentId: number;
  flatId: number;
  emergencyType: string;
  description: string;
  priority: number;
  status: number;
}