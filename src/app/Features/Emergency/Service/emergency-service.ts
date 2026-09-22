import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../Environments/environment';
import { CreateEmergency, Emergency, UpdateEmergency } from '../Model/emergency-model';


@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  private apiUrl = `${environment.apiUrl}/Emergency`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Emergency[]> {
    return this.http.get<Emergency[]>(this.apiUrl);
  }

  getById(id: number): Observable<Emergency> {
    return this.http.get<Emergency>(
      `${this.apiUrl}/${id}`
    );
  }

  create(data: CreateEmergency): Observable<Emergency> {
    return this.http.post<Emergency>(
      this.apiUrl,
      data
    );
  }

  update(
    id: number,
    data: UpdateEmergency
  ): Observable<Emergency> {
    return this.http.put<Emergency>(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}