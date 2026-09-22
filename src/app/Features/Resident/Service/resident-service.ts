import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Resident, CreateResident, UpdateResident } from '../Model/resident-model';
import { environment } from '../../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResidentService  {
    //private apiUrl = '${environment.apiUrl}/Resident';
     private apiUrl = `${environment.apiUrl}/Resident`;
    

    constructor(private http: HttpClient) { }

  getAll(): Observable<Resident[]> {
    return this.http.get<Resident[]>(this.apiUrl);  
 }
  getById(id: number): Observable<Resident> {
    return this.http.get<Resident>(`${this.apiUrl}/${id}`);
  }

  create(resident: CreateResident): Observable<Resident> {
    return this.http.post<Resident>(this.apiUrl, resident);
  }

  update(id: number, resident: UpdateResident): Observable<Resident> {
    return this.http.put<Resident>(`${this.apiUrl}/${id}`, resident);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  } 
}
