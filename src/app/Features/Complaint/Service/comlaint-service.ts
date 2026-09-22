import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../Environments/environment';
import { Complaint, CreateComplaint, UpdateComplaint } from '../Model/complaint-model';



@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private apiUrl = `${environment.apiUrl}/Complaint`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.apiUrl);
  }

  getById(id: number): Observable<Complaint> {
    return this.http.get<Complaint>(
      `${this.apiUrl}/${id}`
    );
  }

  create(data: CreateComplaint): Observable<Complaint> {
    return this.http.post<Complaint>(
      this.apiUrl,
      data
    );
  }

  update(
    id: number,
    data: UpdateComplaint
  ): Observable<Complaint> {
    return this.http.put<Complaint>(
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