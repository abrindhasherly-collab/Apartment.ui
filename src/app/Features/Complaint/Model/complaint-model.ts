export interface Complaint {
  id: number;
  residentId: number;
  flatId: number;
  title: string;
  description: string;
  complaintDate: string;
  status: number;
}

export interface CreateComplaint {
  residentId: number;
  flatId: number;
  title: string;
  description: string;
}

export interface UpdateComplaint {
  residentId: number;
  flatId: number;
  title: string;
  description: string;
  status: number;
}