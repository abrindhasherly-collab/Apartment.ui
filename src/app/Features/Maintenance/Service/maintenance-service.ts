import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Maintenance {
  id: number;
  flatId: number;
  amount: number;
  month: string;
  dueDate: string;
  status: string;
}

export interface MaintenanceCreate {
  flatId: number;
  amount: number;
  month: string;
  dueDate: string;
  status: string;
}

export interface MaintenanceUpdate {
  flatId: number;
  amount: number;
  month: string;
  dueDate: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private apiUrl = 'https://localhost:xxxx/api/Maintenance';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(this.apiUrl);
  }

  getById(id: number): Observable<Maintenance> {
    return this.http.get<Maintenance>(`${this.apiUrl}/${id}`);
  }

  create(maintenance: MaintenanceCreate): Observable<Maintenance> {
    return this.http.post<Maintenance>(
      this.apiUrl,
      maintenance
    );
  }

  update(
    id: number,
    maintenance: MaintenanceUpdate
  ): Observable<Maintenance> {

    return this.http.put<Maintenance>(
      `${this.apiUrl}/${id}`,
      maintenance
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}