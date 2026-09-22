export interface Payment {
  id: number;
  maintenanceId: number | null;
  flatId: number;
  amount: number;
  paymentDate: string;
  paymentMethod: number;
  paymentType: number;
  status: number;
}

export interface CreatePayment {
  maintenanceId: number | null;
  flatId: number;
  amount: number;
  paymentDate: string;
  paymentMethod: number;
  paymentType: number;
}

export interface UpdatePayment {
  maintenanceId: number | null;
  flatId: number;
  amount: number;
  paymentDate: string;
  paymentMethod: number;
  paymentType: number;
  status: number;
}