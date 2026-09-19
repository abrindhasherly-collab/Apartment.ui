import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Flat {
  id: number;
  flatNumber: string;
  floor: number;
  buildingId: number;
  flatType: string;
  status: string;
  residentId?: number;
}

export interface FlatCreate {
  flatNumber: string;
  floor: number;
  buildingId: number;
  flatType: string;
  status: string;
  residentId?: number;
}

export interface FlatUpdate {
  flatNumber: string;
  floor: number;
  buildingId: number;
  flatType: string;
  status: string;
  residentId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  private apiUrl = 'https://localhost:7290/api/Flat';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Flat[]> {
    return this.http.get<Flat[]>(this.apiUrl);
  }

  getById(id: number): Observable<Flat> {
    return this.http.get<Flat>(`${this.apiUrl}/${id}`);
  }

  create(flat: FlatCreate): Observable<Flat> {
    return this.http.post<Flat>(this.apiUrl, flat);
  }

  update(id: number, flat: FlatUpdate): Observable<Flat> {
    return this.http.put<Flat>(`${this.apiUrl}/${id}`, flat);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}