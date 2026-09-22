import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Staff {
  id: number;
  name: string;
  phone: string;
  jobRole: string;
  joiningDate: string;
  status: string;
}

export interface StaffCreate {
  name: string;
  phone: string;
  jobRole: string;
  joiningDate: string;
  status: string;
}

export interface StaffUpdate {
  name: string;
  phone: string;
  jobRole: string;
  joiningDate: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private apiUrl = 'https://localhost:xxxx/api/Staff';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.apiUrl);
  }

  getById(id: number): Observable<Staff> {
    return this.http.get<Staff>(`${this.apiUrl}/${id}`);
  }

  create(staff: StaffCreate): Observable<Staff> {
    return this.http.post<Staff>(this.apiUrl, staff);
  }

  update(id: number, staff: StaffUpdate): Observable<Staff> {
    return this.http.put<Staff>(
      `${this.apiUrl}/${id}`,
      staff
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}