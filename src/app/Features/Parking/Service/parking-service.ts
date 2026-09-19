import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Parking {
  id: number;
  slotNumber: string;
  vehicleNumber?: string;
  flatId?: number;
  vehicleType?: string;
  status: string;
}

export interface ParkingCreate {
  slotNumber: string;
  vehicleNumber?: string;
  flatId?: number;
  vehicleType?: string;
  status: string;
}

export interface ParkingUpdate {
  slotNumber: string;
  vehicleNumber?: string;
  flatId?: number;
  vehicleType?: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  private apiUrl = 'https://localhost:7290/api/Parking';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Parking[]> {
    return this.http.get<Parking[]>(this.apiUrl);
  }

  getById(id: number): Observable<Parking> {
    return this.http.get<Parking>(`${this.apiUrl}/${id}`);
  }

  create(parking: ParkingCreate): Observable<Parking> {
    return this.http.post<Parking>(this.apiUrl, parking);
  }

  update(id: number, parking: ParkingUpdate): Observable<Parking> {
    return this.http.put<Parking>(
      `${this.apiUrl}/${id}`,
      parking
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}